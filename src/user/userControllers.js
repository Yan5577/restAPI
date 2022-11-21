const User = require("./userModels");

exports.createUser = async (request, response) => {
    try {
        const newUser = await User.create(request.body);
        console.log("SUCCESFUL", newUser);
        response.status(201).send({ user: newUser.username });
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
};

exports.readUsers = async (request, response) => {
  try {
    const users = await User.find({})
    console.log(users)
    response.status(200).send({user: users})
    } catch {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}


exports.updataUsers = async (request, response) => {
  try {
    await User.updateOne(
      { username: request.body.username },
      {[request.body.key]: request.body.value }
    );
    response.status(200).send({ message: "user feild has been update" })

    
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

exports.deleteUsers = async (request, response) => {
  try {
    await User.deleteOne({ username: request.body.username }),
      response.status(200).send({message: "successfully deleted a user"})
    } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

exports.loginUser = async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username })
    response.status(200).send({username: user.username})
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}