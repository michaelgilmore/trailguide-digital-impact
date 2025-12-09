import { Shield, Award, Clock, Users, CheckCircle, Heart, Footprints } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const capabilities = [
  "FDA Compliance & IEC 62304",
  "Cloud & Infrastructure",
  "Web, Mobile & Desktop Apps",
  "Complex Data Pipelines",
  "Medical Device Software",
  "HIPAA-Compliant Systems",
];

function AnimatedPulse() {
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate hiking - pulse varies between 110-145 bpm
      setPulse(prev => {
        const change = Math.random() * 6 - 2; // -2 to +4 bias upward
        const newPulse = prev + change;
        return Math.max(110, Math.min(145, Math.round(newPulse)));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </motion.div>
        <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Pulse</span>
      </div>
      <div className="font-display text-3xl font-bold text-primary-foreground">
        <motion.span
          key={pulse}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {pulse}
        </motion.span>
        <span className="text-lg text-primary-foreground/60 ml-1">bpm</span>
      </div>
    </div>
  );
}

function AnimatedCalories() {
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // ~8-12 calories per minute for strenuous hiking
      setCalories(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
          <motion.div
            className="w-3 h-3 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Calories</span>
      </div>
      <div className="font-display text-3xl font-bold text-primary-foreground">
        <motion.span
          key={calories}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {calories}
        </motion.span>
        <span className="text-lg text-primary-foreground/60 ml-1">kcal</span>
      </div>
    </div>
  );
}

function AnimatedPace() {
  const [pace, setPace] = useState(18.5);

  useEffect(() => {
    const interval = setInterval(() => {
      // Pace varies between 16-22 min/mile for strenuous hiking
      setPace(prev => {
        const change = (Math.random() - 0.5) * 1.5;
        const newPace = prev + change;
        return Math.max(16, Math.min(22, Number(newPace.toFixed(1))));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          <Clock className="w-6 h-6 text-primary" />
        </motion.div>
        <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Pace</span>
      </div>
      <div className="font-display text-3xl font-bold text-primary-foreground">
        <motion.span
          key={pace}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {pace.toFixed(1)}
        </motion.span>
        <span className="text-lg text-primary-foreground/60 ml-1">min/mi</span>
      </div>
    </div>
  );
}

function AnimatedSteps() {
  const [steps, setSteps] = useState(0);
  const [leftStep, setLeftStep] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // ~100-120 steps per minute hiking
      setSteps(prev => prev + Math.floor(Math.random() * 3) + 2);
      setLeftStep(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex gap-0.5">
          <motion.div
            animate={{ 
              y: leftStep ? [0, -3, 0] : 0,
              opacity: leftStep ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
          >
            <Footprints className="w-5 h-5 text-primary -rotate-12" />
          </motion.div>
          <motion.div
            animate={{ 
              y: !leftStep ? [0, -3, 0] : 0,
              opacity: !leftStep ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
          >
            <Footprints className="w-5 h-5 text-primary rotate-12" />
          </motion.div>
        </div>
        <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Steps</span>
      </div>
      <div className="font-display text-3xl font-bold text-primary-foreground">
        <motion.span
          key={steps}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {steps.toLocaleString()}
        </motion.span>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-900 topo-pattern relative overflow-hidden">
      {/* Dark Overlay for better text contrast */}
      <div className="absolute inset-0 bg-slate-900/80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Why TrailGuide DHI
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6"
            >
              Your Trusted Partner in
              <span className="text-primary"> Healthcare Technology</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/70 text-lg mb-8"
            >
              TrailGuide DHI delivers software solutions across healthcare, public health research, and mission-critical industries. We combine deep technical expertise with regulatory knowledge to build systems that work.
            </motion.p>

            {/* Capabilities Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {capabilities.map((capability, index) => (
                <div 
                  key={capability}
                  className="flex items-center gap-2 text-primary-foreground/80"
                >
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{capability}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Animated Health Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <AnimatedPulse />
            <AnimatedCalories />
            <AnimatedPace />
            <AnimatedSteps />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
