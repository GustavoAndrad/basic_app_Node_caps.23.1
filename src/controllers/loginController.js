const bcrypt = require("bcryptjs")
const knex = require("../database/knex")
const jwt = require("jsonwebtoken")

module.exports = {
    async login(req,res){
        const{ email,password } = req.body
        try{
            const user = await knex("users").select("*").where({email}).first()
            if(!user){
                return res.json({"message" : "Usiário não existe"})
            }
            const verifyPassword = await bcrypt.compare(password, user.password)
            if(!verifyPassword){
                return res.json({"message" : "Srnha incorreta!"})
            }

            const token = jwt.sign({
                name: user.name,
                email: user.email,
                id: user.id
            }, "123", {expiresIn: "48h"}) //ideal ter variavel de ambiente para criptografar

        return res.json({"token": token})
        }catch(error){

        }
    }
}