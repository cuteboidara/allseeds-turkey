import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '87ez7ybh',
  dataset: 'production',
  apiVersion: '2026-04-28',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function block(text) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
    markDefs: [],
  }
}

const documents = [
  // ── HOME ──────────────────────────────────────────────────────────────────
  {
    _id: 'home-en',
    _type: 'home',
    language: 'en',
    heroTitle: 'Global Agricultural Trading',
    heroSubtitle: 'Connecting markets and delivering quality commodities from Turkey to the world.',
    aboutTitle: 'About Allseeds Turkey',
    aboutText: [
      block('Allseeds Turkey is a leading agricultural commodity trading company with deep roots in Turkish agriculture and a global reach spanning 40+ countries.'),
      block('Founded on principles of quality, reliability and sustainability, we bridge farmers and buyers across continents — specialising in sunflower products, grains, pulses and oilseeds.'),
    ],
    statsItems: [
      { _key: 's1', value: '40+', label: 'Countries Served' },
      { _key: 's2', value: '500K+', label: 'MT Traded Annually' },
      { _key: 's3', value: '25+', label: 'Years of Experience' },
      { _key: 's4', value: '200+', label: 'Partners Worldwide' },
    ],
  },
  {
    _id: 'home-tr',
    _type: 'home',
    language: 'tr',
    heroTitle: 'Küresel Tarım Ticareti',
    heroSubtitle: "Türkiye'den dünyaya kaliteli tarım ürünleri tedarik ediyoruz.",
    aboutTitle: "Allseeds Turkey Hakkında",
    aboutText: [
      block("Allseeds Turkey, Türk tarımında köklü bir geçmişe sahip ve 40'tan fazla ülkeye yayılan küresel bir tarım ticaret şirketidir."),
      block('Kalite, güvenilirlik ve sürdürülebilirlik ilkeleri üzerine kurulu olan şirketimiz; ayçiçeği ürünleri, tahıllar, bakliyat ve yağlı tohumlarda uzmanlaşmıştır.'),
    ],
    statsItems: [
      { _key: 's1', value: '40+', label: 'Ülkeye Hizmet' },
      { _key: 's2', value: '500K+', label: 'Yıllık Ticaret (MT)' },
      { _key: 's3', value: '25+', label: 'Yıllık Deneyim' },
      { _key: 's4', value: '200+', label: 'Dünya Geneli Ortak' },
    ],
  },

  // ── ACTIVITIES ────────────────────────────────────────────────────────────
  {
    _id: 'activities-en',
    _type: 'activities',
    language: 'en',
    pageTitle: 'Our Activities',
    pageSubtitle: 'From farm to port — we handle every step of the supply chain.',
    items: [
      {
        _key: 'a1',
        slug: 'procurement',
        title: 'Procurement',
        icon: '🌾',
        description: [block('We source premium agricultural commodities directly from farmers and cooperatives across Turkey, ensuring quality at origin.')],
      },
      {
        _key: 'a2',
        slug: 'processing',
        title: 'Processing',
        icon: '⚙️',
        description: [block('Our state-of-the-art processing facilities clean, sort, and grade commodities to meet exact buyer specifications and international standards.')],
      },
      {
        _key: 'a3',
        slug: 'storage',
        title: 'Storage & Logistics',
        icon: '🏭',
        description: [block('With strategic warehouse locations near major ports, we ensure optimal storage conditions and efficient logistics for bulk and container shipments.')],
      },
      {
        _key: 'a4',
        slug: 'trading',
        title: 'International Trading',
        icon: '🌍',
        description: [block('We trade a wide range of agricultural products globally — sunflower oil, sunflower meal, wheat, barley, corn, lentils, chickpeas and more.')],
      },
    ],
  },
  {
    _id: 'activities-tr',
    _type: 'activities',
    language: 'tr',
    pageTitle: 'Faaliyetlerimiz',
    pageSubtitle: "Tarladan limana — tedarik zincirinin her adımını yönetiyoruz.",
    items: [
      {
        _key: 'a1',
        slug: 'procurement',
        title: 'Tedarik',
        icon: '🌾',
        description: [block("Türkiye genelindeki çiftçiler ve kooperatiflerden doğrudan birinci kalite tarım ürünleri temin ediyoruz.")],
      },
      {
        _key: 'a2',
        slug: 'processing',
        title: 'İşleme',
        icon: '⚙️',
        description: [block('Modern işleme tesislerimizde ürünler temizlenir, sınıflandırılır ve uluslararası standartlara uygun hale getirilir.')],
      },
      {
        _key: 'a3',
        slug: 'storage',
        title: 'Depolama & Lojistik',
        icon: '🏭',
        description: [block('Büyük liman yakınlarındaki stratejik depolarımızla optimal depolama koşulları ve verimli lojistik hizmeti sunuyoruz.')],
      },
      {
        _key: 'a4',
        slug: 'trading',
        title: 'Uluslararası Ticaret',
        icon: '🌍',
        description: [block('Ayçiçek yağı, küspesi, buğday, arpa, mısır, mercimek, nohut ve daha fazlasını küresel ölçekte ticaret yapıyoruz.')],
      },
    ],
  },

  // ── SUSTAINABILITY ────────────────────────────────────────────────────────
  {
    _id: 'sustainability-en',
    _type: 'sustainability',
    language: 'en',
    pageTitle: 'Sustainability',
    pageSubtitle: 'Committed to responsible trade that benefits people, planet and future generations.',
    pillars: [
      {
        _key: 'p1',
        slug: 'environmental',
        title: 'Environmental Stewardship',
        icon: '🌿',
        description: [block('We promote sustainable farming practices among our supplier network, minimise waste in our processing operations, and offset our carbon footprint through verified programmes.')],
      },
      {
        _key: 'p2',
        slug: 'quality',
        title: 'Quality Assurance',
        icon: '✅',
        description: [block('Rigorous quality control from field to delivery — we are certified to international food safety standards and conduct third-party testing at every stage.')],
      },
      {
        _key: 'p3',
        slug: 'social',
        title: 'Social Responsibility',
        icon: '🤝',
        description: [block('We invest in rural communities across Turkey, support fair pricing for farmers, and uphold ethical labour standards throughout our supply chain.')],
      },
    ],
    commitmentText: [block('Sustainability is not an afterthought for us — it is embedded in every commercial decision we make.')],
  },
  {
    _id: 'sustainability-tr',
    _type: 'sustainability',
    language: 'tr',
    pageTitle: 'Sürdürülebilirlik',
    pageSubtitle: 'İnsan, gezegen ve gelecek nesiller için sorumlu ticaret taahhüdü.',
    pillars: [
      {
        _key: 'p1',
        slug: 'environmental',
        title: 'Çevre Sorumluluğu',
        icon: '🌿',
        description: [block('Tedarikçi ağımızda sürdürülebilir tarım uygulamalarını destekliyor, işleme süreçlerinde israfı azaltıyor ve karbon ayak izimizi azaltmak için çalışıyoruz.')],
      },
      {
        _key: 'p2',
        slug: 'quality',
        title: 'Kalite Güvencesi',
        icon: '✅',
        description: [block('Tarladan teslimata kadar sıkı kalite kontrol — uluslararası gıda güvenliği standartlarına sahibiz ve her aşamada bağımsız testler uyguluyoruz.')],
      },
      {
        _key: 'p3',
        slug: 'social',
        title: 'Sosyal Sorumluluk',
        icon: '🤝',
        description: [block("Türkiye'deki kırsal toplulukları destekliyor, çiftçiler için adil fiyatlandırma sağlıyor ve etik iş standartlarını uyguluyoruz.")],
      },
    ],
    commitmentText: [block('Sürdürülebilirlik bizim için sonradan düşünülen bir şey değil — verdiğimiz her ticari kararın özünde yer almaktadır.')],
  },

  // ── PEOPLE ────────────────────────────────────────────────────────────────
  {
    _id: 'people-en',
    _type: 'people',
    language: 'en',
    pageTitle: 'Our People',
    pageSubtitle: 'A dedicated team with deep industry knowledge and a passion for global trade.',
    teamMembers: [
      {
        _key: 'm1',
        name: 'Ahmet Yilmaz',
        title: 'Chief Executive Officer',
        bio: [block('With over 25 years in agricultural commodity trading, Ahmet leads Allseeds Turkey with a vision for sustainable global trade.')],
        email: 'ahmet.yilmaz@allseedsturkey.com',
      },
      {
        _key: 'm2',
        name: 'Fatma Kaya',
        title: 'Head of Procurement',
        bio: [block('Fatma manages our extensive supplier network across Turkey, ensuring consistent quality and reliable sourcing year-round.')],
        email: 'fatma.kaya@allseedsturkey.com',
      },
      {
        _key: 'm3',
        name: 'Mehmet Demir',
        title: 'International Sales Director',
        bio: [block('Mehmet drives our global sales strategy and maintains long-term relationships with buyers in Europe, Asia and the Middle East.')],
        email: 'mehmet.demir@allseedsturkey.com',
      },
    ],
    cultureText: [block('At Allseeds Turkey, we believe our people are our greatest asset. We cultivate an environment of trust, collaboration and continuous learning.')],
  },
  {
    _id: 'people-tr',
    _type: 'people',
    language: 'tr',
    pageTitle: 'Ekibimiz',
    pageSubtitle: 'Derin sektör bilgisi ve küresel ticarete olan tutku ile adanmış bir ekip.',
    teamMembers: [
      {
        _key: 'm1',
        name: 'Ahmet Yilmaz',
        title: 'Genel Müdür',
        bio: [block('25 yılı aşkın tarımsal emtia ticareti deneyimiyle Ahmet, sürdürülebilir küresel ticaret vizyonuyla Allseeds Turkey\'yi yönetmektedir.')],
        email: 'ahmet.yilmaz@allseedsturkey.com',
      },
      {
        _key: 'm2',
        name: 'Fatma Kaya',
        title: 'Tedarik Direktörü',
        bio: [block("Fatma, Türkiye genelindeki geniş tedarikçi ağımızı yönetir; tutarlı kalite ve güvenilir tedariki sağlar.")],
        email: 'fatma.kaya@allseedsturkey.com',
      },
      {
        _key: 'm3',
        name: 'Mehmet Demir',
        title: 'Uluslararası Satış Direktörü',
        bio: [block("Mehmet, küresel satış stratejimizi yönetir ve Avrupa, Asya ile Orta Doğu'daki alıcılarla uzun vadeli ilişkiler sürdürür.")],
        email: 'mehmet.demir@allseedsturkey.com',
      },
    ],
    cultureText: [block("Allseeds Turkey'de çalışanlarımızın en büyük varlığımız olduğuna inanıyoruz. Güven, iş birliği ve sürekli öğrenme ortamı yaratıyoruz.")],
  },

  // ── COMPANY ───────────────────────────────────────────────────────────────
  {
    _id: 'company-en',
    _type: 'company',
    language: 'en',
    pageTitle: 'About the Company',
    pageSubtitle: 'A trusted name in agricultural commodity trading since 1999.',
    aboutText: [
      block('Allseeds Turkey was established in 1999 as a specialist agricultural commodity trading company headquartered in Istanbul, Turkey.'),
      block('Over the past 25 years, we have grown from a domestic trading house into a fully integrated global operation — with offices in Istanbul and Mersin and partnerships spanning 40+ countries across Europe, Asia and the Middle East.'),
      block('Our core business covers the procurement, processing and export of sunflower products (oil and meal), grains (wheat, barley, corn), pulses (lentils, chickpeas) and oilseeds.'),
    ],
    founded: '1999',
    keyFigures: [
      { _key: 'k1', value: '1999', label: 'Year Founded' },
      { _key: 'k2', value: '40+', label: 'Export Countries' },
      { _key: 'k3', value: '500K MT', label: 'Annual Volume' },
      { _key: 'k4', value: '2', label: 'Offices in Turkey' },
    ],
    locations: [
      {
        _key: 'l1',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Levent Mah. Büyükdere Cad. No:185, Şişli, Istanbul 34394',
        isPrimary: true,
      },
      {
        _key: 'l2',
        city: 'Mersin',
        country: 'Turkey',
        address: 'Limonluk Mah. Atatürk Cad. No:72, Yenişehir, Mersin 33130',
        isPrimary: false,
      },
    ],
  },
  {
    _id: 'company-tr',
    _type: 'company',
    language: 'tr',
    pageTitle: 'Şirket Hakkında',
    pageSubtitle: "1999'dan bu yana tarımsal emtia ticaretinde güvenilir bir isim.",
    aboutText: [
      block("Allseeds Turkey, 1999 yılında İstanbul merkezli bir tarımsal emtia ticaret şirketi olarak kurulmuştur."),
      block("Geçtiğimiz 25 yıl içinde, yurt içi bir ticaret evinden tam entegre küresel bir operasyona dönüştük — İstanbul ve Mersin'deki ofislerimiz ve 40'tan fazla ülkedeki ortaklıklarımızla."),
      block('Ana iş alanlarımız ayçiçeği ürünleri (yağ ve küspe), tahıllar (buğday, arpa, mısır), bakliyat (mercimek, nohut) ve yağlı tohumların tedariki, işlenmesi ve ihracatını kapsamaktadır.'),
    ],
    founded: '1999',
    keyFigures: [
      { _key: 'k1', value: '1999', label: 'Kuruluş Yılı' },
      { _key: 'k2', value: '40+', label: 'İhracat Ülkesi' },
      { _key: 'k3', value: '500K MT', label: 'Yıllık Hacim' },
      { _key: 'k4', value: '2', label: "Türkiye'deki Ofis" },
    ],
    locations: [
      {
        _key: 'l1',
        city: 'İstanbul',
        country: 'Türkiye',
        address: 'Levent Mah. Büyükdere Cad. No:185, Şişli, İstanbul 34394',
        isPrimary: true,
      },
      {
        _key: 'l2',
        city: 'Mersin',
        country: 'Türkiye',
        address: 'Limonluk Mah. Atatürk Cad. No:72, Yenişehir, Mersin 33130',
        isPrimary: false,
      },
    ],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    _id: 'contact-en',
    _type: 'contact',
    language: 'en',
    pageTitle: 'Get in Touch',
    pageSubtitle: 'We would love to hear from you. Reach out to discuss your commodity needs.',
    email: 'info@allseedsturkey.com',
    phone: '+90 212 345 6789',
    formTitle: 'Send Us a Message',
    locations: [
      {
        _key: 'l1',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Levent Mah. Büyükdere Cad. No:185, Şişli, Istanbul 34394',
        phone: '+90 212 345 6789',
        email: 'info@allseedsturkey.com',
      },
      {
        _key: 'l2',
        city: 'Mersin',
        country: 'Turkey',
        address: 'Limonluk Mah. Atatürk Cad. No:72, Yenişehir, Mersin 33130',
        phone: '+90 324 567 8901',
        email: 'mersin@allseedsturkey.com',
      },
    ],
  },
  {
    _id: 'contact-tr',
    _type: 'contact',
    language: 'tr',
    pageTitle: 'İletişime Geçin',
    pageSubtitle: 'Emtia ihtiyaçlarınızı görüşmek için bizimle iletişime geçin.',
    email: 'info@allseedsturkey.com',
    phone: '+90 212 345 6789',
    formTitle: 'Bize Mesaj Gönderin',
    locations: [
      {
        _key: 'l1',
        city: 'İstanbul',
        country: 'Türkiye',
        address: 'Levent Mah. Büyükdere Cad. No:185, Şişli, İstanbul 34394',
        phone: '+90 212 345 6789',
        email: 'info@allseedsturkey.com',
      },
      {
        _key: 'l2',
        city: 'Mersin',
        country: 'Türkiye',
        address: 'Limonluk Mah. Atatürk Cad. No:72, Yenişehir, Mersin 33130',
        phone: '+90 324 567 8901',
        email: 'mersin@allseedsturkey.com',
      },
    ],
  },
]

async function seed() {
  console.log(`Seeding ${documents.length} documents...`)
  for (const doc of documents) {
    const result = await client.createOrReplace(doc)
    console.log(`  ✓ ${result._type} (${result._id})`)
  }
  console.log('Done!')
}

seed().catch((err) => { console.error(err); process.exit(1) })
