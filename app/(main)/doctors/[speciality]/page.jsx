import { getDoctorsBySpecialty } from '@/actions/doctors-listing';
import { PageHeader } from '@/components/page-header';
import { redirect } from 'next/navigation';
import React from 'react';
import DoctorCard from '@/components/doctor-card'; // Ensure this exists

const SpecialityPage = async ({ params }) => {
  const { speciality } = params;

  if (!speciality) {
    redirect("/doctors");
  }

  const { doctors, error } = await getDoctorsBySpecialty(speciality);

  if (error) {
    console.error("Error Fetching Doctors");
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={decodeURIComponent(speciality)}
        backLink="/doctors"
        backLabel="All Doctors"
      />

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-2">
            No doctors available at this moment.
          </h3>
          <p className="text-muted-foreground">
            There are no verified doctors available in this specialty at the moment. Please check back later or explore a different specialty.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpecialityPage;
