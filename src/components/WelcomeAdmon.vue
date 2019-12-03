<template>
    <div class="container-fluid">
        <b-row>
            <b-col md="6" sm="12" class="my-1 p-5">
                <section>
                    <h2 v-text="messageWelcome"
                        class="p-2">
                    </h2>
                    <h5 v-text="message"
                        class="px-2">
                    </h5>
                </section>
                <search :Mdpath="Mdpath"
                    :MsgSearch="MsgSearchProf"
                    :HrefSearch="HrefSearchLg">
                </search>
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
                                    <search :Mdpath="MdpathFleets" 
                                        :MsgSearch="MsgSearchMd"
                                        :HrefSearch="HrefSearchMd"
                                        class="search-collapse">
                                    </search>
                                </div>
                                <router-link :to="{ path: `${item.id}/p-edit` }"
                                    exact>
                                    Editar
                                </router-link>
                                <button @click="chao(item, idx)"
                                    class="btn">
                                    Eliminar
                                </button>
                                <router-link :to="{ name: 'ListFleets' }"
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
                <img src="static/svg/detailed_analysis.svg" 
                    alt="Bienvenido"
                    class="img-fluid"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from '@/components/reusable/Search'
import Pagination from '@/components/reusable/Pagination'

export default {
    name: 'WelcomeAdmon',
    components: {
        'search': Search,
        'pagination': Pagination,
    },
    data() {
        return {
            messageWelcome: 'Disatel',
            message: 'Los usuarios actuales son:',
            fields: [
                { label: 'Nombre de Usuario' },
                { label: 'Número de Flotas' },
                { label: 'Número de DPI' },
                { label: 'Último inicio de Sesión' }
            ],
            messageLastLogin: 'No se ha logueado aun',
            Mdpath: 'api/profiles/?',
            MdpathFleets: 'api/fleets/?',
            MsgSearchProf: 'Perfiles',
            MsgSearchMd: 'Flotas',
            HrefSearchLg: 'root',
            HrefSearchMd: 'fleets',
            acceptDelete: '',
            profileId: null
        }
    },
    computed: {
        ...mapState(['items']),
    }, 
    methods: {
        getProfiles() {
            const path = 'api/profiles/';
            this.$store.dispatch('getItems', path);
            
        },
        filterValues() {
            for (let item in this.items) {
                if (this.items[item].last_login == null) {
                    this.items[item].last_login = this.messageLastLogin;
                } else {
                    const last_login = this.items[item].last_login.split('T');
                    const date = last_login[0];
                    const hour = last_login[1].split('.')[0];
                    this.items[item].last_login = `${hour}, ${date}`;
                }
            }
            console.log(this.items);
        },
        chao(profile, idx) {
            this.profileId = profile.id;
            const path = `api/profiles/${this.profileId}/`;
            
            this.acceptDelete = '';
            this.$bvModal.msgBoxConfirm('Estas seguro de eliminar este perfil?', {
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
        this.getProfiles();
        // this.filterValues();
    },
}
</script>

<style scoped>

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
}
li.table-header div.col {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    display:inline-block;
    padding: 0px 10px;
    width:22%;
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
    flex: 0 0 25%;
    max-width: 25%;
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
  height: 100%;
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
      padding: 10px 30px;
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
        height:245px;
    }
    li.table-row div.wrapper-search {
        height: 20%;
    }
    li.table-row div.search-collapse {
        font-size: 11px;
        width: 200px;
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
    li.table-row div.search-collapse {
        font-size: 11px;
        width: 200px;
    }
}
</style>