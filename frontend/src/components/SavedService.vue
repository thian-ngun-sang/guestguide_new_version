<template>
    <div class="position-relative">
        <div>
            <div class="mb-3 d-flex justify-content-between">
                <div class="d-flex align-items-start" v-if="savedService.service !== null">
                    <img class="user-list-img" :src="generateProfileImageUri(savedService.service.user)"/>
                    <div class="text-small text-line-small ms-2 mt-1">
                        <div v-if="savedService.service.user !== null && savedService.service.user !== undefined">
													{{ savedService.service.user.first_name }} {{ savedService.service.user.last_name }}
												</div>
												<div v-else>Deleted User</div>
                        <div class="mt-1">{{ timeAgo(savedService.service.created_at) }}</div>
                    </div>
                </div>
								<div v-else></div>

                <div class="position-relative service-options">
										<!-- service ellipsis icon -->
										<span v-on:click="toggleServiceEllipsis" ref="service-ellipsis">
                    		<font-awesome-icon  class="cicon cursor-pointer" :icon="['fas', 'ellipsis']" />
										</span>

										<!-- service close icon -->
                    <font-awesome-icon v-on:click="() => this.removeSavedService(savedService._id)" class="cursor-pointer ms-2 cicon" :icon="['fas', 'xmark']" />

                    <div :class="ellipsisIsOpen ? '' : 'd-none'" class="position-absolute service--ellipsis-ctn" ref="service-ref">
                        <ul class="list-style-type-none user-select-none">
                            <li v-if="savedService.user?._id === this.$store.state.user._id">
                                <span v-on:click="deleteSavedServiceRequest" class="c-btn btn-green">
																	Delete
																</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

						<div v-if="savedService.service !== null">
							<div>
								<div>
										<b class="me-1">Around:</b>
										<span>{{ savedService.service.address }}</span>
								</div>
								<div v-if="savedService.service.phone !== ''">
										<b class="me-1">Phone:</b>
										<span>{{ savedService.service.phone }}</span>
								</div>
								<div>
										<b class="me-1">Description:</b>
										<span>{{ savedService.service.description }}</span>
								</div>
							</div>
							<div class="text-align-center" v-if="savedService.service.file">
									<img class="front-img" :src="`${this.$store.state.baseUrl}/posts/${savedService.service.file}`"/>
							</div>
							<div class="text-align-center my-3" v-else></div>
            </div>
						<div v-else>This service has been deleted</div>
        </div>
        <div ref="deletePopup" class="delete-popup cpopup d-none">
            <span class="c-btn btn-green d-block" v-on:click="hideDeletePopup">Back</span>
            <div class="text-align-center mb-2">
                Are you sure you want to delete this post
            </div>
            <div class="text-end">
                <button class="btn btn-sm btn-secondary" v-on:click="hideDeletePopup">No</button>
                <button class="ms-2 btn btn-sm btn-secondary" v-on:click="deleteSavedService">Yes</button>
            </div>
        </div>
        <div>
        </div><hr/>
    </div>
</template>

<style>
    .user-list-img{
        /* width: 50px;
        height: 50px; */
				width: 3.1rem;
				height: 3.1rem;
        border-radius: 50%;
    }

    .front-img{
        width: 100%;
        height: 470px;
        padding: 16px 0px;
    }

		.cicon{
			font-size: 1.5rem;
		}

    .delete-popup{
        position: fixed;
        background-color: yellow;
        top: 200px;
        left: 0px;
        right: 0px;
        padding-bottom: 15px;
        padding: 10px;
    }

    .service--ellipsis-ctn{
        right: 0px;
        width: 100px;
    }

		@media(max-width: 760px){
			.service-options{
				margin-right: 0.2rem;
			}
		}

		@media(max-width: 360px){
			.user-list-img{
				width: 2.8rem;
				height: 2.8rem;
			}
		}

		@media(max-width: 260px){
			.service-options{
				margin-right: 0.3rem;
			}
		}

