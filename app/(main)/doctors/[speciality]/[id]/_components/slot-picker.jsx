"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function SlotPicker({ days, onSelectSlot }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const firstDayWithSlots =
    days.find((day) => day.slots.length > 0)?.date || days[0]?.date;
  const [activeTab, setActiveTab] = useState(firstDayWithSlots);

  const handleSlotSelect = (slot) => setSelectedSlot(slot);

  const confirmSelection = () => {
    if (selectedSlot) onSelectSlot(selectedSlot);
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto border border-indigo-800/30 bg-gradient-to-b from-indigo-900/10 to-transparent">
          {days.map((day) => (
            <TabsTrigger
              key={day.date}
              value={day.date}
              disabled={day.slots.length === 0}
              className={`rounded-md px-4 py-2 text-white font-medium ${
                day.slots.length === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-indigo-900/30 transition"
              }`}
            >
              <div className="flex gap-2 items-center">
                <span className="text-indigo-300">
                  {format(new Date(day.date), "MMM d")}
                </span>
                <span className="text-muted-foreground">
                  ({format(new Date(day.date), "EEE")})
                </span>
                {day.slots.length > 0 && (
                  <span className="ml-2 bg-indigo-900/30 text-indigo-300 text-xs px-2 py-0.5 rounded">
                    {day.slots.length}
                  </span>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.date} value={day.date} className="pt-4">
            {day.slots.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No available slots for this day.
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white mb-2">
                  {day.displayDate}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {day.slots.map((slot) => {
                    const isSelected =
                      selectedSlot?.startTime === slot.startTime;
                    return (
                      <Card
                        key={slot.startTime}
                        onClick={() => handleSlotSelect(slot)}
                        className={`cursor-pointer transition-all shadow-[0_0_6px_rgba(99,102,241,0.2)] ${
                          isSelected
                            ? "bg-indigo-900/40 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                            : "hover:border-indigo-600/40 border-indigo-800/20"
                        }`}
                      >
                        <CardContent className="p-3 flex items-center">
                          <Clock
                            className={`h-4 w-4 mr-2 ${
                              isSelected
                                ? "text-emerald-400"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={
                              isSelected
                                ? "text-white font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {format(new Date(slot.startTime), "h:mm a")}
                          </span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={confirmSelection}
          disabled={!selectedSlot}
          className="bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
