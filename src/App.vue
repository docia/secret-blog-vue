<template>
	<header-component></header-component>
	<router-view />
	<modal-component />
</template>
<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import { useUserStore } from "./stores/userStore";
import ModalComponent from "./components/ModalComponent.vue";

export default {
	setup() {
		return { userStore: useUserStore() };
	},
	name: "App",
	components: {
		HeaderComponent,
		ModalComponent,
	},
	async created() {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		const userExists = Object.values(this.userStore.getUserData)?.length > 0;

		if (!userExists) await this.userStore.getUser();
	},
};
</script>

<style>
@font-face {
	font-family: "Open Sans";
	src: url("../src/fonts/Open_Sans/OpenSans-VariableFont_wdth\,wght.ttf");
}
</style>
