<template>
  <div>
    <AuthLayout v-if="auth_layout"/>
    <router-view v-else/>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  import AuthLayout from './components/AuthLayout.vue';

  export default defineComponent({
    name: 'App',
    data(){
      return {
        auth_layout: false
      }
    },
    components: {
      AuthLayout,
    },
    created(){
      let token = localStorage.getItem('token');
      if(token !== "" && token !== null){
        this.token = token;
      }

      this.$watch(() => this.$route, (newRoute) => {
        const { meta } = newRoute;

        if(meta.authRoute){
          this.auth_layout = true;
        }else{
          this.auth_layout = false;
        }
      });

    },
  });

</script>

