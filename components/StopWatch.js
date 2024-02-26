"use client";

import { useEffect } from "react";
import { formattedTime } from "@/utils/formattedTime";

export default function StopWatch({ withTimer, time, setTime, timeRunning }) {
	useEffect(() => {
		let intervalId;
		if (timeRunning && withTimer) {
			// setting time from 0 to 1 every 10 milisecond using javascript setInterval method
			intervalId = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [timeRunning, time]);

	return (
		<div className={`${withTimer ? "block" : "hidden"} mt-4`}>
			<p className="text-center mx-auto bg-gray-300  p-2">
				{formattedTime(time)}
			</p>
		</div>
	);
}
