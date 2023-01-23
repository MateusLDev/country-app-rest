<template>
  <v-container fluid>
    <div class="back-button ml-5" @click="goBack()">
      <v-icon>mdi-arrow-left-thin</v-icon>
      <span class="back-button--text ml-1">Back</span>
    </div>

    <div class="country-card-detail ml-2">
      <v-col cols="12" xs="12" md="4" lg="4" xl="4">
        <img
          class="country-card-detail--image"
          :src="country.flags.png"
          alt=""
        />
      </v-col>

      <v-col cols="12" xs="12" md="8" lg="8" xl="8">
        <h1 class="country-card-detail--title">{{ country.name.common }}</h1>

        <div class="d-flex mb-3">
          <v-col cols="12" xs="12" md="6" lg="6" xl="6">
            <div class="country-datail">
              <div class="contry-datail--item">
                <span>Native Name:</span>
                <p>{{ country.name.official }}</p>
              </div>

              <div class="contry-datail--item">
                <span>Population:</span>
                <p>{{ formatNumber(country.population) }}</p>
              </div>

              <div class="contry-datail--item">
                <span>Region:</span>
                <p>{{ country.region }}</p>
              </div>

              <div class="contry-datail--item">
                <span>Sub Region:</span>
                <p>{{ validateData(country.subregion) }}</p>
              </div>

              <div class="contry-datail--item" v-if="country.capital">
                <span>Capital:</span>
                <p>{{ joinThis(country.capital) }}</p>
              </div>
            </div>
          </v-col>

          <v-col cols="12" xs="12" md="6" lg="6" xl="6">
            <div class="country-datail">
              <div class="contry-datail--item">
                <span>Top Level Domain:</span>
                <p>{{ joinThis(country.tld) }}</p>
              </div>

              <div class="contry-datail--item">
                <span>Currencies:</span>
                <p>{{ getCountryCurrencies(country.currencies) }}</p>
              </div>

              <div class="contry-datail--item">
                <span>Languages:</span>
                <p>{{ getCountryLanguages(country.languages) }}</p>
              </div>
            </div>
          </v-col>
        </div>

        <div class="contry-datail--item ml-3">
          <span>Borders Countries:</span>
          <template v-if="country.borders !== undefined">
            <p
              class="contry-datail--borders"
              v-for="borderCountrie in borderCountries"
              :key="borderCountrie.id"
            >
              {{ borderCountrie }}
            </p>
            <v-tooltip top v-if="restBorderCountries.length > 0">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"
                  >+ {{ restBorderCountries.length }}</span
                >
              </template>
              <span
                v-for="restBorderCountrie in restBorderCountries"
                class="contry-datail--rest-borders"
                :key="restBorderCountrie.id"
                >{{ restBorderCountrie }}</span
              >
            </v-tooltip>
          </template>
          <template v-else>
            <p class="contry-datail--item">This country has no borders</p>
          </template>
        </div>
      </v-col>
    </div>

    <div class="same-region-countries mt-12">
      <h3 class="same-region-countries--title mb-6">
        Countries in same region
      </h3>

      <div class="same-region-countries--card-wrapper">
        <template v-for="item in countriesInSameRegion">
          <CountryCard :country="item" :key="item.id" />
        </template>
      </div>
      <v-btn
        class="same-region-countries--card-wrapper see-more"
        block
        @click="seeMoreCountries"
        >List more countries</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import { endpoint } from '../utils/endpoint';

import { countriesList } from '../utils/countries';

import CountryCard from '../components/CountryCard.vue';

