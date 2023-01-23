<template>
  <div class="country-card" @click="goToDetail(country.name.common)">
    <img class="country-card--image" :src="country.flags.png" alt="" />
    <div class="country-card-body">
      <p class="country-card--name">{{ country.name.common }}</p>

      <div class="contry-data">
        <div class="contry-data--item">
          <span>Population:</span>
          <p>{{ country.population }}</p>
        </div>

        <div class="contry-data--item">
          <span>Region:</span>
          <p>{{ country.region }}</p>
        </div>

        <div class="contry-data--item">
          <span>Capital:</span>
          <p v-for="item in country.capital" :key="item.id">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    country: Object,
  },
  methods: {
    goToDetail(countryName) {
      this.$router.push({
        name: 'CountyDetails',
        params: { countryName: countryName },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.country-card {
  border-radius: 8px;
  width: 250px;
  margin: 0 20px 75px 20px;

  cursor: pointer;

  -webkit-box-shadow: 0px 0px 43px -22px rgba(0, 0, 0, 0.54);
  -moz-box-shadow: 0px 0px 43px -22px rgba(0, 0, 0, 0.54);
  box-shadow: 0px 0px 43px -22px rgba(0, 0, 0, 0.54);

  &-body {
    padding: 12px 20px 16px 20px;
  }

  &--image {
    object-fit: cover;
    height: 150px;
    width: 250px;
  }

  &--name {
    font-size: 16px;
    font-weight: 800;
  }

  .contry-data {
    &--item {
      display: flex;
      font-size: 12px;

      span {
        font-weight: 800;
      }

      p {
        margin-left: 4px;
        margin-bottom: 3px;
      }
    }
  }
}
</style>
