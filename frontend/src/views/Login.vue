<template>
    <div class="login-form-view">
        <form v-on:submit="login">
            <div>
                <label class="form-label">Email</label>
                <input class="form-control" type="email" v-model="form.email"/>
								<small v-if="isSubmitted && form.email === ''" class="text-danger">Email cannot be empty</small>
            </div>

            <div>
                <label class="form-label">Password</label>
                <input class="form-control" type="password" v-model="form.password"/>
								<small v-if="isSubmitted && form.password === ''" class="text-danger">Password cannot be empty</small>
            </div>

            <div class="text-end mt-2">
                <input type="submit" value="Login"/>
            </div>
				</form>
        <div class="mt-2">
            <span>You don't have an account? </span>
            <router-link class="ms-1s" to="/register">Register</router-link>
        </div>
				<div v-if="httpErrorMessage" class="text-danger text-center">
					{{ httpErrorMessage }}
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
                	email: "",
                	password: ""
								},
								httpErrorMessage: "",
								isSubmitted: false
            };
        },
        methods: {
            login(e){
                e.preventDefault();
								this.isSubmitted = true;

								if(this.form.email === "" || this.form.password === ""){
									return;
								}
                
                const response = axios.post('/api/auth/login', { ...this.form })
                    .then(res => {
                        const data = res.data;
                        const { token } = data;
                        // console.log(data);

                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        this.$store.commit('setToken', token);
                        this.$router.push('/account');
                        // this.$store.commit('setAuthentication', true);
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
