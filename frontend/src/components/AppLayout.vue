<template>
  <div class="app-layout">
    <div class="main-content">

      <Navbar :openCreateTransportationPopup="openCreateTransportationPopup"
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
  .app-view{
		margin-top: 9.5rem;
  }

  .main-content{
    /* margin-inline: 15%; */
		margin-inline: var(--app-padding-inline);
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
		min-height: 15rem;
		max-height: 20rem;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		scroll-snap-type: y mandatory;
	}

	.create-service-img-preview{
		border-radius: 0.35rem;
		aspect-ratio: 4/2;
		object-fit: cover;	
		user-select: none;
		scroll-snap-align: center;
	}

	.create-service-top-bar{
		border-top-left-radius: 0.35rem;
		border-top-right-radius: 0.35rem;
		background-color: var(--img-overlay);
		gap: 0.5rem;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.create-service-top-bar > .icon-sm{
		font-size: 1.25rem;
		color: white;
		cursor: pointer;
	}

	.disabled{
		opacity: 0.4;
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
