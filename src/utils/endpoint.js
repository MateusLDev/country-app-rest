const baseUrl = 'https://restcountries.com/v3.1/';

const endpoint = {
  country: {
    all: `${baseUrl}/all`,
    filterByName: `${baseUrl}/name`,
    filterByRegion: `${baseUrl}/region`,
  },
};

export { endpoint };
