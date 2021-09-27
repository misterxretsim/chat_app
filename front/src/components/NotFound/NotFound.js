import './NotFound.css'
import { useHistory } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

export default function NotFound() {
    const history = useHistory()
    const handleGoBack = () => history.goBack()

    return (
        <div className="NotFound">
            <div className="NotFound__content">
                <Typography
                    variant="h4"
                    component="h1"
                >
                    404 - Not Found
                </Typography>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    className="NotFound__btn"
                    onClick={handleGoBack}
                >
                    Вернуться назад
                </Button>
            </div>
        </div>
    )
}
