import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    url: 'https://disatel-back.herokuapp.com/',
    form: [],
    token: localStorage.token || null,
    objUser: '',
    fields: null,
    status: null,
    items: null,
    totalItems: null,
    itemsPerPage: 6,
    previousPage: null,
    nextPage: null,
    show: false,
  },
  mutations: {
    SHOW(state, payload) {
      state.show = payload;
    }
  },
  getters: {
    parseJwt(state) {
      let base64Url = state.token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return state.obj_user = JSON.parse(window.atob(base64));
    },
    loggedIn(state) {
      return state.token !== null;
    }
  },
  actions: {
    destroyToken(context) {
      if (context.getters.loggedIn) {
        localStorage.token = '';
      }
    },
    async getItems(context, path) {
      await axios.get(context.state.url + path, {
        headers: {
          Authorization: 'JWT ' + context.state.token
        }
      })
      .then((r) => {
        context.state.items = r.data.results;
        context.state.totalItems = r.data.count;
        context.state.previousPage = r.data.previous;
        context.state.nextPage = r.data.next;
      })
      .catch((err) => {
        context.state.status = err.response.status;
      });
    },
    async getItem(context, path) {
      await axios.get(context.state.url + path, {
          headers: {
            Authorization: 'JWT ' + context.state.token
          }
        })
      .then((r) => {
        context.state.fields = r.data;
      })
      .catch((err) => {
        context.state.status = err.response.status;
      });
    },
    deleteItem(context, path) {
      axios.delete(context.state.url + path, {
          headers: {
            Authorization  : 'JWT ' + context.state.token
          }
      })
      .then((r) => {
          console.log('eliminado!!!');
      })
      .catch((err) => {
          console.log('No fue posible eliminar.')
      });
    },
    editItem(context, path) {
      console.log(context.state.fields, 'esto se enviara')
      axios.put(context.state.url + path, 
        context.state.fields, {
          headers: {
            Authorization: 'JWT ' + context.state.token
          }
        })
      .then((r) => {
        console.log("Editado exitosamente!!!")
      })
      .catch((err) => {
        console.log('No fue posible editar.')
      });
    }
  }
});