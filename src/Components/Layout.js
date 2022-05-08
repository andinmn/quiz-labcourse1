import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../hooks/useStateContext'

export default function Layout() {

    const resetContext = useStateContext().resetContext;
    const navigate = useNavigate();
    const logout = () => {
        resetContext()
        navigate('/')
    }

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar sx={{ width: 640, m: 'auto' }}>
                    <Typography
                        variant="h4"
                        align="center"
                        color={'black'}
                        sx={{flexGrow: 1}}
                    >
                        UBT Quiz App
                    </Typography>
                    <Button onClick={logout}><span style={{color: "black"}}>Logout</span></Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet/>
            </Container>
        </>
    )
}
