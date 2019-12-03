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
                { type: 'text', label: 'Identificador', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Tipo', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Marca', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Modelo', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'email', label: 'Color', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'password', label: 'Placa', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' }
            ],
            path: 'vehicles'
        }
    },
}
</script>

<style scoped>

</style>