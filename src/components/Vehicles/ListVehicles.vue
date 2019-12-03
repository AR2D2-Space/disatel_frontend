<template>
    <div class="container-fluid">
        <b-row>
            <b-col md="8" sm="12" class="my-1 p-3">
                <router-link class="btn btn-return"
                    :v-if="route == 'ListFleets'"
                    :to="{ name: 'Welcome' }"
                    v-if="show">
                    Atrás
                </router-link>
                <section>
                    <h2 v-if="route == 'Welcome'"
                        v-text="MessageFleets"
                        class="p-2">
                    </h2>
                    <h2 v-else
                        v-text="messageVehicles"
                        class="p-2">
                    </h2>
                </section>
                <div class="col-md-12 px-1">
                    <b-form-group
                        label="Busqueda:"
                        label-cols-sm="2"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0">
                        <search :Mdpath="Mdpath" 
                            :MsgSearch="MsgSearchMd"
                            :HrefSearch="HrefSearchMd">
                        </search>
                    </b-form-group>
                </div>
                <b-row class="justify-content-center">
                    <b-col sm="12">
                        <ul class="responsive-table">
                            <li class="table-header">
                                <div v-for="(field, idx) in fields"
                                    :key="idx"
                                    v-text="field.label"
                                    class="col">
                                </div>
                            </li>
                            <li class="table-row"
                                v-for="(item, idx) in items"
                                :key="idx">
                                <div v-for="(field, index) in item"
                                    :key="index"
                                    v-if="index != 'id'"
                                    v-text="field"
                                    :data-label="index"
                                    class="col">
                                </div>
                                <router-link :to="{ path: `${item.id}/f-edit` }"
                                    exact
                                    class="col-actions">
                                    Editar
                                </router-link>
                                <button @click="chao(item, idx)"
                                    class="btn col-actions">
                                    Eliminar
                                </button>
                                <button exact
                                    v-b-modal.modal-location
                                    class="btn col-actions">
                                    Historial
                                </button>
                            </li>
                        </ul>
                    </b-col>
                    <pagination :Mdpath="Mdpath"></pagination>
                </b-row>
            </b-col>
            <b-col md="4" class="d-none d-md-block py-3 mt-4">
                <img src="static/svg/by_my_car.svg" 
                    alt="Bienvenido"
                    class="img-fluid"/>
            </b-col>
        </b-row>
        <b-modal id="modal-location" 
            size="xl"
            centered
            title="Localizacion de tu vehiculo:">
            <div class="d-block text-center">
                <location></location>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

import Search from '@/components/reusable/Search'
import Pagination from '@/components/reusable/Pagination'
import Location from '@/components/Vehicles/Location'

export default {
    components: {
        'search': Search,
        'pagination': Pagination,
        'location': Location
    },
    name: 'ListVehicle',
    data() {
        return {
            messageVehicles: 'Listado de Vehículos',
            fields: [
                { label: 'ID' },
                { label: 'Placa' }
            ],
            Mdpath: 'api/vehicles/?',
            MsgSearchMd: 'Vehiculos',
            HrefSearchMd: 'vehicles',
            route: this.$route.name,
            selected: null,
            acceptDelete: '',
            vehicleId: null
        }
    },
    computed: {
        ...mapState(['url', 'items', 'show'])
    },
    methods: {
        getVehicles() {
            const path = 'api/vehicles/';
            this.$store.dispatch('getItems', path)
        },
        //  @row-selected="onRowSelected"
        onRowSelected(items) {
            this.selected = items;
        },
        chao(vehicle, idx) {
            this.vehicleId = vehicle.id;
            const path = `api/vehicles/${this.vehicleId}/`;
            
            this.acceptDelete = '';
            this.$bvModal.msgBoxConfirm('Estas seguro de eliminar este vehiculo?', {
                title: 'Por favor confirme.',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'SI',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                this.acceptDelete = value;
                if (this.acceptDelete) {
                    this.$store.dispatch('deleteItem', path)
                    .then(r => {
                        this.items.splice(idx, 1)
                    })
                }
            })
            .catch(err => {
                // An error occurred
            })
        },
    },
    created() {
        this.getVehicles();
    },
}
</script>

