import { Card, CardContent, CardMedia, Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoint } from '../api';
import { getFormatedTime } from '../helpers';
import { useStateContext } from '../hooks/useStateContext'

export default function Result() {

  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId)
    createAPIEndpoint('questions/getanswers')
      .post(ids)
      .then(res => {
        const qna = context.selectedOptions.map(x => ({
          ...x,
          ...(res.data.find(y => y.qnId == x.qnId))
        }))
        setQnAnswers(qna)
        calculateScore(qna)
        console.log('qna', qna)
      })
      .catch(err => console.log(err))

  }, [])

  const calculateScore = (qnAnswers) => {
    let temp = qnAnswers.reduce((acc, curr) => {
      return curr.answer - 1 == curr.selected ? acc + 1 : acc;
    }, 0)
    setScore(temp);
    console.log('temp', temp)
  }

const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate('/quiz')
}

  return (
    <Card sx={{ mt: 5, display: 'flex', width: "100%", maxWidth: 640, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          <Typography variant="h4">Congratulations</Typography>
          <Typography variant="h6">
            Your score:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            <Typography variant="span">
              {score}
            </Typography>/5
          </Typography>
          <Typography variant="h6">
            Koha: {getFormatedTime(context.timeTaken) + ' minuta'}

          </Typography>
          <Button variant="contained"
            sx={{ mx: 1 }}
            size="small"
            >
            Submit
          </Button>
          <Button variant="contained"
            sx={{ mx: 1 }}
            size="small"
            onClick={restart}>
            Re-start
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 220 }}
        image="https://media.istockphoto.com/vectors/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition-vector-id1168757141?k=20&m=1168757141&s=612x612&w=0&h=_jia0PPMGux63K2gqp-o0OzRcHbd6bvjVQJ70rz3nF8="
      />
    </Card>
  )
}
