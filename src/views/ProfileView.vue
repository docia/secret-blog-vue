<template>
  <section class="profile-view">
    <div class="container">
      <div class="profile-view__header">
        <div class="profile-view__header__image">
          <img
              :src="form.avatar ? form.avatar : './icons/default-user-icon.svg'"
              alt="User photo"
          />
          <div class="profile-view__header__image__edit">
            <label
                @click.prevent="openImageInput"
            >
            </label>
            <input
                ref="imageInput"
                type="file"
                @change="handleImageChange"
            />
          </div>
        </div>

      </div>
      <form @submit.prevent="handleSubmit" class="profile-view__form">
        <div class="profile-view__form__wrapper">
          <div class="profile-view__form__item">
            <label for="nickname">Nickname</label>
            <InputComponent v-model="form.nickname" />
          </div>
          <div class="flex sm-flex-column">
            <div class="profile-view__form__item mr-8 sm-mr-0">
              <label for="fname">First name</label>
              <InputComponent v-model="form.firstName" disabled />
            </div>
            <div class="profile-view__form__item ml-8 sm-ml-0">
              <label for="lname">Last name</label>
              <InputComponent v-model="form.lastName" disabled />
            </div>
          </div>
          <div class="profile-view__form__item">
            <label for="email">Email</label>
            <InputComponent v-model="form.email" />
          </div>
          <div class="profile-view__form__item">
            <label for="profession">Profession</label>
            <InputComponent v-model="form.profession" />
          </div>

          <div class="profile-view__form__item">
            <label for="skills">Skills</label>
            <InputComponent v-model="form.skills" />
          </div>
          <div class="profile-view__form__buttons">
            <button
                type="button"
                class="profile-view__form__buttons-cancel mr-8 "
                :disabled="!isDisabled"
                :class="{'profile-view__form__buttons-disabled': !isDisabled }"
                @click.prevent="cancelChangedData"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="profile-view__form__buttons-save ml-8 "
                :class="{'profile-view__form__buttons-disabled': !isDisabled }"
                :disabled="!isDisabled"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import api from "../api";
import InputComponent from "../components/InputComponent.vue";

const userStore = useUserStore();
const form = ref({
  email: "",
  nickname: "",
  firstName: "",
  lastName: "",
  profession: "",
  skills: "",
  avatar: "",
});
const imageInput = ref(null);
const updatedForm = ref(null);

const isDisabled = computed(() => {
  if (!updatedForm.value) return;
  return Object.keys(form.value).some((field) => {
    return form.value[field] !== updatedForm.value[field];
  });
});
const usersData = computed(() => {
  return userStore.getUserData;
});
const openImageInput = () => {
  imageInput.value.click();
};

const handleImageChange = async (event) => {
  const file = event.target.files[0];
  form.value.avatar = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append("file", file);

  await api.put(`/users/upload`, formData);
};

const handleSubmit = async () => {
  try {
    await userStore.updateUserData(form.value);
    updatedForm.value = {...form.value}
  } catch (e) {
    console.log(e)
  }
};

const cancelChangedData = () => {
  form.value = { ...usersData.value };
};

onMounted(async () => {
  const userExists = Object.values(usersData?.value)?.length > 0;

  if (!userExists) await userStore.getUser();
  form.value = { ...usersData.value };
  updatedForm.value = { ...usersData.value };
});
</script>

<style lang="scss">
.profile-view {
  padding-top: var(--grid-24);
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;

    &__image {
      width: 200px;
      height: 200px;
      position: relative;
      img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      &__edit {
        position: absolute;
        bottom: 0;
        right: 0;
        label {
          padding-left: 28px;
          background-image: url("../assets/images/edit-icon.svg");
          background-repeat: no-repeat;
          background-position: 2px center;
          background-size: 28px;
          &:hover {
            cursor: pointer;
          }
        }
        input {
          display: none;
        }
      }
    }
  }

  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    &__wrapper {
      padding: var(--grid-12);
    }
    &__item {
      margin-top: var(--grid-12);
      width: 100%;
      input {
        margin-top: var(--grid-8);
      }
      label {
        font-weight: bold;
      }
    }

    &__buttons {
      margin-top: var(--grid-24);
      display: flex;

      &-save {
        color: var(--green-color-2);
        border: 2px solid var(--green-color-2);
        cursor: pointer;
      }
      &-cancel {
        border: 2px solid var(--blue-color-3);
        color: var(--blue-color-3);
        cursor: pointer;
      }
      &-disabled {
        color: var(--black-color-5);
        border: 2px solid var(--black-color-5);
        cursor: not-allowed;
      }
      button {
        width: 100%;
        font-weight: bold;
        height: 48px;
        padding: 0 24px;
        border-radius: 24px;
        background-color: transparent;
        box-sizing: border-box;
      }
    }
  }
}
@media (max-width: 576px) {
  .profile-view__form {
    display: block;
  }
}
</style>
