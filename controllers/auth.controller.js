const { response } = require("express");
const User = require("../models/User");
const bCrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, name, password } = req.body

  try {
    const user = await User.findOne({ email });

    //*check email
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists'
      })
    }

    //*create user in model
    const dbUser = new User(req.body)
    
    //*hashing password
    const salt = bCrypt.genSaltSync();
    dbUser.password = bCrypt.hashSync(password, salt)

    //*generate JWT
    const token = await generateJWT(dbUser.id, dbUser.name)

    //*create user in db
    await dbUser.save()
  
    //*generate status response
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token
    })




  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Failed. Communicate with admin",
    })
  }

  
}

const loginUser = async (req, res = response) => {

  const {email, password} = req.body

  try {
    
    const dbUser = await User.findOne({ email })
    
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "The email doesn't exists" 
      })
    }

    //*check if password matches
    const validPassword = bCrypt.compareSync(password, dbUser.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The password doesn't match",
      })
    }

    //*generate JWT
    const token = await generateJWT(dbUser.id, dbUser.name)
    
    //*return from service
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    })

    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Communicate with admin'
    })
  }

}

const renewToken = async (req, res = response) => {

  const { uid, name } = req;
  const token = await generateJWT(uid, name);

  return res.json({
    ok: true,
    uid,
    name,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}
