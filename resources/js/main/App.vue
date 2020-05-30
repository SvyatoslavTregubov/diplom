<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">ООО Эколинк-Сервис</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item" :class="{active: this.$router.currentRoute.name == 'home'}">
                        <router-link class="nav-link" to="/">Рабочий стол</router-link>
                    </li>
                    <li class="nav-item" :class="{active: this.$router.currentRoute.name == 'clients'}">
                        <router-link class="nav-link" to="/clients">Клиенты</router-link>
                    </li>
                    <li class="nav-item" :class="{active: this.$router.currentRoute.name == 'machines'}">
                        <router-link class="nav-link" to="/machines">Оборудование</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/auth">Авторизация</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
        <footer class="footer">
            <div class="container">
                разработка <a href="https://vk.com/svyatilnikkk" target="_blank">Святослав Трегубов</a>
            </div>
            <DefaultPopup/>
        </footer>
    </div>
</template>

<script>
    import DefaultPopup from "../components/DefaultPopup";
    export default {
        name: 'App',
        components: {
            DefaultPopup
        },
        computed: {
          currentLink(){

          }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>
