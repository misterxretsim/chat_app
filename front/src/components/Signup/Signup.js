import React from 'react'
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { validateEmail, currTime } from '../../helper'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProfileObject } from '../../actions/profile'
import { getChats, getChatsWithMessages } from '../../actions/chat'
import { setToken } from '../../actions/token'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function Signup() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pass1, setPass1] = React.useState('')
    const [pass2, setPass2] = React.useState('')
    const [gender, setGender] = React.useState('other')
    const [birthdate, setBirthdate] = React.useState('')
    const [loginDataIsOk, setLoginDataIsOk] = React.useState(false)
    const [validationEmail, setValidationEmail] = React.useState(false)
    const [validationPass1, setValidationPass1] = React.useState(false)
    const [validationPass2, setValidationPass2] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [snackText, setSnackText] = React.useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setValidationEmail(validateEmail(e.target.value))
    }
    const handlePass1 = (e) => {
        setPass1(e.target.value)
        setValidationPass1(e.target.value.length < 8)
    }
    const handlePass2 = (e) => {
        setPass2(e.target.value)
        setValidationPass2(e.target.value.length < 8)
    }
    const handleName = (e) => setName(e.target.value)
    const handleGender = (e) => setGender(e.target.value)
    const handleBirthdate = (e) => setBirthdate(e.target.value)
    const handleClose = () => setOpen(false)
    const handleCheckLoginData = () => {
        if (validationEmail || !email.length) {
            setSnackText('Некорректная почта')
            setOpen(true)
        } else if (
            validationPass1 ||
            validationPass2 ||
            !pass1.length ||
            !pass2.length
        ) {
            setSnackText('Некорректный пароль')
            setOpen(true)
        } else if (pass1 !== pass2) {
            setSnackText('Введённые пароли не совпадают')
            setOpen(true)
        } else if (!loginDataIsOk) {
            fetch('/api/login/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then((response) => {
                    if (!response.ok || response.status !== 200) {
                        throw Error('Something went wrong')
                    }
                    return response.json()
                })
                .then((rs) => {
                    if (rs.status === 'ok') {
                        setLoginDataIsOk(true)
                    } else {
                        setSnackText(rs.msg)
                        setOpen(true)
                    }
                })
                .catch((er) => {
                    console.error('error', er)
                })
        } else if (!name.length) {
            setSnackText('Введите имя')
            setOpen(true)
        } else if (!birthdate.length) {
            setSnackText('Введите дату рождения')
            setOpen(true)
        } else {
            fetch('/api/login/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    pass: pass1,
                    name,
                    gender,
                    birthdate,
                    time: currTime(new Date())
                }),
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
                    } else {
                        setSnackText(rs.msg)
                        setOpen(true)
                    }
                })
                .catch((er) => {
                    console.error('error', er)
                })
        }
    }

    return (
        <React.Fragment>
            <FormControl fullWidth variant="outlined" className="Login__input">
                <InputLabel htmlFor="email-input">
                    {loginDataIsOk ? 'Email' : 'Введите Email'}
                </InputLabel>
                <OutlinedInput
                    id="email-input"
                    autoComplete="off"
                    error={validationEmail}
                    required
                    disabled={loginDataIsOk}
                    value={email}
                    onChange={handleEmail}
                    autoFocus
                    startAdornment={
                        <InputAdornment position="start">＠</InputAdornment>
                    }
                    labelWidth={loginDataIsOk ? 43 : 110}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className="Login__input">
                <InputLabel htmlFor="pass1-input">
                    {loginDataIsOk ? 'Пароль' : 'Введите пароль'}
                </InputLabel>
                <OutlinedInput
                    id="pass1-input"
                    autoComplete="off"
                    error={validationPass1}
                    required
                    disabled={loginDataIsOk}
                    type="password"
                    value={pass1}
                    onChange={handlePass1}
                    startAdornment={
                        <InputAdornment position="start">🔒</InputAdornment>
                    }
                    labelWidth={loginDataIsOk ? 59 : 125}
                />
            </FormControl>
            {!loginDataIsOk ? (
                <FormControl
                    fullWidth
                    variant="outlined"
                    className="Login__input"
                >
                    <InputLabel htmlFor="pass2-input">
                        Повторите пароль
                    </InputLabel>
                    <OutlinedInput
                        id="pass2-input"
                        autoComplete="off"
                        required
                        error={validationPass2}
                        type="password"
                        value={pass2}
                        onChange={handlePass2}
                        startAdornment={
                            <InputAdornment position="start">🔒</InputAdornment>
                        }
                        labelWidth={143}
                    />
                </FormControl>
            ) : null}
            {loginDataIsOk ? (
                <>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        className="Login__input"
                    >
                        <InputLabel htmlFor="name-input">
                            Введите имя
                        </InputLabel>
                        <OutlinedInput
                            id="name-input"
                            autoComplete="off"
                            required
                            value={name}
                            onChange={handleName}
                            autoFocus
                            startAdornment={
                                <InputAdornment position="start">
                                    👤
                                </InputAdornment>
                            }
                            labelWidth={100}
                        />
                    </FormControl>
                    <br />
                    <br />
                    <FormControl component="fieldset">
                        <FormLabel
                            component="legend"
                            className="Profile__radioLabel"
                        >
                            Выберите гендер
                        </FormLabel>
                        <RadioGroup value={gender} onChange={handleGender}>
                            <FormControlLabel
                                value="male"
                                control={<Radio className="Profile__radio" />}
                                label="Мужчина"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio className="Profile__radio" />}
                                label="Женщина"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio className="Profile__radio" />}
                                label="Другое"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        className="Login__input"
                    >
                        <InputLabel htmlFor="date-input">
                            Введите дату рождения
                        </InputLabel>
                        <OutlinedInput
                            id="date-input"
                            autoComplete="off"
                            value={birthdate}
                            type="date"
                            onChange={handleBirthdate}
                            startAdornment={
                                <InputAdornment position="start">
                                    🗓
                                </InputAdornment>
                            }
                            labelWidth={185}
                        />
                    </FormControl>
                </>
            ) : null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="Login__submit"
                onClick={handleCheckLoginData}
            >
                {loginDataIsOk ? 'Зарегистрироваться' : 'Далее'}
            </Button>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                severity="error"
                open={open}
                onClose={handleClose}
                autoHideDuration={3500}
            >
                <Alert severity="error" onClose={handleClose}>{snackText}</Alert>
            </Snackbar>
        </React.Fragment>
    )
}
