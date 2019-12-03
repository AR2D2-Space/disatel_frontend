<template>
    
</template>

<script>

export default {
    name: 'Logout',
    created() {
        this.$store.dispatch('destroyToken')
        location.href = '/'
    }
}
</script>

<style scoped>

</style>