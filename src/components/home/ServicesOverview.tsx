import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Cpu, 
  Globe, 
  Cloud, 
  Database, 
  Users,
  ArrowRight,
  Shield,
  Zap,
  Code
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Cpu,
    title: "Medical Device Software",
    description: "IEC 62304 compliant development with FDA submission support for 510(k) and De Novo pathways.",
    features: ["Embedded Systems", "V&V Documentation", "Regulatory Compliance"],
    href: "/services#medical-device",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Healthcare Applications",
    description: "Full-stack web, mobile, and desktop applications for patient-facing and clinical systems.",
    features: ["Web & Mobile Apps", "Clinical Systems", "Patient Portals"],
    href: "/services#healthcare-apps",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Scalable AWS/Azure architecture with security-first design and HIPAA compliance built in.",
    features: ["AWS/Azure", "Microservices", "HIPAA Compliant"],
    href: "/services#cloud",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Database,
    title: "Public Health Systems",
    description: "Data pipeline development and analytics platforms for research and population health.",
    features: ["Data Pipelines", "Analytics", "Research Data"],
    href: "/services#public-health",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Technical Consulting",
    description: "Architecture design, code reviews, and technology strategy from a principal-level perspective.",
    features: ["Architecture", "Code Reviews", "Team Augmentation"],
    href: "/services#consulting",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesOverview() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 trail-pattern opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium text-sm uppercase tracking-wider"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4"
          >
            Software Solutions for
            <span className="text-primary"> Mission-Critical </span>
            Industries
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From FDA-regulated medical devices to scalable cloud infrastructure, we deliver software that meets the highest standards of quality and compliance.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Link */}
              <Link 
                to={service.href}
                className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="cta" size="lg" className="gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
