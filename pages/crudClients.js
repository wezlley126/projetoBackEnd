import axios from 'axios';
import styles from './../styles/crud.module.css';
import { useState, useEffect } from 'react';

export default function clients() {

    const [users, setUsers] = useState(null);
    const [inputs, setInputs] = useState({});
    const [submit, setSubmit] = useState(false)
    //const [dataTable, setDataTable] = useState(null);

    const cancelForm = (e) => {
        e.preventDefault();
    }

    const setInputsValues = async (nome, email, telefone, endereco) => {
        let nomeInput = document.querySelector('#nome')
        let emailInput = document.querySelector('#email')
        let telefoneInput = document.querySelector('#telefone')
        let enderecoInput = document.querySelector('#endereco')

        telefoneInput.value = telefone
        enderecoInput.value = endereco
        emailInput.value = email
        nomeInput.value = nome

    }

    const SubmitButton = () => {
        if(submit){
            return(
                <>
                <button onClick = {updateUser} className = {styles.inputs}>Salvar Alterações</button>
                </>
            )
        }else{
            return(
                <>
                <button onClick = {insertUsers} className = {styles.inputs}>Criar usuário</button>
                </>
            )
        }
    }

    // ---------------------- GET ----------------------

    const getUsers = async () => {

        const response = await axios.get(`/api/users`)
        setUsers(response.data); 
    }

    // ---------------------- POST ----------------------

    const inputsData = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const insertUsers = async () => {
        if(inputs == null){
            console.log('Preencha os campos corretamente')
        }else{
            const sendData = {
                nome: inputs.nome,
                endereco: inputs.endereco,
                telefone: inputs.telefone,
                email: inputs.email
            }
            if(sendData.nome && sendData.endereco && sendData.telefone && sendData.email){
                const response = await axios.post('/api/users', sendData)
                console.log('Dados enviados: ', response.data)
                getUsers()
            }else{
                console.log('Prencha o formulário com os dados nescessários')
            }
        }
    }
    
    // ---------------------- PUT ----------------------

    const getUser = async (e) => {
        // Pega os dados do usuário do botaõ Alterar
        const idUser = {idUser: e.target.value}
        const dataReceived = await axios.put('/api/users', idUser)
        //console.log(dataReceived.data)
        setInputsValues(dataReceived.data.nome, dataReceived.data.email, dataReceived.data.telefone, dataReceived.data.endereco)
        setInputs(dataReceived.data)
        setSubmit(true);
        
    }

    const updateUser = async () => {
        const updateResponse = await axios.post(`/api/users`, inputs)
        console.log(updateResponse.data)
        setSubmit(false)
        getUsers()
        setInputsValues(null, null, null, null)
        setInputs(null)
    }

    // ---------------------- DELETE ----------------------

    const dropUsers = async (e) => {
        const response = await axios.delete(`/api/users?idUser=${e.target.value}`)
        getUsers()
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (!users) return <h1>Aguardando...</h1>

    return(
        <>
        <form className = {styles.addForm} onSubmit = {cancelForm}>
            <input id = 'nome' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'nome' placeholder = 'Nome' required />
            <input id = 'email' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'email' placeholder = 'Email' required />
            <input id = 'telefone' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'telefone' placeholder = 'Telefone' required />
            <input id = 'endereco' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'endereco' placeholder = 'Endereço' required />
            <SubmitButton />
        </form>

        <div className = {styles.divTable}>
        <table className = {styles.tableData}>
            <thead>
                <tr>
                    <td>Alterar</td>
                    <td>Id</td>
                    <td>Nome</td>
                    <td>Email</td>
                    <td>Telefone</td>
                    <td>Endereco</td>
                    <td>Deletar</td>
                </tr>
            </thead>
            <tbody>
            {
                    users.map(user => (
                        <tr key={user.id}>
                            <td><button onClick = {getUser} value = {user.id} className = {styles.inputs}>Alterar</button></td>
                            <td>{user.id}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.telefone}</td>
                            <td>{user.endereco}</td>
                            <td><button onClick = {dropUsers} value = {user.id} className = {styles.inputs}>Deletar</button></td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div>
        </>
    )
}