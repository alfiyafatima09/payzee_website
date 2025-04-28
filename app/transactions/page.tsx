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
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function TransactionsPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [regionFilter, setRegionFilter] = useState("all")
  const [isCollapsed,setIsCollapsed] = useState(false)

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
    {
      id: "TXN-2023-008",
      senderId: "SND-008",
      receiverId: "RCV-008",
      amount: "₹4,200",
      region: "East",
      date: "30 Jan 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-009",
      senderId: "SND-009",
      receiverId: "RCV-009",
      amount: "₹3,800",
      region: "West",
      date: "02 Feb 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-010",
      senderId: "SND-010",
      receiverId: "RCV-010",
      amount: "₹2,900",
      region: "Central",
      date: "05 Feb 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-011",
      senderId: "SND-011",
      receiverId: "RCV-011",
      amount: "₹5,500",
      region: "North",
      date: "08 Feb 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-012",
      senderId: "SND-012",
      receiverId: "RCV-012",
      amount: "₹3,100",
      region: "South",
      date: "10 Feb 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-013",
      senderId: "SND-013",
      receiverId: "RCV-013",
      amount: "₹4,800",
      region: "East",
      date: "12 Feb 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-014",
      senderId: "SND-014",
      receiverId: "RCV-014",
      amount: "₹2,700",
      region: "West",
      date: "15 Feb 2023",
      status: "Success",
    },
    {
      id: "TXN-2023-015",
      senderId: "SND-015",
      receiverId: "RCV-015",
      amount: "₹3,900",
      region: "Central",
      date: "18 Feb 2023",
      status: "Success",
    }
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = transactions.slice(startIndex, endIndex)

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

  // Filter transactions based on region
  const filteredTransactions =
    regionFilter === "all" ? transactions : transactions.filter((transaction) => transaction.region === regionFilter)

  // Get unique regions for filter
  const regions = [...new Set(transactions.map((transaction) => transaction.region))]



  return (
    <div className={`${inter.className} min-h-screen bg-white flex`}>
      {/* Sidebar for desktop */}


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
                {currentTransactions.map((transaction) => (
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
