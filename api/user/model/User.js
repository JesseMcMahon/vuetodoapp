const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        
    },
    isCompleted: {
        type: Boolean,
        
        default: false
    },
    currentlyEditing: {
        type: Boolean,
        
        default: false
    },
});

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    currentTodos: [
       todoSchema
    ]
});


//hash password before saving
userSchema.pre("save", async function(next) {
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

//generate auth token
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, "secret");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error({error: "Invalid login"});
    }
    const checkPasswordMatch = await bcrypt.compare(password, user.password);
    if(!checkPasswordMatch) {
        throw new Error({error: "Invalid login"})
    }
    return user
}

const User = mongoose.model("User", userSchema);
module.exports = User;

