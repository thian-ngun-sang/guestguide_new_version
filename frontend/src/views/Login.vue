<template>
    <div class="login-form-view">
        <form v-on:submit="login">
            <div>
                <label class="form-label">Email</label>
                <input class="form-control" type="email" v-model="form.email" autocomplete="email"/>
								<small v-if="isSubmitted && form.email === ''" class="text-danger">Email cannot be empty</small>
            </div>

            <div>
                <label class="form-label">Password</label>
                <input class="form-control" type="password" v-model="form.password" autocomplete="current-password"/>
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
      async login(e){
        e.preventDefault();
        this.isSubmitted = true;

        if(this.form.email === "" || this.form.password === ""){
          return;
        }

        try{
          await this.$store.dispatch('login', { ...this.form })
          this.$router.push('/account');
        }catch(error){
          if(error?.response?.data){
            const { msg } = error.response.data;
            if(msg){
              this.httpErrorMessage = msg;
              return;
            }
          }

          if(error?.message){
              this.httpErrorMessage = error.message;
          }
        }
      }
    }
  });
</script>
