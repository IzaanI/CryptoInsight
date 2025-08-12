import { useState, useEffect } from 'react'
import InputField from './inputField';
import './App.css'
import PopularCrypto from './PopularCrypto';

//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

function SearchPage({setSearchComplete, setCryptoDataObj, setLoading}) {
  const [searchCrypto, setSearchCrypto] = useState("")
  const [temp, setTemp] = useState("")
  const [coinPrice, setCoinPrice] = useState(null)

  const [isSearchFocused, setIsSearchFocused] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    setSearchCrypto(temp)
  }

  function formatDecimal(val){
    var decNum = val

    if(val > 1 ) {
        return new Intl.NumberFormat('en', {
            notation: 'compact',
            maximumFractionDigits: (decNum < 1000) ? 2: 2,
        }).format(decNum);
    }else if(val > 0.01){decNum=val.toFixed(2)}
    else{decNum = val.toFixed(4)}

    return decNum
  }

    useEffect(() => {
        setLoading(true)
        async function fetchCryptoPrice() {
            try{
                const searchRes = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchCrypto}`);
                const searchData = await searchRes.json();
                const firstCoinId = searchData?.coins?.[0]?.id;

                if(!firstCoinId) {
                    console.warn("No coin found for search:", searchCrypto);
                    setCryptoDataObj(null);
                    setSearchComplete(true)
                    return;
                }

                const coinRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${firstCoinId}`);
                const coinData = await coinRes.json();
                console.log(coinData)

            setCryptoDataObj({
                id: firstCoinId,
                symbol: coinData[0].symbol,
                price: formatDecimal(coinData[0].current_price),
                priceChange:coinData[0].price_change_percentage_24h,
                marketCap: formatDecimal(coinData[0].market_cap),
                totalVolume: formatDecimal(coinData[0].total_volume),
                icon: coinData[0].image,
            })
            
            setLoading(false)
            setSearchComplete(true)

            }catch(err){
                console.error("Error fetching crypto data:", err)
                setCryptoDataObj(null);
                setSearchComplete(true)
            }
        }

        if (searchCrypto) {
            fetchCryptoPrice();
        }
        
    }, [searchCrypto]);


  return (
    <>
        <div className = 'main-container'>
            <h1 className = {isSearchFocused ? 'header-crypto-focused' :'header-crypto'}>
                Crypto<span className ='header-span'>Insight</span>
            </h1>
            <p className ={isSearchFocused ? 'website-description-focused' :'website-description'}>
                Discover real-time information and <span className='ai-powered'>AI-powered</span> insight about any cryptocurrency
            </p>
            <form onSubmit = {handleSubmit}>
                <InputField 
                    className = "search-bar"
                    onFocus = {() => {
                        setIsSearchFocused(true)
                    }}
                    onBlur = {() => {
                        
                        setIsSearchFocused(false) 
                    }}
                    label = "🔎︎ Search for a Cryptocurrency"
                    value = {temp}
                    onChange = {(e) => {
                        const val = e.target.value
                        setTemp(val)
                    }}
                />
                
            </form>

            {isSearchFocused ? (
                <>
                    {/*<p className='popular-search'>Explore Popular Crypto</p>
                    <PopularCrypto className='popular-crypto-container-search' setSearchComplete={setSearchComplete} setSearchCrypto={setSearchCrypto}/>*/}
                </>
             ): (<p></p>)}
            
            
        </div>

    </>
  )
}

export default SearchPage
