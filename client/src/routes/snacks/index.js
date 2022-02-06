import React, { useEffect, useState } from 'react';
import './index.css';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { API_URL } from '../../config/Constants';

const sampleData = JSON.parse(`[
  {
    "_id":"61b605d54e22a3a7025bae21",
    "name":"bỏng ngô",
    "img":"/uploads/images/snacks/pop-corn.png",
    "price":{"M":80000,"L":100000,"XL":150000},
    "desc":"",
    "feedback":[]
  },
  {
    "_id":"61b605d54e22a3a7025bae22",
    "name":"coca",
    "img":"/uploads/images/snacks/coca.png",
    "price":{"M":20000,"L":40000,"XL":60000},
    "desc":"",
    "feedback":[]
  },
  {
    "_id":"61b605d54e22a3a7025bae23",
    "name":"pepsi",
    "img":"/uploads/images/snacks/pepsi.png",
    "price":{"M":20000,"L":40000,"XL":60000},
    "desc":"",
    "feedback":[]
  },
  {
    "_id":"61b605d54e22a3a7025bae24",
    "name":"ostar",
    "img":"/uploads/images/snacks/ostar.png",
    "price":{"M":20000,"L":40000,"XL":60000},
    "desc":"",
    "feedback":[]
  }
]`)

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function Element(props) {

  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, height: 500, flexGrow: 1 }}>
      <Grid 
        container 
        direction="column" 
        justifyContent="center"
        alignItems="center"
        spacing={2}>

        <Grid item xs>
          <ButtonBase sx={{ minWidth: 128, minHeight: 128, maxWidth: 256, height: 256 }}>
            <Img alt="complex" src={`${API_URL}${props.data.img}`} />
          </ButtonBase>
        </Grid>

        <Grid item xs container direction="column" spacing={2}>

          <Grid item xs container direction="column">
            <Typography gutterBottom variant="subtitle1" component="div">
              <b>{`${props.data.name}`}</b>
            </Typography>
            <Typography variant="body2" gutterBottom style={{paddingLeft: '15%', wordBreak: 'break-all'}}>
              {`${props.data.desc.length > 50 ? `${props.data.desc.substr(0, 50)}...` 
                : props.data.desc + ' ' + '\u00A0'.repeat(50 - 1 - props.data.desc.length)}`}
            </Typography>
          </Grid>
          
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              <b>Giá</b>
            </Typography>
            {Object.entries(props.data.price).map(([key, value]) => {
              return (
                <Grid item xs container justifyContent="flex-end" direction="row" key={key} style={{paddingBottom: '5%'}}>
                  <Grid item xs style={{paddingLeft: '15%'}}>
                    {`Size ${key}`}
                  </Grid>
                  <Grid item xs container justifyContent="flex-end">
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(value)}
                  </Grid>
                </Grid>
              )
            })}      
          </Grid>

        </Grid>

      </Grid>
    </Paper>
  )
}

export default function MovieList() {

  const [snacks, setSnacks] = useState([])

  useEffect(() => {

    setSnacks(sampleData)

    return () => {}
  }, [])

  return(
    <Box style={{paddingLeft: '8%', paddingRight: '8%', paddingTop: '1%'}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
        {snacks.map((value, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Element data={value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}