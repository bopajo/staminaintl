'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Menu, X, Globe2, Shield, DollarSign, Zap, Lock, Building2, Mail, Phone, CheckCircle2, ArrowRight, Package, Factory, Cpu, Truck, BarChart3, Users, Monitor, Languages, Lightbulb } from 'lucide-react';

export default function HomePage() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({ title: t.contactNameRequired, variant: 'destructive' });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: t.contactEmailRequired, variant: 'destructive' });
      return;
    }
    if (!formData.message.trim()) {
      toast({ title: t.contactMessageRequired, variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: t.contactSuccess });
        setFormData({ name: '', company: '', email: '', country: '', message: '' });
      } else {
        toast({ title: t.contactError, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: t.contactError, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'products', label: t.navProducts },
    { id: 'process', label: t.navProcess },
    { id: 'logistics', label: t.logisticsTitle },
    { id: 'testimonials', label: t.navTestimonials },
    { id: 'markets', label: t.navMarkets },
    { id: 'why', label: t.navWhy },
    { id: 'contact', label: t.navContact },
  ];

  const services = [
    { icon: <Globe2 className="h-6 w-6" />, title: t.service1Title, desc: t.service1Desc },
    { icon: <Building2 className="h-6 w-6" />, title: t.service2Title, desc: t.service2Desc },
    { icon: <Shield className="h-6 w-6" />, title: t.service3Title, desc: t.service3Desc },
    { icon: <Truck className="h-6 w-6" />, title: t.service4Title, desc: t.service4Desc },
    { icon: <Factory className="h-6 w-6" />, title: t.service5Title, desc: t.service5Desc },
    { icon: <BarChart3 className="h-6 w-6" />, title: t.service6Title, desc: t.service6Desc },
  ];

  const products = [
    { icon: <Factory className="h-12 w-12" />, title: t.productCategory1, image: '/generated-images/product-industrial.png' },
    { icon: <Truck className="h-12 w-12" />, title: t.productCategory2, image: '/generated-images/product-vehicles-1.png' },
    { icon: <Cpu className="h-12 w-12" />, title: t.productCategory3, image: '/generated-images/product-electrical.png' },
    { icon: <Package className="h-12 w-12" />, title: t.productCategory4, image: '/generated-images/product-packaging.png' },
    { icon: <Monitor className="h-12 w-12" />, title: t.productCategory5, image: '/generated-images/product-led-displays.png' },
    { icon: <Lightbulb className="h-12 w-12" />, title: t.productCategory6, image: '/generated-images/product-innovation-labs.png' },
  ];

  const processSteps = [
    { icon: <Globe2 className="h-10 w-10" />, title: t.processStep1Title, desc: t.processStep1Desc, image: '/generated-images/process-verification.png' },
    { icon: <Shield className="h-10 w-10" />, title: t.processStep2Title, desc: t.processStep2Desc, image: '/generated-images/process-quality.png' },
    { icon: <Truck className="h-10 w-10" />, title: t.processStep3Title, desc: t.processStep3Desc, image: '/generated-images/process-logistics.png' },
    { icon: <CheckCircle2 className="h-10 w-10" />, title: t.processStep4Title, desc: t.processStep4Desc, image: '/generated-images/process-delivery.png' },
  ];

  const testimonials = [
    {
      quote: t.testimonial1,
      company: t.testimonial1Company,
      initials: 'GC'
    },
    {
      quote: t.testimonial2,
      company: t.testimonial2Company,
      initials: 'ID'
    },
    {
      quote: t.testimonial3,
      company: t.testimonial3Company,
      initials: 'MF'
    },
  ];



  const markets = [
    { name: t.marketAsia, desc: t.marketAsiaDesc },
    { name: t.marketUSA, desc: t.marketUSADesc },
    { name: t.marketCentral, desc: t.marketCentralDesc },
    { name: t.marketCaribbean, desc: t.marketCaribbeanDesc },
    { name: t.marketSouth, desc: t.marketSouthDesc },
  ];

  const whyItems = [
    { icon: <Shield className="h-6 w-6" />, title: t.why1Title, desc: t.why1Desc },
    { icon: <Shield className="h-6 w-6" />, title: t.why2Title, desc: t.why2Desc },
    { icon: <DollarSign className="h-6 w-6" />, title: t.why3Title, desc: t.why3Desc },
    { icon: <Zap className="h-6 w-6" />, title: t.why4Title, desc: t.why4Desc },
    { icon: <Lock className="h-6 w-6" />, title: t.why5Title, desc: t.why5Desc },
    { icon: <Building2 className="h-6 w-6" />, title: t.why6Title, desc: t.why6Desc },
  ];

  const logisticsCards = [
    { title: t.logisticsCard1Title, desc: t.logisticsCard1Desc, image: '/generated-images/pacific-port-vessels.png' },
    { title: t.logisticsCard2Title, desc: t.logisticsCard2Desc, image: '/generated-images/panama-canal-locks.png' },
    { title: t.logisticsCard3Title, desc: t.logisticsCard3Desc, image: '/generated-images/caribbean-port.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-orange-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="relative flex items-center group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-transparent to-transparent rounded-lg backdrop-blur-sm">
                &nbsp;
              </div>
              <div className="relative z-10 flex items-center space-x-4 pr-6">
                <img
                  src="/upload/Stamina logo wb.png"
                  alt="STAMINA PENGJU"
                  className="h-16 w-auto"
                />
                <span className="text-white font-bold text-lg tracking-wide hidden md:inline-block">
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-3 pl-4 border-l border-white/30">
                <button
                  onClick={() => setLanguage('en')}
                  className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 border-2 ${language === 'en'
                      ? 'bg-amber-500 border-amber-600 shadow-lg'
                      : 'bg-white border-amber-500 hover:shadow-md'
                    }`}
                  title="English"
                >
                  <span className="text-xl">🇺🇸</span>
                  <span className={`text-sm font-semibold ${language === 'en' ? 'text-white' : 'text-slate-700'}`}>
                    EN
                  </span>
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 border-2 ${language === 'es'
                      ? 'bg-amber-500 border-amber-600 shadow-lg'
                      : 'bg-white border-amber-500 hover:shadow-md'
                    }`}
                  title="Español"
                >
                  <span className="text-xl">🇪🇸</span>
                  <span className={`text-sm font-semibold ${language === 'es' ? 'text-white' : 'text-slate-700'}`}>
                    ES
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-amber-400"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-black to-orange-950">
            <div className="px-4 py-6 space-y-4">
              <div className="text-center mb-6">
                <img
                  src="/upload/Stamina logo wb.png"
                  alt="STAMINA PENGJU"
                  className="h-14 w-auto"
                />
                <p className="text-white font-bold text-lg tracking-wide mt-3">
                </p>
              </div>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-white hover:text-amber-400 transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-6 border-t border-white/30 space-y-3">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`group relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg transition-all duration-300 border-2 ${language === 'en'
                      ? 'bg-amber-500 border-amber-600 shadow-lg'
                      : 'bg-white border-amber-500 hover:shadow-md'
                    }`}
                  title="English"
                >
                  <span className="text-2xl">🇺🇸</span>
                  <span className={`text-base font-semibold ${language === 'en' ? 'text-white' : 'text-slate-700'}`}>
                    English
                  </span>
                </button>
                <button
                  onClick={() => {
                    setLanguage('es');
                    setMobileMenuOpen(false);
                  }}
                  className={`group relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg transition-all duration-300 border-2 ${language === 'es'
                      ? 'bg-amber-500 border-amber-600 shadow-lg'
                      : 'bg-white border-amber-500 hover:shadow-md'
                    }`}
                  title="Español"
                >
                  <span className="text-2xl">🇪🇸</span>
                  <span className={`text-base font-semibold ${language === 'es' ? 'text-white' : 'text-slate-700'}`}>
                    Español
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="home" className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-orange-600 via-orange-700 to-black">
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="/generated-images/hero-banner.png"
              alt="International Trade"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {t.heroHeadline}
              </h1>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                {t.heroSubheadline}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-amber-50 text-black px-10 py-7 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-amber-500 hover:border-amber-600"
              >
                <a href="#contact" className="flex items-center gap-2">
                  {t.heroCta}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <img
                src="/upload/Stamina logo wb.png"
                alt="STAMINA PENGJU"
                className="h-40 w-auto mx-auto"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-16 text-center">
              {t.aboutTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  {t.aboutContent1}
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {t.aboutContent2}
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  {t.aboutContent3}
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {t.aboutContent4}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.servicesTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              Comprehensive solutions for your international trade needs
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="text-amber-600 mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-slate-900 text-xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.productsTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              {t.productsSubtitle}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group">
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-amber-600">
                        {product.icon}
                      </div>
                      <CardTitle className="text-slate-900 text-lg">
                        {product.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.processTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              {t.processSubtitle}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full">
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-amber-600 shrink-0">
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white text-sm font-bold">
                              {index + 1}
                            </span>
                            <CardTitle className="text-slate-900 text-lg">
                              {step.title}
                            </CardTitle>
                          </div>
                          <CardDescription className="text-slate-600 text-sm leading-relaxed">
                            {step.desc}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-amber-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics Section */}
        <section id="logistics" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.logisticsTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              {t.logisticsSubtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {logisticsCards.map((card, index) => (
                <Card key={index} className="border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-slate-900 text-xl">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {card.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.testimonialsTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              {t.testimonialsSubtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 bg-slate-50 h-full">
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md">
                        {testimonial.initials}
                      </div>
                      <Users className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <Separator className="bg-slate-200 mb-4" />
                    <p className="text-slate-900 font-semibold">
                      {testimonial.company}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Markets Section */}
        <section id="markets" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.marketsTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              {t.marketsSubtitle}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {markets.map((market, index) => (
                <Card key={index} className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-slate-900 text-xl">
                      {market.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 text-base">
                      {market.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section id="why" className="py-24 bg-gradient-to-br from-slate-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-16 text-center">
              {t.whyTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyItems.map((item, index) => (
                <Card key={index} className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-amber-600">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-slate-900 text-lg mb-2">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 text-sm leading-relaxed">
                          {item.desc}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {t.contactTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-2xl mx-auto">
              {t.contactSubtitle}
            </p>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <Card className="border border-slate-200 shadow-lg bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-slate-900 text-2xl">
                    {t.contactTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">
                        {t.contactName} *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
                        placeholder={t.contactName}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-700">
                        {t.contactCompany}
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
                        placeholder={t.contactCompany}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">
                        {t.contactEmail} *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
                        placeholder={t.contactEmail}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-slate-700">
                        {t.contactCountry}
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
                        placeholder={t.contactCountry}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700">
                        {t.contactMessage} *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500 resize-none"
                        placeholder={t.contactMessage}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-7 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      {isSubmitting ? t.contactSending : t.contactSubmit}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="border border-slate-200 shadow-lg bg-white">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Building2 className="h-10 w-10 text-amber-600" />
                      <div>
                        <CardTitle className="text-slate-900 text-xl">
                          {t.companyName}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-amber-600 mt-1" />
                      <div>
                        <p className="text-slate-600 text-sm">{t.contactEmail}</p>
                        <p className="text-slate-900 font-medium">BORIS@STAMINAINTL.COM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Phone className="h-5 w-5 text-amber-600 mt-1" />
                      <div>
                        <p className="text-slate-600 text-sm">Phone</p>
                        <p className="text-slate-900 font-medium">+1 (786) 846-4883</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-amber-600">
                  <CardContent className="pt-6">
                    <p className="text-white text-lg leading-relaxed">
                      {t.footerDescription}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src="/upload/Stamina logo wb.png"
                alt="STAMINA PENGJU"
                className="h-10 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm mb-2">
                {t.footerDescription}
              </p>
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} {t.companyName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
