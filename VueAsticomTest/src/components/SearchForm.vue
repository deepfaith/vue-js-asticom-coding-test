<template>
    <div class="container">
        <form @submit.prevent class="mb-5">
            <div class="input-group">
                <input
                        v-model="searchString"
                        @input="parseSearchString"
                        @click="resetInputField"
                        type="text"
                        class="form-control"
                        placeholder="Search ..."
                >
                <div class="input-group-append">
                    <button v-on:click.prevent="parseSearchString" class="btn btn-outline-secondary" type="button">
                        search
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'SearchForm',
        data() {
            return {
                searchString: ''
            };
        },
        methods: {
            resetInputField() {
                this.searchString = '';
            },
            parseSearchString() {
                const trimmedSearchString = this.searchString.trim();
                this.$emit('search', trimmedSearchString);
            }
        }
    };
</script>

<style scoped>
    input,
    button {
        box-shadow: none !important;
    }

    .form-control {
        border-color: #6c757d;
    }
</style>
