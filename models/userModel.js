import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

//Schemma

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is requires'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        minlength: [6, "Password length should be grater than 6 character"],
        select: true,      //To not display password    // to displaypassword use select:false
    },
    location: {
        type: String,
        require: "India",
    },
    isOnline:{
        type:String,
        default:'0'
    },
    role:{
        type:Number,
        default:0,
    },
},
    { timestamps: true }
);

//middleware password hashing
userSchema.pre('save', async function () {
    if (!this.isModified) return; 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

});

//compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
};

//JSON WEB TOKEN
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId:this._id}, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export default mongoose.model('User', userSchema);