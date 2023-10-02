<template>
    <div class="create-service-form-wrapper">
        <div class="text-center mb-3">
            <h5>Make a better world with your very service</h5>
        </div>
        <div class="create-service-form">
            <form v-on:submit.prevent="submitForm">
                <div v-if="formStep === 1">
                    <div class="my-3">
                        <label>Description</label>
                        <textarea class="w-100" placeholder="Describe your service" v-model="form.description"></textarea>
                    </div>
                    <div class="my-3">
                        <label>What kind of service</label><br/>
                        <select class="w-100" v-on:change="handleServiceType($event)" v-model="form.serviceType">
                            <option :value="serviceType" v-for="(serviceType, index) in serviceTypes" :key="index">{{ serviceType }}</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <label>Please select service category</label><br/>
                        <select class="w-100" v-model="form.subCategory">
                            <option :value="subcategory" v-for="(subcategory, index) in subCategory" :key="index">{{ subcategory }}</option>
                        </select>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-sm btn-success" v-on:click="handleNextStep">Next Step</button>
                    </div>
                </div>
                <div v-else-if="formStep === 2">
                    <div>
                        <button class="btn btn-sm btn-secondary" v-on:click="handlePrevStep">Back</button>
                    </div>
                    <div class="my-3">
                        <label>Address</label>
                        <input type="text" class="w-100" placeholder="Country, Town, ward" v-model="form.address"/>
                    </div>
                    <div class="my-3">
                        <label>Phone</label>
                        <input type="tel" class="w-100" placeholder="09xxxxxxxxx" v-model="form.phone"/>
                    </div>
                    <div v-if="form.file.file !== ''">
                        <img v-if="form.file.type === 'image'" class="make-service-file" :src="form.file.file"/>
                    </div>
                    <!-- <div class="text-align-center file-box"> -->
                    <div class="">
                        <input type="file" id="upload-file" class="d-none" placeholder="Image or video" v-on:change="handleFileUpload($event)"/>
                        <label v-if="form.file.file === ''" for="upload-file" class="btn btn-sm btn-secondary">
													Add image
												</label>
												<div v-else class="text-end mt-1">
													<button v-on:click="cancelFileUpload" type="button" class="c-btn btn btn-sm btn-secondary w-45">
														Delete Image
													</button>
													<label for="upload-file" class="c-btn btn btn-sm btn-secondary w-45 ms-1">
														Change Image
													</label>
												</div>
                    </div>
                    <div class="text-end mt-3">
                        <button type="submit" class="btn btn-sm btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="text-center">
            <div class="text-danger" v-for="err in error.messages">{{ err }}</div>
        </div>
    </div>
    
</template>
  
<style>

.create-service-form{
    box-shadow: 0.05px 0.05px 0.9px black;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 2px;
    margin-inline: 1px;
}

.file-box{
    border: 2px solid rgb(58, 226, 40);
    border-radius: 4px;
}

.make-service-file{
    width: 100%;
    height: 380px;
    object-fit: cover;
}
</style>
  
<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'createService',
    data(){
        return{
            serviceTypes: ["transition", "housing", "courses"],
            subCategoryList: [
                ["taxi", "air ticket"],
                ["hotel", "rent"],
                ["online", "inclass"],
            ],
            subCategory: [],
            form: {
                description: "",
                serviceType: "transition",
                subCategory: "",
                address: "",
                phone: "",
                file: {
                    data: {},
                    file: "",
                    type: ""
                }
            },
            formStep: 1,
            error: {
                messages: []
            }
        }
    },
    mounted(){
        this.subCategory = this.subCategoryList[0];
        this.form.subCategory =this.subCategory[0];
    },
    methods: {
        handleServiceType(event){
            let value = event.target.value;
            let serviceTypes = this.serviceTypes;
            let subCategoryIndex = serviceTypes.indexOf(value);
            let subCategoryList = this.subCategoryList;
            this.subCategory = subCategoryList[subCategoryIndex];
            this.form.subCategory = this.subCategory[0];
        },
        handleFileUpload(event){
            const reader = new FileReader();

            let file = event.target.files[0];
            let imageTypes = ["image/jpeg", "image/png"];

            reader.onload = () => {
                this.form.file.file = reader.result;
            }

            if(imageTypes.includes(file.type)){
                this.form.file.type = "image";
                this.form.file.data = file;

                let prevError = this.error.messages.indexOf("Invalid file type") ;
                if(prevError !== -1){
                    this.error.messages.splice(prevError, 1);
                }

                reader.readAsDataURL(file);
            }else{
                this.error.messages.push("Invalid file type");
            }
        },
				cancelFileUpload(){
					this.form.file = {
                    data: {},
                    file: "",
                    type: ""
                }
				},
        handleNextStep(){
            const { description } = this.form;

            if(description === ""){
                if(!this.error.messages.includes("Description cannot be empty")){
                    this.error.messages.push("Description cannot be empty");
                }
            }else{
                let errorIndex = this.error.messages.indexOf("Description cannot be empty");
                if(errorIndex !== -1){
                    this.error.messages.splice(errorIndex, 1);
                }

                this.formStep = 2;
            }
        },
        handlePrevStep(){
            this.formStep = 1;
        },
        submitForm(){
            const { data: file } = this.form.file;
            const { description, serviceType, subCategory, address, phone } = this.form;

            const formData = new FormData();
            
            if(file.constructor.name === "File"){
                formData.append("file", file);
            }

            formData.append("description", description);
            formData.append("serviceType", serviceType);
            formData.append("subCategory", subCategory);
            formData.append("address", address);
            formData.append("phone", phone);

            const headers = {
                        'Content-Type': 'x-www-form-urlencoded',
                        // "Content-Type": "multipart/form-data",
                        'Content-Encoding': 'multipart/form-data'
                    }

            if(address === ""){
                if(!this.error.messages.includes("Address cannot be empty")){
                    this.error.messages.push("Address cannot be empty");
                }
            }else{
                let errorIndex = this.error.messages.indexOf("Address cannot be empty");
                if(errorIndex !== -1){
                    this.error.messages.splice(errorIndex, 1);
                }

                if(this.error.messages.length === 0){
                    axios.post("/api/v1/service/create-service", formData, { headers })
                        .then(res => {
                            this.$router.push('/');
                        })
                        .catch(err => console.log(err));
                }
            }
        }
    }
});
</script>
  
