import React, { useState, useEffect } from "react";

function ElapsedTime({ time }) {
  const [elapsedTime, setElapsedTime] = useState(timeFunction(time));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(timeFunction(time));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);
  /**
   * timestamp 형식의 시간 값 받아와서 지금으로부터 지난 시간을 리턴
   * @param {*} time 
   * @returns 지난 시간을 시:분:초 형식으로 리턴함
   */
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
