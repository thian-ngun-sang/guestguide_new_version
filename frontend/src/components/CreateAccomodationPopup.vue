<template>
	<div class="create-service-popup">
		<div class="bg-white create-service-popup-body">
			<div class="px-2">
				<font-awesome-icon class="cursor-pointer cicon" :icon="['fas', 'xmark']" @click="closeCreateAccomodationPopup"/>
			</div>
			<div class="divider"></div>

			<div v-if="formStep === 1" class="px-2 pb-2 create-service-field-ctn">
				<div>
					<label class="pt-2 pb-1">Accomodation Type</label>
					<div class="d-flex gap-1">
						<span v-for="serviceType in serviceTypes" class="service-type-chip rounded text-capitalize"
							:class="{ 'service-type-chip-selected': serviceType === this.selectedServiceType }"
							@click="() => { selectServiceType(serviceType) }">
							{{ serviceType }}
						</span>
					</div>
				</div>

				<div>
					<label class="pt-2 pb-1">Description</label>
					<textarea class="w-100" placeholder="Description" v-model="form.description"></textarea>
				</div>

				<div>
					<label class="pt-2 pb-1">Phone</label>
					<input placeholder="09xxxxxxxxxx" class="w-100" v-model="form.phone"/>
				</div>

				<div>
					<label class="pt-2 pb-1">Address</label>
					<textarea class="w-100" placeholder="Your address" v-model="form.address"></textarea>
				</div>

				<div>
					<label class="pt-2 pb-1">Price</label>
					<input placeholder="$" class="w-100" v-model="form.price"/>
				</div>

				<div>
					<label class="pt-2 pb-1">Payment Type</label>
					<div class="d-flex gap-1">
						<span v-for="paymentType in paymentTypes" class="service-type-chip rounded text-capitalize"
							:class="{ 'service-type-chip-selected': paymentType === this.selectedPaymentType }"
							@click="() => { selectPaymentType(paymentType) }">
							{{ paymentType }}
						</span>
					</div>
				</div>
			</div>

			<div v-if="formStep === 2 && !images.length" class="px-2 py-2 create-service-field-ctn">
				<div class="create-service-img-preview h-70">
					<div class="d-flex justify-content-center align-items-center h-100">
						<label for="images" class="cursor-pointer p-2 border border-black border-1 rounded">Add more than two images</label>
						<input type="file" id="images" class="d-none" multiple v-on:change="handleFileInput"/>
					</div>
				</div>
			</div>

			<div v-if="formStep === 2 && images.length" class="px-2 py-2 create-service-field-ctn">
				<div class="w-100 d-flex flex-column gap-2">

					<div v-for="(image, index) in images" class="w-100" ref="images">
						<div class="position-relative">
							<div class="w-100 d-flex align-items-center justify-content-end py-2 px-2 create-service-top-bar">
								<font-awesome-icon v-if="index === 0" class="icon-sm disabled" :icon="['fas', 'chevron-up']"/>
								<font-awesome-icon v-else class="icon-sm" :icon="['fas', 'chevron-up']" @click="moveUp(index)"/>

								<font-awesome-icon v-if="index === images.length - 1" class="icon-sm disabled" :icon="['fas', 'chevron-down']"/>
								<font-awesome-icon v-else class="icon-sm" :icon="['fas', 'chevron-down']" @click="moveDown(index)"/>

								<font-awesome-icon class="icon-sm" :icon="['fas', 'trash-can']" @click="() => { removeImage(image.id) }"/>
							</div>
						</div>
						<img :src="image.url" class="w-100 create-service-img-preview"/>
					</div>
				</div>
			</div>

			<div class="divider"></div>
			<div class="px-2 pt-2 d-flex flex-row-reverse justify-content-between">
				<button v-if="formStep == 1" class="btn btn-sm bg-black text-white" @click="formNextStep">Next</button>

				<button v-if="formStep == 2" class="btn btn-sm bg-black text-white" @click="submit">Submit</button>
				<button v-if="formStep == 2" class="btn btn-sm bg-black text-white" @click="formPrevStep">Back</button>
			</div>

		</div>
	</div>

