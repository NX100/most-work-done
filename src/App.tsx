import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="loading-pulse">
          <div className="w-8 h-8 bg-brand-purple rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public Route wrapper (redirects to dashboard if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="loading-pulse">
          <div className="w-8 h-8 bg-brand-purple rounded-full"></div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Dashboard Layout wrapper
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-dark-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

// Placeholder components for routes not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-white/60">This page is coming soon...</p>
        <div className="mt-8">
          <div className="w-16 h-16 bg-brand-purple/20 rounded-full mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-brand-purple rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Calendar />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Analytics" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Invoice" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Schedule" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Messages" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Notifications" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Settings" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourite"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="Favourites" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaceholderPage title="History" />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-dark-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404</h1>
              <p className="text-white/60 mb-8">Page not found</p>
              <a
                href="/dashboard"
                className="btn-primary inline-block text-decoration-none"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dark-100">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
