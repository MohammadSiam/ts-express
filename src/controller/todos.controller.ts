import { RequestHandler } from "express";
import {
  createTodo,
  deleteTodoById,
  getTodoAll,
  getToDoById,
  updatedTodoService,
} from "../services/todo.service";

export const createToDo: RequestHandler = async (req, res, next) => {
  try {
    const savedTodo = await createTodo(req.body);
    return res
      .status(200)
      .json({ message: "Todo created successfully", data: savedTodo });
  } catch (error) {
    next(error);
  }
};

export const deleteToDo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Call the service to delete the to-do item by ID
    const removedTodo = await deleteTodoById(parseInt(id));

    // Return a JSON response with the removed to-do item
    return res
      .status(200)
      .json({ message: "Todo deleted successfully", data: removedTodo });
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

export const getAllToDo: RequestHandler = async (req, res, next) => {
  try {
    const allTodos = await getTodoAll();
    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: allTodos });
  } catch (error) {
    next(error);
  }
};

export const getTodoById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getTodo = await getToDoById(parseInt(id));

    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: getTodo });
  } catch (error) {
    next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTodo = await updatedTodoService(parseInt(id), req.body);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res
      .status(200)
      .json({ message: `Todo updated successfully${id}`, data: updatedTodo });
  } catch (error) {
    next(error);
  }
};
