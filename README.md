# Modern Dashboard Application

A beautiful, modern dashboard application built with React, TypeScript, and TailwindCSS. Features a complete authentication flow, interactive charts, and a responsive design that matches the provided Figma designs pixel-perfectly.

## 🚀 Features

- **Authentication System**: Complete sign up and login flow with form validation
- **Dashboard**: Interactive charts and real-time statistics
- **Calendar**: Full calendar view with event management
- **Responsive Design**: Works perfectly on all screen sizes
- **Modern UI**: Dark theme with glassmorphism effects
- **Real-time Updates**: Live data updates every 5 seconds
- **Interactive Charts**: Built with Recharts library
- **Type Safety**: Full TypeScript implementation

## 🎨 Design

The application is designed to match the provided Figma designs with:

- **Primary Color**: `#605BFF` (Purple)
- **Background**: `#151619` (Dark)
- **Cards**: `#21222D` (Dark Gray)
- **Accent Colors**: Pink, Orange, Cyan, and more
- **Typography**: Inter and Nunito fonts

## 📱 Pages

### Authentication

- **Sign Up**: Full registration form with social login options
- **Login**: Clean login interface with "Remember Me" functionality

### Dashboard

- **Today's Statistics**: Real-time stats with animated counters
- **Charts**: Interactive bar charts, line charts, and progress indicators
- **Top Products**: Product performance with progress bars
- **Customer Fulfillment**: Area charts showing monthly comparisons
- **Visitor Insights**: Year-over-year visitor analytics

### Calendar

- **Monthly View**: Full calendar grid with events
- **Event Management**: Color-coded events and meetings
- **People Search**: Contact management for scheduling
- **Mini Calendar**: Sidebar navigation calendar

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety throughout
- **Vite** - Fast development and building
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **Recharts** - Interactive charts and graphs
- **Heroicons** - Beautiful SVG icons
- **React Hook Form** - Form validation (ready to add)

## 🚦 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Type checking**:
   ```bash
   npm run typecheck
   ```

## 📊 Data & State Management

- **Mock Data**: Realistic mock data for all charts and statistics
- **Real-time Updates**: Simulated live data updates
- **Local Storage**: User authentication state persistence
- **Context API**: Authentication state management

## 🎯 Key Components

### Authentication

- Form validation with error handling
- Social login buttons (Google, Facebook)
- Protected routes with authentication checks
- Automatic redirects based on auth state

### Dashboard Components

- **StatsCard**: Animated statistics cards
- **ProductTable**: Sortable product performance table
- **ChartCard**: Reusable chart container with legends
- **ProgressRing**: Circular progress indicators
- **RealTimePanel**: Live updating statistics

### Calendar Components

- **MonthView**: Full month calendar grid
- **EventCard**: Color-coded event display
- **MiniCalendar**: Compact date picker
- **PeopleList**: Contact management interface

## 🔧 Customization

### Colors

Update colors in `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    purple: "#605BFF",
    pink: "#EF37FF",
    orange: "#FF8F6B",
    // ... more colors
  }
}
```

### Data

Update mock data in `src/lib/data.ts`:

```typescript
export const todayStats = [
  // Your statistics data
];
```

### Charts

Customize charts in dashboard components using Recharts props.

## 🎨 Styling System

- **CSS Variables**: Consistent color system
- **Utility Classes**: Custom TailwindCSS utilities
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first responsive design
- **Dark Theme**: Complete dark mode implementation

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Perfect for tablets (768px+)
- **Desktop**: Full desktop experience (1024px+)
- **Large Screens**: Scales beautifully on large displays

## 🔮 Future Enhancements

- [ ] Real backend integration
- [ ] Advanced filtering and search
- [ ] Export functionality for reports
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Advanced calendar features
- [ ] User profile management
- [ ] Team collaboration features

## 📝 Development Notes

- All components are fully typed with TypeScript
- Follows React best practices and hooks patterns
- Modular component architecture
- Consistent naming conventions
- Comprehensive error handling
- Accessibility considerations built-in

## 🤝 Contributing

This is a production-ready template that can be customized for your specific needs. The codebase is well-structured and documented for easy modification and extension.

---

Built with ❤️ using modern web technologies and best practices.
