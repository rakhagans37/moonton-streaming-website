import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        fontFamily: {
            poppins: "Poppins, sans-serif",
        },
        extend: {
            colors: {
                alerange: "#FB6908",
                "gray-1": "#B4B4B4",
                "gray-2": "#E2E0E0",
                "form-bg": "#212121",
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554",
                },
            },
            screens: {
                laptopLg: "1160px",
                laptopXl: "1360px",
            },
        },
    },

    plugins: [forms],
};
