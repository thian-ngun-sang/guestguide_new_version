<template>
	<div v-if="text !== null && text !== ''"
		:class="classProp ? classProp : 'info-popup-default'"
		class="info-popup d-flex justify-content-between">
		<div>{{ text }}</div>
		<div v-on:click="close">
				<font-awesome-icon class="cursor-pointer ms-2 cicon"
					:icon="['fas', 'xmark']" />
		</div>
	</div>
</template>

<style>
	.cursor-pointer{
		cursor: pointer;
	}

	.info-popup{
		position: fixed;
		bottom: 1rem;
		/* width: 16rem; */
		display: inline-block;
		color: white;
		left: 35%;
		right: 35%;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		z-index: 2;
	}

	.info-popup-success{
		background-color: green;
	}

	.info-popup-unsuccess{
		background-color: red;
	}

	.info-popup-default{
		background-color: black;
	}

	@media(max-width: 860px){
		.info-popup{
			left: 30%;
			right: 30%;
		}
	}

	@media(max-width: 560px){
		.info-popup{
			left: 25%;
			right: 25%;
		}
	}

	@media(max-width: 460px){
		.info-popup{
			left: 20%;
			right: 20%;
		}
	}

	@media(max-width: 360px){
		.info-popup{
			left: 18%;
			right: 18%;
		}
	}

	@media(max-width: 260px){
		.info-popup{
			left: 13%;
			right: 13%;
			border-radius: 3px;
		}
	}
</style>

<script>
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: "SuccessInfo",
		props: ["classProp", "text", "duration", "close"],
		created(){
			if(!this.close){
				throw new Error("'close' prop is missing");
			}

			if(typeof this.close !== 'function'){
				throw new Error("'close' prop's type must be function");
			}
		},
		mounted(){
			let duration;
			if(this.duration){
				duration = Number.parseInt(this.duration);
			}else{
				duration = 3000;
			}

			if(this.text !== null && this.text !== "" &&
				duration !== undefined){

				// setTimeout(() => {
				// 	console.log("info popup has been removed");
				// 	this.close();
				// }, duration);
			}

		}
	});
</script>
