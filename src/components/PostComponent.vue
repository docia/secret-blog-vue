<template>
	<div class="post">
		<div
			class="post__main"
			@click.prevent="handleClick"
			title="Click anywhere to expand the post"
		>
			<!--EDIT BUTTON-->
			<!-- <div class="post__content__main__dropdown">
        <button
          class="post__content__main__dropdown__btn"
          @click.prevent="openDropdpown"
        >
          <img
            src="../assets/images/more-icon.svg"
            alt="more icon"
            class="post__content__main__dropdown__btn__icon"
          />
        </button>
        <div
          class="post__content__main__dropdown__content"
          :class="{
            post__content__main__dropdown__content__visible:
              isDropdownVisible,
          }"
        >
          <div class="post__content__main__dropdown__content__editBtn">
            <img
              src="../assets/images/edit-post-icon.svg"
              alt="edit post icon"
            />
            <a href="#" @click.prevent="openModal"> Edit Post</a>
          </div>
          <div class="post__content__main__dropdown__content__deleteBtn">
            <img
              src="../assets/images/trash-icon.svg"
              alt="delete post icon"
            />
            <a href="#" @click.prevent="openModal"> Delete Post</a>
          </div>
        </div>
      </div> -->
			<div class="post__main__picture">
				<img
					:src="postPicture"
					alt="mountains"
					class="post__main__picture__img"
				/>
			</div>

			<h1 class="mb-8">{{ post.title }}</h1>
			<p class="mb-8">{{ post.description }}</p>
		</div>

		<div class="post__footer">
			<small>{{ formattedDate }}</small>
			<div class="post__footer__like">
				<button
					class="post__footer__like__toggle"
					:disabled="disabled"
					@click.prevent="handleLike(post._id)"
				>
					<img
						:src="likeIcon"
						alt="like icon"
						class="post__footer__like__toggle__img"
					/>
				</button>
				<div class="post__footer__like__count">{{ count }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useDateFormat } from "@/composables/date";
import { computed, ref, toRefs } from "vue";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";

const emit = defineEmits(["redirect", "setLike"]);
const props = defineProps({
	post: {
		type: Object,
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const { post } = toRefs(props);

const { format } = useDateFormat();

const formattedDate = computed(() => format(post.value.dateCreated));

const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);

const liked = ref(post.value.isLiked);
const count = ref(post.value.likes);
const image = ref(post.value.image);

const handleLike = async (postId) => {
	emit("setLike", liked.value, postId);
	if (!isAuth.value) return;
	if (!liked.value) {
		count.value++;
	} else {
		count.value--;
	}

	liked.value = !liked.value;
};

const likeIcon = computed(() => {
	return liked.value && isAuth.value
		? "src/assets/images/like-icon.svg"
		: "src/assets/images/unlike-icon.svg";
});

const postPicture = computed(() => {
	return !image.value || image.value.toLowerCase().endsWith(".svg")
		? "../src/assets/images/post-picture.svg"
		: image.value;
});

const handleClick = () => {
	emit("redirect", post.value._id);
};

// const isDropdownVisible = ref(false);

// const openDropdpown = () => {
// 	isDropdownVisible.value = !isDropdownVisible.value;
// };

// const openModal = () => {
// 	modalStore.openModal({
// 		component: EditPostComponent,
// 	});
// };
</script>

<style lang="scss">
.post {
	box-shadow: 0 0 5px var(--black-color-8);
	border-radius: var(--grid-12);
	padding: var(--grid-12);
	overflow: hidden;
	&__main {
		display: flex;
		flex-direction: column;
		cursor: pointer;
		&__dropdown {
			width: 40px;
			height: 40px;
			margin-left: auto;
			position: relative;
			display: inline-block;
			&__btn {
				border-radius: 90%;
				border: none;
				background-color: transparent;
				padding: 4px 4px 0;
				&:hover {
					background-color: var(--black-color-7);
					cursor: pointer;
				}
			}

			&__content {
				display: none;
				position: absolute;
				right: 0;
				background-color: #f9f9f9;
				min-width: 160px;
				z-index: 1;
				&__editBtn,
				&__deleteBtn {
					display: flex;
					padding: 0 8px 0;
					&:hover {
						background-color: #f1f1f1;
						border-radius: 8px;
						cursor: pointer;
					}
				}

				&__visible {
					display: block;
					border-radius: 8px;
				}

				a {
					color: var(--black-color-2);
					padding: 12px 14px;
					text-decoration: none;
					display: block;
				}
			}
		}
		&__picture {
			height: 300px;
			overflow: hidden;
			position: relative;
			border-radius: var(--grid-12);
			margin-bottom: var(--grid-12);
			&__img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		h1,
		p {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	&__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		&__like {
			display: flex;
			align-items: center;
			gap: 5px;
			&__toggle {
				background-color: transparent;
				border: none;
				padding: 0;
				align-items: center;
				display: flex;
				&:hover {
					cursor: pointer;
				}
			}
		}
	}
}
</style>
