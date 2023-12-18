import { USER } from "../models/user.js";

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
  const allowedProps = Object.keys(USER);
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

function emailValidation(email, res) {
  const validEmail = /^[a-z0-9](\.?[a-z0-9]){1,}@gmail\.com$/;

  if (!email.match(validEmail)) {
    res.status(400).send({
      error: true,
      message: `email must be only gmail`,
    });
    return true;
  }
  return false;
}

function phoneNumberValidation(phoneNumber, res) {
  const validPhone = /^\+380\d{9}$/;

  if (!phoneNumber.match(validPhone)) {
    res.status(400).send({
      error: true,
      message: "the phone number must be +380xxxxxxxxx. X - is number",
    });
    return true;
  }
  return false;
}

function passwordValidation(password, res) {
  if (password.length < 3 || typeof password !== "string") {
    res.status(400).send({
      error: true,
      message:
        "The password must be a string and consist of at least 3 characters",
    });
    return true;
  }
  return false;
}

const createUserValid = (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    ...extraProps
  } = req.body;

  if (
    checkRedundantProperties(extraProps, res) ||
    idValidation(id, res) ||
    emailValidation(email, res) ||
    phoneNumberValidation(phoneNumber, res) ||
    passwordValidation(password, res)
  ) {
    return;
  }

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.status(400).send({
      error: true,
      message:
        "FirstName, lastName, email, phoneNumber and password are required fields",
    });
    return;
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    ...extraProps
  } = req.body;

  if (
    checkRedundantProperties(extraProps, res) ||
    idValidation(id, res) ||
    emailValidation(email, res) ||
    phoneNumberValidation(phoneNumber, res) ||
    passwordValidation(password, res)
  ) {
    return;
  }

  if (!firstName && !lastName && !email && !phoneNumber && !password) {
    res.status(400).send({
      error: true,
      message: "At least one field should be present for update",
    });
    return;
  }

  next();
};

export { createUserValid, updateUserValid };
