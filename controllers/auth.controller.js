const { response } = require("express")

const createUser = (req, res = response) => {
  const { email, name, password } = req.body
  console.log(email, name, password)

  return res.json({
    ok: true,
    msg: "Create new user",
  })
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  return res.json({
    ok: true,
    msg: "Login user",
  })
}

const renewToken = (req, res) => {
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
