import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Sparkle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleNewTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [upDateTaskTitle, setUpDateTaskTitle] = useState(task.title || "");
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa task thành công");
      handleNewTask();
    } catch (err) {
      console.error("Lỗi khi xóa task", err);
      toast.error("Lỗi khi xóa task");
    }
  };
  const updateTask = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: upDateTaskTitle,
      });
      toast.success("Cập nhật task thành công");
      handleNewTask();
      setIsEditing(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật task", err);
      toast.error("Lỗi khi cập nhật task");
    }
  };
  const toggleTaskStatus = async () => {
    try{
        if(task.status === "active"){
            await api.put(`/tasks/${task._id}`,{
                status: "complete",
                completedAt: new Date()
            })
            toast.success("Task đã hoàn thành")
        }
        else{
            await api.put(`/tasks/${task._id}`,{
                status: "active",
                completedAt: null
            })
            toast.success("Task đã chuyển về trạng thái đang hoạt động")
        }
    }
    catch(err){
        console.error("Lỗi khi cập nhật trạng thái task", err);
        toast.error("Lỗi khi cập nhật trạng thái task");
    }
    handleNewTask()
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4 ">
        {/* nut tron */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskStatus}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/* hien thi hoc chinh sua tieu de */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="What need to  do"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={upDateTaskTitle}
              onChange={(e) => setUpDateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpDateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          {/* ngay to va ngay hoan thanh */}
          <div className="flex  items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Create at: {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className=" text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Complete at: {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* edit and delete button */}
        <div className=" hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* edit */}
          <Button
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsEditing(true);
              setUpDateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* delete */}
          <Button
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
