import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calculator, RotateCcw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateProjectEstimate, estimateExtras, projectPresets } from "@/lib/projectEstimate";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function ProjectEstimator() {
  const [presetId, setPresetId] = useState<string>("discovery");
  const [low, setLow] = useState("40");
  const [high, setHigh] = useState("80");
  const [rate, setRate] = useState("");
  const [reserve, setReserve] = useState("0");
  const [extras, setExtras] = useState<string[]>([]);
  const preset = projectPresets.find(item => item.id === presetId) ?? projectPresets[0];
  let result: ReturnType<typeof calculateProjectEstimate> | null = null;
  let error = "";
  if (rate !== "") {
    try {
      if (low.trim() === "" || high.trim() === "" || reserve.trim() === "") throw new Error();
      result = calculateProjectEstimate({ lowHours: Number(low), highHours: Number(high), hourlyRate: Number(rate), contingency: Number(reserve), extras });
    } catch {
      error = "Enter positive hours (upper ≥ lower, up to 100,000), a rate from $0.01 to $10,000, and contingency from 0 to 100%.";
    }
  }
  function reset() {
    setPresetId("discovery"); setLow("40"); setHigh("80"); setRate(""); setReserve("0"); setExtras([]);
  }

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> All tools</Link>
          <div className="flex items-center gap-3 mb-3"><Calculator className="w-8 h-8 shrink-0 text-foreground" aria-hidden="true" /><h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Project Cost Estimator</h1></div>
          <p className="text-muted-foreground max-w-2xl mb-8">Explore an engineering budget range using your scope, effort assumptions, and hourly rate.</p>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-5">Your project assumptions</h2>
              <Label htmlFor="project-type">Project type</Label>
              <Select value={presetId} onValueChange={value => {
                const selected = projectPresets.find(item => item.id === value);
                if (!selected) return;
                setPresetId(value); setLow(String(selected.low)); setHigh(String(selected.high));
              }}><SelectTrigger id="project-type" className="mt-2"><SelectValue /></SelectTrigger><SelectContent>{projectPresets.map(item => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent></Select>
              <p className="text-sm text-muted-foreground mt-2 mb-6">{preset.description}</p>
              <fieldset className="mb-6">
                <legend className="text-sm font-medium text-foreground mb-3">Base effort range (total engineering hours)</legend>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="low-hours">Lower hours</Label><Input id="low-hours" type="number" min="1" max="100000" value={low} onChange={event => setLow(event.target.value)} className="mt-2" /></div>
                  <div><Label htmlFor="high-hours">Upper hours</Label><Input id="high-hours" type="number" min="1" max="100000" value={high} onChange={event => setHigh(event.target.value)} className="mt-2" /></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Preset hours are illustrative planning assumptions, not measured project averages. Replace them with your own estimate. Include design, development, testing, and coordination in base effort.</p>
              </fieldset>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div><Label htmlFor="hourly-rate">Your hourly rate (USD)</Label><Input id="hourly-rate" type="number" min="0.01" max="10000" step="0.01" placeholder="Enter a planning rate" value={rate} onChange={event => setRate(event.target.value)} className="mt-2" /><p className="text-xs text-muted-foreground mt-2">Your assumption—not a TrailGuide rate.</p></div>
                <div><Label htmlFor="contingency">Contingency (%)</Label><Input id="contingency" type="number" min="0" max="100" value={reserve} onChange={event => setReserve(event.target.value)} className="mt-2" /></div>
              </div>
              <fieldset>
                <legend className="font-semibold text-foreground mb-2">Additional scope</legend>
                <p className="text-xs text-muted-foreground mb-4">Illustrative extra effort. Select only work not already included in your base hours.</p>
                <div className="divide-y divide-border border-y border-border">
                  {estimateExtras.map(extra => <label key={extra.id} className="flex gap-3 py-4 cursor-pointer">
                    <Checkbox checked={extras.includes(extra.id)} onCheckedChange={value => setExtras(previous => value === true ? [...previous.filter(id => id !== extra.id), extra.id] : previous.filter(id => id !== extra.id))} aria-label={extra.label} className="mt-1 border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background" />
                    <div><span className="text-sm font-medium text-foreground">{extra.label}</span><p className="text-xs text-muted-foreground mt-1">{extra.detail}</p><p className="text-xs text-foreground mt-1">+{extra.low}–{extra.high} hours</p></div>
                  </label>)}
                </div>
              </fieldset>
              <Button variant="ghost" onClick={reset} className="mt-4"><RotateCcw /> Reset assumptions</Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 sm:p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Planning range</h2>
              <div aria-live="polite" aria-atomic="true">
                {result ? <>
                  <p className="text-sm text-muted-foreground mb-2">Engineering labor + contingency · USD</p>
                  <p className="font-display text-3xl font-bold text-foreground break-words mb-5">{money(result.lowTotal)} – {money(result.highTotal)}</p>
                  <dl className="text-sm divide-y divide-border">
                    <div className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-muted-foreground">Base effort</dt><dd className="text-foreground">{low}–{high} hours</dd></div>
                    {result.selected.map(extra => <div key={extra.id} className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-muted-foreground">{extra.label}</dt><dd className="text-foreground">{extra.low}–{extra.high} hours</dd></div>)}
                    <div className="flex flex-wrap justify-between gap-2 py-3 font-semibold text-foreground"><dt>Total effort</dt><dd>{result.lowHours}–{result.highHours} hours</dd></div>
                    <div className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-muted-foreground">Labor at {money(Number(rate))}/hour</dt><dd className="text-foreground">{money(result.lowLabor)} – {money(result.highLabor)}</dd></div>
                    <div className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-muted-foreground">Contingency ({reserve}%)</dt><dd className="text-foreground">{money(result.lowReserve)} – {money(result.highReserve)}</dd></div>
                  </dl>
                </> : <p className="text-sm text-muted-foreground py-5">{error || "Enter your hourly planning rate to see a budget range. No consulting price is assumed."}</p>}
              </div>
              <div className="border-t border-border pt-5 mt-4">
                <h3 className="font-semibold text-sm text-foreground mb-2">What this range excludes</h3>
                <p className="text-sm text-muted-foreground mb-5">Hosting, AI usage, software licenses, hardware, taxes, agency fees, external audits, clinical studies, and ongoing support. Team availability and dependencies affect schedule; hours are not a delivery-date promise.</p>
                <Button asChild variant="secondary" className="max-w-full whitespace-normal h-auto py-3"><Link to="/contact">Discuss your scope <ArrowRight /></Link></Button>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-primary pl-4 mt-8">
            <p className="text-sm text-muted-foreground">An illustrative scenario calculator, not a quote, market benchmark, or guaranteed budget. Total = (base hours + selected extra hours) × your rate × (1 + contingency / 100), calculated at each end of the range. Amounts are rounded to whole dollars. Confirm scope and pricing before making commitments.</p>
            <p className="text-xs text-muted-foreground mt-2">Your entries are not saved or sent to TrailGuide.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}