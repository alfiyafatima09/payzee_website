"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Edit,
  Filter,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  Store,
  Trash2,
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

export default function SchemesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample data for schemes
  const schemes = [
    {
      id: 1,
      name: "Direct Benefit Transfer",
      launchDate: "12 Jan 2022",
      targetGroup: "Below Poverty Line",
      fundAllocated: "₹5,000 Cr",
      status: "Active",
    },
    {
      id: 2,
      name: "PM Kisan",
      launchDate: "24 Feb 2021",
      targetGroup: "Farmers",
      fundAllocated: "₹2,500 Cr",
      status: "Active",
    },
    {
      id: 3,
      name: "MGNREGA",
      launchDate: "05 Apr 2020",
      targetGroup: "Rural Workers",
      fundAllocated: "₹3,200 Cr",
      status: "Active",
    },
    {
      id: 4,
      name: "Skill India",
      launchDate: "15 Jul 2021",
      targetGroup: "Youth",
      fundAllocated: "₹1,800 Cr",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Digital India",
      launchDate: "01 Aug 2022",
      targetGroup: "All Citizens",
      fundAllocated: "₹2,100 Cr",
      status: "Active",
    },
    {
      id: 6,
      name: "Startup India",
      launchDate: "16 Jan 2023",
      targetGroup: "Entrepreneurs",
      fundAllocated: "₹1,500 Cr",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Ayushman Bharat",
      launchDate: "23 Sep 2021",
      targetGroup: "Low Income Families",
      fundAllocated: "₹6,400 Cr",
      status: "Active",
    },
    {
      id: 8,
      name: "Pradhan Mantri Awas Yojana",
      launchDate: "25 Jun 2015",
      targetGroup: "Urban Poor",
      fundAllocated: "₹4,500 Cr",
      status: "Active",
    },
    {
      id: 9,
      name: "Swachh Bharat Mission",
      launchDate: "02 Oct 2014",
      targetGroup: "All Citizens",
      fundAllocated: "₹3,800 Cr",
      status: "Active",
    },
    {
      id: 10,
      name: "Ujjwala Yojana",
      launchDate: "01 May 2016",
      targetGroup: "Women",
      fundAllocated: "₹2,200 Cr",
      status: "Active",
    },
    {
      id: 11,
      name: "Atal Pension Yojana",
      launchDate: "09 May 2015",
      targetGroup: "Unorganized Sector",
      fundAllocated: "₹1,900 Cr",
      status: "Active",
    },
    {
      id: 12,
      name: "Pradhan Mantri Kisan Samman Nidhi",
      launchDate: "24 Feb 2019",
      targetGroup: "Small Farmers",
      fundAllocated: "₹7,500 Cr",
      status: "Active",
    },
    {
      id: 13,
      name: "National Health Mission",
      launchDate: "12 Apr 2013",
      targetGroup: "Rural Population",
      fundAllocated: "₹3,100 Cr",
      status: "Active",
    },
    {
      id: 14,
      name: "Pradhan Mantri Gram Sadak Yojana",
      launchDate: "25 Dec 2000",
      targetGroup: "Rural Areas",
      fundAllocated: "₹2,800 Cr",
      status: "Active",
    },
    {
      id: 15,
      name: "National Rural Livelihood Mission",
      launchDate: "03 Jun 2011",
      targetGroup: "Rural Women",
      fundAllocated: "₹2,400 Cr",
      status: "Active",
    }
  ]

  // Filter schemes based on status
  const filteredSchemes =
    statusFilter === "all"
      ? schemes
      : schemes.filter((scheme) => scheme.status.toLowerCase() === statusFilter.toLowerCase())

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchemes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSchemes = filteredSchemes.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      if (startPage > 1) {
        pageNumbers.push(1)
        if (startPage > 2) {
          pageNumbers.push('...')
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...')
        }
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const sidebarItems = [
    { name: "Dashboard", icon: Home, active: false, href: "/" },
    { name: "Schemes", icon: BarChart3, active: true, href: "/schemes" },
    { name: "Beneficiaries", icon: Users, active: false, href: "/beneficiaries" },
    { name: "Vendors", icon: Store, active: false, href: "/vendors" },
    { name: "Transactions", icon: CreditCard, active: false, href: "/transactions" },
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

        {/* Schemes content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading and buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold">Schemes</h1>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                <Plus className="mr-2 h-4 w-4" /> Add Scheme
              </Button>
              <Button variant="outline" className="border-[#2563EB] text-[#2563EB]">
                <Edit className="mr-2 h-4 w-4" /> Edit Scheme
              </Button>
              <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Scheme
              </Button>
            </div>
          </div>

          {/* Search and filter section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Schemes..."
                className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Schemes table */}
          <div className="border rounded-lg shadow-sm overflow-hidden mb-6">
            <Table>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow>
                  <TableHead className="font-semibold text-xs uppercase">Scheme Name</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Launch Date</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Target Group</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Fund Allocated</TableHead>
                  <TableHead className="font-semibold text-xs uppercase">Status</TableHead>
                  <TableHead className="font-semibold text-xs uppercase text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSchemes.map((scheme) => (
                  <TableRow key={scheme.id} className="hover:bg-[#EEEEEE] transition-colors">
                    <TableCell className="font-medium py-4">{scheme.name}</TableCell>
                    <TableCell className="py-4">{scheme.launchDate}</TableCell>
                    <TableCell className="py-4">{scheme.targetGroup}</TableCell>
                    <TableCell className="py-4">{scheme.fundAllocated}</TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="outline"
                        className={`${
                          scheme.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {scheme.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-[#2563EB]">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
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
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page as number)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  )
}
