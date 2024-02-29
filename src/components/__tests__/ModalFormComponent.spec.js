import { describe, it, expect, beforeEach } from "vitest";
import ModalComponent from "@/components/ModalComponent.vue";
import HomeView from "@/views/HomeView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("HomeView and ModalCompoenent interuction", () => {
	let homeWrapper;
	beforeEach(() => {
		homeWrapper = mount(HomeView, {
			global: {
				plugins: [createTestingPinia],
			},
		});
	});

	it("check modal openening", async () => {
        // await homeWrapper.find("button").trigger("click");

		// const modalWrapper = mount(ModalComponent);

		// expect(modalWrapper.find("modal").attributes("aria-modal")).toBe(true);
		// expect(modalWrapper.find("modal").attributes("dialog")).toEqual("dialog");
	});
});
