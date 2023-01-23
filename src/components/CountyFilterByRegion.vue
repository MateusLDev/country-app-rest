<template>
  <div>
    <button
      class="regions-filter--button mr-5"
      @click="showOptions = !showOptions"
    >
      <span>{{ regionButtonText }}</span>
      <v-icon color="#111517" size="18">mdi-chevron-down</v-icon>
    </button>

    <div class="regions-filter--items" v-if="showOptions">
      <div
        class="regions-filter--item"
        :class="{ 'regions-filter--item--active': regionSelected === item }"
        v-for="item in regions"
        :key="item.id"
        @click="setRegionSelected(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
      regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      regionSelected: '',
    };
  },

  methods: {
    setRegionSelected(region) {
      this.regionSelected = region;
      this.showOptions = false;
      this.$emit('region', this.regionSelected);
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
.regions-filter {
  &--button {
    display: flex;
    justify-content: space-between;

    -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

    background-color: #ffffff;
    border-radius: 4px;

    text-align: start;

    width: 150px;
    padding: 10px 8px 10px 12px;

    span {
      color: #111517;
      font-size: 12px;
      font-weight: 600;
    }
  }

  &--items {
    background-color: #ffffff;
    border-radius: 4px;

    position: absolute;
    width: 150px;
    margin-top: 4px;

    -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  }

  &--item {
    cursor: pointer;
    color: #111517;
    font-size: 12px;
    font-weight: 600;

    padding: 6px 12px;

    &--active {
      background-color: #f7dddd;
    }
  }
}
</style>
