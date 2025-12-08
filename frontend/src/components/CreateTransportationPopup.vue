<template>
	<div class="create-service-popup">
		<div class="bg-white create-service-popup-body">
			<div class="px-2">
				<font-awesome-icon class="cursor-pointer cicon" :icon="['fas', 'xmark']" @click="closeCreateTransportationPopup"/>
			</div>
			<div class="divider"></div>
			<div class="px-2 pb-2 create-service-field-ctn">
				<label class="pt-2 pb-1">Transportation Type</label>
				<div class="d-flex gap-1">
					<span v-for="serviceType in serviceTypes" class="service-type-chip rounded text-capitalize"
						:class="{ 'service-type-chip-selected': serviceType === this.selectedServiceType }"
						@click="() => { selectServiceType(serviceType) }">
						{{ serviceType }}
					</span>
				</div>

				<label class="pt-2 pb-1">Phone</label>
				<input placeholder="09xxxxxxxxxx" class="w-100"/>

				<label class="pt-2 pb-1">Address</label>
				<textarea class="w-100" placeholder="Your address"></textarea>
			</div>
			<div class="divider"></div>
			<div class="px-2 pt-2 text-end">
				<button class="btn btn-sm bg-black text-white">Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
		name: "CreateTransportationPopup",
		props: ["closeCreateTransportationPopup"],
		data(){
			return {
				serviceTypes: ["taxi", "two wheeler", "three wheeler", "air ticket"],
				selectedServiceType: ""
			}
		},
		mounted(){
			this.selectedServiceType = this.serviceTypes[0];
		},
		methods:{
			selectServiceType(serviceType){
				this.selectedServiceType = serviceType
			}
		}
	});
</script>
