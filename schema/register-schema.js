const { check, validationResult }  = require( "express-validator");

const registerSchema=[
    check('description').notEmpty().withMessage('Description is required'),
    check('size').isEmpty().isInt().withMessage('Size is required'),
    check('photo').isEmpty().withMessage('Photo is required'),
];

module.exports=registerSchema;

