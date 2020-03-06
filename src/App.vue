<template id="main-page">
  <div>
    <v-ons-splitter>
      <v-ons-splitter-side width="300px" collapse side="left" :open.sync="openSide">
        <v-ons-page>
          <v-ons-card>
            <div style="text-align:right">
              <v-ons-button @click="openSide = false" modifier="light">
                <v-ons-icon icon="md-close"></v-ons-icon>
              </v-ons-button>
            </div>

            <div class="title" style="text-align:center">Temenos Cash Payment</div>

            <div class="content">
              <v-ons-list>
                <v-ons-list-item
                  tappable
                  @click="currentPage = 'Agent'; openSide = false"
                  modifier="chevron"
                >
                  <div class="left">
                    <v-ons-icon style="color:blue" icon="fa-walking"></v-ons-icon>
                  </div>
                  <div class="center">Agent</div>
                </v-ons-list-item>

                <v-ons-list-item
                  tappable
                  @click="currentPage = 'Customer'; openSide = false"
                  modifier="chevron"
                >
                  <div class="left">
                    <v-ons-icon style="color:red" icon="fa-running"></v-ons-icon>
                  </div>
                  <div class="center">Customer</div>
                </v-ons-list-item>
              </v-ons-list>
              <div style="text-align:center; margin-top:20px">
                <p>
                  Developed and Powered by
                  <br />
                  <a href="https://courserv.com" target="_blank">courserv.com</a>
                </p>
              </div>
            </div>
          </v-ons-card>
        </v-ons-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <component
          :is="currentPage"
          @toggle-menu="openSide = !openSide"
          @change-page="currentPage = $event; openSide = false"
        ></component>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </div>
</template>


<script>
import Agent from "./components/Agent.vue";
import Customer from "./components/Customer.vue";

export default {
  name: "app",
  components: {
    Customer,

    Agent
  },
  data() {
    return {
      currentPage: "Customer", //Agent",
      openSide: false
    };
  }
};
</script>

<style>
/* CSS goes here */
</style>
