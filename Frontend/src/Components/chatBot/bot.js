import React, { useEffect } from 'react';

const ChatBot = () => {
    useEffect(() => {
        const kommunicateSettings = {
            appId: "66e94e520d49cb45ab364cd20fc9afed",
            popupWidget: true,
            automaticChatOpenOnNavigation: true
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        const head = document.getElementsByTagName("head")[0];
        head.appendChild(script);

        window.kommunicate = window.kommunicate || {};
        window.kommunicate._globals = kommunicateSettings;

        return () => {
            // Clean up the script when the component unmounts
            head.removeChild(script);
            delete window.kommunicate;
        };
    }, []);

    return (
        <div>
        </div>
    );
};

export default ChatBot;
