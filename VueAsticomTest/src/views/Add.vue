<template>
	<div class="container-fluid">
		<div class="row">
			<main role="main" class="col-md-12 ml-sm-auto col-lg-12 pt-3 px-4">
				<div class="container">
					<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mt-3 ">
						<h4 class="mb-3">New row</h4>
						<div class="btn-toolbar mb-2 mb-md-0">
							<router-link to="/"  class="btn btn-sm mr-1 btn-outline-secondary">
								Back
							</router-link>
							<a 	href="https://docs.google.com/spreadsheets/d/{api_config.sheet_key}/edit?usp=sharing" 
								class="btn btn-sm btn-outline-secondary"
								target="_blank">
							View Google Sheet
							</a>
						</div>
					</div>
					<div v-if="showMsg" class="alert alert-success alert-dismissible fade show" role="alert">
						{{message}}
						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="col-md-12 order-md-1">
						<form @submit.prevent="addRow">
							<div class="row">
								<div class="col-md-6 mb-3">
									<label for="document_no">Document No.</label>
									<input type="text" v-model="document_no" class="form-control" id="document_no" placeholder="Document No." required>
								</div>
								<div class="col-md-6 mb-3">
									<label for="document_title">Document Title</label>
									<input type="text" v-model="document_title" class="form-control" id="document_title" required>
								</div>
								<div class="col-md-6 mb-3">
									<label for="group_division">Group / Division / Department / Section / Unit</label>
									<input type="text" v-model="group_division" class="form-control" id="group_division" required>
								</div>
								<div class="col-md-6 mb-3">
									<label for="prepared_by">Prepared By</label>
									<input type="text" v-model="prepared_by" class="form-control" id="prepared_by" required>
								</div>
								<div class="col-md-6">
									<label for="">.</label>
									<button class="btn btn-primary btn-block" type="submit">SUBMIT</button>
								</div>
								
							</div>		
						</form>
					</div>

					
				</div>
				
			</main>
		</div>
	</div>
</template>

<script>
	const { GoogleSpreadsheet } = require('google-spreadsheet');
	const creds = require('@/client_secret.json');
	const api_config = require('@/api_config.json');

	export default {
		name: "AddRow",
		data() {
			return {
				document_no: '',
				document_title: '',
				group_division: '',
				prepared_by: '',
				showMsg : false,
				message: '',
				api_config: api_config
			}
		},
		methods: {
			async addRow() {
				const newRow = {
					document_no: this.document_no,
					document_title: this.document_title,
					group_division: this.group_division,
					prepared_by: this.prepared_by,
				}

				const doc = new GoogleSpreadsheet(api_config.sheet_key);
				await doc.useServiceAccountAuth(creds);
				await doc.loadInfo(); 
				const sheet = doc.sheetsByIndex[0];
				await sheet.addRow(newRow);
				
				this.document_no = '';
				this.document_title = '';
				this.group_division = '';
				this.prepared_by = '';

				this.message = "New row added !";
				this.showMsg = true;

				
			}
		}
	}
</script>

<style scoped>

</style>
