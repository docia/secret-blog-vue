<template>
	<input
		class="InputComponent"
		:type="type"
		:style="styles"
		:class="classes"
		:value="modelValue"
		:disabled="disabled"
		:placeholder="placeholder"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script setup>
import { computed } from "vue";

// two-way binding ( read vue doc )
defineEmits(["update:modelValue"]);
const props = defineProps({
	color: {
		type: String,
		default: "var(--black-color-2)",
	},
	bgColor: {
		type: String,
		default: "var(--white-color-2)",
	},
	label: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	modelValue: {
		type: [String, Number, null],
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	borderless: {
		type: Boolean,
		default: false,
	},
	error: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: "text",
	},
});

const styles = computed(() => {
	return {
		color: props.color,
		backgroundColor: props.bgColor,
	};
});

const classes = computed(() => {
	return [
		props.borderless ? "InputComponent__borderless" : "",
		props.error ? "InputComponent__error" : "",
	];
});
</script>

<style lang="scss" scoped>
.InputComponent {
	padding: var(--grid-12);
	border-radius: var(--grid-12);
	border: 2px solid var(--black-color-5);
	width: 100%;
	&__borderless {
		border: none;
	}
	&__error {
		border: 1px solid var(--red-color);
	}
}
</style>
