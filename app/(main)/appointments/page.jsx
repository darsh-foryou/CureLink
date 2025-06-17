// import { getPatientAppointments } from "@/actions/patient";
// import { AppointmentCard } from "@/components/appointment-card";
// import { PageHeader } from "@/components/page-header";
// import { Calendar } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/actions/onboarding";

// export default async function PatientAppointmentsPage() {
//   const user = await getCurrentUser();

//   if (!user || user.role !== "PATIENT") {
//     redirect("/onboarding");
//   }

//   const { appointments, error } = await getPatientAppointments();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <PageHeader
//         icon={<Calendar />}
//         title="My Appointments"
//         backLink="/doctors"
//         backLabel="Find Doctors"
//       />

//       <Card className="border-sky-700 bg-gradient-to-b from-sky-900/10 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.3)]">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold text-white flex items-center">
//             <Calendar className="h-5 w-5 mr-2 text-sky-400" />
//             Your Scheduled Appointments
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {error ? (
//             <div className="text-center py-8">
//               <p className="text-red-400">Error: {error}</p>
//             </div>
//           ) : appointments?.length > 0 ? (
//             <div className="space-y-4">
//               {appointments.map((appointment) => (
//                 <AppointmentCard
//                   key={appointment.id}
//                   appointment={appointment}
//                   userRole="PATIENT"
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <Calendar className="h-12 w-12 mx-auto text-sky-300/40 mb-3" />
//               <h3 className="text-xl font-medium text-white mb-2">
//                 No appointments scheduled
//               </h3>
//               <p className="text-muted-foreground">
//                 You don&apos;t have any appointments scheduled yet. Browse our
//                 doctors and book your first consultation.
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { appointments, error } = await getPatientAppointments();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        icon={<Calendar className="text-sky-500" />}
        title="My Appointments"
        backLink="/doctors"
        backLabel="Find Doctors"
      />

      <Card className="border border-sky-700 bg-[#0f172a]/80 shadow-[0_0_12px_rgba(14,165,233,0.3)] rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-sky-400" />
            Your Scheduled Appointments
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : appointments?.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="PATIENT"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto text-sky-300/40 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Appointments Yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven&apos;t scheduled any appointments yet. Browse our
                doctors and book your first consultation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
