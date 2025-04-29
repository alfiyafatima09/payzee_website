'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

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

interface Transaction {
  transaction_id: string;
  vendor_id: string;
  category: string;
  user_id: string;
  status: string;
  timestamp: string;
  amount: number;
}

interface UserData {
  id: string;
  password: string;
  remaining_amt: number;
  allocated_amt: number;
  past_transactions: Transaction[];
  govt_wallet: number;
  personal_wallet: number;
  account_info: {
    phone_number: string;
    date_created: string;
    address: string;
    email: string;
    full_name: string;
    username: string;
    aadhaar_number: string;
  };
}

interface TransformedTransaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: string;
  region: string;
  date: string;
  status: string;
}

export default function TransactionsPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [regionFilter, setRegionFilter] = useState('all');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiTransactions, setApiTransactions] = useState<TransformedTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Transaction[]>(
          'http://127.0.0.1:8000/api/v1/government/transactions',
        );

        // Transform the API data to match your expected structure
        const transformedTransactions = response.data.map((transaction) => ({
          id: transaction.transaction_id,
          senderId: transaction.user_id,
          receiverId: transaction.vendor_id,
          amount: `₹${transaction.amount}`,
          region: transaction.category,
          date: new Date(transaction.timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          status: transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
        }));

        setApiTransactions(transformedTransactions);
        setError(null);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Use API transactions if available, otherwise use hardcoded transactions
  const transactions: TransformedTransaction[] = apiTransactions.length > 0 ? apiTransactions : [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

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

  // Filter transactions based on region
  const filteredTransactions =
    regionFilter === 'all'
      ? transactions
      : transactions.filter(
          (transaction) => transaction.region === regionFilter,
        );

  // Get unique regions for filter
  const regions = [
    ...new Set(transactions.map((transaction) => transaction.region)),
  ];

  return (
    <div className={`${inter.className} flex min-h-screen bg-white`}>
      {/* Sidebar for desktop */}

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
      <div className={`flex-1 transition-all duration-300`}>
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

        {/* Transactions content */}
        <main className="p-4 sm:p-6">
          {/* Top section with heading */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-semibold">Transactions</h1>
            {/* No buttons for transactions page as it's read-only */}
          </div>

          {/* Search and filter section */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[180px] border-gray-200 bg-gray-50">
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
                className="w-full border-gray-200 bg-gray-50 pl-8 sm:w-[300px]"
              />
            </div>
          </div>

          {/* Transactions table */}
          <div className="mb-6 overflow-hidden rounded-lg border shadow-sm">
            <Table>
              <TableHeader className="bg-[#F5F5F5]">
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase">
                    Transaction ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Sender ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Receiver ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Region
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Transaction Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="transition-colors hover:bg-[#EEEEEE]"
                  >
                    <TableCell className="py-4 font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.senderId}
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.receiverId}
                    </TableCell>
                    <TableCell className="py-4">{transaction.amount}</TableCell>
                    <TableCell className="py-4">{transaction.region}</TableCell>
                    <TableCell className="py-4">{transaction.date}</TableCell>
                    <TableCell className="py-4">
                      <Badge className="border-green-200 bg-green-100 text-green-800 hover:bg-green-100">
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
