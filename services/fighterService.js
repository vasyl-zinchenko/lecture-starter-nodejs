import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {
    const item = fighterRepository.getOne(id);

    if (!item) {
      return null;
    }
    return item;
  }

  add(fighter) {
    fighterRepository.create(fighter);
  }

  update(id, fighter) {
    return fighterRepository.update(id, fighter);
  }

  remove(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
