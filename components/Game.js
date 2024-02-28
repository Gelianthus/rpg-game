"use client";

import { monsters, initialText } from "@/utils/game-data";
import { useState, useEffect } from "react";
import ButtonLeft from "./game-buttons/ButtonLeft";
import ButtonCenter from "./game-buttons/ButtonCenter";
import ButtonRight from "./game-buttons/ButtonRight";
import StopWatch from "./StopWatch";
import SubmitRecord from "./SubmitRecord";

export default function Game() {
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
		setTime(0);
		setTimeRunning(false);
	};

	const fightMonsterHandle = (monsterIndex) => {
		setCurrentLocation(3);
		setFighting(monsterIndex);
		setMonsterHealth(monsters[monsterIndex]?.health);
		setText(
			`You've engaged ${monsterIndex === 2 ? "the" : "a"} ${
				monsters[monsterIndex]?.name
			} into combat.`
		);
	};

	return (
		<div className="py-2 xs:p-4 sm:py-8 sm:px-16 sm:max-w-2xl mx-auto ">
			<div className="flex flex-row gap-4  text-xs xs:text-sm sm:text-base">
				<span className="font-semibold text-purple-800">
					XP: <span className="text-gray-950">{xp}</span>
				</span>
				<span className="font-semibold text-green-600">
					Health: <span className="text-gray-950">{health}</span>
				</span>
				<span className="font-semibold text-yellow-500">
					Gold: <span className="text-gray-950">{gold}</span>
				</span>
			</div>
			<div className="flex flex-col sm:flex-row gap-1 flex-wrap my-2 text-sm">
				<ButtonLeft
					fightMonsterHandle={fightMonsterHandle}
					withTimer={withTimer}
					setSubmitVisible={setSubmitVisible}
					setTimeRunning={setTimeRunning}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
					setFighting={setFighting}
					xp={xp}
					setXp={setXp}
					health={health}
					setHealth={setHealth}
					gold={gold}
					setGold={setGold}
					currentWeapon={currentWeapon}
					fighting={fighting}
					monsterHealth={monsterHealth}
					setMonsterHealth={setMonsterHealth}
					setText={setText}
					restartHandle={restartHandle}
				/>
				<ButtonCenter
					fightMonsterHandle={fightMonsterHandle}
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
					setText={setText}
					restartHandle={restartHandle}
				/>
				<ButtonRight
					fightMonsterHandle={fightMonsterHandle}
					withTimer={withTimer}
					setTimeRunning={setTimeRunning}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
					gold={gold}
					setGold={setGold}
					setFighting={setFighting}
					setText={setText}
					restartHandle={restartHandle}
				/>
			</div>
			<div className={` flex flex-row gap-2 flex-wrap my-2`}>
				<span>
					Currently Fighting:{" "}
					<strong>
						<span>{monsters[fighting]?.name || "none"}</span>
					</strong>
				</span>

				<span>
					Monster Health:{" "}
					<strong>
						<span>{monsterHealth <= 0 ? "" : monsterHealth}</span>
					</strong>
				</span>
			</div>
			<p className="p-4 bg-neutral-200 border-gray-500 border-2 my-2 h-64 sm:h-48">
				{text}
			</p>
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
