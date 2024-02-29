<template>
	<h1 class="postForm__greeting">Create your own post!</h1>
	<div class="postForm__item">
		<div class="postForm__item__addPicture">
			<label> Upload a picture: </label>
			<input type="file" ref="imageInput" @change="handleImageUpload" />
		</div>
	</div>
	<form @submit.prevent="handleSubmit" class="postForm">
		<div class="postForm__item">
			<InputComponent
				id="inputComponent__1"
				v-model="form.title"
				placeholder="Enter the Title"
				:error="validate.form.title.$error && validate.form.title.$dirty"
			/>
			<span v-if="validate?.form.title?.$error" class="postForm__item__error">
				{{ validate?.form.title?.$errors[0].$message }}
			</span>
		</div>
		<div class="postForm__item">
			<InputComponent
				id="inputComponent__2"
				v-model="form.fullText"
				placeholder="Enter the Text"
				:error="
					validate.form.fullText.$error && validate.form.fullText.$dirty
				"
			/>
			<span
				v-if="validate?.form.fullText?.$error"
				class="postForm__item__error"
			>
				{{ validate?.form.fullText?.$errors[0].$message }}
			</span>
		</div>
		<div class="postForm__item">
			<InputComponent
				id="inputComponent__3"
				v-model="form.description"
				placeholder="Enter the Description"
				:error="
					validate.form.fullText.$error && validate.form.description.$dirty
				"
			/>
			<span
				v-if="validate?.form.description?.$error"
				class="postForm__item__error"
			>
				{{ validate?.form.description?.$errors[0].$message }}
			</span>
		</div>
		<div class="postForm__save">
			<button type="submit" class="postForm__save__btn">Save</button>
		</div>
	</form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import InputComponent from "@/components/InputComponent.vue";
import { usePostStore } from "../stores/postStore";
import { useFileStore } from "../stores/fileStore";

const emits = defineEmits(["close"]);

const form = ref({
	title: "",
	fullText: "",
	description: "",
	image: "",
});

const rules = computed(() => ({
	form: {
		title: {
			required,
			minLength: minLength(3),
		},
		fullText: {
			required,
			minLength: minLength(10),
		},
		description: {
			required,
			minLength: minLength(10),
		},
	},
}));

const validate = useVuelidate(rules, { form });

const postStore = usePostStore();

const handleSubmit = async () => {
	try {
		// if !isFormCorrect we exit handleSubmit function
		const isFormCorrect = await validate.value.$validate();

		if (!isFormCorrect) return;

		await postStore.createPost(form.value);

		await postStore.getPosts();

		emits("close");
	} catch (error) {
		console.log(error);
	}
};

const imageInput = ref(null);

const fileStore = useFileStore();

const handleImageUpload = async (event) => {
	const file = event.target.files[0];

	const formData = new FormData();

	formData.append("file", file);

	form.value.image = await fileStore.uploadImage(formData);
};
</script>

<style lang="scss" scoped>
.postForm {
	&__greeting {
		display: flex;
		justify-content: center;
	}
	&__addPicture {
		display: flex;
		justify-content: center;
		margin-top: 16px;
		&__btn {
			border: none;
			background: none;
			cursor: pointer;
		}
	}
	&__item {
		margin: 16px 0 16px;
		&__error {
			color: var(--red-color);
			font-size: var(--grid-16);
			display: flex;
			margin-top: var(--grid-8);
		}
	}
	&__save {
		display: flex;
		justify-content: center;
		&__btn {
			font-weight: bold;
			color: var(--green-color-2);
			height: 48px;
			padding: 0 24px;
			border-radius: 24px;
			border: 2px solid var(--green-color-2);
			background-color: transparent;
			box-sizing: border-box;
			&:hover {
				cursor: pointer;
				color: var(--green-color-1);
				border: 2px solid var(--green-color-1);
			}
		}
	}
}
</style>
