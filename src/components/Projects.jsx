import { useState, useEffect, useRef } from "react";
import portfolioData from "../data/portfolioData";

/*
  MECHANIC:
  - Section is scroll-pinned (sticky) for (projects.length * 150vh)
  - scrollProgress 0→1 drives an "angle" that rotates all cards
    around a virtual cylinder centred on the spine.
  - Each card sits at its own fixed angle offset on that cylinder.
  - As you scroll the cylinder rotates: the front card comes to 0°
    (fully visible, large, bright) while others arc back.
  - The spine is rendered as a thick 3D cylinder with CSS box-shadow
    layering + a radial gradient to fake a lit round surface.
*/

const CARD_W = 300;
const CARD_H = 390;
const ORBIT_R = 320;   // "radius" of the orbit in px (horizontal push)
const Z_DEPTH = 260;   // how deep cards go behind the scene

export default function Projects() {
  const sectionRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [hovered, setHovered] = useState(null);
  const projects = portfolioData.projects;
  const N = projects.length;

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const gone  = -rect.top;
      setScrollPct(Math.max(0, Math.min(1, gone / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which card is "front" — fractional so transitions are smooth
  const frontF = scrollPct * (N - 1);
  const activeIdx = Math.round(frontF);

  // Angle step between cards on the cylinder (degrees)
  const STEP = 360 / N;

  return (
    <>
      <style>{`
        /* ─── keyframes ─────────────────────────────────────── */
        @keyframes pflow {
          0%   { background-position: 0 0; }
          100% { background-position: 0 400%; }
        }
        @keyframes titleShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes nodePop {
          0%,100% { box-shadow: 0 0 0 0 rgba(6,182,212,.8); }
          50%      { box-shadow: 0 0 0 12px rgba(6,182,212,0); }
        }
        @keyframes floatUp {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          15%  { opacity:.9; }
          85%  { opacity:.5; }
          100% { opacity:0; transform:translateY(-130px) translateX(var(--pdx)) scale(.2); }
        }
        @keyframes activeGlow {
          0%,100% { box-shadow: 0 0 30px rgba(6,182,212,.3), 0 24px 64px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.14); }
          50%      { box-shadow: 0 0 70px rgba(6,182,212,.55), 0 24px 64px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.18); }
        }
        @keyframes trunkPulse {
          0%,100% { opacity:.85; }
          50%      { opacity:1; }
        }
        @keyframes scrollBob {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(7px); }
        }

        /* ─── layout ─────────────────────────────────────────── */
        .pjs-outer {
          position: relative;
          background: #020a18;
        }
        .pjs-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ─── background ──────────────────────────────────────── */
        .pjs-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,.035) 1px, transparent 1px);
          background-size: 54px 54px;
          pointer-events: none;
        }
        .pjs-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 75% 65% at 50% 50%,
            rgba(6,182,212,.065) 0%, transparent 68%);
          pointer-events: none;
        }

        /* ─── 3-D trunk ───────────────────────────────────────── */
        
        /* The actual cylinder body */
        
        /* Top cap (ellipse illusion) */
        
        /* Flowing energy stripe */
        
        /* Spine node dots */
        
        

        /* ─── root SVG ────────────────────────────────────────── */
        

        /* ─── 3-D stage ───────────────────────────────────────── */
        .orbit-stage {
          position: absolute;
          inset: 0;
          perspective: 1100px;
          perspective-origin: 50% 50%;
        }
        .orbit-pivot {
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          transform-style: preserve-3d;
        }

        /* ─── branch lines ────────────────────────────────────── */
        

        /* ─── card ────────────────────────────────────────────── */
        .pcard {
          position:absolute;
          width:${CARD_W}px;
          height:${CARD_H}px;
          margin-left:-${CARD_W / 2}px;
          margin-top:-${CARD_H / 2}px;
          border-radius:24px;
          overflow:hidden;
          cursor:pointer;
          transition:transform .65s cubic-bezier(.22,1,.36,1),opacity .5s,filter .5s,border-color .3s,box-shadow .35s;
          background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,255,255,.02) 40%,rgba(6,182,212,.04) 70%,rgba(99,102,241,.08));
          backdrop-filter:blur(26px);
          -webkit-backdrop-filter:blur(26px);
          border:1px solid rgba(255,255,255,.12);
          box-shadow:0 30px 70px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(255,255,255,.05);
          transform-style:preserve-3d;
          will-change:transform,opacity;
        }
        .pcard::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            radial-gradient(circle at top left,rgba(34,211,238,.22),transparent 40%),
            radial-gradient(circle at bottom right,rgba(99,102,241,.16),transparent 45%);
          pointer-events:none;
          opacity:.9;
          z-index:1;
        }
        .pcard.front {
          border-color:rgba(34,211,238,.75);
          box-shadow:0 0 35px rgba(6,182,212,.28),0 0 90px rgba(99,102,241,.16),0 30px 70px rgba(0,0,0,.72),inset 0 1px 0 rgba(255,255,255,.18);
          animation:activeGlow 3s ease-in-out infinite;
        }
        .pcard:hover {
          border-color:#22d3ee !important;
          box-shadow:0 0 45px rgba(34,211,238,.35),0 35px 80px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.2);
        }

        /* glass sheen */
        .pcard-sheen{
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,.08) 20%,transparent 45%);
          pointer-events:none;
          z-index:4;
        }

        .pcard-img {
          position: relative;
          height: 158px;
          overflow: hidden;
        }
        .pcard-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter:brightness(.92) contrast(1.05) saturate(1.18);
          transition: transform .55s ease, filter .55s ease;
        }
        .pcard:hover .pcard-img img {
          transform: scale(1.07);
          filter:brightness(1) contrast(1.08) saturate(1.35);
        }
        .pcard-img-fade {
          position: absolute; inset: 0;
          background:linear-gradient(to bottom,rgba(0,0,0,.05),rgba(2,10,24,.15),rgba(2,10,24,.88));
        }

        .pcard-body { padding: 13px 17px 17px; position: relative; z-index: 3; }
        .pcard-num {
          font-size: 10px; font-weight: 700;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(6,182,212,.65); margin-bottom: 5px;
        }
        .pcard-title{
          font-size:18px;
          font-weight:700;
          line-height:1.25;
          margin-bottom:8px;
          background:linear-gradient(90deg,#fff,#c4f1ff,#67e8f9);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .pcard-desc {
          font-size:12px;color:rgba(255,255,255,.72);
          line-height: 1.6; margin-bottom: 11px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .pcard-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
        .pcard-tag{
          padding:5px 10px;
          border-radius:30px;
          font-size:10px;
          font-weight:600;
          background:linear-gradient(135deg,rgba(6,182,212,.18),rgba(99,102,241,.18));
          border:1px solid rgba(34,211,238,.35);
          color:#8beeff;
          transition:.3s;
        }
        .pcard-tag:hover{
          background:linear-gradient(135deg,rgba(6,182,212,.32),rgba(99,102,241,.32));
          color:#fff;
        }
        .pcard-btns { display: flex; gap: 7px; }
        .pcard-btn {
          flex: 1; padding: 8px 10px; border-radius: 10px;
          font-size: 12px; font-weight: 600; text-align: center;
          text-decoration: none; display: block;
          transition: all .2s ease;
        }
        .pcard-solid{
          background:linear-gradient(135deg,#06b6d4,#2563eb);
          color:#fff;
          border:none;
          box-shadow:0 8px 22px rgba(6,182,212,.35);
        }
        .pcard-solid:hover{
          transform:translateY(-2px);
          box-shadow:0 14px 35px rgba(6,182,212,.55);
        }
        .pcard-ghost{
          background:rgba(255,255,255,.05);
          color:#d8faff;
          border:1px solid rgba(255,255,255,.14);
        }
        .pcard-ghost:hover{
          background:rgba(6,182,212,.12);
          border-color:#22d3ee;
          color:#fff;
        }

        /* ─── UI chrome ───────────────────────────────────────── */
        .pjs-header {
          position: absolute; top: 7%; left: 50%;
          transform: translateX(-50%);
          text-align: center; z-index: 30;
          pointer-events: none; white-space: nowrap;
        }
        .pjs-header h2 {
          font-size: clamp(26px,3.8vw,46px); font-weight: 800;
          background: linear-gradient(120deg, #67e8f9,#06b6d4,#818cf8,#06b6d4,#67e8f9);
          background-size: 300% 100%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: titleShift 5s ease infinite;
          letter-spacing: -.02em;
        }
        .pjs-header p {
          font-size: 11px; color: rgba(255,255,255,.28);
          margin-top: 7px; letter-spacing: .22em; text-transform: uppercase;
        }

        .pjs-dots {
          position: absolute; right: 30px; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 10px; z-index: 30;
        }
        .pjs-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.08);
          transition: all .3s ease;
        }
        .pjs-dot.on {
          background: rgba(6,182,212,.9); border-color: rgba(6,182,212,.6);
          box-shadow: 0 0 10px rgba(6,182,212,.7); transform: scale(1.5);
        }

        .pjs-scroll {
          position: absolute; bottom: 5%; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          z-index: 30; transition: opacity .4s ease;
        }
        .pjs-scroll.gone { opacity: 0; pointer-events: none; }
        .pjs-scroll-box {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(6,182,212,.4);
          border-radius: 11px;
          display: flex; justify-content: center; padding-top: 5px;
        }
        .pjs-scroll-dot {
          width: 3px; height: 7px; border-radius: 2px;
          background: rgba(6,182,212,.75);
          animation: scrollBob 1.4s ease-in-out infinite;
        }
        .pjs-scroll span {
          font-size: 10px; letter-spacing: .22em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }

        /* particle */
        .pjs-particle {
          position: absolute;
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(6,182,212,.85);
          animation: floatUp var(--pdur) ease-out infinite;
          animation-delay: var(--pdel);
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="pjs-outer"
        style={{ height: `${N * 150 + 60}vh` }}
      >
        <div className="pjs-sticky">
          <div className="pjs-grid" />
          <div className="pjs-vignette" />

          {/* Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="pjs-particle" style={{
              left: `calc(50% + ${(i % 2 === 0 ? 8 : -8)}px)`,
              bottom: `${8 + i * 8}%`,
              "--pdx": `${(i % 2 === 0 ? 22 : -22) + i * 2}px`,
              "--pdur": `${3 + i * .3}s`,
              "--pdel": `${i * .45}s`,
            }} />
          ))}

          {/* ── 3-D Orbit Stage ───────────────────────────────── */}
          <div className="orbit-stage">
            <div className="orbit-pivot">
              {projects.map((project, i) => {
                /*
                  Each card has a "home angle" spaced evenly around the cylinder.
                  As scrollPct rises, we rotate the whole cylinder so card i
                  comes to front (angle = 0 = facing viewer).

                  angleDeg: how far this card is from the front (0° = directly in front)
                  We map that to X position and Z depth.
                */
                const homeAngle = i * STEP;           // 0, 72, 144 ... for 5 cards
                // Current rotation of the cylinder (negative = rotating so higher i comes front)
                const cylinderRot = -frontF * STEP;
                // This card's current angle relative to viewer
                let a = (homeAngle + cylinderRot) % 360;
                if (a > 180)  a -= 360;
                if (a < -180) a += 360;

                const aRad = (a * Math.PI) / 180;

                // X: spread cards left/right on cylinder
                const tx = Math.sin(aRad) * ORBIT_R;
                // Z: push back or pull forward
                const tz = (Math.cos(aRad) - 1) * Z_DEPTH; // 0 at front, negative behind
                // Scale: big at front, small at back
                const cosA = Math.cos(aRad);
                const scaleV = 0.55 + 0.45 * ((cosA + 1) / 2);
                // Opacity
                const opacV = Math.max(0.15, 0.3 + 0.7 * ((cosA + 1) / 2));
                // Y tilt for cards at sides
                const rotY = -a * 0.35;          // slight face-toward-viewer
                // blur for cards behind
                const blurV = cosA < 0 ? Math.abs(cosA) * 5 : 0;

                const isFront = i === activeIdx;
                const isHov   = hovered === i;

                // branch line from trunk to card
                const branchTopPct = 12 + (i * 76) / Math.max(N - 1, 1);
                const side = tx >= 0 ? 1 : -1;
                const branchW = Math.max(20, Math.abs(tx) * 0.28);
                const branchOp = Math.max(0.1, opacV * 0.8);

                return (
                  <div key={i} style={{ position: "absolute", width: 0, height: 0 }}>
                    {/* Branch line — drawn in normal flow relative to sticky scene */}
                    <div style={{
                      position: "fixed",
                      top: `calc(50% + ${branchTopPct - 50}vh * 0)`,
                      /* We'll do branches differently below */
                    }} />

                    {/* Card */}
                    <div
                      className={`pcard ${isFront ? "front" : ""}`}
                      style={{
                        transform: `
                          translateX(${tx + (isHov && !isFront ? side * 14 : 0)}px)
                          translateY(0px)
                          translateZ(${tz}px)
                          rotateY(${rotY + (isHov ? rotY * -.15 : 0)}deg)
                          scale(${scaleV * (isHov ? 1.04 : 1)})
                        `,
                        opacity: opacV,
                        filter: blurV > 0 ? `blur(${blurV}px)` : "none",
                        zIndex: Math.round(cosA * 50) + 60,
                        pointerEvents: cosA < -0.2 ? "none" : "auto",
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="pcard-sheen" />
                      <div className="pcard-img">
                        <img src={project.image} alt={project.title} />
                        <div className="pcard-img-fade" />
                      </div>
                      <div className="pcard-body">
                        <div className="pcard-num">
                          {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                        </div>
                        <h3 className="pcard-title">{project.title}</h3>
                        <p className="pcard-desc">{project.description}</p>
                        <div className="pcard-tags">
                          {project.tech?.slice(0, 4).map(t => (
                            <span key={t} className="pcard-tag">{t}</span>
                          ))}
                        </div>
                        <div className="pcard-btns">
                          <a href={project.github} target="_blank" rel="noreferrer" className="pcard-btn pcard-solid">GitHub</a>
                          <a href={project.live}   target="_blank" rel="noreferrer" className="pcard-btn pcard-ghost">Live Demo</a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Header */}
          <div className="pjs-header">
            <h2>Project Collection</h2>
            <p>Scroll to explore</p>
          </div>

          {/* Progress dots */}
          <div className="pjs-dots">
            {projects.map((_, i) => (
              <div key={i} className={`pjs-dot ${i === activeIdx ? "on" : ""}`} title={projects[i].title} />
            ))}
          </div>

          {/* Scroll hint */}
          <div className={`pjs-scroll ${scrollPct > 0.04 ? "gone" : ""}`}>
            <div className="pjs-scroll-box"><div className="pjs-scroll-dot" /></div>
            <span>Scroll</span>
          </div>
        </div>
      </section>
    </>
  );
}
