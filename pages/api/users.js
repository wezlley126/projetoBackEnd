import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function handler(req, res){

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

const firebaseConfig = {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
    appId: process.env.FIRE_APP_ID
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

if(req.method == 'GET'){
    let data = {};

    const getClients = async () => {
        const dataResponse = await getDocs(collection(db, "clients"));
        /* res.status(200).json(dataResponse) */
        dataResponse.forEach((doc) => {
          data[doc.id] = doc.data();
        })
        res.status(200).json(data)
      }

      getClients()
}

else if(req.method == 'POST'){
    const insert = async (nome, endereco, telefone, email) => {
        const retorno = await addDoc(collection(db, 'clients'), {
            nome: nome,
            endereco: endereco,
            telefone: telefone,
            email: email
        })
        if(retorno.id != undefined){
          console.log('Cliente adicionado com o id:', retorno.id)
          res.status(201).json('Usuário criado com sucesso');
        }else{
          res.status(200).json('Erro ao adicionar o usuário no banco')
        }
    }
    insert('terraria', 'la ele', 'sobe', 'laele.sexo@laele')
    //res.status(200).json('Olá mundo POST')
}

else if(req.method == 'PUT'){
    const update = async (id, nome, endereco, telefone, email) => {
        const idClient = 'yBwLk9TYW7VuP6bkKxon'
        const valid_usuario = doc(db, "clients", idClient);

        await updateDoc(valid_usuario, {
            nome: 'weslley akakakakakakaka',
            email: 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvviado'
        }).then(() => {
            res.status(200).json('Dados alterados com sucesso')
        })
    }
    update()
}

else if(req.method == 'DELETE'){
    const deleto = async () => {
        const idClient = 't44yBviblGJyz4eQquZ9'
        const valid_usuario = doc(db, "clients", idClient);

        await deleteDoc(valid_usuario).then(() => {
            res.status(200).json('Usuário foi fumar cigarro');
        })
    }
    deleto()
}

}