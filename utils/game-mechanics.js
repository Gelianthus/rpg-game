export function getMonsterAttackValue(level, xp) {
	const hit = level * 5 - Math.floor(Math.random() * xp);
	return hit > 0 ? hit : 0;
}

export function isMonsterHit(health) {
	return Math.random() > 0.2 || health < 20;
}

export function getNumbers() {
	const numbers = [];
	while (numbers.length < 10) {
		numbers.push(Math.floor(Math.random() * 11));
	}

	return numbers;
}
