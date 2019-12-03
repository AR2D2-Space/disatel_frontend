<template>
    <div class="container-fluid">
        <b-row>
            <b-col md="6" sm="12" class="my-1 p-5">
                <router-link class="btn btn-return"
                    :v-if="route == 'ListFleets'"
                    :to="{ name: 'WelcomeAdmon' }"
                    v-if="show">
                    Atrás
                </router-link>
                <section>
                    <h2 v-if="route == 'Welcome'"
                        v-text="MessageFleets"
                        class="p-2">
                    </h2>
                    <h2 v-else
                        v-text="messageFleets"
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
                                <div class="wrapper-search">
                                    <search :Mdpath="MdpathVeh" 
                                        :MsgSearch="MsgSearchSm"
                                        :HrefSearch="HrefSearchSm"
                                        class="search-collapse">
                                    </search>
                                </div>
                                <router-link :to="{ path: `${item.id}/f-edit` }"
                                    exact>
                                    Editar
                                </router-link>
                                <button @click="chao(item, idx)"
                                    class="btn">
                                    Eliminar
                                </button>
                                <router-link :to="{ name: 'ListVehicles' }"
                                    exact>
                                    Ver Flotas
                                </router-link>
                            </li>
                        </ul>
                    </b-col>
                    <pagination :Mdpath="Mdpath"></pagination>
                </b-row>
            </b-col>
            <b-col md="6" class="d-none d-md-block py-3 mt-4">
                <img src="static/svg/startman1.svg" 
                    alt="Bienvenido"
                    class="img-fluid"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'

import Search from '@/components/reusable/Search'
import Pagination from '@/components/reusable/Pagination'

import { mapState } from 'vuex'

export default {
    name: 'ListFleet',
    components: {
        'search': Search,
        'pagination': Pagination
    },
    props: ['MessageFleets'],
    data() {
        return {
            messageFleets: 'Listado de Flotas',
            fields: [
                { label: 'Nombre de Flota' },
                { label: 'ID' },
                { label: 'Tipo' },
                { label: 'Pais' },
                { label: 'N. de vehiculos' }
            ],
            Mdpath: 'api/fleets/?',
            MdpathVeh: 'api/vehicles/?',
            MsgSearchMd: 'Flotas',
            MsgSearchSm: 'Vehiculos',
            HrefSearchMd: 'fleets',
            HrefSearchSm: 'vehicles',
            fleetId: null,
            route: this.$route.name
        }
    },
    computed: {
        ...mapState(['url', 'items', 'show'])
    },
    methods: {
        getFleets() {
            const path = 'api/fleets/';
           this.$store.dispatch('getItems', path)
        },
        chao(fleet, idx) {
             this.fleetId = fleet.id;
            const path = `api/fleets/${this.fleetId}/`;
            
            this.acceptDelete = '';
            this.$bvModal.msgBoxConfirm('Estas seguro de eliminar esta flota?', {
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
        this.getFleets();
    },
}
</script>

<style scoped>
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
    flex: 0 0 20%;
    max-width: 20%;
    padding: 0px 10px;
}
.responsive-table li.table-row {
    background-color: #ffffff;
    box-shadow: 0px 4px 9px 0px rgba(0,0,0,0.1);
    font-size: 0px;
    flex-wrap: wrap;
    height: 50px;
    overflow:hidden;
    transition:all 0.2s ease-out;
}
.responsive-table li.table-row:hover {
  background-color:rgb(212, 211, 211);
  height: 100px;
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
    flex: 0 0 20%;
    max-width: 20%;
    height: 35px;
    padding: 5px 10px;
    box-sizing:border-box;
}
li.table-row div.wrapper-search {
    height: 40%;
}
li.table-row div.search-collapse {
  font-size:13px;
  margin:0;
  padding:8px;
  height: 47px;
  width:300px;
  color:darken(rgba(255,255,255,0.9), 50%);
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
    /* .responsive-table .table-row {
      
    } */
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
    .responsive-table li.table-row:hover {
        height:290px;
    }
    li.table-row div.wrapper-search {
        height: 20%;
    }
}
@media only screen and (max-width:1207.98px) and (min-width:767.98px) {
    .responsive-table li.table-row:hover {
        height: 135px;
    }
}
@media only screen and (max-width:1024px) and (min-width:767.98px) {
    legend.col-form-label.col-form-label-sm {
        display: none;
    }
}
@media only screen and (max-width:820px) and (min-width:767.98px) {
    li.table-row div.search-collapse {
        width: 260px;
    }
}
@media only screen and (max-width:767px) and (min-width:480px) {
    li.table-row div.col {
        font-size:10px;
        display: block;
        padding: 10px 6px;
    }
}
@media only screen and (max-width:767.98px) and (min-width: 425px) {
    li.table-row div.search-collapse {
        width: auto;
    }
}
@media only screen and (max-width:767.98px) and (min-width: 320.98px) {
    .responsive-table li.table-row {
        height: 55px;
    }
    .responsive-table li.table-row:hover {
        height:290px;
    }
    li.table-row div.search-collapse {
        width: 275px;
    }
}
@media only screen and (max-width:479px) {
    li.table-row div.col {
        font-size:10px;
        display: block;
        padding: 10px 3px;
    }
}
@media only screen and (max-width: 424.98px) and (min-width: 320.98px) {
    li.table-row div.search-collapse {
        width: 230px;
    }
}
@media only screen and (max-width : 320px) {
    .responsive-table li {
        padding: 15px;
    }
    .responsive-table li.table-row {
        height: 60px;
    }
    .responsive-table li.table-row:hover {
        height:290px;
    }
    li.table-row div.search-collapse {
        font-size: 11px;
        width: 200px;
    }
}
</style>