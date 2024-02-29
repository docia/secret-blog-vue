import { defineStore } from "pinia";
import api from "../api";

export const usePostStore = defineStore("posts", {
	state: () => ({
		posts: [],
		pagination: {},
		isLoaded: false,
	}),
	actions: {
		async getPosts(params = {}) {
			try {
				const response = (await api.get("/posts", { params })).data;
				this.posts = response.posts;
				this.pagination = response.pagination;
			} catch (error) {
				throw error;
			}
		},
		async getPostById(postId) {
			try {
				return (await api.get(`/posts/${postId}`)).data;
			} catch (error) {
				throw error;
			}
		},
		async createPost(formData) {
			try {
				await api.post("/posts", formData);
			} catch (error) {
				throw error;
			}
		},
		async like(postId) {
			try {
				await api.post(`/posts/like/${postId}`);
			} catch (error) {
				throw error;
			}
		},
		async unlike(postId) {
			try {
				await api.delete(`/posts/like/${postId}`);
			} catch (error) {
				throw error;
			}
		},
	},
});
