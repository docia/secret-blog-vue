import { describe, it, expect, beforeEach } from "vitest";
import PostComponent from "@/components/PostComponent.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

const post = {
	title: "Title",
	description: "Description",
	dateCreated: "2023-12-10T18:24:43.907Z",
	fullText: "Fulll post text",
	image: "test-image.png",
	isLiked: true,
	likes: 1,
	_id: 12345,
};

describe("PostComponent", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(PostComponent, {
			props: {
				post,
			},
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							users: {
								isAuth: true,
							},
						},
					}),
				],
			},
		});
	});

	it("check title", () => {
		const h1 = wrapper.find("h1");
		console.log(h1);
		expect(h1.text(h1)).toBe(post.title);
	});

	it("check description", () => {
		const desc = wrapper.find("p");
		expect(desc.text()).toEqual(post.description);
	});

	it("check date format", () => {
		const date = wrapper.find("small");
		expect(date.text()).toBe(new Date(post.dateCreated).toLocaleDateString());
	});

	it("display a correct like count", () => {
		const likeCount = wrapper.find(".post__footer__like__count");
		expect(likeCount.text()).toBe(post.likes.toString());
	});

	it("loads a correct image", () => {
		const image = wrapper.find(".post__main__picture__img");
		expect(image.attributes("src")).toBe(post.image);
	});

	it("when click on likeButton, emit setLike", async () => {
		await wrapper.find(".post__footer__like__toggle").trigger("click");
		expect(wrapper.emitted()).toHaveProperty("setLike");
		expect(wrapper.emitted().setLike[0]).toEqual([true, post._id]);
	});

	it("increasing like count", async () => {
		await wrapper.find(".post__footer__like__toggle").trigger("click");
		const likeCount = wrapper.find(".post__footer__like__count");
		expect(likeCount.text()).toBe("0");
	});

	it("redirect on clicking", async () => {
		await wrapper.find(".post__main").trigger("click");
		expect(wrapper.emitted()).toHaveProperty("redirect");
		expect(wrapper.emitted().redirect[0]).toEqual([post._id]);
	});
});
