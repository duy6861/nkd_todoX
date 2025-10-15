import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({handleNewTask}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const addTask = async ()=>{
    if(newTaskTitle || newTaskTitle.trim().length>0){
      try{
        await api.post("/tasks",{
          title: newTaskTitle
        })
        toast.success("Thêm task thành công")
        handleNewTask()
        
      }
      catch(err){
        console.error("Lỗi khi thêm task", err)
        toast.error("Lỗi khi thêm task")
      }
      setNewTaskTitle("")
    }
    else{
      toast.error("bạn chưa nhập tiêu đề")
    }
  }
  const onKeyPress= (e)=>{
    if(e.key === "Enter"){
      addTask()
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
        type="text"
        placeholder="What need to do?"
        className="h-12 text-base sm:flex-1 bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20 "
        value={newTaskTitle}
        onChange={(e)=>setNewTaskTitle(e.target.value)}
        onKeyDown={onKeyPress}
        />
        <Button
        variant="gradient"
        size="xl"
        className="px-7"
        onClick={addTask}
        disabled={!newTaskTitle.trim()}
        >
          <Plus className='size-5'/>
          ADD</Button>
      </div>
    </Card>


  )
}

export default AddTask