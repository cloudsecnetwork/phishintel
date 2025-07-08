import User from '../models/User.js';

export async function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

export async function findUserByUsername(username) {
  return User.findOne({ username });
}

export async function findUserByEmail(email) {
  return User.findOne({ email });
}

export async function findRootAdmin() {
  return User.findOne({ isRoot: true });
}

export async function updateUser(userId, updateData) {
  return User.findByIdAndUpdate(userId, updateData, { new: true });
}

export async function deleteUser(userId) {
  return User.findByIdAndDelete(userId);
}

const userService = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findRootAdmin,
  updateUser,
  deleteUser,
};
export default userService; 