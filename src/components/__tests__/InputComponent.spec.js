import { describe, it, expect, beforeEach } from "vitest";
import InputComponent from "@/components/InputComponent.vue";
import { shallowMount } from "@vue/test-utils";




const props = {
	color: "red",
	bgColor: "black",
  disabled: true,
	error: true,
  modelValue: 'Test model value',
  placeholder: "Placeholder Test"
};

describe("InputComponent", () => {

    it("check modelValue", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue
        }
      });

      expect(wrapper.find('input').element.value).toBe(props.modelValue)
    });

    it("check input color", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
          color: props.color
        },
      });

      expect(wrapper.find('input').element.style.color).toBe(props.color)
    })

    it("check input bg", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
          bgColor: props.bgColor
        },
      });

      expect(wrapper.find('input').element.style.backgroundColor).toBe(props.bgColor)
    })

    it("check disabled state", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
          disabled: props.disabled
        },
      });
      expect(wrapper.find('input').element.disabled).toBe(props.disabled)
    })

    it("check not disabled state", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
          disabled: false
        },
      });
      expect(wrapper.find('input').element.disabled).not.toBe(props.disabled)
    })

    it("check placeholder", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
          placeholder: props.placeholder
        },
      });
      expect(wrapper.find('input').attributes().placeholder).toBe(props.placeholder)
    })

    it("check error state", () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
          error: props.error,
        },
      });
      expect(wrapper.find('input').classes()).toContain('InputComponent__error')
    })

    it("set the value", async () => {
      const wrapper = shallowMount(InputComponent, {
        props: {
          modelValue: props.modelValue,
        },
      });
      await wrapper.find('input').setValue('my@mail.com')
      expect(wrapper.find('input').element.value).toBe('my@mail.com')
    })
})