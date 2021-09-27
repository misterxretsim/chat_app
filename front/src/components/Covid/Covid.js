import './Covid.css'
import {
    Button,
    Divider,
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCovid } from '../../actions/covid'
import React from 'react'
import { covidSelector } from '../../selectors/covid'
import { GetApp } from '@material-ui/icons'
import { tokenSelector } from '../../selectors/token'

export default function Covid() {
    const dispatch = useDispatch()
    const { covidArr, status, error } = useSelector(covidSelector)
    const token = useSelector(tokenSelector)
    const handleClick = () => {
        dispatch(fetchCovid(token))
    }

    return (
        <Paper className="Covid" elevation={0} component="form">
            <Typography variant="h4" component="h1" className="Covid__header">
                Статистика по Covid-19
            </Typography>
            <Divider />
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                className="Covid__btn"
                startIcon={<GetApp />}
            >
                Обновить данные
            </Button>
            <Divider />
            {!status && !error ? (
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Дата</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Всего</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Болеют</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Выздоровили</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Умерли</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {covidArr
                                ? !!covidArr.length
                                    ? covidArr.map((row) => (
                                          <TableRow key={row.id}>
                                              <TableCell
                                                  component="th"
                                                  scope="row"
                                              >
                                                  {row.date}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.confirmed}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.active}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.recovered}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.deaths}
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : null}
            {status && !error ? <p>Загрузка</p> : null}
            {error ? <p>{error}</p> : null}
        </Paper>
    )
}
