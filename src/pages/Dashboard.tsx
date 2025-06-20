import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  todayStats,
  topProducts,
  levelData,
  customerFulfillmentData,
  mathsCompletion,
  visitorInsightsData,
  generateRandomData,
} from "../lib/data";
import { mockQuizStats } from "../lib/quiz-data";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [realTimeData, setRealTimeData] = useState(generateRandomData());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(generateRandomData());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Header */}
      <header className="bg-dark-200 border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-300 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white/70 placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
              />
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-white/60" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink"></div>
              <ChevronDownIcon className="w-4 h-4 text-white/60" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Today's Sales & Level */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Today's Sales */}
              <div className="col-span-2">
                <div className="card-dark p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Today
                      </h3>
                      <p className="text-white/50 text-sm">Sales Summary</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {todayStats.map((stat, index) => (
                      <div key={stat.id} className="bg-dark-100 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: stat.color }}
                          >
                            <svg
                              className="w-6 h-6 p-1 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg mb-1">
                            {index === 0
                              ? realTimeData.totalRightAnswers
                              : index === 1
                                ? realTimeData.totalQuestions
                                : realTimeData.questionsAttempted}
                          </div>
                          <div className="text-white/70 text-xs mb-2">
                            {stat.subtitle}
                          </div>
                          <div
                            className="text-xs font-medium"
                            style={{ color: stat.color }}
                          >
                            {stat.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level Chart */}
              <div className="col-span-1">
                <div className="card-dark p-6 h-full">
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Level
                  </h3>

                  <div className="h-24 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={levelData}>
                        <Bar
                          dataKey="service"
                          fill="#2B2B36"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="volume"
                          fill="#605BFF"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                        <span className="text-white/60">Volume</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-dark-500"></div>
                        <span className="text-white/60">Service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products & Customer Fulfillment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Top Products */}
              <div className="col-span-2">
                <div className="card-dark p-6">
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Top Products
                  </h3>

                  <div className="space-y-1">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 text-xs text-white/50 mb-4">
                      <div className="col-span-1">#</div>
                      <div className="col-span-4">Name</div>
                      <div className="col-span-4">Popularity</div>
                      <div className="col-span-3">Sales</div>
                    </div>

                    {/* Products */}
                    {topProducts.map((product) => (
                      <div
                        key={product.id}
                        className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/5 last:border-b-0"
                      >
                        <div className="col-span-1 text-white text-sm">
                          {product.rank}
                        </div>
                        <div className="col-span-4 text-white text-sm">
                          {product.name}
                        </div>
                        <div className="col-span-4">
                          <div className="w-full bg-dark-500 h-1 rounded-full">
                            <div
                              className="h-1 rounded-full"
                              style={{
                                backgroundColor: product.color,
                                width: `${product.popularity}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `${product.color}20`,
                              color: product.color,
                              border: `1px solid ${product.color}`,
                            }}
                          >
                            {product.sales}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Fulfillment */}
              <div className="col-span-1">
                <div className="card-dark p-6 h-full">
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Customer Fulfillment
                  </h3>

                  <div className="h-24 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={customerFulfillmentData.chartData}>
                        <defs>
                          <linearGradient
                            id="lastMonth"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ABAA43"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ABAA43"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="thisMonth"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#827FDF"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#827FDF"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="lastMonth"
                          stroke="#ABAA43"
                          fillOpacity={1}
                          fill="url(#lastMonth)"
                        />
                        <Area
                          type="monotone"
                          dataKey="thisMonth"
                          stroke="#827FDF"
                          fillOpacity={1}
                          fill="url(#thisMonth)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                          <span className="text-xs text-white/60">
                            Last Month
                          </span>
                        </div>
                        <div className="text-white text-sm font-medium">
                          ${customerFulfillmentData.lastMonth.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div className="w-2 h-2 rounded-full bg-brand-pink"></div>
                          <span className="text-xs text-white/60">
                            This Month
                          </span>
                        </div>
                        <div className="text-white text-sm font-medium">
                          ${customerFulfillmentData.thisMonth.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visitor Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Maths Progress */}
              <div className="col-span-1">
                <div className="card-dark p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Maths
                      </h3>
                      <p className="text-white/50 text-sm">Total completion</p>
                    </div>
                    <div className="px-2 py-1 bg-brand-purple/20 border border-brand-purple rounded text-xs text-brand-purple">
                      {mathsCompletion.progressValue}%
                    </div>
                  </div>

                  <div className="w-full bg-dark-500 h-2 rounded-full mb-6">
                    <div
                      className="h-2 bg-brand-purple rounded-full progress-bar"
                      style={
                        {
                          width: `${mathsCompletion.progressValue}%`,
                          "--progress-width": `${mathsCompletion.progressValue}%`,
                        } as React.CSSProperties
                      }
                    ></div>
                  </div>

                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#2B2B36"
                          strokeWidth="12"
                          fill="transparent"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#605BFF"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={`${(mathsCompletion.percentage * 351.86) / 100} 351.86`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {realTimeData.mathsProgress}%
                      </span>
                    </div>
                  </div>

                  <p className="text-white/50 text-xs text-center">
                    {mathsCompletion.description}
                  </p>
                </div>
              </div>

              {/* Visitor Insights Chart */}
              <div className="col-span-2">
                <div className="card-dark p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold text-lg">
                      Visitor Insights
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
                      <span>New Visitors</span>
                    </div>
                  </div>

                  <div className="h-32 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitorInsightsData}>
                        <defs>
                          <linearGradient
                            id="visitorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#605BFF"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#605BFF"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#605BFF"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#visitorGradient)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex justify-between text-xs text-white font-semibold">
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month) => (
                      <span key={month}>{month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-6">
              <div className="card-dark p-6">
                <h3 className="text-white font-semibold text-lg mb-6">
                  Real-time Updates
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                    <span className="text-white/70 text-sm">
                      Total Visitors
                    </span>
                    <span className="text-white font-semibold">
                      {realTimeData.visitorCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                    <span className="text-white/70 text-sm">Active Users</span>
                    <span className="text-brand-green font-semibold">
                      {Math.floor(realTimeData.visitorCount * 0.7)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                    <span className="text-white/70 text-sm">
                      Conversion Rate
                    </span>
                    <span className="text-brand-purple font-semibold">
                      {(
                        (realTimeData.totalRightAnswers /
                          realTimeData.totalQuestions) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <h4 className="text-white font-medium mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-purple rounded-lg transition-colors text-sm">
                      Generate Report
                    </button>
                    <button className="w-full text-left p-3 bg-dark-100 hover:bg-white/5 text-white/70 rounded-lg transition-colors text-sm">
                      Export Data
                    </button>
                    <button className="w-full text-left p-3 bg-dark-100 hover:bg-white/5 text-white/70 rounded-lg transition-colors text-sm">
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
