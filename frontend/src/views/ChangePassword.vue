<template>
		<div class="change-password-form-view">
			<div>
					<span v-on:click="$router.back()" class="cursor-pointer">
							<font-awesome-icon class="back-btn" :icon="['fasr', 'arrow-left']" />
					</span>
			</div>
			<div class="text-center">
				<span>Change Your Password</span>
			</div>
			<form v-on:submit.prevent="submitForm">
					<div class="my-3">
						<label class="form-label">Old Password</label>
						<input class="form-control" type="password" v-model="form.oldPassword" placeholder=""/>
						<small v-if="isSubmitted && form.oldPassword === ''" class="text-danger">Old password cannot be empty</small>
					</div>

					<div class="my-3">
						<label class="form-label">New Password</label>
						<input class="form-control" type="password" v-model="form.newPassword" placeholder=""/>
						<small v-if="isSubmitted && form.newPassword === ''" class="text-danger">New password cannot be empty</small>
					</div>

					<div class="my-3">
						<label class="form-label">Confirm Password</label>
						<input class="form-control" type="password" v-model="form.confirmPassword" placeholder=""/>
						<small v-if="isSubmitted && form.confirmPassword === ''" class="text-danger">Confirm password cannot be empty</small>
					</div>

					<div class="text-end mt-2">
						<input type="submit" value="Change"/>
					</div>
					<div class="text-center text-danger" v-if="httpErrorMessage !== ''">
						{{ httpErrorMessage }} 
					</div>
			</form>
		</div>
</template>

<style>
    .back-btn{
        font-size: 25px;
    }
</style>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default (defineComponent({
	name: "changePassword",
	data(){
		return {
			form: {
				oldPassword: "",
				newPassword: "",
				confirmPassword: ""
			},
			httpErrorMessage: "",
			isSubmitted: false
		};
	},
	methods: {
		submitForm(){
			this.isSubmitted = true;
			if(this.form.oldPassword === "" || this.form.newPassword === "" || this.form.confirmPassword === ""){
				return;
			}

			if(this.form.newPassword !== this.form.confirmPassword){
				this.httpErrorMessage = "Passwords do not match";
				return;
			}

			axios.post("/api/auth/change-password", this.form)
				.then(res => {
					this.$router.push("/account");
				})
				.catch(err => {
					const { msg } = err.response.data;
					if(msg !== undefined && msg !== null){
						this.httpErrorMessage = msg;
					}
				});
		}
	}
}));

</script>
