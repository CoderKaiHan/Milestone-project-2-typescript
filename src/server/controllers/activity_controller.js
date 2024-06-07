import express from "express";
const activity = express.Router();
import Activity from "../models/activity.js";

// get all activities
activity.get ("/", (req, res)=>{
    // res.send("Hello from the itinerary get call.")
    Activity.find()
    .then(foundActivities => {
      console.log(foundActivities)
      res.status(200).send(foundActivities)
      
    })
    .catch(err=>{console.log(err)})
  })


// get activity by id
activity.get("/:id", (req,res)=>{

Activity.findById(req.params.id)

.then(foundActivity => {
    res.status(200).send(foundActivity)
    })
    .catch(err=>{
    console.log(err)
    res.send(err)})
})


// create a new activity
activity.post("/new", (req,res)=>{

console.log(req.body)

Activity.create(req.body)
.then(newActivity =>{
    res.status(200).send(newActivity)
})
.catch(err=>{
    console.log(err)
    res.send(err)
})
})

//update by id

activity.put("/:id", (req, res)=>{
Activity.findByIdAndUpdate(req.params.id, req.body, {new:true})
.then(updatedActivity=>{
    res.status(200).send(updatedActivity)
})
.catch(err=>{
    console.log(err)
    res.send(err)
})
})

  //delete an activity *will need to create an "are you sure" check before running this on the client side.
activity.delete("/:id", (req, res)=>{
  Activity.findByIdAndDelete(req.params.id)
  .then(deletedActivity=>{
    console.log(deletedActivity)
    res.status(200).json({message: "deleted the following:", deleted: deletedActivity})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).send(err)
  })
})


export default activity