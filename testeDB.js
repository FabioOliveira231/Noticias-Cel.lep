//npm install pg
//importa somente a classe Cliente da bibloteca pg o metodod desestruturação
const { Client } = require('pg')

const client = new Client({
    connectionString: 'postgres://hqftqvbajetucr:2190e4bfef95fdda56be5e421c67da935f8f754e4e7d2664d05a7b96672be047@ec2-34-193-101-0.compute-1.amazonaws.com:5432/d86j57r8vmb58p',
    ssl:{
        rejectUnauthorized: false
    } 

})

client.connect()

function connectTeste(){
    client.query('select $1:: text as message', ['Olá Mundo!'], 
    function(error, result){
        console.log(result.rows[0].message)

    })
}

connectTeste()