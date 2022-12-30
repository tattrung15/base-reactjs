/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs_max: { max: "440px" },
      // => @media (min-width: 440px) { ... }
      xs_min: { min: "441px" },
      // => @media (min-width: 441px) { ... }
      sm_max: { max: "640px" },
      // => @media (min-width: 640px) { ... }
      sm_min: { min: "641px" },
      // => @media (min-width: 641px) { ... }
      md_max: { max: "768px" },
      // => @media (max-width: 768px) { ... }
      md_min: { min: "769px" },
      // => @media (min-width: 769px) { ... }
      lg_max: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }
      lg_min: { min: "1025px" },
      // => @media (min-width: 1025px) { ... }
      xl_max: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }
      xl_min: { min: "1281px" },
      // => @media (min-width: 1281px) { ... }
    },
  },
  plugins: [],
};
