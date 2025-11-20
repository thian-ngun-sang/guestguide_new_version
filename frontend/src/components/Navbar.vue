<template>
    <div class="user-select-none">
        <div class="d-flex justify-content-between mt-3 lt-460:mx-2">
            <div>
                <router-link to="/" class="text-decoration-none text-dark">
                    <h5>GuestGuide</h5>
                </router-link>
            </div>
            <nav>
							<router-link :to="{ name: 'account' }">
								<font-awesome-icon class="user-nav-icon text-dark" :icon="['fas', 'user']" />
							</router-link>
            </nav>
        </div>
				<div class="d-flex justify-content-center align-items-center gap-2">
					<div class="d-flex align-items-center position-relative search-ctn">
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

            <div class="position-relative">
							<a href="#" class="d-flex flex-column justify-content-center align-items-center text-decoration-none c-btn"
								@click="toggleCreateDropdown" ref="create-dropdown-btn">
								<font-awesome-icon class="cnav-icon" :icon="['fas', 'square-plus']" />
								<span>Create</span>
							</a>


							<div v-if="createDropdownIsOpen" class="create-dropdown d-flex flex-column" ref="dropdown-ref">
								<span @click="() => { openCreateTransportationPopup(toggleCreateDropdown) }" class="cursor-pointer">Transportation</span>
								<span @click="() => { openCreateAccomodationPopup(toggleCreateDropdown) }" class="cursor-pointer">Accomodation</span>
								<span @click="() => { openCreateEducationPopup(toggleCreateDropdown) }" class="cursor-pointer">Education</span>
							</div>

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

		.search-ctn {
			width: 100%;
		}

		.search-input-label{
			position: absolute;
			left: 2.8rem;
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
			width: 100%;
			padding-left: 2.3rem;
			padding-block: 0.3rem;
		}

    .cnav-item{
        font-size: 20px;
    }

		.cnav-icon{
			/* font-size: 22px; */
			font-size: 1.2rem;
		}

    .cnav-item-mobile{
        display: none;
    }

    .searchbar-ctn{
        display: flex;
        align-items: center;
    }

  .search-icon{
    margin-left: -25px;
  }

	.create-dropdown{
		position: absolute;
		background-color: white;
		right: 0;
		padding: 0.5rem;
		box-shadow: 0 4px 10px rgba(0,0,0,0.2);
		border-radius: 0.125rem;
		padding-right: 2rem;
	}

  @media(min-width: 460px){
		.search-ctn {
			width: 18rem;
		}
  }

  @media(min-width: 768px){
		.search-ctn {
			width: 25rem;
		}
  }

  @media(min-width: 640px){
		.search-input-label{
			position: absolute;
			left: 2.5rem;
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
						filterPopupIsOpen: false,
						createDropdownIsOpen: false
					}
				},
				props:[
					"openCreateTransportationPopup",
					"openCreateAccomodationPopup",
					"openCreateEducationPopup"
				],
				methods: {
					clickOutsideCreateServiceDropdown(event){
						const createDropdownRef = this.$refs["dropdown-ref"];
						const createDropdownBtnRef = this.$refs["create-dropdown-btn"];

						if(createDropdownBtnRef?.contains(event.target)){
							return;
						}

						if(createDropdownRef && !createDropdownRef?.contains(event.target)){
							this.toggleCreateDropdown();
							document.removeEventListener("mousedown", this.clickOutsideCreateServiceDropdown);
						}
					},
					toggleFilterPopup(){
						this.filterPopupIsOpen = !this.filterPopupIsOpen;
					},
					closeFilterPopup(){
						this.filterPopupIsOpen = false;
					},
					toggleCreateDropdown(){
						this.createDropdownIsOpen = !this.createDropdownIsOpen;
						if(this.createDropdownIsOpen){
							document.addEventListener("mousedown", this.clickOutsideCreateServiceDropdown);
						}
					},
				},
				components: {
					ServiceFilter
				}
    });
</script>
