<template>
    <div>
        <div class="alert alert-danger" v-if="status">
            {{status}}
        </div>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" name="email" class="form-control" :class="{'is-invalid': validation.hasError('user.email')}" id="email"
                       aria-describedby="emailHelp" placeholder="Enter email">
                <div class="invalid-feedback">
                    {{validation.firstError('user.email')}}
                </div>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input v-model="user.password" type="password" name="password" class="form-control" :class="{'is-invalid':validation.hasError('user.password')}" id="password"
                       placeholder="Password">
                <div class="invalid-feedback">
                    {{validation.firstError('user.password')}}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Войти</button>
        </form>

    </div>
</template>

<script>
    import SimpleVueValidator from 'simple-vue-validator';
    import {mapActions, mapGetters} from 'vuex'

    const Validator = SimpleVueValidator.Validator;

    export default {
        name: "AuthPage",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                }
            }
        },
        computed: {
            ...mapGetters({
                status: 'user/loginStatus'
            })
        },
        methods: {
            ...mapActions({
                sendLogin: 'user/sendLogin'
            }),
            login(){
                this.$validate()
                    .then(function(success) {
                        if (success) {
                            this.sendLogin(this.user)
                        }
                    }.bind(this));
            }
        },
        mixins: [SimpleVueValidator.mixin],
        validators: {
            'user.email': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения').email('Email введен в неверном формате!');
            },
            'user.password': function (value) {
                return Validator.value(value).required('Поле обязательно для заполнения').minLength(6);
            }
        }
    }
</script>

