
<template>
    <div class="container">
        <div class="row">
            <div class="form-group">
                <label for="exampleFormControlSelect1">Фильтр по завершенности</label>
                <select class="form-control" v-model="filter" id="exampleFormControlSelect1">
                    <option value="-1">Все</option>
                    <option value="0">Открытые</option>
                    <option value="1">Завершенные</option>
                </select>
            </div>
        </div>
        <div class="col mt-4">
            <h5>Общее число ошибок {{errors.length}}</h5>
            <div class="card mt-2" v-for="error in errors" :key="error.id">
                <div class="card-body">
                    <h5 class="card-title">{{error.name}}</h5>
                    <p class="card-text">{{error.machine.name}}</p>
                    <button type="button" class="btn btn-success" v-if="error.status" @click="updateError(error)">Завершена</button>
                    <button type="button" class="btn btn-danger" v-if="error.status == false" @click="updateError(error)">Открыта</button>
                </div>
            </div>
            <DefaultPreloader :show="loading"></DefaultPreloader>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import DefaultPreloader from '../components/DefaultPreloader';

    export default {
        name: "HomePage",
        components: {
            DefaultPreloader
        },
        data () {
            return {
                filter: null,
            }
        },
        computed: {
            ...mapGetters({
                errors: 'errors/errorsList',
                loading: 'errors/load'
            })
        },
        methods: {
            ...mapActions({
                getErrors: 'errors/getErrors',
                updateError: 'errors/updateError',
                filterErrors: 'errors/filter'
            }),
        },
        watch: {
            filter(value) {
                if (value == -1) {
                    this.getErrors();
                } else {
                    this.filterErrors(value);
                }
            }
        },
        mounted() {
            this.getErrors();
        }
    }
</script>

<style scoped>
    .row {
        justify-content: space-around;
    }
</style>
