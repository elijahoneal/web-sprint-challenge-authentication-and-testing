const Users = require('../jokes/jokes-users-model')

const checkCredentials = (req, res, next) => {
    const { username , password } = req.body

    if(!username || !password){
        res.json({message: "username and password required"})
    } else {
        next()
    }
}

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body
   await Users.findBy({username})
    .then((user) => {
        if(user.username){
            res.json({message: "username taken"})
        } else {
            next()
        }
    })

}

module.exports = {
    checkCredentials,
    checkUsernameExists
}