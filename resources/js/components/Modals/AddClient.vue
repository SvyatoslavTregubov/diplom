<template>
    <div class="container">
        <h4>Добавление нового клиента</h4>
        <form @submit.prevent="addNew">
            <div class="form-group">
                <label for="name">Наименование организации</label>
                <input type="text" v-model="client.name" class="form-control" :class="{'is-invalid':validation.hasError('client.name')}" id="name" placeholder="Газпром">
                <div class="invalid-feedback">
                    {{validation.firstError('client.name')}}
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Описание</label>
                <input type="text" v-model="client.description" class="form-control" id="phone" :class="{'is-invalid':validation.hasError('client.description')}" placeholder="Несколько слов о компании">
                <div class="invalid-feedback">
                    {{validation.firstError('client.description')}}
                </div>
            </div>
            <div class="form-group">
                <label for="agent">Агент</label>
                <select v-model="client.agent" :class="{'is-invalid':validation.hasError('client.agent')}" class="form-control" id="agent">
                    <option v-for="agent in agents" :key="agent.id" :value="agent.id">{{agent.name}}</option>
                </select>
                <div class="invalid-feedback">
                    {{validation.firstError('client.agent')}}
                </div>
            </div>
            <button type="submit" class="btn btn-success">Добавить</button>
        </form>
        <div class="alert alert-success" v-if="msg" role="alert">
            {{msg}}
        </div>
    </div>
</template>

<script>

    import SimpleVueValidator from 'simple-vue-validator';
    import {mapActions, mapGetters} from 'vuex'

    const Validator = SimpleVueValidator.Validator;

    export default {
        name: "AddClient",
        data() {
            return {
                client: {
                    description: '',
                    name: '',
                    agent: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                agents: 'agents/agentsList',
                msg: 'clients/msg',
            })
        },
        methods: {
            ...mapActions({
                addAgent: 'clients/addClient'
            }),
            addNew(){
                this.$validate()
                    .then(function(success) {
                        if (success) {
                            this.addAgent(this.client);
                        }
                    }.bind(this));
            }
        },
        mixins: [SimpleVueValidator.mixin],
        validators: {
            'client.name': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
            'client.description': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
            'client.agent': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
        }
    }
</script>

<style scoped>

</style>
