import React, { useEffect, useState } from 'react'

import firebase from '../Config/firebase'

function TodoList() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [todoList,setTodoList]=useState('')
    const [isUpdate,setUpdate]=useState(false)
    const [isKey,setIsKey]=useState('')

    useEffect(()=>{
        fetchData()
    },[])
    
    const fetchData=()=>
    {
        const itemRef=firebase.database().ref('todo')
        itemRef.on('value',((snapShot)=>{
            const todo=snapShot.val()
            const todoList=[]
            for(let id in todo){
                 todoList.push({id,...todo[id]})
            }
            setTodoList(todoList)
        }))   
        
    }

    const addHandle=()=>{
        const itemRef=firebase.database().ref('todo')
        if(isUpdate){
            itemRef.child(isKey).update({
                name,
                email,
                password
            })
            fetchData()
        }

        else if(!isUpdate){
          
       const  todo={
              name,
              email,
              password
          }
          itemRef.push(todo)
          fetchData()
        }
    }

    const handleUpdate=(key,name,email,password)=>{
        setIsKey(key)
        setUpdate(true)
        setName(name)
        setEmail(email)
        setPassword(password)
    }
    const handleDelete=(id)=>{
         const itemRef=firebase.database().ref('todo')
         itemRef.child(id).remove()
        
    }
    return (
        <div>
            <label for="name"><b>Name :</b></label>
            <input type='text' name='name' value={name} placeholder='Please enter name' onChange={(e)=>{setName(e.target.value)}}/><br></br>
            <label for="email"><b>Email :</b></label>
            <input type='email' name='email' value={email} placeholder='Please enter email address' onChange={(e)=>{setEmail(e.target.value)}}/><br></br>
            <label for="Password"><b>Password :</b></label>
            <input type='password' name='password' value={password} placeholder='Please enter password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button title={isUpdate?"Update":"Add"} onClick={addHandle}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                {todoList?todoList.map((e,i)=>(
                    <tr>
                        <th>{e.name}</th>
                        <th>{e.email}</th>
                        <th>{e.password}</th>
                       <th>{<button  onClick={()=>{handleUpdate(e.id,e.name,e.email,e.password)}}>Update</button>}</th>
                       <th>{<button  onClick={()=>{handleDelete(e.id)}}>Delete</button>}</th>
                    </tr>
                )):''}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList
