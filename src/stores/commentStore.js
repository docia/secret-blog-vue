import { defineStore } from "pinia";
import api from "../api";

export const useCommentStore = defineStore("comments", {
	state: () => ({
	}),
	actions: {
		async getCommentsByPostId(postId) {
			try {
                const response = (await api.get(`/comments/post/${postId}`)).data;
				return response;
			} catch (error) {
				throw error;
			}
		},
		async createPostComment({ postId, payload }) {
			try {
				return (await api.post(`/comments/post/${postId}`, payload)).data;
			} catch (error) {
				throw error;
			}
		},
	},
});
