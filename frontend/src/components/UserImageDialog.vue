<template>
    <div class="md-popup-center">
        <div class="d-flex justify-content-between mb-1 text-white">
            <span v-if="meta.type === 'cover'">Cover Image</span>
            <span v-else-if="meta.type === 'profile'">Profile Image</span>
            <span v-on:click="actions.closeUserImageDialogPopup" class="cursor-pointer">
							<font-awesome-icon class="text-lg icon-md" :icon="['fas', 'close']" />
						</span>
        </div>
        <div v-if="meta.type === 'profile'" class="d-flex justify-content-center bg-dark">
            <img class="popup-md-profile object-cover" :src="meta.imageUrl"/>
        </div>
        <div v-else-if="meta.type === 'cover'">
            <img class="popup-md-cover object-cover" :src="meta.imageUrl"/>
        </div>
        <div class="mt-2 d-flex justify-content-between">
            <div>
                <!-- <button class="btn btn-sm btn-dark">View Image</button> -->
                <button class="btn btn-sm btn-dark">
                    <label v-if="meta.modified" for="account--user-image-diaglog" class="cursor-pointer">
												<span class="lt-260:d-none">Change Image</span>
												<span class="gt-260:d-none">Change</span>
										</label>
                    <label v-else-if="!meta.modified" for="account--user-image-diaglog" class="cursor-pointer">Add Image</label>
                    <input id="account--user-image-diaglog" type="file" class="d-none" v-on:change="handleImageUrl"/>
                </button>
            </div>

            <div v-if="meta.modified">
                <button v-on:click="cancelModifyingImage" class="ms-2 btn btn-sm btn-dark">Cancel</button>
                <button v-on:click="saveImage" class="ms-2 btn btn-sm btn-dark">Save</button>
            </div>
            <div v-else-if="!meta.modified">
                <button v-if="!isDefaultImage" v-on:click="deleteImage" class="ms-2 btn btn-sm btn-dark">Delete</button>
            </div>
        </div>

        <div v-if="deleteImageRequestState" class="user-image-dialog--delete-popup">
            <div>
                Are you sure you want to delete your
                <span v-if="meta.type === 'profile'">profile image?</span>
                <span v-else-if="meta.type === 'cover'">cover image?</span>
            </div>
            <div class="mt-3 text-end">
                <button v-on:click="cancelImageDelete" class="btn btn-sm btn-secondary">Cancel</button>
                <button v-on:click="confirmImageDelete" class="ms-2 btn btn-sm btn-danger">Yes</button>
            </div>
        </div>
    </div>
</template>

<style>
    .popup-md-cover{
        width: 100%;
        /* height: 200px; */
        height: 40vh;
    }

    .popup-md-profile{
        width: 30%;
        aspect-ratio: 1/1;
        /* height: 200px; */
        margin-block: 15px;
        border-radius: 50%;
    }

    .md-popup-center{
        position: fixed;
        /* padding: 10px 20px; */
				padding: var(--spacing-modal);
        top: 10.5rem;
        left: var(--popup-padding-inline);
        right: var(--popup-padding-inline);
        background-color: rgb(78, 141, 73);
        border-radius: 3px;
    }

    .user-image-dialog--delete-popup{
        position: absolute;
        top: 35%;
        left: 10%;
        right: 10%;
        background-color: white;
        padding: 0.5rem 0.8rem;
        border-radius: 0.1rem;
    }

		@media(max-width: 460px) and (max-height: 660px){
			.popup-md-cover{
					height: 30vh;
			}
		}

		@media(max-width: 360px){
			.md-popup-center{
				top: 12.5rem;
			}
		}

		@media(max-width: 280px){
			.popup-md-cover{
					height: 25vh;
			}
		}

</style>

<script>
    import { defineComponent } from 'vue';
    import axios from 'axios';

    export default defineComponent({
        name: 'OptionPopup',
        props: {
            meta: Object,
            actions: Object
        },
        data(){
            return {
                formImage: "",
                deleteImageRequestState: false,
                isDefaultImage: false
            };
        },
        mounted(){
            // check if the image is default image,
            // eg: "/defaults/male.jpg", "/defaults/coverImage.jpg"
            if(/\/defaults\/(male|female|coverImage)\.(jpg|jpeg)$/.test(this.meta.imageUrl)){
                this.isDefaultImage = true;
            }
        },
        methods: {
            handleImageUrl(event){
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                    this.actions.changeUserDialogImageUrl(reader.result);
                    this.actions.changeUserDialogModified(true);

                    this.formImage = file;
                }

                if(this.$store.state.imageTypes.includes(file.type)){
                    reader.readAsDataURL(file);
                }
            },
            cancelModifyingImage(){
                if(this.meta.type === "profile"){
                    const baseUrl = `${this.$store.state.baseUrl}/profileImages`;
                    const profileImage = this.$store.state.user.profile_image;
                    this.actions.changeUserDialogImageUrl(`${baseUrl}/${profileImage}`);
                }else if(this.meta.type === "cover"){
                    const baseUrl = `${this.$store.state.baseUrl}/coverImages`;
                    const coverImage = this.$store.state.user.cover_image;
                    this.actions.changeUserDialogImageUrl(`${baseUrl}/${coverImage}`);
                }
                this.actions.changeUserDialogModified(false);
            },
            saveImage(){
                const formData = new FormData();
                const headers = {
                    'Content-Type': 'x-www-form-urlencoded',
                    'Content-Encoding': 'multipart/form-data'
                }

                if(this.meta.type === "profile"){
                    formData.append("profileImage", this.formImage);

                    axios.post(`/api/v1/user/update-profile-image`, formData, { headers })
                        .then(res => {
                            const { profileImage } = res.data;
                            if(profileImage !== undefined){
                                this.actions.closeUserImageDialogPopup();
                                this.actions.changeUserProfileImage(profileImage);
                            }
                        })
                        .catch(err => console.log(err.response));
                }else if(this.meta.type === "cover"){
                    formData.append("coverImage", this.formImage);

                    axios.post(`/api/v1/user/update-cover-image`, formData, { headers })
                        .then(res => {
                            const { coverImage } = res.data;
                            this.actions.closeUserImageDialogPopup();
                            this.actions.changeUserCoverImage(coverImage);
                        })
                        .catch(err => console.log(err.response));
                }
            },
            deleteImage(){
                this.deleteImageRequestState = true;
            },
            cancelImageDelete(){
                this.deleteImageRequestState = false;
            },
            confirmImageDelete(){
                if(this.meta.type === "profile"){
                    axios.post(`/api/v1/user/delete-profile-image`)
                        .then(res => {
                            const { profileImage } = res.data;
                            this.actions.changeUserProfileImage(profileImage);
                            this.actions.changeUserDialogImageUrl(`${this.$store.state.baseUrl}/profileImages/${profileImage}`);

                            this.deleteImageRequestState = false;
                        })
                        .catch(err => console.log(err.response));
                }else if(this.meta.type === "cover"){
                    axios.post(`/api/v1/user/delete-cover-image`)
                        .then(res => {
                            const { coverImage } = res.data;
                            this.actions.changeUserCoverImage(coverImage);
                            this.actions.changeUserDialogImageUrl(`${this.$store.state.baseUrl}/coverImages/${coverImage}`);

                            this.deleteImageRequestState = false;
                        })
                        .catch(err => console.log(err.response));
                }
            }
        }
    });
</script>
