<template>
	<div class="pages">
		<button :disabled="isAllowedGoBack" @click="goBack" class="pages__btn">
			<img
				src="../assets/images/left-arrow.svg"
				alt="Left arrow"
				class="pages__btn__img"
			/>
		</button>
		{{ currentPage }}
		of
		{{ totalPages }}
		<button
			:disabled="isAllowedGoForward"
			@click="goForward"
			class="pages__btn"
		>
			<img
				src="../assets/images/right-arrow.svg"
				alt="Right arrow"
				class="pages__btn__img"
			/>
		</button>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["goForward", "goBack"]);

const props = defineProps({
	paginationProp: {
		type: Object,
		default: () => {},
	},
});

const currentPage = ref(1);

const totalPages = computed(() =>
	Math.ceil(props.paginationProp.total / props.paginationProp.limit)
);

const isAllowedGoBack = computed(() => currentPage.value === 1);

const isAllowedGoForward = computed(
	() => currentPage.value === totalPages.value
);

const generateParams = () => {
	const params = {
		limit: props.paginationProp.limit,
		offset: (currentPage.value - 1) * props.paginationProp.limit,
	};
	return params;
};

const goBack = () => {
	if (currentPage.value === 1) return;

	currentPage.value--;
	const params = generateParams();
	emit("goBack", params);
};

const goForward = () => {
	currentPage.value++;
	const params = generateParams();
	emit("goForward", params);
};
</script>

<style lang="scss">
.pages {
	display: flex;
	justify-content: center;
	margin-top: 24px;
	&__btn {
		border: none;
		background-color: transparent;
		&:hover {
			cursor: pointer;
		}
	}
}
</style>
