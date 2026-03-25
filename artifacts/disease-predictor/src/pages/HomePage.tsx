import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, HeartPulse, Brain, ArrowRight, ClipboardList, Zap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background/80 backdrop-blur-3xl relative z-0">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                  Advanced Machine Learning
                </div>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight leading-tight">
                  AI-Powered <br /> <span className="text-primary">Disease Detection</span>
                </h1>
                <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                  Leverage the power of machine learning to predict risks for Diabetes, Heart Disease, and Parkinson's. Fast, secure, and reliable early diagnostics.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/diabetes">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/20">
                    Get Started <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-background/50" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border/50 bg-card/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/50">
              <div className="text-center md:px-8 py-4 md:py-0">
                <div className="text-4xl font-display font-bold text-primary mb-2">3</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Disease Models</div>
              </div>
              <div className="text-center md:px-8 py-4 md:py-0">
                <div className="text-4xl font-display font-bold text-primary mb-2">95%+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Model Accuracy</div>
              </div>
              <div className="text-center md:px-8 py-4 md:py-0">
                <div className="text-4xl font-display font-bold text-primary mb-2">Instant</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Analysis Results</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Diagnostic Capabilities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our suite of specialized AI models allows for early risk assessment across multiple vital health systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Diabetes Prediction", desc: "Analyze glucose, insulin, and other vital metrics to assess diabetes risk factors.", icon: Activity, href: "/diabetes" },
                { title: "Heart Disease", desc: "Evaluate cardiovascular health markers to predict the likelihood of heart conditions.", icon: HeartPulse, href: "/heart" },
                { title: "Parkinson's", desc: "Utilize advanced voice measurement analysis to detect early signs of Parkinson's.", icon: Brain, href: "/parkinsons" }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <feature.icon size={24} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-6">
                      <Link href={feature.href}>
                        <Button variant="outline" className="w-full group">
                          Analyze Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
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
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get accurate predictions in three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border/50 -z-10" />
              
              {[
                { title: "1. Enter Data", desc: "Input the required medical metrics and patient data into our secure forms.", icon: ClipboardList },
                { title: "2. Run Analysis", desc: "Our machine learning models process the data instantly.", icon: Zap },
                { title: "3. Get Results", desc: "Receive immediate predictions and risk assessments.", icon: ShieldCheck }
              ].map((step, i) => (
                <div key={step.title} className="text-center relative">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-background border-2 border-primary/20 shadow-lg flex items-center justify-center text-primary mb-6 relative z-10">
                    <step.icon size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
