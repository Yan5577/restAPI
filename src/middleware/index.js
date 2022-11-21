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

exports.tokenCheck = async (request, resonse, next) => {
  try {
    if (request.header("Authorization")) {
      const token = request.header("Authorization").replace("Bearer", "")
      const decodedToken = await jwt.verify(token, process.env.SERCET)
      const user = await User.findById(decodedToken._id)
      request.authUser = user
      console.log("headers passed")
    } else {
      console.log("No headers passed")
    }
    next()

  } catch (error) {
    console.log(error)
    response.status(500)
  }
}