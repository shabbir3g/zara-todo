import { Button, ButtonProps, TextField, Typography, styled, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Icon } from '@mui/material';
import React, { useCallback, useReducer } from 'react';
import './App.css';
import { purple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

interface Todo {
  id: number;
  text: string;
}
// Todo[]
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };
function App() {

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
          
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);


  const newTodoRef = React.useRef<HTMLInputElement>(null);
   // useCallback
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });

      newTodoRef.current.value = "";
    }
  }, []);
  

  return (
    <div className="App">
        <div className="todolist"> 
          <Typography sx={{ fontSize: 30, fontWeight: 'bold'}} variant="h6" gutterBottom component="div">
          Todo List
        </Typography>
          <TextField
          inputRef={newTodoRef}
         id="standard-basic" label="Add your To do" color="success" variant="standard" />
          <ColorButton onClick={onAddTodo} variant="contained">ADD ON LIST</ColorButton> 
        </div>
      <Box sx={{ width: '33%', margin:'auto' }}>
      <List>
        {todos.map((todo) => (
            <ListItem key={todo.id} sx={{ backgroundColor: '#8e44ad', marginBottom: '10px', borderRadius: '5px' }}
            secondaryAction={
              <IconButton sx={{color: "#fff", cursor: 'pointer'}}  edge="end" aria-label="delete">
                <DeleteIcon  onClick={() => dispatch({ type: "REMOVE", id: todo.id })} />
              </IconButton>
            }
            >
          
            <ListItemText sx={{color: "#fff"}} 
              primary= {todo.text}
            />
            </ListItem>
        ))}
        </List>
        </Box>

      

    </div>
  );
}

export default App;
