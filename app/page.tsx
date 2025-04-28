"use client"

import { useState, useEffect } from 'react'
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
  Wallet,
} from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'
import { motion } from "framer-motion"

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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const inter = Inter({ subsets: ["latin"] })

// Define the type for scheme data
interface SchemeData {
  name: string;
  value: number;
  tags: string[];
  color: string;
}

// Define types for chart data
interface MonthlyData {
  name: string;
  amount: number;
}

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Sample data for charts
  const monthlyData: MonthlyData[] = [
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

  // Sample data with tags
  const schemeData: SchemeData[] = [
    { name: 'Rural Credit Scheme', value: 35, tags: ['Farmers', 'Rural'], color: '#0088FE' },
    { name: 'Women Entrepreneurship Fund', value: 20, tags: ['Women Entrepreneurs', 'Business'], color: '#00C49F' },
    { name: 'Student Scholarship Program', value: 15, tags: ['Students', 'Education'], color: '#FFBB28' },
    { name: 'Girl Child Education Support', value: 10, tags: ['Girls', 'Education'], color: '#FF8042' },
    { name: 'Senior Pension Fund', value: 12, tags: ['Senior Citizens', 'Welfare'], color: '#8884d8' },
    { name: 'Agricultural Innovation Grant', value: 8, tags: ['Farmers', 'Innovation'], color: '#82ca9d' },
  ];

  // Extract all unique tags from the data
  const allTags = Array.from(
    new Set(schemeData.flatMap(scheme => scheme.tags))
  ).sort();

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
    { name: "Dashboard", icon: Home, active: true, path: "/" },
    { name: "Schemes", icon: BarChart3, active: false, path: "/schemes" },
    { name: "Beneficiaries", icon: Users, active: false, path: "/beneficiaries" },
    { name: "Vendors", icon: Store, active: false, path: "/vendors" },
    { name: "Transactions", icon: CreditCard, active: false, path: "/transactions" },
    { name: "Settings", icon: Settings, active: false, path: "/settings" },
  ]

  // Dropdown options for time range
  const timeRanges = [
    { label: "Last 30 days", value: "30d" },
    { label: "Last 6 months", value: "6m" },
    { label: "Last 1 year", value: "1y" },
  ]

  // Dummy data for each time range
  const fundsDataByRange = {
    "30d": { labels: ["Week 1", "Week 2", "Week 3", "Week 4"], data: [1.2, 1.5, 2.0, 1.8] },
    "6m": { labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"], data: [1.2, 1.5, 2.0, 1.8, 2.5, 3.0] },
    "1y": { labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"], data: [1.0, 1.3, 1.7, 2.1, 2.6, 3.2] },
  }

  const pastelColors = [
    "#A5D8FF", // blue
    "#B9FBC0", // mint
    "#D0BFFF", // purple
    "#FFD6A5", // orange
    "#FFB5E8", // pink
    "#C1F0F6", // teal
  ]

  const schemeFilters = [
    { label: "Girls Scheme", key: "girls", color: pastelColors[4] },
    { label: "Elderly Support", key: "elderly", color: pastelColors[2] },
    { label: "Farmers Welfare", key: "farmers", color: pastelColors[1] },
    { label: "Health Scheme", key: "health", color: pastelColors[3] },
  ]

  const donutDataByFilter = {
    girls: { value: 45, color: pastelColors[4] },
    farmers: { value: 30, color: pastelColors[1] },
    health: { value: 25, color: pastelColors[3] },
    elderly: { value: 20, color: pastelColors[2] },
  }

  const [selectedRange, setSelectedRange] = useState("6m")
  const [activeFilters, setActiveFilters] = useState(["girls", "farmers", "health"])

  // Prepare line chart data
  const fundsLineData = {
    labels: fundsDataByRange[selectedRange].labels,
    datasets: [
      {
        label: "Funds Disbursed (Cr)",
        data: fundsDataByRange[selectedRange].data,
        fill: true,
        borderColor: pastelColors[0],
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const {ctx: c, chartArea} = chart;
          if (!chartArea) return null;
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(165,216,255,0.5)");
          gradient.addColorStop(1, "rgba(255,255,255,0.2)");
          return gradient;
        },
        tension: 0.5,
        pointBackgroundColor: pastelColors[0],
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  }

  const fundsLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `₹${ctx.raw} Cr`
        },
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#2563EB',
        borderColor: '#A5D8FF',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { family: 'Inter', size: 13 } },
      },
      y: {
        grid: { color: '#F3F4F6' },
        ticks: {
          color: '#6B7280',
          font: { family: 'Inter', size: 13 },
          callback: (tickValue: number) => `₹${tickValue}Cr`,
        },
      },
    },
    animation: { duration: 1200, easing: 'easeOutQuart' },
  }

  // Donut chart data
  const filteredDonut = activeFilters.map(f => donutDataByFilter[f])
  const donutChartData = {
    labels: activeFilters.map(f => schemeFilters.find(s => s.key === f)?.label),
    datasets: [
      {
        data: filteredDonut.map(d => d.value),
        backgroundColor: filteredDonut.map(d => d.color),
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  }
  const donutChartOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.label}: ${ctx.raw}%`,
        },
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#2563EB',
        borderColor: '#FFD6A5',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
      },
    },
    animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' },
  }
  const totalDistributed = filteredDonut.reduce((sum, d) => sum + d.value, 0)

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
                  href={item.path}
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
                    href={item.path}
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
            {/* Card 1: Monthly Funds Disbursed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              whileHover={{ boxShadow: '0 8px 32px 0 rgba(37,99,235,0.15)', scale: 1.02 }}
              className="relative rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-6 transition-all duration-300 hover:shadow-blue-200"
              style={{ minHeight: 370 }}
            >
              <Wallet className="absolute top-5 right-5 text-blue-400/80 w-7 h-7" />
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg text-gray-800">Monthly Funds Disbursed</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-xs px-3 py-1 rounded-lg border-gray-200 bg-white/70 hover:bg-blue-50">
                      {timeRanges.find(r => r.value === selectedRange)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {timeRanges.map(range => (
                      <DropdownMenuItem key={range.value} onClick={() => setSelectedRange(range.value)}>
                        {range.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-[240px] w-full flex items-center">
                <Line data={fundsLineData} options={fundsLineOptions} />
              </div>
            </motion.div>

            {/* Card 2: Funds Distributed by Scheme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              whileHover={{ boxShadow: '0 8px 32px 0 rgba(255,181,232,0.15)', scale: 1.02 }}
              className="relative rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-6 transition-all duration-300 hover:shadow-pink-200"
              style={{ minHeight: 370 }}
            >
              <Wallet className="absolute top-5 right-5 text-pink-400/80 w-7 h-7" />
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg text-gray-800">Funds Distributed by Scheme</h2>
                <div className="flex gap-2 flex-wrap">
                  {schemeFilters.map(filter => (
                    activeFilters.includes(filter.key) ? (
                      <Badge
                        key={filter.key}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-opacity-80"
                        style={{ background: filter.color, color: '#333' }}
                      >
                        {filter.label}
                        <button
                          className="ml-1 text-gray-500 hover:text-gray-800 focus:outline-none"
                          onClick={() => setActiveFilters(activeFilters.filter(f => f !== filter.key))}
                          aria-label={`Remove ${filter.label}`}
                          type="button"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : (
                      <Badge
                        key={filter.key}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer border border-dashed border-gray-300 bg-white/60 hover:bg-opacity-90"
                        style={{ color: filter.color }}
                        onClick={() => setActiveFilters([...activeFilters, filter.key])}
                      >
                        {filter.label}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
              <div className="relative h-[240px] w-full flex items-center justify-center">
                <Pie data={donutChartData} options={donutChartOptions} />
                {/* Center text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-500 mb-1">Total Distributed</span>
                  <span className="font-bold text-2xl text-gray-800">₹{totalDistributed}Cr</span>
                </div>
              </div>
            </motion.div>
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
