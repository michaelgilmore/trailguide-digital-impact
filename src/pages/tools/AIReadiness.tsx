import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BrainCircuit, CheckCircle, RotateCcw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { assessReadiness, readinessQuestions, type ReadinessAnswer } from "@/lib/aiReadiness";

const options: { value: ReadinessAnswer; label: string }[] = [
  { value: 0, label: "Not started / unsure" },
  { value: 1, label: "In progress" },
  { value: 2, label: "Documented & reviewed" },
];

export default function AIReadiness() {
  const [answers, setAnswers] = useState<(ReadinessAnswer | undefined)[]>(Array(readinessQuestions.length).fill(undefined));
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const question = readinessQuestions[index];
  const completeAnswers = answers.filter((answer): answer is ReadinessAnswer => answer !== undefined);
  const result = done && completeAnswers.length === readinessQuestions.length ? assessReadiness(completeAnswers) : null;

  function move(next: number) {
    setIndex(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function reset() {
    setAnswers(Array(readinessQuestions.length).fill(undefined));
    setDone(false);
    move(0);
  }

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> All tools
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <BrainCircuit className="w-8 h-8 text-foreground shrink-0" aria-hidden="true" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">AI/ML Readiness Check</h1>
          </div>
          <p className="text-muted-foreground mb-8">Assess your healthcare AI project’s foundations, evidence, and lifecycle planning.</p>

          <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-soft">
            {!result ? (
              <>
                <div className="flex justify-between gap-3 text-sm text-muted-foreground mb-3">
                  <span>Question {index + 1} of {readinessQuestions.length}</span>
                  <span>{question.title}</span>
                </div>
                <div role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={8} aria-valuenow={index} className="grid grid-cols-8 gap-1 mb-8">
                  {readinessQuestions.map((q, i) => <div key={q.id} className={`h-1.5 rounded-sm ${i < index ? "bg-primary" : "bg-muted"}`} />)}
                </div>
                <h2 ref={heading} tabIndex={-1} id="readiness-question" className="font-display text-2xl font-semibold text-foreground mb-3 focus:outline-none">{question.question}</h2>
                <p id="readiness-detail" className="text-sm text-muted-foreground mb-6">{question.detail}</p>
                <RadioGroup aria-labelledby="readiness-question" aria-describedby="readiness-detail" value={answers[index]?.toString() ?? ""} onValueChange={value => {
                  const selected = options.find(option => option.value.toString() === value);
                  if (!selected) return;
                  setAnswers(previous => previous.map((answer, i) => i === index ? selected.value : answer));
                }} className="gap-3">
                  {options.map(option => (
                    <label key={option.value} htmlFor={`${question.id}-${option.value}`} className={`flex gap-3 items-center cursor-pointer rounded-lg border p-4 text-sm text-foreground ${answers[index] === option.value ? "border-primary bg-accent" : "border-border hover:bg-muted"}`}>
                      <RadioGroupItem id={`${question.id}-${option.value}`} value={option.value.toString()} />
                      {option.label}
                    </label>
                  ))}
                </RadioGroup>
                <div className="flex justify-between gap-3 mt-8">
                  <Button variant="ghost" disabled={index === 0} onClick={() => move(index - 1)}><ArrowLeft /> Back</Button>
                  <Button variant="secondary" disabled={answers[index] === undefined} onClick={() => {
                    if (index === readinessQuestions.length - 1) {
                      setDone(true);
                      requestAnimationFrame(() => heading.current?.focus());
                    } else move(index + 1);
                  }}>{index === readinessQuestions.length - 1 ? "View results" : "Next"}<ArrowRight /></Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-2">Your planning readiness</p>
                <h2 ref={heading} tabIndex={-1} className="font-display text-3xl font-bold text-foreground focus:outline-none">{result.stage}</h2>
                <p className="font-display text-5xl font-bold text-foreground my-4">{result.score}<span className="text-xl text-muted-foreground font-normal"> / 100</span></p>
                <p className="text-sm text-muted-foreground mb-8">Based on your self-reported answers. Each area is equally weighted: not started or unsure = 0, in progress = 1, documented and reviewed = 2. Planning bands: below 50, 50–79, and 80–100. A high score does not override an unresolved safety, privacy, or regulatory gap.</p>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">{result.gaps.length ? "Your next priorities" : "Your next milestone"}</h3>
                {result.gaps.length ? (
                  <ol className="divide-y divide-border mb-8">
                    {result.gaps.map(gap => (
                      <li key={gap.id} className="py-4 first:pt-0">
                        <div className="flex flex-wrap justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{gap.title}</h4>
                          <span className="text-xs text-muted-foreground">{gap.answer === 0 ? "Not started / unsure" : "In progress"}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{gap.action}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="flex gap-2 text-sm text-muted-foreground mb-8"><CheckCircle className="w-5 h-5 shrink-0 text-foreground" /> Arrange an independent review of your evidence, test assumptions in the intended clinical setting, and confirm ownership of monitoring and change control.</p>
                )}
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="secondary"><Link to="/contact">Talk through your results <ArrowRight /></Link></Button>
                  <Button variant="outline" onClick={() => { setDone(false); move(0); }}><ArrowLeft /> Review answers</Button>
                  <Button variant="ghost" onClick={reset}><RotateCcw /> Start over</Button>
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-6">Educational planning guidance only—not a validated readiness instrument, clinical validation, legal advice, or a determination of FDA clearance or HIPAA compliance. Your answers are not saved or sent to TrailGuide.</p>
        </div>
      </section>
    </Layout>
  );
}