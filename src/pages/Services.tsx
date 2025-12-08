import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Globe, 
  Cloud, 
  Database, 
  Users,
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
  Smartphone,
  Monitor,
  Server,
  Code,
  BarChart3,
  Search
} from "lucide-react";

const services = [
  {
    id: "medical-device",
    icon: Cpu,
    title: "Medical Device Software Development",
    description: "Build FDA-compliant medical device software with proper documentation and quality processes from the start.",
    features: [
      { name: "IEC 62304 Compliant Development", description: "Software development lifecycle that meets international medical device standards" },
      { name: "FDA Submission Support", description: "Documentation and support for 510(k) and De Novo pathways" },
      { name: "Embedded Systems & RTOS", description: "Real-time operating systems and embedded software development" },
      { name: "Verification & Validation", description: "Comprehensive V&V processes and documentation" },
    ],
    useCases: ["Diagnostic devices", "Therapeutic systems", "Patient monitoring", "Laboratory equipment"],
  },
  {
    id: "healthcare-apps",
    icon: Globe,
    title: "Healthcare Application Development",
    description: "Full-stack development of web, mobile, and desktop applications for healthcare organizations.",
    features: [
      { name: "Web Applications", description: "Modern, responsive web applications built with React and TypeScript" },
      { name: "Mobile Applications", description: "Native and cross-platform iOS and Android development" },
      { name: "Desktop Applications", description: "Electron-based desktop solutions for clinical settings" },
      { name: "Patient & Clinical Systems", description: "Portals, EHR integrations, and clinical workflow tools" },
    ],
    useCases: ["Patient portals", "Provider dashboards", "Telehealth platforms", "Care coordination"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Design and implement scalable, secure cloud infrastructure that meets healthcare compliance requirements.",
    features: [
      { name: "AWS/Azure Architecture", description: "Cloud-native architecture design and implementation" },
      { name: "Microservices Design", description: "Scalable, maintainable microservices architecture" },
      { name: "Security & Compliance", description: "HIPAA, HITRUST, and SOC 2 compliant infrastructure" },
      { name: "Performance & Scalability", description: "Systems that grow with your business" },
    ],
    useCases: ["HIPAA-compliant hosting", "API development", "Data pipelines", "DevOps automation"],
  },
  {
    id: "public-health",
    icon: Database,
    title: "Public Health & Research Systems",
    description: "Build data infrastructure and analytics platforms for public health organizations and research institutions.",
    features: [
      { name: "Data Pipeline Development", description: "ETL processes and data integration workflows" },
      { name: "Analytics Platforms", description: "Business intelligence and data visualization tools" },
      { name: "Research Data Management", description: "Secure, compliant research data repositories" },
      { name: "Population Health Tools", description: "Surveillance and intervention tracking systems" },
    ],
    useCases: ["Disease surveillance", "Clinical trials", "Outcomes research", "Health informatics"],
  },
  {
    id: "consulting",
    icon: Users,
    title: "Technical Consulting",
    description: "Strategic guidance and hands-on expertise from a principal-level engineering perspective.",
    features: [
      { name: "Architecture & Design", description: "System design reviews and technical architecture planning" },
      { name: "Code Reviews & Quality", description: "In-depth code reviews and quality improvement recommendations" },
      { name: "Technology Strategy", description: "Technical roadmap development and technology selection" },
      { name: "Team Augmentation", description: "Embedded principal-level expertise for your team" },
    ],
    useCases: ["Technical due diligence", "Architecture reviews", "Team mentoring", "Process improvement"],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6"
            >
              Expert Software Solutions for
              <span className="text-primary"> Healthcare</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              From FDA-regulated medical devices to scalable cloud infrastructure, we deliver software that meets the highest standards of quality and compliance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature.name} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium text-foreground">{feature.name}</h4>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link to="/contact">
                      <Button variant="cta" className="gap-2">
                        Discuss Your Project
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Use Cases Card */}
                  <div className={`bg-card rounded-2xl border border-border p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                      Typical Use Cases
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {service.useCases.map((useCase) => (
                        <div 
                          key={useCase}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{useCase}</span>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Pattern */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Compliance-first approach for all projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 dark-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4"
            >
              Not Sure Where to Start?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/70 text-lg mb-8"
            >
              Let's discuss your project and find the right approach. Our consultations are always free and confidential.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/contact">
                <Button variant="hero" size="xl" className="gap-2">
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
