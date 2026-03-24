from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

text_nodes = [t for t in soup.find_all(text=True) if t.strip() and t.parent.name not in ['script', 'style', 'title']]
for i, t in enumerate(text_nodes[:15]):
    print(repr(t))
