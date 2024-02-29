<template>
	<section>
		<div class="login">
			<div class="login__content">
				<div class="login__content__header">
					<h1 class="login__content__header__title">Log In</h1>
				</div>
				<form @submit.prevent="handleSubmit" class="login__content__form">
					<div class="login__content__form__item">
						<InputComponent
							v-model="email"
							borderless
							placeholder="Email"
							:error="v$.email.$error"
						/>
						<span
							v-if="v$.email.$error"
							class="login__content__form__item__error"
						>
							{{ v$.email.$errors[0].$message }}
						</span>
					</div>
					<div class="login__content__form__item">
						<InputComponent
							v-model="password"
							borderless
							type="password"
							placeholder="Password"
							:error="v$.password.$error"
						/>
						<span
							v-if="v$.password.$error"
							class="login__content__form__item__error"
						>
							{{ v$.password.$errors[0].$message }}
						</span>
					</div>
					<button type="submit" class="login__content__form__btn">
						Log in
					</button>
					<div class="login__content__form__footer">
						<p>
							Don't have an account?
							<router-link
								class="login__content__form__footer__link"
								:to="{ name: 'SignupView' }"
							>
								Create one
							</router-link>
						</p>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useUserStore } from "@/stores/userStore";
import InputComponent from "@/components/InputComponent.vue";

export default {
	components: { InputComponent },
	setup() {
		return { v$: useVuelidate(), userStore: useUserStore() };
	},
	data() {
		return {
			email: "",
			password: "",
			isInvalid: false,
		};
	},
	validations() {
		return {
			email: { required, email },
			password: { required },
		};
	},
	methods: {
		async handleSubmit() {
			try {
				if (this.v$.$invalid) {
					this.v$.$touch();
					return;
				}

				await this.userStore.login(this.email, this.password);

				await this.userStore.getUser();

				this.$router.push({ name: "HomeView" });
			} catch (error) {
				console.log("The user does not exist!");
			}
		},
	},
};
</script>

<style lang="scss">
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	background: var(--background-gradient);

	&__content {
		border: none;
		border-radius: 24px;
		padding: 72px 96px 96px;
		background-color: var(--white-color-1);

		&__header {
			display: flex;
			flex-direction: column;
			align-items: center;

			&__title {
				color: var(--black-color-1);
				font-size: 36px;
				font-weight: bold;
			}
		}
		&__form {
			&__item {
				display: flex;
				flex-direction: column;
				margin-top: 16px;
				&__error {
					color: var(--red-color);
					font-size: var(--grid-16);
					display: flex;
					margin-top: var(--grid-8);
				}
			}
			&__btn {
				background-color: var(--blue-color-2);
				color: var(--white-color-1);
				padding: 12px;
				border-radius: 12px;
				width: 100%;
				border: none;
				margin-top: 16px;
				cursor: pointer;
			}
			&__footer {
				margin-top: 16px;
				&__link {
					text-decoration: none;
					color: var(--blue-color-3);
					cursor: pointer;
				}
			}
		}
	}
}

@media (max-width: 425px) {
	.login__content {
		padding: 32px;
	}
}

@media (max-width: 768px) {
	.login {
		width: 100%;
		height: 100%;
	}
}
</style>
