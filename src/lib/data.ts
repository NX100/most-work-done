// Statistics data for dashboard
export const todayStats = [
  { label: "Total Paid Users", value: "100K", increase: "+12%" },
  { label: "Order in Queue", value: "2340", increase: "+2%" },
  { label: "Total Products", value: "50K", increase: "+8%" },
];

// Top products data
export const topProducts = [
  {
    name: "3D Illustration",
    price: "$235",
    sales: "$6,500",
    progress: 75,
    color: "bg-purple-500",
  },
  {
    name: "Art Stuff",
    price: "$235",
    sales: "$4,500",
    progress: 60,
    color: "bg-pink-500",
  },
  {
    name: "Gaming",
    price: "$235",
    sales: "$3,200",
    progress: 45,
    color: "bg-orange-500",
  },
  {
    name: "UI Kits",
    price: "$235",
    sales: "$2,800",
    progress: 35,
    color: "bg-green-500",
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
export const customerFulfillmentData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 2780 },
  { month: "May", value: 1890 },
  { month: "Jun", value: 2390 },
  { month: "Jul", value: 3490 },
];

// Maths completion percentage
export const mathsCompletion = 78;

// Visitor insights data
export const visitorInsightsData = [
  { day: "Mon", desktop: 4000, mobile: 2400 },
  { day: "Tue", desktop: 3000, mobile: 1398 },
  { day: "Wed", desktop: 2000, mobile: 2800 },
  { day: "Thu", desktop: 2780, mobile: 3908 },
  { day: "Fri", desktop: 1890, mobile: 4800 },
  { day: "Sat", desktop: 2390, mobile: 3800 },
  { day: "Sun", desktop: 3490, mobile: 4300 },
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
  };
}
