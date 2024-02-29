<template>
	<section class="homeView">
		<div class="container">
			<button v-if="isAuth" @click="openModal" class="homeView__createPost">
				Create a Post
			</button>
			<div class="homeView__postWrapper">
				<PostComponent
					v-for="post in posts"
					:key="post._id"
					:post="post"
					:disabled="isLikingDisabled"
					@redirect="handleRedirect"
					@setLike="handleLike"
				></PostComponent>
			</div>
			<PaginationComponent
				v-if="pagination?.limit"
				:paginationProp="pagination"
				@goBack="handleGoBack"
				@goForward="handleGoForward"
			/>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { usePostStore } from "../stores/postStore";
import PostComponent from "../components/PostComponent.vue";
import PostFormComponent from "../components/PostFormComponent.vue";
import { useModalStore } from "../stores/modalStore";
import { useUserStore } from "../stores/userStore";
import WarningModalComponent from "../components/WarningModalComponent.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import PaginationComponent from "../components/PaginationComponent.vue";

defineEmits(["redirect", "setLike", "goBack", "goForward"]);

const postStore = usePostStore();
const modalStore = useModalStore();
const userStore = useUserStore();
const { posts, pagination } = storeToRefs(postStore);
const { isAuth } = storeToRefs(userStore);
const isLikingDisabled = ref(false);

onMounted(async () => {
	await postStore.getPosts();
});

const openModal = () => {
	modalStore.openModal({
		component: PostFormComponent,
	});
};

const router = useRouter();

const handleRedirect = (postId) => {
	router.push({ name: "PostDetail", params: { postId } });
};

const handleLike = async (likeState, postId) => {
	if (!isAuth.value) {
		modalStore.openModal({
			component: WarningModalComponent,
		});
		return;
	}

	try {
		isLikingDisabled.value = true;
		if (likeState) {
			await postStore.unlike(postId);
		} else {
			await postStore.like(postId);
		}
	} catch (error) {
		console.error(error);
	} finally {
		isLikingDisabled.value = false;
	}
};

const handleGoBack = async (params) => {
	await postStore.getPosts(params);
};

const handleGoForward = async (params) => {
	await postStore.getPosts(params);
};
</script>

<style lang="scss">
.homeView {
	padding: 16px;
	&__createPost {
		background-color: var(--blue-color-2);
		color: var(--white-color-1);
		padding: 12px;
		border-radius: 12px;
		width: 100%;
		border: none;
		margin-top: 16px;
		&:hover {
			cursor: pointer;
			background-color: var(--blue-color-1);
		}
	}
	&__postWrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 48px 20px;
		margin: 20px 0px 20px;
	}
}

@media (max-width: 425px) {
	.homeView__postWrapper {
		grid-template-columns: 1fr;
	}
}
</style>
