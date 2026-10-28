"""Generate editable public downloads from the library's shared catalog.

Run from the project root with Python and python-docx installed.
"""
import csv
import json
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
catalog = json.loads((ROOT / "src/lib/templateCatalog.json").read_text())
output = ROOT / "public/downloads/templates"
output.mkdir(parents=True, exist_ok=True)
disclaimer = "Starter template for educational planning only. Adapt to your product, risks, quality system, and applicable requirements. Not legal advice, a complete regulatory submission, or proof of compliance. Obtain qualified review before relying on it. Do not include patient data in shared drafts."
for template in catalog:
    target = output / template["filename"]
    if template["format"] == "CSV":
        with target.open("w", newline="", encoding="utf-8-sig") as file:
            writer = csv.writer(file)
            writer.writerow(template["columns"])
            for _ in range(8):
                writer.writerow([""] * len(template["columns"]))
        continue
    doc = Document()
    section = doc.sections[0]
    section.top_margin = section.bottom_margin = Inches(.7)
    section.left_margin = section.right_margin = Inches(.8)
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(11)
    normal.font.color.rgb = RGBColor.from_string("202B3C")
    for heading in ["Title", "Heading 1", "Heading 2"]:
        doc.styles[heading].font.color.rgb = RGBColor.from_string("202B3C")
    section.header.paragraphs[0].text = "TrailGuide Digital Health Intelligence | Starter templates"
    section.footer.paragraphs[0].text = "trailguidedhi.com | October 2026 | Adapt and review before use"
    doc.add_heading(template["title"], 0)
    doc.add_paragraph(template["description"])
    table = doc.add_table(rows=0, cols=2)
    table.style = "Light Shading Accent 1"
    for label in ["Product / project", "Document ID / version", "Owner", "Reviewers / approvers", "Date / status"]:
        cells = table.add_row().cells
        cells[0].text = label
        cells[1].text = "[Enter details]"
    doc.add_paragraph(disclaimer)
    for index, item in enumerate(template["sections"], 1):
        doc.add_heading(f"{index}. {item['title']}", level=1)
        doc.add_paragraph(item["prompt"])
        doc.add_paragraph("[Replace with your project-specific content and supporting evidence.]")
    doc.add_heading("Open actions & review record", level=1)
    table = doc.add_table(rows=1, cols=4)
    table.style = "Light Shading Accent 1"
    for cell, value in zip(table.rows[0].cells, ["Action / decision", "Owner", "Due date", "Evidence / status"]):
        cell.text = value
    for _ in range(3):
        for cell in table.add_row().cells:
            cell.text = "[Enter details]"
    doc.core_properties.title = template["title"]
    doc.core_properties.author = "TrailGuide Digital Health Intelligence"
    doc.save(target)
print(f"Generated {len(catalog)} editable templates in {output.relative_to(ROOT)}")