var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
mongoose.Promise = Promise;
// Define userSchema
var userSchema = new Schema({
    firstName: { type: String, unique: false },
    lastName: { type: String, unique: false },
    username: { type: String, unique: false, required: false },
    password: { type: String, unique: false, required: false },
});
// Define schema methods
userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function (plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    },
};
// Define hooks for pre-saving
userSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('No password provided!');
        next();
    }
    else {
        this.password = this.hashPassword(this.password);
        next();
    }
});
// Create reference to User & export
var User = mongoose.model('User', userSchema);
module.exports = User;
