// Primeira etapa iniciar o npm ( npm init)
//git init
//npm install express
//npm install -g nodemon 
//npm install ejs
//npm install pg (POSTGRESQL)
//npm install express-session


const app = require('./config/server')

const noticias = require('./mockup')

const db = require('./config/dbConnection')



app.listen( process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express na porta 3000')
})

// Rota HOME
app.get('/', (req, res) => {
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3', function(error, result){
        //  console.log(result.rows)
        // o EJS disponibiliza o metodo render
        // nas respostas das requisições 
        res.render('home/index', {noticias: result.rows})
    })    
})
// Rota Noticias
app.get('/noticias',(req, res) => {
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC', (error, result)=>{
        res.render('noticias/noticias', {noticias: result.rows})

    })
})

// Rota noticia
app.get("/noticia", (req, res)=>{
    //recupera Id noticia por get
    const id = req.query.id
    db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id],
        (error, result)=>{
        res.render('noticias/noticia', {noticia: result.rows[0]})
    })
})

// Rota Admin
app.get('/admin',(req, res) => {
    if(req.session.autorizado){
        res.render('admin/form_add_noticias', {autorizado: req.session.autorizado})
    } else{
        res.render('admin/login')
    }
})

//Rota responsavel por salvar as noticias
app.post('/admin/salvar-noticia', (req, res)=>{
    //Recuperação passadas por POST
    let {titulo, conteudo} = req.body

    db.query('INSERT INTO noticias(titulo, conteudo) VALUES($1, $2)',
    [titulo, conteudo], (error, result)=>{
        res.redirect('/noticias')
    }) 
})

//Rota responsável de autenticar o usuário
app.post('/admin/autenticar', (req, res) => {
    const{usuario, senha} = req.body

    if(usuario==='root' && senha === 'cellep1234'){
        req.session.autorizado = true
    }
    res.redirect('/admin')
})

//Rota de saida do edição admin
app.get('/admin/sair', (req, res)=>{
    req.session.destroy((err)=>{})
    res.redirect('/admin')
})