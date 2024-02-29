<template>
	<div class="comment">
		<div class="comment__header">
			<span>{{ commentsDataProp.commentedBy.nickname }}</span>
			<span>{{ format(commentsDataProp.dateCreated) }}</span>
		</div>
		<p class="comment__footer">{{ commentsDataProp.text }}</p>
	</div>
</template>

<script setup>
import { useDateFormat } from "@/composables/date";

const { format } = useDateFormat();

const props = defineProps({
	commentsDataProp: {
		type: Object,
		default: () => {},
	},
});
</script>

<style lang="scss">
.comment {
	gap: 4px;
	background-color: #f2f2f2;
	padding: 8px;
	border-radius: 8px;
	margin-top: 8px;
	&__header {
		font-weight: bold;
		display: flex;
		justify-content: space-between;
	}
	&__footer {
		margin-top: 8px;
	}
}
</style>
