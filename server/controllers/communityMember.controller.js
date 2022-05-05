const { CommunityMember } = require('../models/communityMember.model');

async function joinCommunity(req, res) {
  try {
    const { userId, communityId } = req.body;

    //check if user already in community
    const member = await CommunityMember.findOne({userId, communityId});
    if (member) {
      res
        .status(200)
        .send({"message": "Already a member"})
    }
    else {
      const communityMember = await CommunityMember.create({
        userId: userId,
        communityId,
      });
  
      res
        .status(201)
        .send(communityMember);
    } 

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
