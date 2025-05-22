"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { ArrowRight, CreditCard, Settings, User } from "lucide-react"

export default function AccountPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  const getPlanDetails = () => {
    switch (user?.plan) {
      case "enterprise":
        return {
          name: "Enterprise",
          price: "$99/month",
          nextBilling: "June 15, 2023",
          features: [
            "Unlimited videos",
            "4K video quality",
            "All templates + exclusive ones",
            "No duration limits",
            "Custom branding",
            "Priority rendering",
            "Advanced editing tools",
            "Commercial usage rights",
          ],
        }
      case "single":
        return {
          name: "Single User",
          price: "$29/month",
          nextBilling: "June 15, 2023",
          features: [
            "30 videos per month",
            "1080p video quality",
            "All templates",
            "60-second maximum duration",
            "Custom branding",
            "Priority rendering",
          ],
        }
      default:
        return {
          name: "Free",
          price: "$0/month",
          nextBilling: "N/A",
          features: ["3 videos per month", "720p video quality", "Basic templates", "15-second maximum duration"],
        }
    }
  }

  const planDetails = getPlanDetails()

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-navy">Account Settings</h1>
              <p className="text-muted-foreground">Manage your account and subscription</p>
            </div>
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/10" onClick={logout}>
              Sign Out
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Profile Information</CardTitle>
                  <CardDescription>View and update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="font-medium text-navy">{user?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium text-navy">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                    <p className="font-medium text-navy">{planDetails.name} Plan</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-logo-blue hover:bg-logo-blue-dark text-white">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Current Plan</CardTitle>
                  <CardDescription>You are currently on the {planDetails.name} plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-navy">{planDetails.name}</h3>
                        <p className="text-sm text-muted-foreground">{planDetails.price}</p>
                      </div>
                      {user?.plan !== "enterprise" && (
                        <Button
                          className="bg-gradient-to-r from-muse-red to-muse-orange hover:from-muse-red/90 hover:to-muse-orange/90 text-white"
                          asChild
                        >
                          <Link href="/pricing">Upgrade</Link>
                        </Button>
                      )}
                    </div>
                    {user?.plan !== "free" && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Next billing date: {planDetails.nextBilling}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-navy mb-2">Plan Features</h3>
                    <ul className="space-y-2">
                      {planDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <svg
                            className="h-4 w-4 text-logo-green"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {user?.plan === "free" && (
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-semibold text-navy mb-2">Upgrade for More Features</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Unlock longer videos, higher quality, and more features by upgrading your plan.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-logo-blue to-logo-green hover:from-logo-blue/90 hover:to-logo-green/90 text-white"
                        asChild
                      >
                        <Link href="/pricing" className="inline-flex items-center gap-1">
                          View Pricing <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
                {user?.plan !== "free" && (
                  <CardFooter>
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                      Cancel Subscription
                    </Button>
                  </CardFooter>
                )}
              </Card>

              {user?.plan !== "free" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-navy">Payment Method</CardTitle>
                    <CardDescription>Manage your payment information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="rounded-md border p-2">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-navy">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-logo-blue hover:bg-logo-blue-dark text-white">Update Payment Method</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive updates about your account and videos</p>
                    </div>
                    <Button variant="outline" className="border-navy text-navy hover:bg-navy/10">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">Password</h3>
                      <p className="text-sm text-muted-foreground">Update your password</p>
                    </div>
                    <Button variant="outline" className="border-navy text-navy hover:bg-navy/10">
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" className="border-navy text-navy hover:bg-navy/10">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
