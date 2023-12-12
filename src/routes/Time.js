import React, { useState, useEffect } from "react";

function Time({ time }) {
    const [convertedTime, setConvertedTime] = useState(timeFunction(time));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setConvertedTime(timeFunction(time));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [time]);
    /**
     * timestamp 형식의 시간 값 받아와서 한국 시간으로 리턴
     * @param {*} time 
     * @returns 시:분:초 형식으로 리턴함
     */
    function timeFunction(time) {
        const date = new Date(time);
        const options = { month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleString('ko-KR', options);
        const hours = String(Math.floor(((time / (1000 * 60 * 60)) + 9) % 24)).padStart(2, "0"); // 시
        const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0"); // 분
        const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0"); // 초
        return `${formattedDate} ${hours}:${minutes}:${seconds}`
    }
    return <div>{convertedTime}</div>;
}

export default Time;
