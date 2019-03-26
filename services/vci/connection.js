var { Pool } = require('pg');

const dbURL = "postgres://postgres:postgres@172.19.0.1:5432/vci" //TODO SHOULD BE IN A ENV FILE
const pool = new Pool( {connectionString: dbURL })



const getContagens = (request, response) => {
    pool.query('SELECT * FROM contagem', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}



const getTripsDistributions = (request, response) => {
    pool.query('SELECT * FROM tripdistribution', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })  
}

const getZoneCoords = (request, response) => {
    pool.query('SELECT * FROM tripdistribution', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
     })  
}


module.exports  = {
    getContagens,
    getTripsDistributions,
    getZoneCoords
}