//Not in use.
const fetch = require("node-fetch");
async function fetchCityEnglish(start) {
  try {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $regex: "^" + start + "+.*",
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Israelcities_City?limit=2&order=name&keys=name,cityId&where=${where}`,
      {
        headers: {
          "X-Parse-Application-Id": process.env.REACT_APP_XParseApplicationId, // This is your app's application id
          "X-Parse-REST-API-Key": process.env.REACT_APP_XParseMasterKey, // This is your app's REST API key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need
    return data.results.map((city) => {
      return { value: city.name, label: city.name };
    });
  } catch (err) {
    console.log(err);
    return [];
  }
}
