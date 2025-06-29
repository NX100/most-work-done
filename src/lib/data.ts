// Statistics data for dashboard
export const todayStats = [
  {
    id: 1,
    color: "#605BFF",
    subtitle: "Total Right Answers",
    change: "+12%",
  },
  {
    id: 2,
    color: "#EF37FF",
    subtitle: "Total Questions",
    change: "+2%",
  },
  {
    id: 3,
    color: "#FF8F6B",
    subtitle: "Questions Attempted",
    change: "+8%",
  },
];

// Top products data
export const topProducts = [
  {
    id: 1,
    rank: "01",
    name: "3D Illustration",
    popularity: 75,
    sales: "$6,500",
    color: "#605BFF",
  },
  {
    id: 2,
    rank: "02",
    name: "Art Stuff",
    popularity: 60,
    sales: "$4,500",
    color: "#EF37FF",
  },
  {
    id: 3,
    rank: "03",
    name: "Gaming",
    popularity: 45,
    sales: "$3,200",
    color: "#FF8F6B",
  },
  {
    id: 4,
    rank: "04",
    name: "UI Kits",
    popularity: 35,
    sales: "$2,800",
    color: "#42E8B8",
  },
];

// Level chart data
export const levelData = [
  { month: "Jan", volume: 4000, service: 2400 },
  { month: "Feb", volume: 3000, service: 1398 },
  { month: "Mar", volume: 2000, service: 9800 },
  { month: "Apr", volume: 2780, service: 3908 },
  { month: "May", volume: 1890, service: 4800 },
  { month: "Jun", volume: 2390, service: 3800 },
];

// Customer fulfillment data
export const customerFulfillmentData = {
  lastMonth: 15420,
  thisMonth: 18750,
  chartData: [
    { month: "Jan", lastMonth: 4000, thisMonth: 3200 },
    { month: "Feb", lastMonth: 3000, thisMonth: 4100 },
    { month: "Mar", lastMonth: 2000, thisMonth: 2800 },
    { month: "Apr", lastMonth: 2780, thisMonth: 3908 },
    { month: "May", lastMonth: 1890, thisMonth: 4800 },
    { month: "Jun", lastMonth: 2390, thisMonth: 3800 },
    { month: "Jul", lastMonth: 3490, thisMonth: 4300 },
  ],
};

// Maths completion data
export const mathsCompletion = {
  progressValue: 78,
  percentage: 78,
  description: "Great progress! Keep it up to reach your goal.",
};

// Visitor insights data
export const visitorInsightsData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 2780 },
  { month: "May", value: 1890 },
  { month: "Jun", value: 2390 },
  { month: "Jul", value: 3490 },
  { month: "Aug", value: 4200 },
  { month: "Sep", value: 3800 },
  { month: "Oct", value: 4500 },
  { month: "Nov", value: 4100 },
  { month: "Dec", value: 4800 },
];

// Calendar events data
export const calendarEvents = [
  { date: 1, type: "free", title: "Free day" },
  { date: 8, type: "party", title: "Party Time" },
  { date: 15, type: "victory", title: "Victory day" },
  { date: 22, type: "christmas", title: "Christmas" },
  { date: 25, type: "free", title: "Free day" },
];

// People data for calendar
export const people = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    status: "online",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    status: "offline",
  },
  {
    id: 3,
    name: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    status: "online",
  },
  {
    id: 4,
    name: "Emma Davis",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    status: "busy",
  },
];

// Function to generate random data for real-time updates
export function generateRandomData() {
  return {
    totalUsers: Math.floor(Math.random() * 1000) + 99000,
    queueOrders: Math.floor(Math.random() * 500) + 2000,
    totalProducts: Math.floor(Math.random() * 5000) + 45000,
    newRegistrations: Math.floor(Math.random() * 50) + 10,
    activeUsers: Math.floor(Math.random() * 500) + 1500,
    revenue: Math.floor(Math.random() * 10000) + 50000,
    totalRightAnswers: Math.floor(Math.random() * 100) + 120,
    totalQuestions: Math.floor(Math.random() * 50) + 180,
    questionsAttempted: Math.floor(Math.random() * 30) + 150,
    mathsProgress: Math.floor(Math.random() * 20) + 70,
    visitorCount: Math.floor(Math.random() * 500) + 1200,
  };
}
