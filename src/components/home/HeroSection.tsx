import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Heart, Footprints, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import heroTrail from "@/assets/hero-trail.jpg";

function AnimatedPulse() {
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => {
        const change = Math.random() * 6 - 2;
        const newPulse = prev + change;
        return Math.max(110, Math.min(145, Math.round(newPulse)));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </motion.div>
        <motion.span
          key={pulse}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="font-display text-3xl sm:text-4xl font-bold text-primary"
        >
          {pulse}
        </motion.span>
      </div>
      <div className="text-white/60 text-sm">BPM</div>
    </div>
  );
}

function AnimatedCalories() {
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCalories((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <motion.div
          className="w-4 h-4 rounded-full bg-orange-500"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.span
          key={calories}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="font-display text-3xl sm:text-4xl font-bold text-primary"
        >
          {calories}
        </motion.span>
      </div>
      <div className="text-white/60 text-sm">Calories</div>
    </div>
  );
}

function AnimatedPace() {
  const [pace, setPace] = useState(18.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setPace((prev) => {
        const change = (Math.random() - 0.5) * 1.5;
        const newPace = prev + change;
        return Math.max(16, Math.min(22, Number(newPace.toFixed(1))));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
          <Clock className="w-5 h-5 text-primary" />
        </motion.div>
        <motion.span
          key={pace}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="font-display text-3xl sm:text-4xl font-bold text-primary"
        >
          {pace.toFixed(1)}
        </motion.span>
      </div>
      <div className="text-white/60 text-sm">Min/Mile</div>
    </div>
  );
}

function AnimatedSteps() {
  const [steps, setSteps] = useState(0);
  const [leftStep, setLeftStep] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prev) => prev + Math.floor(Math.random() * 2) + 1);
      setLeftStep((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="flex gap-0.5">
          <motion.div
            animate={{ y: leftStep ? [0, -3, 0] : 0, opacity: leftStep ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            <Footprints className="w-4 h-4 text-primary -rotate-12" />
          </motion.div>
          <motion.div
            animate={{ y: !leftStep ? [0, -3, 0] : 0, opacity: !leftStep ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            <Footprints className="w-4 h-4 text-primary rotate-12" />
          </motion.div>
        </div>
        <motion.span
          key={steps}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="font-display text-3xl sm:text-4xl font-bold text-primary"
        >
          {steps.toLocaleString()}
        </motion.span>
      </div>
      <div className="text-white/60 text-sm">Steps</div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroTrail})` }}
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            TrailGuide
            <br />
            <span className="text-primary">Digital Health Intelligence</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 mb-8 font-light"
          >
            Accelerating Your Path from Code to Patient Impact
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
          >
            With 20+ years of principal-level engineering experience, we combine deep technical expertise with
            regulatory knowledge to build systems that work—whether you're navigating FDA compliance, managing complex
            data pipelines, or scaling cloud infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <Button variant="hero" size="xl" className="gap-2 group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl">
                Explore Our Services
              </Button>
            </Link>
          </motion.div>

          {/* Animated Health Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            <AnimatedPulse />
            <AnimatedCalories />
            <AnimatedPace />
            <AnimatedSteps />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/60"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
