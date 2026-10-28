import checklist from "./hipaaCloudChecklist.json";

export { checklist };

export function checklistProgress(checkedIds: readonly string[]) {
  const items = checklist.sections.flatMap(section => section.items);
  const checked = new Set(checkedIds);
  const reviewed = items.filter(item => checked.has(item.id)).length;
  return { reviewed, total: items.length, remaining: items.length - reviewed };
}