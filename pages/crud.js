import axios from 'axios';
import styles from './../styles/crud.module.css';
import { useState, useEffect } from 'react';

export default function clients() {

    const [users, setUsers] = useState(null);
    const [inputs, setInputs] = useState({});
    const [submit, setSubmit] = useState(true)
    //const [dataTable, setDataTable] = useState(null);

    const cancelForm = (e) => {
        e.preventDefault();
    }

    const SubmitButton = () => {
        if(submit){
            return(
                <>
                <button onClick = {updateUSer} className = {styles.inputs}>Salvar Alterações</button>
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
        //console.log(inputs)
    }

    const insertUsers = async () => {
        const teste = {
            nome: inputs.nome,
            endereco: inputs.endereco,
            telefone: inputs.telefone,
            email: inputs.email
        }
        const response = await axios.post('/api/users', teste)
        console.log('Dados enviados: ', response.data)
        getUsers()
    }
    
    // ---------------------- PUT ----------------------

    const getUser = async (e) => {
        // Pega os dados do usuário do botaõ Alterar
        const idUser = {idUser: e.target.value}
        const dataReceived = await axios.put('/api/users', idUser)
        console.log(dataReceived.data)
        
        // Alterar os inputs para os valores recebidos
        let nome = document.querySelector('#nome')
        let email = document.querySelector('#email')
        let telefone = document.querySelector('#telefone')
        let endereco = document.querySelector('#endereco')
        let submit = document.querySelector('#submit')

        nome.value = dataReceived.data.nome
        email.value = dataReceived.data.email
        telefone.value = dataReceived.data.telefone
        endereco.value = dataReceived.data.endereco
        submit.innerHTML = 'Salvar alterações'
        
    }

    const updateUSer = async () => {
        console.log('Olá mundo ---------------->')
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
            <input id = 'nome' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'nome' placeholder = 'Nome' />
            <input id = 'email' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'email' placeholder = 'Email' />
            <input id = 'telefone' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'telefone' placeholder = 'Telefone' />
            <input id = 'endereco' className = {styles.inputs} type = 'text' onChange = {inputsData} name = 'endereco' placeholder = 'Endereço' />
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