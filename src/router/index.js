import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { IsGuest, IsAuthenticated } from "../router/guards";


const routes = [
	{
		path: "/signup",
		name: "SignupView",
		component: () => import('@/views/SignupView.vue'),
		beforeEnter: IsGuest,
	},
	{
		path: "/login",
		name: "LoginView",
		component: () => import('@/views/LoginView.vue'),
		beforeEnter: IsGuest,
	},
	{
		path: "/profile",
		name: "ProfileView",
		component: () => import('@/views/ProfileView.vue'),
		beforeEnter: IsAuthenticated
	},
	{
		path: "/post/:postId",
		name: "PostDetail",
		component: () => import('@/views/PostDetailView.vue')
	},
	{
		path: "/",
		component: HomeView,
		name: "HomeView",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
