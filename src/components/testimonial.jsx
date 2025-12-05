export default function Testimonial() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Farmers Say
        </h2>
        <p className="text-xl text-gray-600">
          Success stories from our community
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Adeola Johnson",
            location: "Kaduna, Nigeria",
            image: "👨‍🌾",
            quote:
              "AgroSoilAssistant helped me choose the right crops for my soil. My yield increased by 40% this season!",
          },
          {
            name: "Fatima Ibrahim",
            location: "Kano, Nigeria",
            image: "👩‍🌾",
            quote:
              "The AI recommendations were spot-on. I'm now growing crops I never thought would work on my farm.",
          },
          {
            name: "Chidi Okonkwo",
            location: "Enugu, Nigeria",
            image: "👨‍🌾",
            quote:
              "Easy to use and incredibly accurate. This technology is a game-changer for Nigerian farmers.",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="bg-linear-to-br from-green-50 to-emerald-50 p-6 rounded-xl"
          >
            <div className="text-5xl mb-4">{testimonial.image}</div>
            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
            <div className="border-t border-green-200 pt-4">
              <div className="font-bold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-600">
                {testimonial.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
