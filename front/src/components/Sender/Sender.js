import './Sender.css'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { addMessage } from '../../actions/chat'
import { chatPath, currTime, isRobotChat } from '../../helper'
import { IconButton, InputBase, Paper } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { chatSelector } from '../../selectors/chat'
import { tokenSelector } from '../../selectors/token'

export default function Sender(props) {
    const [input, setInput] = React.useState('')
    const [robotTyping, setRobotTyping] = React.useState(false)
    const token = useSelector(tokenSelector)
    const chatsInfo = useSelector(chatSelector)
    const location = useLocation()
    const dispatch = useDispatch()
    const ref = props.senderRef
    const handleInput = (e) => setInput(e.target.value)
    const handleSend = React.useCallback(
        (e) => {
            if (
                input &&
                !robotTyping &&
                (e.key === 'Enter' || e.key === undefined)
            ) {
                const name = chatPath(location)
                const chat_id = chatsInfo.chats.find(
                    (el) => el.name === name
                ).id
                dispatch(
                    addMessage(token, chat_id, input, currTime(new Date()))
                )
                setInput('')
                ref.current.focus()

                if (isRobotChat(location)) {
                    setRobotTyping(true)
                    const timer = setTimeout(() => {
                        setRobotTyping(false)
                        dispatch(
                            addMessage(
                                token,
                                chat_id,
                                'Ожидайте ответа оператора',
                                currTime(new Date()),
                                0
                            )
                        )
                        ref.current.focus()
                    }, 3000)

                    return () => {
                        clearTimeout(timer)
                    }
                }
            }
        },
        [chatsInfo.chats, dispatch, input, location, ref, robotTyping, token]
    )

    React.useEffect(() => ref.current.focus(), [ref])

    return (
        <>
            <Paper
                component="form"
                elevation={0}
                className="Sender"
                onSubmit={(e) => e.preventDefault()}
            >
                <InputBase
                    id="input"
                    value={input}
                    className="Sender__input"
                    placeholder="Введите текст"
                    onChange={handleInput}
                    disabled={robotTyping && isRobotChat(location)}
                    autoComplete="off"
                    autoFocus
                    inputRef={ref}
                    onKeyDown={handleSend}
                />
                <IconButton
                    aria-label="primary"
                    onClick={handleSend}
                    disabled={!input}
                    color="primary"
                    className="Sender__btn"
                >
                    <SendIcon />
                </IconButton>
            </Paper>
            {robotTyping && isRobotChat(location) ? <Loader /> : null}
        </>
    )
}
