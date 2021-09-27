import './Login.css'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'
import {
    Paper,
    Container,
    Typography,
    Grid,
    Link,
    CssBaseline,
    Avatar,
} from '@material-ui/core'
import React from 'react'

export default function Login() {
    const [isLogin, setIsLogin] = React.useState(false)

    const handleLogin = () => {
        setIsLogin(!isLogin)
    }

    return (
        <Paper className="Paper__login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="Login12">
                    <Avatar className="Login__avatar">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isLogin ? 'Регистрация' : 'Вход'}
                    </Typography>
                    <form
                        className="Login__form"
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {isLogin ? <Signup/> : <Signin/>}
                        <Grid container>
                            <Grid item>
                                <Link
                                    className="Login__link"
                                    variant="body2"
                                    onClick={handleLogin}
                                >
                                    {isLogin ? 'У меня уже есть аккаунт...' : 'У меня еще нет аккаунта...'}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Paper>
    )
}
