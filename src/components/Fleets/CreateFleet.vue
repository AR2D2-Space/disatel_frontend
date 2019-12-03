<template>
    <div >
        <create :fields="inputs"
            :path="path">
        </create>
    </div>
</template>

<script>
import axios from 'axios'

import Create from '@/components/reusable/Create'

export default {
    name: 'CreateVehicle',
    components: {
        'create': Create
    },
    data() {
        return{
            inputs: [
                { type: 'text', label: 'Nombre', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Identificador', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'select', label: 'País', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'select', label: 'Tipo', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' }
            ],
            path: 'fleets'
        }
    },
}
</script>

<style scoped>

</style>