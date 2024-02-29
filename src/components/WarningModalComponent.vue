<template>
	<div class="warningModal">
		<h1 class="warningModal__warning">
			Please
			<router-link
				to="/login"
				class="warningModal__warning__link"
				@click="closeModal"
				>log in</router-link
			>
			before you can like posts
		</h1>
	</div>
</template>

<script setup>
import { useModalStore } from "../stores/modalStore";

const modalStore = useModalStore();

const closeModal = () => {
	modalStore.closeModal();
};
</script>

<style lang="scss" scoped>
.warningModal {
	&__warning {
		&__link {
			color: var(--blue-color-2);
			font-size: 24px;
			cursor: pointer;
			&:hover {
				color: var(--blue-color-1);
			}
		}
	}
}
</style>
