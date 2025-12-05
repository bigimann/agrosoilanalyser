import { useEffect, useState } from "react";

const StatsSection = () => {
  const [counts, setCounts] = useState({
    farmers: 0,
    crops: 0,
    accuracy: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    // Animated counter effect
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      farmers: 1247,
      crops: 52,
      accuracy: 95,
      satisfaction: 98,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        farmers: Math.floor(targets.farmers * progress),
        crops: Math.floor(targets.crops * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <div className="text-5xl font-bold mb-2">
            {counts.farmers.toLocaleString()}+
          </div>
          <div className="text-green-100 text-lg">Farmers Served</div>
        </div>
        <div>
          <div className="text-5xl font-bold mb-2">{counts.crops}+</div>
          <div className="text-green-100 text-lg">Crop Types</div>
        </div>
        <div>
          <div className="text-5xl font-bold mb-2">{counts.accuracy}%</div>
          <div className="text-green-100 text-lg">AI Accuracy</div>
        </div>
        <div>
          <div className="text-5xl font-bold mb-2">{counts.satisfaction}%</div>
          <div className="text-green-100 text-lg">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
