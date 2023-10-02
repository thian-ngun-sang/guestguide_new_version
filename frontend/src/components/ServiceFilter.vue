<template>
    <div class="filter-form user-select-none">
        <div class="position-relative">
          <div class="filter-form-wrapper" v-on:scroll="handleFilterScroll">
            <!-- <span class="filter--scroll-left d-none position-absolute" v-on:click="scrollLeft">&lt;</span> -->
            <span class="filter--scroll-left d-none position-absolute" v-on:click="scrollLeft">
							<font-awesome-icon class="left-chevron" :icon="['fas', 'chevron-left']" />
						</span>
            <form class="filter-form--layout d-flex align-items-center" v-on:submit.prevent="searchByLocation">
              <select v-if="currentPath !== '/'" class="service--filter-select" v-model="currentOption">
                <option :selected="option === 'all'" v-for="option in options" :value="option.value">{{ option.label }}</option>
              </select>
              <div :class="{'filter--ms-4': currentPath !== '/'}" class="d-flex">
                <input type="checkbox" id="phone-number" v-model="queryParams.phone"/>
                <label for="phone-number" class="ms-1 cursor-pointer checkbox-text">With phone number</label>
              </div>
              <div class="filter--ms-4 d-flex">
                <input type="checkbox" id="nearby-me" v-model="queryParams.nearby"/>
                <label for="nearby-me" class="ms-1 cursor-pointer">Nearby Me</label>
              </div>
              <div class="filter--ms-4">
                <input type="text" class="filter--searchbar" placeholder="Location: Taung Za Lat" v-model="queryParams.location"/>
              </div>
            </form>
						<!-- <span class="filter--scroll-right position-absolute" v-on:click="scrollRight">&gt;</span> -->
						<span class="filter--scroll-right position-absolute" v-on:click="scrollRight">
							<font-awesome-icon class="right-chevron" :icon="['fas', 'chevron-right']" />
						</span>
          </div>
        </div>
			</div>
</template>

<style>
    .filter--ms-4{
      margin-left: 15px;
    }

    .filter-form{
      position: fixed;
      top: 5rem;
      left: 15%;
      right: 15%;
      width: 70%;
      padding-bottom: 3px;
      background-color: white;
      white-space: nowrap;
      z-index: 1;
      /* margin-top: 25px; */
    }

    .filter-form-wrapper{
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;
      scroll-behavior: smooth;
    }

    .filter-form-wrapper::-webkit-scrollbar{
      display: none;
    }

    .filter-form--layout{
      justify-content: space-between;
    }

    .filter--scroll-left{
      left: 0px;
      cursor: pointer;
      /* background-color: rgb(224, 206, 206); */
			background-color: white;
      padding-inline: 2px;
      padding-block: 3.5px;
      top: 0.3px;
    }

    .filter--scroll-right{
      right: 0px;
      cursor: pointer;
      /* background-color: rgb(224, 206, 206); */
			background-color: white;
      padding-inline: 2px;
      padding-block: 3.5px;
      top: 0.3px;
    }

    .filter--scroll-left, .filter--scroll-right{
      display: none;
    }

		.left-chevron, .right-chevron{
			font-size: 1rem;	
		}

    .service--filter-select{
      width: 89.6px;
    }

    @media(max-width: 1100px){
      .filter-form{
        left: 17%;
        right: 17%;
        width: 66%;
      }

      .service--filter-select{
        width: 89.6px;
      }
    }

    @media(max-width: 960px){
      .filter-form{
        top: 78px;
        font-size: 16px;
      }

      .filter--scroll-left, .filter--scroll-right{
        display: inline;
      }
      .filter--ms-4{
        margin-left: 65px;
      }
    }

    @media(max-width: 942px){
      .filter--scroll-left, .filter--scroll-right{
        display: inline;
      }
    }

    @media(max-width: 860px){
      .filter-form{
        top: 80px;
        left: 19%;
        right: 19%;
        width: 62%;
        font-size: 15px;
      }
    }

    @media(max-width: 760px){
      .filter-form{
        left: 1%;
        right: 1%;
        width: 98%;
      }

      .filter--scroll-left, .filter--scroll-right{
        display: none;
      }

      .filter--ms-4{
        margin-left: 0px;
        color: green;
      }
    }

    @media(max-width: 660px){
      .filter--scroll-left, .filter--scroll-right{
        display: inline;
      }

      .filter--ms-4{
        margin-left: 65px;
      }
    }

    @media(max-width: 460px){
      .filter--ms-4{
        margin-left: 30px;
      }

			.filter-form{
				top: 4.8rem;
			}
    }

    @media(max-width: 360px){
      .filter--ms-4{
        margin-left: 25px;
      }
    }
