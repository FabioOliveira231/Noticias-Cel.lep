




const app = require('./config/server')

const noticias = require('./mockup')

app.listen(3000, () => {
    console.log('Servidor rodando com express na porta 3000')
})

// Rota HOME
app.get('/', (req, res) => {
    // o EJS disponibiliza o metodo render
    // nas respostas das requisições 
    res.render('home/index', {noticias: noticias.slice(0, 3)})
})
// Rota Noticias
app.get('/noticias',(req, res) => {
    res.render('noticias/noticias', {noticias:noticias})
})

// Rota Noticia
app.get("/noticia", (req, res)=>{
    //recupera Id noticia por get
    const id = req.query.id
    res.render('noticias/noticia', {noticia: noticias[id]})
})

// Rota Admin
app.get('/admin',(req, res) => {
    res.render('admin/form_add_noticias')
})