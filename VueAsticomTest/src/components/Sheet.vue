<template>
	<div class="container-fluid">
		<div class="row">
			<main role="main" class="col-md-12 ml-sm-auto col-lg-12 pt-3 px-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 ">
					<h2>Asticom Coding Challenge</h2>
					<div class="btn-toolbar mb-2 mb-md-0">
						<a 	href="https://docs.google.com/spreadsheets/d/1AI0dKLZZ3iTj0w9_aKDdloZc5SNmsQQ4ec5D6o2vSDc/edit?usp=sharing" 
							class="btn btn-sm btn-outline-secondary"
							target="_blank">
						View Google Sheet
						</a>
					</div>
				</div>
				<SearchForm v-on:search="search"/>
				<div class="table-responsive">
				<table class="table table-striped ">
					<thead>
					<tr>
						<th>Document No.</th>
						<th>Document Title</th>
						<th>Group / Division / Department / Section / Unit</th>
						<th>Prepared By</th>
					</tr>
					</thead>
					
					<tbody>
						<Row v-bind:key="row.id" v-for="row in rows" v-bind:row="row" />
					</tbody>
				</table>
				</div>
			</main>
		</div>
	</div>
</template>
 
<script>
import Row from '@/components/Row.vue';
import SearchForm from '@/components/SearchForm.vue';
import DataService from '@/services/DataService.js';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('@/client_secret.json');
const api_config = require('@/api_config.json');
	export default {
		name: "Sheet",
		components: {
			Row, SearchForm
		},
		props: ["sheet"],
		data() {
			return {
				rows: [],
				loading: true,
				last_search_call: null,
                reformattedSearchString: ''

			}
		},
		methods:{
			async accessSpreadSheet() {
				const doc = new GoogleSpreadsheet(api_config.sheet_key);
				await doc.useServiceAccountAuth(creds);
				await doc.loadInfo(); 
				const sheet = doc.sheetsByIndex[0];
				const  rows = await sheet.getRows({
					offset: 0
				})
				console.log(rows);
				this.rows = rows;
			},
            search(search_term) {
                let normalized_search_string = search_term.toLowerCase()
                this.reformattedSearchString = normalized_search_string
                console.log(normalized_search_string)
                if (search_term) {

                    let random_id = Math.random().toString(36).substring(2)
                    let random_callback_handler = `callback_func_${random_id}`;
                    let sql_query = `select A,B,C,D where LOWER(A) contains '${normalized_search_string}' or LOWER(B) contains '${normalized_search_string}' or LOWER(C) contains '${normalized_search_string}' or LOWER(D) contains '${normalized_search_string}'`
                    let request_url = `${api_config.baseUrl}${api_config.sheet_key}/gviz/tq?gid=${api_config.gid}&tqx=responseHandler:${random_callback_handler}&headers=${api_config.headers}&tq=${sql_query}`;
					this.rows = []; 
                    // we overwrite the previous id
					this.last_search_call = random_id
					DataService.search(request_url,random_callback_handler).then(data => {
                        //console.log(data.table.rows);
                        // if last_search_call is not this random_id we ignore the results as there is already another call pending
                        if (this.last_search_call === random_id) {
                            let result = []
                            if (data.table.rows.length) {
								
								for (var i = 0, length = data.table.rows.length; i < length; i++) {
									let first_row = data.table.rows[i];					
									result[i] = 
										{
											'document_no': first_row.c[0].v,
											'document_title': first_row.c[1].v,
											'group_division': first_row.c[2].v,
											'prepared_by': first_row.c[3].v,
										}
								}
							}
							//console.log(result);
                            this.rows = result
                        } else {
                            console.log('call cancelled!')
                        }

                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.accessSpreadSheet();
                }
            }

		},
		created() {
			this.accessSpreadSheet();
		}
		
	}
</script>

<style scoped>

</style>