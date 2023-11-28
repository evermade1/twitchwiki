import React, { useState, useEffect } from "react";

function ElapsedTime({ time }) {
  const [elapsedTime, setElapsedTime] = useState(timeFunction(time));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(timeFunction(time));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  function timeFunction(time) {
    const now = Date.now();
    const timeDiff = now - time;
    const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, "0"); // 시
    const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, "0"); // 분
    const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0"); // 초
    return `${hours}:${minutes}:${seconds}`
}

  return <div style={{ fontSize: 15 }}>{elapsedTime}</div>;
}

export default ElapsedTime;
