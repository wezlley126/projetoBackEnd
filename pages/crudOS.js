import axios from 'axios';
import styles from './../styles/crud.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ordensServico() {

    const [inputs, setInputs] = useState({});
    const [ordens, setOrdens] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [clients, setClients] = useState(null);

    const cancelForm = (e) => {
        e.preventDefault();
    }

    const setInputsValues = async (statusOn, status, client, date, describe, cost) => {
        let statusInput = document.querySelector('#status')
        let clientInput = document.querySelector('#client')
        let dateInput = document.querySelector('#date')
        let describeInput = document.querySelector('#describe')
        let costInput = document.querySelector('#cost')

        if(statusOn) {
            statusInput.disabled = false;
        }else{
            statusInput.disabled = true;
        }

        statusInput.value = status
        clientInput.value = client
        dateInput.value = date
        describeInput.value = describe
        costInput.value = cost

    }

    const SubmitButton = () => {
        if(submit){
            return(
                <>
                <button onClick = {updateData} className = {styles.inputs}>Salvar Alterações</button>
                </>
            )
        }else{
            return(
                <>
                <button onClick = {insert} className = {styles.inputs}>Criar</button>
                </>
            )
        }
    }

    const inputsData = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
        console.log(inputs);
    }

    const getClients = async () => {
        const dataReceived = await axios.get('/api/users');
        setClients(dataReceived.data);
    }


    const getData = async () => {
        const dataReceived = await axios.get('/api/ordens');
        setOrdens(dataReceived.data)
    }

    const insert = async () => {
        const dataReceived = await axios.post('/api/ordens', inputs)
        console.log(dataReceived.data)
        setInputsValues(false, null, null, null, null, null)
        getData();
    }

    const getOrdem = async (e) => {
        const id = e.target.value
        const requestData = await axios.put(`/api/ordens?id=${id}`)
        const data = requestData.data
        setInputsValues(true, data.status, data.client, data.date, data.describe)
        setInputs(data);
        setSubmit(true)
    }

    const updateData = async () => {
        const dataRequest = await axios.post('/api/ordens', inputs)
        setInputsValues(false, null, null, null, null, null)
        getData()
    }

    const deleteData = async (e) => {
        const deleteRequest = e.target.value;
        const responseReceived = await axios.delete(`/api/ordens?id=${deleteRequest}`)
        console.log('Resposta recebida ----------> ', responseReceived)
        getData();
    }

    useEffect(() => {
        getClients();
        getData();
    }, [])



    if (!clients || !ordens || !inputs) return <h1>Loading...</h1>

    //console.log(findItemById('JiDs4Eub9eI53ExbmVMo', clients))

    return(
        <>
            <nav className = {styles.nav} >
                <Link className = {styles.links} href="/crudClients">Clientes</Link>
            </nav>
            <form className = {styles.addForm} onSubmit = {cancelForm}>
                <select id = 'status' disabled name = 'status' onChange = {inputsData} className = {styles.inputs}>
                    <option value = 'iniciado'>Iniciado</option>
                    <option value = 'em andamento'>Em andamento</option>
                    <option value = 'concluido'>Concluido</option>
                </select>
                <select id = 'client' onChange = {inputsData} name = 'client' className = {styles.inputs}>
                    <option value = 'Client1'>Client name</option>
                    {
                        clients.map(client => (
                            <option value = {client.id} key = {client.id}>{client.nome}</option>
                        ))
                    }
                </select>
                <input id = 'date' name = 'date' className = {styles.inputs} onChange = {inputsData} type = 'date' />
                <input id = 'describe' name = 'describe' className = {styles.inputs} onChange = {inputsData} type = 'text' placeholder = 'Descrição'/>
                <input id = 'cost' name = 'cost' className = {styles.inputs} onChange = {inputsData} type = 'text' placeholder = 'Custo estimado'/>
                <SubmitButton />
            </form>

            <div className = {styles.divTable}>
        <table className = {styles.tableData}>
            <thead>
                <tr>
                    <td>Alterar</td>
                    <td>Id</td>
                    <td>Status</td>
                    <td>Cliente</td>
                    <td>Data</td>
                    <td>Descrição</td>
                    <td>Custo</td>
                    <td>Deletar</td>
                </tr>
            </thead>
            <tbody>
                {
                    //<td>{findItemById(ordem.client, clients)}</td>
                    ordens.map(ordem => {
                        const client = clients.find(client => client.id === ordem.client);

                        return(
                            <tr key = {ordem.id}>
                            <td><button onClick = {getOrdem} value = {ordem.id} className = {styles.inputs} >Alterar</button></td>
                            <td>{ordem.id}</td>
                            <td>{ordem.status}</td>
                            <td>{client ? client.nome : 'Carregando...'}</td>
                            <td>{ordem.date}</td>
                            <td>{ordem.describe}</td>
                            <td>{ordem.cost}</td>
                            <td><button value = {ordem.id} onClick = {deleteData} className = {styles.inputs} >Deletar</button></td>
                        </tr>
                        )
                        })
                }
            </tbody>
        </table>
        </div>
        </>
    )
}