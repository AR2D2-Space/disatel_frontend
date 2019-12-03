<template>
  <div class="container-fluid py-0 px-3">
        <div class="row">
            <div class="border-bottom d-none d-md-block">
                <h2 class="text-center"
                    v-text="msg_welcome">
                </h2>
            </div>
            <div class="col-md-6 col-lg-4 bg text-center">
                <h3 class="border text-center p-1" 
                    v-text="msg">
                </h3>
                <div class="card p-2">
                    <form @submit="senData"
                        class="p-1">
                        <div class=" form-group mb-2 wrapper" 
                            v-for="(input, key) in inputs" 
                            :key="key">
                            <label :for="input.label"
                                v-text="input.label"
                                class="mb-0">
                            </label>
                            <input :class="input.visual" 
                                class="text-center mb-1"
                                :type="input.type" 
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
                            <small v-if="input.error"
                                v-text="input.msg_err"
                                id="helpId" 
                                class="form-text">
                            </small>
                        </div>
                        <div class="col-sm-12">
                            <button type="submit" 
                                class="btn btn-block">
                                Ingresar
                            </button>
                        </div>
                    </form>
                    <section class="card-register">
                        <h6>
                            Ya tienes cuenta?
                        </h6>
                        <router-link to="{ name: 'Login' }"
                            class="text-center">
                            Inicia Sesion
                        </router-link>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'Register',
    data () {
        return {
            msg_welcome: 'Bienvenido a Disatel',
            msg: 'Registrate',
            inputs: [
                { type: 'text', label: 'Nombre', visual: 'input', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Apellido', visual: 'input', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'DPI', visual: 'input', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'text', label: 'Usuario', visual: 'input', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'email', label: 'Correo', visual: 'input', value: '', 
                    autocomplete: 'off', error: false, msg_err: '' },
                { type: 'password', label: 'Contraseña', visual: 'input',   
                value: '', autocomplete: 'off', error: false, msg_err: '' }
            ],
            status: ''
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
        senData(event) {
            event.preventDefault();

            const path = 'api/profiles/';

            if (this.form.length !== 6) {
                for (let idx in this.inputs) {
                    this.inputs[idx].msg_err = 'Ingresa valores, por favor.';
                    this.inputs[idx].error = true;
                }
            } else {
                    axios.post(this.url + path, {
                        first_name: this.form[0],
                        last_name: this.form[1],
                        dpi: this.form[2],
                        username: this.form[3],
                        email: this.form[4],
                        password: this.form[5]
                    })
                    .then((r) => {
                        window.location.href = '/';
                    })
                    .catch((err) => {
                        this.status = err.response.status;
                    }
                );
            }

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
    width: 100vw;
    height: 90vh;
    background-image: linear-gradient(to bottom, rgba(236, 223, 223, 0.856) 80%,rgba(236, 223, 223, 0.856) 80%), url("/static/img/register.jpg");
}
.bg {
    height: 90vh;
    background: url(/static/img/register.jpg) 0px 10px/ 135% 120%;
}
.border-bottom h2 {
    margin: 30px;
    padding: 5px;
}
.border {
    height: auto;
    margin: 10px;
    display: block;
    border-radius: 4px;
    background-color: transparent;
    color:  #42b983;
    box-shadow: 0 2px 2px rgba(15, 6, 6, 0.12), 0 1px 1px rgba(12, 3, 3, 0.24);
}
h2, h3 {
  font-weight: normal;
}
.card {
    display: inline-block;
    background:rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 35px rgba(15, 6, 6, 0.12), 0 2px 20px rgba(12, 3, 3, 0.24);
}
.wrapper {
    max-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
label {
    display: inline;
    width: 100%;
    pointer-events: none;
    transition: transform 0.3s;
    
}
.input {
    width: 80%;
    max-width: 200px;
    height: 2em;
    outline: none;
    background: none;
    color: black;
    border: none;
    padding: 4.5px;
    transition: 0.2s;
    border-bottom: 2px solid  #69d6a5;
    border-width: thin;
}
.input:focus {
    width: 200%;
    border-bottom: 2px solid  #66eeb1;
    border-radius: 16px;
}
.input:valid {
    width: 200%;
}
.btn {
    padding: 5px auto;
    background-color: #17a2b8;
    color: aliceblue;
    transition: 0.3s;
    cursor: pointer;
}
.btn:focus {
    background:#38d39f;
    color: rgb(41, 13, 13);
}
p {
    display:inline;
    text-align: left;
    color: #42b983;
    text-decoration: none;
    transition: 0.3s;
}
a {
    display: block;
    text-align: right;
    color: #42b983;
    text-decoration: none;
    transition: 0.3s;
}
a:hover {
    color: #38d39f;
}
small, pre {
    color: red;
}
@media (max-width: 1024px) {
    .bg {
        background: url(/static/img/register.jpg) 0px 85px/ 142% 105%;
    }
}
@media (max-width: 863.98px) {
    h2 {
        margin: 30px 40px 10px 0px;
        padding:  20px 10px 5px 5px;
    }
}
@media (max-width: 768.98px) { 
    .bg {
        background: url(/static/img/register.jpg) -60px -2px/ 130% 100%;
    } 
 }

 @media (max-width: 375.98px) { 
    .bg {
        height: 90vh;
        background: url(/static/img/register.jpg) -55px 0px/ 130% 100%;
    } 
 }
 @media (min-width: 769px) {
    .form-row {
        height: 225px;
    }
 }
</style>
