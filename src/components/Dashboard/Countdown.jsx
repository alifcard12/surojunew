import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";

const Countdown = () => {
  const [acara, setAcara] = useState([]);
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    fetchAcara();
  }, []);

  const fetchAcara = async () => {
    try {
      const response = await newRequest.get("/api/acara/"); // Ganti dengan URL yang sesuai untuk mengambil data acara dari server
      const data = response.data;
      setAcara(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (acara.length > 0) {
      const targetAcara = acara.find((item) => item.countdown === "Y");
      if (targetAcara) {
        const [tglAcara, _] = targetAcara.tglAcara.split("T");
        const [year, month, day] = tglAcara.split("-");
        const [hours, minutes] = targetAcara.waktuMulai.split(":");

        const targetDate = new Date(year, month - 1, day, hours, minutes);

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
      }
    }
  }, [acara]);

  return (
    <div className="text-center">
      <h2 className="sm:text-xl text-lg pt-3 text-primary-500">Countdown to Event</h2>
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
