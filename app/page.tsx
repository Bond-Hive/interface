"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code2, DollarSign, FileText, Send, Globe, MapPin, Users, Building, Award, Mail} from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Smooth scroll function
const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function BondHiveLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Message sent successfully! We\'ll get back to you soon.' });
        reset();
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden">
      {/* Enhanced Background with patterns similar to presentation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700"></div>
        
        {/* Enhanced Flowing wave patterns with better animations */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "rgba(255, 255, 255, 0.15)", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "rgba(255, 255, 255, 0.08)", stopOpacity: 1}} />
              </linearGradient>
              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "rgba(255, 255, 255, 0.12)", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "rgba(255, 255, 255, 0.04)", stopOpacity: 1}} />
              </linearGradient>
              <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "rgba(255, 255, 255, 0.08)", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "rgba(255, 255, 255, 0.02)", stopOpacity: 1}} />
              </linearGradient>
            </defs>
            
            {/* Large flowing curves with enhanced animations */}
            <path
              d="M-200 100 Q300 50 600 150 Q900 250 1400 100 L1400 0 L-200 0 Z"
              fill="url(#wave1)"
              className="animate-pulse"
              style={{
                animationDuration: '8s',
                transformOrigin: 'center',
                animation: 'pulse 8s ease-in-out infinite, float 12s ease-in-out infinite'
              }}
            />
            <path
              d="M-200 300 Q200 200 500 280 Q800 360 1400 220 L1400 100 Q900 250 600 150 Q300 50 -200 100 Z"
              fill="url(#wave2)"
              style={{
                animationDuration: '15s',
                animation: 'pulse 15s ease-in-out infinite reverse, float 18s ease-in-out infinite'
              }}
            />
            <path
              d="M-200 500 Q400 400 700 480 Q1000 560 1400 400 L1400 220 Q800 360 500 280 Q200 200 -200 300 Z"
              fill="url(#wave3)"
              style={{
                animation: 'pulse 20s ease-in-out infinite, float 25s ease-in-out infinite reverse'
              }}
            />
            
            {/* Enhanced Elliptical patterns with rotation animations */}
            <ellipse 
              cx="300" cy="200" rx="150" ry="80" 
              fill="rgba(255, 255, 255, 0.08)" 
              transform="rotate(-20 300 200)"
              style={{
                animation: 'spin 30s linear infinite, pulse 12s ease-in-out infinite'
              }}
            />
            <ellipse 
              cx="900" cy="400" rx="200" ry="100" 
              fill="rgba(255, 255, 255, 0.06)" 
              transform="rotate(15 900 400)"
              style={{
                animation: 'spin 45s linear infinite reverse, pulse 18s ease-in-out infinite'
              }}
            />
            <ellipse 
              cx="600" cy="600" rx="180" ry="90" 
              fill="rgba(255, 255, 255, 0.1)" 
              transform="rotate(-10 600 600)"
              style={{
                animation: 'spin 35s linear infinite, pulse 15s ease-in-out infinite'
              }}
            />
          </svg>
        </div>

        {/* Additional glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-white/5 rounded-full blur-xl" 
               style={{animation: 'pulse 8s ease-in-out infinite, float 12s ease-in-out infinite'}}></div>
          <div className="absolute bottom-[40%] right-[25%] w-24 h-24 bg-white/8 rounded-full blur-2xl" 
               style={{animation: 'pulse 10s ease-in-out infinite 2s, float 15s ease-in-out infinite'}}></div>
          <div className="absolute top-[60%] left-[50%] w-40 h-40 bg-white/3 rounded-full blur-3xl" 
               style={{animation: 'pulse 12s ease-in-out infinite 4s, float 18s ease-in-out infinite'}}></div>
        </div>
      </div>

      {/* Static Navigation - No longer sticky */}
      <nav className="relative z-50 py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Correct BondHive Logo - SVG recreation */}
              <div className="flex items-center space-x-3 group">
                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="drop-shadow-lg">
                    {/* Stacked ovals/hexagons logo */}
                    <ellipse cx="20" cy="12" rx="18" ry="8" fill="rgba(255, 255, 255, 0.9)" />
                    <ellipse cx="20" cy="20" rx="16" ry="7" fill="rgba(255, 255, 255, 0.7)" />
                    <ellipse cx="20" cy="28" rx="18" ry="8" fill="rgba(255, 255, 255, 0.9)" />
                    {/* Inner details */}
                    <ellipse cx="20" cy="12" rx="12" ry="5" fill="rgba(255, 255, 255, 0.5)" />
                    <ellipse cx="20" cy="28" rx="12" ry="5" fill="rgba(255, 255, 255, 0.5)" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">BondHive</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-sm">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#about" className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-sm">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#services" className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-sm">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#contact" className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-sm">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
              Decentralized Strategy.
              <br />
              <span className="text-white/95">Centralized Vision.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-sm">
              Building secure blockchain-based solutions for the future of finance.
              <br className="hidden md:block" />
              <span className="text-white/80">Expert Web3 development and strategic advisory services.</span>
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Company Description Card */}
            <Card className="bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center group-hover:text-orange-600 transition-colors duration-300">
                  <Building className="h-6 w-6 text-orange-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  BondHive Ltd. is a Web3-focused software development and strategic advisory firm. We specialize in
                  building blockchain-based applications, including DeFi platforms and smart contracts for the next generation of finance.
                </p>
              </CardContent>
            </Card>

            {/* Enhanced Team Section */}
            <Card className="bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center group-hover:text-orange-600 transition-colors duration-300">
                  <Users className="h-6 w-6 text-orange-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Leadership Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 hover:from-orange-200 hover:to-orange-100 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      F
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Francesco Filippo Tandoi</h4>
                      <p className="text-gray-600 text-sm">Co-founder / CTO</p>
                      <p className="text-gray-500 text-xs">4 years full-stack engineering, Smart Contract engineer for hedge funds</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 hover:from-orange-200 hover:to-orange-100 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      J
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Jatin Bedi</h4>
                      <p className="text-gray-600 text-sm">Co-founder / CEO</p>
                      <p className="text-gray-500 text-xs">Expertise in systematic DeFi trading, Ex-Investment Banker at Nomura</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Business Details Card */}
          <Card className="bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <MapPin className="h-6 w-6 text-orange-600 mr-3" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Globe className="h-4 w-4 text-orange-600 mr-2" />
                    Incorporation
                  </h4>
                  <p className="text-gray-700">British Virgin Islands</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 text-orange-600 mr-2" />
                    UK Operating Address
                  </h4>
                  <p className="text-gray-700">30 Churchill Place, London, E14 5RE</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 px-6 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="serviceWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: "rgba(255, 255, 255, 0.12)", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "rgba(255, 255, 255, 0.06)", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="serviceWave2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: "rgba(255, 255, 255, 0.08)", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "rgba(255, 255, 255, 0.03)", stopOpacity: 1}} />
                </linearGradient>
              </defs>
              
              {/* Animated wave patterns */}
              <path
                d="M-200 150 Q300 100 600 200 Q900 300 1400 150 L1400 0 L-200 0 Z"
                fill="url(#serviceWave1)"
                style={{animation: 'float 10s ease-in-out infinite, pulse 8s ease-in-out infinite'}}
              />
              <path
                d="M-200 400 Q400 300 700 380 Q1000 460 1400 320 L1400 150 Q900 300 600 200 Q300 100 -200 150 Z"
                fill="url(#serviceWave2)"
                style={{animation: 'float 15s ease-in-out infinite reverse, pulse 12s ease-in-out infinite'}}
              />
              
              {/* Rotating geometric shapes */}
              <ellipse cx="200" cy="250" rx="120" ry="60" fill="rgba(255, 255, 255, 0.06)" 
                       transform="rotate(-15 200 250)"
                       style={{animation: 'spin 25s linear infinite, pulse 10s ease-in-out infinite'}} />
              <ellipse cx="1000" cy="350" rx="180" ry="90" fill="rgba(255, 255, 255, 0.04)" 
                       transform="rotate(20 1000 350)"
                       style={{animation: 'spin 35s linear infinite reverse, pulse 14s ease-in-out infinite'}} />
              <ellipse cx="600" cy="500" rx="150" ry="75" fill="rgba(255, 255, 255, 0.08)" 
                       transform="rotate(-8 600 500)"
                       style={{animation: 'spin 30s linear infinite, pulse 11s ease-in-out infinite'}} />
            </svg>
          </div>
          
          {/* Floating particles for services section */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[25%] left-[10%] w-3 h-3 bg-white/20 rounded-full" 
                 style={{animation: 'float 5s ease-in-out infinite, pulse 3s ease-in-out infinite'}}></div>
            <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/30 rounded-full" 
                 style={{animation: 'float 7s ease-in-out infinite 2s, pulse 4s ease-in-out infinite'}}></div>
            <div className="absolute bottom-[30%] left-[30%] w-4 h-4 bg-white/15 rounded-full" 
                 style={{animation: 'float 6s ease-in-out infinite 1s, pulse 5s ease-in-out infinite'}}></div>
            <div className="absolute top-[40%] right-[45%] w-2.5 h-2.5 bg-white/25 rounded-full" 
                 style={{animation: 'float 8s ease-in-out infinite 3s, pulse 6s ease-in-out infinite'}}></div>
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Code2 className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Blockchain App Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Custom blockchain application development tailored to your business needs with cutting-edge technology
                  and security.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:-rotate-1 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-300">DeFi Platform Design</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Design and development of secure, scalable decentralized finance platforms for the modern digital
                  economy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Smart Contract Consulting</CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Expert consulting and auditing services for smart contract development, security optimization, and
                  best practices.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-white relative">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600 mr-3" />
                Funding Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-gray-700">Currently funded through VC and grant agreements with strategic partners.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white pb-32">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Contact Us</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Information Card */}
            <Card className="bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Get in Touch</CardTitle>
                <CardDescription className="text-gray-600">
                  Ready to start your Web3 journey? Contact us today.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <a href="mailto:info@bondhive.xyz" className="text-gray-900 font-medium text-lg group-hover:text-orange-600 transition-colors duration-300">info@bondhive.xyz</a>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <a href="https://maps.google.com/maps?q=30+Churchill+Place,+London,+E14+5RE" target="_blank" rel="noopener noreferrer">
                    <p className="text-gray-900 font-medium text-lg group-hover:text-orange-600 transition-colors duration-300">30 Churchill Place</p>
                    <p className="text-gray-700">London, E14 5RE</p>
                  </a>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <a href="https://x.com/bondhive" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium text-lg group-hover:text-orange-600 transition-colors duration-300">@bondhive</a>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <a href="https://t.me/bondHive" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium text-lg group-hover:text-orange-600 transition-colors duration-300">t.me/bondHive</a>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Contact Form Card */}
            <Card className="bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll get back to you soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      className="bg-white border-orange-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500 h-12 transition-all duration-300 hover:border-orange-300"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white border-orange-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500 h-12 transition-all duration-300 hover:border-orange-300"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      className="bg-white border-orange-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500 min-h-[120px] transition-all duration-300 hover:border-orange-300"
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${
                      submitMessage.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 h-12 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer - Sticky to bottom, transparent overlay */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 px-6 relative overflow-hidden z-50">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-2 md:mb-0 group">
              <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="drop-shadow-lg">
                  <ellipse cx="20" cy="12" rx="18" ry="8" fill="rgba(255, 255, 255, 0.9)" />
                  <ellipse cx="20" cy="20" rx="16" ry="7" fill="rgba(255, 255, 255, 0.7)" />
                  <ellipse cx="20" cy="28" rx="18" ry="8" fill="rgba(255, 255, 255, 0.9)" />
                  <ellipse cx="20" cy="12" rx="12" ry="5" fill="rgba(255, 255, 255, 0.5)" />
                  <ellipse cx="20" cy="28" rx="12" ry="5" fill="rgba(255, 255, 255, 0.5)" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight drop-shadow-lg">BondHive Ltd.</span>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-xs drop-shadow-sm">
                BondHive Ltd. is a private limited company incorporated in the British Virgin Islands.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
