import { Card, CardContent, LinearProgress, CardHeader, List, ListItem, ListItemButton, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoint } from '../api';
import { getFormatedTime } from '../helpers';
import { useStateContext } from '../hooks/useStateContext'


export default function Quiz() {

    const { context, setContext } = useStateContext();
    const [questions, setQuestions] = useState([]);
    const [questionIdx, setQuestionIdx] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const navigate = useNavigate();
    let timer;

    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1)
        }, [1000])
    }
    console.log('QUIZ BRENDA context', context)
    useEffect(() => {
        setContext({
            selectedOptions: [],
            timeTaken: 0
        })
        createAPIEndpoint('questions')
            .fetch()
            .then(res => {
                setQuestions(res.data);
                startTimer();
            })

        return () => {
            clearInterval(timer)
        }
    }, [])

    const updateAnswer = (qnId, optionIndex) => {
       
        const temp = [...context.selectedOptions]

        temp.push({
            qnId,
            selected: optionIndex
        })


        if(questionIdx < 4) {
            setContext({
                selectedOptions: [...temp]
            })
            setQuestionIdx(prev => prev + 1);
        }else {
            setContext({
                selectedOptions: [...temp],
                timeTaken: timeTaken
            })
            navigate('/result')
        }
    }

    return (
        <Card
            sx={{
                maxWidth: 640,
                mx: 'auto',
                mt: 5
            }}>
            <CardHeader
                title={'Question ' + (questionIdx + 1) + ' of 5'}
                action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
            />
            <Box>
                <LinearProgress variant="determinate" value={((questionIdx + 1) * 100 / 5)} />
            </Box>
            <CardContent>
                <Typography>
                    {questions[questionIdx]?.qnInWords}
                </Typography>
                <List>
                    {questions[questionIdx]?.options?.map((item, index) => <ListItemButton onClick={() => updateAnswer(questions[questionIdx].qnId, index)} disableRipple>
                        {String.fromCharCode(65 + index) + ". "}
                        {item}
                    </ListItemButton>)}
                </List>
            </CardContent>
        </Card>
    )
}
