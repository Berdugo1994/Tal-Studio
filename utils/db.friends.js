const Friends = require("../models/Friends");

async function createNewFriendRequest(inviter_id, invited_id) {
  const friendsRequest = new Friends({
    inviter_id,
    invited_id,
    status: "wait",
    date_sent: new Date(),
    date_respond: null,
  });
  return friendsRequest
    .save()
    .then(() => {
      Promise.resolve();
    })
    .catch(() => {
      Promise.reject("error!");
    });
}

async function respondToRequest(_id, status) {
  return Friends.updateOne(
    { _id },
    { $set: { status, date_respond: new Date() } }
  );
}
async function validateFriendsStatus(inviter_id, invited_id) {
  // inviter_id - user inviter id
  // invited_id - user invited id
  let differentDir = await Friends.findOne({
    inviter_id: { $eq: invited_id },
    invited_id: { $eq: inviter_id },
  });
  if (differentDir) {
    if (differentDir._doc.status == "approve")
      return Promise.reject("already friends");
    if (differentDir._doc.status == "wait")
      return Promise.reject("wait for me");
  }

  let exist = await Friends.findOne({
    inviter_id: { $eq: inviter_id },
    invited_id: { $eq: invited_id },
  });
  if (!exist) return Promise.resolve("new friend request");
  if (exist._doc.status == "approve") return Promise.reject("already friends");
  else if (exist._doc.status == "wait") return Promise.reject("wait for them");
  else if (exist._doc.status == "reject")
    return Promise.resolve("user rejected, new try to be friends");
  else return Promise.reject("404"); //other value for status in db
}

async function validateUserReq(inviter_id, invited_id) {
  let exist = await Friends.findOne({
    inviter_id: { $eq: inviter_id },
    invited_id: { $eq: invited_id },
  });
  if (!exist) return Promise.reject("bad credentials");
  if (exist._doc.status == "approve") return Promise.reject("already friends");
  else if (exist._doc.status == "reject")
    return Promise.reject("already rejected");
  else if (exist._doc.status == "wait") return Promise.resolve(exist._id);
  else return Promise.reject("404"); //other value for status in db
}

async function getUserFriends(user_id) {
  let totalFriends = await Friends.find({
    $or: [{ inviter_id: { $eq: user_id } }, { invited_id: { $eq: user_id } }],
  });
  console.log(totalFriends);
  let friendsApprovedIds = [];
  let waitForThemIds = [];
  let waitForMeIds = [];
  totalFriends.map((friendship) => {
    if (friendship._doc.inviter_id == user_id) {
      // The user is inviter
      if (friendship._doc.status === "approve")
        friendsApprovedIds.push(friendship._doc.invited_id);
      else if (friendship._doc.status === "wait")
        waitForThemIds.push(friendship._doc.invited_id);
    } else {
      // The user is invited
      if (friendship._doc.status === "approve")
        friendsApprovedIds.push(friendship._doc.inviter_id);
      else if (friendship._doc.status === "wait")
        waitForMeIds.push(friendship._doc.inviter_id);
    }
  });
  return Promise.resolve({
    friendsApprovedIds,
    waitForThemIds,
    waitForMeIds,
  });
}
async function deleteFriend(user_id, friend_id) {
  let friendship = await findConnection(user_id, friend_id);
  if (friendship)
    return friendship.remove().then(Promise.resolve("Friendship Deleted"));
  return Promise.reject("No Friendship");
}

//Helpers
async function findConnection(id1, id2) {
  let totalFriends = await Friends.findOne({
    $or: [
      { inviter_id: { $eq: id1 }, invited_id: { $eq: id2 } },
      { inviter_id: { $eq: id2 }, invited_id: { $eq: id1 } },
    ],
  });
  return totalFriends;
}

module.exports.createNewFriendRequest = createNewFriendRequest;
module.exports.respondToRequest = respondToRequest;
module.exports.validateUserReq = validateUserReq;
module.exports.validateFriendsStatus = validateFriendsStatus;
module.exports.getUserFriends = getUserFriends;
module.exports.deleteFriend = deleteFriend;
