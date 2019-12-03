<template>
    <div class="container-fluid">
        <div class="container">
            <div class="text-left">
                <section>
                    <h2 v-if="route == 'EditProfile'"
                        v-text="MessageProfileEdit"
                        class="p-2">
                    </h2>
                    <h2 v-else-if="route == 'EditFleet'"
                        v-text="MessageFleetEdit"
                        class="p-2">
                    </h2>
                    <h2 v-else
                        v-text="MessageVehicleEdit"
                        class="p-2">
                    </h2>
                </section>
            </div>
            <div class="row">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">
                            <form @submit="edit">
                                <div class="row">
                                    <div class="col-md-6" 
                                        v-for="(value, key) in fields"
                                        :key="key">
                                        <label :for="key" 
                                            class="col-sm-6 col-form-label"
                                            v-text="key">
                                        </label>
                                        <div class="col-sm-12">
                                            <input type="text" 
                                                :name="key" 
                                                v-model="fields[key]"
                                                :id="key" 
                                                class="form-control" 
                                                placeholder="Ingresa un valor"
                                                aria-describedby="helpId"/>
                                            <small id="helpId" 
                                                class="text-muted">
                                                Help text
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div class="rows">
                                    <div class="col text-left">
                                        <button type="submit" 
                                            class="btn btn-primary"
                                            @click="edit">
                                            Editar
                                        </button>
                                        <router-link type="button" 
                                            class="btn btn-outline-dark" 
                                            :to="{ name: 'ListFleets' }">
                                            Cancelar
                                        </router-link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'EditFleet',
    props: ['MessageProfileEdit', 'MessageFleetEdit', 'MessageVehicleEdit', 'path'],
    data() {
        return{
            Id: this.$route.params.Id,
            route: this.$route.name
        }
    },
    computed: {
        ...mapState(['fields'])
    },
    methods: {
        getItemEdit() {
            const path = `${this.path}/${this.Id}/`;
            this.$store.dispatch('getItem', path)
        },
        edit(event) {
            event.preventDefault();
            const path = `${this.path}/${this.Id}/`;
            this.$store.dispatch('editItem', path)
        }
    },
    created() {
        this.getItemEdit();
    }
}
</script>

<style scoped>
.container-fluid {
    width: 100vw;
    height: 90vh;
    background-image: linear-gradient(to bottom, rgba(236, 223, 223, 0.856) 80%,rgba(236, 223, 223, 0.856) 80%);
}
.container {
    padding: 15px;
    background-image: url('/static/img/travel_train.gif');
}
.card {
    background-color: transparent;
    box-shadow: 0 4px 35px rgba(15, 6, 6, 0.12), 0 2px 20px rgba(12, 3, 3, 0.24);
}
label {
    font-size: 14px;
    text-transform: uppercase;
}
@media (min-width: 1200px) {}
    .container {
        max-width: 800px;
        height: 550px;;
}
@media (max-width: 425.95px) {
    .container {
        width: 100%;
        height: 600px;
    }
    .col-8 {
        -webkit-box-flex: 0;
        flex: 0 0 100%;
        max-width: 100%;
    }
}
</style>