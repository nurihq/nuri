import json

ge_map = {
    "Visit Site ↗": "ნახეთ საიტი ↗",
    "Bubble Tea": "ბაბლ თი",
    "Bilingual": "ორენოვანი",
    "Tbilisi": "თბილისი",
    "Cute": "საყვარელი",
    "Animations": "ანიმაციები",
    "Cacao Bar": "კაკაო ბარი",
    "Mexican": "მექსიკური",
    "Cheese Bar": "ყველის ბარი",
    "Restaurant": "რესტორანი",
    "Lebanese": "ლიბანური",
    "Education": "განათლება",
    "PWA": "PWA",
    "Firebase": "Firebase",
    "Cafe": "კაფე",
    "Brunch": "ბრანჩი",
    "A funky, animated dark-mode website": "ანიმირებული, მუქი თემის ვებსაიტი თბილისში საყვარელი Honey Boba-სთვის — მცურავი ბობის ანიმაციებით, ქართულ-ინგლისური მხარდაჭერით და მიტანის სერვისების ინტეგრაციით.",
    "A super cute, fun, and funky website": "მხიარული და ფერადი ვებსაიტი თბილისის გამორჩეული ბაბლ თი მაღაზიისთვის — სათამაშო ანიმაციებითა და ნათელი დიზაინით.",
    "A premium bilingual website for Tbilisi's specialty": "პრემიუმ ორენოვანი ვებსაიტი თბილისის კაკაო ბარისთვის — საფირმო კაკაოს სასმელებით, კატის მასკოტით და მყუდრო შოკოლადის ესთეტიკით.",
    "A fun, vibrant, light-themed bilingual website": "მხიარული, ნათელი თემის ორენოვანი ვებსაიტი პოპულარული მექსიკური რესტორნისთვის თბილისში — Wolt-ის მენიუს სრული ინტეგრაციით.",
    "A premium bilingual website for Tbilisi's boutique": "პრემიუმ ორენოვანი ვებსაიტი თბილისის ყველის ბარისთვის — ხელნაკეთი ველებით, მიტანის ბმულებითა და დახვეწილი დიზაინით.",
    "An interactive Japanese hiragana practice app": "იაპონური ჰირაგანას პრაქტიკის ინტერაქტიული აპლიკაცია — ხაზვის თანმიმდევრობით, პროგრესის თრექინგით და სრული ოფლაინ PWA უზრუნველყოფით.",
    "A companion app to Hiragana.site": "Hiragana.site-ის დამხმარე აპლიკაცია კატაკანას სასწავლად — იგივე დახვეწილი პრაქტიკის გამოცდილებითა და ღრუბელში სინქრონიზებული პროგრესით.",
    "A premium bilingual website for a beloved Buenos Aires": "პრემიუმ ორენოვანი ვებსაიტი ბუენოს-აირესის საყვარელი კაფესთვის — მენიუთი, მიტანის ბმულებით და ორი ლოკაციით.",
    "highly aesthetic bilingual webapp for Berytus": "პრემიუმ, მაღალი ესთეტიკის ორენოვანი ვებაპლიკაცია Berytus-სთვის — ლიბანური გემოების თბილისში მოსატანად.",
    "Nuri — Japanese for": "Nuri — იაპონურად",
    "— embodies our philosophy": "— განასახიერებს ჩვენს ფილოსოფიას: ყველა ვებსაიტი არის ტილო. ჩვენ ვაერთიანებთ ხელოვნებასა და ინჟინერიას.",
    "Your complete website, built from scratch": "თქვენი სრულყოფილი ვებსაიტი, აგებული ნულიდან, რათა იდეალურად მოერგოს თქვენს ხედვას.",
    "Thanks! We'll be in touch within 24 hours": "მადლობა! ჩვენ დაგიკავშირდებით 24 საათის განმავლობაში.",
    "From local restaurants to growing businesses": "ადგილობრივი რესტორნებიდან დაწყებული, მზარდი ბიზნესებით დამთავრებული, ჩვენ ვქმნით მორგებულ ვებ-გადაწყვეტილებებს დეტალებზე ზედმიწევნითი ყურადღებით, სწრაფი ჩატვირთვის დროით და დიზაინით, რომელიც ვიზიტორებს მომხმარებლებად აქცევს.",
    "Premium websites crafted for businesses that demand excellence": "პრემიუმ ვებსაიტები, შექმნილი ბიზნესებისთვის, რომლებიც ითხოვენ სრულყოფილებას — ლამაზი დიზაინი, უზადო წარმადობა და მნიშვნელოვანი შედეგები.",
    "Each project is built from scratch — no templates": "თითოეული პროექტი იქმნება ნულიდან — არანაირი შაბლონები. მხოლოდ სუფთა კოდი და გააზრებული დიზაინი.",
    "Professional web development shouldn't be complicated": "პროფესიონალური ვებ დეველოპმენტი არ უნდა იყოს რთული.",
    "Bespoke visual identities and interfaces tailored": "თქვენს ბრენდზე მორგებული ვიზუალური იდენტობა — არანაირი კომპრომისი.",
    "Pixel-perfect experiences across every device": "იდეალური გამოცდილება ნებისმიერ მოწყობილობაზე.",
    "Fast, reliable hosting setup with continuous deployment": "სწრაფი, საიმედო ჰოსტინგის დაყენება მუდმივი განახლებით — თქვენი საიტი ყოველთვის ცოცხალია.",
    "Built-in best practices to help your business": "შექმნილია საუკეთესო პრაქტიკით, რათა დაეხმაროს თქვენს ბიზნესს სწორ დროს სწორმა ადამიანებმა იპოვონ.",
    "Updates, improvements, and peace of mind": "განახლებები, გაუმჯობესებები და სიმშვიდე — ჩვენ აქ ვართ თქვენი საიტის გაშვების შემდეგაც.",
    "Have a project in mind?": "გაქვთ პროექტი მხედველობაში? შეავსეთ ქვემოთ მოცემული ფორმა და 24 საათში დაგიბრუნდებით.",
    "We respond to every enquiry personally": "ჩვენ პასუხს ვცემთ ყველა მოთხოვნას პირადად. არანაირი ბოტები, მხოლოდ რეალური საუბარი თქვენს ხედვაზე."
}

