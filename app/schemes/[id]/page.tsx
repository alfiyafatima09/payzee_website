'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Save,
  Settings,
  Users,
  BarChart3,
  Bell,
  CreditCard,
  Store,
  X,
} from 'lucide-react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const inter = Inter({ subsets: ['latin'] });

// Define types for our scheme data
interface EligibilityType {
  dob: string | null;
  gender: string | null;
  state: string | null;
  district: string | null;
  phone: string | null;
  email: string | null;
  caste: string | null;
  income: string | null;
  tags: string[];
}

interface SchemeType {
  id: number;
  name: string;
  description: string;
  amount: number;
  launchDate: string;
  targetGroup: string;
  fundAllocated: string;
  status: string;
  eligibility: EligibilityType;
  createdAt: string;
}

interface FormDataType {
  name: string;
  description: string;
  amount: number;
  status: string;
  eligibility: EligibilityType;
}

// Sample data for schemes - in a real app, this would be fetched from an API
const sampleSchemes: SchemeType[] = [
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
      phone: null,
      email: null,
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
      phone: null,
      email: null,
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
      phone: null,
      email: null,
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
      phone: null,
      email: null,
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
      phone: null,
      email: null,
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
      phone: null,
      email: null,
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
      phone: null,
      email: null,
      tags: ['health', 'insurance', 'medical'],
    },
    createdAt: '15 Sep 2021',
  },
];

