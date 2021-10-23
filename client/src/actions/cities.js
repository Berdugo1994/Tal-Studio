import { getCities } from "../services/cities.service";
export const fetchCities = () => (dispatch) => {
  return getCities()
    .then((result) => {
      return Promise.resolve(result.data);
    })
    .catch((err) => {
      return [];
    });
};
