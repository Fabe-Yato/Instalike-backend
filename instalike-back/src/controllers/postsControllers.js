import fs from "fs";
import {getTodosPosts, postFeito, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

const listarPosts = ( async (req, res) => {
    const posts = await getTodosPosts()
    res.status(200).json(posts); //json para transformar posts em objetos 
})

const criarPosts = ( async (req, res) => {
    const novoPost = req.body;
    try{
        const postCriado = await postFeito(novoPost);
        res.status(200).json(postCriado);
    }catch(e){
        console.error(e);
        res.status(500).json({"erro": "A requisição falhou!"});
    }
});

const uploadImagem = ( async (req, res) => {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try{
        const postCriado = await postFeito(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }catch(e){
        console.error(e);
        res.status(500).json({"erro": "A requisição falhou!"});
    }
});

const atualizarNovoPost = ( async (req, res) => {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    }catch(e){
        console.error(e);
        res.status(500).json({"erro": "A requisição falhou!"});
    }
});

export {listarPosts, criarPosts, uploadImagem, atualizarNovoPost};