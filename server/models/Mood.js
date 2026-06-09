const mongoose = require('mongoose')

const MoodSchema= new mongoose.Schema({
    userId: { type: String, required: true},
    mood: { type: String, required: true },
    energy: {type: Number, required: true},
    date: {type: Date, required: true},
    note: { type: String }
})

const Mood= mongoose.model('Mood', MoodSchema)
module.exports = Mood