import './Loader.css'
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loader() {
    return (
        <div className="Loader">
            <CircularProgress
                className="Loader_progress"
                color="primary"
                size={60}
            />
            <p className="Loader__typing">Robot печатает сообщение</p>
        </div>
    )
}
