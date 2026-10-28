"""Generate the fixed public checklist from the same content as the web tool.

Run from the project root with Python and ReportLab installed.
"""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / "src/lib/hipaaCloudChecklist.json").read_text())
output = ROOT / "public/downloads/trailguide-hipaa-cloud-checklist.pdf"
output.parent.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor("#202b3c")
muted = colors.HexColor("#526170")
accent = colors.HexColor("#28BBE0")
styles = {
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=25, leading=29, textColor=ink, spaceAfter=10),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=ink, spaceAfter=18),
    "item": ParagraphStyle("item", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=ink, spaceAfter=5),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13, textColor=muted, spaceAfter=7),
    "small": ParagraphStyle("small", fontName="Helvetica", fontSize=8, leading=11, textColor=muted, spaceAfter=6),
}

def p(text, style="body"):
    return Paragraph(text, styles[style])

def footer(canvas, doc):
    canvas.setStrokeColor(accent)
    canvas.setLineWidth(1.5)
    canvas.line(42, 44, 570, 44)
    canvas.setFillColor(muted)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(42, 30, "TrailGuide Digital Health Intelligence | trailguidedhi.com")
    canvas.drawRightString(570, 30, f"{data['version']} | {doc.page}")

story = []
for index, section in enumerate(data["sections"]):
    if index:
        story.append(PageBreak())
    story.append(p(escape(data["title"]), "title"))
    story.append(p(f"0{index + 1} / {escape(section['title'])}", "section"))
    if index == 0:
        story.append(p("Review each item with your team and record supporting evidence. This blank worksheet does not include website selections.", "body"))
        story.append(Spacer(1, 8))
    for item in section["items"]:
        story.append(KeepTogether([
            p("[  ] " + escape(item["title"]), "item"),
            p(escape(item["detail"])),
            p("<b>Evidence:</b> " + escape(item["evidence"]), "small"),
            p("Owner / next action: __________________________________________________", "small"),
            Spacer(1, 12),
        ]))
    story.append(p(escape(data["disclaimer"]), "small"))
    if index == len(data["sections"]) - 1:
        story.append(Spacer(1, 6))
        story.append(p("Official guidance", "item"))
        for source in data["sources"]:
            story.append(p(f'<a href="{escape(source["url"])}" color="#202b3c"><u>{escape(source["title"])}</u></a>', "small"))

SimpleDocTemplate(str(output), pagesize=letter, rightMargin=42, leftMargin=42,
                  topMargin=42, bottomMargin=60,
                  title=data["title"], author="TrailGuide Digital Health Intelligence").build(story, onFirstPage=footer, onLaterPages=footer)
print(f"Generated {output.relative_to(ROOT)}")