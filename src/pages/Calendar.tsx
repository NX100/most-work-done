import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { calendarEvents, people } from "../lib/data";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const viewModes = ["Day", "Week", "Month", "Year"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2021, 11, 2)); // December 2, 2021
  const [selectedView, setSelectedView] = useState("Month");
  const [selectedDate, setSelectedDate] = useState(3); // Selected date in calendar

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];

  // Previous month days
  const prevMonth = new Date(year, month - 1, 0);
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonth.getDate() - i,
      isCurrentMonth: false,
      isNextMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isNextMonth: false,
    });
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isNextMonth: true,
    });
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `2021-12-${day.toString().padStart(2, "0")}`;
    return calendarEvents.filter((event) => event.date === dateStr);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  const EventCard = ({ event }: { event: any }) => (
    <div
      className="text-xs px-2 py-1 rounded-sm mb-1 text-dark-100 font-medium calendar-event"
      style={{ backgroundColor: event.color }}
    >
      {event.title}
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-100 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-dark-200 p-6 border-r border-white/5">
        {/* Create Schedule Button */}
        <button className="w-full btn-primary flex items-center justify-center gap-2 mb-6">
          <PlusIcon className="w-4 h-4" />
          Create Schedule
        </button>

        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="card-dark p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">
                {months[month]} {year}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={`mini-day-${index}`}
                  className="text-center text-xs text-white/60 font-semibold py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 3; // Adjust for December starting on Wednesday
                const isInMonth = day > 0 && day <= 31;
                const actualDay = isInMonth
                  ? day
                  : day > 31
                    ? day - 31
                    : 30 + day;

                return (
                  <button
                    key={i}
                    className={`
                      text-center py-1 text-xs rounded relative
                      ${
                        isInMonth
                          ? "text-white hover:bg-white/10"
                          : "text-white/30"
                      }
                      ${day === selectedDate ? "bg-brand-purple text-white" : ""}
                    `}
                    onClick={() => isInMonth && setSelectedDate(day)}
                  >
                    {actualDay}
                    {day === selectedDate && (
                      <div className="absolute inset-0 bg-brand-purple rounded-full shadow-lg"></div>
                    )}
                    <span className="relative z-10">{actualDay}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* People Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">People</h3>

          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search for People"
              className="w-full bg-dark-400 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white/70 placeholder:text-white/40 text-sm"
            />
          </div>

          {/* People List */}
          <div className="space-y-3">
            {people.map((person) => (
              <div key={person.id} className="flex items-center gap-3 py-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-dark-100"
                  style={{ backgroundColor: person.color }}
                >
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {person.name}
                  </p>
                  <p className="text-white/50 text-xs truncate">
                    {person.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Schedule Button */}
        <button className="w-full mt-6 bg-transparent border border-brand-purple text-brand-purple hover:bg-brand-purple/10 transition-colors py-3 px-4 rounded-lg text-sm font-medium">
          My Schedule
        </button>
      </div>

      {/* Main Calendar */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Calendar</h1>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {viewModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedView(mode)}
                className={`
                  px-4 py-2 rounded-md text-sm font-semibold transition-colors
                  ${
                    selectedView === mode
                      ? "bg-brand-purple text-white"
                      : "text-white/70 hover:text-white"
                  }
                `}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="card-dark">
          {/* Calendar Header */}
          <div className="border-b border-white/5 p-4 flex items-center justify-between">
            <h2 className="text-white font-semibold">
              {months[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth("prev")}
                className="p-2 text-white/60 hover:text-white"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className="p-2 text-white/60 hover:text-white"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-white/5">
            {daysOfWeek.map((day, index) => (
              <div
                key={`main-day-${index}`}
                className="p-4 text-center text-white font-semibold border-r border-white/5 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((calendarDay, index) => {
              const events = calendarDay.isCurrentMonth
                ? getEventsForDate(calendarDay.day)
                : [];

              return (
                <div
                  key={index}
                  className={`
                    min-h-[120px] p-3 border-r border-b border-white/5 last:border-r-0
                    ${!calendarDay.isCurrentMonth ? "bg-white/5" : ""}
                    ${calendarDay.day === 2 && calendarDay.isCurrentMonth ? "border-t-2 border-t-brand-orange" : ""}
                  `}
                >
                  <div
                    className={`
                      text-xl font-semibold mb-2
                      ${
                        calendarDay.isCurrentMonth
                          ? "text-white"
                          : "text-white/30"
                      }
                      ${calendarDay.day === 2 && calendarDay.isCurrentMonth ? "text-brand-orange" : ""}
                    `}
                  >
                    {calendarDay.day}
                  </div>

                  <div className="space-y-1">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                    {calendarDay.day === 2 && calendarDay.isCurrentMonth && (
                      <div className="text-xs px-2 py-1 rounded-sm bg-brand-purple/20 border border-brand-purple text-brand-purple font-medium">
                        More
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
