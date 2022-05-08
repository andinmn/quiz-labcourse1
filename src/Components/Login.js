import React, {useEffect} from 'react'
import { TextField, Button, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import useForm from '../hooks/useForm'
import { createAPIEndpoint } from '../api';
import { useStateContext } from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const getFormModel = () => ({
    name: '',
    email: ''
})

export default function Login() {

        const {values, setValues, errors, setErrors, handleInputChange} = useForm(getFormModel);

        const {context, setContext, resetContext} = useStateContext();
        const navigate = useNavigate();

        useEffect(()=>{
            resetContext() 
        }, [])

        const loginToQuiz = (e) => {
            e.preventDefault()
            if(validateLogin()){
                console.log("values", values)
                createAPIEndpoint('Users')
                .post(values)
                .then(res => {
                    setContext({userId: res.data.userId})
                    navigate('/quiz');
                })
                .catch(err => console.log(err))
            }
            
        }

        const validateLogin = () => {
            let temp = {}
            temp.email = (/\S+@\S+\.\S+/).test(values?.email) ? "" : "Email nuk eshte valid";
            temp.name = values?.name != "" ? "" : "Ju lutem shkruani emrin"
            setErrors(temp);
            return Object.values(temp).every(x => x == "")
        }
        
    return (

        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh' }}>
            <Grid
                item
                xs={1}>
                <Card sx={{ width: 400 }}>
                    <CardContent sx={{textAlign: 'center'}}>
                        <Typography variant='h4'>
                            UBT QUIZ APP
                        </Typography>
                        <Box sx={{
                            '& .MuiTextField-root': {
                                margin: 1,
                                width: '90%',
                            }
                        }}>
                            <form noValidate onSubmit={loginToQuiz}>
                                <TextField
                                    label='Email'
                                    name='email'
                                    variant='outlined'
                                    value={values?.email} 
                                    onChange={handleInputChange}
                                    {...(errors?.email && {error: true, helperText: errors.email})}/>
                                <TextField
                                    label='Name'
                                    name='name'
                                    variant='outlined' 
                                    value={values?.name}
                                    onChange={handleInputChange}
                                    {...(errors?.name && {error: true, helperText: errors.name})}/>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    size='large'
                                    sx={{ width: '90%' }}
                                >Submit</Button>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    )
}
