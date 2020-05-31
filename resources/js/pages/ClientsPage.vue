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
        <modal name="new-agent" :height="350">
            <AddAgent />
        </modal>
        <modal name="new-client">
            <AddAgent />
        </modal>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import DefaultPreloader from '../components/DefaultPreloader';
    import AddAgent from "../components/Modals/AddAgent";

    export default {
        name: "ClientsPage",
        components: {
            AddAgent,
            DefaultPreloader
        },
        computed: {
            ...mapGetters({
                clients: 'clients/clientsList',
                agents: 'agents/agentsList',
                loading: 'clients/load'
            })
        },
        methods: {
            ...mapActions({
                getClients: 'clients/getClients',
                getAgents: 'agents/getAgents'
            }),
            openPopup(){
                this.$modal.show('new-agent')
            }
        },
        mounted() {
            this.getAgents();
            this.getClients();
        }
    }
</script>

<style scoped>

</style>
