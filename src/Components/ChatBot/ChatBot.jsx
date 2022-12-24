import React from 'react'

const ChatBot = () => {
    (function(d, m){
        var kommunicateSettings = {"appId":"1b6bdadcb64fb9ebfa6b451a3683cd4a1","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
  return (
    <div>

    </div>
  )
}

export default ChatBot