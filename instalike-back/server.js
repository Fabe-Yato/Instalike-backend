import express from "express";
import routes from "./src/routes/posts.js";


const app = express();
app.use(express.static("uploads"))
routes(app);


app.listen(3000, () => {
    console.log("O servidor está rodando...");
});


// const posts = [
//     {
//         "id": 1,
//         "descricao": "Uma foto teste",
//         "imagem": "https://placecats.com/millie/300/158"
//     },
//     {
//         "id": 2,
//         "descricao": "Paisagem deslumbrante!",
//         "imagem": "https://source.unsplash.com/random/300x200"
//     },
//     {
//         "id": 3,
//         "descricao": "Cachorro fofo fazendo careta",
//         "imagem": "https://placeimg.com/300/200/animals"
//     },
//     {
//         "id": 4,
//         "descricao": "Citação inspiradora do dia",
//         "imagem": "https://picsum.photos/300/200"
//     },
//     {
//         "id": 5,
//         "descricao": "Comida deliciosa e colorida",
//         "imagem": "https://loremflickr.com/300/200/food"
//     },
//     {
//         "id": 6,
//         "descricao": "Viagem incrível para a praia",
//         "imagem": "https://picsum.photos/id/237/300/200"
//     }
// ]

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.get("/nome/:id", (req, res) => {
//     const nome = req.params.id 
//     res.status(200).send(`O seu nome é ${nome}`);
// });



// const buscarPorId = (id) => {
//     return posts.findIndex((post) => {
//         return post.id === Number(id);
//     })
// }

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPorId(req.params.id);
//     res.status(200).send(posts[index]);
// });

// app.get("/livro", (req, res) => {
//     const livro = {
//         titulo: "Senhor dos Anéis - A Sociedade do Anel",
//         autor: "J.R.R Tolkien",
//         ano_publicacao: 1954,
//         genero: "Fantasia",
//     }
//     res.status(200).send(livro);
// })
