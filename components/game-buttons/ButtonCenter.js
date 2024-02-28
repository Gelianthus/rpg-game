"use client";

import { weapons, monsters, locations } from "@/utils/game-data";
import { getMonsterAttackValue, getNumbers } from "@/utils/game-mechanics";

export default function ButtonCenter({
	fightMonsterHandle,
	withTimer,
	setTimeRunning,
	currentLocation,
	setCurrentLocation,
	xp,
	health,
	setHealth,
	gold,
	setGold,
	currentWeapon,
	setCurrentWeapon,
	inventory,
	setInventory,
	fighting,
	setText,
	restartHandle,
}) {
	return (
		<button
			className="cursor-pointer text-gray-950 bg-gray-200 p-1 border-gray-500 border-2 hover:bg-emerald-500 hover:text-neutral-50 hover:border-emerald-600 active:text-neutral-50 active:bg-emerald-600 active:border-emerald-700"
			onClick={() => {
				if (currentLocation === 0) {
					// go to cave
					setCurrentLocation(2);
					setText("You enter the cave. You see some monsters.");
					if (withTimer) {
						setTimeRunning(true);
					}
				} else if (currentLocation === 1) {
					// buy weapon
					if (currentWeapon < weapons.length - 1) {
						if (gold >= 30 + currentWeapon * 10) {
							setGold(gold - 30);
							setCurrentWeapon(currentWeapon + 1);
							setText(`You've received ${weapons[currentWeapon + 1]?.name}.`);
							setInventory((prevState) => [
								...prevState,
								weapons[currentWeapon + 1]?.name,
							]);
						} else {
							setText("You do not have enough gold to buy a weapon.");
						}
					} else {
						setText("You already have the most powerful weapon!");
					}
				} else if (currentLocation === 2) {
					// fight fanged beast
					fightMonsterHandle(1);
				} else if (currentLocation === 3) {
					// dodge
					if (Math.random() < 0.2) {
						setText(
							"You tried to dodge the monster's attack but it grazed you."
						);
						const monsterLevel = monsters[fighting]?.level;
						const mitigatedDamage =
							getMonsterAttackValue([monsterLevel], xp) / 4 < 1
								? 2
								: getMonsterAttackValue([monsterLevel], xp) / 3;
						setHealth(health - Math.floor(mitigatedDamage));
						console.log(Math.floor(mitigatedDamage));
					} else if (Math.random() < 0.9) {
						setText("You successfully dodged the monster's attack.");
					} else {
						setText(
							"You swiftly dodged the monster's attack and was able to recuperate some damage taken."
						);
						const healAmount =
							getMonsterAttackValue(monsters[fighting]?.level) / 2 < 10
								? 10
								: getMonsterAttackValue(monsters[fighting]?.level) / 2;
						setHealth(health + healAmount);
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
					// pick 8
					const numbers = getNumbers();
					if (numbers.includes(8)) {
						setText("Right! You win 20 gold!");
						setGold(gold + 20);
					} else {
						if (health <= 10) {
							setCurrentLocation(5);
							setHealth(0);
							setText("Wrong! You died from gambling!");
						} else {
							setHealth(health - 10);
							setText("Wrong! You lose 10 health!");
						}
					}
				}
			}}
		>
			{locations[currentLocation].button_text[1]}{" "}
			{currentLocation === 1 &&
				(inventory.length === 4 ? "(max)" : 30 + currentWeapon * 10)}
		</button>
	);
}
