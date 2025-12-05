import FAQ from "../components/FAQ";
import StatsSection from "../components/statsSection";
import Footer from "../components/footer";
import CTA from "../components/CTA";
import Navigation from "../components/navBar";
import Hero from "../components/hero";
import Features from "../components/features";
import UseCase from "../components/useCase";
import Testimonial from "../components/testimonial";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <Navigation />
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="py-12 px-4">
        <Hero />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <Features />
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-linear-to-br from-green-50 to-emerald-50"
      >
        <UseCase />
      </section>

      {/* Testimonials Section */}
      <section id="users-testimony" className="py-20 bg-white">
        <Testimonial />
      </section>

      {/* Statistics Section */}
      <section
        id="users-statistics"
        className="bg-linear-to-r from-green-600 to-emerald-600 py-16"
      >
        <StatsSection />
      </section>

      {/* FAQ Section */}
      <section id="frequently-asked-questions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="call-to-action"
        className="py-20 bg-linear-to-r from-green-600 to-emerald-600"
      >
        <CTA />
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
