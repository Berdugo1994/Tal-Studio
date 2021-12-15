const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

const startFinishOfTheDay = (firstevent, lastevent) => {
  console.log(firstevent, lastevent);
};
module.exports.objectWithoutKey = objectWithoutKey;
module.exports.startFinishOfTheDay = startFinishOfTheDay;
