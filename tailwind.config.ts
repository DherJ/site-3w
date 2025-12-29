import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./pages/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    fontFamily: {
        sans: ["var(--font-cabin)", "system-ui", "sans-serif"],
      },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // shadcn tokens (HSL variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // tes aliases (optionnels mais pratiques)
        // brandNavy: "#112D4D",
        brandNavy: "#0f5550ff",
        brandOffWhite: "#F7F9FC",
        brandChampagne: "#C9B37E",
        brandLine: "#E5E9F0",
        brandText: "#1F2937",
        brandMuted: "#6B7280",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl3: "1.5rem",
      },
      boxShadow: {
        soft: "0 16px 50px rgba(17,45,77,0.08)",
        softer: "0 10px 30px rgba(17,45,77,0.06)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  compilerOptions: {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
} satisfies Config;
