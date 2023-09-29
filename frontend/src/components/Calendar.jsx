import React, { useState } from "react";
import { generateDate, months } from "../utils/generateDate";
import dayjs from "dayjs";
import conditions from "../utils/conditions";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  //   const days = [
  //     "Saturday",
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //   ];

  return (
    <div className="flex flex-col sm:flex-row w-1/2 sm:mx-auto  sm:mt-5 sm:divide-x-2 sm:gap-10 h-screen items-start">
      <div className="w-96 h-96 ">
        {/* displaying the month and year*/}
        <div className="flex justify-between px-6 ">
          <h1 className="font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex items-center gap-5">
            {/* Button showing previous month */}
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer"
              onClick={() => setToday(today.month(today.month() - 1))}
            />
            {/* button taking us to be today */}
            <h1
              className="cursor-pointer"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            {/* Button showing previous month */}
            <GrFormNext
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        {/* getting the days */}
        <div className="w-full grid grid-cols-7 text-gray-700 px-4">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="h-14 grid place-content-center text-sm"
              >
                {day}
              </h1>
            );
          })}
        </div>
        {/* generating date in the calendar */}
        <div className="w-full grid grid-cols-7 px-4">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="h-14 border grid place-content-center text-sm"
                >
                  <h1
                    className={conditions(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectedDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : "",
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
                    )}
                    onClick={() => {
                      setSelectedDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="h-96 w-96 px-4 pt-3 mt-8 sm:px-5">
        <h1 className="font-semibold">
          Sessions Status for {selectedDate.toDate().toDateString()}
        </h1>
        <p>Morning Session: Booked by a volunteer</p>
        <p>Evening Session: Booked by a volunteer</p>
      </div>
    </div>
  );
}

export default Calendar;
