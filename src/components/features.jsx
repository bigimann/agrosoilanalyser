export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose AgroSense-AI?
        </h2>
        <p className="text-xl text-gray-600">
          Powerful features designed for modern farmers
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "🤖",
            title: "AI-Powered Analysis",
            description:
              "Advanced machine learning algorithms analyze your soil and climate data for accurate recommendations",
          },
          {
            icon: "🌍",
            title: "Location-Specific",
            description:
              "Tailored recommendations based on your exact location and local climate patterns",
          },
          {
            icon: "📊",
            title: "Data-Driven Insights",
            description:
              "Get detailed reasoning and farming tips backed by agricultural science",
          },
          {
            icon: "⚡",
            title: "Instant Results",
            description: "Receive crop recommendations in seconds, not days",
          },
          {
            icon: "📱",
            title: "Mobile Friendly",
            description:
              "Access from any device - desktop, tablet, or smartphone",
          },
          {
            icon: "🆓",
            title: "Free to Use",
            description:
              "No hidden costs. Quality agricultural advice for every farmer",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 border-2 border-gray-100 rounded-xl hover:border-green-300 hover:shadow-lg transition group"
          >
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
