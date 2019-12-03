<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand>Disatel</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'Welcome' }" exact>Inicio</b-nav-item>
                    <b-nav-item :to="{ name: '' }" exact>Otra cosa</b-nav-item>
                    <b-nav-item :to="{ name: '' }" exact>Info</b-nav-item>
                    <b-nav-item v-if="!loggedIn" :to="{ name: 'Login' }" exact>Login</b-nav-item>
                    <b-nav-item v-if="!loggedIn" :to="{ name: 'Register' }" exact>Register</b-nav-item>
                    <b-nav-item v-if="route == 'WelcomeAdmon'" 
                        exact
                        v-b-modal.modal-create>
                        Crear Usuario
                    </b-nav-item>
                    <b-nav-item v-if="route == 'ListFleets'"  
                        exact
                        v-b-modal.modal-create>
                        Crear Flota
                    </b-nav-item>
                    <b-nav-item v-if="route == 'ListVehicles'" 
                        exact
                        v-b-modal.modal-create>
                        Crear Vehículo
                    </b-nav-item>
                    <b-nav-item v-if="loggedIn" :to="{ name: 'Logout' }" exact>Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>   
        <transition enter-active-class="animated fadeIn">
            <router-view/> 
        </transition>

        <b-modal id="modal-create" 
            size="lg" 
            title="Crea un item nuevo:">
            <div class="d-block text-center">
                <create-profile v-if="route == 'WelcomeAdmon'"></create-profile>
                <create-fleet v-if="route == 'ListFleets'"></create-fleet>
                <create-vehicle v-if="route == 'ListVehicles'"></create-vehicle>
            </div>
        </b-modal>

    </div>
</template>

<script>
import CreateProfile from '@/components/Profiles/CreateProfile'
import CreateFleet from '@/components/Fleets/CreateFleet'
import CreateVehicle from '@/components/Vehicles/CreateVehicle'

import { mapGetters } from 'vuex'

export default {
    name: 'Menu',
    components: {
        'create-profile': CreateProfile,
        'create-fleet': CreateFleet,
        'create-vehicle': CreateVehicle
    },
    data() {
        return {
            route: this.$route.name
        }
    },
    computed: {
        ...mapGetters(['loggedIn'])
    },
    create() {
        console.log(this.route, 'ROUTEEEEE');
    }
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
#app {
    max-height: 100%;
}
.navbar, .bg-dark {
    list-style-type: disc;
    background: #010408;
    padding: 15px 0;
    margin: 0;
    z-index: 0;
}
.bg-dark {
    background-color: #010408 !important;
    
}
.navbar-nav .nav-link {
    color:aquamarine;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
}
.navbar-brand {
    margin: 0px 20px;
}
.navbar-toggler {
    margin: 0 20px;
}
</style>