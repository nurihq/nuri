import os
import re

def build():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Add <base href="/"> immediately after <head>
    html = html.replace('<head>', '<head>\n    <base href="/">')

    # Add language script
    def set_lang(doc, lang):
        return doc.replace('</head>', f'    <script>window.siteLang = "{lang}";</script>\n</head>')

    # Add OG image replacement for portfolio
    def set_portfolio_og(doc):
        # We replace the default og:image with one of the colorful portfolio images, e.g., honeyboba.png
        doc = doc.replace(
            '<meta property="og:image" content="https://nuri.software/img/og-image.png" />',
            '<meta property="og:image" content="https://nuri.software/img/portfolio/mao.png" />'
        )
        # Update titles to show it's the portfolio
        doc = doc.replace(
            '<title>Nuri ぬり — Web Development</title>',
            '<title>Portfolio | Nuri ぬり</title>'
        )
        doc = doc.replace(
            '<meta property="og:title" content="Nuri ぬり — Web Development" />',
            '<meta property="og:title" content="Portfolio | Nuri ぬり" />'
        )
        doc = doc.replace(
            '<meta property="twitter:title" content="Nuri ぬり — Web Development" />',
            '<meta property="twitter:title" content="Portfolio | Nuri ぬり" />'
        )
        return doc

    # Add auto-scroll to portfolio
    def set_portfolio_scroll(doc):
        return doc.replace('</body>', '    <script>\n'
                                      '      document.addEventListener("DOMContentLoaded", function() {\n'
                                      '        setTimeout(function() {\n'
                                      '          var section = document.getElementById("portfolio");\n'
                                      '          if (section) section.scrollIntoView();\n'
                                      '        }, 100); \n'
                                      '      });\n'
                                      '    </script>\n</body>')

    def create_failures_page(doc):
        import re
        comments_pattern = re.compile(r'<!--\s*(<a [^>]*class="[^"]*portfolio-card[^"]*"[^>]*>.*?</a>)\s*-->', re.DOTALL)
        failed_cards = comments_pattern.findall(doc)
        
        parts = doc.split('<div class="portfolio-grid" id="portfolioGrid">')
        if len(parts) > 1:
            prefix = parts[0] + '<div class="portfolio-grid" id="portfolioGrid">'
            subparts = parts[1].split('<button class="carousel-btn carousel-next"')
            suffix = '<button class="carousel-btn carousel-next"' + subparts[1]
            doc = prefix + '\n' + '\n'.join(failed_cards) + '\n                    </div>\n                    ' + suffix
            
        doc = doc.replace('<title>Nuri ぬり — Web Development</title>', '<title>Ghost Route</title>')
        doc = doc.replace('Sites we\'ve brought to life.', 'Failed Ghost Route')
        return doc

    # Ensure directories exist
    os.makedirs('en/portfolio', exist_ok=True)
    os.makedirs('ge/portfolio', exist_ok=True)
    os.makedirs('es/portfolio', exist_ok=True)

    # Build /en/
    en_html = set_lang(html, 'en')
    with open('en/index.html', 'w', encoding='utf-8') as f:
        f.write(en_html)

    # Build /en/portfolio/
    en_port = set_portfolio_scroll(set_portfolio_og(en_html))
    with open('en/portfolio/index.html', 'w', encoding='utf-8') as f:
        f.write(en_port)

    # Build /ge/
    ge_html = set_lang(html, 'ge')
    ge_html = ge_html.replace('$50<span class="period">/one-time</span>', '$0<span class="period">/one-time</span>')
    with open('ge/index.html', 'w', encoding='utf-8') as f:
        f.write(ge_html)

    # Build /ge/portfolio/
    ge_port = set_portfolio_scroll(set_portfolio_og(ge_html))
    with open('ge/portfolio/index.html', 'w', encoding='utf-8') as f:
        f.write(ge_port)

    # Build /es/
    es_html = set_lang(html, 'es')
    es_html = es_html.replace('$50<span class="period">/one-time</span>', '$0<span class="period">/one-time</span>')
    with open('es/index.html', 'w', encoding='utf-8') as f:
        f.write(es_html)

    # Build /es/portfolio/
    es_port = set_portfolio_scroll(set_portfolio_og(es_html))
    with open('es/portfolio/index.html', 'w', encoding='utf-8') as f:
        f.write(es_port)

    # Build /failures/
    os.makedirs('failures', exist_ok=True)
    failures_html = set_lang(create_failures_page(html), 'en')
    with open('failures/index.html', 'w', encoding='utf-8') as f:
        f.write(failures_html)

    print("Successfully built static routing directories!")

if __name__ == "__main__":
    build()
