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
        return doc.replace(
            '<meta property="og:image" content="https://nuri.software/img/og-image.png" />',
            '<meta property="og:image" content="https://nuri.software/img/portfolio/honeyboba.png" />'
        )

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

    # Ensure directories exist
    os.makedirs('en/portfolio', exist_ok=True)
    os.makedirs('ge/portfolio', exist_ok=True)

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
    with open('ge/index.html', 'w', encoding='utf-8') as f:
        f.write(ge_html)

    # Build /ge/portfolio/
    ge_port = set_portfolio_scroll(set_portfolio_og(ge_html))
    with open('ge/portfolio/index.html', 'w', encoding='utf-8') as f:
        f.write(ge_port)

    print("Successfully built static routing directories!")

if __name__ == "__main__":
    build()
