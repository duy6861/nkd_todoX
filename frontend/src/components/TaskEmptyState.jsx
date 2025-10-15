import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
    className="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
    >
        <Circle
        className='size-12 mx-auto text-muted-foreground'
        />
        <div>
            <h3 className='font-medium text-foreground'>
                {
                    filter === "active" ? "There are no tasks currently running.": filter =="complete" 
                    ? "No tasks have been completed.": "No tasks available."
                }
            </h3>
            <p className='text-sm text-muted-foreground capitalize'>
                {
                    filter==="all" ?"Add first task":"get all"
                }
            </p>
        </div>
    </Card>
  )
}

export default TaskEmptyState