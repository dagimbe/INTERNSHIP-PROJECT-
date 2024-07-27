
const { Router } = require("express");
const router=Router();
router.get("",async (req, res)=>{
    res.status(200).send({message:"wellcome to Adama homes website"})
})
module.exports = router
