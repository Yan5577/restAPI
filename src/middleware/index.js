const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require("jsonwebtoken")
const User = require('../user/userModels')

exports.hashPass = async (request, response, next) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10)
    next()
  } catch (error) {
    console.log(error)
    response.status(500).send({error: error.message})
  }
}
// write middleware function to compare plain text password with hashed password
exports.comparePass = async (request, reponse, next) => {
  try {
    request.user = await User.findOne({ username: request.body.username })
    if (request.user && await bcrypt.compare(request.body.password, request.user.password)) {
      console.log("username and password exist in database")
      next()
    } else {
      throw new Error("Incorrect username or password")
    }
    await bcrypt.compare
  } catch (error) {
    console.log(error)
    response.status(500).send({error: error.message})
  }
}

exports.tokenCheck = async (request, response, next) => {
  console.log("line33")
  try {
    console.log(request.header)
    if (request.header("Authorization")) {
      console.log("line37")
      const token = request.header("Authorization").replace("Bearer ", "")
      console.log(token)
      const decodedToken = await jwt.verify(token, process.env.SECRET)
      const user = await User.findById(decodedToken._id)
      request.authUser = user
      console.log("headers passed")
    } else {
      console.log("No headers passed")
    }
    next()

  } catch (error) {
    console.log(error)
    response.status(500).send({error: error.message})
  }
}

exports.validateEmail = async (request, response, next) => {
  try {
      if (validator.validate(request.body.email)) {
          console.log("vaild email")
          next()
      } else {
          throw new Error ("invaild email please try again")
      }
  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message})
  }
}