import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 trail-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border p-8 sm:p-12 lg:p-16 shadow-card"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Ready to Get Started?
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4"
            >
              Ready to Accelerate
              <span className="text-primary"> Your Project?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
            >
              Let's discuss how TrailGuide DHI can help you navigate the complexities of healthcare software development and get your product to market faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact">
                <Button variant="hero" size="xl" className="gap-2 group w-full sm:w-auto">
                  <Calendar className="w-5 h-5" />
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                  <Mail className="w-5 h-5" />
                  Send a Message
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-border"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                No obligation consultation
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Response within 24 hours
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Confidential discussion
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
