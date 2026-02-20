<template>
	<div class="filter-popup">
		<div>
			<button class="btn border-0 p-0" v-on:click="() => this.closeFilterPopup()">
				<font-awesome-icon class="cursor-pointer ms-2 cicon" :icon="['fas', 'xmark']" />
			</button>
		</div>
		<hr class="my-1 filter-hr"/>
		<div class="mx-2">
			<div>
				<input type="checkbox" id="phone-number" v-model="form.phoneNumberProvided"/>
				<label class="ms-2 cursor-pointer" for="phone-number">Phone number provided</label>
			</div>
			<div>
				<input type="checkbox" id="nearby-me" v-model="form.nearbyMe"/>
				<label class="ms-2 cursor-pointer" for="nearby-me">Nearby me</label>
			</div>
		</div>
		<hr class="my-1 filter-hr"/>
		<div class="d-flex justify-content-between mx-2 mt-2">
			<button class="btn border-0 ps-0" @click="resetFilter">Clear All</button>
			<button class="btn border-0 btn-sm btn-dark" v-on:click="showResults">Show 1000+ Results</button>
		</div>
	</div>
</template>

<style>
	.filter-popup{
		background-color: white;
		padding-block: 0.6rem;
		position: absolute;
		z-index: 2;
		border-radius: 8px;
		left: var(--popup-padding-inline);
		right: var(--popup-padding-inline);
		box-shadow: 0.8px 0.8px 2px black;
	}

	.filter-hr{
		border: none;
		height: 1px;
		background-color: black;
		box-shadow: none;
	}

</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "ServiceFilter",
	data() {
		return {
			form: {
				phoneNumberProvided: false,
				nearbyMe: false
			}
		}
	},
	methods: {
		resetFilter(){
			this.form = { phoneNumberProvided: false, nearbyMe: false };
		},
		showResults(){
			console.log(this.form);
		},
		// clickOutsideFilter(event){
		// 	// this.closeFilterPopup();
		// 	if(!this.$el.contains(event.target)){
		// 		document.removeEventListener("mousedown", this.clickOutsideFilter);
		// 		this.closeFilterPopup();
		// 	}
		// }
	},
	props: ["closeFilterPopup", "clickOutsideFilter"],
	mounted(){
		document.addEventListener("mousedown", this.clickOutsideFilter);
	},
	unmouned(){
		document.removeEventListener("mousedown", this.clickOutsideFilter);
	}
});
</script>
