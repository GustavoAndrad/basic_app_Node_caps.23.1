const knex = require("../database/knex")
const { v4 } = require("uuid")
const bcrypt = require("bcryptjs")

module.exports = {
    async findAll(req, res) {
        try { 
            const users = await knex('users').select("id","name", "email")
            return res.json(users)
        } catch (error) {
            return res.json(error)
        }
    }, 

    async create(req, res) {
        const {email, name, password} = req.body
        try{
            const user = await knex("users").select("*").where({email}).first()

            if(user){
                return res.json({"message": "Usuário já existe"})
            }
            const hash = await bcrypt.hash(password, 10)

            await  knex("users").insert({
                id: v4(),
                email,
                name,
                password: hash
            })

            return res.json({"message" : "Usuário criado com sucesso"})
        }catch(error){
            return res.json(error)
        }
    },

    async update(req, res){
        const { id } = req.params
        const userUpdate = req.body

        try{
            const user = await knex("users").select("*").where({id}).first()
            if(!user){
                return res.json({"message" : "Usuário não existe"})
            }
            if(userUpdate.password){
                userUpdate.password = await bcrypt.hash(userUpdate.password, 10)
            }
            await knex("users").update(userUpdate).where({id})

            return res.json({"message" : "Usuário atualizado"})
        } catch(error){
            return res.json(error)

        }

    },

    async delete(req,res){
        const { id } = req.params

        try{
            const user = await knex("users").select("*").where({id}).first()
            
            if(!user){
                return res.json({"message" : "Usuário não existe"})
            }

            await knex("users").delete().where({id})
            return res.json({"message" : "Usuário deletado"})
        
        } catch(error){
            return res.json(error)

        }
    },

    async findOne(req,res){
        const { id } = req.params

        try{
            const user = await knex("users").select("id","name","email").where({id}).first()
            if(!user){
                return res.json({"message" : "Usuário não existe"})
            }

            return res.json(user)
        }catch(error){

        }
    }
}