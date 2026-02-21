<template>
    <!-- <ServiceFilter/> -->

		<AppLayout>
			<div v-if="services.length !== 0" class="app-content">
				<div class="service-list">
					<!-- <Service v-for="service in services"
						:service="service.entityData"
						:removeService="removeService"
						:setInfoPopup="setInfoPopup"/> -->

					<div v-for="service in services">
						<AccomodationServiceView v-if="service.entityType === 'accommodation'" :service="service.entityData"/>
						<TransportationServiceView v-if="service.entityType === 'transportation'" :service="service.entityData"/>
						<EducationServiceView v-if="service.entityType === 'education'" :service="service.entityData"/>
					</div>

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
import InfoPopup from '@/components/InfoPopup.vue';
import TransportationServiceView from '@/components/TransportationServiceView.vue';
import EducationServiceView from '@/components/EducationServiceView.vue';
import AccomodationServiceView from '@/components/AccomodationServiceView.vue';

export default defineComponent({
  name: 'HomeView',
  data(){
    return {
        services: [],
        srcUrl: "/api/v1/feed-item",
        query: "",
				infoPopup: {
					state: false,
					className: "",
					text: ""
				}
    };
  },
  mounted(){
    this.fetchServices();
  },
  methods: {
    fetchServices(){


			/*************************************************/
			// axios.get("/api/v1/feed-item")
			// 	.then(res => {
			// 		const { services } = res.data;
			// 		console.log(services);
			// 	})
			// 	.catch(err => console.log(err));
			/*************************************************/


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
		AppLayout,
		TransportationServiceView,
		EducationServiceView,
		AccomodationServiceView
  },
});

</script>
