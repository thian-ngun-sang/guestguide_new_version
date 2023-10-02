<template>
    <slot></slot>
</template>

<script>
    import { defineComponent } from 'vue';
		import { mapGetters } from 'vuex';

    export default defineComponent({
        name: 'Authorize',
				computed: {
						...mapGetters(["getUser"]),
				},
        data(){
            return {
                authorized: false
            };
        },
        mounted(){
          	this.authorize();

            this.$watch(() => this.$route, (newRoute, oldRoute) => {
                const { meta } = newRoute;

                // if authenticated user tries to get like '/login' redirect him/her to '/user-profile'
                if(meta.unauthenticated && this.authorized){
                    this.$router.push('/user-profile');
                }

                // if unknown user tries to navigate to url like '/user-profile' redirect him/her to '/login'
                if(meta.loginRequired && !this.authorized){
                    this.$router.push('/login');
                }
            })
        },
				methods: {
					authorize(){
						if(Object.keys(this.$store.state.user).length > 1){
                this.authorized = true;
            }
					}
				}
				
    })
</script>
