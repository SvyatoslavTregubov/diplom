<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-success">Добавить нового клиента</button>
            <button type="button" class="btn btn-success" @click="openPopup">Добавить нового агента</button>
        </div>
        <div class="card" v-for="client in clients">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Button</a>
            </div>
        </div>
        <DefaultPreloader :show="loading"></DefaultPreloader>
        <modal name="new-agent">
            Добавление нового агента
        </modal>
    </div>


</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import DefaultPreloader from '../components/DefaultPreloader';

    export default {
        name: "ClientsPage",
        components: {
            DefaultPreloader
        },
        computed: {
            ...mapGetters({
                clients: 'clients/clientsList',
                loading: 'clients/load'
            })
        },
        methods: {
            ...mapActions({
                getClients: 'clients/getClients'
            }),
            openPopup(){
                this.$modal.show('new-agent')
            }
        }
    }
</script>

<style scoped>

</style>
