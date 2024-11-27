import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); //dados para a conexão

const  getTodosPosts =  async () => {
    const db = conexao.db("InstaBytes"); //conexão com o BD do Mongo
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

const postFeito = async (novoPost) => {
    const db = conexao.db("InstaBytes"); //conexão com o BD do Mongo
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

const atualizarPost = async (id, novoPost) => {
    const db = conexao.db("InstaBytes"); //conexão com o BD do Mongo
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}

const imagemAtualizadaNoBanco = ( async(id, imagemNova) => {
    const db = conexao.db("InstaBytes"); //conexão com o BD do Mongo
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:{imgUrl: imagemNova}})
})

const postDeletado = async (id) => {
    const db = conexao.db("InstaBytes"); //conexão com o BD do Mongo
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.deleteOne({_id: new ObjectId(objID)});
}

export {getTodosPosts, postFeito, atualizarPost, postDeletado, imagemAtualizadaNoBanco};