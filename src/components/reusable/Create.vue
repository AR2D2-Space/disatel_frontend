<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div v-for="(input, key) in fields" 
                                    :key="key"
                                    v-show="key < 3"
                                    :v-text="key"
                                    class="form-group col-md-6">
                                    <label :for="input.label"
                                        v-text="input.label"
                                        class="col-sm-6 col-form-label">
                                    </label>
                                    <div class="col-sm-12">
                                        <input :type="input.type"
                                            class="form-control" 
                                            @blur="valiData(input, key)"
                                            @keyup="valiData(input, key)"
                                            @keyup.enter="valiData(input, key)"
                                            @keyup.esc="cleanData(input)"
                                            v-model="input.value" 
                                            :name="input.label" 
                                            :id="input.label"
                                            :placeholder="input.placeholder" 
                                            :autocomplete="input.autocomplete"
                                            aria-describedby="helpId"/>
                                        <small id="helpId" class="text-muted">Help text</small>
                                    </div>
                                </div>
                            </div>
                            <div class="rows">
                                <div class="col text-left">
                                    <button @click="createItem" 
                                        class="btn btn-outline-primary btn-block">
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'CreateItem',
    props: ['fields', 'MiddlePath'],
    data() {
        return{
        }
    },
    computed: {
        ...mapState(['form', 'url'])
    },
    methods: {
        cleanData(_instance) {
            _instance.msg_err = 'Ingresa valores validos.';
            _instance.error = true;
            _instance.value = '';
        },
        valiData(_instance, idx) {
            if ( _instance.value.trim() !== '' ) {

                _instance.error = false;
                this.form[idx] = _instance.value;

            } else { 
                _instance.msg_err = 'Ingresa valores validos.';
                _instance.error = true;   
            }
        },
        createItem() {
            const path = `${this.url}/api/${this.MiddlePath}/`;

            axios.post(path)
            .then((r) => {
                console.log(r);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>

<style scoped>
.container {
    padding: 15px;
    background: url('/static/img/SF_down.png') 0px 0px/ 100% 100%;
}
.card {
    background-color: transparent;
    box-shadow: 0 4px 35px rgba(15, 6, 6, 0.12), 0 2px 20px rgba(12, 3, 3, 0.24);
}
label {
    font-size: 14px;
    color: aliceblue;
    background: linear-gradient(180deg, black, transparent);
    text-transform: uppercase;
}
@media screen and (max-width: 991.98px) and (min-width: 768px) {
    .container {
        background: url(/static/img/SF_down.png) -150px 0px/ 165% 100%;
    }
}
@media screen and (max-width: 767.98px) {
    .form-control {
        height: 30px;
    }
}
/* @media screen and (max-width: 767.98px) and (min-width: 320px) {
    .container {
        background: url(/static/img/SF_down.png) 950px -140px/300% 115%;
    }
} */
</style>