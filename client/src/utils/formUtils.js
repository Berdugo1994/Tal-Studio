export function filterForm(data) {
  let result = { ...data };
  result.email = result.email.toLowerCase();
  result.birthdate.setHours(result.birthdate.getHours() + 3); // Israel Offset.
  result.birthdate = result.birthdate.toISOString().split("T")[0];
  result = objectWithoutKey(result, "password_confirm");
  result.city = result.city.value;
  result.gender = result.gender.value;
  result.sport_for_me = result.sport_for_me.value;
  result.fav_sport = result.fav_sport.value;
  // result.fav_sport = "";
  return result;
}

export const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};
