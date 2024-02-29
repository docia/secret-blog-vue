import { defineStore } from "pinia";
import api from "../api";

export const useUserStore = defineStore("users", {
	state: () => ({
		user: {},
		isAuth: false,
	}),
	getters: {
		getUserData: (state) => state.user,
	},
	actions: {
		async login(email, password) {
			try {
				const token = (
					await api.post("/auth/", {
						email,
						password,
					})
				).data.token;

				localStorage.setItem("authToken", token);
			} catch (error) {
				throw error;
			}
		},
		async signup(form) {
			try {
				await api.post("/users/", form);
			} catch (error) {
				throw error;
			}
		},
		async getUser() {
			try {
				this.user = (await api.get("/auth/user")).data;
				this.isAuth = true;
			} catch (error) {
				throw error;
			}
		},
		async updateUserData(formData) {
			try {
				this.state = await api.patch("/users", formData);
			} catch (error) {
				throw error;
			}
		},
		logout() {
			this.isAuth = false;
			localStorage.removeItem("authToken");
		},
		
	},
});
