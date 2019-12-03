<template>
    <div class="container-fluid py-0 px-3 wrapper">
        <div class="row">
            <div class="col-md-6 col-lg-6 d-none d-md-block">
                <img src="static/img/Hello_User.png" 
                    alt="Bienvenido"
                    class="img-fluid"/>
            </div>
            <div class="col-sm-8 col-md-6 col-lg-6">
                <div class="border-bottom">
                    <h2 class="text-center"
                        v-text="msg_welcome">
                    </h2>
                </div>
                <div id="wrapper"
                    class="border py-4 pr-4">
                    <section id="slider" class="d-none d-md-block">
                        <h3 class="text-center"
                            v-text="msg">
                        </h3>
                        <section class="card-register">
                            <h6>
                                No tienes una cuenta aun?
                            </h6>
                            <router-link to="{ name: 'Register' }"
                                class="text-center">
                                Registrate
                            </router-link>
                        </section>
                    </section>
                    <div class="card p-2">  
                        <div class="card-body p-0">
                            <form @submit="senData">
                                <div class="form-group text-center mb-2"
                                    v-for="(input, key) in inputs" 
                                        :key="key">
                                    <div class="col-form-label-sm ">
                                        <label :for="input.label"
                                            class="mb-0"
                                            v-text="input.label">
                                        </label>
                                    </div>
                                    <input :type="input.type"
                                        :class="input.visual"
                                        class="text-center mb-1"
                                        @blur="valiData(input, key)"
                                        @keyup="valiData(input, key)"
                                        @keyup.enter="valiData(input, key)"
                                        @keyup.esc="cleanData(input)"
                                        v-model="input.value" 
                                        :name="input.label" 
                                        :id="input.label"
                                        :placeholder="input.placeholder"
                                        :autocomplete="input.autocomplete"
                                        :required="inputs.required"
                                        aria-describedby="helpId"/>
                                    <small v-if="input.error"
                                        v-text="input.msg_err"
                                        id="helpId" 
                                        class="form-text">
                                    </small>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <pre v-if="this.status === 400 || this.status === 401">Credenciales incorrectas.</pre>
                                        <button type="submit" 
                                            class="btn btn-block">
                                            Ingresar
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-12 py-1 px-1 miss_pass">
                                    <small class="form-text m-0">
                                        <router-link to="{ name: '' }">
                                            Olvidaste tu contraseña?
                                        </router-link>
                                    </small>
                                </div>
                            </form>
                        </div>
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
    name: 'Login',
    data () {
        return {
            msg_welcome: 'Bienvenido a Disatel',
            msg: 'Inicia Sesion',
            inputs: [
                { type: 'text', 
                    value: '', 
                    visual: 'input',
                    label: 'Usuario', 
                    autocomplete: 'username',
                    required: 'true',
                    patron: /[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ]{2,25}/,
                    error: false,
                    msg_err: ''
                },
                { type: 'password',
                    value: '', 
                    visual: 'input',
                    label: 'Contraseña',
                    autocomplete: 'current-password',
                    required: 'true',
                    patron: /[a-zA-Z0-9]{8,32}/, 
                    error: false,
                    msg_err: ''
                },
            ],
            status: null
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
            if (_instance.patron.test(_instance.value)
                || _instance.value.trim() !== '' ) {

                _instance.error = false;
                this.form[idx] = _instance.value;

            } else { 
                _instance.msg_err = 'Ingresa valores validos.';
                _instance.error = true;   
            }
        },
        senData(event) {
            event.preventDefault();
            const path = 'api-token-auth/';

            if (this.form.length !== 2) {
                for (let idx in this.inputs) {
                    this.inputs[idx].msg_err = 'Ingresa valores, por favor.';
                    this.inputs[idx].error = true;
                }
            } else {
                axios.post(this.url + path, {
                        username: this.form[0],
                        password: this.form[1]
                    })
                    .then((r) => {
                        localStorage.token = r.data.token;
                        window.location.href = 'home';
                    })
                    .catch((err) => {
                        this.status = err.response.status;
                    }
                );
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
    width: 100vw;
    height: 100vh;
}
.wrapper {
    background-image: linear-gradient(to-right, #96bb31f3, #d6d859f3) !important;
}
.border-bottom h2 {
    margin: 30px 90px 10px 0px;
    padding:  20px 20px 5px 5px;
}
.border {
    background-color: white;
    color:  #42b983;
    box-shadow: 0 4px 10px rgba(15, 6, 6, 0.12), 0 2px 2px rgba(12, 3, 3, 0.24);
}
h2, h3 {
  font-weight: normal;
}
.card {
    background:rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 35px rgba(15, 6, 6, 0.12), 0 2px 20px rgba(12, 3, 3, 0.24);
}
.form-group {
    border-bottom: 2px solid  #69d6a5;
}
.input {
    width: 80%;
    max-width: 200px;
    box-sizing: border-box;
    height: 2em;
    outline: none;
    background: none;
    color: black;
    border: none;
    padding: 0.5rem 0.7rem;
    transition: all 0.2s;
}
.input:focus {
    border-bottom: 2px solid  #66eeb1;
    border-radius: 8px;
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
@media (max-width: 424.98px) {
    #wrapper {
        margin-top: 10px;
        margin-right: 0px;
        margin-bottom: 10px;
        margin-left: 0px;
    }
}
@media (max-width: 767.98px) {
    .border {
        padding-left: 24px;
    }
}
@media (max-width: 962.98px) {
    .card-register h6 {
        font-size: 0.8em;
        padding: 5px 8px 5px 8px;
    }
}
@media (min-width: 962.98px) {
    .card-register h6 {
        padding: 5px 25px 5px 25px;
    }
}
@media (max-width: 863.98px) {
    .border-bottom h2 {
        margin: 30px 40px 10px 0px;
        padding:  20px 10px 5px 5px;
    }
    .miss_pass a {
        font-size: 0.9em;
    }
}
@media (min-width: 767.98px) {
    img {
        padding-top: 80px;
        padding-left: 20px;
    }
    .border {
        max-width: 450px;
        padding-left: 12px;
        display: flex;
        justify-content: center;
    }
    h3 {
        margin-top: 20px;
        padding: 0px 20px;
    }
    .card-register {
        margin: 20px 15px 10px 5px;
    }
    .card-register a {
        background: #42b983;
        color: aliceblue;
        border-radius: 4px;
        padding: 5px;
    }
    .card {
        width: 300px;
    }
}
@media (min-width: 425px) { 
    #wrapper {
        margin-top: 25px;
        margin-right: 20px;
        margin-bottom: 25px;
        margin-left: 20px;
    } 
 }
</style>
