import axios from 'axios';
import styles from './../styles/crud.module.css';
import { useState, useEffect } from 'react';

export default function ordensServico() {

    const [inputs, setInputs] = useState({});
    const [clients, setClients] = useState(null);

    const cancelForm = (e) => {
        e.preventDefault();
    }

    const inputsData = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
        console.log(inputs);
    }

    const getClients = async () => {
        const dataReceived = await axios.get('/api/users');
        setClients(dataReceived.data);
    }

    useEffect(() => {
        getClients()
    }, [])

    if (!clients) return <h1>Loading...</h1>

    return(
        <>
            <form className = {styles.addForm} onSubmit = {cancelForm}>
                <select disabled name = 'status' onChange = {inputsData} className = {styles.inputs}>
                    <option value = 'iniciado'>Iniciado</option>
                    <option value = 'em andamento'>Em andamento</option>
                    <option value = 'concluido'>Concluido</option>
                </select>
                <select name = 'client' className = {styles.inputs}>
                    <option value = 'Client1'>Client name</option>
                    {
                        clients.map(client => (
                            <option value = {client.id} key = {client.id}>{client.nome}</option>
                        ))
                    }
                </select>
                <input name = 'date' className = {styles.inputs} onChange = {inputsData} type = 'date' />
                <input name = 'describe' className = {styles.inputs} onChange = {inputsData} type = 'text' placeholder = 'Descrição'/>
                <input name = 'cost' className = {styles.inputs} onChange = {inputsData} type = 'text' placeholder = 'Custo estimado'/>
                <button className = {styles.inputs}>Criar</button>
            </form>
        </>
    )
}