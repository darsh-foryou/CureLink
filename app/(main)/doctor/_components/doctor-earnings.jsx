"use client";

// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   TrendingUp,
//   Calendar,
//   BarChart3,
//   CreditCard,
//   Loader2,
//   AlertCircle,
//   Coins,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import useFetch from "@/hooks/use-fetch";
// import { requestPayout } from "@/actions/payout";
// import { toast } from "sonner";

// export function DoctorEarnings({ earnings, payouts = [] }) {
//   const [showPayoutDialog, setShowPayoutDialog] = useState(false);
//   const [paypalEmail, setPaypalEmail] = useState("");

//   const {
//     thisMonthEarnings = 0,
//     completedAppointments = 0,
//     averageEarningsPerMonth = 0,
//     availableCredits = 0,
//     availablePayout = 0,
//   } = earnings;

//   const platformFee = availableCredits * 2;
//   const pendingPayout = payouts.find(p => p.status === "PROCESSING");

//   const { loading, data, fn: submitPayoutRequest } = useFetch(requestPayout);

//   useEffect(() => {
//     if (data?.success) {
//       toast.success("Payout request submitted successfully!");
//       setPaypalEmail("");
//       setShowPayoutDialog(false);
//     }
//   }, [data]);

//   const handlePayoutRequest = async (e) => {
//     e.preventDefault();
//     if (!paypalEmail) return toast.error("PayPal email is required");

//     const formData = new FormData();
//     formData.append("paypalEmail", paypalEmail);
//     await submitPayoutRequest(formData);
//   };

//   const StatCard = ({ title, value, icon }) => (
//     <Card className="border-emerald-900/20 bg-muted/10">
//       <CardContent className="p-6 flex items-center justify-between">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <p className="text-3xl font-bold text-white">{value}</p>
//         </div>
//         <div className="bg-emerald-900/20 p-3 rounded-full">{icon}</div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="space-y-6">
//       {/* Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <StatCard
//           title="Available Credits"
//           value={availableCredits}
//           icon={<Coins className="h-6 w-6 text-emerald-400" />}
//         />
//         <StatCard
//           title="This Month"
//           value={`$${thisMonthEarnings.toFixed(2)}`}
//           icon={<TrendingUp className="h-6 w-6 text-emerald-400" />}
//         />
//         <StatCard
//           title="Total Appointments"
//           value={completedAppointments}
//           icon={<Calendar className="h-6 w-6 text-emerald-400" />}
//         />
//         <StatCard
//           title="Avg / Month"
//           value={`$${averageEarningsPerMonth.toFixed(2)}`}
//           icon={<BarChart3 className="h-6 w-6 text-emerald-400" />}
//         />
//       </div>

//       {/* Payout Management */}
//       <Card className="border-emerald-900/20">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold text-white flex items-center">
//             <CreditCard className="h-5 w-5 mr-2 text-emerald-400" />
//             Payout Management
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Status Section */}
//           <div className="bg-muted/20 p-4 rounded-lg border border-emerald-900/20">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-lg font-medium text-white">
//                 Available for Payout
//               </h3>
//               <Badge
//                 className={
//                   pendingPayout
//                     ? "bg-amber-900/20 border-amber-900/30 text-amber-400"
//                     : "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
//                 }
//               >
//                 {pendingPayout ? "PROCESSING" : "AVAILABLE"}
//               </Badge>
//             </div>

//             {/* Payout Info */}
//             {pendingPayout ? (
//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription className="text-sm">
//                   Your payout request is in process. You will receive the
//                   payment once approved by admin.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//                   <div>
//                     <p className="text-muted-foreground">Credits</p>
//                     <p className="text-white font-medium">{availableCredits}</p>
//                   </div>
//                   <div>
//                     <p className="text-muted-foreground">Payout Amount</p>
//                     <p className="text-white font-medium">
//                       ${availablePayout.toFixed(2)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-muted-foreground">Platform Fee</p>
//                     <p className="text-white font-medium">
//                       ${platformFee.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={() => setShowPayoutDialog(true)}
//                   className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
//                 >
//                   Request Payout
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Info Alert */}
//           <Alert>
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription className="text-sm">
//               You earn $8 per credit. A $2 platform fee applies. Payouts are
//               processed via PayPal.
//             </AlertDescription>
//           </Alert>
//         </CardContent>
//       </Card>

//       {/* Dialog */}
//       <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold text-white">
//               Request Payout
//             </DialogTitle>
//             <DialogDescription>
//               Submit a request to withdraw your credits.
//             </DialogDescription>
//           </DialogHeader>

//           <form onSubmit={handlePayoutRequest} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="paypalEmail">PayPal Email</Label>
//               <Input
//                 id="paypalEmail"
//                 type="email"
//                 placeholder="your-email@paypal.com"
//                 value={paypalEmail}
//                 onChange={(e) => setPaypalEmail(e.target.value)}
//                 className="bg-background border-emerald-900/20"
//                 required
//               />
//             </div>

