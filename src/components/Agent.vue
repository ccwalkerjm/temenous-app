<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$emit('toggle-menu', false)" modifier="material">
          <v-ons-icon icon="md-menu" size="1x"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Agent</div>
    </v-ons-toolbar>
 
  </v-ons-page>
</template>

<script>
export default {
  name: "Agent"
};
</script>

<style scoped>
</style>
