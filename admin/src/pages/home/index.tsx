import { useState, useEffect } from "react"

import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Download,
} from "lucide-react"
import { BASE_URL } from "../../utils"
import axios from "axios"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "completed",
    amount: "$1,999.00",
    initials: "OM",
  },
  {
    id: "ORD-002",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "processing",
    amount: "$39.00",
    initials: "JL",
  },
  {
    id: "ORD-003",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "completed",
    amount: "$299.00",
    initials: "IN",
  },
  {
    id: "ORD-004",
    customer: "William Kim",
    email: "will@email.com",
    status: "pending",
    amount: "$99.00",
    initials: "WK",
  },
  {
    id: "ORD-005",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    status: "completed",
    amount: "$39.00",
    initials: "SD",
  },
]

const topProducts = [
  { name: "Wireless Headphones", sales: 1234, revenue: "$24,680", growth: 12 },
  { name: "Smart Watch", sales: 987, revenue: "$19,740", growth: 8 },
  { name: "Laptop Stand", sales: 756, revenue: "$15,120", growth: -3 },
  { name: "USB-C Cable", sales: 543, revenue: "$5,430", growth: 15 },
  { name: "Phone Case", sales: 432, revenue: "$8,640", growth: 5 },
]

const DashboardMain = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  // const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`);
        // Extract just the role names from the response data
        console.log(response.data.data)
        // setUsers(response.data);
        setTotalUsers(response.data.data.length);
      } catch (err: any) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [totalUsers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Sample data
const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "from last month",
    },
    {
      title: "Active Users",
      value: totalUsers,
      change: "+180.1%",
      trend: "up",
      icon: Users,
      description: "from last month",
    },
    {
      title: "Sales",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: ShoppingCart,
      description: "from last month",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-4.3%",
      trend: "down",
      icon: TrendingUp,
      description: "from last month",
    },
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        )
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Processing
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <p className="text-sm text-gray-500">Note* - most of the data contained within this page are mock data</p>
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Download className="mr-2 h-4 w-4" />
            Download
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Eye className="mr-2 h-4 w-4" />
            View Report
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{metric.title}</dt>
                      <dd className="text-lg font-medium text-gray-900">{metric.value}</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                  <span className="text-gray-500 ml-1">{metric.description}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

            {/* Activity Overview with System Time */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* System Time Card */}
        <div className="relative bg-white shadow rounded-lg overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background: `linear-gradient(45deg, #1d4ed8, #3b82f6, #60a5fa, #1d4ed8)`,
                backgroundSize: "400% 400%",
                animation: "gradientShift 8s ease infinite",
              }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-2 left-2 w-3 h-3 rounded-full opacity-60 animate-bounce"
                style={{ backgroundColor: "#1d4ed8", animationDelay: "0s" }}
              ></div>
              <div
                className="absolute top-8 right-4 w-2 h-2 rounded-full opacity-40 animate-bounce"
                style={{ backgroundColor: "#3b82f6", animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-4 left-8 w-4 h-4 rounded-full opacity-30 animate-bounce"
                style={{ backgroundColor: "#60a5fa", animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-8 right-2 w-2 h-2 rounded-full opacity-50 animate-bounce"
                style={{ backgroundColor: "#1d4ed8", animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900">System Time</h3>
              <div className="h-5 w-5 rounded-full animate-pulse" style={{ backgroundColor: "#1d4ed8" }}></div>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-bold tracking-tight" style={{ color: "#1d4ed8" }}>
                {formatTime(currentTime)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{formatDate(currentTime)}</p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: "#1d4ed8" }}></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Server Status */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900">Server Status</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-green-600">Online</div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">CPU Usage</span>
                    <span className="text-gray-900">23%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Memory</span>
                    <span className="text-gray-900">67%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900">Storage</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">1.2TB</div>
              <p className="text-xs text-gray-500">of 2TB used</p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">60% capacity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900">Active Sessions</h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">+12%</span> from yesterday
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Desktop</span>
                  <span className="text-gray-900">68%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mobile</span>
                  <span className="text-gray-900">32%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <div className="col-span-4 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            <p className="mt-1 text-sm text-gray-500">You have {recentOrders.length} orders this week.</p>
            <div className="mt-6 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                              {order.initials}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                            <div className="text-sm text-gray-500">{order.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-span-3 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Top Products</h3>
            <p className="mt-1 text-sm text-gray-500">Best performing products this month</p>
            <div className="mt-6 space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.sales} sales • {product.revenue}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                      {product.growth > 0 ? "+" : ""}
                      {product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain
