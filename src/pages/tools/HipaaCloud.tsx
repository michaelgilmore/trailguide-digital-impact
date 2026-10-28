import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Cloud, Download, ExternalLink, RotateCcw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { checklist, checklistProgress } from "@/lib/hipaaCloud";

export default function HipaaCloud() {
  const [checked, setChecked] = useState<string[]>([]);
  const progress = checklistProgress(checked);

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> All tools</Link>
          <div className="flex items-center gap-3 mb-3">
            <Cloud className="w-8 h-8 text-foreground shrink-0" aria-hidden="true" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">{checklist.title}</h1>
          </div>
          <p className="text-muted-foreground mb-6">Review your cloud safeguards, vendor responsibilities, and the evidence behind your HIPAA planning.</p>
          <div className="flex flex-wrap gap-3 mb-3">
            <Button asChild variant="secondary"><a href="/downloads/trailguide-hipaa-cloud-checklist.pdf" download="trailguide-hipaa-cloud-checklist.pdf"><Download /> Download PDF</a></Button>
            <Button variant="ghost" disabled={checked.length === 0} onClick={() => setChecked([])}><RotateCcw /> Reset checklist</Button>
          </div>
          <p className="text-xs text-muted-foreground mb-8">PDF: blank checklist with evidence prompts and source links. Your selections stay on this page only and are not included in the PDF.</p>
          <div className="border-y border-border py-5 mb-8 flex flex-wrap items-center justify-between gap-3">
            <p role="status" className="font-semibold text-foreground">{progress.reviewed} of {progress.total} items reviewed</p>
            <p className="text-sm text-muted-foreground">{progress.remaining ? `${progress.remaining} remaining` : "Review complete — confirm evidence and outstanding risks."}</p>
          </div>

          {checklist.sections.map((section, index) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`} className="mb-10">
              <div className="flex gap-3 items-center mb-4">
                <span className="font-display text-sm font-semibold text-muted-foreground">0{index + 1}</span>
                <h2 id={`section-${section.id}`} className="font-display text-2xl font-semibold text-foreground">{section.title}</h2>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {section.items.map(item => (
                  <div key={item.id} className="py-5 flex gap-3 sm:gap-4">
                    <Checkbox id={item.id} aria-describedby={`${item.id}-detail`} checked={checked.includes(item.id)} onCheckedChange={value => {
                      setChecked(previous => value === true ? [...previous.filter(id => id !== item.id), item.id] : previous.filter(id => id !== item.id));
                    }} className="mt-1 border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background" />
                    <div className="min-w-0">
                      <label htmlFor={item.id} className="font-semibold text-foreground cursor-pointer">{item.title}</label>
                      <p id={`${item.id}-detail`} className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.detail}</p>
                      <p className="text-sm text-foreground mt-2"><span className="font-medium">Evidence:</span> {item.evidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="border-l-2 border-primary pl-4 mb-8">
            <p className="text-sm text-muted-foreground">{checklist.disclaimer}</p>
            <p className="text-xs text-muted-foreground mt-2">Planning edition: {checklist.version}. Selections are not saved or sent to TrailGuide.</p>
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">Official guidance</h2>
          <ul className="space-y-3 mb-8">
            {checklist.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground">{source.title}<ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /></a></li>)}
          </ul>
          <Button asChild variant="secondary"><Link to="/contact">Discuss your cloud plan <ArrowRight /></Link></Button>
        </div>
      </section>
    </Layout>
  );
}