//             <Alert>
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription className="text-sm">
//                 You will receive ${availablePayout.toFixed(
//                   2
//                 )} once processed. {availableCredits} credits will be deducted.
//               </AlertDescription>
//             </Alert>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setShowPayoutDialog(false)}
//                 disabled={loading}
//                 className="border-emerald-900/30"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-emerald-600 hover:bg-emerald-700"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Requesting...
//                   </>
//                 ) : (
//                   "Request Payout"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  Calendar,
  BarChart3,
  CreditCard,
  Loader2,
  AlertCircle,
  Coins,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import { requestPayout } from "@/actions/payout";
import { toast } from "sonner";

export function DoctorEarnings({ earnings, payouts = [] }) {
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");

  const {
    thisMonthEarnings = 0,
    completedAppointments = 0,
    averageEarningsPerMonth = 0,
    availableCredits = 0,
    availablePayout = 0,
  } = earnings;

  const platformFee = availableCredits * 2;
  const pendingPayout = payouts.find((p) => p.status === "PROCESSING");

  const { loading, data, fn: submitPayoutRequest } = useFetch(requestPayout);

  useEffect(() => {
    if (data?.success) {
      toast.success("Payout request submitted successfully!");
      setPaypalEmail("");
      setShowPayoutDialog(false);
    }
  }, [data]);

  const handlePayoutRequest = async (e) => {
    e.preventDefault();
    if (!paypalEmail) return toast.error("PayPal email is required");

    const formData = new FormData();
    formData.append("paypalEmail", paypalEmail);
    await submitPayoutRequest(formData);
  };

  const StatCard = ({ title, value, icon }) => (
    <Card className="border-emerald-900/20 bg-muted/10  shadow-[0_0_10px_rgba(5,150,105,0.2)]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="bg-emerald-900/20 p-3 rounded-full">{icon}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Available Credits"
          value={availableCredits}
          icon={<Coins className="h-6 w-6 text-emerald-400" />}
        />
        <StatCard
          title="This Month"
          value={`$${thisMonthEarnings.toFixed(2)}`}
          icon={<TrendingUp className="h-6 w-6 text-emerald-400" />}
        />
        <StatCard
          title="Total Appointments"
          value={completedAppointments}
          icon={<Calendar className="h-6 w-6 text-emerald-400" />}
        />
        <StatCard
          title="Avg / Month"
          value={`$${averageEarningsPerMonth.toFixed(2)}`}
          icon={<BarChart3 className="h-6 w-6 text-emerald-400" />}
        />
      </div>

      {/* Payout Management */}
      <Card className="border-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-emerald-400" />
            Payout Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/20 p-4 rounded-lg border border-emerald-900/20">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-white">Available for Payout</h3>
              <Badge
                className={
                  pendingPayout
                    ? "bg-amber-900/20 border-amber-900/30 text-amber-400"
                    : "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
                }
              >
                {pendingPayout ? "PROCESSING" : "AVAILABLE"}
              </Badge>
            </div>

            {/* Payout Info */}
            {pendingPayout ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Your payout request is in process. You will receive the payment once approved by admin.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Credits</p>
                    <p className="text-white font-medium">{availableCredits}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payout Amount</p>
                    <p className="text-white font-medium">${availablePayout.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Platform Fee</p>
                    <p className="text-white font-medium">${platformFee.toFixed(2)}</p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowPayoutDialog(true)}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                >
                  Request Payout
                </Button>
              </>
            )}
          </div>

          {/* Payout History */}
          {payouts.filter((p) => p.status === "PROCESSED").length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Recent Payouts</h3>
              <div className="space-y-3">
                {payouts
                  .filter((p) => p.status === "PROCESSED")
                  .map((payout) => (
                    <div
                      key={payout.id}
                      className="bg-muted/20 p-3 rounded-lg border border-sky-900/20 text-sm text-white"
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          <span className="font-medium">Amount:</span> ${payout.netAmount.toFixed(2)} ({payout.credits} credits)
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {format(new Date(payout.createdAt), "dd MMM yyyy")}
                        </p>
                      </div>
                      <p className="text-muted-foreground text-xs mt-1">
                        Sent to: {payout.paypalEmail}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              You earn $8 per credit. A $2 platform fee applies. Payouts are processed via PayPal.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Request Payout</DialogTitle>
            <DialogDescription>Submit a request to withdraw your credits.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayoutRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paypalEmail">PayPal Email</Label>
              <Input
                id="paypalEmail"
                type="email"
                placeholder="your-email@paypal.com"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="bg-background border-emerald-900/20"
                required
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                You will receive ${availablePayout.toFixed(2)} once processed. {availableCredits} credits will be deducted.
              </AlertDescription>
            </Alert>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPayoutDialog(false)}
                disabled={loading}
                className="border-emerald-900/30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Requesting...
                  </>
                ) : (
                  "Request Payout"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
