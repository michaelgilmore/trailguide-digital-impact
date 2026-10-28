import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, FileText, Search, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filterTemplates, templateCategories, type TemplateCategory } from "@/lib/templates";

export default function Templates() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("All");
  const results = filterTemplates(query, category);
  const clear = () => { setQuery(""); setCategory("All"); };

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> All tools</Link>
          <div className="flex gap-3 items-center mb-3">
            <FileText className="w-8 h-8 shrink-0 text-foreground" aria-hidden="true" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Template Library</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-8">Give your next project a clear starting point, from software planning and traceability to AI evaluation and cloud reviews.</p>

          <div className="relative max-w-lg mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input type="search" aria-label="Search templates" placeholder="Search templates" value={query} onChange={event => setQuery(event.target.value)} className="pl-10 pr-12" />
            {query && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-0 top-0"><X /></Button>}
          </div>
          <Tabs value={category} onValueChange={value => {
            const selected = templateCategories.find(item => item === value);
            if (selected) setCategory(selected);
          }} className="mb-6">
            <TabsList aria-label="Template category" className="h-auto flex flex-wrap justify-start gap-1 w-fit max-w-full">
              {templateCategories.map(item => <TabsTrigger key={item} value={item}>{item}</TabsTrigger>)}
            </TabsList>
          </Tabs>
          <p role="status" className="text-sm text-muted-foreground mb-5">{results.length} {results.length === 1 ? "template" : "templates"}</p>

          {results.length ? (
            <div className="grid md:grid-cols-2 gap-5">
              {results.map(template => (
                <article key={template.id} className="flex flex-col bg-card border border-border rounded-lg p-5 sm:p-6">
                  <div className="flex justify-between gap-3 text-xs text-muted-foreground mb-4"><span>{template.category}</span><span className="font-semibold text-foreground">{template.format}</span></div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">{template.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <details className="text-sm mb-5">
                    <summary className="cursor-pointer text-foreground font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">What’s included</summary>
                    <ul className="space-y-3 mt-4 border-l-2 border-border pl-4">
                      {template.sections.map(section => <li key={section.title}><h3 className="text-sm font-semibold text-foreground">{section.title}</h3><p className="text-muted-foreground mt-1 leading-relaxed">{section.prompt}</p></li>)}
                    </ul>
                  </details>
                  <div className="mt-auto">
                    <Button asChild variant="secondary"><a href={`/downloads/templates/${template.filename}`} download={template.filename} aria-label={`Download ${template.title}`}><Download /> Download {template.format}</a></Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-y border-border py-12">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">No matching templates</h2>
              <Button variant="outline" onClick={clear}><X /> Clear filters</Button>
            </div>
          )}
          <div className="border-l-2 border-primary pl-4 mt-10 mb-8">
            <p className="text-sm text-muted-foreground">Starter templates for educational planning—not legal advice, complete regulatory submissions, or proof of compliance. Adapt them to your product, risks, quality system, and applicable requirements, with qualified review. Do not include patient data in shared drafts.</p>
            <p className="text-xs text-muted-foreground mt-2">October 2026 edition · Editable Word documents and spreadsheet-ready CSV files · No signup required</p>
          </div>
          <Button asChild variant="secondary"><Link to="/contact">Discuss your project <ArrowRight /></Link></Button>
        </div>
      </section>
    </Layout>
  );
}