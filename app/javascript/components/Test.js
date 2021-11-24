import React, { useState, useEffect, setState } from 'react'
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
  const [max, setMax] = useState(props.max)

  const [detailopen, setDetailOpen] = useState(false)
  const DetailOpen = () => setDetailOpen(true)
  const DetailClose = () => setDetailOpen(false)

  const [newopen, setNewOpen] = useState(false)
  const NewOpen = () => setNewOpen(true)
  const NewClose = () => setNewOpen(false)

  //関数の実行タイミングをReactのレンダリング後まで
  useEffect(() => {
    setTodos(todos)
  }, [todos])

  const TodosList = () => { 
    return (
      <div className="todos">
        {todos.map((todo, i) =>
          TodoItem(todo, i)
        )}
      </div>
    )
  }

  const TodoItem = (todo, i) => {
    const {id, title, content, created_at, updated_at} = todo
    return (
      <div className="todo" key={i}>
        <p>{title}</p>
        <p>{content}</p>
        <small>{created_at}</small>
        <small>{updated_at}</small>
        <div>
          <Detail value={i}/>
          {/* {DetailModal(i)} */}
          {/* {EditModal(id)} */}
          <Button onClick={() => { deleteClick(id) }}>Delete</Button>
        </div>
      </div>
    )
  }

  const NewModal = () => {

    return (
      <div>
        <Button onClick={NewOpen}>new</Button>
        <Modal
          open={newopen}
          onClose={NewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            sx={boxstyle}
            noValidate
            autoComplete="off"
          >
          {NewForm()}
          </Box>
        </Modal>
      </div>
    );
  }

  const NewForm = () => {
    const [PostTitle, setPostTitle] = useState("");
    const [PostContent, setPostContent] = useState("");

    const todoChange = (event) => {
      switch (event.target.name) {
        case 'UpdateTitle':
          setPostTitle(event.target.value);
          break;
        case 'UpdateContent':
          setPostContent(event.target.value);
          break;
      }
    }

    const postClick = (event) => {
      event.preventDefault()
      axios.post('/todos', {
        title: PostTitle,
        content: PostContent
      },{
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }}
      ).then(function (response) {
        let a = max + 1
        setMax({a})
        setTodos([...todos, { id: max, title: PostTitle, content: PostContent }])
      })
    }
    return(
      <div>
        <TextField
          name="UpdateTitle"
          onChange={todoChange}
          fullWidth
          id="standard-basic" 
          label="Title" 
          variant="standard"
        /> 
        <TextareaAutosize
          name="UpdateContent"
          onChange={todoChange}
          id="outlined-multiline-static"
          label="Multiline"
          minRows={5}
          style={{ width: '100%' }}
          variant="outlined"
        />
        <Button onClick={postClick}>submit</Button>
      </div>
    )
  }

  // const EditModal = (Eid) => {
  //   const [open, setOpen] = useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  //   return (
  //     <div>
  //       <Button onClick={handleOpen}>edit</Button>
  //       <Modal
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby="modal-modal-title"
  //         aria-describedby="modal-modal-description"
  //       >
  //         <Box
  //           component="form"
  //           sx={boxstyle}
  //           noValidate
  //           autoComplete="off"
  //         >
  //         {editForm(Eid)}
  //         </Box>
  //       </Modal>
  //     </div>
  //   );
  // }

  // const editForm = (Eid) => {
  //   const data = todos.filter(todo => todo.id == Eid)
  //   const {id, title, content, created_at, updated_at} = data[0]
  //   const [UpdateTitle, setUpdateTitle] = useState("");
  //   const [UpdateContent, setUpdateContent] = useState("");

  //   const todoChange = (event) => {
  //     switch (event.target.name) {
  //       case 'UpdateTitle':
  //         setUpdateTitle(event.target.value);
  //         break;
  //       case 'UpdateContent':
  //         setUpdateContent(event.target.value);
  //         break;
  //     }
  //   }

  //   const editClick = (event) => {
  //     event.preventDefault()
  //     const test = todos.map((todo, i) => {
  //       if(todo.id == id){
  //         // console.log(i)
  //         // console.log(todo.title)
  //         // console.log(todo.content)
  //         // console.log(UpdateTitle)
  //         // console.log(UpdateContent)
  //         UpdateTitle == "" ? setUpdateTitle(todo.title) : ""
  //         UpdateContent == "" ? setUpdateContent(todo.content) : ""
  //         const Put = {title: UpdateTitle, content: UpdateContent}
  //         axios.put("/todos/" + id,
  //           Put, {
  //             headers: {
  //               'X-Requested-With': 'XMLHttpRequest',
  //               'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  //             }
  //           }).then(res => {
  //             setTodos([
  //               ...todos[i],
  //               { title: UpdateTitle, content: UpdateContent, },
  //             ])
  //           })
  //           .catch(error => {
  //               // alert("「" + modify.name + "」更新失敗");
  //               console.log(error);
  //           });
  //       }
  //     })
  //   }

  //   return(
  //     <div>
  //       <TextField
  //         name="UpdateTitle"
  //         defaultValue={title}
  //         onChange={todoChange}
  //         fullWidth
  //         id="standard-basic" 
  //         label="Title" 
  //         variant="standard"
  //       /> 
  //       <TextareaAutosize
  //         name="UpdateContent"
  //         defaultValue={content}
  //         onChange={todoChange}
  //         id="outlined-multiline-static"
  //         label="Multiline"
  //         minRows={5}
  //         style={{ width: '100%' }}
  //         variant="outlined"
  //       />
  //       <Button onClick={editClick}>submit</Button>
  //     </div>
  //   )
  // }



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
  
  function Detail(val) {
    // console.log(i)
    const {title, content, created_at, updated_at} = todos[val.value]
    return (
      <div>
        <Button onClick={DetailOpen}>detail</Button>
        <Modal
          open={detailopen}
          onClose={DetailClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxstyle}>
            <h2>{title}</h2>
            <p>{content}</p>
            <small>created:{created_at}</small><br />
            <small>updated:{updated_at}</small><br />
            <Button onClick={DetailClose}>close</Button>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <h1>Todoリスト</h1>
      {NewModal()}
      {TodosList()}
    </div>
  )
}



export default Test