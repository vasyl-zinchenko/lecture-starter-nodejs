import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await userService.search({ id });
    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", createUserValid, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const users = await userService.getAll();
  try {
    if (users.find((user) => user.email === email)) {
      res.status(404).send({
        error: true,
        message: "A user with that email already exists",
      });
      return;
    }

    if (users.find((user) => user.phoneNumber === phoneNumber)) {
      res.status(404).send({
        error: true,
        message: "A user with that phone number already exists",
      });
      return;
    }
    const user = userService.add({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });
    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to add user");
  }
});

router.put("/:id", updateUserValid, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const user = await userService.search({ id });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    const updatedUser = await userService.update(id, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.search({ id });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    userService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to remove user");
  }
});

export { router };
