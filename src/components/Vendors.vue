<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$emit('toggle-menu', false)" modifier="material">
          <v-ons-icon icon="md-menu" size="1x"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Vendors</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-item v-for="item in vendors" :key="'vendorId'+item.id" :value="item.id">
        <div class="center">{{item.name}}</div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-bottom-toolbar></v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import * as queries from "@/graphql/queries";

export default {
  name: "Vendors",
  data() {
    return {
      vendors: []
    };
  },

  async mounted() {
    try {
      const { data } = await this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(queries.listVendors)
      );
      console.log("vendors data", data);
      this.vendors = data.listVendors;
      console.log("vendors", this.vendors);
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
