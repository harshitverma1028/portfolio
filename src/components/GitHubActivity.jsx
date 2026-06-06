import { GitHubCalendar } from "react-github-calendar";

function GitHubActivity() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-center text-5xl font-bold gradient-text mb-16">
          GitHub Activity
        </h2>

        <div
          className="
          glass
          rounded-3xl
          p-6
          overflow-x-auto
        "
        >
          <GitHubCalendar username="harshitverma1028" />
        </div>

      </div>

    </section>
  );
}

export default GitHubActivity;