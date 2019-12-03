<template>
    <div>
        <list-fleets :MessageFleets="messageWelcome"></list-fleets>
    </div>
</template>

<script>
import ListFleets from '@/components/Fleets/ListFleets'

import { mapState } from 'vuex'

export default {
    name: 'Welcome',
    components: {
        'list-fleets': ListFleets
    },
    data() {
        return {
            messageWelcome: 'Hola, Bienvenido a Disatel',
        }
    },
}
</script>
