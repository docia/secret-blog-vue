import axios from "axios";
import router from "../router/index";
import { useUserStore } from "../stores/userStore";

// setup axios baseURL with help of env file
const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

// when creating a request, before the request, we catch it and can pass a token before it
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// when creating a request, we catch a response
api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.data.statusCode === 401) {
			const userStore = useUserStore();
			userStore.logout();
			router.push("/login");
		}
		return Promise.reject(error);
	}
);


export default api;
