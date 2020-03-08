<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$emit('toggle-menu', false)" modifier="material">
          <v-ons-icon icon="md-menu" size="1x"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Transactions</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-item v-for="item in transactions" :key="'vendorId'+item.id" :value="item.id">
        <div class="center">
          <span class="list-item__title">{{item.amount}}</span>
          <span
            class="list-item__subtitle"
          >VendorId: {{item.vendorId }} Time Stamp:{{item.timeStarted }}</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-bottom-toolbar></v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import * as queries from "@/graphql/queries";

export default {
  name: "Transactions",
  data() {
    return {
      transactions: [],
      vendors: []
    };
  },

  async mounted() {
    try {
      const _vue = this;
      {
        const { data } = await _vue.$Amplify.API.graphql(
          _vue.$Amplify.graphqlOperation(queries.listVendors)
        );
        _vue.vendors = data.listVendors;
        console.log("vendors", _vue.vendors);
      }
      {
        const { data } = await _vue.$Amplify.API.graphql(
          _vue.$Amplify.graphqlOperation(queries.listTransactions)
        );
        console.log("transactions data", data);
        _vue.transactions = data.listTransactions;
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      console.log("finally");
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
