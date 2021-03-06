import './Profile.css'
import React, { useState } from 'react'
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Typography,
    Button,
    Divider,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Link,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile } from '../../actions/profile'
import { Edit, Save } from '@material-ui/icons'
import { profileSelector } from '../../selectors/profile'
import { tokenSelector } from '../../selectors/token'
import { validateEmail, validateBD, isExist } from '../../helper'
import { useHistory } from 'react-router-dom'
import { setToken } from '../../actions/token'
import usePrevious from '../../hooks/usePrevious'

export default function Profile() {
    const { id, name, email, pass, gender, birthdate } =
        useSelector(profileSelector)
    const token = useSelector(tokenSelector)
    const [open, setOpen] = React.useState(false)
    const [validationName, setValidationName] = React.useState(false)
    const [validationEmail, setValidationEmail] = React.useState(false)
    const [validationPass, setValidationPass] = React.useState(false)
    const [validationBD, setValidationBD] = React.useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState({
        id,
        name,
        email,
        pass,
        gender,
        birthdate,
    })
    const [isEdit, setIsEdit] = useState(false)
    const prevProfile = usePrevious(profile)

    const handleLogout = React.useCallback(() => {
        dispatch(setToken(''))
        history.push('/login')
    }, [dispatch, history])

    const handleName = (e) => {
        setValidationName(!e.target.value.length)
        setProfileObj({ name: e.target.value })
    }
    const handleEmail = (e) => {
        setValidationEmail(validateEmail(e.target.value))
        setProfileObj({ email: e.target.value })
    }
    const handlePass = (e) => {
        setValidationPass(e.target.value.length < 8)
        setProfileObj({ pass: e.target.value })
    }
    const handleGender = (e) => setProfileObj({ gender: e.target.value })
    const handleBirthdate = (e) => {
        setValidationBD(validateBD(e.target.value))
        setProfileObj({ birthdate: e.target.value })
    }

    const setProfileObj = (obj) => {
        setProfile({
            id,
            name: isExist(obj.name) ? obj.name : profile.name,
            email: isExist(obj.email) ? obj.email : profile.email,
            pass: isExist(obj.pass) ? obj.pass : profile.pass,
            gender: isExist(obj.gender) ? obj.gender : profile.gender,
            birthdate: isExist(obj.birthdate)
                ? obj.birthdate
                : profile.birthdate,
        })
    }

    const handleClick = () => {
        if (isEdit)
            if (
                !(
                    validationName ||
                    validationEmail ||
                    validationPass ||
                    validationBD
                )
            ) {
                (prevProfile !== profile) && dispatch(changeProfile(profile, token))
                setIsEdit(!isEdit)
            } else setOpen(true)
        else setIsEdit(!isEdit)
    }
    const handleClose = () => setOpen(false)

    return (
        <Paper className="Profile" elevation={0} component="form">
            <Typography variant="h4" component="h1" className="Profile__header">
                ?????? ??????????????
            </Typography>
            <Link className="Profile__link" onClick={handleLogout}>
                ??????????
            </Link>
            <Divider />
            {isEdit ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className="Profile__saveBtn Profile__btn"
                    startIcon={<Save />}
                >
                    ??????????????????
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className="Profile__editBtn Profile__btn"
                    startIcon={<Edit />}
                >
                    ??????????????????????????
                </Button>
            )}
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend" className="Profile__radioLabel">
                    ????????????
                </FormLabel>
                <RadioGroup value={profile.gender} onChange={handleGender}>
                    <FormControlLabel
                        value="male"
                        disabled={!isEdit}
                        control={<Radio className="Profile__radio" />}
                        label="??????????????"
                    />
                    <FormControlLabel
                        value="female"
                        disabled={!isEdit}
                        control={<Radio className="Profile__radio" />}
                        label="??????????????"
                    />
                    <FormControlLabel
                        value="other"
                        disabled={!isEdit}
                        control={<Radio className="Profile__radio" />}
                        label="????????????"
                    />
                </RadioGroup>
            </FormControl>
            <FormControl
                fullWidth
                variant="outlined"
                className="Profile__input"
            >
                <InputLabel htmlFor="date-input">???????? ????????????????</InputLabel>
                <OutlinedInput
                    id="date-input"
                    error={validationBD}
                    disabled={!isEdit}
                    autoComplete="off"
                    value={profile.birthdate}
                    type="date"
                    onChange={handleBirthdate}
                    startAdornment={
                        <InputAdornment position="start">
                            <span role="img" aria-label="birthdate">????</span>
                        </InputAdornment>
                    }
                    labelWidth={120}
                />
            </FormControl>
            <FormControl
                fullWidth
                variant="outlined"
                className="Profile__input"
            >
                <InputLabel htmlFor="name-input">??????</InputLabel>
                <OutlinedInput
                    id="name-input"
                    error={validationName}
                    disabled={!isEdit}
                    autoComplete="off"
                    value={profile.name}
                    onChange={handleName}
                    startAdornment={
                        <InputAdornment position="start">
                            <span role="img" aria-label="name">????</span>
                        </InputAdornment>
                    }
                    labelWidth={34}
                />
            </FormControl>
            <FormControl
                fullWidth
                variant="outlined"
                className="Profile__input"
            >
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <OutlinedInput
                    id="email-input"
                    error={validationEmail}
                    disabled={!isEdit}
                    autoComplete="off"
                    value={profile.email}
                    onChange={handleEmail}
                    startAdornment={
                        <InputAdornment position="start">
                            <span role="img" aria-label="email">???</span>
                        </InputAdornment>
                    }
                    labelWidth={42}
                />
            </FormControl>
            <FormControl
                fullWidth
                variant="outlined"
                className="Profile__input"
            >
                <InputLabel htmlFor="pass-input">????????????</InputLabel>
                <OutlinedInput
                    id="pass-input"
                    error={validationPass}
                    disabled={!isEdit}
                    type="password"
                    autoComplete="off"
                    value={profile.pass}
                    onChange={handlePass}
                    startAdornment={
                        <InputAdornment position="start">
                            <span role="img" aria-label="pass">????</span>
                        </InputAdornment>
                    }
                    labelWidth={60}
                />
            </FormControl>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>????????????</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ???? ?????????? ???????????????????????? ????????????. ?????????????????? ?????????????????????? ????????
                        ?? ???????????????????? ??????????.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        ??????????????
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
