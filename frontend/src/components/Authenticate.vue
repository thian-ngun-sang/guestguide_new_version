<template>
    <slot v-if="!isLoading"></slot>
</template>

<script>
    import { defineComponent } from 'vue';
    import axios from 'axios';
		

    export default defineComponent({
        name: 'authenticate',
        data(){
            return {
                isLoading: false
            };
        },
        mounted(){
            // if(this.$store.getters.token){
            //   this.index();
            // }

            // this.$watch(() => this.$store.state.token, () => {
            //     console.log("token changed");
            //     this.index();
            // })
        },
        methods: {
            validateImage(image){
                if(image === undefined || image === "" || image === null){
                    return false;
                }else if(/[a-zA-Z0-9\[\]]+\.[a-z]{3,}/.test(image)){
                    return true;
                }
                return false;
            },
            index(){
                let token = this.$store.getters.token;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                this.isLoading = true;
                axios.get('/api/v1/user/me')
                    .then(res => {
                        const { user } = res.data;

                        if(!this.validateImage(user.profile_image)){
														if(user.gender === "male"){ 
															user.profile_image = "defaults/male.jpg";
														}else if(user.gender == "female"){
															user.profile_image = "defaults/female.jpg";
														}else{
															user.profile_image = "defaults/user.jpg";
														}
                        }
                        if(!this.validateImage(user.cover_image)){
                            user.cover_image = "defaults/coverImage.jpg";
                        }

                        this.$store.dispatch("setUser", user);
                        this.isLoading = false;
                    })
                    .catch(err => {
                        this.isLoading = false;
                        this.$router.push("/login");
                        console.error(err.response);
                    });
            }
        }
    })
</script>
