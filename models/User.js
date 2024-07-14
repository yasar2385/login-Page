const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length >= 3; // Customize as needed
            },
            message: 'Username must be at least 3 characters long',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 3, // Minimum password length
    },
});

// Virtual field for password confirmation
userSchema.virtual('passwordConfirmation')
    .get(function() {
        return this._passwordConfirmation;
    })
    .set(function(value) {
        this._passwordConfirmation = value;
    });

// Validate password and password confirmation
userSchema.path('password').validate(function(value) {
    if (this.isNew || this.isModified('password')) {
        if (value !== this._passwordConfirmation) {
            return false; // Passwords don't match
        }
    }
    return true;
}, 'Passwords do not match');

// Hash password before saving
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;