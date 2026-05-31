<template>
  <div class="app-padding-inline mb-5">
    <div class="service-detail--nav">
      <font-awesome-icon class="icon-btn mb-2" :icon="['fasr', 'arrow-left']" @click="$router.back()"/>
    </div>

    <div class="position-relative">
				<div class="service-detail--service-container position-relative">
					<div class="position-absolute service-detail--name-wrapper">
						<div class="service-header d-flex justify-content-end align-items-center">
							<font-awesome-icon v-if="service?._meta?.bookmarked?._id" :icon="['fas', 'bookmark']" class="icon-md cursor-pointer"
                @click="toggleBookmark"/>
							<font-awesome-icon v-else :icon="['far', 'bookmark']" class="icon-md cursor-pointer" @click="toggleBookmark"/>
						</div>
					</div>

					<img class="service-detail--service-img" :src="serviceImageUrl"/>
				</div>

        <div class="service-detail--service-ctn">
          <div class="d-flex justify-content-between price-label">
            <span class="text-capitalize">{{ service.serviceType }}</span>
            <span>{{ service.price }}</span>
          </div>

          <div class="location-label">
            {{ service.address }}
          </div>

          <div class="divider my-2"></div>

          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <img :src="profileImageUrl" class="service-detail--user-profile"/>

              <div>
                <span class="user-select-none d-block">{{ service?.user?.first_name }} {{ service?.user?.last_name }}</span>
                <span>Memeber since {{ memeberSince(service?.user?.created_at) }}</span>
              </div>

            </div>
            <span class="solid-btn solid-btn-black"> Call </span>
          </div>
        </div>
    </div>

  </div>
</template>

<style scoped>
</style>

<script>
  import { defineComponent } from 'vue';

  import AppLayout from "@/components/AppLayout.vue";
  import EducationServiceView from '@/components/EducationServiceView.vue';

  import { getEducation } from '@/api/education.api';
  import { createBookmark, deleteBookmark } from '@/api/bookmark.api';

  import { mediaPrefixer } from '@/utils/mediaHelper';

  export default defineComponent({
    name: 'EducationDetailView',
    data(){
      return {
        service: {}
      }
    },
    mounted(){
      const { id } = this.$route.params;
      getEducation(id)
        .then(res => {
          if(res.data?.service){
            this.service = res.data.service;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    computed: {
      profileImageUrl() {
        const image = this.service?.user?.profile_image
        if (!image) {
          return '/images/user-default-avatar.png' // fallback
        }

        return mediaPrefixer.getUrl(image, 'userProfile')
      },
      serviceImageUrl(){
        if(!this.service?.files?.length){
          return "/svgs/image-placeholder.svg "
        }

        return mediaPrefixer.getUrl(this.service.files[0], 'education')
      },
    },
    methods: {
      toggleBookmark(){
        if(!this.service?._meta.bookmarked?._id){
          createBookmark({ entityId: this.service._id, entityType: "education" })
            .then(res => {
              const { bookmarked } = res.data
              this.service._meta.bookmarked = bookmarked;
            })
            .catch(err => console.log(err.response));
        }else{
          deleteBookmark(this.service?._meta?.bookmarked._id)
            .then(res => {
              this.service._meta.bookmarked = null;
            })
            .catch(err => console.log(err.response));
        }
      },

      memeberSince(date){
        const d = new Date(date);

        if (isNaN(d.getTime())) {
          return ""; // or throw error / return "Invalid date"
        }

        return d.getFullYear()
      }
    },
    components: { AppLayout, EducationServiceView } })
</script>
