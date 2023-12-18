import { userRepository } from "../repositories/userRepository.js";

class UserService {
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    return userRepository.getAll();
  }

  add(user) {
    userRepository.create(user);
  }

  update(id, user) {
    return userRepository.update(id, user);
  }

  remove(id) {
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
