const Trainings = require("../models/Trainings");

async function getTrainingById(_id) {
  return Trainings.find({ _id });
}
async function getNextTrainingsById(id) {
  return Trainings.find({
    participant_ids: { $elemMatch: { $eq: id } },
  });
}
async function getPastTrainingsThisMonthById(id) {
  let beginOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  return Trainings.find({
    participant_ids: { $elemMatch: { $eq: id } },
    date: { $gte: beginOfMonth, $lt: new Date() },
  })
    .countDocuments()
    .then((res) => {
      return Promise.resolve(res);
    });
}

async function getNextTrainingByUserId(id) {
  let trainings = await Trainings.find({
    participant_ids: { $elemMatch: { $eq: id } },
    date: { $gte: new Date() },
  }).sort("date");
  if (trainings.length == 0) {
    return [];
  } else {
    return trainings[0]._doc;
  }
}

async function getNextAllTrainings() {
  return Trainings.find({
    date: { $gte: new Date() },
  });
}

async function getNextAllTrainingsLastDays(days) {
  return Trainings.find({
    date: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * days) },
  });
}

async function saveTraining(
  participant_ids,
  participant_names,
  description,
  date
) {
  const trainingToSave = new Trainings({
    participant_ids,
    participant_names,
    description,
    date,
  });
  return trainingToSave
    .save()
    .then(() => {
      Promise.resolve();
    })
    .catch(() => {
      Promise.reject();
    });
}
async function deleteTrainingById(_id) {
  let training = await Trainings.findOne({ _id });
  return training.remove().then(Promise.resolve(training._doc.date));
}

async function updateById(_id, object) {
  return Trainings.updateOne({ _id }, object);
}

async function getTrainingsBetweenRanges(start, finish) {
  let events = await Trainings.find({
    date: { $gte: start, $lte: finish },
  });
  return events;
}

async function validateEmptyOnTimes(events) {
  //This validates there is no conflict in between,
  //Enough one conflict to fail the whole action.
  let first_event_start = events[0].date;
  let last_event_start = events[events.length - 1].date;
  let existsTrainings = await getTrainingsBetweenRanges(
    first_event_start,
    last_event_start
  );
  return existsTrainings.length == 0;
}

module.exports.getNextTrainingsById = getNextTrainingsById;
module.exports.getNextAllTrainingsLastDays = getNextAllTrainingsLastDays;
module.exports.getNextAllTrainings = getNextAllTrainings;
module.exports.saveTraining = saveTraining;
module.exports.getTrainingById = getTrainingById;
module.exports.deleteTrainingById = deleteTrainingById;
module.exports.getNextTrainingByUserId = getNextTrainingByUserId;
module.exports.getPastTrainingsThisMonthById = getPastTrainingsThisMonthById;
module.exports.updateById = updateById;
module.exports.validateEmptyOnTimes = validateEmptyOnTimes;
