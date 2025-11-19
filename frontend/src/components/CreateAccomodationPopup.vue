<template>
	<div class="create-service-popup">
		<div class="bg-white create-service-popup-body">
			<div class="px-2">
				<font-awesome-icon class="cursor-pointer cicon" :icon="['fas', 'xmark']" @click="closeCreateAccomodationPopup"/>
			</div>
			<div class="divider"></div>

			<div class="px-2 pb-2 create-service-field-ctn">
				<label class="pt-2 pb-1">Accomodation Type</label>
				<div class="d-flex gap-1">
					<span class="service-type-chip service-type-chip-selected rounded">Taxi</span>
					<span class="service-type-chip rounded">Apartment</span>
					<span class="service-type-chip rounded">Condo</span>
					<span class="service-type-chip rounded">Dormitory</span>
				</div>

				<label class="pt-2 pb-1">Description</label>
				<textarea class="w-100" placeholder="Description"></textarea>

				<label class="pt-2 pb-1">Phone</label>
				<input placeholder="09xxxxxxxxxx" class="w-100"/>

				<label class="pt-2 pb-1">Address</label>
				<textarea class="w-100" placeholder="Your address"></textarea>

				<label class="pt-2 pb-1">Price</label>
				<input placeholder="$" class="w-100"/>

				<label class="pt-2 pb-1">Payment Type</label>
				<div class="d-flex gap-1">
					<span class="service-type-chip service-type-chip-selected rounded">Per Day</span>
					<span class="service-type-chip rounded">Per Month</span>
					<span class="service-type-chip rounded">Per Year</span>
				</div>
			</div>

			<div class="divider"></div>
			<div class="px-2 pt-2 text-end">
				<button class="btn btn-sm bg-black text-white">Submit</button>
			</div>
		</div>
	</div>

</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
		name: "CreateAccomodationPopup",
		props: ["closeCreateAccomodationPopup"]
	});
</script>
