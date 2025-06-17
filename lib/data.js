import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// Updated JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Set Up Your Profile",
    description:
      "Get started by creating your profile — unlock tailored care, recommendations, and seamless access to services.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Schedule Appointments",
    description:
      "Easily find available slots and book visits with trusted doctors that match your needs and timing.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Consult Over Video",
    description:
      "Skip the waiting room — meet with licensed doctors via secure, high-definition video, from wherever you are.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Flexible Credit System",
    description:
      "Choose a credit plan that suits you best — pay once and use credits when and how you need them.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Certified Professionals",
    description:
      "Every provider on our platform is verified, licensed, and committed to delivering excellent care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Access Medical Records",
    description:
      "Keep all your health records, doctor notes, and past visits organized and within reach — anytime.",
  },
];

// Updated JSON data for testimonials
export const testimonials = [
  {
    initials: "SP",
    name: "Sarah P.",
    role: "Patient",
    quote:
      "Being able to speak to a doctor from home was a game-changer. No travel, no stress — just fast, expert care.",
  },
  {
    initials: "DR",
    name: "Dr. Robert M.",
    role: "Cardiologist",
    quote:
      "This platform has transformed how I work. I can now serve more patients efficiently and offer care beyond clinic walls.",
  },
  {
    initials: "JT",
    name: "James T.",
    role: "Patient",
    quote:
      "The credit system is smart and family-friendly. I got a plan that works for us, and scheduling care is now super simple.",
  },
];

// Updated JSON data for credit system benefits
export const creditBenefits = [
  "Every consultation costs just <strong class='text-emerald-400'>2 credits</strong> — no hidden fees or time limits",
  "Your credits <strong class='text-emerald-400'>never expire</strong> — use them whenever care is needed",
  "Get <strong class='text-emerald-400'>new credits each month</strong> with a flexible subscription plan",
  "Easily pause or cancel your plan <strong class='text-emerald-400'>anytime</strong> — no lock-ins, no hassle",
];
