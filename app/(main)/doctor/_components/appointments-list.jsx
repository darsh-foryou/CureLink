"use client";

import { useEffect } from "react";
import { getDoctorAppointments } from "@/actions/doctor";
import { AppointmentCard } from "@/components/appointment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";

export default function DoctorAppointmentsList() {
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointments = data?.appointments || [];

  return (
    <Card className="border-emerald-900/30 bg-gradient-to-b from-emerald-900/10 to-transparent shadow-[0_0_10px_rgba(5,150,105,0.2)]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
          Your Upcoming Appointments
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground animate-pulse">
              Fetching your schedule...
            </p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="DOCTOR"
                refetchAppointments={fetchAppointments}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-indigo-400/40 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Appointments Yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your calendar is currently empty. Set your availability to start receiving bookings from patients.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
