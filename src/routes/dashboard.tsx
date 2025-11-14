import { useState, useMemo } from 'react';
import { Map } from '@/components/common/Map';
import { Chart } from '@/components/common/Chart';
import { DataTable } from '@/components/common/DataTable';
import { Card, Heading } from '@/components/ui';
import type { ColumnDef } from '@tanstack/react-table';

// Dummy data types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface Order {
  id: string;
  product: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('AllTime');

  // Dummy user data
  const users: User[] = useMemo(
    () => [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Active',
        createdAt: '2024-02-20',
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Moderator',
        status: 'Inactive',
        createdAt: '2024-03-10',
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'User',
        status: 'Active',
        createdAt: '2024-04-05',
      },
      {
        id: '5',
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2024-05-12',
      },
    ],
    []
  );

  // Dummy order data
  const orders: Order[] = useMemo(
    () => [
      {
        id: 'ORD-001',
        product: 'Product A',
        customer: 'Customer 1',
        amount: 1250.5,
        status: 'Completed',
        date: '2024-01-15',
      },
      {
        id: 'ORD-002',
        product: 'Product B',
        customer: 'Customer 2',
        amount: 850.0,
        status: 'Pending',
        date: '2024-02-20',
      },
      {
        id: 'ORD-003',
        product: 'Product C',
        customer: 'Customer 3',
        amount: 2100.75,
        status: 'Completed',
        date: '2024-03-10',
      },
      {
        id: 'ORD-004',
        product: 'Product A',
        customer: 'Customer 4',
        amount: 950.25,
        status: 'Processing',
        date: '2024-04-05',
      },
      {
        id: 'ORD-005',
        product: 'Product D',
        customer: 'Customer 5',
        amount: 1750.0,
        status: 'Completed',
        date: '2024-05-12',
      },
    ],
    []
  );

  // Generate dummy chart data
  const revenueData = useMemo(
    () => [1200, 1900, 3000, 2500, 2800, 3200, 3500],
    []
  );

  const revenueCategories = useMemo(
    () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    []
  );

  const salesData = useMemo(
    () => [45, 52, 38, 67, 55, 72, 60],
    []
  );

  const pieData = useMemo(
    () => [
      { name: 'Product A', y: 35 },
      { name: 'Product B', y: 25 },
      { name: 'Product C', y: 20 },
      { name: 'Product D', y: 20 },
    ],
    []
  );

  // Table columns
  const userColumns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-xs font-bold ${
              row.original.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
      },
    ],
    []
  );

  const orderColumns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Order ID',
      },
      {
        accessorKey: 'product',
        header: 'Product',
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const colors: Record<string, string> = {
            Completed: 'bg-green-100 text-green-800',
            Pending: 'bg-yellow-100 text-yellow-800',
            Processing: 'bg-blue-100 text-blue-800',
          };
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                colors[status] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
    ],
    []
  );

  // Calculate stats
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0);
  const totalOrders = orders.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;
  const totalSales = salesData.reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Heading size="2xl" className="mb-2">
          Dashboard
        </Heading>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Period:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-[#B3C9E6] rounded px-3 py-1.5 text-sm text-[#03318C] focus:outline-none focus:ring-2 focus:ring-[#1A73EB]"
          >
            <option value="Today">Today</option>
            <option value="ThisWeek">This Week</option>
            <option value="ThisMonth">This Month</option>
            <option value="ThisYear">This Year</option>
            <option value="AllTime">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-xl font-bold text-gray-900">{activeUsers}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-xl font-bold text-gray-900">{totalSales}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Chart
          title="Revenue Trend"
          type="line"
          data={revenueData}
          categories={revenueCategories}
          color="#1A73EB"
        />
        <Chart
          title="Sales Overview"
          type="bar"
          data={salesData}
          categories={revenueCategories}
          color="#17DD91"
        />
        <Chart
          title="Product Distribution"
          type="pie"
          data={pieData}
          color="#FF6B6B"
        />
        <Chart
          title="Weekly Performance"
          type="area"
          data={revenueData}
          categories={revenueCategories}
          color="#9333EA"
        />
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <Heading size="lg" className="mb-4">
          Location Map
        </Heading>
        <Map height="500px" />
      </div>

      {/* Tables Section */}
      <div className="grid gap-6 mb-8 md:grid-cols-1 lg:grid-cols-2">
        <DataTable
          title="Users"
          columns={userColumns}
          data={users}
          loading={false}
        />
        <DataTable
          title="Orders"
          columns={orderColumns}
          data={orders}
          loading={false}
        />
      </div>
    </div>
  );
};

export default DashboardPage;

