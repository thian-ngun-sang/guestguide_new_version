<template>
		<AppLayout>
			<div v-if="services.length !== 0" class="app-content app-padding-bottom">
				<div class="service-list">
					<TransportationServiceView v-for="service in services"
						:service="service"/>

					<div v-if="services.length <= 2"></div>
					<div v-if="services.length <= 1"></div>
				</div>
			</div>
      <div ref="sentinel"></div>
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
import { getTransportationList } from '@/api/transportation.api';

import AppLayout from "../components/AppLayout.vue";
import TransportationServiceView from '@/components/TransportationServiceView.vue';

export default defineComponent({
  name: 'TransportationView',
  data(){
    return {
				services: [],
        nextCursor: null,
        loading: false,
        hasMore: true,

        observer: null,

				infoPopup: {
					state: false,
					className: "",
					text: ""
				}
    };
  },
  mounted(){
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.loading && this.hasMore) {
        this.fetchServices();
      }
    }, { rootMargin: "200px" });

    this.fetchServices().then(() => {
      this.$nextTick(() => {
        this.observer.observe(this.$refs.sentinel);
      });
    });
  },
  methods: {
    fetchServices(){
      if (this.loading || !this.hasMore) return Promise.resolve();  // always return a promise

      this.loading = true;

      const query = this.getQueryData();
      return getTransportationList(query)
        .then(res => {
          const { services, nextCursor } = res.data;
          this.services = [ ...this.services, ...services ];

          this.nextCursor = nextCursor;
          this.hasMore    = this.nextCursor !== null;
          this.loading    = false;

          if (!this.hasMore) this.observer?.disconnect();
        })
        .catch(err => {
          console.log(err)
          this.loading    = false;
        });
    },
    getQueryData(){
      let query = "";

      let q = this.$route.query.q;
      if(q !== undefined && q !== ''){
        query = query + `?q=${q}`;
      }

      let type = this.$route.query.type;
      if(type !== undefined && type !== ''){
        query = query + `&type=${type}`;
      }

      let phone = this.$route.query.phone;
      if(phone !== undefined && phone !== ''){
        query = query + `&phone=${phone}`;
      }

      let nearby = this.$route.query.nearby;
      if(nearby !== undefined && nearby === 'true'){
        query = query + `&nearby=${nearby}`;
      }

      if(this.nextCursor){
        query = query + `&cursor=${this.nextCursor}`;
      }

      if(query.startsWith("&")){
        let modifiedQuery = query.replace(/^&/, "?");
        query = modifiedQuery;
      }

			return query;
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
	watch: {
    '$route.query'() {
      this.services    = [];
      this.nextCursor  = null;
      this.hasMore     = true;
      this.loading     = false;
      this.observer?.disconnect();

      this.fetchServices().then(() => {
        this.$nextTick(() => {
          this.observer.observe(this.$refs.sentinel);
        });
      });
    }
	},
  components: {
    // ServiceFilter,
		AppLayout,
		TransportationServiceView
  },
});

</script>
