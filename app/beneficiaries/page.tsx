'use client';

import { useState } from 'react';
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Edit,
  Filter,
  Home,
  MapPin,
  Menu,
  Plus,
  Search,
  Settings,
  Store,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sidebar } from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function BeneficiariesPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [stateFilter, setStateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data for beneficiaries
  const beneficiaries = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      state: 'Uttar Pradesh',
      gender: 'Male',
      aadhaar: '1234',
      location: 'Lucknow',
    },
    {
      id: 2,
      name: 'Priya Singh',
      state: 'Bihar',
      gender: 'Female',
      aadhaar: '5678',
      location: 'Patna',
    },
    {
      id: 3,
      name: 'Amit Patel',
      state: 'Gujarat',
      gender: 'Male',
      aadhaar: '9012',
      location: 'Ahmedabad',
    },
    {
      id: 4,
      name: 'Sunita Sharma',
      state: 'Rajasthan',
      gender: 'Female',
      aadhaar: '3456',
      location: 'Jaipur',
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      state: 'Maharashtra',
      gender: 'Male',
      aadhaar: '7890',
      location: 'Mumbai',
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      state: 'West Bengal',
      gender: 'Female',
      aadhaar: '2345',
      location: 'Kolkata',
    },
    {
      id: 7,
      name: 'Rahul Verma',
      state: 'Madhya Pradesh',
      gender: 'Male',
      aadhaar: '6789',
      location: 'Bhopal',
    },
  ];

  // Filter beneficiaries based on state
  const filteredBeneficiaries =
    stateFilter === 'all'
      ? beneficiaries
      : beneficiaries.filter(
          (beneficiary) => beneficiary.state === stateFilter,
        );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBeneficiaries = filteredBeneficiaries.slice(
    startIndex,
    endIndex,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2),
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  // Get unique states for filter
  const states = [
    ...new Set(beneficiaries.map((beneficiary) => beneficiary.state)),
  ];

  return (
    <div className={`${inter.className} flex min-h-screen bg-white`}>
      {/*<Sidebar pathname="/beneficiaries" isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />*/}

      {/* Main content */}

      <div className="flex-1 transition-all duration-300">
        {/* Top navbar */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-lg font-semibold">PayZee</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black p-0 text-white">
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

        {/* Beneficiaries content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading and buttons */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-semibold">Beneficiaries</h1>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                <Plus className="mr-2 h-4 w-4" /> Add Beneficiary
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Beneficiary
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Beneficiary
              </Button>
            </div>
          </div>

          {/* Search and filter section */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-[180px] border-gray-200 bg-gray-50">
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Beneficiaries..."
                className="w-full border-gray-200 bg-gray-50 pl-8 sm:w-[300px]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border shadow-sm">
            <Table>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase">
                    Beneficiary Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    State
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Gender
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Aadhaar Last 4
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Location
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBeneficiaries.map((beneficiary) => (
                  <TableRow
                    key={beneficiary.id}
                    className="transition-colors hover:bg-[#EEEEEE]"
                  >
                    <TableCell className="py-4 font-medium">
                      {beneficiary.name}
                    </TableCell>
                    <TableCell className="py-4">{beneficiary.state}</TableCell>
                    <TableCell className="py-4">{beneficiary.gender}</TableCell>
                    <TableCell className="py-4">
                      XXXX XXXX {beneficiary.aadhaar}
                    </TableCell>
                    <TableCell className="py-4">
                      {beneficiary.location}
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-[#2563EB]"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                        >
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
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }
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
                        e.preventDefault();
                        handlePageChange(page as number);
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
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