export default {
  data() {
    return {
      endpoint,
      countriesList,

      countriesCount: 12,
      country: {},
      countriesInSameRegionStorage: [],
      countriesInSameRegion: [],
      borderCountries: [],
      restBorderCountries: [],
    };
  },
  components: {
    CountryCard,
  },
  props: {
    countryName: {
      type: String,
    },
  },
  async created() {
    const response = await axios.get(
      this.endpoint.country.filterByName + `/${this.countryName}`
    );
    this.country = response.data[0];

    const favicon = document.getElementById('favicon');
    document.title = `Country app - ${this.country.name.common}`;
    favicon.href = this.country.coatOfArms.svg;

    this.getCountryBorder();
    this.getCountriesInSameRegion();
  },

  methods: {
    validateData(data) {
      if (data === undefined || data.length === 0) return '---';
      return data;
    },

    joinThis(valueToSplit) {
      if (valueToSplit === undefined) return '--';
      if (valueToSplit.length === 1) return valueToSplit[0];
      return valueToSplit.join(', ');
    },

    formatNumber(number) {
      return Intl.NumberFormat('en-IN').format(number);
    },

    getCountryBorder() {
      let borderCountries = [];
      if (this.country.borders === undefined) return;
      this.country.borders.map((countryISO) => {
        borderCountries.push(
          this.countriesList.find((item) => item.alpha3Code === countryISO)
            .englishShortName
        );
      });

      if (borderCountries.length > 4) {
        this.borderCountries = [...borderCountries.splice(0, 4)];
        this.restBorderCountries = [
          ...borderCountries.splice(0, borderCountries.length),
        ];
      } else {
        this.borderCountries = borderCountries;
      }
    },

    getCountryLanguages(countryLanguages) {
      if (countryLanguages === undefined) return '--';
      if (countryLanguages.length === 0) return '--';
      const languages = Object.values(countryLanguages);
      return this.joinThis(languages);
    },

    getCountryCurrencies(countryCurrencies) {
      if (countryCurrencies === undefined) return '--';
      if (countryCurrencies.length === 0) return '--';
      const currencies = Object.values(countryCurrencies).map(
        (currency) => currency.name
      );
      return this.joinThis(currencies);
    },

    async getCountriesInSameRegion() {
      try {
        const { data } = await axios.get(
          this.endpoint.country.filterByRegion + `/${this.country.region}`
        );
        this.countriesInSameRegionStorage = data;
        this.countriesInSameRegion = [
          ...this.countriesInSameRegionStorage.splice(0, 12),
        ];
      } catch (error) {
        console.log('error', error);
      }
    },

    seeMoreCountries() {
      this.countriesCount + 12;

      if (this.countriesCount >= this.countriesInSameRegionStorage.length) {
        this.countriesInSameRegion = [
          ...this.countriesInSameRegion,
          ...this.countriesInSameRegionStorage.splice(
            this.countriesInSameRegion,
            this.countriesInSameRegionStorage.length
          ),
        ];
      } else {
        this.countriesInSameRegion = [
          ...this.countriesInSameRegion,
          ...this.countriesInSameRegionStorage.splice(
            this.countriesInSameRegion,
            this.countriesCount
          ),
        ];
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  display: flex;
  align-items: center;

  background-color: #ffffff;
  border-radius: 8px;

  margin: 40px 0 50px 0;
  padding: 4px 30px 4px 20px;
  width: fit-content;

  cursor: pointer;

  -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #faf8f8;
  }

  &--text {
    font-size: 14px;
    font-weight: 300;
    color: #111517;
  }
}

.country-card-detail {
  display: flex;
  justify-content: space-around;
  align-items: center;

  &--image {
    width: 100%;

    -webkit-box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.1);
  }

  &--title {
    margin-left: 8px;
    color: #111517;
  }
}

.contry-datail {
  &--item {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 4px;

    span {
      font-weight: 600;
      margin-right: 6px;
      color: #111517;
    }

    p {
      margin-bottom: 0;
      color: #111517;
    }
  }

  &--borders {
    background-color: #ffffff;
    border-radius: 4px;

    padding: 4px 30px;
    margin-right: 8px;

    -webkit-box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.1);
  }

  &--rest-borders {
    display: flex;
    flex-direction: column;
  }
}

.same-region-countries {
  &--title {
    color: #111517;
    margin-left: 20px;
  }

  &--card-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    &.see-more {
      text-align: center;
      text-transform: none;
    }
  }
}
</style>
