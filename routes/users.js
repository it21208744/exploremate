import { Router } from 'express'
import { User, validate } from '../model/user.js'
import bcrypt from 'bcrypt'

const router = Router()

router.post('/', async (req, res) => {

console.log(req.body.role)
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) return res.json({ msg: 'User already exists' })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        const newUser = await new User({
            ...req.body,
            password: hashPassword,
            role: req.body.role
        }).save()

        // Create a user profile for the newly created user
        const userProfile = await new User({
            user: newUser._id, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            // role: req.body.role
            role: req.body.role

            
        }).save()

        res
            .status(201)
            .send({ message: 'User and user profile created successfully' })
        } catch (error) {
        console.log('error')
        res.status(500).send({ message: 'Internal Server Error' })
        }
    })

 
export default router
