import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				primaryTint30: "var(--color-primary-tint-30)",
				primaryTint80: "var(--color-primary-tint-80)",
				primaryTint90: "var(--color-primary-tint-90)",
				primaryTint95: "var(--color-primary-tint-95)",
				primaryShade10: "var(--color-primary-shade-10)",
				primaryShade20: "var(--color-primary-shade-20)",
				text: "var(--color-text)",
				navHeight: 'var(--nav-height)',
				transitionPrimary: 'var(--transition-primary)',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
			},
			animation: {
				scaleBounce: "scaleBounce 6s infinite alternate ease-in-out",
			},
			keyframes: {
				scaleBounce: {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.3)" },
					"100%": { transform: "scale(1)" },
				},
			},
		}
	},
	//   plugins: [require("tailwindcss-animate")],
} satisfies Config;
