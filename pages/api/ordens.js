import db from './firebase.js';
import { 
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
    } from "firebase/firestore";

export default function handler(req, res) {

    const getClients = async () => {
        console.log(process.env.CLIENTS_COLLECTION)
        res.json('Olá mundo')
    }

    getClients();

}