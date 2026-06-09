const express= require('express')
const router= express.Router()
const Mood= require('../models/Mood')

router.post('/' , async(req, res) => {
    try{
        const{userId, mood, energy, date, note} =req.body
        const log = new Mood({
            userId,
            mood,
            energy,
            date,
            note
        })
        await log.save()
        res.json({ message: 'Mood saved!'})
    }
    catch(error){
        res.status(500).json({message: 'Server Error!'})
    }
})

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const logs= await Mood.find({userId})
    res.json(logs)

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports =  router