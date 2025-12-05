export default function UseCase() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600">
          Simple steps to better farming decisions
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            step: "1",
            title: "Enter Farm Data",
            description:
              "Provide basic information about your farm location and soil conditions",
          },
          {
            step: "2",
            title: "Upload Soil Image",
            description:
              "Optional: Add a photo of your soil for enhanced analysis",
          },
          {
            step: "3",
            title: "AI Analysis",
            description:
              "Our AI processes your data and analyzes optimal crop matches",
          },
          {
            step: "4",
            title: "Get Recommendations",
            description:
              "Receive personalized crop suggestions with farming tips",
          },
        ].map((item, index) => (
          <div key={index} className="relative">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            {index < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-4 md:-right-2 transform -translate-y-1/2">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
