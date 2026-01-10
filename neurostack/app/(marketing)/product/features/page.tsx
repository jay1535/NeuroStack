export default function FeaturesPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-rose-500 mb-6">
          Product Features
        </h1>

        <p className="text-gray-400 mb-10">
          NeuroStack is built to help teams design faster without sacrificing
          quality. Our AI understands modern UI patterns, UX principles, and
          real-world product needs.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              AI-Powered UI Generation
            </h2>
            <p className="text-gray-400">
              Convert natural language prompts into structured UI screens for
              mobile apps and websites. NeuroStack generates layouts that are
              clean, scalable, and developer-friendly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              UX Best Practices Built-In
            </h2>
            <p className="text-gray-400">
              Accessibility, spacing, hierarchy, and usability patterns are
              automatically considered while generating designs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              Mobile & Web Ready
            </h2>
            <p className="text-gray-400">
              Design responsive interfaces for Android, iOS, and modern web
              platforms from a single prompt.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
