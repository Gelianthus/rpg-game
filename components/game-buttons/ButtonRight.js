"use client";

import { weapons, monsters, locations, initialText } from "@/utils/game-data";

export default function ButtonRight({
	withTimer,
	setTimeRunning,
	currentLocation,
	setCurrentLocation,
	gold,
	setGold,
	setFighting,
	setMonsterHealth,
	text,
	setText,
	gameLog,
	setGameLog,
	restartHandle,
}) {
	return (
		<button
			className="cursor-pointer text-gray-950 bg-gray-200 p-1 border-gray-500 border-2 hover:bg-emerald-500 hover:text-neutral-50 hover:border-emerald-600 active:text-neutral-50 active:bg-emerald-600 active:border-emerald-700"
			onClick={() => {
				if (currentLocation === 0) {
					// fight dragon
					setCurrentLocation(3);
					setFighting(2);
					setMonsterHealth(monsters[2]?.health);
					setText(`You've engaged the ${monsters[2]?.name} into combat.`);
					if (withTimer) {
						setTimeRunning(true);
					}
				} else if (currentLocation === 1) {
					// go to town square
					setCurrentLocation(0);
					setText(
						'You are in the town square. You see a sign that says "Store".'
					);
				} else if (currentLocation === 2) {
					// go to town square
					setCurrentLocation(0);
					setText(
						'You are in the town square. You see a sign that says "Store".'
					);
				} else if (currentLocation === 3) {
					// run
					setCurrentLocation(0);
					setText(
						"You've managed to run away from the monster but loss some gold on the way out."
					);
					if (gold <= 15) {
						setGold(0);
					} else {
						setGold(gold - 15);
					}
				} else if (currentLocation === 4) {
					// easter egg
					setCurrentLocation(7);
					setText(
						"You've discovered an Easter Egg, Pick a number for a chance to win gold or lose health."
					);
				} else if (currentLocation === 5) {
					restartHandle();
				} else if (currentLocation === 6) {
					restartHandle();
				} else if (currentLocation === 7) {
					// go to town square
					setCurrentLocation(0);
					setText(
						'You are in the town square. You see a sign that says "Store".'
					);
				}
			}}
		>
			{locations[currentLocation].button_text[2]}
		</button>
	);
}
