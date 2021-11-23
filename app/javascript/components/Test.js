import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const boxstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const Test = (props) => {
  const [todos, setTodos] = useState(props.todos)

  //関数の実行タイミングをReactのレンダリング後まで
  useEffect(() => {
    setTodos(todos)
  }, [todos])

  const TodosList = () => { 
    return (
      <div className="todos">
        {todos.map((todo) =>
          TodoItem(todo)
        )}
      </div>
    )
  }

  const TodoItem = (todo) => {
    const {id, title, content, created_at, updated_at} = todo
    return (
      <div className="todo" key={id}>
        <p>{title}</p>
        <p>{content}</p>
        <small>{created_at}</small>
        <small>{updated_at}</small>
        <div>
          {DetailModal(id)}
          {EditModal(id)}
          <Button onClick={() => { deleteClick(id) }} className="delete-btn">Delete</Button>
        </div>
      </div>
    )
  }


  const EditModal = (Did) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const data = todos.filter(todo => todo.id == Did)
    const {id, title, content, created_at, updated_at} = data[0]
    const handleChange = (event) => {
      console.log(event.target.value)
    }
    const editClick = (id) => {
      console.log(id)
    }
    return (
      <div>
        <form onSubmit={editClick}>
        <Button onClick={handleOpen}>edit</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={boxstyle}
            noValidate
            autoComplete="off"
          >
            <TextField 
              value={title}
              onChange={handleChange}
              fullWidth
              id="standard-basic" 
              label="Title" 
              variant="standard"
            />
            <TextareaAutosize
              value={title}
              onChange={handleChange}
              id="outlined-multiline-static"
              label="Multiline"
              minRows={5}
              style={{ width: '100%' }}
              variant="outlined"
            />
            <Button type="submit">submit</Button>
          </Box>
        </Modal>
        </form>
      </div>
    );
  }

  const deleteClick = (id) => {
    axios.delete("/todos/" + id, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    }).then( res => {
      setTodos(todos.filter(todo => todo.id !== id))
    })
  }

  const DetailModal = (Did) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const data = todos.filter(todo => todo.id == Did)
    const {id, title, content, created_at, updated_at} = data[0]

    return (
      <div>
        <Button onClick={handleOpen}>detail</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxstyle}>
            <h2>{title}</h2>
            <p>{content}</p>
            <small>created:{created_at}</small><br />
            <small>updated:{updated_at}</small><br />
            <Button onClick={handleClose}>close</Button>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <h1>Todoリスト</h1>
      {TodosList()}
    </div>
  )
}



export default Test