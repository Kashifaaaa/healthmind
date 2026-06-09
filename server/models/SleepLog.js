const mongoose= require('mongoose')

const SleepLogSchema= new mongoose.Schema({
    userId: {
    type: String,
    required: true
  },
  hours:{
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})
const SleepLog = mongoose.model('SleepLog',SleepLogSchema)

module.exports = SleepLog