export default function SchemeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Get scheme ID from URL params
  const schemeId = Number(params.id);

  // Find scheme by ID (in a real app, you'd fetch this from an API)
  const [scheme, setScheme] = useState<SchemeType | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    description: '',
    amount: 0,
    status: 'Active',
    eligibility: {
      dob: null,
      gender: null,
      state: null,
      district: null,
      phone: null,
      email: null,
      caste: null,
      income: null,
      tags: [],
    },
  });

  // Fetch scheme data when component mounts
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    const foundScheme = sampleSchemes.find((s) => s.id === schemeId);
    if (foundScheme) {
      setScheme(foundScheme);
      setFormData({
        name: foundScheme.name,
        description: foundScheme.description,
        amount: foundScheme.amount,
        status: foundScheme.status,
        eligibility: {
          ...foundScheme.eligibility,
        },
      });
    } else {
      router.push('/schemes'); // Redirect if scheme not found
    }
  }, [schemeId, router]);
  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? Number(value) : value,
    });
  };

  // Handle eligibility field changes
  const handleEligibilityChange = (
    field: keyof EligibilityType,
    value: string | null | string[],
  ) => {
    setFormData({
      ...formData,
      eligibility: {
        ...formData.eligibility,
        [field]: value,
      },
    });
  };

  // Handle tag changes
  const handleTagChange = (tag: string) => {
    const currentTags = formData.eligibility.tags || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    handleEligibilityChange('tags', updatedTags);
  };
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you would save changes to an API here
    if (scheme) {
      setScheme({
        ...scheme,
        ...formData,
      });
      setIsEditing(false);
      // Show success message
      alert('Scheme updated successfully');
    }
  };
  // Define sidebar items
  interface SidebarItem {
    name: string;
    icon: React.ComponentType<any>; // For Lucide icons
    active: boolean;
    href: string;
  }

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: Home, active: false, href: '/' },
    { name: 'Schemes', icon: BarChart3, active: true, href: '/schemes' },
    {
      name: 'Beneficiaries',
      icon: Users,
      active: false,
      href: '/beneficiaries',
    },
    { name: 'Vendors', icon: Store, active: false, href: '/vendors' },
    {
      name: 'Transactions',
      icon: CreditCard,
      active: false,
      href: '/transactions',
    },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];
  // Common tags for schemes
  const commonTags: string[] = [
    'poverty',
    'direct-transfer',
    'farmers',
    'agriculture',
    'rural',
    'employment',
    'youth',
    'skills',
    'training',
    'digital',
    'literacy',
    'technology',
    'startups',
    'business',
    'entrepreneurs',
    'health',
    'insurance',
    'medical',
    'education',
    'women',
    'children',
  ];

  if (!scheme) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className={`${inter.className} flex min-h-screen bg-white`}>
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-20 flex h-full flex-col border-r bg-white transition-all duration-300 ${
          isCollapsed ? 'w-[70px]' : 'w-[240px]'
        } hidden md:flex`}
      >
        <div className="flex h-14 items-center border-b px-3">
          <div
            className={`flex items-center gap-2 ${isCollapsed ? 'w-full justify-center' : ''}`}
          >
            {!isCollapsed && (
              <span className="text-lg font-semibold">PayZee</span>
            )}
            {isCollapsed && <span className="text-lg font-bold">PZ</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`ml-auto ${isCollapsed ? 'hidden' : ''}`}
            onClick={() => setIsCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Collapse sidebar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`ml-auto ${!isCollapsed ? 'hidden' : ''}`}
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
                    item.active
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : ''}`}
                  />
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
          <nav className="flex-1 overflow-auto py-4">
            <ul className="grid gap-1 px-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      item.active
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
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

        {/* Scheme details content */}
        <main className="p-4 sm:p-6">
          {/* Top section with navigation */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/schemes')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Schemes
              </Button>
              <h1 className="text-2xl font-semibold">
                {isEditing ? 'Edit Scheme' : 'Scheme Details'}
              </h1>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  className="bg-[#2563EB] hover:bg-[#1d4ed8]"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Scheme
                </Button>
              ) : (
                <>
                  <Button
                    className="bg-[#2563EB] hover:bg-[#1d4ed8]"
                    onClick={handleSubmit}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Scheme details card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{scheme.name}</CardTitle>
              <CardDescription>
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
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left column */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="id">Scheme ID</Label>
                      <Input id="id" value={scheme.id} disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Scheme Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={isEditing ? formData.name : scheme.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={
                          isEditing ? formData.description : scheme.description
                        }
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={isEditing ? formData.amount : scheme.amount}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      {isEditing ? (
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input id="status" value={scheme.status} disabled />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="createdAt">Created At</Label>
                      <Input id="createdAt" value={scheme.createdAt} disabled />
                    </div>
                  </div>

                  {/* Right column - Eligibility */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-lg font-medium">
                        Eligibility Criteria
                      </h3>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="eligibility-dob">Date of Birth</Label>
                          <Input
                            id="eligibility-dob"
                            type="text"
                            placeholder="e.g. 01-01-1990"
                            value={
                              isEditing
                                ? formData.eligibility.dob || ''
                                : scheme.eligibility.dob || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange('dob', e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-gender">Gender</Label>
                          {isEditing ? (
                            <Select
                              value={formData.eligibility.gender || ''}
                              onValueChange={(value) =>
                                handleEligibilityChange('gender', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Any">Any</SelectItem>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id="eligibility-gender"
                              value={scheme.eligibility.gender || ''}
                              disabled
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-state">State</Label>
                          <Input
                            id="eligibility-state"
                            value={
                              isEditing
                                ? formData.eligibility.state || ''
                                : scheme.eligibility.state || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange('state', e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-district">District</Label>
                          <Input
                            id="eligibility-district"
                            value={
                              isEditing
                                ? formData.eligibility.district || ''
                                : scheme.eligibility.district || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange(
                                'district',
                                e.target.value,
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-phone">Phone</Label>
                          <Input
                            id="eligibility-phone"
                            value={
                              isEditing
                                ? formData.eligibility.phone || ''
                                : scheme.eligibility.phone || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange('phone', e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-email">Email</Label>
                          <Input
                            id="eligibility-email"
                            type="email"
                            value={
                              isEditing
                                ? formData.eligibility.email || ''
                                : scheme.eligibility.email || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange('email', e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-caste">Caste</Label>
                          <Input
                            id="eligibility-caste"
                            value={
                              isEditing
                                ? formData.eligibility.caste || ''
                                : scheme.eligibility.caste || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange('caste', e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eligibility-income">Income</Label>
                          <Input
                            id="eligibility-income"
                            value={
                              isEditing
                                ? formData.eligibility.income || ''
                                : scheme.eligibility.income || ''
                            }
                            onChange={(e) =>
                              handleEligibilityChange('income', e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      {/* Tags */}
                      {isEditing ? (
                        <div className="mt-6">
                          <Label>Tags</Label>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {commonTags.map((tag: string) => (
                              <div
                                key={tag}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`tag-${tag}`}
                                  checked={formData.eligibility.tags.includes(
                                    tag,
                                  )}
                                  onCheckedChange={() => handleTagChange(tag)}
                                />
                                <label
                                  htmlFor={`tag-${tag}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {tag}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-6">
                          <Label>Tags</Label>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {scheme.eligibility.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-[#2563EB] hover:bg-[#1d4ed8]"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