</style>

<script>
    import {defineComponent} from "vue";

    export default defineComponent({
        name: "serviceFilter",
        data(){
          return {
            currentPath: "",
            options: [],
            currentOption: "all",
            optionsDict: {
              home: [
                { label: "all", value: "all" }
              ],
              transition: [
                { label: "all", value: "all" },
                { label: "taxi", value: "taxi"},
                { label: "air ticket", value: "air ticket"}
              ],
              courses: [
                { label: "all", value: "all" },
                { label: "online", value: "online"},
                { label: "inclass", value: "inclass"},
              ],
              housing: [
                { label: "all", value: "all" },
                { label: "hotel", value: "hotel"},
                { label: "rent", value: "rent"}
              ]
            },
            queryParams: {
              type: "",
              phone: false,
              nearby: false,
              location: ""
            }
          }
        },
        mounted(){
          this.currentPath = this.$route.path;
          if(this.$route.path === "/"){
            this.options = this.optionsDict.home;
          }else{
            this.currentPath = this.$route.path;
            let modifiedPath = this.currentPath.replace("/", "");
            this.options = this.optionsDict[modifiedPath];

            if(this.$route.path !== "/"){
              this.$store.commit("setServiceType", this.options[0].value);
            }
          }
          
          this.$watch(() => this.$route.path, (newValue) => {
           
            if(this.$route.path !== "/"){
              this.$store.commit("setServiceType", this.options[0].value);

              let modifiedPath = newValue.replace("/", "");
              this.options = this.optionsDict[modifiedPath];
              this.currentOption = "all";
            }
            this.currentPath = newValue;

            this.queryParams = {
              type: "",
              phone: false,
              nearby: false,
              location: ""
            };
          });

        },
        methods: {
            toggleArrows(){
                const scrollString = document.querySelector(".filter-form-wrapper");
                const leftArrow = document.querySelector(".filter--scroll-left");
                const rightArrow = document.querySelector(".filter--scroll-right");
                
                // if(scrollString.scrollLeft >= 20){
                if(scrollString.scrollLeft >= 5){
                    leftArrow.classList.remove("d-none");
                }else{
                    leftArrow.classList.add("d-none");
                }

                // let maxScrollValue = scrollString.scrollWidth - scrollString.clientWidth;
                let maxScrollValue = scrollString.scrollWidth - scrollString.clientWidth - 5;
                // console.log("scroll width: ", scrollString.scrollWidth, ", ", "client width: ", scrollString.clientWidth);
                
                if(scrollString.scrollLeft >= maxScrollValue){
                    rightArrow.classList.add("d-none");
                }else{
                    rightArrow.classList.remove("d-none");
                }
            },
            scrollLeft(){
                const scrollString = document.querySelector(".filter-form-wrapper");
                scrollString.scrollLeft -= 200;
                this.toggleArrows();
            },
            scrollRight(){
                const scrollString = document.querySelector(".filter-form-wrapper");
                scrollString.scrollLeft += 200;
                this.toggleArrows();
            },
            handleFilterScroll(){
                this.toggleArrows();
            },
            searchByLocation(){
              const query = this.$route.query;

              if(this.queryParams.location !== ""){
                const newQuery = {
                  ...query,
                  q: this.queryParams.location
                };
                this.$router.push({query: newQuery});
              }else{
                const { q, ...restQuery } = query;
                this.$router.push({query: restQuery});
              }

            }
        },
        watch: {
          'queryParams.phone': {
            handler(newValue){
              let query = this.$route.query;
              if(newValue){
                const newQuery = Object.assign({ phone: 'true' }, query);
                this.$router.push({ query: newQuery });
              }else{
                const { phone, ...restQuery} = query;
                if(phone === 'true'){
                  this.$router.push({ query: restQuery});
                }
              }
            },
            deep: true
          },
          'queryParams.nearby': {
            handler(newValue){
              let query = this.$route.query;
              if(newValue){
                const newQuery = Object.assign({ nearby: 'true' }, query);
                this.$router.push({ query: newQuery });
              }else{
                const { nearby, ...restQuery} = query;
                if(nearby === 'true'){
                  this.$router.push({ query: restQuery});
                }
              }
            },
            deep: true
          },
          currentOption: {
            handler(newValue){
              let query = this.$route.query;

              if(newValue !== 'all'){
                const newQuery = {...query, type: newValue };
                this.$router.push({ query: newQuery });
              }else{
                const { type, ...restQuery} = query;
                this.$router.push({ query: restQuery });
              }
            }
          }
        }
    });
</script>
