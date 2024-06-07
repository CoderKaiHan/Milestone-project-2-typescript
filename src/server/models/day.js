import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
    date: Date,
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
})

const Day = mongoose.model('Day', daySchema)

export default Day
