<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Sign In</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="phone" float v-model="phone"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="name" float v-model="name"></v-ons-input>
        </div>
      </v-ons-list-item>

      <v-ons-list-item>
        <div class="center">
          <v-ons-row>
            <v-ons-col>
              <v-ons-button modifier="large" @click="register">Register</v-ons-button>
            </v-ons-col>
            <v-ons-col>
              <v-ons-button modifier="large" @click="login">Login</v-ons-button>
            </v-ons-col>
          </v-ons-row>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: "Authenticator",
  data() {
    return {
      name: null,
      phone: null
    };
  },

  methods: {
    async register() {
      try {
        this.$store.dispatch("register", {
          phone: this.phone,
          name: this.name
        });
      } catch (err) {
        console.log(err);
      }
    },
    async login() {
      try {
        this.$store.dispatch("login", this.phone);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
</style>
