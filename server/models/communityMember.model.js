const mongoose = require('mongoose');
const { Schema } = mongoose;

const communityMemberSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  communityId: Number,
});

const CommunityMember = mongoose.model(
  'community_members',
  communityMemberSchema
);

module.exports = { CommunityMember };
