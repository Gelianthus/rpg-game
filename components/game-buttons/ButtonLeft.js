"use client";

import { weapons, monsters, locations } from "@/utils/game-data";
import {
	isMonsterHit,
	getMonsterAttackValue,
	getNumbers,
} from "@/utils/game-mechanics";

export default function ButtonLeft({
	fightMonsterHandle,
	withTimer,
	setSubmitVisible,
	setTimeRunning,
	currentLocation,
	setCurrentLocation,
	xp,
	setXp,
	health,
	setHealth,
	gold,
	setGold,
	currentWeapon,
	fighting,
	monsterHealth,
	setMonsterHealth,
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
					// go to store
					setCurrentLocation(1);
					setText(locations[currentLocation]?.text);
					if (withTimer) {
						setTimeRunning(true);
					}
				} else if (currentLocation === 1) {
					// buy health
					if (gold >= 10) {
						if (health >= 300) {
							setText("You're already at maximum health points");
						} else if (health < 301 && health + 10 > 300) {
							setGold(gold - 10);
							setHealth(300);
							setText("Successfully purchased health points");
						} else {
							setHealth(health + 10);
							setGold(gold - 10);
							setText("Successfully purchased health points");
						}
					} else {
						setText("You do not have enough gold to buy health points.");
					}
				} else if (currentLocation === 2) {
					// fight slime
					fightMonsterHandle(0);
				} else if (currentLocation === 3) {
					// attack
					let damage = 0;

					setHealth(() => {
						return health - getMonsterAttackValue(monsters[fighting].level, xp);
					});
					if (isMonsterHit(health)) {
						damage =
							weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
						setMonsterHealth(monsterHealth - damage);
						setText(
							`You exchanged attack with ${fighting === 2 ? "the" : "a"} ${
								monsters[fighting]?.name
							}. \n You attack with your ${weapons[currentWeapon]?.name}`
						);
					} else {
						setText(
							`You exchanged attack with the ${monsters[fighting]?.name}. \n You attack with your ${weapons[currentWeapon]?.name} \n You missed.`
						);
					}
					if (damage >= monsterHealth) {
						if (fighting === 2) {
							setCurrentLocation(6);
							setText("You defeated the dragon! YOU WIN THE GAME!");
							setSubmitVisible(true);
							setTimeRunning(false);
						} else {
							setCurrentLocation(4);
							setGold(gold + Math.floor(monsters[fighting]?.level * 6.7));
							if (xp + monsters[fighting]?.level < 81) {
								setXp(xp + monsters[fighting]?.level);
							} else {
								setXp(80);
							}
							setText(
								'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
							);
						}
					}
				} else if (currentLocation === 4) {
					// go to town square
					setCurrentLocation(0);
					setText(
						'You are in the town square. You see a sign that says "Store".'
					);
				} else if (currentLocation === 5) {
					restartHandle();
				} else if (currentLocation === 6) {
					restartHandle();
				} else if (currentLocation === 7) {
					// pick 2
					const numbers = getNumbers();
					if (numbers.includes(2)) {
						setText("Right! You win 20 gold!");
						setGold(gold + 20);
					} else {
						if (health <= 10) {
							setCurrentLocation(5);
							setHealth(0);
							setText("Wrong! You died from gambling!");
							setTimeRunning(false);
						} else {
							setHealth(health - 10);
							setText("Wrong! You lose 10 health!");
						}
					}
				}
			}}
		>
			{locations[currentLocation].button_text[0]}
		</button>
	);
}
