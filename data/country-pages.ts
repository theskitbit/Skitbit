export interface CountryPageContent {
  code: string
  name: string
  locale: string
  hero: {
    headline: string
    subheadline: string
    primaryCta: string
    secondaryCta: string
  }
  trustSection: {
    heading: string
    description: string
  }
  problemSection: {
    headline: string
    problems: string[]
  }
  servicesSection: {
    headline: string
    description: string
  }
  useCasesSection: {
    headline: string
    description: string
    useCases: string[]
  }
  whySection: {
    headline: string
    benefits: string[]
  }
  processSection: {
    headline: string
    steps: string[]
  }
  pricingSection: {
    headline: string
    description: string
  }
  faqSection: {
    headline: string
    faqs: {
      question: string
      answer: string
    }[]
  }
  finalCta: {
    headline: string
    description: string
    primaryCta: string
  }
}

export const countryPages: Record<string, CountryPageContent> = {
  us: {
    code: 'us',
    name: 'United States',
    locale: 'en-US',
    hero: {
      headline: 'High-Converting 3D Product Visuals for Scaling D2C Brands',
      subheadline: 'Create CGI ads, product renders, and launch creatives without expensive shoots. Perfect for Meta, TikTok, and Amazon PDP optimization.',
      primaryCta: 'Book a Creative Strategy Call',
      secondaryCta: 'See Our Work',
    },
    trustSection: {
      heading: 'Trusted by Ambitious D2C Brands',
      description: 'Helping growth-focused teams scale product visuals and ad creatives that actually convert.',
    },
    problemSection: {
      headline: 'The D2C Creative Bottleneck',
      problems: [
        'Slow physical product shoots limiting testing velocity',
        'High production costs consuming your creative budget',
        'Inconsistent visual quality across ads and platforms',
        'Long turnaround times forcing delayed launches',
        'Generic stock visuals lowering CTR and ROAS',
      ],
    },
    servicesSection: {
      headline: 'Premium Visual Production Without the Shoot',
      description: 'We create high-converting 3D product renders, CGI ads, animations, and PDP visuals optimized for paid campaigns and product pages.',
    },
    useCasesSection: {
      headline: 'Built for Every Stage of Growth',
      description: 'From launch campaigns to scaling paid ads, we handle the creative systems that drive revenue.',
      useCases: [
        'Product Launch Campaigns',
        'Paid Ad Testing',
        'Amazon PDP Optimization',
        'Social Commerce Content',
        'Brand Expansion',
      ],
    },
    whySection: {
      headline: 'Why Smart Brands Choose Skitbit',
      benefits: [
        'Conversion-first approach, not just beautiful renders',
        'Rapid iteration cycles keeping pace with fast-growing brands',
        'Proven track record improving CTR, ROAS, and ACOS metrics',
        'Complete visual systems, not one-off projects',
        'Remote-first production enabling seamless collaboration',
      ],
    },
    processSection: {
      headline: 'From Strategy to Launch in Weeks',
      steps: [
        'Strategy Session',
        'Creative Concepts',
        'Production Sprint',
        'Optimization',
      ],
    },
    pricingSection: {
      headline: 'Flexible Plans for Brands of Any Size',
      description: 'From project-based work to ongoing creative retainers, we scale with your needs.',
    },
    faqSection: {
      headline: 'Common Questions',
      faqs: [
        {
          question: 'Do you work with brands in the United States?',
          answer: 'Yes. We specialize in serving US-based D2C, eCommerce, and consumer brands scaling on paid ads. Our remote-first model enables seamless collaboration regardless of location.',
        },
        {
          question: 'What types of product visuals do you create?',
          answer: 'We create 3D product renders, CGI ads, product animations, PDP visuals, lifestyle product shots, and complete launch creative systems tailored for paid social and eCommerce.',
        },
        {
          question: 'Is this suitable for paid ads and product launches?',
          answer: 'Absolutely. Our work is specifically optimized for Meta ads, TikTok, Google Shopping, Amazon, and product page conversion. Every asset is built with performance metrics in mind.',
        },
        {
          question: 'Do we need to ship products to you?',
          answer: 'No. We work from 3D product models, spec sheets, and reference images. No physical shipments needed, saving you time and cost.',
        },
        {
          question: 'How fast can a project start?',
          answer: 'We can start concept work within 48 hours of briefing. Most full production sprints take 2-4 weeks depending on scope.',
        },
      ],
    },
    finalCta: {
      headline: 'Ready to Stop Shooting and Start Converting?',
      description: 'Let us discuss your creative challenges and build a visual strategy that scales with your growth.',
      primaryCta: 'Schedule Your Strategy Call',
    },
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    locale: 'en-GB',
    hero: {
      headline: 'Premium 3D Product Visuals for UK D2C and Ecommerce Brands',
      subheadline: 'Stunning CGI renders and ad creatives without expensive studio shoots. Built for premium beauty, fashion, wellness, and consumer brands.',
      primaryCta: 'Book a Consultation',
      secondaryCta: 'View Our Portfolio',
    },
    trustSection: {
      heading: 'Trusted by Premium UK Brands',
      description: 'From emerging DTC ventures to established eCommerce leaders, we deliver polished creative production that elevates brand perception.',
    },
    problemSection: {
      headline: 'The Premium Brand Creative Challenge',
      problems: [
        'Studio shoots becoming prohibitively expensive and logistically complex',
        'Rigid production schedules limiting seasonal campaign agility',
        'Struggling to maintain visual consistency across product ranges',
        'Delayed launches due to traditional photography workflows',
        'Competitors leapfrogging with faster, smarter visual production',
      ],
    },
    servicesSection: {
      headline: 'Elevated Product Visuals Without the Studio Overhead',
      description: 'We create premium 3D renders, CGI campaigns, product animations, and visual systems that reflect brand quality and drive conversions.',
    },
    useCasesSection: {
      headline: 'Designed for Premium UK Brands',
      description: 'From luxury beauty to high-end fashion, we handle visual production that matches brand expectations.',
      useCases: [
        'New Product Launches',
        'Beauty & Wellness',
        'Fashion & Accessories',
        'Paid Social Campaigns',
        'Seasonal Collections',
      ],
    },
    whySection: {
      headline: 'Why Premium Brands Partner With Skitbit',
      benefits: [
        'Quality that matches luxury brand standards, every time',
        'Production speed enabling responsive campaign management',
        'Proven expertise with UK premium eCommerce leaders',
        'Bespoke creative strategy, not templated solutions',
        'Seamless UK-based collaboration and support',
      ],
    },
    processSection: {
      headline: 'From Concept to Launch',
      steps: [
        'Brand Discovery',
        'Concept Development',
        'Premium Production',
        'Campaign Delivery',
      ],
    },
    pricingSection: {
      headline: 'Scalable Production for Brands of All Sizes',
      description: 'From individual project campaigns to dedicated retainer partnerships.',
    },
    faqSection: {
      headline: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'Do you work with brands based in the UK?',
          answer: 'Yes. We specialise in supporting UK-based eCommerce, DTC, and premium consumer brands. Our understanding of the UK market and direct collaboration model makes us an ideal partner.',
        },
        {
          question: 'What types of product visuals do you create?',
          answer: 'We create photorealistic 3D renders, premium CGI ads, product animations, lifestyle imagery, and complete visual systems tailored for brand guidelines and campaign requirements.',
        },
        {
          question: 'Is this suitable for paid ads and product launches?',
          answer: 'Completely. Our visuals are optimised for Instagram, Pinterest, Google Shopping, Shopify storefronts, and paid campaign performance across all major platforms.',
        },
        {
          question: 'Do we need to send physical products?',
          answer: 'No. We work from product images, technical specifications, and 3D files. No need for physical shipments—we handle everything remotely.',
        },
        {
          question: 'How quickly can we begin?',
          answer: 'We can commence concept development within 48 hours of briefing. Full production campaigns typically complete in 2-4 weeks.',
        },
      ],
    },
    finalCta: {
      headline: 'Transform Your Product Visuals Without Studio Complexity',
      description: 'Let us explore how premium CGI production can accelerate your product launches and campaign performance.',
      primaryCta: 'Book Your Strategy Session',
    },
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    locale: 'en-CA',
    hero: {
      headline: 'High-Quality 3D Product Visuals for Growing Canadian Brands',
      subheadline: 'Create stunning product renders and ad creatives without expensive studio shoots. Designed for lean teams building fast-growing brands.',
      primaryCta: 'Start Your Project',
      secondaryCta: 'See Examples',
    },
    trustSection: {
      heading: 'Trusted by Canadian Growth Brands',
      description: 'Supporting lean eCommerce teams and ambitious DTC brands scaling product visuals that drive conversion.',
    },
    problemSection: {
      headline: 'Creative Production Challenges for Fast-Growing Brands',
      problems: [
        'Limited budgets making expensive studio shoots unfeasible',
        'Small teams lacking dedicated creative resources',
        'Product range expansion requiring fast visual production',
        'Competitive pressure from well-funded US brands',
        'Need for rapid creative iteration without logistical overhead',
      ],
    },
    servicesSection: {
      headline: 'Smart Visual Production for Lean Teams',
      description: 'We deliver high-quality 3D renders, product animations, and ad creatives at a scale that makes sense for growing brands.',
    },
    useCasesSection: {
      headline: 'Perfect for Canadian Ecommerce Brands',
      description: 'From DTC beauty to consumer goods, we support visual production at any growth stage.',
      useCases: [
        'Product Launches',
        'Paid Social Scaling',
        'PDP Optimization',
        'Marketplace Content',
        'Seasonal Campaigns',
      ],
    },
    whySection: {
      headline: 'Why Canadian Brands Choose Skitbit',
      benefits: [
        'Cost-effective alternative to traditional product photography',
        'Speed enabling faster market response and competitive advantage',
        'Scalable models growing with your brand',
        'Canadian expertise and local market understanding',
        'Flexible project-based and retainer options',
      ],
    },
    processSection: {
      headline: 'Simple, Fast Process',
      steps: [
        'Quick Brief',
        'Concept Presentation',
        'Production & Delivery',
        'Optimization',
      ],
    },
    pricingSection: {
      headline: 'Pricing Built for Growth',
      description: 'Flexible plans scaling with your creative needs and budget.',
    },
    faqSection: {
      headline: 'Questions?',
      faqs: [
        {
          question: 'Do you work with Canadian brands?',
          answer: 'Absolutely. We specialise in supporting Canadian DTC and eCommerce brands scaling across North America. Our remote model enables seamless collaboration with teams across Canada.',
        },
        {
          question: 'What product visuals can you create?',
          answer: 'We create 3D product renders, CGI ads, animations, lifestyle shots, and complete visual packages optimised for eCommerce and paid campaigns.',
        },
        {
          question: 'Can you support paid ads and product launches?',
          answer: 'Yes. Our work is specifically designed for Meta ads, TikTok, Google Shopping, Amazon, and product page conversion optimisation.',
        },
        {
          question: 'Do we need to ship products to you?',
          answer: 'No. We work from product photos, specs, and 3D files. Everything happens remotely—no shipping required.',
        },
        {
          question: 'What is the typical project timeline?',
          answer: 'We can start concepts within 48 hours. Most projects complete in 2-4 weeks depending on scope and revisions.',
        },
      ],
    },
    finalCta: {
      headline: "Let us Build Visuals That Drive Your Growth",
      description: 'Schedule a quick call to discuss your creative needs and timeline.',
      primaryCta: 'Book a Call',
    },
  },
  au: {
    code: 'au',
    name: 'Australia',
    locale: 'en-AU',
    hero: {
      headline: '3D Product Visuals for Fast-Growing Australian Brands',
      subheadline: 'Premium CGI renders and ad creatives without expensive production complexity. Built for beauty, wellness, fashion, and consumer brands.',
      primaryCta: "Let us Talk",
      secondaryCta: 'View Our Work',
    },
    trustSection: {
      heading: 'Trusted by Australian Growth Brands',
      description: 'Supporting local beauty, wellness, and consumer brands with fast, high-quality creative production.',
    },
    problemSection: {
      headline: 'Creative Challenges for Australian Ecommerce',
      problems: [
        'Physical shoots consuming time and budget better spent on growth',
        'Geographic isolation making international production collaboration difficult',
        'Need for fast product visual production to compete with global brands',
        'Limited local creative production options meeting quality standards',
        'Multiple product launches requiring rapid visual asset creation',
      ],
    },
    servicesSection: {
      headline: 'Fast, High-Quality Visuals Built for Australian Brands',
      description: 'We deliver premium 3D renders, CGI campaigns, and product visuals optimised for social commerce and eCommerce conversion.',
    },
    useCasesSection: {
      headline: 'Supporting Australian Brand Growth',
      description: 'From beauty and wellness to fashion and lifestyle, we handle visual production at scale.',
      useCases: [
        'Product Launches',
        'Social Commerce',
        'Paid Ad Campaigns',
        'Beauty & Wellness',
        'Seasonal Collections',
      ],
    },
    whySection: {
      headline: 'Why Australian Brands Trust Skitbit',
      benefits: [
        'Local market expertise combined with global production capability',
        'Fast turnaround beating traditional shoot timelines',
        'Premium quality competing with international standards',
        'Flexible engagement models growing with your brand',
        'Remote collaboration enabling seamless timezone management',
      ],
    },
    processSection: {
      headline: 'Simple, Fast Workflow',
      steps: [
        'Project Briefing',
        'Concept Direction',
        'Full Production',
        'Campaign Launch Support',
      ],
    },
    pricingSection: {
      headline: 'Flexible Plans for Growing Brands',
      description: 'Project-based work and ongoing retainer options scaling with your needs.',
    },
    faqSection: {
      headline: 'Frequently Asked',
      faqs: [
        {
          question: 'Do you work with Australian brands?',
          answer: 'Yes. We specialise in supporting Australian DTC, beauty, wellness, and eCommerce brands. Our remote-first approach works perfectly across Australian timezones.',
        },
        {
          question: 'What types of product visuals can you produce?',
          answer: 'We create 3D product renders, CGI ads, animations, lifestyle photography, and complete visual systems optimised for eCommerce and paid social.',
        },
        {
          question: 'Can you support paid ads and product launches?',
          answer: 'Absolutely. Our visuals are designed for Instagram, TikTok, Facebook, Pinterest, and Amazon—optimised for conversion performance.',
        },
        {
          question: 'Do we need to send physical products?',
          answer: 'No. We work from product images, technical files, and specifications. Everything is handled remotely.',
        },
        {
          question: 'How quickly can projects start?',
          answer: 'We can begin concept work within 48 hours. Full production typically takes 2-4 weeks depending on scope.',
        },
      ],
    },
    finalCta: {
      headline: 'Stop Worrying About Production Logistics',
      description: 'Let us build visual assets that support your brand growth and campaign performance.',
      primaryCta: 'Schedule a Chat',
    },
  },
  ae: {
    code: 'ae',
    name: 'United Arab Emirates',
    locale: 'en-AE',
    hero: {
      headline: 'Luxury 3D Product Visuals for Premium UAE Brands',
      subheadline: 'Exquisite CGI renders and high-impact creatives for luxury beauty, jewelry, fragrance, and premium consumer brands. Perfect for social-first visual campaigns.',
      primaryCta: 'Schedule a Discovery Call',
      secondaryCta: 'View Portfolio',
    },
    trustSection: {
      heading: 'Trusted by Premium UAE and GCC Brands',
      description: 'Supporting luxury brands and premium consumer companies with world-class visual production and campaign assets.',
    },
    problemSection: {
      headline: 'Luxury Brand Visual Production Challenges',
      problems: [
        'Traditional shoots not matching luxury brand standards and sophistication',
        'Need for rapid campaign production for competitive social-first markets',
        'Complex product characteristics requiring precise, detailed visualisation',
        'High expectations for visual consistency across markets and seasons',
        'Time-sensitive luxury launches requiring immediate visual asset deployment',
      ],
    },
    servicesSection: {
      headline: 'Premium CGI and 3D Production for Luxury Brands',
      description: 'We create exquisite product visuals, premium campaign creatives, and high-impact CGI assets that reflect luxury brand prestige and drive conversions.',
    },
    useCasesSection: {
      headline: 'Tailored for Premium Brands',
      description: 'From luxury fragrance to fine jewelry, we deliver visual production worthy of premium positioning.',
      useCases: [
        'Luxury Product Launches',
        'Fragrance Campaigns',
        'Jewelry & Accessories',
        'Social-First Campaigns',
        'Premium Beauty',
      ],
    },
    whySection: {
      headline: 'Why Premium Brands Choose Skitbit',
      benefits: [
        'Expertise in luxury brand positioning and premium visual storytelling',
        'Precision and attention to detail befitting luxury product standards',
        'Rapid production enabling competitive social-first campaign response',
        'Understanding of GCC market preferences and aesthetic standards',
        'Proven track record with premium and luxury brands globally',
      ],
    },
    processSection: {
      headline: 'From Vision to Launch',
      steps: [
        'Luxury Brand Discovery',
        'Artistic Direction',
        'Premium Production',
        'Campaign Deployment',
      ],
    },
    pricingSection: {
      headline: 'Premium Production Models',
      description: 'Bespoke project partnerships and dedicated retainer options for ongoing luxury brand campaigns.',
    },
    faqSection: {
      headline: 'Your Questions Answered',
      faqs: [
        {
          question: 'Do you work with brands in the UAE and GCC?',
          answer: 'Yes. We specialise in supporting premium luxury and consumer brands across the UAE and broader GCC region. Our expertise spans luxury positioning, Islamic market considerations, and regional aesthetic preferences.',
        },
        {
          question: 'What premium visuals can you create?',
          answer: 'We create exquisite 3D renders, luxury CGI campaigns, precision jewelry photography, fragrance artistry, and premium lifestyle visuals that elevate brand perception.',
        },
        {
          question: 'Can you support luxury launches and paid campaigns?',
          answer: 'Absolutely. Our work is optimised for luxury brand social commerce, Instagram, TikTok, and premium marketplace positioning.',
        },
        {
          question: 'Do we need to provide physical products?',
          answer: 'No. We work from detailed product specifications, reference imagery, and 3D files. Everything is completed remotely with precision.',
        },
        {
          question: 'What is your turnaround time for luxury campaigns?',
          answer: 'We can initiate artistic direction within 48 hours of briefing. Full luxury production campaigns typically complete in 3-5 weeks to match premium standards.',
        },
      ],
    },
    finalCta: {
      headline: 'Elevate Your Brand With World-Class Visual Production',
      description: 'Let us discuss your luxury brand vision and create visuals that reflect your market position.',
      primaryCta: 'Book Your Luxury Consultation',
    },
  },
  de: {
    code: 'de',
    name: 'Germany',
    locale: 'de-DE',
    hero: {
      headline: 'Praezisions-3D-Produktvisuals fuer deutsche DTC- und Ecommerce-Marken',
      subheadline: 'Hochwertige CGI-Renders und Kampagnen-Creatives ohne teure Studioshootings. Entwickelt fuer Premium-Marken mit hohen Qualitaetsanspruechen.',
      primaryCta: 'Jetzt Strategie-Gespraech buchen',
      secondaryCta: 'Portfolio ansehen',
    },
    trustSection: {
      heading: 'Vertraut von deutschen Premium- und DTC-Marken',
      description: 'Unterstuetzung fuer schnell wachsende Ecommerce-Marken mit professioneller visueller Produktion auf hoechstem Niveau.',
    },
    problemSection: {
      headline: 'Herausforderungen bei der visuellen Produktion',
      problems: [
        'Teure und komplexe Studioshootings binden Ressourcen',
        'Lange Produktionszyklen verzoegern Kampagnenstarts',
        'Schwierigkeiten bei der Konsistenz ueber Produktreihen hinweg',
        'Konkurrenz nutzt schnellere Produktionsmethoden',
        'Hohe Erwartungen an visuelle Qualitaet erfordern spezialisierte Expertise',
      ],
    },
    servicesSection: {
      headline: 'Hochwertige 3D-Produktvisuals fuer anspruchsvolle Marken',
      description: 'Wir erstellen praezise 3D-Renders, CGI-Kampagnen und Produktvisuals, die Ihre Markenqualitaet widerspiegeln und Conversions treiben.',
    },
    useCasesSection: {
      headline: 'Fuer deutsche Ecommerce- und DTC-Marken',
      description: 'Von Produktstarts bis zu skalierten Kampagnen, wir liefern visuelle Systeme, die Ergebnisse bringen.',
      useCases: [
        'Produkteinfuehrungen',
        'Beauty & Wellness',
        'Mode & Accessoires',
        'Paid-Social-Kampagnen',
        'Saisonale Kollektionen',
      ],
    },
    whySection: {
      headline: 'Warum deutsche Marken Skitbit vertrauen',
      benefits: [
        'Deutsche Qualitaetsstandards und Praezision in jeder Produktion',
        'Schnellere Produktionszyklen als traditionelle Studios',
        'Expertise mit anspruchsvollen deutschen Ecommerce-Marken',
        'Massgeschneiderte Strategien, keine Templates',
        'Lokale Zusammenarbeit mit deutschen Anforderungen',
      ],
    },
    processSection: {
      headline: 'Von der Idee zur Kampagne',
      steps: [
        'Marken-Workshop',
        'Concept-Entwicklung',
        'Premium-Produktion',
        'Kampagnen-Vorbereitung',
      ],
    },
    pricingSection: {
      headline: 'Skalierbare Modelle fuer Marken aller Groessen',
      description: 'Von projektbasierten Arbeiten bis zu langfristigen Retainer-Partnerschaften.',
    },
    faqSection: {
      headline: 'Haeufig gestellte Fragen',
      faqs: [
        {
          question: 'Arbeitet ihr mit deutschen Marken?',
          answer: 'Ja. Wir spezialisieren uns auf deutsche DTC- und Ecommerce-Marken. Unser Verstaendnis fuer deutsche Qualitaetsstandards und lokale Zusammenarbeit macht uns zum idealen Partner.',
        },
        {
          question: 'Welche Produktvisuals koennt ihr erstellen?',
          answer: 'Wir erstellen fotorealistische 3D-Renders, Premium-CGI-Kampagnen, Produktanimationen und komplette Visualsysteme nach Ihren Vorgaben.',
        },
        {
          question: 'Eignet sich das fuer Paid Ads und Produktlaunches?',
          answer: 'Vollstaendig. Unsere Visuals sind fuer Instagram, Pinterest, Google Shopping und Shopify-Storefronts optimiert.',
        },
        {
          question: 'Muessen wir physische Produkte versenden?',
          answer: 'Nein. Wir arbeiten mit Produktfotos, technischen Spezifikationen und 3D-Dateien. Alles erfolgt remote.',
        },
        {
          question: 'Wie schnell koennen wir starten?',
          answer: 'Innerhalb von 48 Stunden nach dem Briefing koennen wir mit der Concept-Entwicklung beginnen. Vollstaendige Projekte dauern typischerweise 2-4 Wochen.',
        },
      ],
    },
    finalCta: {
      headline: 'Transformieren Sie Ihre Produktvisuals ohne Studio-Komplexitaet',
      description: 'Lassen Sie uns besprechen, wie hochwertige CGI-Produktion Ihre Launches und Kampagnen beschleunigen kann.',
      primaryCta: 'Ihre Strategie-Session buchen',
    },
  },
  fr: {
    code: 'fr',
    name: 'France',
    locale: 'fr-FR',
    hero: {
      headline: 'Visuals 3D Premium pour Marques de Luxe et DTC Francais',
      subheadline: 'Rendus CGI exquis et creatives de campagne sans production studio couteuse. Concu pour les marques de beaute, mode et bien-etre premium.',
      primaryCta: 'Reserver une Consultation',
      secondaryCta: 'Voir Notre Portfolio',
    },
    trustSection: {
      heading: 'Marques Premium Francaises de Confiance',
      description: 'Soutien des marques de luxe et DTC francaise avec production creative de classe mondiale.',
    },
    problemSection: {
      headline: 'Defis de Production Visuelle pour Marques Premium',
      problems: [
        'Les productions studio deviennent prohibitives en cout et complexite',
        'Calendriers rigides limitent l agilite des campagnes saisonnieres',
        'Difficultes a maintenir la coherence visuelle sur les gammes de produits',
        'Delais de lancement prolonges freinant les commandes saisonnieres',
        'Concurrence utilisant des approches visuelles plus rapides et modernes',
      ],
    },
    servicesSection: {
      headline: 'Production CGI Premium pour Marques de Luxe',
      description: 'Nous creons des rendus raffines, des campagnes CGI artisanales et des visuels de produits qui refletent le prestige de votre marque.',
    },
    useCasesSection: {
      headline: 'Concu pour Marques Premium Francaises',
      description: 'De la beaute au luxe, nous gerons la production visuelle qui surpasse les attentes premium.',
      useCases: [
        'Lancements de Produits',
        'Beaute & Fragrances',
        'Mode & Accessoires',
        'Campagnes Reseaux Sociaux',
        'Collections Saisonnieres',
      ],
    },
    whySection: {
      headline: 'Pourquoi Marques Premium Choisissent Skitbit',
      benefits: [
        'Expertise en positionnement de marque luxe et storytelling visuel',
        'Precision et attention aux details selon standards de luxe',
        'Production rapide pour gestion reactive de campagnes',
        'Comprehension du marche francais et preferences esthetiques',
        'References confirmees avec marques premium globales',
      ],
    },
    processSection: {
      headline: 'De la Vision au Lancement',
      steps: [
        'Decouverte de Marque',
        'Direction Artistique',
        'Production Premium',
        'Livraison Campagne',
      ],
    },
    pricingSection: {
      headline: 'Modeles de Production Premium',
      description: 'Partenariats de projets sur-mesure et options de retainer dedie pour campagnes de marques luxe.',
    },
    faqSection: {
      headline: 'Questions Frequemment Posees',
      faqs: [
        {
          question: 'Travaillez-vous avec des marques francaises?',
          answer: 'Oui. Nous nous specialisons dans le soutien des marques de luxe et DTC francaises. Notre comprehension du marche francais et modele de collaboration directe fait de nous un partenaire ideal.',
        },
        {
          question: 'Quels types de visuals premium creez-vous?',
          answer: 'Nous creons des rendus photorealistes, campagnes CGI de luxe, animations de produits et systemes visuels complets adaptes a votre identite de marque.',
        },
        {
          question: 'C est approprie pour les campagnes remunerees?',
          answer: 'Completement. Nos visuals sont optimises pour Instagram, Pinterest, Google Shopping et positionnement marche luxe.',
        },
        {
          question: 'Faut-il envoyer les produits physiques?',
          answer: 'Non. Nous travaillons avec images de produits, specifications techniques et fichiers 3D. Pas d expédition necessaire.',
        },
        {
          question: 'Quel delai pour commencer?',
          answer: 'Nous commencons la direction artistique dans 48h du briefing. Les campagnes de production completes prennent typiquement 3-5 semaines.',
        },
      ],
    },
    finalCta: {
      headline: 'Elevez Votre Marque Avec Production Visuelle de Classe Mondiale',
      description: 'Discutons de votre vision de marque et creons des visuals qui refletent votre positionnement marche.',
      primaryCta: 'Reserver Votre Session Strategique',
    },
  },
  nl: {
    code: 'nl',
    name: 'Netherlands',
    locale: 'nl-NL',
    hero: {
      headline: '3D Productvisuals voor Nederlandse DTC- en Ecommerce-Merken',
      subheadline: 'Premium CGI-renders en campagneconcepten zonder dure studioproducties. Ontworpen voor snelgroeiende merken in beauty, mode en wellness.',
      primaryCta: 'Boek een Gespreck',
      secondaryCta: 'Bekijk Portfolio',
    },
    trustSection: {
      heading: 'Vertrouwd door Nederlandse Ecommerce-Merken',
      description: 'Ondersteuning van snelgroeiende DTC- en ecommerce-merken met efficiente, high-quality visuele productie.',
    },
    problemSection: {
      headline: 'Uitdagingen bij Visuele Productie',
      problems: [
        'Studioshootings slurpen budget op dat beter in groei kan gaan',
        'Lange productiecycli vertragen kampagnestarts en launches',
        'Moeilijkheid bij het handhaven van visuele consistentie over productlijn',
        'Concurrentie reageert sneller met moderne visuele productie',
        'Behoefte aan snelle iteratie voor performance marketing',
      ],
    },
    servicesSection: {
      headline: 'Efficiente 3D-Productvisuals op Professioneel Niveau',
      description: 'Wij creeren high-quality 3D-renders, CGI-campagnes en productvisuals geoptimaseerd voor ecommerce en paid campaigns.',
    },
    useCasesSection: {
      headline: 'Voor Nederlandse Ecommerce- en DTC-Merken',
      description: 'Van productlaunches tot schaalbare campagnes, we leveren visuele systemen die resultaat opleveren.',
      useCases: [
        'Productlaunches',
        'Paid Social Scaling',
        'PDP Optimalisatie',
        'Marketplace Content',
        'Seizoenscampagnes',
      ],
    },
    whySection: {
      headline: 'Waarom Nederlandse Merken Skitbit Kiezen',
      benefits: [
        'Kosteneffectief alternatief voor traditionele productfotografie',
        'Snelheid geeft je competitief voordeel',
        'Schaalbare modellen die groeien met je merk',
        'Nederlandse expertise en lokaal marktbegrip',
        'Flexibele project- en retainer-opties',
      ],
    },
    processSection: {
      headline: 'Simpel, Snel Proces',
      steps: [
        'Korte Brief',
        'Conceptpresentatie',
        'Productie & Levering',
        'Optimalisatie',
      ],
    },
    pricingSection: {
      headline: 'Prijzen Ingesteld op Groei',
      description: 'Flexibele plannen die schalen met je creatieve behoeften en budget.',
    },
    faqSection: {
      headline: 'Veelgestelde Vragen',
      faqs: [
        {
          question: 'Werken jullie met Nederlandse merken?',
          answer: 'Zeker. We specialiseren ons in het ondersteunen van Nederlandse DTC- en ecommerce-merken. Ons remote model maakt naadloze samenwerking mogelijk.',
        },
        {
          question: 'Welke productvisuals kunnen jullie creeren?',
          answer: 'We creeren 3D-productrenderings, CGI-advertenties, animaties, lifestyle shots en complete visuele pakketten geoptimaseerd voor ecommerce en paid campaigns.',
        },
        {
          question: 'Geschikt voor paid ads en productlaunches?',
          answer: 'Absoluut. Ons werk is specifiek ontworpen voor Meta ads, TikTok, Google Shopping, Amazon en productpagina conversie-optimalisatie.',
        },
        {
          question: 'Moeten we producten naar jullie versturen?',
          answer: 'Nee. We werken via productfoto s, specs en 3D-bestanden. Alles gebeurt online—geen verzending nodig.',
        },
        {
          question: 'Hoe snel kunnen projecten starten?',
          answer: 'We kunnen binnen 48 uur met conceptwerk beginnen. De meeste projecten zijn in 2-4 weken af, afhankelijk van scope.',
        },
      ],
    },
    finalCta: {
      headline: 'Laten we Visuals Bouwen die je Groei Steunen',
      description: 'Plan een kort gespreck om je creatieve behoeften en timeline te bespreken.',
      primaryCta: 'Boek een Gespreck',
    },
  },
  se: {
    code: 'se',
    name: 'Sweden',
    locale: 'sv-SE',
    hero: {
      headline: 'Minimalistisk 3D-Produktvisalisering foer Svenska DTC-Maerken',
      subheadline: 'Ren CGI-rendering och kampanjkreativer utan dyr studioproduktion. Designad foer skonhets-, wellness- och livsstilsmaerken.',
      primaryCta: 'Boka ett Samtal',
      secondaryCta: 'Se Var Portfoelj',
    },
    trustSection: {
      heading: 'Litat av Svenska Tillvaeextsmaerken',
      description: 'Stoed foer snabbvaxande e-handelsmaerken med hoegt kvalitativ visuell produktion.',
    },
    problemSection: {
      headline: 'Utmaningar vid Visuell Produktion',
      problems: [
        'Studiofotografering blir allt dyrare och logistiskt komplicerad',
        'Langa produktionscykler bromsar kampanjstarter',
        'Svaert att uppraethalla visuell konsistens over produktserier',
        'Konkurrenter reagerar snabbare med modern visuell produktion',
        'Behov av snabb iteration foer performance marketing',
      ],
    },
    servicesSection: {
      headline: 'Premium 3D-Produktvisalisierung foer Skandinaviska Maerken',
      description: 'Vi skapar hoegkvalitativ 3D-rendering, CGI-kampanjer och produktvisuals optimerade foer e-handel och betalda kampanjer.',
    },
    useCasesSection: {
      headline: 'Foer Svenska E-handels- och DTC-Maerken',
      description: 'Fraan produktlanseringar till skalande kampanjer, vi levererar visuella system som levererar resultat.',
      useCases: [
        'Produktlanseringar',
        'Skonhets & Wellness',
        'Betalade Sociala Kampanjer',
        'E-handelsoptimering',
        'Saesongskollektioner',
      ],
    },
    whySection: {
      headline: 'Varfoer Svenska Maerken Vaeljer Skitbit',
      benefits: [
        'Kostnadseffektiv alternativ till traditionell produktfotografering',
        'Hastighet ger dig konkurrensfraedel',
        'Skalbara modeller som vaexer med ditt maerke',
        'Svensk expertise och lokal marknadskannnedom',
        'Flexibla projekt- och retainer-alternativ',
      ],
    },
    processSection: {
      headline: 'Enkelt, Snabbt Arbetsflode',
      steps: [
        'Kort Briefing',
        'Konceptpresentation',
        'Produktion & Leverans',
        'Optimering',
      ],
    },
    pricingSection: {
      headline: 'Flexibla Planer foer Tillvaeextsmaerken',
      description: 'Projektbaserat arbete och laengstiktiga retainer-alternativ.',
    },
    faqSection: {
      headline: 'Vanliga Fraagor',
      faqs: [
        {
          question: 'Arbetar ni med svenska maerken?',
          answer: 'Ja. Vi specialiserar oss paa att stodja svenska DTC- och e-handelsmaerken. Vaar remote-first modell moejliggaer soemloes samarbete.',
        },
        {
          question: 'Vilka produktvisuals kan ni skapa?',
          answer: 'Vi skapar 3D-produktrendering, CGI-annoncer, animationer, lifestyle-bilder och kompletta visuella paket optimerade foer e-handel.',
        },
        {
          question: 'Passar det foer betalade annoncer och produktlanseringar?',
          answer: 'Helt klart. Vart work aer designad foer Meta, TikTok, Google Shopping och optimering av produktsideskonvertering.',
        },
        {
          question: 'Maste vi skicka fysiska produkter?',
          answer: 'Nej. Vi arbetar fraan produktbilder, specifikationer och 3D-filer. Allt goeers online.',
        },
        {
          question: 'Hur snabbt kan projekt starta?',
          answer: 'Vi kan starta konceptarbete inom 48 timmar. De flesta projekten aer klara paa 2-4 veckor.',
        },
      ],
    },
    finalCta: {
      headline: "Laet us Bygga Visuell Som Stoder Din Tillvaeext",
      description: 'Schemalaegg ett snabbt samtal foer att diskutera dina behoev och tidslinje.',
      primaryCta: 'Boka ett Samtal',
    },
  },
  ch: {
    code: 'ch',
    name: 'Switzerland',
    locale: 'de-CH',
    hero: {
      headline: 'Praezisions-3D-Produktvisuals foer Schweizer Luxus- und Premium-Maerken',
      subheadline: 'Exquisite CGI-Renders und Kampagnenkreatives ohne teure Studioproduktion. Foer Uhren, Schmuck, Beauty und Premium-Konsummaerken.',
      primaryCta: 'Jetzt Beratung Buchen',
      secondaryCta: 'Portfolio Ansehen',
    },
    trustSection: {
      heading: 'Vertraut von Schweizer Premium- und Luxusmaerken',
      description: 'Unterstuetzung von Luxus-, Uhr-, Schmuck- und Premium-Konsummaerken mit weltklasse-Visualproduktion.',
    },
    problemSection: {
      headline: 'Herausforderungen bei Luxus-Visualproduktion',
      problems: [
        'Traditionelle Shootings erfuellen nicht die hohen Qualitaetsstandards von Luxusmaerken',
        'Bedarf foer schnelle Kampagnenproduktion bei wettbewerbsintensiven Maerkten',
        'Komplexe Produkteigenschaften erfordern praezise, detaillierte Visualisierung',
        'Hoechste Erwartungen an visuelle Konsistenz ueber Maerkte und Saisons',
        'Zeit-kritische Luxuslaunches erfordern sofortige visuelle Asset-Bereitstellung',
      ],
    },
    servicesSection: {
      headline: 'Premium CGI und 3D-Produktion foer Luxusmaerken',
      description: 'Wir erstellen exquisite Produktvisuals, Premium-Kampagnenkreatives und hochwertige CGI-Assets, die Luxusmaerken-Prestige widerspiegeln.',
    },
    useCasesSection: {
      headline: 'Spezialisiert foer Schweizer Premium-Maerken',
      description: 'Von Luxus-Uhren bis Fine Jewellery, wir liefern Visualproduktion auf hoechstem Niveau.',
      useCases: [
        'Luxus-Produktlaunches',
        'Schmuck & Uhren',
        'Haute Beaute',
        'Social-First Kampagnen',
        'Premium Lifestyle',
      ],
    },
    whySection: {
      headline: 'Warum Schweizer Luxusmaerken Skitbit Waehlen',
      benefits: [
        'Expertise in Luxusmarkenpositionierung und visueller Storytelling',
        'Praezision und Liebe zum Detail gemaess Luxus-Standards',
        'Schnelle Produktion foer wettbewerbsfaehige Social-First-Reaktion',
        'Verstaendnis foer Schweizer und GCC-Marktpraefereenzen',
        'Bewaehrte Erfolgsgeschichte mit Premium- und Luxusmaerken global',
      ],
    },
    processSection: {
      headline: 'Von Vision zu Launch',
      steps: [
        'Luxusmaerken-Entdeckung',
        'Kuenstlerische Richtung',
        'Premium-Produktion',
        'Kampagnenbereitstellung',
      ],
    },
    pricingSection: {
      headline: 'Premium-Produktionsmodelle',
      description: 'Bespoke Projektpartnerschaften und dedizierte Retainer-Optionen foer fortlaufende Luxusmarkenkampagnen.',
    },
    faqSection: {
      headline: 'Ihre Fragen Beantwortet',
      faqs: [
        {
          question: 'Arbeitet ihr mit Schweizer Maerken?',
          answer: 'Ja. Wir spezialisieren uns auf Premium-Luxus- und Konsummaerken in der Schweiz. Unsere Expertise in Luxuspositionierung und direkte Zusammenarbeit macht uns zum idealen Partner.',
        },
        {
          question: 'Welche Premium-Visuals koennt ihr erstellen?',
          answer: 'Wir erstellen exquisite 3D-Renders, Luxus-CGI-Kampagnen, Schmuck-Fotografie, Duft-Artistry und Premium-Lifestyle-Visuals, die Markenwahrnehmung heben.',
        },
        {
          question: 'Eignet sich das foer Luxus-Launches und Kampagnen?',
          answer: 'Vollstaendig. Unser Work ist foer Luxus-Brandgesellschaft, Instagram, TikTok und Premium-Marketplace-Positionierung optimiert.',
        },
        {
          question: 'Muessen wir physische Produkte versenden?',
          answer: 'Nein. Wir arbeiten mit detaillierten Produktspezifikationen, Referenzbildern und 3D-Dateien. Alles remote mit hoechster Praezision.',
        },
        {
          question: 'Wie schnell starten Luxuskampagnen?',
          answer: 'Wir koennen kuenstlerische Richtung innerhalb von 48 Stunden starten. Vollstaendige Luxus-Produktionskampagnen dauern typischerweise 3-5 Wochen foer Premium-Standards.',
        },
      ],
    },
    finalCta: {
      headline: 'Elevieren Sie Ihre Maerke Mit Weltklasse-Visualproduktion',
      description: 'Lassen Sie uns Ihre Luxusmaerken-Vision diskutieren und Visuals schaffen, die Ihre Marktposition reflektieren.',
      primaryCta: 'Buchen Sie Ihre Luxus-Konsultation',
    },
  },
}

export function getCountryPage(code: string): CountryPageContent | null {
  return countryPages[code.toLowerCase()] || null
}

export function getAllCountryCodes(): string[] {
  return Object.keys(countryPages)
}
