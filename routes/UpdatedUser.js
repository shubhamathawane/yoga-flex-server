const UserBatch = require('../models/UserBatchScheme.js')
const router  = require('express').Router();



router.get("/:userId", async (req,res) => {
    const userId  = req.params.userId;
    try{
        const updatedUser = await UserBatch.findOne({ userId }).populate("batchTimesId").populate("userId")
        if(updatedUser){
            res.status(200).json(updatedUser);
        }else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router;

