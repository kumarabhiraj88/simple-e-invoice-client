import React, { useEffect } from 'react'
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Row, Col } from 'react-bootstrap';
import LineChart from '../charts/lineChart';
import BarChart from '../charts/barChart';
import DoughnutChart from '../charts/doughnutChart';

import { connect } from "react-redux";

const useStyles = makeStyles((theme)=>({
    filed: {
      //color: theme.palette.secondary.dark,
      color: 'rgba(51, 51, 51, 1)',
      borderColor: '#333333',
      width:'140px',
      height:'90px',
    },
    categorised: {
       // color: theme.palette.warning.dark, 
        color: 'rgba(255 ,193 ,7, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    progress: {
        //color: theme.palette.primary.light, 
        color: 'rgba(0, 123 ,255, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    pending: {
       // color: theme.palette.error.main, 
        color: 'rgba(220 ,53 ,69, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    resolved: {
        //color: theme.palette.info.dark, 
        color: 'rgba(23 ,162 ,184, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    closed: {
        //color: theme.palette.success.dark, 
        color: 'rgba(40 ,167 ,69, 1)',
        borderColor: '#333333',
       // fontSize: 18,
        width:'140px',
        height:'90px',
      }
    
  }));

const Dashboard = props => {
    const classes = useStyles();


  


	return (
            <Container className="pageContainer" >
                <Row className='pageHeading'>
                   Dashboard
                   
                </Row>

               
            </Container>

		);
};



export default Dashboard;