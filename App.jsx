import { useState, useEffect } from 'react'
import InputField from './inputField';
import './App.css'
import SearchPage from './SearchPage';
import Dashboard from './Dashboard';
import Button from './Button';
import Ai from './Ai';

function App() {
  const [searchComplete, setSearchComplete] = useState(false)
  const [cryptoDataObj, setCryptoDataObj] = useState(null)
  const [loading, setLoading] = useState(true);


  return(
    <>
      <title>CryptoInsight | AI-powered Insight</title>
      {searchComplete ? (
        /*loading ? (
          <h1>Loading...</h1>
        ) : */
        cryptoDataObj ? (
          <>
            <Dashboard data={cryptoDataObj} setSearchComplete={setSearchComplete}/>
            {/*<Ai/>*/}
          </>
        ) : (<>
              <Button 
                    label='↩' 
                    className='back-button' 
                    onClick ={()=>{
                        setSearchComplete(false)
                    }}>
                </Button>
              <p>No match found</p>
          </>
        )
      ) : (
        <>
            <SearchPage
              setCryptoDataObj={setCryptoDataObj}
              setSearchComplete={setSearchComplete}
              setLoading={setLoading}
            />
          </>
      )}
    </>
  )
}

export default App
