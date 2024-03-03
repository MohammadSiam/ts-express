import { getRepository } from "typeorm";
import { Todos } from "../models/todos.model";

export const createTodo = async (todoData: any) => {
  const todosRepository = getRepository(Todos);
  const newTodo = todosRepository.create(todoData);
  const savedTodo = await todosRepository.save(newTodo);
  return savedTodo;
};

export const deleteTodoById = async (id: number): Promise<any> => {
  try {
    const todosRepository = getRepository(Todos);

    // Find the to-do item to remove
    const todoToRemove = await todosRepository.findOneBy({ id });
    if (!todoToRemove) {
      throw new Error("Todo not found");
    }
    // Remove the to-do item from the database
    const removedTodo = await todosRepository.remove(todoToRemove);
    return removedTodo;
  } catch (error) {
    throw error;
  }
};

export const getTodoAll = async () => {
  const todosRepository = getRepository(Todos);
  const allTodos = await todosRepository.find();
  return allTodos;
};

export const getToDoById = async (id: number): Promise<any> => {
  const todosRepository = getRepository(Todos);
  const todo = await todosRepository.findOneBy({ id });
  return todo;
};

export const updatedTodoService = async (
  id: number,
  Body: any
): Promise<any> => {
  try {
    const todosRepository = getRepository(Todos);
    const updateTodo = await todosRepository.findOne({
      where: { id },
    });
    if (!updateTodo) {
      throw new Error("Todo not Found");
    }
    todosRepository.merge(updateTodo, Body);
    const todoUpdate = await todosRepository.save(updateTodo);
    return todoUpdate;
  } catch (error) {
    throw error;
  }
};
