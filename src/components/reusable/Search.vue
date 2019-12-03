<template>
    <div>
        <b-input-group size="sm"
            class="mb-3">
            <b-form-input
                type="search"
                id="filterInput"
                v-model="filter"
                :placeholder="MsgSearch">
            </b-form-input>
            <b-input-group-append>
                <b-button @click="search">
                    Buscar
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Search',
    props: ['Mdpath', 'MsgSearch', 'HrefSearch'],
    data () {
        return {
           filter: ''
        };
    },
    
    computed: {
        ...mapState(['show'])
    },

    methods: {
        ...mapMutations(['SHOW']),
        search() {
            const path = this.Mdpath + `search=${this.filter}`;
            this.$store.dispatch('getItems', path);
            this.SHOW(true);
        }
    },
};
</script>