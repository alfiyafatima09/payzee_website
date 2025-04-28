'use client';

import { useState, useRef } from 'react';
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

export default function VendorsPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sample data for vendors
  const vendors = [
    {
      id: 1,
      name: 'Agro Solutions Ltd.',
      merchantId: 'VEN-2023-001',
      region: 'North',
      location: 'Delhi',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Rural Supplies Co.',
      merchantId: 'VEN-2023-002',
      region: 'South',
      location: 'Bangalore',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Tech Village Pvt. Ltd.',
      merchantId: 'VEN-2023-003',
      region: 'West',
      location: 'Mumbai',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Health First Services',
      merchantId: 'VEN-2023-004',
      region: 'East',
      location: 'Kolkata',
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Edu Materials Inc.',
      merchantId: 'VEN-2023-005',
      region: 'Central',
      location: 'Bhopal',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Green Farms Cooperative',
      merchantId: 'VEN-2023-006',
      region: 'North',
      location: 'Chandigarh',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Digital Solutions Hub',
      merchantId: 'VEN-2023-007',
      region: 'South',
      location: 'Chennai',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Edu Materials Inc.',
      merchantId: 'VEN-2023-005',
      region: 'Central',
      location: 'Bhopal',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Green Farms Cooperative',
      merchantId: 'VEN-2023-006',
      region: 'North',
      location: 'Chandigarh',
      status: 'Inactive',
    },
    {
      id: 10,
      name: 'Digital Solutions Hub',
      merchantId: 'VEN-2023-007',
      region: 'South',
      location: 'Chennai',
      status: 'Active',
    },
    {
      id: 11,
      name: 'Edu Materials Inc.',
      merchantId: 'VEN-2023-005',
      region: 'Central',
      location: 'Bhopal',
      status: 'Active',
    },
    {
      id: 12,
      name: 'Green Farms Cooperative',
      merchantId: 'VEN-2023-006',
      region: 'North',
      location: 'Chandigarh',
      status: 'Inactive',
    },
    {
      id: 13,
      name: 'Digital Solutions Hub',
      merchantId: 'VEN-2023-007',
      region: 'South',
      location: 'Chennai',
      status: 'Active',
    },
  ];

  // Filter vendors based on status
  const filteredVendors =
    statusFilter === 'all'
      ? vendors
      : vendors.filter(
          (vendor) =>
            vendor.status.toLowerCase() === statusFilter.toLowerCase(),
        );

  // Calculate pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVendors = filteredVendors.slice(startIndex, endIndex);

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

  const tableRef = useRef<HTMLTableElement>(null);

  return (
    <div className={`${inter.className} flex min-h-screen bg-white`}>
      {/* Mobile sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="flex h-14 items-center border-b px-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">PayZee</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div
        className={`flex-1 md:ml-[${isCollapsed ? '70px' : '240px'}] transition-all duration-300`}
        style={{ marginLeft: isCollapsed ? '70px' : '240px' }}
      >
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

        {/* Vendors content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading and buttons */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-semibold">Vendors</h1>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                <Plus className="mr-2 h-4 w-4" /> Add Vendor
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Vendor
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Vendor
              </Button>
            </div>
          </div>

          {/* Search and filter section */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-gray-200 bg-gray-50">
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
                placeholder="Search Vendors..."
                className="w-full border-gray-200 bg-gray-50 pl-8 sm:w-[300px]"
              />
            </div>
          </div>

          {/* Vendors table */}
          <div className="mb-6 overflow-hidden rounded-lg border shadow-sm">
            <Table ref={tableRef}>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase">
                    Vendor Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Merchant ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Region
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Location
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentVendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="transition-colors hover:bg-[#EEEEEE]"
                  >
                    <TableCell className="py-4 font-medium">
                      {vendor.name}
                    </TableCell>
                    <TableCell className="py-4">{vendor.merchantId}</TableCell>
                    <TableCell className="py-4">{vendor.region}</TableCell>
                    <TableCell className="py-4">{vendor.location}</TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="outline"
                        className={`${
                          vendor.status === 'Active'
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        {vendor.status}
                      </Badge>
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