<style scoped>
h2 {
  color: #42b983;
}
a.btn-return {
    background: cornflowerblue;
    color: white;
    margin: 0px 15px;
    transition: 0.2s;
}
a.btn-return:hover {
    background: salmon;
    color: white;
    border: none;
}
ul.responsive-table {
    padding: 0;
}
.responsive-table li {
    border-radius: 3px;
    padding: 10px;
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
    font-size: 12px;
}
.responsive-table li.table-header {
    background-color: #95A5A6;
    flex-wrap: wrap;
}
li.table-header div.col {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    display:inline-block;
    vertical-align: middle;
    -webkit-box-flex: 0;
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0px 10px;
}
.responsive-table li.table-row {
    background-color: #ffffff;
    box-shadow: 0px 4px 9px 0px rgba(0,0,0,0.1);
    font-size: 0px;
    display:inline-block;
    flex-wrap: wrap;
    width: 47%;
    height: 100%;
    margin: 0px 10px;
    overflow:hidden;
    transition:all 0.2s ease-out;
}
.responsive-table li.table-row:hover {
  background-color:rgb(212, 211, 211);
}
.responsive-table .col {
    position: initial;
    flex-basis: 25%;
    text-align: center;
}
li.table-row div.col  { 
    font-size:13px;
    font-weight:normal;
    text-transform: uppercase;
    list-style:none;
    display:inline-block;
    -webkit-box-flex: 0;
    flex: 0 0 50%;
    max-width: 50%;
    height: 35px;
    padding: 5px 10px;
    box-sizing:border-box;
}
li.table-row .col-actions {
    position: relative;
    right: -110px;
}
li.table-row a {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    line-height: 1.5;
    border-radius: 0.25rem;
}
li.table-row a, li.table-row button {
    font-size: 14px;
    padding: 6px;
    height: 45px;
}
li.table-row a:not(:disabled) {
    cursor: pointer;
}
li.table-row a:hover {
    color: initial;
    text-decoration: none;
}
li.table-row a:hover, li.table-row button:hover {
    color: red;
}
@media only screen and (max-width : 767px) {
    .responsive-table .table-header {
      display: none;
    }
    .responsive-table li {
      display: block;
      padding: 10px 15px;
      justify-content: space-between;
      font-size: 14px;
    }
    .responsive-table .col {
      flex-basis: 100%;
    }
    .responsive-table .col {
      display: flex;
      padding: 10px 5px;
    }
    .responsive-table .col:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        text-transform: uppercase;
        flex-basis: 50%;
        text-align: right;
    }
    li.table-row div.col {
        font-size:10px;
        display: block;
        padding: 10px 6px;
    }
    li.table-row .col-actions {
        font-size: 12px;
    }
}
@media only screen and (max-width: 1144px) and (min-width: 1025px) {
    .responsive-table li.table-row[data-v-6a9cf56d] {
        width: 46.5%;
    }
}
@media only screen and (max-width: 1024px) and (min-width: 768px) {
    .col-md-8 {
        -webkit-box-flex: 0;
        flex: 0 0 50%;
        max-width: 50%;
    }
    .col-md-4 {
        -webkit-box-flex: 0;
        flex: 0 0 50%;
        max-width: 50%;
    }
    .responsive-table li.table-row {
        width: 95%;
        height: 50px;
    }
    .responsive-table li.table-row:hover {
        height: 90px;
    }
    legend.col-form-label.col-form-label-sm {
        display: none;
    }
}
@media only screen and (max-width: 767.98px) and (min-width: 426px) {
    .responsive-table li.table-row {
        width: 46.2%;
        height: 100%;
    }
    li.table-row .col-actions {
        right: -75px;
    }
}
@media only screen and (max-width: 557.98px) and (min-width: 426px) {
    .responsive-table li.table-row {
        width: 44.7%;
    }
    li.table-row .col-actions {
        right: -25px;
    }
}
@media only screen and (max-width: 425.98px) and (min-width: 320.98px) {
    .responsive-table li.table-row {
        width: 95%;
        height: 55px;
    }
    .responsive-table li.table-row:hover {
        height: 125px;
    }
    li.table-row .col-actions {
        right: -65px;
    }
}
@media only screen and (max-width:479px) {
    li.table-row div.col {
        padding: 10px 3px;
    }
}
@media only screen and (max-width : 320px) {
    .responsive-table li {
        padding: 15px;
    }
    .responsive-table li.table-row {
        width: 90%;
        height: 60px;
    }
    .responsive-table li.table-row:hover {
        height: 125px;
    }
    li.table-row .col-actions {
        right: -30px;
    }
}
</style>