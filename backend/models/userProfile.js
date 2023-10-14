const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserProfileSchema = new Schema({
    useremail: { type: String, required: true },
    bio: { type: String },
    address: { type: String },
    profileImage: { type: String },
    badge: { type: String, default: "newbie" },
    points_earned: { type: Number, default: 0 },
    upCycled: { type: Number, default: 0 },
    reCycled: { type: Number, default: 0 },
    followed_communities: { type: [String] },
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
