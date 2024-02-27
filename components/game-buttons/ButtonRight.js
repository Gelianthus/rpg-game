"use client";

import { locations } from "@/utils/game-data";

export default function ButtonRight({
	fightMonsterHandle,
	withTimer,
	setTimeRunning,
	currentLocation,
	setCurrentLocation,
	gold,
	setGold,
	setFighting,
	setText,
	gameLog,
	setGameLog,
	restartHandle,
}) {
	const goToTownSquare = () => {
		setCurrentLocation(0);
		setText('You are in the town square. You see a sign that says "Store".');
	};

	return (
		<button
			className="cursor-pointer text-gray-950 bg-gray-200 p-1 border-gray-500 border-2 hover:bg-emerald-500 hover:text-neutral-50 hover:border-emerald-600 active:text-neutral-50 active:bg-emerald-600 active:border-emerald-700"
			onClick={() => {
				if (currentLocation === 0) {
					// fight dragon
					fightMonsterHandle(2);
					if (withTimer) {
						setTimeRunning(true);
					}
				} else if (currentLocation === 1) {
					goToTownSquare();
				} else if (currentLocation === 2) {
					goToTownSquare();
				} else if (currentLocation === 3) {
					// run
					setCurrentLocation(0);
					setFighting(null);
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
					goToTownSquare();
				}
			}}
		>
			{locations[currentLocation].button_text[2]}
		</button>
	);
}
