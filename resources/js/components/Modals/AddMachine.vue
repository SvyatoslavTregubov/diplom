<template>
    <div class="container">
        <h4>Добавление оборудования</h4>
        <form @submit.prevent="addNew" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name">Наименование</label>
                <input type="text" v-model="machine.name" class="form-control"
                       :class="{'is-invalid':validation.hasError('machine.name')}" id="name" placeholder="Название оборудования">
                <div class="invalid-feedback">
                    {{validation.firstError('machine.name')}}
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Краткое описание</label>
                <input type="text" v-model="machine.description" class="form-control" id="phone"
                       :class="{'is-invalid':validation.hasError('machine.description')}"
                       placeholder="Описание оборудования">
                <div class="invalid-feedback">
                    {{validation.firstError('machine.description')}}
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Детальное описание</label>
                <textarea v-model="machine.detail_description" class="form-control" id="phone"
                          :class="{'is-invalid':validation.hasError('machine.detail_description')}"
                          placeholder="Большое описание оборудования">
                </textarea>
                <div class="invalid-feedback">
                    {{validation.firstError('machine.detail_description')}}
                </div>
            </div>
            <div class="form-group">
                <label for="agent">Файл</label>
                <input type="file" @change="onFileChange"
                        class="form-control" id="agent"/>
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
        name: "AddMachine",
        data() {
            return {
                machine: {
                    description: '',
                    detail_description: '',
                    name: '',
                    file: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                msg: 'machines/msg',
            })
        },
        methods: {
            ...mapActions({
                addMachine: 'machines/addMachine'
            }),
            addNew() {
                this.$validate()
                    .then(function (success) {
                        if (success) {
                            this.addMachine(this.machine);
                        }
                    }.bind(this));
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.machine.file = files[0];
            },
        },
        mixins: [SimpleVueValidator.mixin],
        validators: {
            'machine.name': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
            'machine.description': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
            'machine.detail_description': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения');
            },
        }
    }
</script>

<style scoped>

</style>
