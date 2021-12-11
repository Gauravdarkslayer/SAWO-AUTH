const express = require('express');
const router = express.Router();
const User = require('../models/user');
const httpStatus = require("http-status-codes").StatusCodes;

module.exports = router.post('/login', async(req, res) => {
    try {
        const { email, provider_type, provider_id } = req.body;
        const user = await User.findOne({ provider_id, provider_type });
        if (user) {
            const token = await user.generateJWT();
            const user_data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            };
            return res.status(200).send({ status: httpStatus.OK, message: "Logged in Successfull", data: { token: token, user_data } });
        } else {
            const uuser = await User.findOne({ email });
            if (uuser) {
                return res.status(400).send(httpStatus.BAD_REQUEST, "Email Already exist with different provider type and ID.");
            } else {
                const nuser = await User.create({ provider_type, provider_id, email });
                const token = await nuser.generateJWT();
                return res.status(200).send(httpStatus.OK, "Logged in Successfull", { token: token, user_data: { email } });
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(httpStatus.INTERNAL_SERVER_ERROR, "Server Error");
    }
});