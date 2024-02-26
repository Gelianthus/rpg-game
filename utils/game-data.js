const initialText =
	"Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.";

const weapons = [
	{ name: "stick", power: 5 },
	{ name: "dagger", power: 30 },
	{ name: "claw hammer", power: 50 },
	{ name: "sword", power: 100 },
];

const monsters = [
	{
		name: "Slime",
		level: 2,
		health: 15,
	},
	{
		name: "Fanged Beast",
		level: 8,
		health: 60,
	},
	{
		name: "Dragon",
		level: 20,
		health: 300,
	},
];

const locations = [
	{
		name: "Town Square",
		button_text: ["Go to store", "Go to cave", "Fight dragon"],
		text: 'You are in the town square. You see a sign that says "Store".',
	},
	{
		name: "Store",
		button_text: ["Buy 10 health (10 gold)", "Buy weapon", "Go to town square"],
		text: "You enter the store.",
	},
	{
		name: "Cave",
		button_text: ["Fight slime", "Fight fanged beast", "Go to town square"],
		text: "You enter the cave. You see some monsters.",
	},
	{
		name: "Fighting",
		button_text: ["Attack", "Dodge", "Run"],
		text: "You are fighting a monster.",
	},
	{
		name: "kill monster",
		button_text: [
			"Go to town square",
			"Go to town square",
			"Go to town square",
		],
		text: "The monster screeches as it dies. You gain experience points and find gold.",
	},
	{
		name: "lose",
		button_text: ["REPLAY?", "REPLAY?", "REPLAY?"],
		text: "You died.",
	},
	{
		name: "win",
		button_text: ["REPLAY?", "REPLAY?", "REPLAY?"],
		text: "You defeated the dragon! YOU WIN THE GAME!",
	},
	{
		name: "Easter Egg",
		button_text: ["2", "8", "Go to town square?"],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
	},
];

export { weapons, monsters, locations, initialText };
