import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    description: String,
    time: String,
    location: String,
    cost: {
        type: Number,
        set: v => Math.round(v * 100) / 100, 
        validate: {
            validator: function(v) {
                return (v * 100) % 1 === 0
            },
            message: '{VALUE} is not a valid currency amount. Please use a value with up to two decimal places.'
        }
    },
    note: String,
})


const Activity = mongoose.model('Activity', activitySchema)

export default Activity