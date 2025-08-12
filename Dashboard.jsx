import { useState, useEffect } from 'react'
import Button from "./Button"
import PopularCrypto from "./PopularCrypto"
import Ai from './Ai'

function Dashboard({data, setSearchComplete}){

    const arrow = (data.priceChange < 0) ? '↘':'↗'
    const posNeg = (data.priceChange < 0) ? 'data-symbol-down':'data-symbol-up'

    const [aboutActive, setAboutActive] = useState(null) 
    const [aboutOutput,setAboutOutput] = useState(null)
    const [insightOutput,setInsightOutput] = useState(null)

    return(
        <>
            <Button 
                label='↩' 
                className='back-button' 
                onClick ={()=>{
                    setSearchComplete(false)
                }}>
            </Button>

            <div className='dashboard-container'>
                <div className='coin-container'>
                    <div className='coin-name'>
                        <p className='data-id'>
                            {<img className ='data-icon' src={`${data.icon}`} width="50" height="50" alt="" />}
                            {data.id}
                            <span className ='data-symbol'> {data.symbol}</span>
                        </p>
                    </div>

                    <div className='coin-price'>
                        <p className='data-price'>
                            <span className ={posNeg}>{arrow} {(Math.abs(data.priceChange)).toFixed(2)}% </span>
                         ${data.price}</p>
                    </div>
                </div>

                <div className='about-insight-container'>
                    <Button 
                        label='About' 
                        className='about-button' 
                        onClick ={()=>{
                            setAboutActive(true)
                        }}>
                    </Button>
                    <Button 
                        label='✦ Insight' 
                        className='insight-button' 
                        onClick ={()=>{
                            setAboutActive(false)
                        }}>
                    </Button>
                </div>


                <Ai setAboutOutput={setAboutOutput} setInsightOutput={setInsightOutput} name ={data.id} data ={data} />
                {aboutActive != null &&
                    <div className='ai-output'>
                        {(aboutActive == true ? <>General Information: <br/> {aboutOutput}</> : <> AI Insight: <br/>{insightOutput}</>)} 
                    </div>
                }



                <div className='extra-info'>
                    <div className='market-cap-container'>

                        <div className='market-cap-left'>
                            <div className='market-cap-text-container'>
                                <p className ='market-cap-text'>Market Cap</p>
                            </div>
                            <div className='market-cap-value-container'>
                                <p className ='market-cap-value'>${data.marketCap}</p>
                            </div>
                        </div>

                        <img className='market-cap-image' src='https://cdn-icons-png.flaticon.com/256/760/760685.png' width='65' height='65' alt=''/>

                    </div>

                    <div className ='volume-container'>

                        <div className ='volume-left'>
                            <div className='volume-text-container'>
                                <p className='volume-text'>24hr Volume</p>
                            </div>
                            <div className='volume-value-container'>
                                <p className ='volume-value'>${data.totalVolume}</p>
                            </div>
                        </div>

                        <img className='market-cap-image' src='https://cdn-icons-png.flaticon.com/512/4370/4370652.png' width='60' height='60' alt=''/>

                    </div>
                </div>
                {/*<p className='popular-dashboard'>Explore Popular Crypto</p>
                <PopularCrypto className='popular-crypto-container-dashboard'/>*/}
            </div>
        </>
    )
}

export default Dashboard