const mongoose = require('mongoose');
const { Schema } = mongoose;

const communityMemberSchema = new Schema({
  //warning ???
  userId: mongoose.Types.ObjectId,
  // userId: { type: mongoose.Types.ObjectId },
  communityId: String,
});

const CommunityMember = mongoose.model(
  'community_members',
  communityMemberSchema
);

module.exports = { CommunityMember };
