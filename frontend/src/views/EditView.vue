<template>
    <div class="">
        <div>
            <div>
                <div>
                    <span onclick="history.back()" class="c-btn text-success">Back</span>
                </div>
                <form v-on:submit.prevent="submitForm" class="mb-2">
                    <div class="my-3">
                        <label>Description</label>
                        <textarea class="w-100" placeholder="Describe your service" v-model="service.description"></textarea>
                    </div>
                    <div class="my-3">
                        <label>What kind of service</label><br/>
                        <select class="w-100" id="service-category" v-on:change="handleServiceType($event)" v-model="service.type">
                            <option :value="category.value" v-for="(category, index) in categoryList" :key="index">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <label>Please select service sub-category</label><br/>
                        <select class="w-100" v-model="service.category">
                            <option :value="subcategory" v-for="(subcategory, index) in currentSubCategory" :key="index">{{ subcategory }}</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <label>Address</label>
                        <input type="text" class="w-100" placeholder="Country, Town, ward" v-model="service.address"/>
                    </div>
                    <div class="my-3">
                        <label>Phone</label>
                        <input type="tel" class="w-100" placeholder="09xxxxxxxxx" v-model="service.phone"/>
                    </div>
                    <div v-if="service.file !== '' && service.file !== undefined">
                        <img class="front-img" :src="baseUrl+'/posts/'+service.file" />
                    </div>

                    <div class="text-end mt-2">
                        <button class="btn btn-sm btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
    .front-img{
        width: 100%;
        height: 350px;
        padding: 16px 0px 0px 0px;
    }
</style>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomeView',
  data(){
        return{
            categoryList: [
                {name: "Transition", value: "transition"},
                {name: "Housing", value: "housing"},
                {name: "Courses", value: "courses"}],
            subCategoryList: {
                transition: ["taxi", "air ticket"],
                housing: ["hotel", "rent"],
                courses: ["online", "inclass", "weekends", "specific days"],
            },
            currentSubCategory: [],
            service: {
                _id: "",
                address: "",
                category: "",
                description: "",
                file: "",
                phone: "",
                type: "",
                user: ""
            },
            baseUrl: "http://127.0.0.1:3000"
        }
    },
    mounted(){
        this.currentSubCategory = this.subCategoryList.transition;

        const { id } = this.$route.params;

        if(id !== null && id !== undefined){
            axios.get(`/api/v1/service/fetch/${id}`)
                .then(res => {
                    const { service } = res.data;
                    if(service !== null && service !== undefined){
                        // console.log(service);
                        this.service = service;
                        this.serviceType = service.type;
                        this.serviceCategory = service.category;

                        this.currentSubCategory = this.subCategoryList[service.type];
                    }
                })
                .catch(err => console.log(err.response));
        }
    },
    methods: {
        handleServiceType(event){
            this.currentSubCategory = this.subCategoryList[event.target.value];
            this.service.category = this.currentSubCategory[0];
        },
        submitForm(){
            const { id } = this.$route.params;
            if(id !== null && id !== undefined){
                const { file, ...data } = this.service;

                axios.patch(`/api/v1/service/update/${id}`, data)
                    .then(res => {
                        console.log(res.data);
                        const { serviceType } = res.data;

                        this.$router.push(`/${serviceType}`);
                    })
                    .catch(err => console.log(err.response));
            }
        }
    }
});
</script>
