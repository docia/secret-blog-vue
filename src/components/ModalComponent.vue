<template>
	<Teleport to="body">
		<Transition name="modal-fade"> <!-- transition add animation -->
			<div
				class="modal"
				@click.self="modalStore.closeModal"
				v-if="component"
				aria-modal="true"
				role="dialog"
				tabindex="-1"
			>
				<div class="modal__inner">
					<div class="modal__inner__header">
						<span @click.self="modalStore.closeModal">&#9587;</span>
					</div>
					 <!-- component is empty. but with attribute is, we pass component inside the attribute -->
					<component
						:is="component"
						v-bind="props"
						@close="modalStore.closeModal"
					/>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useModalStore } from "../stores/modalStore";

defineEmits(["close"]);

const modalStore = useModalStore();

const component = computed(() => modalStore.modalState?.component);
const props = computed(() => modalStore.modalState?.props);

const keyDownListener = (event) => {
	if (event.key === "Escape") modalStore.closeModal();
};

onMounted(() => {
	document.addEventListener("keydown", keyDownListener);
});

onUnmounted(() => {
	document.removeEventListener("keydown", keyDownListener());
});
</script>

<style lang="scss">
.modal {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 500;
	background: var(--black-color-6);
	display: flex;
	justify-content: center;
	align-items: center;

	&__inner {
		background-color: white;
		padding: 40px 48px;
		border-radius: 1rem;

		&__header {
			text-align: right;
			font-weight: bold;
			margin-bottom: 16px;
			span {
				font-size: 12px;
				&:hover {
					cursor: pointer;
				}
			}
		}
	}
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: 0.25s ease all;
}
</style>
