import { MongooseDocument } from 'mongoose';
import { NextFunction } from 'express';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.Promise = Promise;

export interface IUser extends MongooseDocument {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  checkPassword: (inputPassword: string) => boolean;
  hashPassword: (plainTextPassword: string) => string;
}

// Define userSchema
const userSchema = new Schema({
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
});

// Define schema methods
userSchema.methods = {
  checkPassword: function(inputPassword: string) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword: string) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre('save', function(this: IUser, next: NextFunction) {
  if (!this.password) {
    console.log('No password provided!');
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
