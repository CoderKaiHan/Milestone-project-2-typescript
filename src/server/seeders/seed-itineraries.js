import connectDB from "../config/database.js"
import Itinerary from "../models/itinerary.js"
import Day from "../models/day.js"
import Activity from "../models/activity.js"

const seedItineraries = async () => {
    try {
        await connectDB()

        // SEAGROVE
        const bikeRentalActivity = await Activity.create({
            description: "Pick up bike rentals",
            time: "10:00am",
            location: "Crazy Earl's Suspiciously Cheap Bicycle Rentals",
            cost: 80.00,
            note: "Write down the lock combination, just in case."
        })

        const seagroveDay = await Day.create({
            date: new Date(2024, 4, 24),
            activities: [bikeRentalActivity._id]
        })

        const seagroveItinerary = await Itinerary.create({
            destination: "Seagrove Beach, Florida",
            photo: "../../client/assets/seagrove-matthew-brodeur-unsplash.jpg",
            startDate: new Date(2024, 4, 24),
            endDate: new Date(2024, 4, 27),
            vibe: "Relaxing",
            days: [seagroveDay._id]
        })
        
        // GLACIER
        const grinnellHikeActivity = await Activity.create({
            description: "Guided Hike to Grinnell Glacier",
            time: "7:30am",
            location: "Grinnell Glacier Trailhead",
            cost: 50.00,
            note: "Bring water and snacks. Wear appropriate hiking shoes."
        })

        const kayakingLakeMcDonaldActivity = await Activity.create({
            description: "Kayaking on Lake McDonald",
            time: "9:00am",
            location: "Lake McDonald",
            cost: 120.00,
            note: "Double kayak rental. Meet at the dock."
        })

        const day1GlacierPark = await Day.create({
            date: new Date(2024, 7, 8),
            activities: [grinnellHikeActivity._id]
        })

        const day2GlacierPark = await Day.create({
            date: new Date(2024, 7, 9),
            activities: [kayakingLakeMcDonaldActivity._id]
        })

        const glacierNationalParkItinerary = await Itinerary.create({
            destination: "Glacier National Park, Montana",
            startDate: new Date(2024, 7, 8),
            endDate: new Date(2024, 7, 12),
            vibe: "Adventure",
            days: [day1GlacierPark._id, day2GlacierPark._id]
        })

        // BRECKENRIDGE
        const familySkiLessonsActivity = await Activity.create({
            description: "Family Ski Lessons",
            time: "10:00am",
            location: "Breckenridge Ski Resort",
            cost: 200.00,
            note: "All-day group lesson for beginners."
        })

        const iceSkatingActivity = await Activity.create({
            description: "Ice Skating at Stephen C. West Ice Arena",
            time: "2:00pm",
            location: "Stephen C. West Ice Arena",
            cost: 40.00,
            note: "Rental skates included. Hot cocoa afterward."
        })

        const breckenridgeDay1 = await Day.create({
            date: new Date(2024, 11, 11),
            activities: [familySkiLessonsActivity._id]
        })

        const breckenridgeDay2 = await Day.create({
            date: new Date(2024, 11, 13),
            activities: [iceSkatingActivity._id]
        })

        const breckenridgeItinerary = await Itinerary.create({
            destination: "Breckenridge, Colorado",
            startDate: new Date(2024, 11, 10),
            endDate: new Date(2024, 11, 16),
            vibe: "Family-friendly",
            days: [breckenridgeDay1._id, breckenridgeDay2._id]
        })


        // NAPA VALLEY
        const wineTastingActivity = await Activity.create({
            description: "Private Wine Tasting Tour",
            time: "11:00am",
            location: "Castello di Amorosa",
            cost: 150.00
        })

        const hotAirBalloonRideActivity = await Activity.create({
            description: "Hot Air Balloon Ride over Napa Valley",
            time: "5:30am",
            location: "Napa Valley Balloons, Inc.",
            cost: 240.00
        })

        const napaValleyDay1 = await Day.create({
            date: new Date(2024, 8, 4),
            activities: [wineTastingActivity._id]
        })

        const napaValleyDay2 = await Day.create({
            date: new Date(2024, 8, 5),
            activities: [hotAirBalloonRideActivity._id]
        })

        await Itinerary.create({
            destination: "Napa Valley, California",
            startDate: new Date(2024, 8, 3),
            endDate: new Date(2024, 8, 8),
            vibe: "Romantic",
            days: [napaValleyDay1._id, napaValleyDay2._id]
        })

        // CHARLESTON
        const sunriseWalkActivity = await Activity.create({
            description: "Sunrise Walk on Folly Beach",
            time: "6:30am",
            location: "Folly Beach",
            cost: 0.00
        })

        const carriageTourActivity = await Activity.create({
            description: "Private Carriage Tour of Historic Downtown",
            time: "11:00am",
            location: "Downtown Charleston",
            cost: 120.00
        })

        const dinnerAtHuskActivity = await Activity.create({
            description: "Dinner at Husk Restaurant",
            time: "7:00pm",
            location: "Husk",
            cost: 180.00
        })

        const visitMagnoliaPlantationActivity = await Activity.create({
            description: "Visit to Magnolia Plantation and Gardens",
            time: "9:00am",
            location: "Magnolia Plantation",
            cost: 29.00
        })

        const sunsetSailActivity = await Activity.create({
            description: "Sunset Sail on Charleston Harbor",
            time: "5:00pm",
            location: "Charleston Harbor",
            cost: 85.00
        })

        const charlestonDay1 = await Day.create({
            date: new Date(2024, 9, 17),
            activities: [sunriseWalkActivity._id, carriageTourActivity._id, dinnerAtHuskActivity._id]
        })

        const charlestonDay2 = await Day.create({
            date: new Date(2024, 9, 18),
            activities: [visitMagnoliaPlantationActivity._id, sunsetSailActivity._id]
        })

        await Itinerary.create({
            destination: "Charleston, SC",
            startDate: new Date(2024, 9, 16),
            endDate: new Date(2024, 9, 21),
            vibe: "Romantic",
            days: [charlestonDay1._id, charlestonDay2._id]
        })

        // MAUI
        const snorkelingMolokiniActivity = await Activity.create({
            description: "Snorkeling Trip to Molokini Crater",
            time: "8:00am",
            location: "Maalaea Harbor",
            cost: 110.00
        })

        const relaxingWaileaBeachActivity = await Activity.create({
            description: "Relaxing at Wailea Beach",
            time: "2:00pm",
            location: "Wailea Beach",
            cost: 0.00
        })

        const roadToHanaTourActivity = await Activity.create({
            description: "Road to Hana Tour",
            time: "7:00am",
            location: "Pickup from hotel",
            cost: 160.00
        })

        const luauOldLahainaActivity = await Activity.create({
            description: "Luau at Old Lahaina",
            time: "6:00pm",
            location: "Old Lahaina Luau",
            cost: 125.00
        })

        const mauiDay1 = await Day.create({
            date: new Date(2024, 5, 2),
            activities: [snorkelingMolokiniActivity._id, relaxingWaileaBeachActivity._id]
        })

        const mauiDay2 = await Day.create({
            date: new Date(2024, 5, 4),
            activities: [roadToHanaTourActivity._id, luauOldLahainaActivity._id]
        })

        await Itinerary.create({
            destination: "Maui, Hawaii",
            startDate: new Date(2024, 5, 1),
            endDate: new Date(2024, 5, 9),
            vibe: "Relaxing",
            days: [mauiDay1._id, mauiDay2._id]
        })

        // JOSHUA TREE
        const rockClimbingActivity = await Activity.create({
            description: "Rock Climbing at Hidden Valley",
            time: "8:00am",
            location: "Hidden Valley Picnic Area",
            cost: 150.00
        })

        const lunchCrossroadsCafeActivity = await Activity.create({
            description: "Lunch at Crossroads Cafe",
            time: "12:30pm",
            location: "Crossroads Cafe",
            cost: 25.00
        })

        const hikeBarkerDamActivity = await Activity.create({
            description: "Hike to Barker Dam",
            time: "9:00am",
            location: "Barker Dam Trailhead",
            cost: 0.00
        })

        const stargazingSkullRockActivity = await Activity.create({
            description: "Stargazing at Skull Rock",
            time: "8:00pm",
            location: "Skull Rock",
            cost: 0.00
        })

        const guidedTourKeysRanchActivity = await Activity.create({
            description: "Guided Tour of Keys Ranch",
            time: "10:00am",
            location: "Keys Ranch",
            cost: 15.00
        })

        const sunsetYogaCapRockActivity = await Activity.create({
            description: "Sunset Yoga at Cap Rock",
            time: "6:00pm",
            location: "Cap Rock",
            cost: 35.00
        })

        const joshuaTreeDay1 = await Day.create({
            date: new Date(2024, 8, 20),
            activities: [rockClimbingActivity._id, lunchCrossroadsCafeActivity._id]
        })

        const joshuaTreeDay2 = await Day.create({
            date: new Date(2024, 8, 21),
            activities: [hikeBarkerDamActivity._id, stargazingSkullRockActivity._id]
        })

        const joshuaTreeDay3 = await Day.create({
            date: new Date(2024, 8, 22),
            activities: [guidedTourKeysRanchActivity._id, sunsetYogaCapRockActivity._id]
        })

        await Itinerary.create({
            destination: "Joshua Tree, California",
            startDate: new Date(2024, 8, 20),
            endDate: new Date(2024, 8, 26),
            vibe: "Adventure",
            days: [joshuaTreeDay1._id, joshuaTreeDay2._id, joshuaTreeDay3._id]
        })

        console.log('Database seeded successfully!')
    } catch (err) {
        console.error('Error seeding itineraries:', err)
    } finally {
        process.exit()
    }
}

seedItineraries()