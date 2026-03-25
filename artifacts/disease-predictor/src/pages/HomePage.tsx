import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, HeartPulse, Brain, ArrowRight, ClipboardList, Zap, ShieldCheck, CheckCircle, Stethoscope, Lock, UserCheck, Shield } from "lucide-react";

function AnimatedCounter({ value, text }: { value: string, text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="text-center md:px-8 py-6 md:py-0">
      <motion.div 
        className="text-4xl md:text-5xl font-display font-bold text-teal-400 mb-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {value}
      </motion.div>
      <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">{text}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative z-0">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
          {/* Glowing Orbs */}
          <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-teal-500/20 rounded-full blur-3xl opacity-30 mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[10%] right-[15%] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl opacity-30 mix-blend-screen animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-[40%] right-[40%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl opacity-20 mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
          
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-slate-800/80 border border-teal-500/30 text-teal-300 text-sm font-medium backdrop-blur-sm shadow-xl shadow-teal-900/20">
                  <span className="relative flex h-2 w-2 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  Clinical-Grade AI Diagnostics
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.1]">
                  Intelligent <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                    Disease Detection
                  </span>
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
                  Predict risks for Diabetes, Heart Disease, and Parkinson's instantly using advanced machine learning models trained on robust clinical data.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/diabetes">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-[0_0_40px_rgba(20,184,166,0.4)] transition-all hover:scale-105 border-0 rounded-xl">
                    Get Started <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm rounded-xl transition-all" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  Learn More
                </Button>
                <Link href="/diabetes">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-8 text-lg font-medium text-teal-300 hover:text-teal-200 hover:bg-teal-900/30 rounded-xl transition-all">
                    View Demo
                  </Button>
                </Link>
              </motion.div>

              {/* Floating Result Card Preview */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mx-auto mt-16 max-w-md"
              >
                <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-50" />
                  <div className="bg-emerald-500/20 p-3 rounded-xl relative z-10">
                    <CheckCircle className="text-emerald-400" size={28} />
                  </div>
                  <div className="text-left relative z-10 flex-1">
                    <h3 className="text-white font-bold text-lg">Negative Result</h3>
                    <p className="text-slate-400 text-sm">Patient shows no indicators of Diabetes</p>
                  </div>
                  <div className="relative z-10 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-400 block">Confidence</span>
                    <span className="text-teal-400 font-bold text-sm">98.4%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-900 border-y border-slate-800 py-16 relative z-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <AnimatedCounter value="3" text="Diseases" />
              <AnimatedCounter value="95%+" text="Accuracy" />
              <AnimatedCounter value="0.2s" text="Instant Results" />
              <AnimatedCounter value="768+" text="Data Points" />
              <AnimatedCounter value="22" text="Voice Features" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 relative inline-block">
                Diagnostic Capabilities
                <div className="absolute -bottom-4 left-1/4 right-1/4 h-1.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent rounded-full opacity-70" />
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-8">
                Our suite of specialized AI models allows for early risk assessment across multiple vital health systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Diabetes Prediction", 
                  desc: "Analyze glucose, insulin, and other vital metrics to assess diabetes risk factors with high precision.", 
                  icon: Activity, 
                  href: "/diabetes",
                  color: "amber",
                  badge: "8 input features",
                  gradient: "from-amber-500/20 to-amber-500/5",
                  iconColor: "text-amber-500",
                  borderColor: "border-t-amber-500"
                },
                { 
                  title: "Heart Disease", 
                  desc: "Evaluate cardiovascular health markers, ECG results, and exercise metrics to predict heart conditions.", 
                  icon: HeartPulse, 
                  href: "/heart",
                  color: "rose",
                  badge: "13 input features",
                  gradient: "from-rose-500/20 to-rose-500/5",
                  iconColor: "text-rose-500",
                  borderColor: "border-t-rose-500"
                },
                { 
                  title: "Parkinson's", 
                  desc: "Utilize advanced acoustic measurement analysis from sustained vowel phonations to detect early signs.", 
                  icon: Brain, 
                  href: "/parkinsons",
                  color: "violet",
                  badge: "22 voice features",
                  gradient: "from-violet-500/20 to-violet-500/5",
                  iconColor: "text-violet-500",
                  borderColor: "border-t-violet-500"
                }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className={`h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm border-t-4 ${feature.borderColor} overflow-hidden group`}>
                    <CardHeader className="relative pb-2">
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-background transition-colors">
                          {feature.badge}
                        </span>
                      </div>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center ${feature.iconColor} mb-6 shadow-inner`}>
                        <feature.icon size={32} />
                      </div>
                      <CardTitle className="text-2xl font-display">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto flex flex-col flex-1">
                      <CardDescription className="text-base leading-relaxed mb-8 flex-1">
                        {feature.desc}
                      </CardDescription>
                      <Link href={feature.href} className="mt-auto">
                        <Button variant="outline" className="w-full group/btn h-12 text-base font-medium rounded-xl border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                          Analyze Now <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 bg-muted/40 border-y border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get accurate predictions in four simple steps without needing an account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-border border-dashed border-t-2 border-primary/20 -z-10" />
              
              {[
                { title: "Choose Disease", desc: "Select the specific model you want to use.", icon: Stethoscope },
                { title: "Enter Data", desc: "Input patient metrics and measurements.", icon: ClipboardList },
                { title: "Run Analysis", desc: "AI models process data instantly.", icon: Zap },
                { title: "Get Results", desc: "Receive immediate risk assessments.", icon: ShieldCheck }
              ].map((step, i) => (
                <div key={step.title} className="text-center relative group">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-card border-2 border-primary/20 shadow-xl shadow-primary/5 flex items-center justify-center text-primary mb-6 relative z-10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                    <step.icon size={36} />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center border-4 border-background shadow-sm">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center md:items-start text-center md:text-left border-l-0 md:border-l-4 border-teal-500 pl-0 md:pl-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-2">
                  <Database size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold">Real Medical Data</h3>
                <p className="text-slate-400">Models trained on validated datasets from global health organizations for maximum reliability.</p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left border-l-0 md:border-l-4 border-cyan-500 pl-0 md:pl-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                  <UserCheck size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold">No Registration</h3>
                <p className="text-slate-400">Access our diagnostic tools instantly without creating an account or providing personal info.</p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left border-l-0 md:border-l-4 border-emerald-500 pl-0 md:pl-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                  <Shield size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold">Privacy First</h3>
                <p className="text-slate-400">Your health data is processed in real-time and never stored on our servers. Total confidentiality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-teal-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('/images/medical-abstract-bg.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Start Your Health Assessment
            </h2>
            <p className="text-xl text-teal-100/80 mb-10 max-w-2xl mx-auto">
              Get instant AI-powered insights. Fast, secure, and entirely free to use.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/diabetes">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-white text-teal-900 hover:bg-slate-100 rounded-xl shadow-xl shadow-black/20">
                  Try It Now
                </Button>
              </Link>
              <a href="https://github.com/Ajay-308/multiple-disease-predictor" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-bold border-white/30 text-white hover:bg-white/10 rounded-xl">
                  View Source Code
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Missing icon import fallback
function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
