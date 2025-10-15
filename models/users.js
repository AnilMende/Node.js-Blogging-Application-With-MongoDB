const { createHmac, randomBytes } = require('crypto');
const { create } = require('domain');
const {Schema, model} = require('mongoose');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt: {
        type:String
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default:'/images/user.png'
    },
    role:{
        type:String,
        enum : ["USER", "ADMIN"],
        default : "USER"
    }

},{timestamps : true})

userSchema.pre('save', function (next){
    const user = this;

    if(!user.isModified('password')) return;
    // to get random string we use randomBytes
    // salt acts as the key to hash the password
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
                           .update(user.password)
                           .digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    next();
})


userSchema.static("matchPasswordAndGenToken", async function(email, password){
    const user = await this.findOne({ email });

    if(!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const newPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex")
    if(hashedPassword !== newPassword) throw new Error("Incorrect Password")
    
    const token = createTokenForUser(user);

    return token;

})

const USER = model("user", userSchema)

module.exports = USER;