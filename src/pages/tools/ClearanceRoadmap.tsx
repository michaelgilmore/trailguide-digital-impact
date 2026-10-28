import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, Route, RotateCcw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { clearanceStages, roadmapProgress } from "@/lib/clearanceRoadmap";

export default function ClearanceRoadmap() {
  const [ai, setAi] = useState(false);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [open, setOpen] = useState<string[]>(["define"]);
  const progress = roadmapProgress(reviewed);

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> All tools</Link>
          <div className="flex items-center gap-3 mb-3">
            <Route className="w-8 h-8 text-foreground shrink-0" aria-hidden="true" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Code to Clearance</h1>
          </div>
          <p className="text-muted-foreground mb-4 max-w-2xl">Your medical device software roadmap—from intended use to evidence, regulatory review, and a controlled release.</p>
          <p className="text-sm text-muted-foreground mb-8">A planning map, not a guaranteed sequence or timeline. Activities often overlap and repeat; your pathway and evidence needs depend on your product.</p>
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <label className="flex items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
              <Checkbox checked={ai} onCheckedChange={value => setAi(value === true)} className="border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background" />
              Include AI/ML considerations
            </label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setOpen(open.length === clearanceStages.length ? [] : clearanceStages.map(stage => stage.id))}>{open.length === clearanceStages.length ? "Collapse all" : "Expand all"}</Button>
              <Button variant="ghost" size="sm" disabled={reviewed.length === 0} onClick={() => setReviewed([])}><RotateCcw /> Reset review</Button>
            </div>
          </div>
          <div className="border-y border-border py-5 mb-6">
            <p role="status" className="font-semibold text-foreground">{progress.count} of {progress.total} milestones reviewed</p>
            <p className="text-sm text-muted-foreground mt-1">{progress.next ? `Next to review: ${progress.next.title}` : "All milestones reviewed. Confirm the evidence and outstanding actions with your team."}</p>
          </div>

          <Accordion type="multiple" value={open} onValueChange={setOpen}>
            {clearanceStages.map((stage, index) => (
              <AccordionItem key={stage.id} value={stage.id} className="border-border">
                <AccordionTrigger className="text-left gap-3 py-6 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full border border-border bg-accent text-foreground font-semibold text-sm">{reviewed.includes(stage.id) ? <CheckCircle className="w-5 h-5" aria-label="Reviewed" /> : `0${index + 1}`}</span>
                    <div><h2 className="font-display text-xl font-semibold text-foreground">{stage.title}</h2><p className="text-sm text-muted-foreground font-normal mt-1">{stage.summary}</p></div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:pl-14 pb-6">
                  <h3 className="font-semibold text-foreground mb-2">Key activities</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-5">{stage.activities.map(activity => <li key={activity}>{activity}</li>)}</ul>
                  <h3 className="font-semibold text-foreground mb-2">Evidence & deliverables</h3>
                  <ul className="space-y-2 text-muted-foreground mb-5">{stage.deliverables.map(deliverable => <li key={deliverable} className="flex gap-2"><CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-foreground" aria-hidden="true" />{deliverable}</li>)}</ul>
                  <div className="border-l-2 border-primary pl-4 mb-5"><h3 className="font-semibold text-foreground mb-1">Decision gate</h3><p className="text-muted-foreground">{stage.gate}</p></div>
                  {ai && <div className="bg-accent text-foreground p-4 rounded-lg mb-5"><h3 className="font-semibold mb-1">AI/ML considerations</h3><p>{stage.ai}</p></div>}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Button asChild variant="outline" className="h-auto whitespace-normal text-left py-2"><Link to={stage.tool.href}>{stage.tool.label}<ArrowRight /></Link></Button>
                    <label className="flex gap-2 items-center text-foreground cursor-pointer">
                      <Checkbox checked={reviewed.includes(stage.id)} onCheckedChange={value => setReviewed(previous => value === true ? [...previous.filter(id => id !== stage.id), stage.id] : previous.filter(id => id !== stage.id))} aria-label={`Mark ${stage.title} reviewed`} className="border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background" />Reviewed
                    </label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="border-l-2 border-primary pl-4 my-8">
            <p className="text-sm text-muted-foreground">Educational guidance only—not legal advice, a complete submission checklist, or an FDA determination. “Clearance” is shorthand here: the applicable outcome may be 510(k) clearance, a De Novo grant, PMA approval, or an exempt pathway. Confirm requirements with qualified advisors.</p>
            <p className="text-xs text-muted-foreground mt-2">October 2026 edition. Review marks reflect your reading, not completed development or regulatory authorization. Selections are not saved or sent to TrailGuide.</p>
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">Official FDA guidance</h2>
          <ul className="space-y-3 mb-8">
            {[
              { title: "Device advice: regulatory assistance", url: "https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance" },
              { title: "Device software submission documentation", url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/content-premarket-submissions-device-software-functions" },
              { title: "Quality Management System Regulation (QMSR)", url: "https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr" },
            ].map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground">{source.title}<ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /></a></li>)}
          </ul>
          <Button asChild variant="secondary"><Link to="/contact">Plan your next milestone<ArrowRight /></Link></Button>
        </div>
      </section>
    </Layout>
  );
}