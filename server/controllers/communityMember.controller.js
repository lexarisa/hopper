const { CommunityMember } = require('../models/communityMember.model');
const { ObjectId } = require('mongoose');

async function joinCommunity(req, res) {
  try {
    const { userId, communityId } = req.body;

    //check if user already in community
    const userAlreadyInCommunity = await CommunityMember.find({
      communityId,
    });

    if (userAlreadyInCommunity.length > 1) return;
    // create new user if not already in community

    const communityMember = await CommunityMember.create({
      userId: userId,
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
      userId: userId,
    });

    res.status(200).send(communityMembers);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

//leave community

module.exports = { joinCommunity, getCommunityMemberships };
