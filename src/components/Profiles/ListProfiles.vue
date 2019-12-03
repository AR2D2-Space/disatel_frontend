<template>
    <div class="container">
        <div class="row">
            <div class="col text-left">
                <h2>Listado de Perfiles</h2>
                <div class="col-md-12">
                    <b-table striped hover 
                        :items="profiles" 
                        :fields="fields">
                    </b-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ListProfile',
    data() {
        return {
            fields: [
                { key: 'user', label: 'Nombre' },
                { key: 'dpi', label: 'DPI' },
                { key: 'created', label: 'Fecha de creacion' }
            ],
            profiles: []
        }
    },
    methods: {
        getProfiles() {
            const path = 'http://localhost:8000/api/profiles/';
            
            axios.get(path)
            .then((r) => {
                this.profiles = r.data;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
    created() {
        this.getProfiles();
    }
}
</script>

<style scoped>

</style>