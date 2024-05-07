import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['traveller', 'hotel','taxi'], default: 'traveller' }
    
});

userSchema.methods.generateAuthToken = function() {
    // const token = jwt.sign({ email: this.email }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
    const token = jwt.sign({ email: this.email, role: this.role }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
    return token;
};

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        role: joi.string().valid('traveller', 'hotel','taxi').default('traveller').label('Role')

    });
    return schema.validate(data);
};


export { User, validate };
export default User;

