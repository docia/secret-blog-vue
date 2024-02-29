import { describe, it, expect, beforeEach, vitest, vi, test } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import PostFormComponent from "@/components/PostFormComponent.vue";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";
import { usePostStore } from "@/stores/postStore";
import { useFileStore } from "@/stores/fileStore";

describe("PostFormComponent", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(PostFormComponent, {
			global: {
				plugins: [createTestingPinia()],
			},
		});
	});

	it("check component validation", async () => {
		await wrapper.find("button").trigger("submit");

		expect(wrapper.find("#inputComponent__2").classes()).toContain(
			"InputComponent__error"
		);
    });
    
	it("check creating post", async () => {
        const postStore = usePostStore();
        
		await wrapper.find("#inputComponent__1").setValue("Hello");
		await wrapper
			.find("#inputComponent__2")
			.setValue("Hello Hello Hello Hello");
		await wrapper
			.find("#inputComponent__3")
			.setValue("Hello Hello Hello Hello");
		await wrapper.find("button").trigger("submit");
        await flushPromises();
        
		expect(postStore.createPost).toHaveBeenCalled();
		expect(postStore.getPosts).toHaveBeenCalled();
		expect(wrapper.emitted()).toHaveProperty("close");
    });
    
	it("check upload image", async () => {
		const fileStore = useFileStore();
		const inputFile = wrapper.find('input[type="file"]');
		const fileMock = new File(["(file content)"], "test-file.txt", {
			type: "text/plain",
		});

		expect(inputFile.exists()).toBe(true);

		Object.defineProperty(inputFile.element, "files", {
			value: [fileMock],
		});
		await inputFile.trigger("change");

		expect(fileStore.uploadImage).toHaveBeenCalledTimes(1);
	});
});
