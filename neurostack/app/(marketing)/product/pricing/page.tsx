export default function PricingPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-rose-500 mb-6">
          Pricing
        </h1>

        <p className="text-gray-400 mb-16">
          Simple, transparent pricing designed for individuals and teams.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Free", "₹0", "Explore basic UI generation"],
            ["Pro", "₹999 / month", "Unlimited designs & exports"],
            ["Team", "Custom", "Collaboration & enterprise features"],
          ].map(([plan, price, desc]) => (
            <div
              key={plan}
              className="rounded-2xl p-8 bg-white/5 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-rose-500">{plan}</h3>
              <p className="text-2xl font-bold mt-4">{price}</p>
              <p className="mt-4 text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
