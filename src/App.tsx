import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { ToDosViewer, AddToDoForm, Todo } from './components/Todos';
import firebaseConfig from './firebase.config';

initializeApp(firebaseConfig);
const db = getFirestore();
const todoRef = collection(db, 'todos');
const auth = getAuth();

const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [uid, setUid] = React.useState<string>('');

  const fetchTodos = (userid: string) => {
    if (userid.length === 0) return;
    getDoc(doc(todoRef, userid)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log('fetched', docSnap.data());
        setTodos(docSnap.data().todos);
      } else {
        console.log('data not found');
      }
    });
    console.log('End fetch');
  };

  const saveTodos = () => {
    if (uid.length === 0) return;
    setDoc(doc(todoRef, uid), { todos: todos });
    console.log('saved');
  };

  React.useEffect(() => {
    signInAnonymously(auth)
      .then((result) => {
        console.log('signin', result);
        setUid(result.user.uid);
        fetchTodos(result.user.uid);
      })
      .catch((err) => {
        console.log('Error ', err);
      });
    console.log('finish mount');
  }, []);

  const addToDo = (todo: Todo): boolean => {
    if (todo.name.length === 0) return false;
    setTodos((oldtodos) => [...oldtodos, todo]);
    return true;
  };

  const deleteToDo = (idx: number) => {
    if (idx < 0) return false;
    if (todos.length < idx) return false;
    setTodos((oldtodos) => oldtodos.filter((_todo, i) => i !== idx));
    return true;
  };

  return (
    <Box m={3}>
      <Paper variant="outlined">
        <Box m={3}>
          <Typography variant="h3">React Firebase ToDo App</Typography>
          <Divider />
          <Box m={5}>
            <AddToDoForm addToDo={addToDo} saveToDo={saveTodos} />
          </Box>
          <ToDosViewer todos={todos} deleteToDo={deleteToDo} />
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
