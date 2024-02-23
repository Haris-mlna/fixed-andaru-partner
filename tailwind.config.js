/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#0a1d3a",
				light_1: "#f0f0f0",
				light_2: "#e0e0e0",
				light_3: "#d0d0d0",
				light_4: "#c0c0c0",
			},
			screens: {
				"3xl": "1600px",
			},
			minWidth: {
				"sm": "640px",
				"md": "760px",
				"lg": "1024px",
				"xl": "1280px",
				"2xl": "1536px",
			},
		},
	},
	plugins: [],
};
