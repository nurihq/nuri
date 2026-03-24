import json
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.texts = []
        self.in_script_or_style = False

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.in_script_or_style = True

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.in_script_or_style = False

    def handle_data(self, data):
        data = data.strip()
        if data and not self.in_script_or_style:
            self.texts.append(data)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

extractor = TextExtractor()
extractor.feed(html)

unique_texts = list(set(extractor.texts))
with open('extracted.json', 'w', encoding='utf-8') as f:
    json.dump(unique_texts, f, indent=2)
print("Extracted", len(unique_texts), "unique text nodes.")
