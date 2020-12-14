const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      console.log("HERE")
      let data = await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if(!user) {
            return res.status(400).json({error: "Login failed. Please check email and password nd try again."})
        }
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    } catch (err) {
        res.status(400).json({err: err});
    }
};
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData)
};