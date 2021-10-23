//Not in use.
const fetch = require("node-fetch");
async function fetchCityHebrew(start) {
  try {
    const response = await fetch(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=351d4347-8ee0-4906-8e5b-9533aef13595&q=` +
        start +
        ".*" +
        "&limit=5"
    );
    const data = await response.json(); // Here you have the data that you need
    let results = [];
    data.result.records.forEach((element) => {
      if (element["תעתיק"] && element["תעתיק"].length > 0) {
        results.push({
          value: element["שם יישוב"],
          label: element["שם יישוב"],
        });
      }
    });
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
}
