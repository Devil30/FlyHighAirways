const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database');
const queryWrappers = require('../utils/query-wrappers');
const sequelizeErrors = require('../utils/sequelize-errors');
const parseError = require('../utils/parse-error');
const {validationResult} = require('express-validator/check');

const {auth: {User}} = require('../models');

exports.register = (req, res, next) => {
    console.log("here");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("Validation Failed!");
        err.statusCode = 422;
        err.data = errors.array();
        throw err;
    }

    const {email, password, first_name, last_name} = req.body;
    const tableName = User.getTableName();

    const wrappedValues = queryWrappers.wrapAllValues({email:email, password:password, first_name:first_name,
        last_name: last_name});

    const query = `INSERT INTO ${tableName} ("email","password","first_name","last_name")
                    VALUES (${wrappedValues.email} , 
                            ${wrappedValues.password} , 
                            ${wrappedValues.first_name} , 
                            ${wrappedValues.last_name}
                            )
                   `;

    console.log(query);

    sequelize.query(query).then(([result, metaData])=>{
        console.log("RESULT",result);
        console.log("META", metaData);
        res.status(201).json({message: "Ha Ha!"});
    }).catch(err=>{

        const data = sequelizeErrors(err);
        const message = "Invalid Data!";
        const error = new Error();
        error.statusCode = 422;
        error.message = message;
        error.data = parseError(data);
        next(error);
    });



};