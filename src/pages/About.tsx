import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  Target, 
  Users, 
  Award, 
  Shield, 
  Code, 
  Cloud, 
  Database,
  CheckCircle,
  Compass
} from "lucide-react";

const expertise = [
  {
    icon: Code,
    title: "Principal-Level Engineering",
    description: "Over two decades of hands-on experience architecting and building complex systems at the highest level.",
  },
  {
    icon: Shield,
    title: "Healthcare Technology",
    description: "Deep specialization in healthcare software, from patient-facing applications to clinical systems.",
  },
  {
    icon: Award,
    title: "Medical Device Software & IEC 62304",
    description: "Comprehensive expertise in developing software for FDA-regulated medical devices with proper documentation.",
  },
  {
    icon: Database,
    title: "Regulatory Compliance",
    description: "Thorough understanding of FDA, HIPAA, and international healthcare regulations.",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "AWS and Azure expertise for building scalable, secure, and compliant infrastructure.",
  },
];

const values = [
  {
    title: "Partnership",
    description: "We work alongside your team as trusted advisors, not just vendors. Your success is our success.",
  },
  {
    title: "Guidance",
    description: "We illuminate the path forward, helping you navigate complex technical and regulatory landscapes.",
  },
  {
    title: "Quality",
    description: "We believe in doing things right the first time. Quality is built into every line of code we write.",
  },
  {
    title: "Transparency",
    description: "Clear communication and honest assessments ensure we're always aligned on goals and progress.",
  },
];

export default function About() {
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
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6"
            >
              Guiding Healthcare Technology
              <span className="text-primary"> Forward</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              TrailGuide Digital Health Intelligence was founded on a simple principle: healthcare software deserves the same level of care and expertise as the patients it ultimately serves.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground mb-4">
                  We believe that small to mid-sized healthtech companies deserve access to the same caliber of engineering expertise typically reserved for large enterprises. Our mission is to be the trusted technical partner that helps you navigate the complexities of healthcare software development.
                </p>
                <p className="text-muted-foreground">
                  Whether you're bringing a new medical device to market, building a patient engagement platform, or modernizing legacy healthcare systems, we provide the guidance and hands-on expertise to get you there.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  What Sets Us Apart
                </h3>
                <ul className="space-y-4">
                  {[
                    "20+ years of principal-level engineering experience",
                    "Deep expertise in FDA regulations and IEC 62304",
                    "Focus exclusively on healthcare and mission-critical industries",
                    "Quality-first approach with rigorous processes",
                    "Hands-on partnership, not just advisory",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4"
            >
              Technical Excellence Across
              <span className="text-primary"> Every Domain</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 dark-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Our Approach
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mt-3 mb-4"
            >
              How We Work With
              <span className="text-primary"> Our Clients</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-display font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
