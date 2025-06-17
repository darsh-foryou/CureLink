import { Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Doctor Dashboard - CureLink",
  description: "Stay on top of your availability and bookings",
};

export default async function DoctorDashboardLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader icon={<Stethoscope />} title="Doctor Dashboard" />

      {children}
    </div>
  );
}