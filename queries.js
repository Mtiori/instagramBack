const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'instagram',
  password: '123456',
  port: 5432, 
})

const createTablePost = () => {  
    pool.query('CREATE TABLE if not exists post (id serial primary key, nome varchar(255), linkfotoperfil varchar(255), descricaodopost varchar(255), imagemdopost varchar(255), quantidadedelikenopost int );', (error) =>{
        if (error){
            throw error;
        }
    })
}

const getPosts = (request, response) => {
    pool.query('SELECT * FROM post ORDER BY id ASC', (error, result)=>{
        if (error){
            throw error;
        }
        response.status(200).json(result.rows);
    })
}

const getPostById = (request, response)=>{
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM post WHERE id = $1', [id], (error, result) =>{//$1 é semelhante ao ? que contem em outros selects.
        if (error){
            throw error;
        }
        
        response.status(200).json(result.rows);
    })

    
}

const createPost = (request, response)=>{
    const {nome, linkfotoperfil, descricaodopost, imagemdopost, quantidadedelikenopost} = request.body;
    pool.query('INSERT INTO post (nome, linkfotoperfil, descricaodopost, imagemdopost, quantidadedelikenopost) values($1, $2, $3, $4, $5) returning id', [nome, linkfotoperfil, descricaodopost, imagemdopost, quantidadedelikenopost], (error, result) => {
        if (error){
            throw error;
        }
        
        response.status(201).send(`Post ${result.rows[0].id} adicionado `);
    })

}

const updatePost = (request, response) => {
    const id = parseInt(request.params.id);
    const {nome, linkfotoperfil, descricaodopost, imagemdopost, quantidadedelikenopost} = request.body;

    pool.query(
        'UPDATE post SET nome = $1, linkfotoperfil = $2, descricaoDoPost = $3, imagemDoPost = $4, quantidadeDeLikeNoPost = $5 WHERE id=$6',
        [nome, linkfotoperfil, descricaodopost, imagemdopost, quantidadedelikenopost, id],
        (error, result) =>{
            if (error){
                throw error;
            }
            response.status(200).send(`Post modificado com ID: ${id}`);
        }
    )
}

const deletePost = (request, response) =>{
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM post WHERE id = $1', [id], (error, results)=>{
        if (error){
            throw error;
        }
        response.status(200).send(`Post deletado com ID: ${id}`);
    })
}

const deleteAllPosts = (request, response) => {
        pool.query('DELETE FROM post where id>0', (error, result)=>{
            if (error){
                throw error;
            }
            response.status(200).send(`Todos os posts foram deletados.`);
        })
}


module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    deleteAllPosts,
    createTablePost,
}