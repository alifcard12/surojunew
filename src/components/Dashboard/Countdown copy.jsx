import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const targetDate = new Date("2023-07-01T00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
        const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0");
        const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");

        setDays(daysLeft);
        setHours(hoursLeft);
        setMinutes(minutesLeft);
        setSeconds(secondsLeft);
      } else {
        clearInterval(interval);
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <div className="text-center">
      <h2 className="sm:text-xl text-lg pt-3 text-primary-500">Countdown to event</h2>
      <div className="sm:text-4xl text-2xl mt-2 flex justify-evenly mb-6">
        <div className="text-primary-100 font-medium pt-1 bg-primary-500 rounded-lg shadow-lg">
          {days}
          <div className="text-sm font-light text-primary-100 bg-primary-600 w-14 rounded-b-lg py- mt-1">Hari</div>
        </div>
        <div className="text-primary-100 font-medium pt-1 bg-primary-500 rounded-lg shadow-lg">
          {hours}
          <div className="text-sm font-light text-primary-100 bg-primary-600 w-14 rounded-b-lg py- mt-1">Jam</div>
        </div>
        <div className="text-primary-100 font-medium pt-1 bg-primary-500 rounded-lg shadow-lg">
          {minutes}
          <div className="text-sm font-light text-primary-100 bg-primary-600 w-14 rounded-b-lg py- mt-1">Menit</div>
        </div>
        <div className="text-primary-100 font-medium pt-1 bg-primary-500 rounded-lg shadow-lg">
          {seconds}
          <div className="text-sm font-light text-primary-100 bg-primary-600 w-14 rounded-b-lg py- mt-1">Detik</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
