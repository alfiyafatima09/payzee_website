"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Filter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const inter = Inter({ subsets: ["latin"] })

export default function TransactionsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [regionFilter, setRegionFilter] = useState("all")

  // Sample data for transactions
  const transactions = [
    {
      id: "TXN-2023-001",
      senderId: "SND-001",
      receiverId: "RCV-001",
      amount: "₹5,000",
      region: "North",
      date: "12 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-002",
      senderId: "SND-002",
      receiverId: "RCV-002",
      amount: "₹2,500",
      region: "South",
      date: "15 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-003",
      senderId: "SND-003",
      receiverId: "RCV-003",
      amount: "₹3,200",
      region: "East",
      date: "18 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-004",
      senderId: "SND-004",
      receiverId: "RCV-004",
      amount: "₹1,800",
      region: "West",
      date: "20 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-005",
      senderId: "SND-005",
      receiverId: "RCV-005",
      amount: "₹2,100",
      region: "Central",
      date: "22 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-006",
      senderId: "SND-006",
      receiverId: "RCV-006",
      amount: "₹1,500",
      region: "North",
      date: "25 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-007",
      senderId: "SND-007",
      receiverId: "RCV-007",
      amount: "₹6,400",
      region: "South",
      date: "28 Jan 2023",
      status: "Success",
    },
  ]

  // Filter transactions based on region
  const filteredTransactions =
    regionFilter === "all" ? transactions : transactions.filter((transaction) => transaction.region === regionFilter)

  // Get unique regions for filter
  const regions = [...new Set(transactions.map((transaction) => transaction.region))]

  const sidebarItems = [
    { name: "Dashboard", icon: Home, active: false, href: "/" },
    { name: "Schemes", icon: BarChart3, active: false, href: "/schemes" },
    { name: "Beneficiaries", icon: Users, active: false, href: "/beneficiaries" },
    { name: "Vendors", icon: Store, active: false, href: "/vendors" },
    { name: "Transactions", icon: CreditCard, active: true, href: "/transactions" },
    { name: "Settings", icon: Settings, active: false, href: "/settings" },
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

        {/* Transactions content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold">Transactions</h1>
            {/* No buttons for transactions page as it's read-only */}
          </div>

          {/* Search and filter section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Transactions..."
                className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Transactions table */}
          <div className="border rounded-lg shadow-sm overflow-hidden mb-6">
            <Table>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow>
                  <TableHead className="font-semibold text-xs uppercase">Transaction ID</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Sender ID</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Receiver ID</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Amount</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Region</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Transaction Date</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-[#EEEEEE] transition-colors">
                    <TableCell className="font-medium py-4">{transaction.id}</TableCell>
                    <TableCell className="py-4">{transaction.senderId}</TableCell>
                    <TableCell className="py-4">{transaction.receiverId}</TableCell>
                    <TableCell className="py-4">{transaction.amount}</TableCell>
                    <TableCell className="py-4">{transaction.region}</TableCell>
                    <TableCell className="py-4">{transaction.date}</TableCell>
                    <TableCell className="py-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  )
}
