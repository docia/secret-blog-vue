<template>
	<div class="pb-24">
		<CommentsListItem
			v-for="comment in commentsDataProp"
			:key="comment.id"
			:commentsDataProp="comment"
		/>
	</div>
</template>

<script setup>
import CommentsListItem from "@/components/CommentsListItem.vue";

const props = defineProps({
	commentsDataProp: {
		type: Object,
		default: () => {},
	},
});
</script>
