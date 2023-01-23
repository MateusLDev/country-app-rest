<template>
  <v-container fluid>
    <div class="d-flex align-center justify-space-between py-9">
      <CountrySearch @search="getCountryBySearch" />
      <CountryFilterByRegion @region="getCountryByRegion" />
    </div>

    <div class="countries-wrap mt-3">
      <template v-for="item in countries">
        <CountryCard :country="item" :key="item.id" />
      </template>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import { endpoint } from '../utils/endpoint';

import CountrySearch from '../components/CountrySearch.vue';
import CountryFilterByRegion from '../components/CountyFilterByRegion.vue';
import CountryCard from '../components/CountryCard.vue';

export default {
  name: 'HomeView',

  data() {
    return {
      endpoint,
      countries: [],
    };
  },

  components: {
    CountryFilterByRegion,
    CountrySearch,
    CountryCard,
  },

  async created() {
    const response = await axios.get(this.endpoint.country.all);
    this.countries = response.data;
  },

  methods: {
    async getCountryByRegion(region) {
      const response = await axios.get(
        this.endpoint.country.filterByRegion + `/${region}`
      );
      this.countries = response.data;
    },

    async getCountryBySearch(search) {
      const response = await axios.get(
        this.endpoint.country.filterByName + `/${search}`
      );
      this.countries = response.data;
    },
  },
};
</script>

<style lang="scss">
.countries-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
