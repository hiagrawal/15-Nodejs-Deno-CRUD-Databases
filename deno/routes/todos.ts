import { Router } from 'https://deno.land/x/oak/mod.ts';
import {Bson} from "https://deno.land/x/mongo@v0.28.0/mod.ts";

import { getDB } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
  id?: string; //? indicates that this field is optional
  text: string;
}

let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
  const todos = await getDB().collection('todos').find();
  const transformedTodos = todos.map((todo: {_id: Bson.ObjectId, text: string}) => {
    return {id: todo._id.$oid, text: todo.text}; //oid is the object id and is used to convert object id to string
  })
  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body();
  const value = await data.value;
  const newTodo: Todo = {
    //id: new Date().toISOString(),
    text: value.text,
  };

  const id = await getDB().collection('todos').insertOne(newTodo);
  newTodo.id = id.$oid;

  //todos.push(newTodo);

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body();
  const value = await data.value;

  // const todoIndex = todos.findIndex((todo) => {
  //   return todo.id === tid;
  // });
  // todos[todoIndex] = { id: todos[todoIndex].id, text: value.text };

  await getDB().collection('todos').updateOne({_id: new Bson.ObjectId(tid)}, {$set: {text: value.text}});

  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', async(ctx) => {
  const tid = ctx.params.todoId!;

  // todos = todos.filter((todo) => todo.id !== tid);

  await getDB().collection('todos').deleteOne({_id: new Bson.ObjectId(tid)});

  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