es_map = {
    "Visit Site ↗": "Visitar Sitio ↗",
    "Bubble Tea": "Té de Burbujas",
    "Bilingual": "Bilingüe",
    "Tbilisi": "Tiflis",
    "Cute": "Lindo",
    "Animations": "Animaciones",
    "Cacao Bar": "Bar de Cacao",
    "Mexican": "Mexicano",
    "Cheese Bar": "Bar de Quesos",
    "Restaurant": "Restaurante",
    "Lebanese": "Libanés",
    "Education": "Educación",
    "PWA": "PWA",
    "Firebase": "Firebase",
    "Cafe": "Cafetería",
    "Brunch": "Desayuno Tardío",
    "A funky, animated dark-mode website": "Un sitio web animado en modo oscuro para la querida tienda de Bubble Tea Honey Boba en Tiflis — con animaciones fluidas, soporte bilingüe (georgiano/inglés) e integraciones de entrega.",
    "A super cute, fun, and funky website": "Un sitio web súper lindo y divertido para la principal tienda de Bubble Tea en Tiflis — con animaciones divertidas y diseño vibrante.",
    "A premium bilingual website for Tbilisi's specialty": "Un sitio web premium bilingüe para el bar de cacao de Tiflis — con bebidas exclusivas, mascota de gato y estética cálida de chocolate.",
    "A fun, vibrant, light-themed bilingual website": "Un sitio web bilingüe vibrante y divertido de tema claro para un popular restaurante mexicano en Tiflis — con integración de menú de Wolt.",
    "A premium bilingual website for Tbilisi's boutique": "Un sitio web premium bilingüe para el Cheese Bar boutique de Tiflis — con quesos artesanales, entregas y diseño editorial rico.",
    "An interactive Japanese hiragana practice app": "Una aplicación interactiva para practicar hiragana japonés — de orden de trazos, seguimiento de progreso y soporte PWA sin conexión.",
    "A companion app to Hiragana.site": "Una aplicación complementaria a Hiragana.site para dominar katakana — con la misma experiencia y progreso sincronizado en la nube.",
    "A premium bilingual website for a beloved Buenos Aires": "Un sitio web premium bilingüe para un querido café de Buenos Aires — menú integrado, entregas y dos ubicaciones en Palermo y Recoleta.",
    "highly aesthetic bilingual webapp for Berytus": "Una aplicación web premium y de alta estética bilingüe para Berytus — trayendo el sabor auténtico libanés a Tiflis.",
    "Nuri — Japanese for": "Nuri — en japonés significa",
    "— embodies our philosophy": "— encarna nuestra filosofía: cada sitio web es un lienzo. Combinamos el arte con la ingeniería para construir sitios hermosos y potentes.",
    "Your complete website, built from scratch": "Tu sitio web completo, construido desde cero para que coincida perfectamente con tu visión.",
    "Thanks! We'll be in touch within 24 hours": "¡Gracias! Nos pondremos en contacto en 24 horas.",
    "From local restaurants to growing businesses": "Desde restaurantes locales hasta empresas en crecimiento, ofrecemos soluciones web a medida con minuciosa atención al detalle, tiempos de carga rápidos y diseños que convierten a los visitantes en clientes.",
    "Premium websites crafted for businesses that demand excellence": "Sitios web premium creados para empresas que exigen excelencia: hermosos diseños, rendimiento impecable y resultados que importan.",
    "Each project is built from scratch — no templates": "Cada proyecto se construye desde cero: sin plantillas ni atajos. Solo código limpio y diseño inteligente.",
    "Professional web development shouldn't be complicated": "El desarrollo web profesional no debería ser complicado.",
    "Bespoke visual identities and interfaces tailored": "Identidades visuales a medida centradas en tu marca: sin compromisos.",
    "Pixel-perfect experiences across every device": "Experiencias perfectas en todos los dispositivos.",
    "Fast, reliable hosting setup with continuous deployment": "Alojamiento ultrarrápido con implementación continua: tu sitio siempre está en línea y actualizado.",
    "Built-in best practices to help your business": "Las mejores prácticas para que tu negocio sea encontrado por las personas adecuadas en el momento adecuado.",
    "Updates, improvements, and peace of mind": "Actualizaciones, mejoras y tranquilidad.",
    "Have a project in mind?": "¿Tienes un proyecto en mente? Nos encantaría escucharlo. Rellene el siguiente formulario.",
    "We respond to every enquiry personally": "Respondemos cada solicitud de manera personal. Sin bots ni plantillas."
}

with open('extracted.json', 'r', encoding='utf-8') as f:
    extracted = json.load(f)

ge_additions = {}
es_additions = {}

for string in extracted:
    for k, v in ge_map.items():
        if k in string:
            ge_additions[string] = v
    for k, v in es_map.items():
        if k in string:
            es_additions[string] = v

js_code = f"""
// --- Auto-injected localized missing strings ---
const geAdditions = {json.dumps(ge_additions, indent=4, ensure_ascii=False)};
const esAdditions = {json.dumps(es_additions, indent=4, ensure_ascii=False)};
Object.assign(nuriTranslations.ge, geAdditions);
Object.assign(nuriTranslations.es, esAdditions);
"""

with open('nuri-core.js', 'r', encoding='utf-8') as f:
    core_js = f.read()

# Append immediately before DOMContentLoaded
dom = 'document.addEventListener("DOMContentLoaded"'
core_js = core_js.replace(dom, js_code + '\n' + dom)

with open('nuri-core.js', 'w', encoding='utf-8') as f:
    f.write(core_js)

print("Translations successfully updated!")
