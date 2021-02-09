<template>
	<div class="container-fluid">
		<div class="row">
			<main role="main" class="col-md-12 ml-sm-auto col-lg-12 pt-3 px-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 ">
					<h2>File Upload</h2>
					<div class="btn-toolbar mb-2 mb-md-0">
						<a 	href="https://docs.google.com/spreadsheets/d/1AI0dKLZZ3iTj0w9_aKDdloZc5SNmsQQ4ec5D6o2vSDc/edit?usp=sharing" 
							class="btn btn-sm btn-outline-secondary"
							target="_blank">
						View Google Sheet
						</a>
					</div>
				</div>
				<vue-dropzone :options="dropzoneOptions" :useCustomSlot=true v-on:vdropzone-files-added="fileAdded">
				<div class="dropzone-custom-content">
					<h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
					<div class="subtitle">...or click to select a file from your computer</div>
				</div>
				</vue-dropzone>
			</main>
		</div>
	</div>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

	export default {
		name: "Upload",
		components: {
			vueDropzone
		},
		data: function () {
			return {
				dropzoneOptions: {
					url: 'https://httpbin.org/post',
					maxFilesize: 0.5,
					headers: { "My-Awesome-Header": "header value" },
					thumbnailWidth: 150, // px
					thumbnailHeight: 150,
					addRemoveLinks: true					
				}
			}
		},
		methods:{
			fileAdded (file) {
				console.log(file);
			}
		},
		
	}
</script>
