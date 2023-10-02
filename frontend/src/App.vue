<template>
  <div>
    <Authenticate>
      <AuthLayout v-if="auth_layout"/>
      <Authorize v-else>
        <AppLayout/>
      </Authorize>
    </Authenticate>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  import AppLayout from "./components/AppLayout.vue";
  import AuthLayout from './components/AuthLayout.vue';
  import Authenticate from './components/Authenticate.vue';
  import Authorize from './components/Authorize.vue';

  export default defineComponent({
    name: 'App',
    data(){
      return {
        auth_layout: false
      }
    },
    components: {
      Authenticate,
      Authorize,
      AppLayout,
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

