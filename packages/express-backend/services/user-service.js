import User from "../models/user.js";

export function getUsers() {
  return User.find();
}

export function findUserByName(name) {
  return User.find({ name });
}

export function findUserByJob(job) {
  return User.find({ job });
}

export function findUsersByNameAndJob(name, job) {
  return User.find({ name, job });
}

export function addUser(user) {
  const u = new User(user);
  return u.save();
}

export function findUserById(id) {
  return User.findById(id);
}

export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}
