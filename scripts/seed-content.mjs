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
    heroTitle: 'Your Trusted Partner in the Vegetable Oil Value Chain',
    heroSubtitle: 'Allseeds Group ensures the efficient and reliable delivery of Ukrainian vegetable oil and meal to the global markets.',
    aboutTitle: 'Allseeds Group',
    aboutText: [
      block('Allseeds Group is a vertically integrated agricultural company ensuring the efficient and reliable delivery of Ukrainian vegetable oil and meal to global markets.'),
      block('With over 2,000 oilseed suppliers and a 725,000 MT annual crush capacity across three modern processing plants, we are one of Ukraine\'s top-3 vegetable oil exporters.'),
      block('Our integrated supply chain — from procurement through processing, storage and international delivery — ensures consistent quality and reliability for buyers worldwide.'),
    ],
    statsItems: [
      { _key: 's1', value: '>2,000', label: 'Oilseed Suppliers' },
      { _key: 's2', value: '725,000 MT', label: 'Annual Crush Capacity' },
      { _key: 's3', value: '#3', label: 'Vegetable Oil Exporter from Ukraine' },
      { _key: 's4', value: '3', label: 'Crushing Plants' },
    ],
  },
  {
    _id: 'home-tr',
    _type: 'home',
    language: 'tr',
    heroTitle: 'Bitkisel Yağ Değer Zincirinde Güvenilir Ortağınız',
    heroSubtitle: 'Allseeds Group, Ukrayna bitkisel yağı ve küspesini küresel pazarlara verimli ve güvenilir biçimde ulaştırır.',
    aboutTitle: 'Allseeds Group',
    aboutText: [
      block("Allseeds Group, Ukrayna bitkisel yağı ve küspesini küresel pazarlara verimli ve güvenilir biçimde ulaştıran dikey entegre bir tarım şirketidir."),
      block("2.000'den fazla yağlı tohum tedarikçisi ve üç modern işleme tesisindeki 725.000 MT yıllık kırma kapasitesiyle Ukrayna'nın en büyük 3 bitkisel yağ ihracatçısından biriyiz."),
      block("Tedarikten işleme, depolama ve uluslararası teslimatına uzanan entegre tedarik zincirimiz, dünya genelindeki alıcılar için tutarlı kalite ve güvenilirlik sağlar."),
    ],
    statsItems: [
      { _key: 's1', value: '>2.000', label: 'Yağlı Tohum Tedarikçisi' },
      { _key: 's2', value: '725.000 MT', label: 'Yıllık Kırma Kapasitesi' },
      { _key: 's3', value: '#3', label: "Ukrayna'dan Bitkisel Yağ İhracatçısı" },
      { _key: 's4', value: '3', label: 'Kırma Tesisi' },
    ],
  },

  // ── ACTIVITIES ────────────────────────────────────────────────────────────
  {
    _id: 'activities-en',
    _type: 'activities',
    language: 'en',
    pageTitle: 'Our Activities',
    pageSubtitle: 'Integrated Supply Chain Excellence',
    items: [
      {
        _key: 'a1',
        slug: 'procurement',
        title: '01. Oilseeds Procurement',
        icon: '🌾',
        description: [
          block('Allseeds procures sunflower seeds, rapeseed and soybeans from over 2,000 trusted suppliers across Ukraine. Our agronomists and field representatives maintain direct relationships with farmers, cooperatives and elevators to ensure consistent supply volumes and quality.'),
          block('All incoming oilseeds are subject to rigorous quality assessment: moisture content, oil content, impurities, free fatty acids and other critical parameters are tested at intake. Only material meeting our strict specifications is accepted for processing.'),
          block('Quality standards: Sunflower — oil content ≥42%, moisture ≤8%, impurities ≤3%. Rapeseed — oil content ≥40%, moisture ≤8%, erucic acid ≤2%. Soybeans — protein ≥34%, moisture ≤13%, impurities ≤2%.'),
        ],
      },
      {
        _key: 'a2',
        slug: 'processing',
        title: '02. Vegetable Oil and Meal Production',
        icon: '⚙️',
        description: [
          block('Allseeds operates three modern crushing plants with a combined annual capacity of 725,000 MT — producing premium crude sunflower oil, rapeseed oil, soybean oil and their respective protein-rich meals.'),
          block('Plant capacities: Sunflower oil plant — 2,400 MT/day. Rapeseed oil plant — 1,800 MT/day. Soybean oil plant — 1,500 MT/day.'),
          block('Our processing lines are equipped with modern German and Swiss equipment for seed preparation, cold pressing, solvent extraction and degumming. Continuous quality monitoring at every production stage ensures that all output meets buyer specifications and international food safety standards including EU, Codex Alimentarius and regional requirements.'),
        ],
      },
      {
        _key: 'a3',
        slug: 'storage',
        title: '03. Storage & Shipment',
        icon: '🏭',
        description: [
          block('Allseeds operates dedicated vegetable oil storage terminals with a total capacity of 100,000 MT, located adjacent to processing plants and major port facilities. Temperature-controlled tanks maintain optimal product quality from production through shipment.'),
          block('Our port loading infrastructure supports Panamax vessels, enabling efficient bulk shipments of 50,000–75,000 MT. Dry cargo handling capacity reaches 10,000 MT/day, with direct rail and road access ensuring seamless multimodal logistics.'),
          block('All export shipments are accompanied by full quality documentation: certificates of origin, phytosanitary certificates, quality analysis reports, and — where required — organic and non-GMO certifications.'),
        ],
      },
      {
        _key: 'a4',
        slug: 'inland-transport',
        title: '04. Inland Transportation',
        icon: '🚛',
        description: [
          block('Allseeds operates its own fleet of specialised vehicles to ensure reliable and efficient movement of raw materials and finished products across Ukraine.'),
          block('Our fleet: 47 dump trucks for dry cargo (oilseeds and meal). 44 tanker trucks for vegetable oil and liquid products. Average delivery radius: 300–400 km from processing plants to storage terminals and ports.'),
          block('Our proprietary transport fleet reduces dependency on third-party carriers during peak harvest periods, guarantees delivery schedules, and maintains the chain of custody required for premium product certification.'),
        ],
      },
      {
        _key: 'a5',
        slug: 'trading',
        title: '05. International Trading',
        icon: '🌍',
        description: [
          block('Allseeds Turkey is the international trading arm of Allseeds Group, marketing Ukrainian vegetable oils, meals and oilseeds to buyers across five continents. Our commercial team has deep expertise in export documentation, trade finance, hedging and market intelligence.'),
          block('Key markets: European Union (primary destination for refined and crude sunflower oil), India (sunflower oil and soybean oil), China (rapeseed meal and soybean oil), North Africa (Egypt, Algeria, Morocco — crude sunflower oil), Middle East (Turkey, Iran, Saudi Arabia — oils and meals).'),
          block('We offer flexible trading terms including CIF, CFR, FOB and DAP, with payment structures tailored to buyer requirements. Our relationships with leading commodity banks and trade finance institutions enable competitive financing for large-volume buyers.'),
        ],
      },
    ],
  },
  {
    _id: 'activities-tr',
    _type: 'activities',
    language: 'tr',
    pageTitle: 'Faaliyetlerimiz',
    pageSubtitle: 'Entegre Tedarik Zinciri Mükemmeliyeti',
    items: [
      {
        _key: 'a1',
        slug: 'procurement',
        title: '01. Yağlı Tohum Tedariki',
        icon: '🌾',
        description: [
          block("Allseeds, Ukrayna genelindeki 2.000'den fazla güvenilir tedarikçiden ayçiçeği tohumu, kolza ve soya fasulyesi tedarik etmektedir. Ziraat mühendislerimiz ve saha temsilcilerimiz, tutarlı arz hacmi ve kaliteyi sağlamak amacıyla çiftçiler, kooperatifler ve tahıl elevatörleriyle doğrudan ilişki kurmaktadır."),
          block("Teslim alınan tüm yağlı tohumlar sıkı kalite değerlendirmesine tabi tutulmaktadır: nem içeriği, yağ içeriği, safsızlıklar, serbest yağ asitleri ve diğer kritik parametreler girişte test edilmektedir."),
          block("Kalite standartları: Ayçiçeği — yağ içeriği ≥%42, nem ≤%8, safsızlık ≤%3. Kolza — yağ içeriği ≥%40, nem ≤%8, erüsik asit ≤%2. Soya — protein ≥%34, nem ≤%13, safsızlık ≤%2."),
        ],
      },
      {
        _key: 'a2',
        slug: 'processing',
        title: '02. Bitkisel Yağ ve Küspe Üretimi',
        icon: '⚙️',
        description: [
          block("Allseeds, yıllık toplam kapasitesi 725.000 MT olan üç modern kırma tesisi işletmektedir; ham ayçiçek yağı, kolza yağı, soya yağı ve bunların protein açısından zengin küspeleri üretmektedir."),
          block("Tesis kapasiteleri: Ayçiçek yağı tesisi — 2.400 MT/gün. Kolza yağı tesisi — 1.800 MT/gün. Soya yağı tesisi — 1.500 MT/gün."),
          block("İşleme hatlarımız, tohum hazırlama, soğuk presleme, çözücü ekstraksiyonu ve degumming için modern Alman ve İsviçre ekipmanlarıyla donatılmıştır."),
        ],
      },
      {
        _key: 'a3',
        slug: 'storage',
        title: '03. Depolama ve Sevkiyat',
        icon: '🏭',
        description: [
          block("Allseeds, işleme tesislerine ve büyük liman tesislerine yakın konumda toplam 100.000 MT kapasiteli bitkisel yağ depolama terminalleri işletmektedir."),
          block("Liman yükleme altyapımız Panamax gemileri desteklemekte ve 50.000–75.000 MT'lik verimli dökme sevkiyatlar gerçekleştirmeye olanak tanımaktadır. Kuru yük elleçleme kapasitesi 10.000 MT/gün olup doğrudan demiryolu ve karayolu erişimi kusursuz çok modlu lojistik sağlar."),
          block("Tüm ihracat sevkiyatları tam kalite belgeleriyle birlikte gönderilmektedir: menşe sertifikaları, fitosaniter sertifikalar, kalite analiz raporları ve organik ile GDO'suz sertifikalar."),
        ],
      },
      {
        _key: 'a4',
        slug: 'inland-transport',
        title: '04. İç Taşımacılık',
        icon: '🚛',
        description: [
          block("Allseeds, hammaddeler ve mamul ürünlerin Ukrayna genelinde güvenilir ve verimli taşınmasını sağlamak için kendi özel araç filosunu işletmektedir."),
          block("Filomuz: Kuru yük (yağlı tohumlar ve küspe) için 47 damperli kamyon. Bitkisel yağ ve sıvı ürünler için 44 tanker kamyon. Ortalama teslimat yarıçapı: işleme tesislerinden depolama terminallerine ve limanlara 300–400 km."),
          block("Özel ulaşım filomuz, hasat zirvesi dönemlerinde üçüncü taraf taşıyıcılara olan bağımlılığı azaltır ve teslimat takvimlerini garanti eder."),
        ],
      },
      {
        _key: 'a5',
        slug: 'trading',
        title: '05. Uluslararası Ticaret',
        icon: '🌍',
        description: [
          block("Allseeds Turkey, Allseeds Group'un uluslararası ticaret koludur; Ukrayna bitkisel yağlarını, küspelerini ve yağlı tohumlarını beş kıtadaki alıcılara pazarlamaktadır."),
          block("Temel pazarlar: Avrupa Birliği (rafine ve ham ayçiçek yağı için birincil hedef), Hindistan (ayçiçek yağı ve soya yağı), Çin (kolza küspesi ve soya yağı), Kuzey Afrika (Mısır, Cezayir, Fas — ham ayçiçek yağı), Orta Doğu (Türkiye, İran, Suudi Arabistan — yağlar ve küspeler)."),
          block("CIF, CFR, FOB ve DAP dahil esnek ticaret koşulları sunuyoruz. Önde gelen emtia bankaları ve ticaret finansmanı kuruluşlarıyla ilişkilerimiz, büyük hacimli alıcılar için rekabetçi finansman imkânı sağlar."),
        ],
      },
    ],
  },

  // ── SUSTAINABILITY ────────────────────────────────────────────────────────
  {
    _id: 'sustainability-en',
    _type: 'sustainability',
    language: 'en',
    pageTitle: 'Sustainability',
    pageSubtitle: 'Responsible trade that benefits people, planet and future generations.',
    pillars: [
      {
        _key: 'p1',
        slug: 'environmental',
        title: 'Environmental Stewardship',
        icon: '🌿',
        description: [
          block('Allseeds is committed to minimising the environmental impact of our operations across the entire value chain. We invest continuously in energy efficiency upgrades at our processing plants, reducing electricity and thermal energy consumption per tonne of processed oilseed.'),
          block('Waste minimisation is central to our processing philosophy. Meal and press cake by-products are fully utilised as animal feed, eliminating solid waste from our plants. Wastewater is treated on-site to regulatory standards before discharge.'),
          block('For international deliveries, we strongly prefer sea freight over road or air transport. Full shipload voyages generate significantly lower CO₂ per tonne-kilometre than overland alternatives, reducing the carbon footprint of every tonne we deliver to global buyers.'),
        ],
      },
      {
        _key: 'p2',
        slug: 'quality',
        title: 'Product Quality & Safety Standards',
        icon: '✅',
        description: [
          block('Quality and food safety are non-negotiable at Allseeds. Every batch of oilseed entering our plants is tested for moisture, impurities, oil content, free fatty acids, peroxide values and microbiological parameters. In-process monitoring occurs at every critical control point.'),
          block('Our laboratories are equipped with modern analytical instruments including gas chromatographs, HPLC systems, and NIR analysers. Third-party testing by accredited international laboratories is conducted on every export parcel.'),
          block('We maintain full traceability from individual supplier field to final export shipment, enabling rapid response to any quality query. Our quality management systems are aligned with international food safety frameworks, and we work continuously to meet buyer-specific requirements across all markets.'),
        ],
      },
      {
        _key: 'p3',
        slug: 'social',
        title: 'Social Sustainability',
        icon: '🤝',
        description: [
          block('Allseeds places the safety and wellbeing of our employees at the core of our operations. We maintain rigorous occupational health and safety standards at all processing plants, with regular training, safety audits, and continuous improvement programmes.'),
          block('We invest in the professional development of our team through structured training programmes, industry certifications and leadership development. Our goal is to build a skilled, motivated workforce that grows with the company.'),
          block('As a significant employer in the agricultural regions where we operate, Allseeds supports local communities through educational programmes for farming families, partnerships with local universities and technical schools, and contributions to rural infrastructure projects. We believe that sustainable business success and community prosperity are inseparable.'),
        ],
      },
    ],
    commitmentText: [
      block('Sustainability is not an afterthought at Allseeds — it is embedded in every commercial and operational decision we make. We report annually on our environmental, social and governance performance and hold ourselves accountable to continuous improvement.'),
    ],
  },
  {
    _id: 'sustainability-tr',
    _type: 'sustainability',
    language: 'tr',
    pageTitle: 'Sürdürülebilirlik',
    pageSubtitle: 'İnsanlar, gezegen ve gelecek nesiller için sorumlu ticaret.',
    pillars: [
      {
        _key: 'p1',
        slug: 'environmental',
        title: 'Çevre Sorumluluğu',
        icon: '🌿',
        description: [
          block("Allseeds, tüm değer zinciri boyunca faaliyetlerimizin çevresel etkisini en aza indirmeye kararlıdır. İşleme tesislerimizde enerji verimliliği yatırımları yaparak işlenen yağlı tohum başına elektrik ve ısı enerjisi tüketimini sürekli azaltıyoruz."),
          block("Atık minimizasyonu işleme felsefemizin merkezindedir. Küspe ve prina yan ürünleri hayvan yemi olarak tamamen değerlendirilmektedir. Atık sular, deşarj öncesinde tesis içinde standartlara uygun şekilde arıtılmaktadır."),
          block("Uluslararası teslimatlar için karayolu veya hava taşımacılığı yerine kesinlikle deniz yolunu tercih ediyoruz. Tam gemi yük seferleri, ton-kilometre başına kara taşımacılığına kıyasla çok daha düşük CO₂ üretir."),
        ],
      },
      {
        _key: 'p2',
        slug: 'quality',
        title: 'Ürün Kalitesi ve Güvenlik Standartları',
        icon: '✅',
        description: [
          block("Allseeds'te kalite ve gıda güvenliği pazarlık konusu değildir. Tesislerimize giren her yağlı tohum partisi nem, safsızlık, yağ içeriği, serbest yağ asitleri, peroksit değerleri ve mikrobiyolojik parametreler açısından test edilmektedir."),
          block("Laboratuvarlarımız gaz kromatografları, HPLC sistemleri ve NIR analizörler dahil modern analitik ekipmanlarla donatılmıştır. Her ihracat partisinde akredite uluslararası laboratuvarlarca üçüncü taraf testleri yapılmaktadır."),
          block("Bireysel tedarikçi tarlasından nihai ihracat sevkiyatına kadar tam izlenebilirlik sağlıyoruz. Bu sayede herhangi bir kalite sorusuna hızlı yanıt verilebilmektedir."),
        ],
      },
      {
        _key: 'p3',
        slug: 'social',
        title: 'Sosyal Sürdürülebilirlik',
        icon: '🤝',
        description: [
          block("Allseeds, çalışanlarının güvenliği ve refahını operasyonlarının merkezine koymaktadır. Tüm işleme tesislerinde titiz iş sağlığı ve güvenliği standartlarını sürdürmekte, düzenli eğitim ve güvenlik denetimleri gerçekleştirmekteyiz."),
          block("Yapılandırılmış eğitim programları, sektör sertifikasyonları ve liderlik gelişim programları aracılığıyla ekibimizin mesleki gelişimine yatırım yapıyoruz."),
          block("Faaliyet gösterdiğimiz tarım bölgelerinde önemli bir işveren olarak Allseeds, çiftçi ailelerine yönelik eğitim programları, yerel üniversite ve meslek okullarıyla ortaklıklar ve kırsal altyapı projelerine katkılar aracılığıyla yerel toplulukları desteklemektedir."),
        ],
      },
    ],
    commitmentText: [
      block("Sürdürülebilirlik, Allseeds'te sonradan düşünülen bir şey değildir — verdiğimiz her ticari ve operasyonel karara işlemiştir. Çevre, sosyal ve yönetişim performansımızı yıllık olarak raporluyor ve sürekli iyileşmeye kendimizi hesap verebilir tutuyoruz."),
    ],
  },

  // ── PEOPLE ────────────────────────────────────────────────────────────────
  {
    _id: 'people-en',
    _type: 'people',
    language: 'en',
    pageTitle: 'Our People',
    pageSubtitle: 'Experienced professionals driving Allseeds Turkey forward.',
    teamMembers: [
      {
        _key: 'm1',
        name: 'Oleksandr Homenko',
        title: 'Chief Executive Officer',
        bio: [block('With 20+ years in agricultural commodity trading across Eastern Europe and global markets, Oleksandr leads Allseeds Turkey\'s commercial strategy and international expansion. He has deep expertise in vegetable oil markets, trade finance and supply chain management.')],
        email: 'o.homenko@allseeds.com',
      },
      {
        _key: 'm2',
        name: 'Deniz Arslan',
        title: 'Head of Turkey Operations',
        bio: [block('Deniz brings 15 years of experience in agricultural trade and logistics within Turkey and the broader Black Sea region. He manages local supplier relationships, regulatory compliance and logistics coordination for the Turkish market.')],
        email: 'd.arslan@allseeds.com',
      },
      {
        _key: 'm3',
        name: 'Natalia Kovalenko',
        title: 'International Sales Director',
        bio: [block('Natalia leads Allseeds\'s commercial relationships with buyers across the Middle East, North Africa and South Asia. She has 12 years of experience in vegetable oil trading with a strong track record in CIF/CFR contract negotiation and letter of credit transactions.')],
        email: 'n.kovalenko@allseeds.com',
      },
    ],
    cultureText: [
      block('At Allseeds, we believe our people are our most valuable asset. We cultivate a culture of integrity, expertise and continuous learning — attracting professionals who share our commitment to excellence in agricultural trade.'),
    ],
  },
  {
    _id: 'people-tr',
    _type: 'people',
    language: 'tr',
    pageTitle: 'Ekibimiz',
    pageSubtitle: 'Allseeds Turkey\'i ileriye taşıyan deneyimli profesyoneller.',
    teamMembers: [
      {
        _key: 'm1',
        name: 'Oleksandr Homenko',
        title: 'Genel Müdür',
        bio: [block("Doğu Avrupa ve küresel pazarlarda 20 yılı aşkın tarımsal emtia ticareti deneyimiyle Oleksandr, Allseeds Turkey'nin ticari stratejisini ve uluslararası büyümesini yönetmektedir.")],
        email: 'o.homenko@allseeds.com',
      },
      {
        _key: 'm2',
        name: 'Deniz Arslan',
        title: 'Türkiye Operasyon Direktörü',
        bio: [block("Deniz, Türkiye ve geniş Karadeniz bölgesinde tarımsal ticaret ve lojistik alanında 15 yıllık deneyime sahiptir. Yerel tedarikçi ilişkilerini, mevzuata uyumu ve Türk pazarı için lojistik koordinasyonu yönetmektedir.")],
        email: 'd.arslan@allseeds.com',
      },
      {
        _key: 'm3',
        name: 'Natalia Kovalenko',
        title: 'Uluslararası Satış Direktörü',
        bio: [block("Natalia, Orta Doğu, Kuzey Afrika ve Güney Asya'daki alıcılarla Allseeds'in ticari ilişkilerini yönetmektedir. Bitkisel yağ ticaretinde 12 yıllık deneyime sahip olup CIF/CFR sözleşme müzakeresi ve akreditif işlemlerinde güçlü bir sicile sahiptir.")],
        email: 'n.kovalenko@allseeds.com',
      },
    ],
    cultureText: [
      block("Allseeds'te insanlarımızın en değerli varlığımız olduğuna inanıyoruz. Tarımsal ticaretteki mükemmelliyet taahhüdümüzü paylaşan profesyonelleri bünyemize katarak dürüstlük, uzmanlık ve sürekli öğrenme kültürü oluşturuyoruz."),
    ],
  },

  // ── COMPANY ───────────────────────────────────────────────────────────────
  {
    _id: 'company-en',
    _type: 'company',
    language: 'en',
    pageTitle: 'Company',
    pageSubtitle: 'A vertically integrated agricultural group with a global reach.',
    aboutText: [
      block('Allseeds Group is a vertically integrated agricultural company specialising in the procurement, processing and export of Ukrainian vegetable oils, meals and oilseeds. Founded with the mission of bringing Ukrainian agricultural excellence to global markets, the Group has grown into one of the country\'s leading vegetable oil exporters.'),
      block('Allseeds Turkey serves as the Group\'s international trading hub — connecting Ukrainian production with buyers across the European Union, Middle East, North Africa, South and Southeast Asia. Our Istanbul office provides strategic proximity to key transit routes through the Bosphorus and the broader Black Sea trade corridor.'),
      block('The Group\'s vertically integrated model — spanning oilseed procurement, crushing, refining, storage, own-fleet inland transport and international sales — ensures end-to-end quality control and supply chain reliability that our customers depend on.'),
    ],
    founded: '2002',
    keyFigures: [
      { _key: 'k1', value: '>2,000', label: 'Oilseed Suppliers' },
      { _key: 'k2', value: '725,000 MT', label: 'Annual Crush Capacity' },
      { _key: 'k3', value: '#3', label: 'Vegetable Oil Exporter from Ukraine' },
      { _key: 'k4', value: '3', label: 'Crushing Plants' },
      { _key: 'k5', value: '100,000 MT', label: 'Oil Storage Capacity' },
      { _key: 'k6', value: '91', label: 'Owned Transport Vehicles' },
    ],
    locations: [
      {
        _key: 'l1',
        city: 'Geneva',
        country: 'Switzerland',
        address: 'Rue du Rhône 14, 1204 Geneva',
        isPrimary: true,
      },
      {
        _key: 'l2',
        city: 'Luxembourg',
        country: 'Luxembourg',
        address: '2 Rue Edward Steichen, L-2540 Luxembourg',
        isPrimary: false,
      },
      {
        _key: 'l3',
        city: 'Kyiv',
        country: 'Ukraine',
        address: '4 Sportyvna Ploscha, 01023 Kyiv',
        isPrimary: false,
      },
      {
        _key: 'l4',
        city: 'Mumbai',
        country: 'India',
        address: 'Nariman Point, Mumbai 400 021',
        isPrimary: false,
      },
      {
        _key: 'l5',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Levent, Büyükdere Cad., 34394 Istanbul',
        isPrimary: false,
      },
    ],
  },
  {
    _id: 'company-tr',
    _type: 'company',
    language: 'tr',
    pageTitle: 'Şirket',
    pageSubtitle: 'Küresel erişime sahip dikey entegre bir tarım grubu.',
    aboutText: [
      block("Allseeds Group, Ukrayna bitkisel yağlarının, küspelerinin ve yağlı tohumlarının tedariki, işlenmesi ve ihracatında uzmanlaşmış dikey entegre bir tarım şirketidir. Ukrayna'nın tarımsal mükemmeliyetini küresel pazarlara taşıma misyonuyla kurulan Grup, ülkenin önde gelen bitkisel yağ ihracatçılarından biri haline gelmiştir."),
      block("Allseeds Turkey, Grubun uluslararası ticaret merkezi olarak Ukrayna üretimini Avrupa Birliği, Orta Doğu, Kuzey Afrika, Güney ve Güneydoğu Asya'daki alıcılarla buluşturmaktadır. İstanbul ofisimiz, Boğaz üzerinden ve geniş Karadeniz ticaret koridoru boyunca kilit transit güzergahlara stratejik yakınlık sağlamaktadır."),
      block("Grubun dikey entegre modeli — yağlı tohum tedariki, kırma, rafinasyon, depolama, öz filoya sahip iç taşıma ve uluslararası satışları kapsayan — müşterilerimizin güvendiği uçtan uca kalite kontrolü ve tedarik zinciri güvenilirliğini garanti etmektedir."),
    ],
    founded: '2002',
    keyFigures: [
      { _key: 'k1', value: '>2.000', label: 'Yağlı Tohum Tedarikçisi' },
      { _key: 'k2', value: '725.000 MT', label: 'Yıllık Kırma Kapasitesi' },
      { _key: 'k3', value: '#3', label: "Ukrayna'dan Bitkisel Yağ İhracatçısı" },
      { _key: 'k4', value: '3', label: 'Kırma Tesisi' },
      { _key: 'k5', value: '100.000 MT', label: 'Yağ Depolama Kapasitesi' },
      { _key: 'k6', value: '91', label: 'Özel Taşıt' },
    ],
    locations: [
      {
        _key: 'l1',
        city: 'Cenevre',
        country: 'İsviçre',
        address: 'Rue du Rhône 14, 1204 Cenevre',
        isPrimary: true,
      },
      {
        _key: 'l2',
        city: 'Lüksemburg',
        country: 'Lüksemburg',
        address: '2 Rue Edward Steichen, L-2540 Lüksemburg',
        isPrimary: false,
      },
      {
        _key: 'l3',
        city: 'Kyiv',
        country: 'Ukrayna',
        address: '4 Sportyvna Ploscha, 01023 Kyiv',
        isPrimary: false,
      },
      {
        _key: 'l4',
        city: 'Mumbai',
        country: 'Hindistan',
        address: 'Nariman Point, Mumbai 400 021',
        isPrimary: false,
      },
      {
        _key: 'l5',
        city: 'İstanbul',
        country: 'Türkiye',
        address: 'Levent, Büyükdere Cad., 34394 İstanbul',
        isPrimary: false,
      },
    ],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    _id: 'contact-en',
    _type: 'contact',
    language: 'en',
    pageTitle: 'Contact Us',
    pageSubtitle: 'Get in touch with the right team for your enquiry.',
    email: 'turkey@allseeds.com',
    phone: '+90 212 000 0000',
    formTitle: 'Send Us a Message',
    contactCategories: [
      {
        _key: 'c1',
        title: 'Seed Suppliers',
        description: 'Interested in supplying sunflower seeds, rapeseed or soybeans to Allseeds.',
        email: 'turkey@allseeds.com',
        icon: '🌾',
      },
      {
        _key: 'c2',
        title: 'Vegetable Oil & Meal Buyers',
        description: 'Enquiries about purchasing sunflower oil, rapeseed oil, soybean oil or meal.',
        email: 'turkey@allseeds.com',
        icon: '🛢️',
      },
      {
        _key: 'c3',
        title: 'Shipping & Logistics',
        description: 'Chartering, freight enquiries and logistics partnerships.',
        email: 'turkey@allseeds.com',
        icon: '🚢',
      },
      {
        _key: 'c4',
        title: 'Careers',
        description: 'Join our team — we are always looking for talented agricultural trade professionals.',
        email: 'hr.turkey@allseeds.com',
        icon: '💼',
      },
    ],
    locations: [
      {
        _key: 'l1',
        city: 'Geneva',
        country: 'Switzerland',
        address: 'Rue du Rhône 14, 1204 Geneva',
        phone: '+41 22 000 0000',
        email: 'geneva@allseeds.com',
      },
      {
        _key: 'l2',
        city: 'Luxembourg',
        country: 'Luxembourg',
        address: '2 Rue Edward Steichen, L-2540 Luxembourg',
        phone: '+352 000 0000',
        email: 'luxembourg@allseeds.com',
      },
      {
        _key: 'l3',
        city: 'Kyiv',
        country: 'Ukraine',
        address: '4 Sportyvna Ploscha, 01023 Kyiv',
        phone: '+380 44 000 0000',
        email: 'kyiv@allseeds.com',
      },
      {
        _key: 'l4',
        city: 'Mumbai',
        country: 'India',
        address: 'Nariman Point, Mumbai 400 021',
        phone: '+91 22 0000 0000',
        email: 'india@allseeds.com',
      },
      {
        _key: 'l5',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Levent, Büyükdere Cad., 34394 Istanbul',
        phone: '+90 212 000 0000',
        email: 'turkey@allseeds.com',
      },
    ],
  },
  {
    _id: 'contact-tr',
    _type: 'contact',
    language: 'tr',
    pageTitle: 'Bize Ulaşın',
    pageSubtitle: 'Sorgunuza uygun ekiple iletişime geçin.',
    email: 'turkey@allseeds.com',
    phone: '+90 212 000 0000',
    formTitle: 'Bize Mesaj Gönderin',
    contactCategories: [
      {
        _key: 'c1',
        title: 'Tohum Tedarikçileri',
        description: "Allseeds'e ayçiçeği tohumu, kolza veya soya fasulyesi tedarik etmek istiyorsunuz.",
        email: 'turkey@allseeds.com',
        icon: '🌾',
      },
      {
        _key: 'c2',
        title: 'Bitkisel Yağ ve Küspe Alıcıları',
        description: 'Ayçiçek yağı, kolza yağı, soya yağı veya küspe satın alma sorguları.',
        email: 'turkey@allseeds.com',
        icon: '🛢️',
      },
      {
        _key: 'c3',
        title: 'Nakliye ve Lojistik',
        description: 'Kiralama, navlun sorguları ve lojistik ortaklıklar.',
        email: 'turkey@allseeds.com',
        icon: '🚢',
      },
      {
        _key: 'c4',
        title: 'Kariyer',
        description: 'Ekibimize katılın — her zaman yetenekli tarımsal ticaret profesyonelleri arıyoruz.',
        email: 'hr.turkey@allseeds.com',
        icon: '💼',
      },
    ],
    locations: [
      {
        _key: 'l1',
        city: 'Cenevre',
        country: 'İsviçre',
        address: 'Rue du Rhône 14, 1204 Cenevre',
        phone: '+41 22 000 0000',
        email: 'geneva@allseeds.com',
      },
      {
        _key: 'l2',
        city: 'Lüksemburg',
        country: 'Lüksemburg',
        address: '2 Rue Edward Steichen, L-2540 Lüksemburg',
        phone: '+352 000 0000',
        email: 'luxembourg@allseeds.com',
      },
      {
        _key: 'l3',
        city: 'Kyiv',
        country: 'Ukrayna',
        address: '4 Sportyvna Ploscha, 01023 Kyiv',
        phone: '+380 44 000 0000',
        email: 'kyiv@allseeds.com',
      },
      {
        _key: 'l4',
        city: 'Mumbai',
        country: 'Hindistan',
        address: 'Nariman Point, Mumbai 400 021',
        phone: '+91 22 0000 0000',
        email: 'india@allseeds.com',
      },
      {
        _key: 'l5',
        city: 'İstanbul',
        country: 'Türkiye',
        address: 'Levent, Büyükdere Cad., 34394 İstanbul',
        phone: '+90 212 000 0000',
        email: 'turkey@allseeds.com',
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
