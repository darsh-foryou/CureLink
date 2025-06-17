"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function VideoCall({ sessionId, token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const sessionRef = useRef(null);
  const publisherRef = useRef(null);

  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (!window.OT) {
      toast.error("Failed to load Vonage Video API");
      setIsLoading(false);
      return;
    }
    initializeSession();
  };

  const initializeSession = () => {
    if (!appId || !sessionId || !token) {
      toast.error("Missing required video call parameters");
      router.push("/appointments");
      return;
    }

    try {
      sessionRef.current = window.OT.initSession(appId, sessionId);

      sessionRef.current.on("streamCreated", (event) => {
        sessionRef.current.subscribe(
          event.stream,
          "subscriber",
          {
            insertMode: "append",
            width: "100%",
            height: "100%",
          },
          (error) => {
            if (error) {
              toast.error("Error connecting to participant's stream");
            }
          }
        );
      });

      sessionRef.current.on("sessionConnected", () => {
        setIsConnected(true);
        setIsLoading(false);

        publisherRef.current = window.OT.initPublisher(
          "publisher",
          {
            insertMode: "replace",
            width: "100%",
            height: "100%",
            publishAudio: isAudioEnabled,
            publishVideo: isVideoEnabled,
          },
          (error) => {
            if (error) {
              toast.error("Error initializing camera/mic");
            }
          }
        );
      });

      sessionRef.current.on("sessionDisconnected", () => {
        setIsConnected(false);
      });

      sessionRef.current.connect(token, (error) => {
        if (error) {
          toast.error("Error connecting to session");
        } else {
          if (publisherRef.current) {
            sessionRef.current.publish(publisherRef.current, (error) => {
              if (error) toast.error("Error publishing stream");
            });
          }
        }
      });
    } catch (error) {
      toast.error("Failed to initialize video call");
      setIsLoading(false);
    }
  };

  const toggleVideo = () => {
    if (publisherRef.current) {
      publisherRef.current.publishVideo(!isVideoEnabled);
      setIsVideoEnabled((prev) => !prev);
    }
  };

  const toggleAudio = () => {
    if (publisherRef.current) {
      publisherRef.current.publishAudio(!isAudioEnabled);
      setIsAudioEnabled((prev) => !prev);
    }
  };

  const endCall = () => {
    if (publisherRef.current) {
      publisherRef.current.destroy();
      publisherRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.disconnect();
      sessionRef.current = null;
    }
    router.push("/appointments");
  };

  useEffect(() => {
    return () => {
      if (publisherRef.current) publisherRef.current.destroy();
      if (sessionRef.current) sessionRef.current.disconnect();
    };
  }, []);

  if (!sessionId || !token || !appId) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Invalid Video Call</h1>
        <p className="text-muted-foreground mb-6">
          Missing required parameters for the video call.
        </p>
        <Button onClick={() => router.push("/appointments")} className="bg-sky-600 hover:bg-sky-700">
          Back to Appointments
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js"
        onLoad={handleScriptLoad}
        onError={() => {
          toast.error("Failed to load video call script");
          setIsLoading(false);
        }}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Video Consultation</h1>
          <p className={`text-sm font-medium ${isConnected ? "text-sky-400" : isLoading ? "text-muted-foreground" : "text-red-400"}`}>
            {isConnected ? "Connected" : isLoading ? "Connecting..." : "Connection failed"}
          </p>
        </div>

        {isLoading && !scriptLoaded ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-sky-400 animate-spin mb-4" />
            <p className="text-white text-lg">Loading video session...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-sky-900/10 border border-sky-700 rounded-xl shadow-md overflow-hidden">
                <div className="bg-sky-800/20 px-4 py-2 text-sky-400 font-semibold text-sm flex items-center gap-2">
                  <User className="h-4 w-4" /> You
                </div>
                <div id="publisher" className="w-full h-[300px] md:h-[400px] bg-black/30 backdrop-blur-md">
                  {!scriptLoaded && (
                    <div className="flex items-center justify-center h-full">
                      <User className="h-12 w-12 text-sky-400" />
                    </div>
                  )}
                </div>
              </Card>

              <Card className="bg-sky-900/10 border border-sky-700 rounded-xl shadow-md overflow-hidden">
                <div className="bg-sky-800/20 px-4 py-2 text-sky-400 font-semibold text-sm flex items-center gap-2">
                  <User className="h-4 w-4" /> Participant
                </div>
                <div id="subscriber" className="w-full h-[300px] md:h-[400px] bg-black/30 backdrop-blur-md">
                  {!isConnected && (
                    <div className="flex items-center justify-center h-full">
                      <User className="h-12 w-12 text-sky-400" />
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <Button variant="ghost" size="icon" onClick={toggleVideo} className={`h-14 w-14 rounded-full border-2 ${isVideoEnabled ? "border-sky-700 text-sky-400" : "bg-red-900/20 border-red-700 text-red-400"}`}>
                {isVideoEnabled ? <Video /> : <VideoOff />}
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleAudio} className={`h-14 w-14 rounded-full border-2 ${isAudioEnabled ? "border-sky-700 text-sky-400" : "bg-red-900/20 border-red-700 text-red-400"}`}>
                {isAudioEnabled ? <Mic /> : <MicOff />}
              </Button>

              <Button onClick={endCall} size="icon" className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white">
                <PhoneOff />
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>{isVideoEnabled ? "Camera on" : "Camera off"} • {isAudioEnabled ? "Microphone on" : "Microphone off"}</p>
              <p className="mt-1">Click the red button to end the consultation when finished</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
