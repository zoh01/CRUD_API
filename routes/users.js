const express = require('express')
const { v4: uuidv4 } = require('uuid')

const router = express.Router()

let users = []

// All routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users)
  console.log(users);
})

router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });
  res.send(`User with the name ${user.firstName} has been added to the database!`)
})


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);

  res.send(`User with the id ${id} has been deleted from the database.`)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  const userToBeUpdated = users.find((userToBeUpdated) => userToBeUpdated.id === id);

  if (firstName) userToBeUpdated.firstName = firstName;
  if (lastName) userToBeUpdated.lastName = lastName;
  if (age) userToBeUpdated.age = age;

  res.send(`User with id ${id} has been updated`)
})

module.exports = router