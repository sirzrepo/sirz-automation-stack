import { useState, useEffect } from "react"

import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Download,
  ListTodo,
} from "lucide-react"
import { BASE_URL } from "../../utils"
import axios from "axios"

const recentOrders = [
  {
    id: "CLI-001",
    customer: "FashionNova UK",
    email: "contact@fashionnova-uk.com",
    status: "completed",
    amount: "£1,200",
    initials: "FU",
  },
  {
    id: "CLI-002",
    customer: "CleanLife EU",
    email: "info@cleanlife-eu.com",
    status: "completed",
    amount: "£1,500",
    initials: "CE",
  },
  {
    id: "CLI-003",
    customer: "FitGear Sports",
    email: "sales@fitgear-sports-uk.com",
    status: "completed",
    amount: "£1,800",
    initials: "FS",
  },
  {
    id: "CLI-004",
    customer: "Glamour Jewels",
    email: "hello@glamour-jewels-uk.com",
    status: "completed",
    amount: "£1,100",
    initials: "GJ",
  },
  {
    id: "CLI-005",
    customer: "HomeStyle NG",
    email: "support@homestyle-ng.com",
    status: "completed",
    amount: "£950",
    initials: "HN",
  },
  {
    id: "CLI-006",
    customer: "StyleHub UK",
    email: "info@stylehub-uk.com",
    status: "completed",
    amount: "£1,300",
    initials: "SU",
  },
  {
    id: "CLI-007",
    customer: "EcoClean EU",
    email: "contact@ecoclean-eu.com",
    status: "completed",
    amount: "£1,200",
    initials: "EE",
  },
  {
    id: "CLI-008",
    customer: "ActiveWear Sports",
    email: "sales@activewear-sports-uk.com",
    status: "completed",
    amount: "£1,700",
    initials: "AS",
  },
  {
    id: "CLI-009",
    customer: "Trendy Threads UK",
    email: "hello@trendy-threads-uk.com",
    status: "completed",
    amount: "£1,400",
    initials: "TT",
  },
  {
    id: "CLI-010",
    customer: "PureCare EU",
    email: "info@purecare-eu.com",
    status: "completed",
    amount: "£1,100",
    initials: "PE",
  },
  {
    id: "CLI-011",
    customer: "Elite Fitness NG",
    email: "support@elite-fitness-ng.com",
    status: "completed",
    amount: "£800",
    initials: "EN",
  },
  {
    id: "CLI-012",
    customer: "Urban Living UK",
    email: "contact@urbanliving-uk.com",
    status: "completed",
    amount: "£1,040",
    initials: "UU",
  },
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
      value: "£11,850.00",
      change: "+100%",
      trend: "up",
      icon: DollarSign,
      description: "from launch",
    },
    {
      title: "Paying Clients",
      value: "12",
      change: "+100%",
      trend: "up",
      icon: Users,
      description: "in first 9 months",
    },
    {
      title: "Sectors Served",
      value: "5",
      change: "+25%",
      trend: "up",
      icon: ListTodo,
      description: "different industries",
    },
    {
      title: "Global Reach",
      value: "3",
      change: "+200%",
      trend: "up",
      icon: TrendingUp,
      description: "countries served",
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


  return (
    <div className="flex-1 space-y-4 py-4 md:p-8 pt-6">
        {/* <p className="text-sm text-gray-500">Note* - most of the data contained within this page are mock data</p> */}
      {/* Header */}
      <div className="sm:flex items-center justify-between space-y-2">
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
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
              <h3 className="text-base font-medium text-gray-900">Active Clients</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">{totalUsers.toString()}</div>
              <p className="text-xs text-gray-500">registered users</p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">100% capacity</p>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-6">
        {/* Client & Revenue Overview */}
        <div className="rounded-lg border overflow-x-auto bg-card text-card-foreground shadow-sm col-span-4">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Sectoral Reach</h3>
            <p className="text-sm text-muted-foreground">Distribution of clients across different sectors</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {[
                { sector: 'Fashion & Apparel', count: 2 },
                { sector: 'Cleaning & Care Brands', count: 3 },
                { sector: 'Sports & Fitness', count: 3 },
                { sector: 'Accessories & Jewellery', count: 2 },
                { sector: 'Home & Lifestyle', count: 2 },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-y-3">
                  <div className="w-48 text-sm font-medium">{item.sector}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${(item.count / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 w-8 text-sm text-right font-medium">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-3">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Geographic Reach</h3>
            <p className="text-sm text-muted-foreground">Client distribution by region</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-6">
              {[
                { region: 'United Kingdom', count: 7, percentage: 58 },
                { region: 'European Union', count: 3, percentage: 25 },
                { region: 'Nigeria', count: 2, percentage: 17 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.region}</span>
                    <span className="text-muted-foreground">{item.count} clients</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold">£12,000.00</p>
                <p className="text-sm text-muted-foreground">Total Revenue Generated</p>
                <p className="text-xs text-muted-foreground mt-2">From 12 paying clients plus subscriptions in first 9 months</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        {/* Recent Orders */}
        <div className="col-span-4 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Client Overview</h3>
                <p className="mt-1 text-sm text-gray-500">{recentOrders.length} paying clients in the last 9 months</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900">£11,850.00</p>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
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
                          <div className="flex-shrink-0">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.email.includes('uk.com') ? 'UK' : order.email.includes('eu.com') ? 'EU' : 'NG'}
                      </td>
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
        {/* <div className="col-span-3 bg-white shadow rounded-lg">
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
        </div> */}
      </div>
    </div>
  )
}

export default DashboardMain
