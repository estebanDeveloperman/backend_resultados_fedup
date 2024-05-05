import User from "../models/UserModel.js";
import argon2, { hash } from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: [
        "iduser",
        "username",
        "email",
        "firstname",
        "surnames",
        "phone",
        "role",
        "sport",
        "status",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: [
        "iduser",
        "username",
        "email",
        "firstname",
        "surnames",
        "phone",
        "role",
        "sport",
        "status",
      ],
      where: {
        iduser: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    firstname,
    surnames,
    phone,
    role,
    sport,
    status,
  } = req.body;
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      username: username,
      email: email,
      password: hashPassword,
      firstname: firstname,
      surnames: surnames,
      phone: phone,
      role: role,
      sport: sport,
      status: status,
    });
    res.status(201).json({ msg: "Registro Exitoso" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      iduser: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  const {
    username,
    email,
    password,
    firstname,
    surnames,
    phone,
    role,
    sport,
    status,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  try {
    await User.update(
      {
        username: username,
        email: email,
        password: hashPassword,
        firstname: firstname,
        surnames: surnames,
        phone: phone,
        role: role,
        sport: sport,
        status: status,
      },
      {
        where: {
          iduser: user.iduser,
        },
      }
    );
    res.status(200).json({ msg: "Usuario Actualizado!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      iduser: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  try {
    await User.destroy({
      where: {
        iduser: user.id,
      },
    });
    res.status(200).json({ msg: "Usuario Eliminado!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
