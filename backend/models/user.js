var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true, required: [true, "Email is required!"], match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Email is invalid'], index: true },
    provider_type: { type: String, enum: ['EMAIL', 'SAWO'], default: 'EMAIL' },
    provider_id: { type: String, default: null },
    status: { type: Boolean, default: true },
}, { timestamps: true });



UserSchema.methods.generateJWT = function() {
    return jwt.sign({ _id: this._id }, process.env.secretKey || "MYSECRETKEY");
};

module.exports = mongoose.model('user', UserSchema);