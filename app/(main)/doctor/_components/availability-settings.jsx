"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { setAvailabilitySlots } from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function AvailabilitySettings({ slots }) {
  const [showForm, setShowForm] = useState(false);
  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { startTime: "", endTime: "" } });

  const createLocalDateFromTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };

  const onSubmit = async (data) => {
    if (loading) return;

    const start = createLocalDateFromTime(data.startTime);
    const end = createLocalDateFromTime(data.endTime);
    if (start >= end) return toast.error("End time must be after start time");

    const formData = new FormData();
    formData.append("startTime", start.toISOString());
    formData.append("endTime", end.toISOString());

    await submitSlots(formData);
  };

  useEffect(() => {
    if (data?.success) {
      setShowForm(false);
      toast.success("Availability updated successfully");
    }
  }, [data]);

  const formatTimeString = (dateString) =>
    format(new Date(dateString), "h:mm a");

  return (
    <Card className="border-emerald-900/30 bg-gradient-to-b from-emerald-900/10 to-transparent shadow-[0_0_10px_rgba(5,150,105,0.2)]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Clock className="h-5 w-5 mr-2 text-emerald-400" />
          Availability Settings
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Set your daily availability for patient appointments
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!showForm ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Current Availability</h3>
              {slots.length === 0 ? (
                <p className="text-muted-foreground">
                  You haven't set any availability slots yet. Add your time to begin.
                </p>
              ) : (
                <div className="space-y-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center p-3 rounded-md bg-emerald-900/10 border border-emerald-700/30"
                    >
                      <div className="bg-emerald-800/20 p-2 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {formatTimeString(slot.startTime)} - {formatTimeString(slot.endTime)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {slot.appointment ? "Booked" : "Available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Set Availability Time
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border border-emerald-800/20 rounded-md">
            <h3 className="text-lg font-medium text-white mb-2">Set Daily Availability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-white">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  {...register("startTime", { required: "Start time is required" })}
                  className="bg-background border-emerald-800/20"
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">{errors.startTime.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-white">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  {...register("endTime", { required: "End time is required" })}
                  className="bg-background border-emerald-800/20"
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="border-emerald-800/30 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Availability"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 p-4 bg-emerald-900/10 border border-emerald-800/20 rounded-md">
          <h4 className="font-medium text-white mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-emerald-400" />
            How Availability Works
          </h4>
          <p className="text-muted-foreground text-sm">
            Patients can only book during the time slots you configure. This daily availability applies across the week and can be adjusted anytime. Booked slots won’t be affected retroactively.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
