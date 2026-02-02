import express from "express";

export const userApp = express.Router();

let users = [];

// GET all users
userApp.get("/users", (req, res) => {
  res.status(200).json({ message: "all users", payload: users });
});

// CREATE user
userApp.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).json({ message: "user created" });
});

// UPDATE user
userApp.put("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  users[index] = { ...req.body, id };
  res.json({ message: "user updated" });
});

// GET user by id
userApp.get("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.json({ message: "user found", payload: user });
});

// DELETE user
userApp.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  users.splice(index, 1);
  res.json({ message: "user deleted" });
});
