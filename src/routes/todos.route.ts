import { Router } from "express";

import {
  createToDo,
  deleteToDo,
  getAllToDo,
  getTodoById,
  updateTodo,
} from "../controller/todos.controller";

const router = Router();

router.post("/create", createToDo);

router.get("/get-all-todo", getAllToDo);

router.get("/get-by-todo-id/:id", getTodoById);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteToDo);

export default router;
