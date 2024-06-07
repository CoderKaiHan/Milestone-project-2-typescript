import mongoose from "mongoose"
import Day from "./day.js";

const itinerarySchema = new mongoose.Schema({
    destination: String,
    photo: {
      type: String,
      required: false
    },
    startDate: Date,
    endDate: Date,
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }],
    vibe: {
        type: String,
        enum: ['Adventure', 'Romantic', 'Relaxing', 'Family-friendly'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // tells Mongoose that the ObjectId references a document in the User collection.
      required: false
    }
})

itinerarySchema.methods.createDaysArray = async function() {
    const startDate = this.startDate;
    const endDate = this.endDate;
    
    const days = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const newDay = new Day({ date: currentDate });
      await newDay.save();
      days.push(newDay._id);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    this.days = days;
    await this.save();
  };

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

export default Itinerary