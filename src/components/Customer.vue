<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$emit('toggle-menu', false)" modifier="material">
          <v-ons-icon icon="md-menu" size="1x"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Customer</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-header>Amount</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Amount" float v-model="input.amount"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <select v-model="input.vendor" class="select-input select-input--material">
            <option
              v-for="item in vendorOptions"
              :key="'vendor'+item.value"
              :value="item.value"
            >{{item.name}}</option>
          </select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-button @click="initTransaction">Init Transaction</v-ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-bottom-toolbar></v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
export default {
  name: "Customer",
  data() {
    return {
      input: {
        amount: 0,
        vendor: null,
        vendors: []
      }
    };
  },
  computed: {
    vendorOptions() {
      const options = this.vendors.map(x => ({
        value: x.id,
        text: x.name
      }));
      options.unshift({
        value: null,
        text: "Select Vendor"
      });
      return options;
    }
  },
  async mounted() {
    try {
      ({
        data: { listVendors: this.vendors }
      } = await this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(queries.listVendors)
      ));
      console.log("vendors", this.vendors);
    } catch (err) {
      console.log("err", err);
    } finally {
      console.log("finally");
    }
  },
  methods: {
    async initTransaction() {
      try {
        const {
          data: { initTransaction }
        } = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(mutations.initTransaction, {
            ...this.input
          })
        );
        console.log("initTransaction", initTransaction);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
</style>
