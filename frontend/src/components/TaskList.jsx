import React from 'react'
import TaskEmptyState from './TaskEmptyState'
import TaskCard from './TaskCard'

const TaskList = ({filteredTasks, filter, handleNewTask}) => {
  // const filterTask = [
  //   {
  //     id:"1",
  //     title: "hoc react",
  //     status: "active",
  //     completedAt: null,
  //     createAt: new Date()
  //   },  {
  //     id:"2",
  //     title: "hoc Vue",
  //     status: "complete",
  //     completedAt: new Date(),
  //     createAt: new Date()
  //   }
  // ]
  if(!filteredTasks || filteredTasks.length===0 ){
    return(
      <TaskEmptyState filter={filter}/>
    )
  }
  return (
    <div className='space-y-3'>
      {filteredTasks.map((task,index)=>{
       return(
         <TaskCard key={task.id}
        task={task}
        index= {index}
        handleNewTask={handleNewTask}
        />
       )
      })}
    </div>
  )
}

export default TaskList