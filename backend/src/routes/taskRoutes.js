import express from 'express';
import {getAllTasks , createTask, updateTask, deleteTask} from '../controllers/tasksControllers.js';
const route = express.Router()
route.get("/", getAllTasks)
route.post("/", createTask)
route.put("/:id", updateTask)
route.delete("/:id", deleteTask)
export default route;