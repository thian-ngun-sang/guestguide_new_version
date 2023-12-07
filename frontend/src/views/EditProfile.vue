<template>
    <div class="edit-profile-form-view">
        <div>
            <span v-on:click="$router.back()" class="cursor-pointer">
                <font-awesome-icon class="back-btn" :icon="['fasr', 'arrow-left']" />
            </span>
        </div>
        <form v-on:submit.prevent="submitForm">
            <div>
                <label class="form-label">First Name</label>
                <input class="form-control" type="text" v-model="user.first_name"/>
            </div>

            <div>
                <label class="form-label">Last Name</label>
                <input class="form-control" type="text" v-model="user.last_name"/>
            </div>

            <div>
                <label class="form-label">User Name</label>
                <input class="form-control" type="text" v-model="user.user_name"/>
            </div>

            <div>
                <label class="form-label">Email</label>
                <input class="form-control" type="email" v-model="user.email"/>
            </div>

						<div>
                <label class="form-label">Gender</label>
								<select class="form-select" v-model="user.gender">
									<option value="">Undefined</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
            </div>

            <div class="text-end mt-2">
                <input type="submit" value="Submit"/>
            </div>
        </form>
				<div class="text-danger" v-if="httpErrorMessage !== ''">
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
                user: {
                    email: "",
                    first_name: "",
                    last_name: "",
                    user_name: "",
										gender: ""
                },
								httpErrorMessage: ""
            };
        },
        mounted(){
            axios.get("/api/v1/user")
                .then(res => {
                    const { user } = res.data;

                    this.user.first_name = user.first_name;
                    this.user.last_name = user.last_name;
                    this.user.user_name = user.user_name;
                    this.user.email = user.email;

										// if the gender of user is undefined, set it to empty string
										this.user.gender = user.gender !== undefined ? user.gender : "";

                    // console.log(res)
                })
                .catch(err => console.log(err))
        },
        methods: {
            submitForm(){
                axios.post("/api/v1/user/update-profile", this.user)
                    .then(res => {
												const { user } = res.data;
												if(user !== undefined){
													this.$store.dispatch("setUser", user)
													this.$router.push('/account');
												}
                    })
                    .catch(err => {
											const { msg } = err.response.data;

											if(msg !== undefined && msg !== null){
												this.httpErrorMessage = msg; 
											}
										})
            }
        }
    });
</script>
