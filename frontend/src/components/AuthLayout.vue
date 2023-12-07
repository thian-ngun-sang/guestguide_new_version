<template>
    <div class="auth-layout">
      <router-view/>
    </div>
</template>
  
<style>
    .auth-layout{
      margin-inline: 30%;
    }

		@media(max-width: 760px){
			.auth-layout{
				margin-inline: 23%;
			}
		}

		@media(max-width: 660px){
			.auth-layout{
				margin-inline: 21%;
			}
		}

		@media(max-width: 660px){
			.auth-layout{
				margin-inline: 19%;
			}
		}

		@media(max-width: 380px){
			.auth-layout{
				margin-inline: 17%;
			}
		}

		@media(max-width: 260px){
			.auth-layout{
				margin-inline: 15%;
			}
		}
</style>
  
  <script>
    import { defineComponent } from 'vue';

    export default defineComponent({
      name: 'AuthLayout'
    });
  </script>
