import { defineStore } from "pinia";
import api from "../api";

export const useFileStore = defineStore("files", {
	actions: {
		async uploadImage(postImage) {
			try {
				return (await api.post("/file", postImage)).data?.url;
			} catch (error) {
				throw error;
			}
		},
	},
});
