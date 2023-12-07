<template>
    <div class="register-form-view">
        <form>
            <div>
                <label class="form-label">First Name</label>
                <input class="form-control" type="text" v-model="form.first_name"/>
								<small v-if="isSubmitted && form.first_name === ''" class="text-danger">
									Firstname cannot be empty
								</small>
            </div>

            <div>
                <label class="form-label">Last Name</label>
                <input class="form-control" type="text" v-model="form.last_name"/>
						</div>
            <div>
                <label class="form-label">User Name</label>
                <input class="form-control" type="text" v-model="form.user_name"/>
								<small v-if="isSubmitted && form.user_name === ''" class="text-danger">
									Username cannot be empty
								</small>
            </div>

            <div>
                <label class="form-label">Email</label>
                <input class="form-control" type="email" v-model="form.email"/>
								<small v-if="isSubmitted && form.email === ''" class="text-danger">
									Email cannot be empty
								</small>
            </div>

            <div>
                <label class="form-label">Password</label>
                <input class="form-control" type="password" v-model="form.password"/>
								<small v-if="isSubmitted && form.password === ''" class="text-danger">
									Password cannot be empty
								</small>
            </div>

            <div>
                <label class="form-label">Confirm Password</label>
                <input class="form-control" type="password" v-model="form.password2"/>
								<small v-if="isSubmitted && form.password2 === ''" class="text-danger">
									Confirm password cannot be empty
								</small>	
            </div>

            <div class="text-end mt-2">
                <input type="button" v-on:click="register" value="Register"/>
            </div>

						<div v-if="httpErrorMessage" class="text-danger text-center">
							{{ httpErrorMessage }}
						</div>
						<div v-if="isSubmitted && form.password !== form.password2" class="text-danger text-center">
							Passwords do not match	
						</div>
        </form>
        <div class="mt-1">
            <span class="me-2">You have an account ?</span>
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import axios from 'axios';

    export default defineComponent({
        name: 'login',
        data(){
            return {
                form: {
									first_name: "",
									last_name: "",
									user_name: "",
									email: "",
									password: "",
									password2: "",
								},
								httpErrorMessage: "",
								isSubmitted: false
            };
        },
        methods: {
            register(){
								this.isSubmitted = true;
								if(this.form.first_name === "" || this.form.user_name === "" || this.form.email === ""
									|| this.form.password === "" || this.form.password2 === ""){
										return;
								}
								if(this.form.password !== this.form.password2){
										return;
								}

                axios.post('/api/auth/register', { ...this.form })
                    .then(res => {
                        const data = res.data;
                        const { token } = data;

                        this.$store.commit('setToken', token);
                        // this.$store.commit('setAuthentication', true);
                        this.$router.push('/account');
                    })
                    .catch(error => {
											const { msg } = error.response.data;
											if(msg !== undefined && msg !== null){
												this.httpErrorMessage = msg;
											}
										})
            }
        }
    });
</script>
