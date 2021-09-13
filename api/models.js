const db = require('../data/dbConfig')

const find = (filter) => {

    console.log(filter)

    return db('users').where('username', filter).first()

}

const insert = async (info) => {

    const [id] = await db('users').insert(info)
    return db('users').where({id}).first()
    
}

module.exports = {
    find,
    insert
}