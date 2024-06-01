'use client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Todo } from '@/lib/drizzle';
import Image from 'next/image';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/todo');
        const responseData = await response.json();

        if (response.ok && Array.isArray(responseData.data)) {
          setTodos(responseData.data);
        } else {
          setError('Data format is incorrect');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTodo = async (task: string) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setTodos((prevTodos) => [...prevTodos, ...responseData.data]);
        toast.success('Task added successfully');
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        toast.success('Task deleted successfully');
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Toaster />
      <div>
        {todos.length > 0 ? (
          todos.map((item) => (
            <div key={item.id} className="bg-gray-100 py-4 px-4 flex items-center gap-2.5 shadow rounded-lg my-5">
              <div className="h-3 w-3 bg-secondary rounded-full"></div>
              <p className="text-black text-lg font-medium">{item.task}</p>
              <button onClick={() => deleteTodo(item.id)} className="ml-auto text-white px-2 py-1 rounded">
               <Image
               src="/trash.png"
               alt='trash'
               width={35}
               height={35}
               />
              </button>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
      <div className="w-full flex gap-x-3 mt-4">
        <input
          type="text"
          id="new-task"
          className="text-black rounded-full w-full py-3.5 px-5 border focus:outline-secondary"
          placeholder="New task"
        />
        <button
          type="submit"
          onClick={() => {
            const input = document.getElementById('new-task') as HTMLInputElement;
            if (input.value.trim() !== '') {
              addTodo(input.value.trim());
              input.value = '';
            }
          }}
          className="p-4 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary"
        >
          <Image src="/arrow.png" width={20} height={20} alt="Add task" />
        </button>
      </div>
    </div>
  );
};

export default TodoList;
