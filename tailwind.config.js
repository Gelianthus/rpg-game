import plugin from "tailwindcss/plugin";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		backgroundImage: {
			"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
		},
		screens: {
			xs: "300px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			transitionProperty: {
				height: "height",
			},
			textShadow: {
				sm: "1px 1px 1px var(--tw-shadow-color)",
				DEFAULT: "2px 2px 1px var(--tw-shadow-color)",
				lg: "4px 4px 1px var(--tw-shadow-color)",
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({
						textShadow: value,
					}),
				},
				{ values: theme("textShadow") }
			);
		}),
	],
};
