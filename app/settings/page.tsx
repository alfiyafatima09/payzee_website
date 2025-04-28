"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  Lock,
  Menu,
  Moon,
  Save,
  SettingsIcon,
  Store,
  Sun,
  User,
  Users,
  X,
} from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const inter = Inter({ subsets: ["latin"] })

export default function SettingsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const sidebarItems = [
    { name: "Dashboard", icon: Home, active: false, href: "/" },
    { name: "Schemes", icon: BarChart3, active: false, href: "/schemes" },
    { name: "Beneficiaries", icon: Users, active: false, href: "/beneficiaries" },
    { name: "Vendors", icon: Store, active: false, href: "/vendors" },
    { name: "Transactions", icon: CreditCard, active: false, href: "/transactions" },
    { name: "Settings", icon: SettingsIcon, active: true, href: "/settings" },
  ]

  return (
    <div className={`${inter.className} min-h-screen bg-white flex`}>
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-20 flex h-full flex-col border-r bg-white transition-all duration-300 ${
          isCollapsed ? "w-[70px]" : "w-[240px]"
        } hidden md:flex`}
      >
        <div className="flex h-14 items-center border-b px-3">
          <div className={`flex items-center gap-2 ${isCollapsed ? "justify-center w-full" : ""}`}>
            {!isCollapsed && <span className="font-semibold text-lg">PayZee</span>}
            {isCollapsed && <span className="font-bold text-lg">PZ</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
            onClick={() => setIsCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Collapse sidebar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`ml-auto ${!isCollapsed ? "hidden" : ""}`}
            onClick={() => setIsCollapsed(false)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Expand sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    item.active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isCollapsed ? "mx-auto" : ""}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && <span className="sr-only">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[240px]">
          <div className="flex h-14 items-center border-b px-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">PayZee</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMobileOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="grid gap-1 px-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      item.active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div
        className={`flex-1 md:ml-[${isCollapsed ? "70px" : "240px"}] transition-all duration-300`}
        style={{ marginLeft: isCollapsed ? "70px" : "240px" }}
      >
        {/* Top navbar */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center gap-2 md:hidden">
            <span className="font-semibold text-lg">PayZee</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-black text-white">
                3
              </Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="Admin avatar"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Settings content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>

          {/* Settings tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          width={100}
                          height={100}
                          className="rounded-full"
                          alt="Profile avatar"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                        >
                          <User className="h-4 w-4" />
                          <span className="sr-only">Change avatar</span>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Upload a new avatar</p>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" defaultValue="Admin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" defaultValue="User" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          defaultValue="admin@payzee.gov.in"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="Administrator" defaultValue="System Administrator" disabled />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Password Settings */}
            <TabsContent value="password">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                    <Save className="mr-2 h-4 w-4" /> Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications in the dashboard</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="space-y-4">
                      <Label>Notification Types</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new-beneficiary" defaultChecked />
                          <Label htmlFor="new-beneficiary">New Beneficiary Registration</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new-vendor" defaultChecked />
                          <Label htmlFor="new-vendor">New Vendor Registration</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="transaction" defaultChecked />
                          <Label htmlFor="transaction">Transaction Alerts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="system" defaultChecked />
                          <Label htmlFor="system">System Updates</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme Mode</Label>
                      <p className="text-sm text-gray-500">Toggle between light and dark mode</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={isDarkMode ? "outline" : "default"}
                        size="sm"
                        className={!isDarkMode ? "bg-[#2563EB]" : ""}
                        onClick={() => setIsDarkMode(false)}
                      >
                        <Sun className="mr-2 h-4 w-4" /> Light
                      </Button>
                      <Button
                        variant={!isDarkMode ? "outline" : "default"}
                        size="sm"
                        className={isDarkMode ? "bg-[#2563EB]" : ""}
                        onClick={() => setIsDarkMode(true)}
                      >
                        <Moon className="mr-2 h-4 w-4" /> Dark
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-logout">Auto Logout</Label>
                        <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                      </div>
                      <Switch id="auto-logout" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Enable additional security</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                    <Save className="mr-2 h-4 w-4" /> Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
