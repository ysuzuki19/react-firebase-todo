import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

export interface Todo {
  name: string;
}

interface ToDosProps {
  todos: Todo[];
  deleteToDo: (idx: number) => void;
}

export const ToDosViewer = ({ todos, deleteToDo }: ToDosProps) => {
  return (
    <Grid container m={3}>
      {todos?.map((todo, idx) => (
        <Grid item key={idx} xs={4} padding={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">{todo.name}</Typography>
              <Divider />
            </CardContent>
            <CardActions>
              <IconButton onClick={() => deleteToDo(idx)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

interface AddToDoFormProps {
  addToDo: (todo: Todo) => void;
  saveToDo: () => void;
}

export const AddToDoForm = ({ addToDo, saveToDo }: AddToDoFormProps) => {
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
        <Button variant="contained" onClick={saveToDo}>
          Save
        </Button>
      </Stack>
    </>
  );
};
