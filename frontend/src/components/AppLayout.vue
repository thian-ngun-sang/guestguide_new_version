<template>
  <div class="app-layout">
    <div class="main-content">

      <Navbar class="app-nav" :openCreateTransportationPopup="openCreateTransportationPopup"
				:openCreateAccomodationPopup="openCreateAccomodationPopup"
				:openCreateEducationPopup="openCreateEducationPopup"/>

      <!-- Value from Views and Components go here -->
      <div class="app-view">
				<slot/>
      </div>
    </div>

				<CreateTransportationPopup v-if="createTransportationPopup" :closeCreateTransportationPopup="closeCreateTransportationPopup"/>
				<CreateAccomodationPopup v-if="createAccomodationPopup" :closeCreateAccomodationPopup="closeCreateAccomodationPopup"/>
				<CreateEducationPopup v-if="createEducationPopup" :closeCreateEducationPopup="closeCreateEducationPopup"/>


  </div>
</template>
  
<style lang="scss" scope>
  .app-nav{
    position: fixed;
    top: 0px;
    left: 15%;
    right: 15%;
    background-color: white;
    z-index: 2;
  }

  .app-view{
		margin-top: 9.5rem;
  }

  .left-side-bar{
    position: fixed;
    // top: 50px;
    top: 70px;
    left: 1.5%;
    padding-right: 1%;
    border-right: 1px solid rgb(30, 30, 39);
    // height: 100vh;
    height: 88vh;
  }

  .right-side-bar{
    position: fixed;
    top: 50px;
    right: 0%;
    width: 150px;
    margin-right: 15px;
    padding-left: 15px;
    border-left: 1px solid rgb(30, 30, 39);
    height: 100vh;
  }

  .main-content{
    margin-inline: 15%;
  }

  #searchBar{
    width: 300px;
  }

	.create-service-popup{
		z-index: 2;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #000000AA;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-inline: var(--popup-padding-inline);
	}

	.create-service-popup-body{
		width: 100%;
		border-radius: 0.2rem;
		padding-block: 0.5rem;
	}

	.create-service-field-ctn{
		max-height: 20rem;
		overflow-y: scroll;
	}

	.service-type-chip{
		border: 1px solid black;
		padding: 0.125rem 0.5rem;
		cursor: pointer;
		user-select: none;
	}

	.service-type-chip-selected{
		background-color: #34c58491;
	}

  @media(max-width: 1100px){
    .app-nav{
      left: 17%;
      right: 17%;
    }
  
    .main-content{
      margin-inline: 17%;
    }
  }

  @media(max-width: 960px){

  }

  @media(max-width: 860px){
    .app-nav{
      left: 19%;
      right: 19%;
    }

    .main-content{
      margin-inline: 19%;
    }
  }

  @media(max-width: 760px){
    .main-content{
      margin-inline: 1%;
    }

    .left-side-bar{
      display: none;
    }

    .app-nav{
      left: 1%;
      right: 1%;
    }
  }
</style>
  
<script>
  import { defineComponent } from 'vue';
  import Navbar from './Navbar.vue';
	import CreateTransportationPopup from './CreateTransportationPopup';
	import CreateAccomodationPopup from './CreateAccomodationPopup';
	import CreateEducationPopup from './CreateEducationPopup';

  export default defineComponent({
    name: 'AppLayout',
		data(){
			return {
				createTransportationPopup: false,
				createAccomodationPopup: false,
				createEducationPopup: false
			}
		},
    components: {
      Navbar,
			CreateTransportationPopup,
			CreateAccomodationPopup,
			CreateEducationPopup
    },
		methods: {
			openCreateTransportationPopup(closeCallerDropdown){
				this.createTransportationPopup = true;	
				document.body.style.overflow = 'hidden';

				closeCallerDropdown();
			},
			closeCreateTransportationPopup(){
				this.createTransportationPopup = false;	
				document.body.style.overflow = '';
			},
			openCreateAccomodationPopup(closeCallerDropdown){
				this.createAccomodationPopup = true;	
				document.body.style.overflow = 'hidden';

				closeCallerDropdown();
			},
			closeCreateAccomodationPopup(){
				this.createAccomodationPopup = false;	
				document.body.style.overflow = '';
			},
			openCreateEducationPopup(closeCallerDropdown){
				this.createEducationPopup = true;	
				document.body.style.overflow = 'hidden';

				closeCallerDropdown();
			},
			closeCreateEducationPopup(){
				this.createEducationPopup = false;	
				document.body.style.overflow = '';
			}
		}
  });
</script>
