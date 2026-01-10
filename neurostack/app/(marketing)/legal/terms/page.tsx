export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-rose-500">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 mb-6">
          Welcome to NeuroStack. By accessing or using our platform, you agree
          to comply with and be bound by the following Terms and Conditions.
          Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          1. Use of the Platform
        </h2>
        <p className="text-gray-400">
          NeuroStack provides AI-powered UI/UX generation tools for mobile and
          web applications. You agree to use the platform only for lawful
          purposes and in a way that does not violate any applicable laws or
          regulations.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          2. User Accounts
        </h2>
        <p className="text-gray-400">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. NeuroStack is not liable for any loss resulting from
          unauthorized account access.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          3. Intellectual Property
        </h2>
        <p className="text-gray-400">
          All content, trademarks, and AI models used on NeuroStack are the
          intellectual property of NeuroStack or its licensors. You may not
          copy, modify, or redistribute any part of the platform without
          explicit permission.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          4. Generated Designs
        </h2>
        <p className="text-gray-400">
          UI/UX designs generated using NeuroStack are provided “as-is”.
          NeuroStack does not guarantee that generated designs are free from
          errors or suitable for every use case. You are responsible for
          reviewing and validating outputs before production use.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          5. Limitation of Liability
        </h2>
        <p className="text-gray-400">
          NeuroStack shall not be liable for any indirect, incidental, or
          consequential damages arising from the use or inability to use the
          platform.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          6. Changes to Terms
        </h2>
        <p className="text-gray-400">
          We reserve the right to update these Terms at any time. Continued use
          of the platform after changes constitutes acceptance of the updated
          Terms.
        </p>

        <p className="text-gray-500 mt-12 text-sm">
          Last updated: {new Date().toDateString()}
        </p>
      </div>
    </main>
  );
}
