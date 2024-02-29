<template>
	<div class="commentBlock mt-8 mb-8">
		<div v-if="isAuth" class="commentBlock__create">
			<InputComponent v-model="message" />
			<button @click="handleClick" class="commentBlock__create__button ml-8">
				Create
			</button>
		</div>
		<div v-else class="commentBlock__auth">
			<router-link :to="{ name: 'LoginView' }">Log In</router-link> to write a
			comment.
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
import InputComponent from "@/components/InputComponent.vue";
import { ref } from "vue";

const emit = defineEmits(["createComment"]);
const userStore = useUserStore();
const message = ref("");
const { isAuth } = storeToRefs(userStore); // to avoid writing userStore.isAuth

// emit from child comp. to a parent comp.
const handleClick = () => {
	emit("createComment", message.value);
};
</script>

<style lang="scss">
.commentBlock {
	&__create {
		display: flex;
		&__button {
			border-radius: 8px;
			padding: 8px;
			background-color: rgb(45 98 239);
			color: white;
			outline: none;
			border: none;
			cursor: pointer;
		}
	}
	&__auth {
		font-size: 18px;
		text-align: center;
		padding: 8px;
		border-radius: 8px;
		background-color: #f2c037;
		color: black;
		
        a {
			font-weight: bold;
		}
	}
}
</style>
