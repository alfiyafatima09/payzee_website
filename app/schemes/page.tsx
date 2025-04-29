'use client';

import { useState, useRef } from 'react';
import {
  Bell,
  Edit,
  Filter,
  Menu,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const inter = Inter({ subsets: ['latin'] });

export default function SchemesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newScheme, setNewScheme] = useState({
    name: '',
    launchDate: new Date(),
    targetGroup: '',
    fundAllocated: '',
    status: 'Active',
  });

  // Sample data for schemes
  const schemes = [
    {
      id: 1,
      name: 'Direct Benefit Transfer',
      description:
        "Financial assistance directly transferred to beneficiaries' bank accounts",
      amount: 5000,
      launchDate: '12 Jan 2022',
      targetGroup: 'Below Poverty Line',
      fundAllocated: '₹5,000 Cr',
      status: 'Active',
      eligibility: {
        dob: '01-01-1985',
        gender: 'Any',
        state: 'All',
        district: 'All',
        income: 'Below ₹2,50,000 per annum',
        caste: 'All',
        tags: ['poverty', 'direct-transfer'],
      },
      createdAt: '10 Jan 2022',
    },
    {
      id: 2,
      name: 'PM Kisan',
      description: "Financial benefit to land holding farmers' families",
      amount: 6000,
      launchDate: '24 Feb 2021',
      targetGroup: 'Farmers',
      fundAllocated: '₹2,500 Cr',
      status: 'Active',
      eligibility: {
        dob: null,
        gender: 'Any',
        state: 'All',
        district: 'All',
        income: null,
        caste: 'All',
        tags: ['farmers', 'agriculture'],
      },
      createdAt: '20 Feb 2021',
    },
    {
      id: 3,
      name: 'MGNREGA',
      description: 'Employment guarantee scheme for rural households',
      amount: 3500,
      launchDate: '05 Apr 2020',
      targetGroup: 'Rural Workers',
      fundAllocated: '₹3,200 Cr',
      status: 'Active',
      eligibility: {
        dob: null,
        gender: 'Any',
        state: 'All',
        district: 'Rural',
        income: null,
        caste: 'All',
        tags: ['rural', 'employment'],
      },
      createdAt: '01 Apr 2020',
    },
    {
      id: 4,
      name: 'Skill India',
      description: 'Training program for skill development',
      amount: 8000,
      launchDate: '15 Jul 2021',
      targetGroup: 'Youth',
      fundAllocated: '₹1,800 Cr',
      status: 'Inactive',
      eligibility: {
        dob: '01-01-1990',
        gender: 'Any',
        state: 'All',
        district: 'All',
        income: null,
        caste: 'All',
        tags: ['youth', 'skills', 'training'],
      },
      createdAt: '10 Jul 2021',
    },
    {
      id: 5,
      name: 'Digital India',
      description: 'Initiative to promote digital literacy',
      amount: 7500,
      launchDate: '01 Aug 2022',
      targetGroup: 'All Citizens',
      fundAllocated: '₹2,100 Cr',
      status: 'Active',
      eligibility: {
        dob: null,
        gender: 'Any',
        state: 'All',
        district: 'All',
        income: null,
        caste: 'All',
        tags: ['digital', 'literacy', 'technology'],
      },
      createdAt: '25 Jul 2022',
    },
    {
      id: 6,
      name: 'Startup India',
      description: 'Program to foster entrepreneurship and startups',
      amount: 15000,
      launchDate: '16 Jan 2023',
      targetGroup: 'Entrepreneurs',
      fundAllocated: '₹1,500 Cr',
      status: 'Inactive',
      eligibility: {
        dob: null,
        gender: 'Any',
        state: 'All',
        district: 'All',
        income: null,
        caste: 'All',
        tags: ['startups', 'business', 'entrepreneurs'],
      },
      createdAt: '10 Jan 2023',
    },
    {
      id: 7,
      name: 'Ayushman Bharat',
      description: 'Health insurance scheme for low-income families',
      amount: 5000,
      launchDate: '23 Sep 2021',
      targetGroup: 'Low Income Families',
      fundAllocated: '₹6,400 Cr',
      status: 'Active',
      eligibility: {
        dob: null,
        gender: 'Any',
        state: 'All',
        district: 'All',
        income: 'Below ₹5,00,000 per annum',
        caste: 'All',
        tags: ['health', 'insurance', 'medical'],
      },
      createdAt: '15 Sep 2021',
    },
  ];
  // Filter schemes based on status and search query
  const filteredSchemes = schemes
    .filter(
      (scheme) =>
        statusFilter === 'all' ||
        scheme.status.toLowerCase() === statusFilter.toLowerCase(),
    )
    .filter((scheme) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      return (
        scheme.name.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.targetGroup.toLowerCase().includes(query) ||
        (scheme.eligibility.tags &&
          scheme.eligibility.tags.some((tag) =>
            tag.toLowerCase().includes(query),
          ))
      );
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchemes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchemes = filteredSchemes.slice(startIndex, endIndex);

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
      {/*<Sidebar pathname="/schemes" isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />*/}

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

        {/* Schemes content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading and buttons */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-semibold">Schemes</h1>
            <div className="flex flex-wrap gap-2">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                    <Plus className="mr-2 h-4 w-4" /> Add Scheme
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Scheme</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new scheme.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Scheme Name
                      </Label>
                      <Input
                        id="name"
                        value={newScheme.name}
                        onChange={(e) => setNewScheme({...newScheme, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="launchDate" className="text-right">
                        Launch Date
                      </Label>
                      <Calendar
                        mode="single"
                        selected={newScheme.launchDate}
                        onSelect={(date) => date && setNewScheme({...newScheme, launchDate: date})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="targetGroup" className="text-right">
                        Target Group
                      </Label>
                      <Input
                        id="targetGroup"
                        value={newScheme.targetGroup}
                        onChange={(e) => setNewScheme({...newScheme, targetGroup: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fundAllocated" className="text-right">
                        Fund Allocated
                      </Label>
                      <Input
                        id="fundAllocated"
                        type="number"
                        value={newScheme.fundAllocated}
                        onChange={(e) => setNewScheme({...newScheme, fundAllocated: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={newScheme.status}
                        onValueChange={(value) => setNewScheme({...newScheme, status: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={() => {
                        // Here you would typically make an API call to add the scheme
                        console.log('New scheme:', newScheme);
                        setIsAddDialogOpen(false);
                        // Reset form
                        setNewScheme({
                          name: '',
                          launchDate: new Date(),
                          targetGroup: '',
                          fundAllocated: '',
                          status: 'Active',
                        });
                      }}
                    >
                      Add Scheme
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="border-[#2563EB] text-[#2563EB]"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Scheme
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Scheme
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
            </div>{' '}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Schemes..."
                className="w-full border-gray-200 bg-gray-50 pl-8 sm:w-[300px]"
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
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
          </div>{' '}
          {/* Schemes table */}
          <div className="mb-6 overflow-hidden rounded-lg border shadow-sm">
            <Table ref={tableRef}>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase">
                    Scheme Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Launch Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Target Group
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Fund Allocated
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
                {filteredSchemes.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-gray-500"
                    >
                      No schemes found
                      {searchQuery ? ` matching "${searchQuery}"` : ''}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSchemes.map((scheme) => (
                    <TableRow
                      key={scheme.id}
                      className="cursor-pointer transition-colors hover:bg-[#EEEEEE]"
                      onClick={() =>
                        (window.location.href = `/schemes/${scheme.id}`)
                      }
                    >
                      <TableCell className="py-4 font-medium">
                        {scheme.name}
                      </TableCell>
                      <TableCell className="py-4">
                        {scheme.launchDate}
                      </TableCell>
                      <TableCell className="py-4">
                        {scheme.targetGroup}
                      </TableCell>
                      <TableCell className="py-4">
                        {scheme.fundAllocated}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="outline"
                          className={`${
                            scheme.status === 'Active'
                              ? 'border-green-200 bg-green-50 text-green-700'
                              : 'border-gray-200 bg-gray-50 text-gray-700'
                          }`}
                        >
                          {scheme.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-[#2563EB]"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `/schemes/${scheme.id}`;
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
                              e.stopPropagation();
                              // Delete functionality would go here
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>{' '}
          {/* Pagination - only show when there are results */}
          {filteredSchemes.length > 0 && (
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
          )}
        </main>
      </div>
    </div>
  );
}
