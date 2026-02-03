export interface Translations {
  [key: string]: string;
}

export const translations: Record<'en' | 'es', Translations> = {
  en: {
    // Navigation
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services',
    navProducts: 'Products',
    navProcess: 'Our Process',
    navTestimonials: 'Testimonials',
    navMarkets: 'Markets & Regions',
    navWhy: 'Why Stamina Pengju',
    navContact: 'Contact',

    // Hero Section
    heroHeadline: 'Your Strategic Bridge Between Asia and the Americas',
    heroSubheadline: 'International Trade, Sourcing, and Industrial Brokerage Solutions',
    heroCta: 'Contact Us',

    // About Section
    aboutTitle: 'About Us',
    aboutContent1: 'STAMINA PENGJU INTL CORP is an international trade and industrial brokerage firm that connects verified manufacturers in Asia with B2B clients across the United States, Central America, the Caribbean, and South America.',
    aboutContent2: 'Our mission is to provide comprehensive sourcing, import/export brokerage, and industrial procurement solutions with a focus on control, traceability, and risk mitigation.',
    aboutContent3: 'We specialize in verifying suppliers, ensuring quality control, and delivering end-to-end execution for B2B clients seeking reliable partnerships in Asia.',
    aboutContent4: 'With extensive experience in cross-border operations, we serve as your strategic bridge to access manufacturing capabilities and industrial resources across the Asian continent.',

    // Services Section
    servicesTitle: 'Our Services',
    service1Title: 'International Sourcing & Supplier Verification',
    service1Desc: 'Identify and connect with verified manufacturers across Asia. Our rigorous verification process ensures reliability and quality compliance.',
    service2Title: 'Import & Export Brokerage',
    service2Desc: 'Expert guidance through import/export regulations, documentation, and procedures. Seamless cross-border transactions with full regulatory compliance.',
    service3Title: 'Factory Audits & Quality Control',
    service3Desc: 'On-site factory audits and comprehensive quality control inspections. Verify production capabilities and ensure product standards are met.',
    service4Title: 'Logistics Coordination',
    service4Desc: 'End-to-end logistics management including FOB, CIF, and DDP terms. Coordinate shipping, customs clearance, and final delivery.',
    service5Title: 'Industrial & Promotional Projects',
    service5Desc: 'Specialized sourcing for large-scale industrial and promotional projects. Custom solutions tailored to your specific requirements.',
    service6Title: 'Custom Supply Chain Solutions',
    service6Desc: 'Tailored supply chain strategies designed around your business needs. Optimize costs, reduce lead times, and improve operational efficiency.',

    // Markets Section
    marketsTitle: 'Markets & Regions',
    marketsSubtitle: 'Global operations with regional execution',
    marketAsia: 'China & Southeast Asia',
    marketAsiaDesc: 'Primary manufacturing hub with verified supplier network',
    marketUSA: 'United States',
    marketUSADesc: 'Strategic market with strong B2B trade partnerships',
    marketCentral: 'Central America',
    marketCentralDesc: 'Regional distribution and logistics coordination',
    marketCaribbean: 'Caribbean',
    marketCaribbeanDesc: 'Cross-border trade facilitation and support',
    marketSouth: 'South America',
    marketSouthDesc: 'Strategic partnerships across major economies',

    // Why Section
    whyTitle: 'Why Stamina Pengju',
    why1Title: 'Verified Manufacturers',
    why1Desc: 'Every supplier in our network undergoes rigorous verification to ensure reliability and quality standards.',
    why2Title: 'Risk Mitigation',
    why2Desc: 'Proactive risk assessment and mitigation strategies protect your investment and ensure smooth operations.',
    why3Title: 'Cost Optimization',
    why3Desc: 'Leverage our expertise and network to achieve competitive pricing without compromising quality or reliability.',
    why4Title: 'End-to-End Control',
    why4Desc: 'Complete oversight from sourcing to delivery. Maintain visibility and control throughout your supply chain.',
    why5Title: 'Confidentiality',
    why5Desc: 'Strict confidentiality protocols protect your business interests and proprietary information.',
    why6Title: 'B2B-Only Focus',
    why6Desc: 'Exclusively focused on business-to-business operations with dedicated support for corporate clients.',

    // Contact Section
    contactTitle: 'Contact Us',
    contactSubtitle: 'Get in touch with our team for professional guidance',
    contactName: 'Name',
    contactCompany: 'Company',
    contactEmail: 'Email',
    contactCountry: 'Country',
    contactMessage: 'Message',
    contactSubmit: 'Send Message',
    contactSending: 'Sending...',
    contactSuccess: 'Message sent successfully!',
    contactError: 'Error sending message. Please try again.',
    contactNameRequired: 'Name is required',
    contactEmailRequired: 'Email is required',
    contactMessageRequired: 'Message is required',
    contactEmailInvalid: 'Invalid email address',

    // Footer
    companyName: 'STAMINA PENGJU INTL CORP',
    footerDescription: 'Your strategic bridge for international trade, sourcing, and industrial brokerage solutions between Asia and the Americas.',

    // Products Section
    productsTitle: 'Products We Source',
    productsSubtitle: 'Industrial and commercial products sourced from verified manufacturers across Asia',
    productCategory1: 'Industrial Equipment',
    productCategory2: 'Vehicles',
    productCategory3: 'Electrical Components',
    productCategory4: 'Packaging Solutions',
    productCategory5: 'LED Displays',
    productCategory6: 'Innovation Labs',

    // Process Section
    processTitle: 'Our Import/Export Process',
    processSubtitle: 'A transparent, efficient approach to international trade',
    processStep1Title: 'Sourcing & Verification',
    processStep1Desc: 'We identify and verify manufacturers that meet your quality and regulatory requirements.',
    processStep2Title: 'Quality Assurance',
    processStep2Desc: 'Factory audits and quality control inspections ensure products meet your specifications.',
    processStep3Title: 'Logistics Coordination',
    processStep3Desc: 'We handle shipping, customs clearance, and documentation for seamless delivery.',
    processStep4Title: 'Delivery & Support',
    processStep4Desc: 'Products arrive at your destination with ongoing support and follow-up.',

    // Testimonials Section
    testimonialsTitle: 'What Our Partners Say',
    testimonialsSubtitle: 'Trusted by companies across the Americas',
    testimonial1: 'Stamina Pengju has been instrumental in connecting us with reliable manufacturers in Asia and USA. Their verification process and quality control have ensured confident sourcing decisions, leading to outstanding results.',
    testimonial1Company: 'Reactive Group, Panama',
    testimonial2: 'The team handled our entire import process seamlessly. From supplier selection to customs clearance, everything was professional and efficient.',
    testimonial2Company: 'CYAN Publicidad, Venezuela',
    testimonial3: 'Their knowledge of international trade regulations and attention to detail has helped us navigate complex import requirements with ease.',
    testimonial3Company: 'HC Business Corp, United States',

    // Gallery Section
    galleryTitle: 'Our Operations & Facilities',
    gallerySubtitle: 'A glimpse into our global operations and quality control processes',

    // Logistics Section
    logisticsTitle: 'Global Trade Routes & Logistics',
    logisticsSubtitle: 'Seamless maritime connections across major trade corridors',
    logisticsCard1Title: 'Pacific Ocean Routes',
    logisticsCard1Desc: 'Direct shipping connections from Asian manufacturing hubs to Americas through the Pacific trade corridor.',
    logisticsCard2Title: 'Panama Canal Access',
    logisticsCard2Desc: 'Strategic routing through the Panama Canal enabling efficient transcontinental trade flows.',
    logisticsCard3Title: 'Atlantic & Caribbean Network',
    logisticsCard3Desc: 'Comprehensive maritime network connecting East Coast, Central America, and Caribbean markets.',
  },
  es: {
    // Navigation
    navHome: 'Inicio',
    navAbout: 'Sobre Nosotros',
    navServices: 'Servicios',
    navProducts: 'Productos',
    navProcess: 'Nuestro Proceso',
    navTestimonials: 'Testimonios',
    navMarkets: 'Mercados y Regiones',
    navWhy: 'Por Qué Stamina Pengju',
    navContact: 'Contacto',

    // Hero Section
    heroHeadline: 'Tu puente estratégico entre Asia y las Américas',
    heroSubheadline: 'Soluciones integrales en comercio internacional y brokerage industrial',
    heroCta: 'Contáctanos',

    // About Section
    aboutTitle: 'Sobre Nosotros',
    aboutContent1: 'STAMINA PENGJU INTL CORP es una firma de brokerage comercial internacional que conecta fabricantes verificados en Asia con clientes B2B en Estados Unidos, Centroamérica, el Caribe y Sudamérica.',
    aboutContent2: 'Nuestra misión es proporcionar soluciones integrales de sourcing, brokerage de importación/exportación y abastecimiento industrial, con énfasis en control, trazabilidad y mitigación de riesgos.',
    aboutContent3: 'Especializamos en verificación de proveedores, aseguramiento de control de calidad y entrega de ejecución integral para clientes B2B que buscan alianzas confiables en Asia.',
    aboutContent4: 'Con amplia experiencia en operaciones transfronterizas, servimos como su puente estratégico para acceder a capacidades de fabricación y recursos industriales en todo el continente asiático.',

    // Services Section
    servicesTitle: 'Nuestros Servicios',
    service1Title: 'Sourcing Internacional y Verificación de Proveedores',
    service1Desc: 'Identifique y conecte con fabricantes verificados en toda Asia. Nuestro riguroso proceso de verificación asegura confiabilidad y cumplimiento de calidad.',
    service2Title: 'Brokerage de Importación y Exportación',
    service2Desc: 'Guía experta en regulaciones, documentación y procedimientos de importación/exportación. Transacciones transfronterizas fluidas con cumplimiento regulatorio completo.',
    service3Title: 'Auditorías de Fábrica y Control de Calidad',
    service3Desc: 'Auditorías in situ y inspecciones integrales de control de calidad. Verifique capacidades de producción y asegure que se cumplan los estándares del producto.',
    service4Title: 'Coordinación Logística',
    service4Desc: 'Gestión integral de logística incluyendo términos FOB, CIF y DDP. Coordinación de envíos, despacho aduanero y entrega final.',
    service5Title: 'Proyectos Industriales y Promocionales',
    service5Desc: 'Sourcing especializado para proyectos industriales y promocionales a gran escala. Soluciones personalizadas adaptadas a sus requisitos específicos.',
    service6Title: 'Soluciones Personalizadas de Cadena de Suministro',
    service6Desc: 'Estrategias de cadena de suministro diseñadas según sus necesidades comerciales. Optimice costos, reduzca tiempos de entrega y mejore la eficiencia operativa.',

    // Markets Section
    marketsTitle: 'Mercados y Regiones',
    marketsSubtitle: 'Operaciones globales con ejecución regional',
    marketAsia: 'China y Sudeste Asiático',
    marketAsiaDesc: 'Centro principal de fabricación con red de proveedores verificados',
    marketUSA: 'Estados Unidos',
    marketUSADesc: 'Mercado estratégico con sólidas alianzas comerciales B2B',
    marketCentral: 'Centroamérica',
    marketCentralDesc: 'Distribución regional y coordinación logística',
    marketCaribbean: 'Caribe',
    marketCaribbeanDesc: 'Facilitación y apoyo al comercio transfronterizo',
    marketSouth: 'Sudamérica',
    marketSouthDesc: 'Alianzas estratégicas en las principales economías',

    // Why Section
    whyTitle: 'Por Qué Stamina Pengju',
    why1Title: 'Fabricantes Verificados',
    why1Desc: 'Cada proveedor en nuestra red pasa por una verificación rigurosa para asegurar confiabilidad y estándares de calidad.',
    why2Title: 'Mitigación de Riesgos',
    why2Desc: 'Estrategias proactivas de evaluación y mitigación de riesgos protegen su inversión y aseguran operaciones fluidas.',
    why3Title: 'Optimización de Costos',
    why3Desc: 'Aproveche nuestra experiencia y red para lograr precios competitivos sin comprometer la calidad o confiabilidad.',
    why4Title: 'Control de Punta a Punta',
    why4Desc: 'Supervisión completa desde el sourcing hasta la entrega. Mantenga visibilidad y control en toda su cadena de suministro.',
    why5Title: 'Confidencialidad',
    why5Desc: 'Protocolos estrictos de confidencialidad protegen sus intereses comerciales e información propietaria.',
    why6Title: 'Enfoque Exclusivo B2B',
    why6Desc: 'Enfoque exclusivo en operaciones B2B con soporte dedicado para clientes corporativos.',

    // Contact Section
    contactTitle: 'Contáctanos',
    contactSubtitle: 'Póngase en contacto con nuestro equipo para orientación profesional',
    contactName: 'Nombre',
    contactCompany: 'Empresa',
    contactEmail: 'Correo Electrónico',
    contactCountry: 'País',
    contactMessage: 'Mensaje',
    contactSubmit: 'Enviar Mensaje',
    contactSending: 'Enviando...',
    contactSuccess: '¡Mensaje enviado con éxito!',
    contactError: 'Error al enviar el mensaje. Por favor, inténtelo de nuevo.',
    contactNameRequired: 'El nombre es requerido',
    contactEmailRequired: 'El correo es requerido',
    contactMessageRequired: 'El mensaje es requerido',
    contactEmailInvalid: 'Dirección de correo inválida',

    // Footer
    companyName: 'STAMINA PENGJU INTL CORP',
    footerDescription: 'Su puente estratégico para soluciones de comercio internacional, sourcing y brokerage industrial entre Asia y las Américas.',

    // Products Section
    productsTitle: 'Productos que Abastecemos',
    productsSubtitle: 'Productos industriales y comerciales abastecidos de fabricantes verificados en Asia',
    productCategory1: 'Equipos Industriales',
    productCategory2: 'Vehículos',
    productCategory3: 'Componentes Eléctricos',
    productCategory4: 'Soluciones de Empaque',
    productCategory5: 'Pantallas LED',
    productCategory6: 'Laboratorios de Innovación',

    // Process Section
    processTitle: 'Nuestro Proceso de Importación/Exportación',
    processSubtitle: 'Un enfoque transparente y eficiente para el comercio internacional',
    processStep1Title: 'Sourcing y Verificación',
    processStep1Desc: 'Identificamos y verificamos fabricantes que cumplen con sus requisitos de calidad y regulaciones.',
    processStep2Title: 'Aseguramiento de Calidad',
    processStep2Desc: 'Auditorías de fábrica e inspecciones de control de calidad aseguran que los productos cumplan con sus especificaciones.',
    processStep3Title: 'Coordinación Logística',
    processStep3Desc: 'Manejamos envíos, despacho aduanero y documentación para una entrega fluida.',
    processStep4Title: 'Entrega y Soporte',
    processStep4Desc: 'Los productos llegan a su destino con soporte continuo y seguimiento.',

    // Testimonials Section
    testimonialsTitle: 'Lo que Dicen Nuestros Socios',
    testimonialsSubtitle: 'Confiado por empresas en toda América',
    testimonial1: 'Stamina Pengju ha sido fundamental para conectar con fabricantes confiables en Asia y USA. Su proceso de verificación y control de calidad ha asegurado decisiones de abastecimiento confiables, conduciendo a resultados sobresalientes.',
    testimonial1Company: 'Reactive Group, Panamá',
    testimonial2: 'El equipo manejó todo nuestro proceso de importación sin problemas. Desde la selección de proveedores hasta el despacho aduanero, todo fue profesional y eficiente.',
    testimonial2Company: 'CYAN Publicidad, Venezuela',
    testimonial3: 'Su conocimiento de las regulaciones de comercio internacional y atención al detalle nos ha ayudado a navegar requisitos de importación complejos con facilidad.',
    testimonial3Company: 'HC Business Corp, Estados Unidos',

    // Gallery Section
    galleryTitle: 'Nuestras Operaciones e Instalaciones',
    gallerySubtitle: 'Un vistazo a nuestras operaciones globales y procesos de control de calidad',

    // Logistics Section
    logisticsTitle: 'Rutas de Comercio Global y Logística',
    logisticsSubtitle: 'Conexiones marítimas fluidas a través de los principales corredores comerciales',
    logisticsCard1Title: 'Rutas del Océano Pacífico',
    logisticsCard1Desc: 'Conexiones de envío directas desde centros de fabricación asiáticos a las Américas a través del corredor comercial del Pacífico.',
    logisticsCard2Title: 'Acceso por el Canal de Panamá',
    logisticsCard2Desc: 'Enrutamiento estratégico a través del Canal de Panamá que permite flujos comerciales transcontinentales eficientes.',
    logisticsCard3Title: 'Red del Atlántico y Caribe',
    logisticsCard3Desc: 'Red marítima integral que conecta los mercados de la Costa Este, Centroamérica y el Caribe.',
  },
};
