import './Navigator.css'
import { Link, useLocation } from 'react-router-dom'
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core'
import {
    Person,
    PersonOutlineOutlined,
    Sms,
    SmsOutlined,
    LocalHospital,
    LocalHospitalOutlined,
} from '@material-ui/icons'

export default function Navigator() {
    const location = useLocation()

    return (
        <Paper className="Navigator" elevation={0}>
            <List component="nav">
                <ListItem
                    button
                    component={Link}
                    to="/profile"
                    selected={location.pathname === '/profile'}
                >
                    <ListItemIcon>
                        {location.pathname === '/profile' ? (
                            <Person className="Icon__colored" />
                        ) : (
                            <PersonOutlineOutlined />
                        )}
                    </ListItemIcon>
                    <ListItemText primary="Профиль" />
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/"
                    selected={location.pathname === '/' || location.pathname.includes('/chats/')}
                >
                    <ListItemIcon>
                        {location.pathname === '/' || location.pathname.includes('/chats/') ? (
                            <Sms className="Icon__colored" />
                        ) : (
                            <SmsOutlined />
                        )}
                    </ListItemIcon>
                    <ListItemText primary="Чаты" />
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/covid"
                    selected={location.pathname.includes('/covid')}
                >
                    <ListItemIcon>
                        {location.pathname.includes('/covid') ? (
                            <LocalHospital className="Icon__colored" />
                        ) : (
                            <LocalHospitalOutlined />
                        )}
                    </ListItemIcon>
                    <ListItemText primary="Корона" />
                </ListItem>
            </List>
        </Paper>
    )
}
