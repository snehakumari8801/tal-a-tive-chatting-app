const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id} , 'snehak',{
        expiresIn:'30d'
    })
}

module.exports = generateToken;