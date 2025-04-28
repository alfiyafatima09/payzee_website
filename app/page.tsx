"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  Menu,
  Search,
  Settings,
  Store,
  Users,
  X,
} from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const inter = Inter({ subsets: ["latin"] })

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Sample data for charts
  const monthlyData = [
    { name: "Jan", amount: 4000 },
    { name: "Feb", amount: 3000 },
    { name: "Mar", amount: 5000 },
    { name: "Apr", amount: 4500 },
    { name: "May", amount: 6000 },
    { name: "Jun", amount: 5500 },
    { name: "Jul", amount: 7000 },
    { name: "Aug", amount: 8000 },
    { name: "Sep", amount: 7500 },
    { name: "Oct", amount: 9000 },
    { name: "Nov", amount: 8500 },
    { name: "Dec", amount: 10000 },
  ]

  const schemeData = [
    { name: "Direct Benefit Transfer", value: 45 },
    { name: "PM Kisan", value: 25 },
    { name: "MGNREGA", value: 15 },
    { name: "Other Schemes", value: 15 },
  ]

  const COLORS = ["#2563EB", "#4B5563", "#9CA3AF", "#D1D5DB"]

  const beneficiaries = [
    { name: "Rajesh Kumar", state: "Uttar Pradesh", gender: "Male", aadhaar: "1234" },
    { name: "Priya Singh", state: "Bihar", gender: "Female", aadhaar: "5678" },
    { name: "Amit Patel", state: "Gujarat", gender: "Male", aadhaar: "9012" },
    { name: "Sunita Sharma", state: "Rajasthan", gender: "Female", aadhaar: "3456" },
    { name: "Vikram Mehta", state: "Maharashtra", gender: "Male", aadhaar: "7890" },
  ]

  const vendors = [
    { name: "Agro Solutions Ltd.", businessType: "Agriculture", kycStatus: "Verified" },
    { name: "Rural Supplies Co.", businessType: "General Store", kycStatus: "Pending" },
    { name: "Tech Village Pvt. Ltd.", businessType: "Technology", kycStatus: "Verified" },
    { name: "Health First Services", businessType: "Healthcare", kycStatus: "Verified" },
    { name: "Edu Materials Inc.", businessType: "Education", kycStatus: "Pending" },
  ]

  const sidebarItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Schemes", icon: BarChart3, active: false },
    { name: "Beneficiaries", icon: Users, active: false },
    { name: "Vendors", icon: Store, active: false },
    { name: "Transactions", icon: CreditCard, active: false },
    { name: "Settings", icon: Settings, active: false },
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
                  href="#"
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
                    href="#"
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
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] pl-8 md:w-[240px] lg:w-[320px] bg-gray-50 border-gray-200"
                />
              </div>
            </form>
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

        {/* Dashboard content */}
        <main className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">Generate Report</Button>
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Funds Disbursed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,245.89 Cr</div>
                <p className="text-xs text-gray-500 mt-1">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Beneficiaries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4M</div>
                <p className="text-xs text-gray-500 mt-1">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48.5K</div>
                <p className="text-xs text-gray-500 mt-1">+3.7% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.8M</div>
                <p className="text-xs text-gray-500 mt-1">+8.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Funds Disbursed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value / 1000}K`}
                      />
                      <Tooltip
                        formatter={(value) => [`₹${value} Cr`, "Amount"]}
                        contentStyle={{
                          borderRadius: "6px",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#2563EB"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Funds Distributed by Scheme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={schemeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {schemeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{
                          borderRadius: "6px",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={8}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Beneficiaries Added</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Aadhaar Last 4</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {beneficiaries.map((beneficiary) => (
                      <TableRow key={beneficiary.name}>
                        <TableCell className="font-medium">{beneficiary.name}</TableCell>
                        <TableCell>{beneficiary.state}</TableCell>
                        <TableCell>{beneficiary.gender}</TableCell>
                        <TableCell>XXXX XXXX {beneficiary.aadhaar}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Vendor Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor Name</TableHead>
                      <TableHead>Business Type</TableHead>
                      <TableHead>KYC Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => (
                      <TableRow key={vendor.name}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.businessType}</TableCell>
                        <TableCell>
                          <Badge
                            variant={vendor.kycStatus === "Verified" ? "default" : "outline"}
                            className={vendor.kycStatus === "Verified" ? "bg-black text-white" : "bg-white text-black"}
                          >
                            {vendor.kycStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
