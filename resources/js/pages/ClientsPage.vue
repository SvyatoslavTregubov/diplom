<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-success" @click="openPopup('new-client')">Добавить нового клиента
            </button>
            <button type="button" class="btn btn-success" @click="openPopup('new-agent')">Добавить нового агента
            </button>
        </div>
        <div class="col mt-4">
            <div class="card" v-for="client in clients" :key="client.id">
                <div class="card-body">
                    <h5 class="card-title">{{client.name}}</h5>
                    <p class="card-text">{{client.description}}</p>
                    <div class="row">
                        <button @click="detailInfo(client)" class="btn btn-primary">Подробнее</button>
                        <button @click="deleteClient(client.id)" class="btn btn-primary">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        <DefaultPreloader :show="loading"></DefaultPreloader>
        <modal name="new-agent" :height="350">
            <AddAgent/>
        </modal>
        <modal name="new-client" :height="400">
            <AddClient/>
        </modal>
        <v-dialog/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import DefaultPreloader from '../components/DefaultPreloader';
    import AddAgent from "../components/Modals/AddAgent";
    import AddClient from "../components/Modals/AddClient";

    export default {
        name: "ClientsPage",
        components: {
            AddClient,
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
                deleteClient: 'clients/deleteClient',
                getAgents: 'agents/getAgents'
            }),
            openPopup(popupName) {
                this.$modal.show(popupName)
            },
            detailInfo(client) {
                const contacts = client.agent.name + '<br>' + client.agent.email + '<br>' + client.agent.phone;
                this.$modal.show('dialog', {
                    title: client.name,
                    text: client.description + "<br>Контакты<br>" + contacts,
                    buttons: [
                        {
                            title: 'Закрыть'
                        }
                    ]
                })
            }
        },
        mounted() {
            this.getAgents();
            this.getClients();
        }
    }
</script>
<style scoped>
    .row {
        justify-content: space-around;
    }
</style>
