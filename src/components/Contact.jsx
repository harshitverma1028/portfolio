import portfolioData from "../data/portfolioData";

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-12">
          Contact Me
        </h2>

        <div className="glass rounded-3xl p-10">

          <p className="text-center text-slate-300 mb-8">
            Open for internships, freelance
            projects and collaborations.
          </p>

          <div className="space-y-5">

            <a
              href={`mailto:${portfolioData.email}`}
              className="block text-center text-cyan-400"
            >
              {portfolioData.email}
            </a>

            <a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="block text-center"
            >
              GitHub
            </a>

            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block text-center"
            >
              LinkedIn
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;