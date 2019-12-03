<template>
    <div>
        <edit-fleet :MessageFleetEdit="MessageEdit"
            :path="path">
        </edit-fleet>
    </div>
</template>

<script>
import Edit from '@/components/reusable/Edit'

export default {
    name: 'EditFleet',
    components: {
        'edit-fleet': Edit
    },
    data() {
        return {
            MessageEdit: 'Edita la Flota',
            path: 'api/fleet-detail'
        }
    }
}
</script>
