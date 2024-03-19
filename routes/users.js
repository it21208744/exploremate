import { Router } from 'express'
import { User, validate } from '../model/user.js'
// import { UserProfile } from '../model/UserProfile.js'; // Import UserProfile model
import bcrypt from 'bcrypt'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.json({ msg: 'User already exists' })

    await User.create(req.body)
    res.send('User created')
  } catch (error) {
    console.log(error)
  }

  //   try {
  //     const user = await User.findOne({ email: req.body.email })
  //     if (user)
  //       return res
  //         .status(409)
  //         .send({ msg: 'User with given email already exists!' })

  //     const salt = await bcrypt.genSalt(Number(process.env.SALT))
  //     const hashPassword = await bcrypt.hash(req.body.password, salt)

  //     // Create a new user
  //     const newUser = await new User({
  //       ...req.body,
  //       password: hashPassword,
  //     }).save()

  //     // Create a user profile for the newly created user
  //     const userProfile = await new User({
  //       user: newUser._id, // Associate user profile with the newly created user
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       email: req.body.email,
  //       password: req.body.password,
  //       // You can add other fields here
  //     }).save()

  //     res
  //       .status(201)
  //       .send({ message: 'User and user profile created successfully' })
  //   } catch (error) {
  //     console.log('error')
  //     res.status(500).send({ message: 'Internal Server Error' })
  //   }
})
export default router
