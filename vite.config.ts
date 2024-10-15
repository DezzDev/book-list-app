import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	if (command === "build") {
		return {
			base: "/book-list-app/",
			plugins: [react()],
		};
	} else {
		return {
			plugins: [react()],

		};
	}

});
