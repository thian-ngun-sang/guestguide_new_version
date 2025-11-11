<template>
    <!-- <ServiceFilter/> -->

		<AppLayout>
			<div v-if="services.length !== 0" class="app-content">
				<div class="service-list">
					<Service v-for="service in services"
						:service="service"
						:removeService="removeService"
						:setInfoPopup="setInfoPopup"/>

					<div v-if="services.length <= 2"></div>
					<div v-if="services.length <= 1"></div>
				</div>

				<InfoPopup v-if="infoPopup.state"
					:classProp="infoPopup.className"
					:text="infoPopup.text"
					:close="removeInfoPopup"
					duration="4000"/>
			</div>
		</AppLayout>
</template>

<style>
  .app-content{
		margin-top: 9.5rem;
  }

	.service-list{
		display: grid;
		gap: 1.3rem;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
	}
</style>

<script>
import { defineComponent } from 'vue';
import axios from "axios";

import Service from "../components/Service.vue";
import AppLayout from "../components/AppLayout.vue";
// import ServiceFilter from '@/components/ServiceFilter.vue';
import InfoPopup from '@/components/InfoPopup.vue';

export default defineComponent({
  name: 'HomeView',
  data(){
    return {
        services: [],
        srcUrl: "/api/v1/service",
        query: "",
				infoPopup: {
					state: false,
					className: "",
					text: ""
				}
    };
  },
  mounted(){
    this.handleSrcUrl(this.$route.path);
    this.fetchServices();

    this.$watch(() => this.$route.path, (newValue) => {
      this.handleSrcUrl(newValue);
      this.fetchServices();
    });

    this.$watch(() => this.$route.query, (newValue, oldValue) => {
      if(Object.keys(newValue).length !== Object.keys(oldValue).length){
      }
      this.fetchServices();
    });
  },
  methods: {
    fetchServices(){
      this.getQueryData();

      if(this.query === ""){
        axios.get(this.srcUrl)
          .then(res => {
            const { services } = res.data;
						// console.log(services);

            this.services = services;
          })
          .catch(err => console.log(err.response));
      }else{
        axios.get(this.srcUrl + this.query)
          .then(res => {
              const { services } = res.data;
              this.services = services;
          })
          .catch(err => console.log(err));
      }
      
    },
    getQueryData(){
      this.query = "";

      let q = this.$route.query.q;
      if(q !== undefined && q !== ''){
        this.query = this.query + `?q=${q}`;
      }

      let type = this.$route.query.type;
      if(type !== undefined && type !== ''){
        this.query = this.query + `&type=${type}`;
      }

      let phone = this.$route.query.phone;
      if(phone !== undefined && phone !== ''){
        this.query = this.query + `&phone=${phone}`;
      }

      let nearby = this.$route.query.nearby;
      if(nearby !== undefined && nearby === 'true'){
        this.query = this.query + `&nearby=${nearby}`;
      }

      if(this.query.startsWith("&")){
        let modifiedQuery = this.query.replace(/^&/, "?");
        this.query = modifiedQuery;
      }

    },
    handleSrcUrl(path){
      if(path === "/"){
        this.srcUrl = "/api/v1/service"
      }else if(path === "/transition"){
        this.srcUrl = "/api/v1/service/vehicles"
      }else if(path === "/courses"){
        this.srcUrl = "/api/v1/service/courses"
      }else if(path === "/housing"){
        this.srcUrl = "/api/v1/service/houses"
      }
    },
		removeService(serviceId){
			this.services = this.services.filter(service => {
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
  },
  components: {
    Service,
    // ServiceFilter,
		InfoPopup,
		AppLayout
  },
});

</script>
