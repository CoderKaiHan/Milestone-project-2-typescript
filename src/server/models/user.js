import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'An email address is required'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'A password is required.'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
            },
            message: props => `Password not strong enough. Please be sure to include at least one lower case letter, one upper case letter, a number, and a special character.`
        }
    }
})

// Pre-save middleware to hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next() // Only hashes the password if it is new or has been modified

    try {
        const salt = await bcrypt.genSalt(12) // 12 salt rounds
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        next(err)
    }
}) // Salting adds a random string to the password before it's hashed for better security.

const User = mongoose.model('User', userSchema)
export default User