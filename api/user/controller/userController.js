const User = require("../model/User");
const Todo = require("../model/Todos");
const { ObjectId } = require("bson");

exports.registerNewUser = async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      console.log("HERE")
      let data = await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };

  exports.addThisTodo = async (req, res) => {
    try {
      const newTitle = req.params.newtodo
      const user = await User.findOne({email: req.params.currentuser});
      const todo = new Todo({
        title: newTitle,
        isCompleted: false,
        currentlyEditing: false,
      });
      // console.log(todo)
      user.currentTodos.push(todo)
      await user.save()
    } catch (err) {
      console.log(err);
    }
  };

exports.getTodos = async (req, res) => {
    const user = await User.findOne({email: req.params.currentuser})
    const todos = user.currentTodos
    res.status(201).json({ todos });
}

exports.deleteTodo = async (req, res) => {
  console.log(req.params)
  const user = await User.findOne({email: req.params.currentuser})
  user.currentTodos.pull({_id: req.params.todoid})
  user.save()
  res.status(201).json({ user });
}

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