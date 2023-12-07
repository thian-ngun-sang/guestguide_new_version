<template>
	<div class="saved-service-ctn">
		<div v-for="savedService in savedServices">
			<SavedService :savedService="savedService"
				:removeSavedService="removeSavedService"
				:setInfoPopup="setInfoPopup"/>
		</div>
		<InfoPopup v-if="infoPopup.state"
			:classProp="infoPopup.className"
			:text="infoPopup.text"
			:close="removeInfoPopup"
			duration="4000"/>
	</div>
</template>

<style>
	.saved-service-ctn{
		padding-top: 0.5rem;
	}

	@media(max-width: 960px){
		.saved-service-ctn{
			padding-top: 0.2rem;
		}
	}

	@media(max-width: 860px){
		.saved-service-ctn{
			padding-top: 0rem;
		}
	}
</style>

<script>
	import axios from 'axios';
	import { defineComponent } from 'vue';

	import SavedService from '../components/SavedService';
	import InfoPopup from '@/components/InfoPopup.vue';

	export default defineComponent({
		name: "saved-services",
		components: {
			SavedService,
			InfoPopup 
		},
		data(){
			return {
				savedServices: [],
				infoPopup: {
					state: false,
					className: "",
					text: ""
				}
			}
		},
		mounted(){
			axios.get("/api/v1/saved-services")
				.then(res => {
					const { savedServices } = res.data;
					this.savedServices = savedServices;
				})
				.catch(err => {
					console.log(err.response.data);
				})
		},
		methods: {
			removeSavedService(serviceId){
				this.savedServices = this.savedServices.filter(service => {
					return service._id !== serviceId;
				})
			},
			setInfoPopup(data){
				this.infoPopup = data;
			},
			removeInfoPopup(){
				this.infoPopup = {
					state: false,
					className: "",
					text: ""
				}
			}
		}
	});
</script>
