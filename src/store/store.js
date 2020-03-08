import Vue from "vue";
import Vuex from "vuex";
//import * as mutations from "@/graphql/mutations";

Vue.use(Vuex);

const customer = {
  id: "18767922716",
  name: "Courtne Walker",
  phone: "18767922716",
};

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    username: state => state.user.id
  },
  mutations: {
    setUser(state, user) {
      console.log("mutation: user", user);
      state.user = user;
    }
  },
  actions: {
    login(context, phone) {
      /* this.$Amplify.graphqlOperation(mutations.login, {
        phone
      }).then((data) => {
        context.commit("setUser", data.login);
      }); */
      if(phone === customer.phone)  context.commit("setUser", customer);
    },

    register(context, data) {
      console.log("data", data);
      /* this.$Amplify.graphqlOperation(mutations.registerCustomer, {
        name: data.name, phone: data.phone
      }).then((data) => {
        context.commit("setUser", data.registerCustomer);
      }); */
      context.commit("setUser", customer);
    }
  }


});
