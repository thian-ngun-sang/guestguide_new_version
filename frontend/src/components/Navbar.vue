<template>
    <div class="user-select-none">
        <div class="d-flex justify-content-between mt-3 lt-460:mx-2">
            <div>
                <router-link to="/" class="text-decoration-none text-dark">
                    <h5>GuestGuide</h5>
                </router-link>
            </div>
            <nav>
                <router-link class="ms-2 lt-460:d-none" :to="{ name: 'account' }">
									<font-awesome-icon class="user-nav-icon text-dark" :icon="['fas', 'user']" />
								</router-link>
                <router-link class="gt-460:d-none" :to="{ name: 'account' }">
									<font-awesome-icon class="cnav-icon" :icon="['fas', 'user']" />
								</router-link>
            </nav>
        </div>
				<div class="d-flex justify-content-center align-items-center gap-2">
					<div class="d-flex align-items-center position-relative">
						<label for="search-input" class="search-input-label cursor-pointer">
							<font-awesome-icon class="search-icon" :icon="['fas', 'magnifying-glass']" />
						</label>
						<input class="search-input" type="search" placeholder="Search" id="search-input"/>
					</div>
					<button class="btn shadow-none border-0" v-on:click="toggleFilterPopup">
						<font-awesome-icon class="filter-icon" :icon="['fas', 'sliders']"/>
					</button>
				</div>
        <nav class="app-navbar lt-460:mx-2">
            <div>
							<router-link class="d-flex flex-column justify-content-center align-items-center text-decoration-none" :to="{ name: 'transition' }">
								<font-awesome-icon class="cnav-icon" :icon="['fas', 'truck-moving']" />
								<span>Transition</span>
							</router-link>
            </div>
            <div>
							<router-link class="d-flex flex-column justify-content-center align-items-center text-decoration-none" to="/courses">
								<font-awesome-icon class="cnav-icon" :icon="['fas', 'book-open']" />
								<span>Courses</span>
							</router-link>
            </div>
            <div>
							<router-link class="d-flex flex-column justify-content-center align-items-center text-decoration-none" to="/housing">
								<font-awesome-icon class="cnav-icon" :icon="['fas', 'house-chimney-window']" />
								<span>Hotel &amp; houses</span>
							</router-link>
            </div>
            <div>
							<router-link class="d-flex flex-column justify-content-center align-items-center text-decoration-none" to="/create-service">
								<font-awesome-icon class="cnav-icon" :icon="['fas', 'square-plus']" />
								<span>Create</span>
							</router-link>
            </div>
        </nav>
				
				<ServiceFilter v-if="filterPopupIsOpen" :closeFilterPopup="closeFilterPopup"/>
    </div>
</template>

<style>
    .app-navbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
				margin-top: 0.8rem;
				margin-bottom: 0.5rem;
    }

		.user-nav-icon{
			border: 1px solid black;
			padding: 0.45rem 0.5rem;
			border-radius: 50%;
		}

		.search-input-label{
			position: absolute;
			left: 2.3rem;
		}

		.filter-icon{
			font-size: 1.4rem;
			border: 1px solid black;
			padding: 0.2rem;
			border-radius: 0.2rem;
		}

		.search-input{
			border: 1px solid black;
			border-radius: 1rem;
			width: 30rem;
			padding-left: 2.3rem;
			padding-block: 0.3rem;
		}

    .cnav-item{
        font-size: 20px;
    }

		.cnav-icon{
			/* font-size: 22px; */
			font-size: 1.3rem;
		}

    .cnav-item-mobile{
        display: none;
    }

    .nav-search-input{
        width: 250px;
        border-radius: 5px;
    }

    .searchbar-ctn{
        display: flex;
        align-items: center;
    }

  .search-icon{
    margin-left: -25px;
  }

  @media(max-width: 960px){
    .cnav-item{
        font-size: 18px;
    }

    .nav-search-input{
        width: 230px !important;
    }
  }

  @media(max-width: 860px){
    .cnav-item{
        font-size: 16px;
    }

    .nav-search-input{
        width: 210px !important;
    }
  }

  @media(max-width: 660px){
    .nav-search-input{
        width: 200px !important;
    }
  }

  @media(max-width: 560px){
    .nav-search-input{
        width: 160px !important;
        color: green;
    }
  }

  @media(max-width: 460px){
    .nav-search-input{
        display: none;
    }

    .search-icon{
        margin-left: 0px;
    }
  }

  @media(max-width: 360px){
    .cnav-item{
        font-size: 13px;
    }
  }
</style>

<script>
    import { defineComponent } from 'vue';
		import ServiceFilter from '@/components/ServiceFilter.vue';

    export default defineComponent({
        name: "navbar",
				data(){
					return {
						filterPopupIsOpen: false
					}
				},
				methods: {
					toggleFilterPopup(){
						this.filterPopupIsOpen = !this.filterPopupIsOpen;
					},
					closeFilterPopup(){
						this.filterPopupIsOpen = false;
					}
				},
				components: {
					ServiceFilter
				}
    });
</script>
