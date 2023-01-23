<template>
  <div class="country-search-input ml-5">
    <v-icon color="#111517" size="16">mdi-magnify</v-icon>
    <input
      type="text"
      placeholder="Search for a country..."
      v-model="search"
      @change="findCountryByName"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    };
  },

  methods: {
    findCountryByName() {
      this.$emit('search', this.search);
    },
  },

  computed: {
    regionButtonText() {
      return this.regionSelected !== ''
        ? this.regionSelected
        : 'Filter by Region';
    },
  },
};
</script>

<style lang="scss" scoped>
.country-search-input {
  // display: flex;
  // justify-content: space-between;

  -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

  background-color: #ffffff;
  border-radius: 4px;

  text-align: start;

  width: 350px;
  padding: 10px 16px;

  input {
    outline: none;
    color: #111517;
    font-size: 12px;
    font-weight: 600;

    margin-left: 16px;
  }
}
</style>
