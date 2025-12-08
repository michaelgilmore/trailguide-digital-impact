import { Shield, Award, Clock, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const differentiators = [
  {
    icon: Clock,
    title: "20+ Years Experience",
    description: "Principal-level engineering expertise refined over two decades of complex healthcare projects.",
  },
  {
    icon: Shield,
    title: "Deep Regulatory Expertise",
    description: "Comprehensive knowledge of FDA processes, IEC 62304, HIPAA, and other healthcare regulations.",
  },
  {
    icon: Award,
    title: "Healthcare Specialization",
    description: "Focused exclusively on healthcare, public health, and mission-critical industries.",
  },
  {
    icon: CheckCircle,
    title: "Quality-First Approach",
    description: "Rigorous processes and documentation that ensure software works from day one.",
  },
];

const capabilities = [
  "FDA Compliance & IEC 62304",
  "Cloud & Infrastructure",
  "Web, Mobile & Desktop Apps",
  "Complex Data Pipelines",
  "Medical Device Software",
  "HIPAA-Compliant Systems",
];

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

          {/* Right Column - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
