import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Chat from '../Chat/Chat'
import AllChats from '../AllChats/AllChats'
import Covid from '../Covid/Covid'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import Navigator from '../Navigator/Navigator'
import NotFound from '../NotFound/NotFound'
import ChatNav from '../ChatNav/ChatNav'
import { tokenSelector } from '../../selectors/token'

export default function Routes() {
    const token = useSelector(tokenSelector)
    const senderRef = React.useRef(null)
    const history = useHistory()
    const handleRender = (Component, isChatComponent = false) => {
        return (
            <>
                <Navigator />
                {isChatComponent ? (
                    <div className="Chat">
                        <ChatNav senderRef={senderRef} />
                        <Component senderRef={senderRef} />
                    </div>
                ) : (
                    <Component />
                )}
            </>
        )
    }

    React.useEffect(() => {
        if (token === '' || token === undefined || token === null) {
            history.push('/login')
        }
    }, [history, token])

    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            {token ? (
                <Route exact path="/covid" render={() => handleRender(Covid)} />
            ) : null}
            {token ? (
                <Route path="/profile" render={() => handleRender(Profile)} />
            ) : null}
            {token ? (
                <Route
                    path="/chats/:chatId"
                    render={() => handleRender(Chat, true)}
                />
            ) : null}
            {token ? (
                <Route path="/" render={() => handleRender(AllChats, true)} />
            ) : null}
            <Route component={NotFound} />
        </Switch>
    )
}
