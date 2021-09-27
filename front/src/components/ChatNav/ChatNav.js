import './ChatNav.css'
import React, { useState } from 'react'
import AddChatBtn from '../AddChatBtn/AddChatBtn'
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { getImg, chatPath, textForDelChat } from '../../helper'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChat } from '../../actions/chat'
import { chatSelector } from '../../selectors/chat'
import { tokenSelector } from '../../selectors/token'

export default function ChatNav(props) {
    const [open, setOpen] = useState(false)
    const [curChatIdForDel, setCurChatIdForDel] = useState(null)
    const dispatch = useDispatch()
    const chatsInfo = useSelector(chatSelector)
    const token = useSelector(tokenSelector)
    const location = useLocation()
    const history = useHistory()
    const ref = props.senderRef

    const handleClick = (name) => {
        history.push('/chats/' + name)
        if (ref.current) ref.current.focus()
    }
    const handleSelect = (name) => name === chatPath(location)
    const handleClose = () => {
        setOpen(false)
        setCurChatIdForDel(null)
    }
    const handleDel = (id) => {
        setOpen(true)
        setCurChatIdForDel(id)
    }
    const handleCloseWithDel = () => {
        setOpen(false)
        if (curChatIdForDel) {
            dispatch(deleteChat(curChatIdForDel, token))
            history.push('/chats/' + chatsInfo.chats[0].name)
        }
    }

    return (
        <Paper className="ChatNav" elevation={0}>
            <List component="nav" className="ChatNav__nav">
                {chatsInfo.chats !== undefined
                    ? chatsInfo.chats.map((chat) => (
                          <ListItem
                              key={chat.id}
                              selected={handleSelect(chat.name)}
                              className="ChatNav__item"
                          >
                              <ListItemAvatar
                                  onClick={() => handleClick(chat.name)}
                              >
                                  <Avatar
                                      alt={chat.name}
                                      src={getImg(chat.name)}
                                  />
                              </ListItemAvatar>
                              <ListItemText
                                  primary={chat.name}
                                  className="ChatNav__itemText"
                                  onClick={() => handleClick(chat.name)}
                              />
                              {chat.name !== 'Robot' ? (
                                  <IconButton
                                      onClick={() => handleDel(chat.id)}
                                      color="secondary"
                                  >
                                      <DeleteIcon />
                                  </IconButton>
                              ) : null}
                          </ListItem>
                      ))
                    : null}
                <AddChatBtn />
            </List>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Подтвердите действие</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {chatsInfo.chats !== undefined
                            ? textForDelChat(chatsInfo.chats, curChatIdForDel)
                            : null}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={handleCloseWithDel} color="primary">
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
