const express = require('express')
const router = express.Router()
const SleepLog = require('../models/SleepLog')

router.post('/', async (req, res) =>  {
  try{
    const{userId, hours, date} = req.body
    const log= new SleepLog({
        userId,
        hours,
        date
    })
            await log.save()
            res.json({ message: 'Sleep log saved!' })
}
catch (error) {
    res.status(500).json({ message: 'Server error' })

  }
})

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params  // get userId from URL
    const logs = await SleepLog.find({ userId })  // find all logs for this user
    res.json(logs)  // send them back
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router