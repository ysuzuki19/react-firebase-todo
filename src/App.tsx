import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Todo {
  name: string;
}

interface ToDosProps {
  todos: Todo[];
  deleteToDo: (idx: number) => void;
}

const ToDosViewer = ({ todos, deleteToDo }: ToDosProps) => {
  return (
    <Grid container m={3}>
      {todos?.map((todo, idx) => (
        <Card key={idx} variant="outlined" sx={{ margin: 1 }}>
          <CardContent>
            <Typography variant="h5">{todo.name}</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => deleteToDo(idx)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

interface AddToDoFormProps {
  addToDo: (todo: Todo) => void;
}

const AddToDoForm = ({ addToDo }: AddToDoFormProps) => {
  const [name, setName] = React.useState<string>('');

  const isInvalid = (name: string) => {
    if (name === ' ') return true;
    return false;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isInvalid(e.target.value)) return;
    setName(e.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <TextField
          id="outlined-basic"
          label="New Todo *"
          variant="outlined"
          value={name}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          onClick={() => {
            addToDo({ name });
            setName('');
          }}
        >
          Add
        </Button>
      </Stack>
    </>
  );
};

const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

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
          <Box m={3} />
          <AddToDoForm addToDo={addToDo} />
          <ToDosViewer todos={todos} deleteToDo={deleteToDo} />
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
