import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fighters = await fighterService.getAll();
    res.send(fighters);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fighter = await fighterService.getById({ id });
    if (!fighter) {
      res.status(404).send({
        error: true,
        message: "Fighter was not found",
      });

      return;
    }
    res.send(fighter);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", createFighterValid, async (req, res) => {
  const { name, health = 100, power, defense } = req.body;
  const fighters = await fighterService.getAll();
  try {
    if (fighters.find((fighter) => fighter.name === name)) {
      res.status(404).send({
        error: true,
        message: "A fighter with that name already exists",
      });
      return;
    }
    const newFighter = fighterService.add({
      name,
      health,
      power,
      defense,
    });

    res.statusCode = 201;
    res.send(newFighter);
  } catch (error) {
    res.status(500).send("Failed to add fighter");
  }
});

router.put("/:id", updateFighterValid, async (req, res) => {
  const { id } = req.params;
  const { name, health, power, defense } = req.body;

  try {
    const fighter = await fighterService.getById({ id });

    if (!fighter) {
      res.status(404).send({
        error: true,
        message: "Fighter was not found",
      });

      return;
    }

    const updatedFighter = await fighterService.update(id, {
      name,
      health,
      power,
      defense,
    });

    res.send(updatedFighter);
  } catch (error) {
    throw new Error("Failed to update fighter");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fighter = await fighterService.getById({ id });

    if (!fighter) {
      res.status(404).send({
        error: true,
        message: "Fighter was not found",
      });

      return;
    }

    fighterService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    throw new Error("Failed to remove fighter");
  }
});

export { router };
