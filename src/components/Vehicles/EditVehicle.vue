<template>
    <div>
        <edit-vehicle :MessageVehicleEdit="MessageEdit"
            :path="path">
        </edit-vehicle>
    </div>
</template>

<script>
import Edit from '@/components/reusable/Edit'

export default {
    name: 'EditVehicle',
    components: {
        'edit-vehicle': Edit
    },
    data() {
        return {
            MessageEdit: 'Edita el Vehiculo',
            path: 'api/vehicle-detail'
        }
    }
}
</script>