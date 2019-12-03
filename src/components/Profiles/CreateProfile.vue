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
                { type: 'text', label: 'Apellido', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'DPI', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Usuario', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'email', label: 'Correo', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'password', label: 'Contraseña', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' }
            ],
            path: 'profiles'
        }
    },
}
</script>

<style scoped>

</style>