"use client";
import { weapons, monsters, locations, initialText } from "@/utils/game-data";
import { useState, useEffect } from "react";
import ButtonLeft from "./game-buttons/ButtonLeft";
import ButtonCenter from "./game-buttons/ButtonCenter";
import ButtonRight from "./game-buttons/ButtonRight";
import StopWatch from "./StopWatch";
import SubmitRecord from "./SubmitRecord";

export default function NormalMode() {
	const [withTimer, setWithTimer] = useState(false);
	const [timeRunning, setTimeRunning] = useState(false);
	const [time, setTime] = useState(0);
	const [submitVisible, setSubmitVisible] = useState(false);

	const [currentLocation, setCurrentLocation] = useState(0);
	const [xp, setXp] = useState(0);
	const [health, setHealth] = useState(100);
	const [gold, setGold] = useState(50);
	const [currentWeapon, setCurrentWeapon] = useState(0);
	const [inventory, setInventory] = useState(["stick"]);
	const [fighting, setFighting] = useState(null);
	const [monsterHealth, setMonsterHealth] = useState(null);
	const [text, setText] = useState(initialText);
	const [gameLog, setGameLog] = useState([]);

	useEffect(() => {
		if (health <= 0) {
			setCurrentLocation(5);
			setText("You died!");
			setTimeRunning(false);
		}
	}, [health]);

	const restartHandle = () => {
		setSubmitVisible(false);
		setCurrentLocation(0);
		setXp(0);
		setHealth(100);
		setGold(50);
		setCurrentWeapon(0);
		setInventory(["stick"]);
		setFighting(null);
		setMonsterHealth(null);
		setText(initialText);
		setGameLog([]);
		setTime(0);
		setTimeRunning(false);
	};

	return (
		<div className="p-2 xs:p-8 sm:py-8 sm:px-16 sm:max-w-2xl mx-auto ">
			<div className="flex flex-row gap-4 flex-wrap">
				<span className="font-semibold text-purple-800">
					XP:{" "}
					<span className="text-gray-950">
						{xp}
						{xp > 79 && " (max)"}
					</span>
				</span>
				<span className="font-semibold text-green-600">
					Health:{" "}
					<span className="text-gray-950">
						{health} {health > 299 && " (max)"}
					</span>
				</span>
				<span className="font-semibold text-amber-600">
					Gold: <span className="text-gray-950">{gold}</span>
				</span>
			</div>
			<div className="flex flex-col sm:flex-row gap-1 flex-wrap my-2 text-sm">
				<ButtonLeft
					withTimer={withTimer}
					setSubmitVisible={setSubmitVisible}
					setTimeRunning={setTimeRunning}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
					xp={xp}
					setXp={setXp}
					health={health}
					setHealth={setHealth}
					gold={gold}
					setGold={setGold}
					currentWeapon={currentWeapon}
					fighting={fighting}
					setFighting={setFighting}
					monsterHealth={monsterHealth}
					setMonsterHealth={setMonsterHealth}
					text={text}
					setText={setText}
					gameLog={gameLog}
					setGameLog={setGameLog}
					restartHandle={restartHandle}
				/>
				<ButtonCenter
					withTimer={withTimer}
					setTimeRunning={setTimeRunning}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
					xp={xp}
					health={health}
					setHealth={setHealth}
					gold={gold}
					setGold={setGold}
					currentWeapon={currentWeapon}
					setCurrentWeapon={setCurrentWeapon}
					inventory={inventory}
					setInventory={setInventory}
					fighting={fighting}
					setFighting={setFighting}
					setMonsterHealth={setMonsterHealth}
					text={text}
					setText={setText}
					gameLog={gameLog}
					setGameLog={setGameLog}
					restartHandle={restartHandle}
				/>
				<ButtonRight
					withTimer={withTimer}
					setTimeRunning={setTimeRunning}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
					gold={gold}
					setGold={setGold}
					setFighting={setFighting}
					setMonsterHealth={setMonsterHealth}
					text={text}
					setText={setText}
					gameLog={gameLog}
					setGameLog={setGameLog}
					restartHandle={restartHandle}
				/>
			</div>
			<div
				className={`${
					currentLocation === 3 ? "block" : "hidden"
				} flex flex-row gap-2 flex-wrap my-2`}
			>
				<span className="font-semibold">
					Monster Name: <span>{monsters[fighting]?.name}</span>
				</span>
				<span className="font-semibold">
					Health: <span>{monsterHealth}</span>
				</span>
			</div>
			<p className="p-4 bg-neutral-200 border-gray-500 border-2 my-2">{text}</p>
			<button
				disabled={timeRunning === true}
				className={`${
					withTimer
						? "bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600"
						: "bg-amber-400 hover:bg-amber-500 active:bg-amber-600"
				} p-2 text-gray-950 block mx-auto mt-8 mb-4`}
				onClick={() => {
					restartHandle();
					setWithTimer((prevState) => !prevState);
				}}
			>
				Toggle Speedrun Mode
			</button>
			<StopWatch
				withTimer={withTimer}
				time={time}
				setTime={setTime}
				timeRunning={timeRunning}
				setTimeRunning={setTimeRunning}
			/>
			{submitVisible && withTimer ? (
				<SubmitRecord
					time={time}
					restartHandle={restartHandle}
				/>
			) : (
				<></>
			)}
		</div>
	);
}
