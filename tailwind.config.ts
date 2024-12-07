import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				striped:
					'repeating-linear-gradient(-45deg, #f0f0f0 0px, #f0f0f0 10px, #ffffff 10px, #ffffff 20px)',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			gridTemplateColumns: {
				'2-auto': 'repeat(2, auto)',
			},
		},
	},
	plugins: [],
} satisfies Config
