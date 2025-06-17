import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export default function DoctorCard({ doctor }) {
    return (
        <Card className="border border-sky-800/40 bg-gradient-to-b from-sky-900/10 to-transparent shadow-[0_0_8px_rgba(14,165,233,0.3)] hover:shadow-[0_0_12px_rgba(14,165,233,0.45)] transition-shadow duration-200">
            <CardContent className="p-6 flex gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-sky-800/40 flex items-center justify-center shrink-0">
                    {doctor.imageUrl ? (
                        <img
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <User className="h-6 w-6 text-sky-300" />
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 flex-1 text-left">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{doctor.name}</h3>
                        {doctor.verificationStatus === "VERIFIED" && (
                            <Badge className="bg-emerald-700/20 border-emerald-600/40 text-emerald-300 flex items-center gap-1">
                                <Star className="h-4 w-4 fill-emerald-300/70 stroke-emerald-300" />
                                Verified
                            </Badge>
                        )}
                    </div>

                    <p className="text-sky-300 text-sm">
                        {doctor.specialty} · {doctor.experience} yrs&nbsp;experience
                    </p>

                    {doctor.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {doctor.description}
                        </p>
                    )}
                    <Button
                        asChild
                        className="w-full mt-3 bg-sky-800/20 hover:bg-sky-800/40 border border-sky-700/30 text-sky-300 hover:text-white transition-all shadow-[0_0_8px_rgba(14,165,233,0.2)] hover:shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                    >
                        <Link href={`/doctors/${doctor.specialty}/${doctor.id}`} className="flex items-center justify-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Appointment
                        </Link>
                    </Button>

                </div>
            </CardContent>
        </Card>
    );
}
