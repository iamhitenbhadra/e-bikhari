/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'netflix-red': '#E50914',
                'netflix-black': '#141414',
                'netflix-gray': '#e5e5e5',
            }
        }
    },
    plugins: [],
}
