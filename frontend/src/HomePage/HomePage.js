import React, { useEffect, useRef,useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Chart from 'chart.js/auto'
import * as d3 from 'd3';

const buttonStyle = {
  display: 'inline-block',
  padding: '15px 30px',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  textDecoration: 'none',
  backgroundColor: '#4CAF50', /* Green */
  color: 'white',
  border: '2px solid #4CAF50',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
  cursor: 'pointer',
  margin: '10px',
};

const hoverStyle = {
  backgroundColor: 'white',
  color: '#4CAF50',
};

const paragraphStyle = {
    fontSize: '18px',
    color: '#555',
    marginTop: '20px',
  };

function HomePage() {
    return (
        <main  className="center" id="main" aria-label="main">
            
                <div className="page-area">    
                    <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>
                
        
                
                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>
                
        
                
                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>
                
        
                
    
                <article>
                    
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>
        <div>        
      <Link to="/login">
        <button style={buttonStyle}>Already a user Login to track your budget</button>
      </Link>
        </div>

        <p style={paragraphStyle}>OR</p>
        <div>
      <Link to="/signup">
        <button style={buttonStyle}>Track your budget by Signing up</button>
      </Link>
      </div>
                
            {/* <section className="chart-container">
            <article className="chart">
                <h1>Chart</h1>
                    <p>
                        <canvas ref={chartRef} />
                    </p>
             
            </article>
    
            <article className="chart">
                <h1>D3JS Chart</h1>
                <svg ref={svgRef}></svg>
                
                
            </article>
        </section>        */}
        </div>  
        </main>
        
     

    );
    
  }
  
  export default HomePage;