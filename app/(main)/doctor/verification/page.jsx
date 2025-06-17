import { ClipboardCheck, AlertCircle, XCircle } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";

export default async function VerificationPage() {
    // Get complete user profile
    const user = await getCurrentUser();

    // If already verified, redirect to dashboard
    if (user?.verificationStatus === "VERIFIED") {
        redirect("/doctor");
    }

    const isRejected = user?.verificationStatus === "REJECTED";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <Card className="border-sky-500/20">
                    <CardHeader className="text-center">
                        <div
                            className={`mx-auto p-4 ${isRejected ? "bg-red-900/20" : "bg"
                                } rounded-full mb-4 w-fit`}
                        >
                            {isRejected ? (
                                <XCircle className="h-8 w-8 text-red-400" />
                            ) : (
                                <ClipboardCheck className="h-8 w-8"/>
                            )}
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">
                            {isRejected
                                ? "Verification Declined"
                                : "Verification in Progress"}
                        </CardTitle>
                        <CardDescription className="text-lg">
                            {isRejected
                                ? "Unfortunately, your application needs revision"
                                : "Thank you for submitting your information"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        {isRejected ? (
                            <div className="bg-red-900/10 border border-red-900/20 rounded-lg p-4 mb-6 flex items-start">
                                <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                                <div className="text-muted-foreground text-left">
                                    <p className="mb-2">
                                        After reviewing your application, our administrative team determined that it doesn't currently align with our acceptance criteria. Some typical reasons for this decision include:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 mb-3">
                                        <li>Missing or unclear documentation of your credentials</li>
                                        <li>Not meeting the minimum required professional experience</li>
                                        <li>Service description lacking sufficient detail or clarity</li>
                                    </ul>
                                    <p>
                                        You're welcome to revise your application with additional or updated information and submit it again for consideration.
                                    </p>

                                </div>
                            </div>
                        ) : (
                                <div className="bg-blue-800/10 border border-blue-700/30 text-blue-300 rounded-md px-4 py-3 mb-6 flex items-start">
                                    <AlertCircle className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                                    <p className="text-sm leading-relaxed">
                                        Your profile is currently being evaluated by our administrative team. This process typically takes 1–2 business days. You'll receive an email once your account has been successfully verified.
                                    </p>
                                </div>

                        )}

                        <p className="text-muted-foreground mb-6">
                            {isRejected
                                ? "You can update your doctor profile and resubmit for verification."
                                : "While you wait, you can familiarize yourself with our platform or reach out to our support team if you have any questions."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {isRejected ? (
                                <>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-emerald-900/30"
                                    >
                                        <Link href="/">Return to Home</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="bg-sky-600 hover:bg-indigo-700"
                                    >
                                        <Link href="/doctor/update-profile">Update Profile</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-emerald-900/30"
                                    >
                                        <Link href="/">Return to Home</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="bg-sky-600 hover:bg-indigo-700"
                                    >
                                        <Link href="/contact-support">Contact Support</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}