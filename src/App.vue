<template>
  <v-app>
    <v-app-bar app color="hsl(0, 0%, 100%)" class="country-app-bar">
      <v-container fluid class="d-flex align-center">
        <div>
          <p class="app-title">Where in the world?</p>
        </div>

        <v-spacer></v-spacer>

        <v-btn class="button-switch-theme" text>
          <v-icon size="18" color="#111517">mdi-weather-night</v-icon>
          <span class="button-switch-theme--text ml-2">Dark Mode</span>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="app-body">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
* {
  font-family: 'Nunito Sans', sans-serif;
}

.country-app-bar {
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1) !important;
  -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1) !important;
}

.app-body {
  background-color: #fafafa;
}

.app-title {
  color: #111517;
  font-size: 18px;
  font-weight: 800;

  margin-bottom: 0 !important;
}

.button-switch-theme {
  &--text {
    color: #111517;
    font-size: 14px !important;
    font-weight: 600;
    text-transform: initial;
  }
}
</style>
