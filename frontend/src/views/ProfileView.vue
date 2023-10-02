<template>
    <div v-if="this.$store.state.isLoading == false">
        <div class="cover-image-parent">
            <img class="cover-image cursor-pointer" :src="this.$store.state.baseUrl +'/coverImages/' + user.cover_image" v-on:click="openCoverDialogPopup"/>
        </div>
        <div class="profile-image-parent">
            <img class="profile-image cursor-pointer" :src="this.$store.state.baseUrl +'/profileImages/' + user.profile_image" v-on:click="openProfileDialogPopup"/>
            <div class="account-banner-wrapper">
                <div class="account-banner">
                    <div>
                        <div>{{ user.first_name }} {{ user.last_name }}</div>
                        <!-- <div class="cursor-pointer">5 Friends</div> -->
                    </div>
                    <!-- <div class="account-banner-right-section gt-360:d-flex lt-360:d-none"> -->
                    <div class="account-banner-right-section">
											 <div>
                            <span class="button-shadow border-radius-3 cursor-pointer">
                                <router-link class="text-decoration-none text-dark" to="/edit-profile">Edit Profile</router-link>
                            </span>
                        </div>
                        <div class="position-relative">
                            <div class="horizontal-dots d-flex justify-content-center cursor-pointer" ref="account-ellipsis" v-on:click="toggleAccountEllipsis">
                                <font-awesome-icon icon="ellipsis" class="align-self-center" />
                            </div>
                            <div :class="accountEllipsisState ? 'position-absolute account-menu' : 'd-none'" ref="account-menu">
                                <div class="cursor-pointer" v-on:click="handleLogoutRequest">Logout</div>
                                <!-- <div class="cursor-pointer">Change Password</div> -->
                                <router-link to="/change-password" class="text-decoration-none text-dark">Change Password</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-5">
            <div :class="bioEditState ? 'd-none' : ''">
								<div v-if="user.bio !== '' && user.bio !== undefined">
										<div class="mt-3 w-100 text-center account-bio account-bio-text">
											<p>
												{{ user.bio }} 	
											</p>
										</div>
										<div class="ms-2 mt-3">
												<button class="b-btn c-w-90" v-on:click="editBio">
														Edit Bio
												</button>
										</div>
								</div>
								<div v-else>
										<!-- <div class="ms-5 mt-3 account-bio account-bio-text">
											{{ user.bio }} 	
										</div> -->
										<div class="ms-2 mt-3">
												<button class="b-btn c-w-90" v-on:click="editBio">
														Add Bio
												</button>
										</div>
								</div>
                
            </div>
						<div :class="bioEditState ? '' : 'd-none'">
								<div class="mt-3 text-center">
										<!-- <input type="text" class="w-100" v-model="form.bio" ref="bio-input"/> -->
										<textarea class="w-75 account-bio account-bio-text-input" v-model="form.bio" ref="bio-input"></textarea>
								</div>
                <div class="mt-3 text-center">
										 <button class="b-btn c-w-45" v-on:click="cancelSaveBio">
												Cancel
										</button>
										<button class="ms-1 b-btn c-w-45" v-on:click="updateBio"> 
                       Save Bio 
                    </button>
                </div>
						</div>
            <!-- <div class="mt-4 ms-2">
                <div class="my-2">
                    Works at <b>Student</b>
                </div>
                <div class="my-2">
                    Went to <b>KalayMyo, No. 2 Hight School</b>
                </div>
                <div class="my-2">
                    Studies at <b>Kalay Technological University</b>
                </div>
                <div class="my-2">
                    Lives in <b>Kalaymyo, Sagaing, Burma</b>
                </div>
            </div>
            <div class="ms-2 mt-3">
                <button class="b-btn c-w-90">
                    Edit details
                </button>
            </div> -->
        </div>

        <!-- popup -->
        <div v-if="logoutRequest" class="normal-popup p-3 logout-popup">
            <div class="text-white">
                Are you sure you want to logout?
            </div>
            <div class="text-end">
                <button class="btn btn-sm btn-dark" v-on:click="cancelLogoutRequest">No</button>
                <button class="btn btn-sm btn-dark ms-2" v-on:click="logout">Yes</button>
            </div>
        </div>

        <!-- popup -->
        <div>
            <UserImageDialog v-if="userImageDialog.changeState" :meta="userImageDialog" :actions="{ closeUserImageDialogPopup, changeUserDialogImageUrl, changeUserDialogModified, changeUserProfileImage, changeUserCoverImage }"/>
        </div>
    </div>
