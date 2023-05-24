const knex = {
    development: {
            client: 'mysql2',
            connection: {
              host : '127.0.0.1',
              port : 3306,
              user : 'root',
              password : '',
              database : 'cap-nodejs'
            },

            migrations: {
                tableName: "migartions",
                directory: '${__dirname}/migartions'

            }
    }
}

module.exports = knex