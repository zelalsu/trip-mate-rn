const API_KEY = '230f687d151a4e218d10cc3ac2af2f72';

export const getLocationsFromAPI = (query: string | number | boolean) => {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      query,
    )}&key=${API_KEY}`,
  )
    .then(response => response.json())
    .then(data => {
      if (data && data.results && data.results.length > 0) {
        return data.results.map((item: {formatted: any}) => ({
          label: item.formatted, // Şehir ismi ya da adres
          value: item.formatted, // Koordinatlar
        }));
      } else {
        throw new Error('Konum bulunamadı.');
      }
    })
    .catch(error => {
      console.error('API Hatası:', error);
      throw error;
    });
};
