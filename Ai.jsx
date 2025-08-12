import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from 'react'

function Ai({setAboutOutput, setInsightOutput, name, data}){

    const [counter,setCounter] = useState(0)
    const aboutPrompt = `Use 50-75 words. Provide a brief description about the cryptocurrency: ${name}. 
                        This should include any availabile information on who discovered the coin and when,
                        the use of the coin or purpose of creation, and any recent news or developments.`

    const insightPrompt =`Use approx 60-85 words, and no formatting in the text of your response. Assume that you are a market analyst and financial advisor. Consider the cryptocurrency, ${name}. Provide investment advice
                        and recommendations regarding this crypocurrency using fact based reasoning. Start your response  
                        by simply stating your recommendation for those trying to optimize portfolio growth. Suggest a portfolio allocation in % if applicable.
                        Then, use current stock market trends, economic factors, function(s) of the coin (if any), or any other factors that may
                        be worth considering to explain the basis of your insight. Provide clear justification, keeping jargon at a minimum. 
                        Avoid using phrases like 'I recommend' and try to speak objectively. Speak strictly about the crypto at hand and please avoid comparing to other coins.
                        The following is some JSON data that you may use if nessessary: ${data}`

    const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

    useEffect(() =>{
        async function callGemini() {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: aboutPrompt,
            });
            console.log(data)
            const aboutData = response.text;
            setAboutOutput(aboutData);


            const newResponse = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: insightPrompt,
            });
            const insightData = newResponse.text;
            console.log(newResponse.text)
            setInsightOutput(insightData)
        }
        callGemini()
    },[])

}


export default Ai
