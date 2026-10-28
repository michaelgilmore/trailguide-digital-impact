import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ShieldCheck, ArrowRight, BrainCircuit, Cloud, FileText, Route } from "lucide-react";

export const tools = [
  {
    href: "/tools/code-to-clearance",
    icon: Route,
    title: "Code to Clearance",
    description: "Explore the milestones, decisions, and evidence along your medical device software journey.",
  },
  {
    href: "/tools/templates",
    icon: FileText,
    title: "Template Library",
    description: "Editable starting points for software planning, traceability, AI evaluation, and cloud reviews.",
  },
  {
    href: "/tools/hipaa-cloud-checklist",
    icon: Cloud,
    title: "HIPAA Cloud Checklist",
    description: "Review your cloud safeguards and supporting evidence, with a downloadable PDF checklist.",
  },
  {
    href: "/tools/ai-ml-readiness",
    icon: BrainCircuit,
    title: "AI/ML Readiness Check",
    description: "Assess your healthcare AI project’s readiness and identify your next priorities.",
  },
  {
    href: "/tools/iec-62304-safety-class",
    icon: ShieldCheck,
    title: "IEC 62304 Safety Class Quiz",
    description: "Determine your software safety class and the documentation it requires.",
  },
];

export default function Tools() {
  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Free Tools</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">Trail Tools</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Practical tools to help you navigate regulation, compliance, and planning for health tech, medical device, and AI software.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((t) => (
              <Link key={t.href} to={t.href} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-card transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <t.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary">{t.title}</h2>
                <p className="text-muted-foreground text-sm mb-4">{t.description}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">Open tool <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
