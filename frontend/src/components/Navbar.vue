<template>
    <div class="user-select-none">
        <div class="d-flex justify-content-between mt-2 lt-460:mx-2">
            <div>
                <router-link to="/" class="text-decoration-none text-dark">
                    <h5>guest guide</h5>
                </router-link>
            </div>
            <nav>
                <router-link class="ms-2 lt-460:d-none" :to="{ name: 'account' }">Account</router-link>
                <router-link class="gt-460:d-none" :to="{ name: 'account' }">
									<font-awesome-icon class="cnav-icon" :icon="['fas', 'user']" />
								</router-link>
            </nav>
        </div>
        <nav class="app-navbar lt-460:mx-2">
            <div>
                <router-link class="cnav-item lt-460:d-none" :to="{ name: 'transition' }">Transition</router-link>

                <router-link class="gt-460:d-none" :to="{ name: 'transition' }">
									<font-awesome-icon class="cnav-icon" :icon="['fas', 'truck-moving']" />
								</router-link>
            </div>
            <div>
                <router-link class="cnav-item lt-460:d-none" to="/courses">Courses</router-link>
                <router-link class="gt-460:d-none" to="/courses">
									<font-awesome-icon class="cnav-icon" :icon="['fas', 'book-open']" />
								</router-link>
								<!-- <font-awesome-icon :icon="['fas', 'laptop-code']" /> -->
            </div>
            <div>
                <router-link class="cnav-item lt-460:d-none" to="/housing">Hotel & houses</router-link>
                <router-link class="gt-460:d-none" to="/housing">
									<font-awesome-icon class="cnav-icon" :icon="['fas', 'house-chimney-window']" />
								</router-link>
								<!-- <font-awesome-icon :icon="['fas', 'house-laptop']" /> -->
            </div>
            <div>
                <router-link class="cnav-item lt-460:d-none" to="/create-service">Create</router-link>
                <router-link class="gt-460:d-none" to="/create-service">
									<font-awesome-icon class="cnav-icon" :icon="['fas', 'square-plus']" />
								</router-link>
            </div>
        </nav>
    </div>
</template>

<style>
    .app-navbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
				margin-bottom: 0.5rem;
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

    export default defineComponent({
        name: "navbar"
    });
</script>
