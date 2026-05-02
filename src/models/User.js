import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },

    birthdate: {
        type: Date,
        required: true
    },

    url_profile: {
        type: String,
        default: ''
    },

    address: {
        type: String,
        default: ''
    },

    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);