<template>
  <div class="header">
    <div class="container">
      <div class="header__navbar">
        <div class="header__navbar__content">
          <router-link to="/" class="header__navbar__content__router-link">
            <img
                src="../assets/images/blog-logo.svg"
                alt="Logo"
                class="header__navbar__content__router-link__logo"
            /></router-link>
          <div v-if="isAuth" class="header__navbar__content__isAuth">
            <div class="header__navbar__content__isAuth__dropdown">
              <div class="header__navbar__content__isAuth__dropdown__dropbtn">
                <img
                    :src="logoIcon"
                    alt="Dropdown"
                    class="header__navbar__content__isAuth__dropdown__dropbtn__logo-icon"
                />
              </div>
              <div class="header__navbar__content__isAuth__dropdown__content">
                <router-link to="/profile">Profile</router-link>
                <a href="#" @click.prevent="logOut"> Log Out</a>
              </div>
            </div>
          </div>
          <router-link
              v-else-if="!isLoggedIn"
              :to="{ name: 'LoginView' }"
              class="header__navbar__content__loginButton"
          >
            Log In
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { computed } from "vue";

const userStore = useUserStore();
const router = useRouter();

const logOut = () => {
  userStore.logout();
  router.push({ name: "HomeView" });
};

const user = computed(() => userStore.getUserData);

const logoIcon = computed(() => {
  return userStore.isAuth && user.value?.avatar
      ? user.value.avatar
      : "./icons/header-unlogged-icon.svg";
});

const isAuth = computed(() => userStore.isAuth);

const isLoggedIn = computed(() => {
  return router.currentRoute.value.name === "LoginView" || userStore.isAuth;
});

</script>

<style lang="scss">
.header {
  padding: var(--grid-8);
  background-color: var(--red-color-1);
  &__navbar {
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__router-link {
        &__logo {
          &:hover {
            cursor: pointer;
          }
        }
      }

      &__isAuth {
        &__dropdown {
          position: relative;
          display: inline-block;

          &__dropbtn {
            background-color: var(--red-color-1);
            cursor: pointer;
            border-radius: 50%;
            &:hover {
              background-color: var(--red-color-2);
            }

            &__logo-icon {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          &:hover &__content {
            display: block;
          }

          &__content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 104px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            z-index: 10;
            right: 0;
            transition: opacity 0.2s ease-in-out;

            a {
              color: var(--black-color-2);
              padding: 12px 14px;
              text-decoration: none;
              display: block;

              &:hover {
                background-color: #f1f1f1;
                border-radius: 8px;
              }
            }
          }
        }
      }

      &__loginButton {
        padding: 8px 24px;
        border: none;
        border-radius: 24px;
        font-size: 18px;
        background-color: var(--white-color-1);
        text-decoration: none;

        display: inline-block;
        position: relative;
        transition: 0.5s;

        &::after {
          content: url("../src/assets/images/black-arrow.svg");
          position: absolute;
          opacity: 0;
          transition: 0.5s;
        }

        &:hover {
          cursor: pointer;
          padding-right: 36px;
          padding-left: 14px;
        }

        &:hover {
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>