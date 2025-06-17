import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, BadgeCheckIcon, CircleDollarSign, LogInIcon, SearchCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { ArrowRight, Stethoscope } from "lucide-react";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          {/* Grid with two columns: text on the left, image or empty space on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 flex items-center gap-2"
              >
                <BadgeCheckIcon />
                Simplifying Healthcare. Amplifying Care.
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with Doctors <br />
                <span className="gradient-title">anytime, anywhere</span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Seamlessly schedule, consult, and take charge of your health — securely in one place.
              </p>

              {/* Button right below the paragraph */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-emerald-800 text-white hover:bg-emerald-700">
                  <Link href="/onboarding" className="flex items-center gap-2">
                    <ArrowBigRight className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-emerald-700/30 text-white hover:bg-muted/50">
                  <Link href="/doctors" className="flex items-center gap-2">
                    <SearchCheck className="h-4 w-4" />
                    Find Doctors
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side (can add image later) */}
            <div className="relative h-[400px] lg:h-[500px]  rounded-xl overflow-hidden">
              <Image src="/hero-banner.png" alt="Doctor Pic" fill priority className="object-cover md:pt-14 rounded-xl" />
            </div>
          </div>
        </div>
      </section>


      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes healthcare accessible with just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-sky-500/30 hover:border-indigo-800/40 transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="bg-sky-800 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Affordable Healthcare
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Consultation Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation package that fits your healthcare
              needs
            </p>
          </div>

          <div className="mx-auto">
            {/* Clerk Pricing Table */}
            <Pricing />


            {/* Description */}
            <Card className="mt-12 bg-muted/20 border-emerald-900/30">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
                  How Our Credit System Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-sky-500/30 border-indigo-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4">
              Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from patient and doctors who use our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((feature, index) => (
              <Card key={index} className="bg-card border-sky-500/30 hover:border-indigo-800/40 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center mr-4">
                      <span className="text-emerald-400 font-bold"> {feature.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.name}</h4>
                      <p>{feature.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    &quot;{feature.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
              <Card className="bg-gradient-to-r from-emerald-900/50 to-emerald-950/30 border-emerald-800/20">
                <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-6"> 
                    <h2> Ready to take control of your healthcare?</h2>
                    <p className="text-lg text-muted-foreground mb-8">  
                      Join thousands of users who have streamlined their healthcare experience with our platform. Get started today and discover healthcare the way it’s meant to be.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4"> 
                      <Button asChild
                      size = "lg"
                      className="bg-sky-400/30 text-white hover:bg-indigo-700">
                        <Link href="/sign-up">
                        <LogInIcon/>
                        Sign Up
                         </Link>
                      </Button>
                      <Button asChild
                      size="lg"
                      variant="outline"
                      className="hover:bg-muted/80">
                        <Link href="/pricing">
                        <CircleDollarSign/>
                        Pricing
                         </Link>
                      </Button>
                    </div>
                  </div>


                </CardContent>
              </Card>
          </div>
      </section>
    </div>
  );
}
