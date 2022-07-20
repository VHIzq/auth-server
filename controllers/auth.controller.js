const { response } = require("express")

const createUser = (req, res = response) => {
  const { email, name, password } = req.body
  return res.json({
    ok: true,
    msg: "Create new user",
  })
}

const loginUser = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "Login user",
  })
}

const renewToken = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "Renew",
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}
