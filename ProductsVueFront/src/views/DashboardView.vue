<template>
    <div class="dashboard" v-if="isAuthenticated">
        <NavComp />
    </div>    
</template>

<script>
    import NavComp from '@/components/NavComp.vue'
    import { mapState } from 'vuex';

    export default {
        name: "Dashboard",
        components : {
            NavComp
        },
        computed: {
            ...mapState(['isAuthenticated']),
        },
        data() {
           return {
                isAuthenticated : localStorage.getItem('isAuthenticated') 
           } 
        } 
    }
</script>

<style>
    .dashboard {
        margin: 0;
    }
</style>