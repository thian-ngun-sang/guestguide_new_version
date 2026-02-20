<template>
    <div class="position-relative">
				<div class="service-container position-relative">
					<div class="position-absolute name-wrapper">
						<div class="service-header d-flex justify-content-between align-items-center">
							<span>{{ service.user.first_name }} {{ service.user.last_name }}</span>
							<font-awesome-icon v-if="bookmarked" :icon="['fas', 'bookmark']" class="icon-md cursor-pointer"
								@click="() => toggleBookmark(service)"/>
							<font-awesome-icon v-else :icon="['far', 'bookmark']" class="icon-md cursor-pointer"
								@click="() => toggleBookmark(service)"/>
						</div>
					</div>	

					<img v-if="service.files" class="service-img mb-1" :src="`${this.$store.state.baseUrl}/${service.files[0]}`"/>
					<img v-else class="service-img mb-1" src="/svgs/image_placeholder.svg"/>

					<div class="px-2 d-flex justify-content-between price-label">
						<span class="text-capitalize">{{ service.serviceType }}</span>
					</div>
					<div class="px-2">
						{{ service.address }}&comma;
					</div>
					<div class="px-2">
						{{ service.phone }}
					</div>
				</div>

    </div>
</template>

<style>
		.service-container{
			border: 1px solid black;
			border-radius: 10px;
			overflow: hidden;
			padding-bottom: 0.5rem;
		}

		.service-img{
			width: 100%;
			height: 14.5rem;
			object-fit: cover;
			object-position: center;
			user-select: none;
		}

		.name-wrapper{
			background-color: rgba(0, 0, 0, 0.5);
			left: 0;
			right: 0;
		}

		.service-username{
			display: inline-block;
		}

		.service-header{
			padding: 0.4rem 0.5rem;
			color: white;
		}

		.price-label{
			font-weight: 650;
		}

		.location-label{
			opacity: 0.6;
			font-size: 0.98rem;
		}

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

    export default defineComponent({
        name: 'transitionService',
        data(){
            return {
                ellipsisIsOpen: false,
								bookmarked: false
            }
        },
        props: ["service"],
				computed: {
				},
        methods: {
					limitWords(text, count){
						return text.split(' ').slice(0, count).join(' ');
					},
					toggleBookmark(service){
						this.bookmarked = !this.bookmarked;	
					}
        },
				created(){
					// console.log(this.service);
				}
    })
</script>
