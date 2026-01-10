export default function PrivacyPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-rose-500">
          Privacy Policy
        </h1>

        <p className="text-gray-400 mb-6">
          At NeuroStack, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-gray-400">
          We may collect personal information such as your name, email address,
          and usage data when you interact with the platform.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          2. How We Use Your Data
        </h2>
        <p className="text-gray-400">
          Your data is used to provide and improve NeuroStack services,
          personalize your experience, and ensure platform security.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          3. Data Security
        </h2>
        <p className="text-gray-400">
          We implement industry-standard security measures to protect your data
          from unauthorized access, alteration, or disclosure.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          4. Third-Party Services
        </h2>
        <p className="text-gray-400">
          NeuroStack may integrate with third-party services for analytics or
          infrastructure. These services have their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          5. Your Rights
        </h2>
        <p className="text-gray-400">
          You have the right to access, update, or delete your personal data.
          Contact us if you wish to exercise these rights.
        </p>

        <p className="text-gray-500 mt-12 text-sm">
          Last updated: {new Date().toDateString()}
        </p>
      </div>
    </main>
  );
}
