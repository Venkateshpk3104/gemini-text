import { createContext,useState } from "react";
import runChat from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");//save the input from the user
    const [recentPrompt, setRecentPrompt] = useState("");//all the data is saved invthe recent prompt
    const [prevPrompt, setPrevPrompt] = useState([]);// To store the previous history and show it in the recents
    const [showResult, setShowResult] = useState(false);//if the booleanis true it hides the card and shows the result
    const [loading, setLoading] = useState(false);// if the data is loading it shows the loading screen and after getting it get false
    const [resultData, setResultData] = useState("");// to display the result on the web page

    const delayPara = (index,nextWord) =>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        },75*index)
    
    }
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSend = async(prompt) =>{  
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response =await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        let responseArray=response.split("**")
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0||i%2!==1){
                newResponse += responseArray[i]
            }
            else{
                newResponse+="<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2=newResponse.split("*").join("<br/>")
        let newResponseArray=newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord= newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setResultData(newResponse2)
        setLoading(false)
        setInput("")

    }
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSend,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        input,
        setInput,
        resultData,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;