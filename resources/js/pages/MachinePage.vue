<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-success" @click="openPopup('new-machine')">Добавить новое оборудование
            </button>
        </div>
        <div class="col mt-4">
            <div class="card" v-for="machine in machines" :key="machine.id">
                <div class="card-body">
                    <h5 class="card-title">{{machine.name}}</h5>
                    <p class="card-text">{{machine.description}}</p>
                    <!--                <a v-if="machine.file" :href="machine.file.src">{{machine.file.name}}</a>-->
                    <div class="row">
                        <button @click="detailInfo(machine)" class="btn btn-primary">Подробнее</button>
                        <button @click="deleteMachine(machine.id)" class="btn btn-primary">Удалить</button>
                    </div>
                </div>
            </div>
            <DefaultPreloader :show="loading"></DefaultPreloader>
        </div>
        <modal name="new-machine" :height="500">
            <AddMachine/>
        </modal>
        <v-dialog/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import DefaultPreloader from '../components/DefaultPreloader';
    import AddMachine from "../components/Modals/AddMachine";

    export default {
        name: "MachinePage",
        components: {
            AddMachine,
            DefaultPreloader
        },
        computed: {
            ...mapGetters({
                machines: 'machines/machinesList',
                loading: 'machines/load'
            })
        },
        methods: {
            ...mapActions({
                getMachines: 'machines/getMachines',
                deleteMachine: 'machines/deleteMachine',
            }),
            openPopup(popupName) {
                this.$modal.show(popupName)
            },
            detailInfo(machine) {
                this.$modal.show('dialog', {
                    title: machine.name,
                    text: machine.detail_description,
                    buttons: [
                        {
                            title: 'Закрыть'
                        }
                    ]
                })
            }
        },
        mounted() {
            this.getMachines();
        }
    }
</script>

<style scoped>
    .row {
        justify-content: space-around;
    }
</style>
