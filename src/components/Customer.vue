<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$emit('toggle-menu', false)" modifier="material">
          <v-ons-icon icon="md-menu" size="1x"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Cash Payment</div>
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
          <select v-model="input.vendorId" class="select-input select-input--material">
            <option
              v-for="item in vendorOptions"
              :key="'vendorId'+item.value"
              :value="item.value"
              :disabled="item.value===null"
            >{{item.text}}</option>
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
      vendors: [],
      input: {
        amount: 0.00,
        vendorId: null
      }
    };
  },
  computed: {
    vendorOptions() {
      const options = (this.vendors || []).map(x => ({
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
  methods: {
    async initTransaction() {
      try {
        const input = this.input;
        input.amount = parseFloat(input.amount);
        console.log("initTransaction input", input);
        const {
          data: { initTransaction }
        } = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(mutations.initTransaction, {
            input
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
