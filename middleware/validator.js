const { check, validationResult } = require('express-validator')
const userValidationRules = () => {
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
    check('listingID').notEmpty().withMessage('Listing ID is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('size').notEmpty().isFloat().withMessage('Size is required'),
    check('photo').notEmpty().withMessage('Photo is required'),
  ]
}

const messageValidationRules = () => {
  return [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
    check('sender_ID').notEmpty().withMessage('SenderID is required'),
  ]
}

const listingValidationRules = () => {
  return [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('floor').notEmpty().withMessage('Floor is required'),
    check('floor_no').notEmpty().withMessage('Floor number is required'),
    check('price').notEmpty().withMessage('Price is required'),
    check('street').notEmpty().withMessage('Street is required'),
    check('house_no').notEmpty().withMessage('House number is required'),
    check('door_no').notEmpty().withMessage('Door number is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('postal_code').notEmpty().withMessage('Postal code is required'),
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
  validate,
}