</style>

<script>
    import { defineComponent } from 'vue';
		import axios from 'axios';
		import { mapGetters } from 'vuex';

    export default defineComponent({
        name: 'service',
        components: {
        },
        data(){
            return {
                ellipsisIsOpen: false
            }
        },
        props: ["savedService", "removeSavedService", "setInfoPopup"],
				computed: {
					...mapGetters(["getBaseUrl"]),
				},
        mounted(){
        },
				watch:{
					ellipsisIsOpen(){
					}
				},
        methods: {
            deleteSavedServiceRequest(){
								this.ellipsisIsOpen = false;
                const deletePopup = this.$refs.deletePopup;
                deletePopup.classList.replace("d-none", "d-block");
            },
            hideDeletePopup(){
                const deletePopup = this.$refs.deletePopup;
                if(deletePopup.classList.contains("d-block")){
                    deletePopup.classList.replace("d-block", "d-none");
                }
            },
            timeAgo(date){
                var localDate;
                if(typeof date === "string"){
                    localDate = new Date(date);
                }else{
                    localDate = date;
                }
                var ms = (new Date()).getTime() - localDate.getTime();
                var seconds = Math.floor(ms / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                var months = Math.floor(days / 30);
                var years = Math.floor(months / 12);

                if (ms === 0) {
                    return 'Just now';
                } if (seconds < 60) {
                    return seconds + ' s';
                } if (minutes < 60) {
                    return minutes + ' m';
                } if (hours < 24) {
                    return hours + ' h';
                } if (days < 30) {
                    return days + ' d';
                } if (months < 12) {
                    return months + ' mo';
                } else {
                    return years + ' y';
                }

            },
						saveService(){
								this.ellipsisIsOpen = false;
						},
						deleteSavedService(){
							const savedServiceId = this.savedService._id.toString();

							axios.delete(`/api/v1/saved-services/${savedServiceId}`)
								.then(res => {
										const { msg } = res.data;
										if(msg){
											this.setInfoPopup({
												state: true,
												text: msg,
												className: "info-popup-success"
											});
										}

										this.hideDeletePopup();
										this.removeSavedService(savedServiceId);
									})
								.catch(err => console.log(err.response));
							console.log("service deleted");
						},
						clickOutsideServiceEllipsis(event){
							const serviceRef = this.$refs["service-ref"];
							const serviceEllipsisRef = this.$refs["service-ellipsis"];

							if(serviceRef && !serviceRef.contains(event.target) && !serviceEllipsisRef.contains(event.target)){
								// console.log("clicked outside serviceEllipsis");
								this.ellipsisIsOpen = false;
								document.removeEventListener("mousedown", this.clickOutsideServiceEllipsis);
							}else if(!serviceRef){
								// console.log("serviceRef not found");
								document.removeEventListener("mousedown", this.clickOutsideServiceEllipsis);
							}
						},
						toggleServiceEllipsis(){

							this.ellipsisIsOpen = !this.ellipsisIsOpen;
							if(this.ellipsisIsOpen){
								document.addEventListener("mousedown", this.clickOutsideServiceEllipsis);
							}
						},
						generateProfileImageUri(user){
							// for example: window[128].jpg

							if(user === null || user === undefined){
									return this.getBaseUrl + "/profileImages/defaults/user.jpg";
							}
							if(user.profile_image !== undefined && /[a-zA-Z0-9]+\.?(jpg|jpeg|webp)/.test(user.profile_image)){
								return this.getBaseUrl + "/profileImages/" + user.profile_image;
							}else{
								if(user.gender === "male"){
									return this.getBaseUrl + "/profileImages/defaults/male.jpg";
								}else if(user.gender === "female"){
									return this.getBaseUrl + "/profileImages/defaults/female.jpg";
								}else{
									return this.getBaseUrl + "/profileImages/defaults/user.jpg";
								}
							}
						}
        }
    })
</script>
