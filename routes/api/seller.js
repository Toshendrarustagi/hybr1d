const express = require('express')
const router = express.Router()

// @ROUTE  POST /api/seller
// @DESC   
// @ACCESS 

router.get('/',(req,res) => res.send('seller API'))

module.exports = router