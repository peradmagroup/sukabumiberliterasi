/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-container": "#30230c", "surface-container-low": "#f6f3f4", "on-tertiary-fixed": "#251904", "surface-container-high": "#eae7e8", "surface-container-lowest": "#ffffff", "on-error-container": "#93000a", "on-tertiary-fixed-variant": "#54442a", "inverse-on-surface": "#f3f0f1", "on-tertiary-container": "#9e896b", "primary-fixed-dim": "#bec7db", "on-background": "#1b1b1c", secondary: "#5b5e66", "surface-variant": "#e4e2e3", "secondary-fixed-dim": "#c4c6cf", "on-primary": "#ffffff", "inverse-surface": "#303031", "on-tertiary": "#ffffff", "error-container": "#ffdad6", "on-error": "#ffffff", "primary-container": "#1c2534", "on-secondary": "#ffffff", "on-primary-fixed": "#131c2a", background: "#fbf9f9", "on-secondary-fixed": "#181c22", "on-secondary-container": "#5f636a", "surface-tint": "#565f70", "surface-bright": "#fbf9f9", "on-surface-variant": "#45474c", "tertiary-fixed-dim": "#dac3a1", surface: "#fbf9f9", tertiary: "#190e00", "tertiary-fixed": "#f7dfbc", error: "#ba1a1a", "secondary-fixed": "#e0e2eb", "on-surface": "#1b1b1c", "on-secondary-fixed-variant": "#43474e", "inverse-primary": "#bec7db", primary: "#07101e", "surface-container": "#f0edee", "surface-container-highest": "#e4e2e3", "outline-variant": "#c5c6cc", "surface-dim": "#dcd9da", "primary-fixed": "#dae3f7", "on-primary-fixed-variant": "#3e4757", outline: "#75777d", "secondary-container": "#dddfe8", "on-primary-container": "#838c9f"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-mobile": "16px", md: "16px", "margin-desktop": "32px", xs: "4px", sm: "8px", lg: "24px", base: "4px", xl: "40px", gutter: "16px"
      },
      fontFamily: {
        "headline-md": ["Inter", "sans-serif"], "body-sm": ["Inter", "sans-serif"], "headline-lg-mobile": ["Inter", "sans-serif"], "headline-sm": ["Inter", "sans-serif"], "label-md": ["Inter", "sans-serif"], "headline-lg": ["Inter", "sans-serif"], "body-md": ["Inter", "sans-serif"], "body-lg": ["Inter", "sans-serif"], headline: ["Inter", "sans-serif"], display: ["Inter", "sans-serif"], body: ["Inter", "sans-serif"], label: ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["24px", {lineHeight: "32px", fontWeight: "600"}], "body-sm": ["14px", {lineHeight: "20px", fontWeight: "400"}], "headline-lg-mobile": ["26px", {lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "700"}], "headline-sm": ["20px", {lineHeight: "28px", fontWeight: "600"}], "label-md": ["12px", {lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600"}], "headline-lg": ["32px", {lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700"}], "body-md": ["16px", {lineHeight: "24px", fontWeight: "400"}], "body-lg": ["18px", {lineHeight: "28px", fontWeight: "400"}]
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: [],
}
