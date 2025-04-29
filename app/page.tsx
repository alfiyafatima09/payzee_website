'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
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
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
  Legend,
);

const inter = Inter({ subsets: ['latin'] });

// Define the type for scheme data
interface SchemeData {
  name: string;
  value: number;
  tags: string[];
}

interface MonthlyData {
  name: string;
  amount: number;
}

interface FilterData {
  value: number;
  color: string;
}

export default function Dashboard() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sample data for charts
  const monthlyData: MonthlyData[] = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 5500 },
    { name: 'Jul', amount: 7000 },
    { name: 'Aug', amount: 8000 },
    { name: 'Sep', amount: 7500 },
    { name: 'Oct', amount: 9000 },
    { name: 'Nov', amount: 8500 },
    { name: 'Dec', amount: 10000 },
  ];

  // Sample data with tags
  const schemesByTag: SchemeData[] = [
    { name: "Girls' Education", value: 25, tags: ['education', 'girls'] },
    { name: 'Farmer Support', value: 30, tags: ['farmers', 'agriculture'] },
    { name: 'Healthcare', value: 25, tags: ['health', 'medical'] },
    { name: 'Senior Citizen', value: 20, tags: ['elderly', 'pension'] },
  ];
  // Dropdown options for time range
  const timeFilterOptions = [
    'Last Week',
    'Last Month',
    'Last 6 Months',
    'Last Year',
    'All Time',
  ];
  const [activeTimeFilter, setActiveTimeFilter] = useState('Last Year');

  // Time range options for the line chart
  const timeRanges = [
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last 1 year', value: '1y' },
  ];
  const [selectedRange, setSelectedRange] = useState('6m');

  // Scheme filters
  const schemeFilters = [
    { key: 'girls', label: 'Girls Education', active: true, color: '#FF6384' },
    { key: 'farmers', label: 'Farmer Support', active: true, color: '#36A2EB' },
    { key: 'health', label: 'Healthcare', active: true, color: '#FFCE56' },
    {
      key: 'elderly',
      label: 'Senior Citizens',
      active: true,
      color: '#4BC0C0',
    },
  ];
  const [activeFilters, setActiveFilters] = useState(
    schemeFilters.filter((f) => f.active).map((f) => f.key),
  );

  // Toggle a filter
  const toggleFilter = (key: string) => {
    if (activeFilters.includes(key)) {
      if (activeFilters.length > 1) {
        setActiveFilters(activeFilters.filter((f) => f !== key));
      }
    } else {
      setActiveFilters([...activeFilters, key]);
    }
  };

  // Prepare data for charts
  const fundsLineData = {
    labels: monthlyData.map((d) => d.name),
    datasets: [
      {
        label: 'Funds Distributed',
        data: monthlyData.map((d) => d.amount),
        borderColor: '#2563EB',
        backgroundColor: '#93C5FD',
        borderWidth: 2,
        pointBackgroundColor: '#2563EB',
        pointRadius: 4,
        pointBorderWidth: 2,
        pointBorderColor: '#FFFFFF',
        tension: 0.3,
        fill: {
          target: 'origin',
          above: 'rgba(147, 197, 253, 0.2)',
        },
      },
    ],
  };

  const fundsLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `₹${ctx.raw} Cr`,
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
          callback: function (this: any, tickValue: any) {
            return `₹${tickValue}Cr`;
          },
        },
      },
    },
  };

  // Create data mapping for donut chart
  const donutDataByFilter: Record<string, FilterData> = {
    girls: { value: 25, color: '#FF6384' },
    farmers: { value: 30, color: '#36A2EB' },
    health: { value: 25, color: '#FFCE56' },
    elderly: { value: 20, color: '#4BC0C0' },
  };

  // Donut chart data
  const filteredDonut = activeFilters.map(
    (f) => donutDataByFilter[f as keyof typeof donutDataByFilter],
  );
  const donutChartData = {
    labels: activeFilters.map(
      (f) => schemeFilters.find((s) => s.key === f)?.label,
    ),
    datasets: [
      {
        data: filteredDonut.map((d) => d.value),
        backgroundColor: filteredDonut.map((d) => d.color),
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

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
  };

  const totalDistributed = filteredDonut.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={`${inter.className} flex min-h-screen bg-white`}>
      {/*<Sidebar pathname="/" isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />*/}

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
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] border-gray-200 bg-gray-50 pl-8 md:w-[240px] lg:w-[320px]"
                />
              </div>
            </form>
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

        {/* Dashboard content */}
        <main className="p-4 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
              Generate Report
            </Button>
          </div>
          {/* Stats cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Schemes
                </CardTitle>
                <CreditCard className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65</div>
                <p className="flex items-center text-xs text-green-500">
                  +5.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Beneficiaries
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2M</div>
                <p className="flex items-center text-xs text-green-500">
                  +12.4% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Fund Allocated
                </CardTitle>
                <Wallet className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹8,500 Cr</div>
                <p className="flex items-center text-xs text-green-500">
                  +7.8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending Approvals
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="flex items-center text-xs text-red-500">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>{' '}
          {/* Charts grid */}
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            {/* Card 1: Monthly Funds Disbursed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              whileHover={{
                boxShadow: '0 8px 32px 0 rgba(37,99,235,0.15)',
                scale: 1.02,
              }}
              className="relative rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-blue-200"
              style={{ minHeight: 370 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Monthly Funds Disbursed
                </h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-lg border-gray-200 bg-white/70 px-3 py-1 text-xs hover:bg-blue-50"
                    >
                      {timeRanges.find((r) => r.value === selectedRange)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {timeRanges.map((range) => (
                      <DropdownMenuItem
                        key={range.value}
                        onClick={() => setSelectedRange(range.value)}
                      >
                        {range.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex h-[240px] w-full items-center">
                <Line data={fundsLineData} options={fundsLineOptions} />
              </div>
            </motion.div>

            {/* Card 2: Funds Distributed by Scheme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              whileHover={{
                boxShadow: '0 8px 32px 0 rgba(255,181,232,0.15)',
                scale: 1.02,
              }}
              className="relative rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-pink-200"
              style={{ minHeight: 370 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Funds Distributed by Scheme
                </h2>
                <div className="flex flex-wrap gap-2">
                  {schemeFilters.map((filter) =>
                    activeFilters.includes(filter.key) ? (
                      <Badge
                        key={filter.key}
                        className="flex cursor-pointer items-center gap-1 rounded-full bg-opacity-80 px-3 py-1 text-xs font-medium"
                        style={{ background: filter.color, color: '#333' }}
                      >
                        {filter.label}
                        <button
                          className="ml-1 text-gray-500 hover:text-gray-800 focus:outline-none"
                          onClick={() =>
                            setActiveFilters(
                              activeFilters.filter((f) => f !== filter.key),
                            )
                          }
                          aria-label={`Remove ${filter.label}`}
                          type="button"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : (
                      <Badge
                        key={filter.key}
                        className="flex cursor-pointer items-center gap-1 rounded-full border border-dashed border-gray-300 bg-white/60 px-3 py-1 text-xs font-medium hover:bg-opacity-90"
                        style={{ color: filter.color }}
                        onClick={() =>
                          setActiveFilters([...activeFilters, filter.key])
                        }
                      >
                        {filter.label}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
              <div className="relative flex h-[240px] w-full items-center justify-center">
                <Pie data={donutChartData} options={donutChartOptions} />
                {/* Center text overlay */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="mb-1 text-xs text-gray-500">
                    Total Distributed
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{totalDistributed}Cr
                  </span>
          </div>
              </div>{' '}
            </motion.div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex">
                      <div className="mr-4 mt-0.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          New Scheme Created
                        </p>
                        <p className="text-sm text-gray-500">
                          Educational Support for Rural Girls
                        </p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Disbursements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        ₹
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        MGNREGA Fund Transfer
                      </p>
                      <p className="text-xs text-gray-500">
                        42,500 beneficiaries
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹450 Cr</p>
                      <p className="text-xs text-gray-500">June 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        ₹
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">PM Kisan</p>
                      <p className="text-xs text-gray-500">
                        15,200 beneficiaries
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹320 Cr</p>
                      <p className="text-xs text-gray-500">June 12, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        ₹
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Rural Housing Scheme
                      </p>
                      <p className="text-xs text-gray-500">
                        8,750 beneficiaries
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹280 Cr</p>
                      <p className="text-xs text-gray-500">June 10, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
