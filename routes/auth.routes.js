const { Router } = require("express")
const { check } = require("express-validator")
const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/auth.controller")
const { validateJWT } = require("../middlewares/validate-token")
const { validateFields } = require("../middlewares/validator-fields")

const router = Router()

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio" ).not().isEmpty(),
    check("email", "El email es oblighatorio").isEmail(),
    check("password", "La contraseña es obligatoria")
      .isLength({ min: 6 }),
    validateFields,
  ],
  createUser
)

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria")
      .isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
)

router.get("/renew",validateJWT ,renewToken)

module.exports = router
