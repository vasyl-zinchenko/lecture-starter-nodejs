import { FIGHTER } from "../models/fighter.js";

function idValidation(id, res) {
  if (id) {
    res.status(400).send({
      error: true,
      message: "Id should not be present in the request body for creation",
    });

    return true;
  }
  return false;
}

function checkRedundantProperties(extraProps, res) {
  const allowedProps = Object.keys(FIGHTER);
  const uknownProps = [];

  for (let key in extraProps) {
    if (!allowedProps.includes(key)) {
      uknownProps.push(key);
    }
  }

  if (uknownProps.length > 0) {
    res.status(400).send({
      error: true,
      message: `Additional property '${uknownProps.join(", ")}' not allowed`,
    });
    return true;
  }
  return false;
}

function powerValidation(power, res) {
  if (power < 1 || power > 100 || typeof power !== "number") {
    res.status(400).send({
      error: true,
      message: "The power must be a number and must be 1 ≤ power ≤ 100",
    });
    return true;
  }
  return false;
}

function defenseValidation(defense, res) {
  if (defense < 1 || defense > 10 || typeof defense !== "number") {
    res.status(400).send({
      error: true,
      message: "The defense must be a number and must be 1 ≤ defense ≤ 10",
    });
    return true;
  }
  return false;
}

function healthValidation(health, res) {
  if (health < 80 || health > 120 || typeof health !== "number") {
    res.status(400).send({
      error: true,
      message: "The health must be a number and must be 80 ≤ health ≤ 120",
    });
    return true;
  }
  return false;
}

const createFighterValid = (req, res, next) => {
  const { id, name, power, defense, health, ...extraProps } = req.body;

  if (!name || !power || !defense) {
    res.status(400).send({
      error: true,
      message: "Name, power, and defense are required fields",
    });
    return;
  }

  if (health) {
    if (healthValidation(health, res)) {
      return;
    }
  }
  if (
    idValidation(id, res) ||
    checkRedundantProperties(extraProps, res) ||
    powerValidation(power, res) ||
    defenseValidation(defense, res)
  ) {
    return;
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { id, name, health, power, defense, ...extraProps } = req.body;

  if (!name && !health && !power && !defense) {
    res.status(400).send({
      error: true,
      message: "At least one field should be present for update",
    });
    return;
  }

  if (
    idValidation(id, res) ||
    checkRedundantProperties(extraProps, res) ||
    powerValidation(power, res) ||
    defenseValidation(defense, res) ||
    healthValidation(health, res)
  ) {
    return;
  }

  next();
};

export { createFighterValid, updateFighterValid };
