import React from 'react'
import {
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProfileObject } from '../../actions/profile'
import { setToken } from '../../actions/token'
import { getChats, getChatsWithMessages } from '../../actions/chat'

export default function Signin() {
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePass = (e) => setPass(e.target.value)
    const handleLogin = () => {
        fetch('/api/login/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pass }),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                if (rs.status === 'ok') {
                    dispatch(setToken(rs.token))
                    dispatch(setProfileObject(rs.profile))
                    dispatch(getChats(rs.token))
                    dispatch(getChatsWithMessages(rs.token))
                    history.push('/profile')
                }
            })
            .catch((er) => {
                console.error('error', er)
            })
    }

    return (
        <React.Fragment>
            <FormControl fullWidth variant="outlined" className="Login__input">
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <OutlinedInput
                    id="email-input"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={handleEmail}
                    autoFocus
                    startAdornment={
                        <InputAdornment position="start">＠</InputAdornment>
                    }
                    labelWidth={43}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className="Login__input">
                <InputLabel htmlFor="pass-input">Пароль</InputLabel>
                <OutlinedInput
                    id="pass-input"
                    autoComplete="off"
                    required
                    type="password"
                    value={pass}
                    onChange={handlePass}
                    startAdornment={
                        <InputAdornment position="start">🔒</InputAdornment>
                    }
                    labelWidth={59}
                />
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="Login__submit"
                onClick={handleLogin}
            >
                Войти
            </Button>
        </React.Fragment>
    )
}
