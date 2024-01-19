"use client";
import MyCalendar from "@/components/planning/MyCalendar";

export default function PlanningPage() {
  return (
    <div>
      <h1 >Planning des missions</h1>
      <div className="d-flex flex-column justify-content-center my-4">
        <div className="text-center mx-4">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
}
