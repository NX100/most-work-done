import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  Cog6ToothIcon,
  StarIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  CalendarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isCollapsed?: boolean;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    isActive: true,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartBarIcon,
  },
  {
    name: "Quiz",
    href: "/quiz",
    icon: AcademicCapIcon,
    badge: "New",
  },
  {
    name: "Invoice",
    href: "/invoice",
    icon: DocumentIcon,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: ClockIcon,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarIcon,
    hasGradient: true,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: ChatBubbleLeftRightIcon,
    badge: "49",
  },
  {
    name: "Notification",
    href: "/notification",
    icon: BellIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
  },
  {
    name: "Favourite",
    href: "/favourite",
    icon: StarIcon,
  },
  {
    name: "History",
    href: "/history",
    icon: ClockIcon,
  },
];

export default function Sidebar({ isCollapsed = false }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="h-screen w-[218px] bg-dark-100 border-r border-white/5 flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  sidebar-item group flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-brand-purple text-dark-100 shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }
                  ${item.hasGradient && isActive ? "bg-gradient-to-r from-brand-purple/20 to-transparent border-r-2 border-brand-purple" : ""}
                `}
              >
                <div className="relative flex items-center gap-3 w-full">
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-dark-100" : "text-white/60 group-hover:text-white"}`}
                  />
                  <span
                    className={`${isActive ? "text-dark-100 font-semibold" : ""}`}
                  >
                    {item.name}
                  </span>

                  {/* Badge */}
                  {item.badge && (
                    <div className="ml-auto">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                          item.badge === "New"
                            ? "text-brand-purple bg-brand-purple/20 border border-brand-purple"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || "Easin Arafat"}
            </p>
            <p className="text-xs text-white/50 truncate">Free Account</p>
          </div>
          <button
            onClick={logout}
            className="p-1 text-white/40 hover:text-white transition-colors"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
