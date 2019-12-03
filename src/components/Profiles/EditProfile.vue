<template>
    <div>
        <edit-profile :MessageProfileEdit="MessageEdit"
            :path="path">
        </edit-profile>
    </div>
</template>

<script>
import Edit from '@/components/reusable/Edit'

export default {
    name: 'EditProfile',
    components: {
        'edit-profile': Edit
    },
    data() {
        return {
            MessageEdit: 'Edita el Perfil',
            path: 'api/profiles'
        }
    }
}
</script>