</template>

<style>
    .cover-image{
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    .profile-image{
        width: 130px;
        height: 130px;
        border: 4px solid white;
        border-radius: 50%;
        margin-top: -20px;
        /* margin-left: 25px; */
				margin-left: 1.56rem;
    }

    .profile-image-parent{
        display: grid;
        grid-template-columns: 1fr 4fr;
    }

    .button-blue{
        background-color: rgb(44, 89, 252);
        padding: 5px;
    }

    .button-shadow{
        background-color: rgb(238, 235, 235);
        padding: 5px;
    }

    .account-banner{
				display: flex;
				justify-content: space-between;
    }

		.account-banner-wrapper{
			margin-left: 0.5rem;
			margin-top: 0.7rem;
		}

		.account-bio{
			min-height: 30px;
		}

		.account-bio-text{
			padding-top: 3px;
			padding-left: 4px;
		}

		.account-bio-text-input{
			margin-bottom: 0px;
			color: red;
		}

    .account-banner-right-section{
				display: flex;
        justify-content: flex-end;
    }

    .b-btn{
        border: none;
    }

    .c-w-90{
        width: 90%;
    }

		.c-w-45{
			width: 45%;
		}

    .horizontal-dots{
        /* width: 30px; */
        width: 1.8rem;
				margin-left: 0.5rem;
        border-radius: 2px;
        height: 1.75rem;
        margin-top: -1.5px;
        background-color: #DDDDDD;
    }

    .account-menu{
        right: 0px;
        top: 32px;
        width: 150px;
        padding: 5px;
        border-radius: 2px;
        background-color: #FFFFFF;
        /* box-shadow: 0px 0px 5px rgb(224, 216, 216), 0px 0px 5px rgb(227, 218, 218); */
        box-shadow: 0px 0px 5px rgb(224, 216, 216), 0px 0px 5px rgb(227, 218, 218);
    }

    .account-menu-hr{
        margin-block: 2px;
    }

    .align-self-center{
        align-self: center;
    }

    .logout-popup{
        top: 13rem;
        height: 6.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

		@media(max-width: 660px){
			.profile-image{
						margin-left: 0.7rem;
				}
		}

		@media(max-width: 560px){
				.cover-image{
					height: 240px;
				}

				.profile-image{
						width: 110px;
						height: 110px;
						margin-top: -29px;
						margin-left: 0.6rem;
				}
				
		}

		@media(max-width: 560px){
				.cover-image{
					height: 200px;
				}

				.profile-image{
						width: 100px;
						height: 100px;
						margin-top: -29px;
				}
				
		}

		@media(max-width: 560px){
				.cover-image{
					height: 170px;
				}

				.profile-image{
						width: 90px;
						height: 90px;
						margin-top: -29px;
				}
				
		}

		@media(max-width: 360px){
				.cover-image{
					height: 170px;
				}

				.profile-image{
						width: 6.3rem;
						height: 6.3rem;
				}

				.account-banner{
					display: initial;
				}
			
				.account-banner-right-section{
					margin-top: 0.5rem;
				}
		}

</style>

<script>
    import { defineComponent } from 'vue';
		import axios from 'axios';
		import { mapGetters } from 'vuex';

    import UserImageDialog from "../components/UserImageDialog.vue";

    export default(defineComponent({
        name: "userProfile",
        data(){
            return {
                user: {
                    _id: "",
                    email: "",
                    first_name: "",
                    last_name: "",
                    user_name: "",
                    profile_image: "",
                    cover_image: "",
                    updated_at: "",
										bio: "",
                },
								form: {
									bio: ""
								},
                accountEllipsisState: false,
                userImageDialog: {
                    changeState: false,
                    modified: false,
                    type: "",
                    imageUrl: ""
                },
                logoutRequest: false,
								bioEditState: false
            };
        },
        components: {
            UserImageDialog
        },
				computed: {
					...mapGetters(["getUser"]),
				},
        created(){
            this.user = this.getUser;

            this.$store.dispatch("setIsLoading" , false);
						this.form.bio = this.user.bio === undefined ? "" : this.user.bio;

						console.log(this.user.bio);

            this.$watch(() => this.user, () => {
                console.log("Got user info");
            });
        },
        methods: {
            openCoverDialogPopup(){
                this.userImageDialog = {
                    changeState: true,
                    type: "cover",
                    imageUrl: `${this.$store.state.baseUrl}/coverImages/${this.user.cover_image}`
                };
            },
            openProfileDialogPopup(){
                this.userImageDialog = {
                    changeState: true,
                    type: "profile",
                    imageUrl: `${this.$store.state.baseUrl}/profileImages/${this.user.profile_image}`
                };
            },
            closeUserImageDialogPopup(){
                this.userImageDialog = {
                    changeState: false,
                    modified: false,
                    type: "",
                    imageUrl: ""
                };
            },
            changeUserDialogImageUrl(url){
                this.userImageDialog.imageUrl = url;
            },
            changeUserDialogModified(state){
                this.userImageDialog.modified = state;
            },
            changeUserProfileImage(profileImage){
                this.user.profile_image = profileImage;
            },
            changeUserCoverImage(coverImage){
                this.user.cover_image = coverImage;
            },
						mouseDownOutsideAccountMenu(event){
							const accountMenu = this.$refs["account-menu"];
							const accountEllipsis = this.$refs["account-ellipsis"];

							if(accountMenu !== null && !accountMenu.contains(event.target) && !accountEllipsis.contains(event.target)){
								this.accountEllipsisState = false;
								document.removeEventListener("mousedown", this.mouseDownOutsideAccountMenu);
							}else if(!accountMenu){
								document.removeEventListener("mousedown", this.mouseDownOutsideAccountMenu);
							}
						},
            toggleAccountEllipsis(){
                this.accountEllipsisState = !this.accountEllipsisState;
								if(this.accountEllipsisState){
									document.addEventListener("mousedown", this.mouseDownOutsideAccountMenu);
								}
            },
            logout(){
                localStorage.removeItem("token");
                this.$router.push('/login');
            },
            handleLogoutRequest(){
								this.accountEllipsisState = false;
                this.logoutRequest = true;
            },
            cancelLogoutRequest(){
                this.logoutRequest = false;
            },
						editBio(){
							this.bioEditState = true;
							const bioRef = this.$refs["bio-input"];
							if(bioRef !== undefined && bioRef !== null){
								bioRef.focus();
							}
						},
						cancelSaveBio(){
							this.form.bio = this.user.bio;
							this.bioEditState = false;
						},
						updateBio(){
							if(this.form.bio === this.user.bio){
								this.bioEditState = false;

								return;
							}

							axios.patch("/api/v1/user/update-bio", this.form)
								.then(res => {
									const { msg, bio } = res.data;
									if(bio !== undefined && bio !== null){
										this.user = { ...this.user, bio };
										this.$store.dispatch("setUser", { ...this.user, bio });
									}
									this.bioEditState = false;
								})
								.catch(err => {
									console.log(err.response);
								})
						}
        }
    }));
</script>
