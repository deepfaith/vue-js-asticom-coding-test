<template>
	<tr>
		<td>{{row.document_no}}</td>
		<td>{{row.document_title}}</td>
		<td>{{row.group_division}}</td>
		<td>{{row.prepared_by}}</td>
	</tr>
</template>

<script>
	export default {
		name: "Row",
		props: ["row"],
	}
	
</script>

<style scoped>

</style>