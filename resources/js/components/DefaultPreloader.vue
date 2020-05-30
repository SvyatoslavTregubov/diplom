<template>
    <div class="d-flex align-items-center" v-if="show==true">
        <strong>Загрузка...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
</template>

<script>
    export default {
        name: "DefaultPreloader",
        props: ['show']
    }
</script>

<style scoped>

</style>
