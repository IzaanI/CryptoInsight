import Button from "./Button"

function PopularCrypto({className, setSearchComplete, setSearchCrypto}){

    /*useEffect( () => {
        async function clickPopularCrypto(crypto){
            
        }
    })*/




    return(
        <>    
            <div className ={className}>
                
                <Button 
                    label='Bitcoin' 
                    className='popular-crypto' 
                    onClick ={()=>{
                        setSearchCrypto('bitcoin')
                        
                        console.log('boom')
                }}></Button>

                <Button 
                    label='Ethereum' 
                    className='popular-crypto' 
                    onClick ={()=>{
                        console.log('about')
                }}></Button>

                <Button 
                    label='XRP' 
                    className='popular-crypto'
                    onClick ={()=>{
                        console.log('about')
                }}></Button>

                <Button 
                    label='Tether' 
                    className='popular-crypto' 
                    onClick ={()=>{
                        console.log('about')
                }}></Button>
            </div>
        </>
    )
}

export default PopularCrypto