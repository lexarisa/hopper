const { CommunityMember } = require('../models/communityMember.model');
const { ObjectId } = require('mongoose');

async function joinCommunity(req, res) {
  try {
    const { userId, communityId } = req.body;
    //check if user already in community
    const communityMember = await CommunityMember.create({
      userId: new ObjectId(userId),
      communityId,
    });
    res.status(201);
    res.send(communityMember);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getCommunityMemberships(req, res) {
  try {
    const { userId } = req.params;

    const communityMembers = await CommunityMember.find({
      userId: new ObjectId(userId),
    });
    res.send(200);
    res.send(communityMembers);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

module.exports = { joinCommunity, getCommunityMemberships };
