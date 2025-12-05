export default function CTA() {
  return (
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">
        Ready to Improve Your Harvest?
      </h2>
      <p className="text-xl text-green-100 mb-8">
        Join thousands of farmers making smarter decisions with AI
      </p>
      <button
        onClick={() => navigate("/form")}
        className="bg-white text-green-600 hover:bg-green-50 px-10 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
      >
        Get Free Recommendations Now →
      </button>
    </div>
  );
}
