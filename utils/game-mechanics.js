import { locations } from "@/utils/game-data";

function update(location) {
	monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
	text.innerHTML = location.text;
}

function goTown(location) {
	// 0
	update(locations[location]);
}

function goStore(location) {
	// 1
	update(locations[location]);
}

function goCave(location) {
	// 2
	update(locations[location]);
}

function buyHealth() {
	if (gold >= 10) {
		gold -= 10;
		health += 10;
		goldText.innerText = gold;
		healthText.innerText = health;
	} else {
		text.innerText = "You do not have enough gold to buy health.";
	}
}

function buyWeapon() {
	if (currentWeapon < weapons.length - 1) {
		if (gold >= 30) {
			gold -= 30;
			currentWeapon++;
			goldText.innerText = gold;
			let newWeapon = weapons[currentWeapon].name;
			text.innerText = "You now have a " + newWeapon + ".";
			inventory.push(newWeapon);
			text.innerText += " In your inventory you have: " + inventory;
		} else {
			text.innerText = "You do not have enough gold to buy a weapon.";
		}
	} else {
		text.innerText = "You already have the most powerful weapon!";
		button2.innerText = "Sell weapon for 15 gold";
		button2.onclick = sellWeapon;
	}
}

function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
		let currentWeapon = inventory.shift();
		text.innerText = "You sold a " + currentWeapon + ".";
		text.innerText += " In your inventory you have: " + inventory;
	} else {
		text.innerText = "Don't sell your only weapon!";
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
	monsterStats.style.display = "block";
	monsterName.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}

function attack() {
	text.innerText = "The " + monsters[fighting].name + " attacks.";
	text.innerText +=
		" You attack it with your " + weapons[currentWeapon].name + ".";
	health -= getMonsterAttackValue(monsters[fighting].level);
	if (isMonsterHit()) {
		monsterHealth -=
			weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	} else {
		text.innerText += " You miss.";
	}
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;
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
		text.innerText += " Your " + inventory.pop() + " breaks.";
		currentWeapon--;
	}
}

export function getMonsterAttackValue(level, xp) {
	const hit = level * 5 - Math.floor(Math.random() * xp);
	return hit > 0 ? hit : 0;
}

export function isMonsterHit(health) {
	return Math.random() > 0.2 || health < 20;
}

function dodge() {
	text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
	gold += Math.floor(monsters[fighting].level * 6.7);
	xp += monsters[fighting].level;
	goldText.innerText = gold;
	xpText.innerText = xp;
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
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
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

export function getNumbers() {
	const numbers = [];
	while (numbers.length < 10) {
		numbers.push(Math.floor(Math.random() * 11));
	}

	return numbers;
	// if (numbers.includes(guess)) {
	// 	text.innerText += "Right! You win 20 gold!";
	// 	gold += 20;
	// 	goldText.innerText = gold;
	// } else {
	// 	text.innerText += "Wrong! You lose 10 health!";
	// 	health -= 10;
	// 	healthText.innerText = health;
	// 	if (health <= 0) {
	// 		lose();
	// 	}
	// }
}