</template>

<script>
  import { defineComponent } from 'vue';
	import axios from 'axios';

  export default defineComponent({
		name: "CreateAccomodationPopup",
		props: ["closeCreateAccomodationPopup"],
		data(){
			return {
				serviceTypes: ["condo", "apartment", "dormitory"],
				selectedServiceType: "",
				paymentTypes: ["per day", "per month", "per year"],
				selectedPaymentType: "",
				images: [],
				formStep: 1,

				form: {
					serviceType: "",
					description: "",
					price: "",
					paymentType: "",
					phone: "",
					address: "",
					files: null
				}

			}
		},
		mounted(){
			this.selectedServiceType = this.serviceTypes[0];
			this.form.serviceType = this.selectedServiceType;

			this.selectedPaymentType = this.paymentTypes[0];
			this.form.paymentType = this.selectedPaymentType;
		},
		methods:{
			selectServiceType(serviceType){
				this.selectedServiceType = serviceType
				this.form.serviceType = this.selectedServiceType;
			},
			selectPaymentType(paymentType){
				this.selectedPaymentType = paymentType 
				this.form.paymentType = this.selectedPaymentType;
			},
			handleFileInput(event){
				this.images.forEach(img => URL.revokeObjectURL(img.url));
				this.images = [];

				const files = event.target.files;
				this.form.files = Array.from(files);
				for(const file of files){
					if(file.type.startsWith("image/")){
						const url = URL.createObjectURL(file);
						this.images.push({
							id: crypto.randomUUID(),
							file,
							url,
							isCover: false
						});
					}else{
						continue;
					}
				}
			},
			removeImage(id) {
				const index = this.images.findIndex(img => img.id === id);
				if (index === -1) return;

				URL.revokeObjectURL(this.images[index].url);
				this.images.splice(index, 1);
				this.form.files.splice(index, 1);
			},
			moveUp(index){
				if(this.images.length <= 1) return;

				const temp = this.images[index - 1];
				this.images[index - 1] = this.images[index];
				this.images[index] = temp;

				const fileTemp = this.form.files[index - 1];
				this.form.files[index - 1] = this.form.files[index];
				this.form.files[index] = fileTemp;

				this.$nextTick(() => {
					this.$refs.images[index - 1]?.scrollIntoView({
						behavior: "smooth",
						block: "center"
					});
				});
			},
			moveDown(index){
				if(this.images.length <= 1) return;

				const temp = this.images[index + 1];
				this.images[index + 1] = this.images[index];
				this.images[index] = temp;

				const fileTemp = this.form.files[index + 1];
				this.form.files[index + 1] = this.form.files[index];
				this.form.files[index] = fileTemp;

				this.$nextTick(() => {
					this.$refs.images[index + 1]?.scrollIntoView({
						behavior: "smooth",
						block: "center"
					});
				});
			},
			formNextStep(){
				this.formStep = 2;
			},
			formPrevStep(){
				this.formStep = 1;
			},
			submit(){
				const formData = new FormData();
				formData.append("serviceType", this.form.serviceType);
				formData.append("description", this.form.description);
				formData.append("price", this.form.price);
				formData.append("paymentType", this.form.paymentType);
				formData.append("phone", this.form.phone);
				formData.append("address", this.form.address);
				for(const file of this.form.files){
					formData.append("files", file);
				}

				const headers = {
					'Content-Type': 'x-www-form-urlencoded',
					'Content-Encoding': 'multipart/form-data'
				}

				axios.post("/api/v1/accomodation", formData, { headers })
					.then(res => {
							// this.$router.push('/');
							console.log(res);
					})
					.catch(err => console.log(err));
			}

		}
	});
</script>
