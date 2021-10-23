const fetch = require("node-fetch");
async function fetchCities() {
  try {
    const response = await fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500"
    ).catch((e) => {
      return [];
    });
    const data = await response.json();
    let results = [];
    data.result.records.forEach((element) => {
      let city = element["שם_ישוב"].trim();
      if (city.substring(city.length - 6, city.length) == " )שבט(") {
        city = city.substring(0, city.length - 6);
      } else if (city.substring(city.length - 8, city.length) == " )יישוב(") {
        city = city.substring(0, city.length - 8);
      }
      results.push({ value: city, label: city });
    });
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
}
module.exports.fetchCities = fetchCities;
