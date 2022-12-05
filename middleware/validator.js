const { check, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    check('username').notEmpty().withMessage('Username or email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('first_name').notEmpty().withMessage('First name is required'),
    check('last_name').notEmpty().withMessage('Last name is required'),
    check('email').notEmpty().isEmail().toLowerCase().withMessage('Valid email is required'),
    check('phone').notEmpty().withMessage('Phone is required'),
    check('sex').notEmpty().withMessage('Sex is required'),
    check('role').isEmpty().withMessage('Not allowed to specify role'),
  ]
}

const userUpdateValidationRules = () => {
  return [
    check('_id').notEmpty().withMessage('Id is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('first_name').notEmpty().withMessage('First_name is required'),
    check('last_name').notEmpty().withMessage('Last_name is required'),
    check('email').notEmpty().isEmail().toLowerCase().withMessage('Valid email is required'),
    check('phone').notEmpty().withMessage('Phone is required'),
    check('sex').notEmpty().withMessage('Sex is required'),
    check('role').isEmpty().withMessage('Not allowed to specify role'),
  ]
}

const userUpdateAdminValidationRules = () => {
  return [
    check('_id').notEmpty().withMessage('Id is required'),
  ]
}

const adminValidationRules = () => {
  return [
    check('username').notEmpty().withMessage('Username or email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('first_name').notEmpty().withMessage('First_name is required'),
    check('last_name').notEmpty().withMessage('Last_name is required'),
    check('email').notEmpty().isEmail().toLowerCase().withMessage('Valid email is required'),
    check('phone').notEmpty().withMessage('Phone is required'),
    check('sex').notEmpty().withMessage('Sex is required'),
  ]
}

const roomValidationRules = () => {
  return [
    check('infoPanel').notEmpty().withMessage('infoPanel is required'),
  ]
}

const searchValidationRules = () => {
  return [
    check('minprice').notEmpty().withMessage('infoPanel is required'),
    check('maxprice').notEmpty().withMessage('infoPanel is required'),
    check('minrooms').notEmpty().withMessage('infoPanel is required'),
    check('maxrooms').notEmpty().withMessage('infoPanel is required'),
    check('minsize').notEmpty().withMessage('infoPanel is required'),
    check('maxsize').notEmpty().withMessage('infoPanel is required'),
  ]
}

const messageValidationRules = () => {
  return [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
    check('sender_ID').isEmpty().withMessage('SenderID not allowed'),
  ]
}

const listingValidationRules = () => {
  return [
    check('title').notEmpty().withMessage('Title is required'),
    check('street').notEmpty().withMessage('Street is required'),
    check('city').notEmpty().withMessage('Floor is required'),
    check('house_no').notEmpty().withMessage('Floor number is required'),
    check('postal_code').notEmpty().withMessage('Price is required'),
    check('year_of_construction').notEmpty().withMessage('Street is required'),
    check('living_space').notEmpty().withMessage('House number is required'),
    check('no_of_floors').notEmpty().withMessage('Door number is required'),
    check('price').notEmpty().withMessage('City is required'),
    check('ground_size').notEmpty().withMessage('Postal code is required'),
    check('energy_level').notEmpty().withMessage('Postal code is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('property_type').notEmpty().withMessage('Street is required'),
    check('agentID').isEmpty().withMessage('Not allowed to specify agent ID'),
    check('trafficScore').isEmpty().withMessage('Not allowed to specify Traffic Score'),
    check('room').isEmpty().withMessage('Not allowed to specify time on market'),
  ]
}

const loginValidationRules = () => {
  return [
    check('username').notEmpty().withMessage('Username or email is required'),
    check('password').notEmpty().withMessage('Password is required')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  roomValidationRules,
  messageValidationRules,
  listingValidationRules,
  loginValidationRules,
  adminValidationRules,
  userUpdateValidationRules,
  userUpdateAdminValidationRules,
  searchValidationRules,
  validate,
}