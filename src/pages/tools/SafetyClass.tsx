import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw } from "lucide-react";
import { classifySoftware, classDeliverables, type Harm, type SafetyAnswers } from "@/lib/iec62304";

type Step = {
  key: keyof SafetyAnswers;
  question: string;
  help: string;
  options: { label: string; value: boolean | Harm }[];
};

const steps: Step[] = [
  {
    key: "canContributeToHazard",
    question: "Can a failure of your software contribute to a hazardous situation?",
    help: "Consider wrong outputs, delays, crashes, or missing alarms — anything that could put a patient, operator, or bystander at risk.",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    key: "externalControlsEliminateHarm",
    question: "Do risk controls outside the software reduce the resulting risk to an acceptable level with no possible harm?",
    help: "E.g., hardware interlocks, independent alarms, or mandatory clinician review that fully prevent harm.",
    options: [
      { label: "Yes, harm is not possible", value: true },
      { label: "No, harm is still possible", value: false },
    ],
  },
  {
    key: "worstHarm",
    question: "What is the worst harm that could result?",
    help: "Serious injury means life-threatening, permanent impairment, or requiring medical intervention to prevent it.",
    options: [
      { label: "No injury", value: "none" },
      { label: "Non-serious injury", value: "non-serious" },
      { label: "Serious injury or death", value: "serious" },
    ],
  },
];

export default function SafetyClass() {
  const [answers, setAnswers] = useState<Partial<SafetyAnswers>>({});
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (value: boolean | Harm) => {
    const next = { ...answers, [steps[i].key]: value };
    setAnswers(next);
    const shortCircuit = (i === 0 && value === false) || (i === 1 && value === true);
    if (shortCircuit || i === steps.length - 1) {
      setDone(true);
    } else setI(i + 1);
  };

  const reset = () => { setAnswers({}); setI(0); setDone(false); };

  const result = done
    ? classifySoftware({
        canContributeToHazard: answers.canContributeToHazard ?? false,
        externalControlsEliminateHarm: answers.externalControlsEliminateHarm ?? false,
        worstHarm: answers.worstHarm ?? "none",
      })
    : null;

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> All tools
          </Link>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">IEC 62304 Safety Class Quiz</h1>
          <p className="text-muted-foreground mb-10">
            Find your software safety class (A, B, or C) and the documentation it requires. Three questions, under a minute.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            {!result ? (
              <>
                <p className="text-sm text-primary font-medium mb-2">Question {i + 1} of {steps.length}</p>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3">{steps[i].question}</h2>
                <p className="text-muted-foreground text-sm mb-6">{steps[i].help}</p>
                <div className="grid gap-3">
                  {steps[i].options.map((o) => (
                    <Button key={o.label} variant="outline" className="justify-between h-auto py-4" onClick={() => choose(o.value)}>
                      {o.label} <ArrowRight className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
                {i > 0 && (
                  <button onClick={() => setI(i - 1)} className="mt-6 text-sm text-muted-foreground hover:text-primary">← Back</button>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-1">Your software is likely</p>
                <h2 className="font-display text-5xl font-bold text-primary mb-3">Class {result}</h2>
                <p className="text-foreground mb-6">{classDeliverables[result].summary}</p>
                <h3 className="font-semibold text-foreground mb-3">Required activities & documentation</h3>
                <ul className="space-y-2 mb-8">
                  {classDeliverables[result].docs.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {d}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mb-6">
                  Educational guidance only. Final classification must be justified in your risk management file.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact"><Button variant="cta" className="gap-2">Talk through your result <ArrowRight className="w-4 h-4" /></Button></Link>
                  <Button variant="outline" onClick={reset} className="gap-2"><RotateCcw className="w-4 h-4" /> Start over</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
