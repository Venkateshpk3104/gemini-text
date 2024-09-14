import React from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";

function Sidebar() {

  const [extended,setExtended]=React.useState(false);
  const {onSend,prevPrompt,setRecentPrompt,newChat}=React.useContext(Context);
  const loadPrompt= async(prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  }

  return (
    <div className="sidebar">
     <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="menu" />
        <div onClick={()=>newChat()} className="new-chat" >
            <img src={assets.plus_icon} alt="plus" />
            {extended?<p>New Chat</p>:null}   
        </div>

        {extended? <div className="recents">   
            <p className="recent-title">Recents</p>
            {prevPrompt.map((item, index) => (
                  <div
                     key={index} // Ensure a unique key for each item
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                  >
                   <img src={assets.message_icon} alt="message" />
                   <p>{item.slice(0, 18)}...</p>
                  </div>
                  ))}
        </div>:null}
       
     </div>

     <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="question" />
            {extended?<p>Help</p>:null}
           
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="history" />
            {extended? <p>Activity</p>:null}
           
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="settings" />
            {extended?<p>Settings</p>:null}
            
        </div>
     </div>

    </div>
  );
}
export default Sidebar;