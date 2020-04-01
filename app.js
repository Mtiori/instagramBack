const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./queries');
const cors = require('cors');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(cors());

app.get('/', (request, response) => {
    response.json({info: 'Bem vindo ao instagram'});
})

db.createTablePost();
app.get('/posts', db.getPosts);
app.get('/posts/:id', db.getPostById);
app.post('/posts', db.createPost);
app.put('/posts/:id', db.updatePost);
app.delete('/posts/:id', db.deletePost);
app.delete('/posts', db.deleteAllPosts);

app.listen(port, ()=>{
    // class Usuarios {
    //     constructor(id, nome, linkFotoPerfil, idade){
    //          this.id = id;
    //          this.nome = nome;
    //          this.linkFotoPerfil = linkFotoPerfil;
    //          this.idade = idade; 
    //     } 
    // }
    
   console.log(`Aplicativo rodando na porta ${port}`);
})
