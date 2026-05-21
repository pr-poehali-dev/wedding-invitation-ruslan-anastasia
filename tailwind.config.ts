import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
			"./1779380780451586403.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		fontFamily: {
			cormorant: ['Cormorant Garamond', 'serif'],
			caveat: ['Caveat', 'cursive'],
			montserrat: ['Montserrat', 'sans-serif'],
		},
		extend: {
			colors: {
				rose: {
					50: '#fff0f3',
					100: '#ffe0e8',
					200: '#ffc6d5',
					300: '#ff9ab5',
					400: '#ff6090',
					500: '#ff2d6f',
					600: '#f00d55',
					700: '#ca0447',
					800: '#a80740',
					900: '#8f0a3a',
				},
				blush: {
					50: '#fdf6f8',
					100: '#fce8ef',
					200: '#f9d4e2',
					300: '#f4b0c9',
					400: '#ec7da6',
					500: '#e05586',
					600: '#cd3669',
					700: '#ac2555',
					800: '#8f2249',
					900: '#7a2041',
				},
				cream: '#fdf8f4',
				petal: '#f9eff4',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fadeUp 0.8s ease-out forwards',
				'fade-in': 'fadeIn 1s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'petal-fall': 'petalFall 8s linear infinite',
			},
			keyframes: {
				...{},
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				petalFall: {
					'0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '0.7' },
					'100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;