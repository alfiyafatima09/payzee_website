"use client"

import { useState, useRef } from "react"
import {
  Bell,
  Edit,
  Filter,
  Menu,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react"
import { Inter } from "next/font/google"
import Image from "next/image"

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
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function SchemesPage() {  
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Sample data for schemes
  const schemes = [
    {
      id: 1,
      name: "Direct Benefit Transfer",
      description: "Financial assistance directly transferred to beneficiaries' bank accounts",
      amount: 5000,
      launchDate: "12 Jan 2022",
      targetGroup: "Below Poverty Line",
      fundAllocated: "₹5,000 Cr",
      status: "Active",
      eligibility: {
        dob: "01-01-1985",
        gender: "Any",
        state: "All",
        district: "All",
        income: "Below ₹2,50,000 per annum",
        caste: "All",
        tags: ["poverty", "direct-transfer"],
      },
      createdAt: "10 Jan 2022",
    },
    {
      id: 2,
      name: "PM Kisan",
      description: "Financial benefit to land holding farmers' families",
      amount: 6000,
      launchDate: "24 Feb 2021",
      targetGroup: "Farmers",
      fundAllocated: "₹2,500 Cr",
      status: "Active",
      eligibility: {
        dob: null,
        gender: "Any",
        state: "All",
        district: "All",
        income: null,
        caste: "All",
        tags: ["farmers", "agriculture"],
      },
      createdAt: "20 Feb 2021",
    },
    {
      id: 3,
      name: "MGNREGA",
      description: "Employment guarantee scheme for rural households",
      amount: 3500,
      launchDate: "05 Apr 2020",
      targetGroup: "Rural Workers",
      fundAllocated: "₹3,200 Cr",
      status: "Active",
      eligibility: {
        dob: null,
        gender: "Any",
        state: "All",
        district: "Rural",
        income: null,
        caste: "All",
        tags: ["rural", "employment"],
      },
      createdAt: "01 Apr 2020",
    },
    {
      id: 4,
      name: "Skill India",
      description: "Training program for skill development",
      amount: 8000,
      launchDate: "15 Jul 2021",
      targetGroup: "Youth",
      fundAllocated: "₹1,800 Cr",
      status: "Inactive",
      eligibility: {
        dob: "01-01-1990",
        gender: "Any",
        state: "All",
        district: "All",
        income: null,
        caste: "All",
        tags: ["youth", "skills", "training"],
      },
      createdAt: "10 Jul 2021",
    },
    {
      id: 5,
      name: "Digital India",
      description: "Initiative to promote digital literacy",
      amount: 7500,
      launchDate: "01 Aug 2022",
      targetGroup: "All Citizens",
      fundAllocated: "₹2,100 Cr",
      status: "Active",
      eligibility: {
        dob: null,
        gender: "Any",
        state: "All",
        district: "All",
        income: null,
        caste: "All",
        tags: ["digital", "literacy", "technology"],
      },
      createdAt: "25 Jul 2022",
    },
    {
      id: 6,
      name: "Startup India",
      description: "Program to foster entrepreneurship and startups",
      amount: 15000,
      launchDate: "16 Jan 2023",
      targetGroup: "Entrepreneurs",
      fundAllocated: "₹1,500 Cr",
      status: "Inactive",
      eligibility: {
        dob: null,
        gender: "Any",
        state: "All",
        district: "All",
        income: null,
        caste: "All",
        tags: ["startups", "business", "entrepreneurs"],
      },
      createdAt: "10 Jan 2023",
    },
    {
      id: 7,
      name: "Ayushman Bharat",
      description: "Health insurance scheme for low-income families",
      amount: 5000,
      launchDate: "23 Sep 2021",
      targetGroup: "Low Income Families",
      fundAllocated: "₹6,400 Cr",
      status: "Active",
      eligibility: {
        dob: null,
        gender: "Any",
        state: "All",
        district: "All",
        income: "Below ₹5,00,000 per annum",
        caste: "All",
        tags: ["health", "insurance", "medical"],
      },
      createdAt: "15 Sep 2021",
    },
  ]
  // Filter schemes based on status and search query
  const filteredSchemes = schemes
    .filter((scheme) => 
      statusFilter === "all" || scheme.status.toLowerCase() === statusFilter.toLowerCase())
    .filter((scheme) => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        scheme.name.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.targetGroup.toLowerCase().includes(query) ||
        (scheme.eligibility.tags && scheme.eligibility.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });

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
    }    return pageNumbers
  }
  
  const tableRef = useRef<HTMLTableElement>(null);
  
  return (
    <div className={`${inter.className} min-h-screen bg-white flex`}>
      {/*<Sidebar pathname="/schemes" isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />*/}

      {/* Main content */}
      <div
        className="flex-1 md:ml-[240px] transition-all duration-300"
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
            </div>            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Schemes..."
                className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
          </div>          {/* Schemes table */}
          <div className="border rounded-lg shadow-sm overflow-hidden mb-6">
            <Table ref={tableRef}>
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
                {filteredSchemes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No schemes found{searchQuery ? ` matching "${searchQuery}"` : ''}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSchemes.map((scheme) => (                  <TableRow
                    key={scheme.id}
                    className="hover:bg-[#EEEEEE] transition-colors cursor-pointer"
                    onClick={() => (window.location.href = `/schemes/${scheme.id}`)}
                  >
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-[#2563EB]"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `/schemes/${scheme.id}`
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Delete functionality would go here
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </div>          {/* Pagination - only show when there are results */}
          {filteredSchemes.length > 0 && (
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
          )}
        </main>
      </div>
    </div>
  )
}
