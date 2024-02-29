<template>
	<section class="signup">
		<div class="signup__content">
			<div class="signup__content__header">
				<h1 class="signup__content__header__title">Create account</h1>
			</div>
			<form @submit.prevent="handleSubmit" class="signup__content__form">
				<div class="flex sm-flex-column">
					<div class="signup__content__form__item mr-8 sm-mr-0">
						<InputComponent
							v-model="form.firstName"
							borderless
							placeholder="First name"
							:error="v$.form.firstName.$error"
						/>
						<span
							v-if="v$.form.firstName.$error"
							class="signup__content__form__item__error"
						>
							{{ v$.form.firstName.$errors[0].$message }}
						</span>
					</div>
					<div class="signup__content__form__item ml-8 sm-ml-0">
						<InputComponent
							v-model="form.lastName"
							borderless
							placeholder="Last name"
							:error="v$.form.lastName.$error"
						/>
						<span
							v-if="v$.form.lastName.$error"
							class="signup__content__form__item__error"
						>
							{{ v$.form.lastName.$errors[0].$message }}
						</span>
					</div>
				</div>
				<div class="signup__content__form__item">
					<InputComponent
						v-model="form.email"
						borderless
						placeholder="Email"
						:error="v$.form.email.$error"
					/>
					<span
						v-if="v$.form.email.$error"
						class="signup__content__form__item__error"
					>
						{{ v$.form.email.$errors[0].$message }}
					</span>
				</div>

				<div class="signup__content__form__item">
					<InputComponent
						v-model="form.password"
						borderless
						type="password"
						placeholder="Password"
						:error="v$.form.password.$error"
					/>
					<span
						v-if="v$.form.password.$error"
						class="signup__content__form__item__error"
					>
						{{ v$.form.password.$errors[0].$message }}
					</span>
				</div>

				<div class="signup__content__form__submit">
					<button
						class="signup__content__form__submit__btn"
						@click.prevent="handleSubmit"
					>
						Sign up
					</button>
					<img
						src="../assets/images/arrow.svg"
						alt="Arrow to the right"
						class="signup__content__form__submit__arrow"
					/>
				</div>
				<div class="signup__content__form__footer">
					<p>
						Do you have an account?
						<router-link
							class="login__content__form__footer__link"
							:to="{ name: 'LoginView' }"
						>
							Login
						</router-link>
					</p>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useUserStore } from "@/stores/userStore";
import InputComponent from "@/components/InputComponent.vue";
// ToDo Create notification service
// ToDo Create loading button component
export default {
	components: { InputComponent },
	setup() {
		return { v$: useVuelidate(), userStore: useUserStore() };
	},
	data() {
		return {
			form: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			},
		};
	},
	validations() {
		return {
			form: {
				firstName: { required, minLength: minLength(4) },
				lastName: { required, minLength: minLength(1) },
				email: { required, email },
				password: { required },
			},
		};
	},
	methods: {
		async handleSubmit() {
			try {
				if (this.v$.$invalid) {
					this.v$.$touch();
					return;
				}

				await this.userStore.signup(this.form);

				this.$router.push({ name: "LoginView" });
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="scss">
.signup {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	background: var(--background-gradient);

	&__content {
		border: none;
		border-radius: var(--grid-24);
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
				margin-top: var(--grid-12);
				&__error {
					color: var(--red-color);
					font-size: var(--grid-16);
					display: flex;
					margin-top: var(--grid-8);
				}
			}

			&__submit {
				position: relative;
				margin-top: 16px;
				&__btn {
					background-color: var(--blue-color-2);
					color: var(--white-color-1);
					padding: 12px;
					border-radius: 12px;
					width: 100%;
					border: none;
					cursor: pointer;
				}
				&__arrow {
					width: 46px;
					height: 56px;
					position: absolute;
					top: -4px;
					left: -12px;
				}
			}
			&__footer {
				margin-top: 16px;
				text-align: center;
				&__link {
					text-decoration: none;
					color: var(--blue-color-3);
					cursor: pointer;
				}
			}
		}
	}
}

@media (max-width: 375px) {
	.signup__content__form__fullName {
		display: flex;
		flex-direction: column;
	}
	.signup__content__form__fullName div {
		margin-top: 18px;
	}
}

@media (max-width: 425px) {
	.signup-content {
		padding: 36px;
	}
}

@media (max-width: 768px) {
	.signup {
		width: 100%;
		height: 100%;
	}
}
</style>
