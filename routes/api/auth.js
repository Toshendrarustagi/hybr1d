const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const config = require('config')
// @ROUTE   POST /api/auth/register
// @DESC    get user info
// @ACCESS  public

router.post('/register',
    check('username','Enter username').notEmpty(),
    check('password','enter password with 8 or more characters').isLength({ min: 8 }),
    check('isSeller','enter if you are a seller or buyer').isBoolean(),
    async (req,res) => {

        //validating entered info
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors : errors.array() })
        }
        const { username, password, isSeller } = req.body

        // if username already exists
        try{
            let user = await User.findOne({ username })

            if(user){
                return res.status(400).json({ errors: [{msg: 'User already exists'}]})
            }

            user = new User({
                username,
                password,
                isSeller
            }) 

            //encrypting provided password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password,salt)
            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            //creating payload for protected route
            jwt.sign(payload, config.get('jwtSecret'),
                    {expiresIn: '10 days'},
                    (err,token) => {
                        if(err) throw err
                        return res.json({token})
                    }
            )
        }
        catch(err){
            console.error(err.message)
            return res.status(500).send('Server error')
        }
    }
)

module.exports = router