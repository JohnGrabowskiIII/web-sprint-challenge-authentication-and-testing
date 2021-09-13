const db = require('../data/dbConfig')

const insert = async (info) => {

    const [id] = await db('users').insert(info)
    return db('users').where({id}).first()
    
}

module.exports = {
    insert
}