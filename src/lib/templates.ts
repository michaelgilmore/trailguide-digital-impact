import catalog from "./templateCatalog.json";

export const templateCategories = ["All", "Medical device", "AI / ML", "Cloud & security", "Planning"] as const;
export type TemplateCategory = typeof templateCategories[number];
export const templates = catalog;

export function filterTemplates(query: string, category: TemplateCategory) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return templates.filter(template => {
    if (category !== "All" && template.category !== category) return false;
    const text = `${template.title} ${template.description} ${template.category} ${template.format} ${template.sections.map(section => `${section.title} ${section.prompt}`).join(" ")}`.toLowerCase();
    return terms.every(term => text.includes(term));
  });
}