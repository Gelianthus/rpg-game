"use client";

import "@/utils/orig.css";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function Origninal() {
	let xp = 0;
	let health = 100;
	let gold = 50;
	let currentWeapon = 0;
	let fighting;
	let monsterHealth;
	let inventory = ["stick"];

	const button1Ref = useRef(null);
	const button2Ref = useRef(null);
	const button3Ref = useRef(null);
	const textRef = useRef(null);
	const xpTextRef = useRef(null);
	const healthTextRef = useRef(null);
	const goldTextRef = useRef(null);
	const monsterStatsRef = useRef(null);
	const monsterNameRef = useRef(null);
	const monsterHealthTextRef = useRef(null);

	const weapons = [
		{ name: "stick", power: 5 },
		{ name: "dagger", power: 30 },
		{ name: "claw hammer", power: 50 },
		{ name: "sword", power: 100 },
	];

	const monsters = [
		{
			name: "slime",
			level: 2,
			health: 15,
		},
		{
			name: "fanged beast",
			level: 8,
			health: 60,
		},
		{
			name: "dragon",
			level: 20,
			health: 300,
		},
	];

	const locations = [
		{
			name: "town square",
			"button text": ["Go to store", "Go to cave", "Fight dragon"],
			"button functions": [goStore, goCave, fightDragon],
			text: 'You are in the town square. You see a sign that says "Store".',
		},
		{
			name: "store",
			"button text": [
				"Buy 10 health (10 gold)",
				"Buy weapon (30 gold)",
				"Go to town square",
			],
			"button functions": [buyHealth, buyWeapon, goTown],
			text: "You enter the store.",
		},
		{
			name: "cave",
			"button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
			"button functions": [fightSlime, fightBeast, goTown],
			text: "You enter the cave. You see some monsters.",
		},
		{
			name: "fight",
			"button text": ["Attack", "Dodge", "Run"],
			"button functions": [attack, dodge, goTown],
			text: "You are fighting a monster.",
		},
		{
			name: "kill monster",
			"button text": [
				"Go to town square",
				"Go to town square",
				"Go to town square",
			],
			"button functions": [goTown, goTown, easterEgg],
			text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
		},
		{
			name: "lose",
			"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
			"button functions": [restart, restart, restart],
			text: "You die. &#x2620;",
		},
		{
			name: "win",
			"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
			"button functions": [restart, restart, restart],
			text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
		},
		{
			name: "easter egg",
			"button text": ["2", "8", "Go to town square?"],
			"button functions": [pickTwo, pickEight, goTown],
			text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
		},
	];

	function update(location) {
		monsterStatsRef.current.style.display = "none";
		button1Ref.current.innerText = location["button text"][0];
		button2Ref.current.innerText = location["button text"][1];
		button3Ref.current.innerText = location["button text"][2];
		button1Ref.current.onclick = location["button functions"][0];
		button2Ref.current.onclick = location["button functions"][1];
		button3Ref.current.onclick = location["button functions"][2];
		textRef.current.innerHTML = location.text;
	}

	function goTown() {
		update(locations[0]);
	}

	function goStore() {
		update(locations[1]);
	}

	function goCave() {
		update(locations[2]);
	}

	function buyHealth() {
		if (gold >= 10) {
			gold -= 10;
			health += 10;
			goldTextRef.current.innerText = gold;
			healthTextRef.current.innerText = health;
		} else {
			textRef.current.innerText = "You do not have enough gold to buy health.";
		}
	}

	function buyWeapon() {
		if (currentWeapon < weapons.length - 1) {
			if (gold >= 30) {
				gold -= 30;
				currentWeapon++;
				goldTextRef.current.innerText = gold;
				let newWeapon = weapons[currentWeapon].name;
				textRef.current.innerText = "You now have a " + newWeapon + ".";
				inventory.push(newWeapon);
				textRef.current.innerText +=
					" In your inventory you have: " + inventory;
			} else {
				textRef.current.innerText =
					"You do not have enough gold to buy a weapon.";
			}
		} else {
			textRef.current.innerText = "You already have the most powerful weapon!";
			button2Ref.current.innerText = "Sell weapon for 15 gold";
			button2.onclick = sellWeapon;
		}
	}

	function sellWeapon() {
		if (inventory.length > 1) {
			gold += 15;
			goldTextRef.current.innerText = gold;
			let currentWeapon = inventory.shift();
			textRef.current.innerText = "You sold a " + currentWeapon + ".";
			textRef.current.innerText += " In your inventory you have: " + inventory;
		} else {
			textRef.current.innerText = "Don't sell your only weapon!";
		}
	}

	function fightSlime() {
		fighting = 0;
		goFight();
	}

	function fightBeast() {
		fighting = 1;
		goFight();
	}

	function fightDragon() {
		fighting = 2;
		goFight();
	}

	function goFight() {
		update(locations[3]);
		monsterHealth = monsters[fighting].health;
		monsterStatsRef.current.style.display = "block";
		monsterNameRef.current.innerText = monsters[fighting].name;
		monsterHealthTextRef.current.innerText = monsterHealth;
	}

	function attack() {
		textRef.current.innerText = "The " + monsters[fighting].name + " attacks.";
		textRef.current.innerText +=
			" You attack it with your " + weapons[currentWeapon].name + ".";
		health -= getMonsterAttackValue(monsters[fighting].level);
		if (isMonsterHit()) {
			monsterHealth -=
				weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
		} else {
			textRef.current.innerText += " You miss.";
		}
		healthTextRef.current.innerText = health;
		monsterHealthTextRef.current.innerText = monsterHealth;
		if (health <= 0) {
			lose();
		} else if (monsterHealth <= 0) {
			if (fighting === 2) {
				winGame();
			} else {
				defeatMonster();
			}
		}
		if (Math.random() <= 0.1 && inventory.length !== 1) {
			textRef.current.innerText += " Your " + inventory.pop() + " breaks.";
			currentWeapon--;
		}
	}

	function getMonsterAttackValue(level) {
		const hit = level * 5 - Math.floor(Math.random() * xp);
		return hit > 0 ? hit : 0;
	}

	function isMonsterHit() {
		return Math.random() > 0.2 || health < 20;
	}

	function dodge() {
		textRef.current.innerText =
			"You dodge the attack from the " + monsters[fighting].name;
	}

	function defeatMonster() {
		gold += Math.floor(monsters[fighting].level * 6.7);
		xp += monsters[fighting].level;
		goldTextRef.current.innerText = gold;
		xpTextRef.current.innerText = xp;
		update(locations[4]);
	}

	function lose() {
		update(locations[5]);
	}

	function winGame() {
		update(locations[6]);
	}

	function restart() {
		xp = 0;
		health = 100;
		gold = 50;
		currentWeapon = 0;
		inventory = ["stick"];
		goldTextRef.current.innerText = gold;
		healthTextRef.current.innerText = health;
		xpTextRef.current.innerText = xp;
		goTown();
	}

	function easterEgg() {
		update(locations[7]);
	}

	function pickTwo() {
		pick(2);
	}

	function pickEight() {
		pick(8);
	}

	function pick(guess) {
		const numbers = [];
		while (numbers.length < 10) {
			numbers.push(Math.floor(Math.random() * 11));
		}
		textRef.current.innerText =
			"You picked " + guess + ". Here are the random numbers:\n";
		for (let i = 0; i < 10; i++) {
			textRef.current.innerText += numbers[i] + "\n";
		}
		if (numbers.includes(guess)) {
			textRef.current.innerText += "Right! You win 20 gold!";
			gold += 20;
			goldTextRef.current.innerText = gold;
		} else {
			textRef.current.innerText += "Wrong! You lose 10 health!";
			health -= 10;
			healthTextRef.current.innerText = health;
			if (health <= 0) {
				lose();
			}
		}
	}

	useEffect(() => {
		button1Ref.current.onclick = goStore;
		button2Ref.current.onclick = goCave;
		button3Ref.current.onclick = fightDragon;
	}, []);

	return (
		<div id="game-wrapper">
			<div id="game">
				<Link
					className="text-black border-2 border-black p-1 my-2 block w-fit text-sm ml-auto hover:bg-black hover:text-white active:bg-black active:text-white"
					href={"/"}
				>
					Go back
				</Link>
				<div id="stats">
					<span className="stat">
						XP:{" "}
						<strong>
							<span
								ref={xpTextRef}
								id="xpText"
							>
								0
							</span>
						</strong>
					</span>
					<span className="stat">
						Health:{" "}
						<strong>
							<span
								ref={healthTextRef}
								id="healthText"
							>
								100
							</span>
						</strong>
					</span>
					<span className="stat">
						Gold:{" "}
						<strong>
							<span
								ref={goldTextRef}
								id="goldText"
							>
								50
							</span>
						</strong>
					</span>
				</div>
				<div id="controls">
					<button
						className="btns"
						ref={button1Ref}
						id="button1"
					>
						Go to store
					</button>
					<button
						className="btns"
						ref={button2Ref}
						id="button2"
					>
						Go to cave
					</button>
					<button
						className="btns"
						ref={button3Ref}
						id="button3"
					>
						Fight dragon
					</button>
				</div>
				<div
					ref={monsterStatsRef}
					id="monsterStats"
				>
					<span className="stat">
						Monster Name:{" "}
						<strong>
							<span
								ref={monsterNameRef}
								id="monsterName"
							></span>
						</strong>
					</span>
					<span className="stat">
						Health:{" "}
						<strong>
							<span
								ref={monsterHealthTextRef}
								id="monsterHealth"
							></span>
						</strong>
					</span>
				</div>
				<div
					ref={textRef}
					id="text"
				>
					Welcome to Dragon Repeller. You must defeat the dragon that is
					preventing people from leaving the town. You are in the town square.
					Where do you want to go? Use the buttons above.
				</div>
			</div>
		</div>
	);
}
