<template>

    <div class="container">
        <h4>Добавление нового агента</h4>
        <form @submit.prevent="addNew">
            <div class="form-group">
                <label for="name">ФИО</label>
                <input type="text" v-model="agent.name" class="form-control" :class="{'is-invalid':validation.hasError('agent.name')}" id="name" placeholder="Иванов Иван Иванович">
                <div class="invalid-feedback">
                    {{validation.firstError('agent.name')}}
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Телефон</label>
                <input type="number" v-model="agent.phone" class="form-control" id="phone" :class="{'is-invalid':validation.hasError('agent.phone')}" placeholder="89999999999">
                <div class="invalid-feedback">
                    {{validation.firstError('agent.phone')}}
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="agent.email" class="form-control" id="email" placeholder="Email" :class="{'is-invalid':validation.hasError('agent.email')}">
                <div class="invalid-feedback">
                    {{validation.firstError('agent.email')}}
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
        name: "AddAgent",
        data() {
            return {
                agent: {
                    email: '',
                    name: '',
                    phone: ''
                }
            }
        },computed: {
            ...mapGetters({
                msg: 'agents/msg'
            })
        },
        methods: {
            ...mapActions({
                addAgent: 'agents/addAgent'
            }),
            addNew(){
                this.$validate()
                    .then(function(success) {
                        if (success) {
                            this.addAgent(this.agent);
                        }
                    }.bind(this));
            }
        },
        mixins: [SimpleVueValidator.mixin],
        validators: {
            'agent.email': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения').email('Email введен в неверном формате!');
            },
            'agent.name': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
            'agent.phone': function (value) {
                return Validator.value(value).digit().length(11);
            },
        }
    }
</script>

<style scoped>

</style>
