import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
function App() {
const [item,setitem]=useState("")

const [todolist,settodolist]=useState(()=>{
const localValue = localStorage.getItem("items")
if(localValue== null){return []}
else{return JSON.parse(localValue)}

})
const [editId,seteditId]=useState(null)
 
const addItem = ()=>{
if(!item.trim()){return}   
settodolist([...todolist,{
id:crypto.randomUUID(),
name:item,
isfinished:false

}])
setitem('')
document.querySelector('.input1').focus()
}//


const toggletodo=(id)=>{

  settodolist(todolist.map((todo)=>

    todo.id ===id ?{...todo,isfinished:!todo.isfinished}:todo 


  ))
}

const deleteTask=(id)=>{
settodolist(todolist.filter(todo=>todo.id !== id))

}

const startEdit =(task)=>{
seteditId(task.id)
setitem(task.name)
document.querySelector('.input1').focus()


}



const updateItem=()=>{
 settodolist(

  todolist.map(todo=>todo.id === editId?{...todo,name:item}:todo)
 )

 seteditId(null)
 setitem('')
 document.querySelector('.input1').focus()
}
useEffect(()=>{
  localStorage.setItem("items",JSON.stringify(todolist))
  console.log(todolist)
},[todolist])

  return (
    <section className=''> 

    <div  className='container-sm'>
    <p className=' text-muted display-1 shadow-sm text-center'> Todo List</p>
    <input className='input1 form-control form-control-lg shadow-lg mb-2' type="text" placeholder='task...' value={item} onChange={(e)=>setitem(e.target.value)}/>

<div className=''>
   {editId?(<button className='btn  btn-outline-primary m-2' onClick={updateItem}>update</button>):(<button className='btn btn-outline-primary m-2' onClick={addItem}>Add Task</button>)}
</div>
   
    
    <div>
    {todolist.map((task)=>{
      return(
        <div key={task.id} className='border mt-3 bg-muted col shadow-lg'>
          <div className=''>
            <input className='m-2' type="checkbox" checked={task.isfinished} onChange={()=>{toggletodo(task.id)}} />
             {task.isfinished?(<span  className='fw-bold m-2 '><del> {task.name}</del> </span> ): (<span className='fw-bold m-2 '> {task.name} </span>)}
          </div>
             
             <button className='btn btn-danger m-2 ' onClick={()=>deleteTask(task.id)}>delete</button>
             <button className='btn btn-primary ' onClick={()=>startEdit(task)}>update</button>
             

        </div>
    
      )
    })}
    </div>   
    
    </div>
    </section>
  )
}

export default App
