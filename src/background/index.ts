import { runtime, tabs } from 'webextension-polyfill';

type Message = {
    from: string;
    to: string;
    action: string;
};

async function getCurrentTabUrl() {
    const [tab] = await tabs.query({ active: true, currentWindow: true });
    if(tab && tab.url){
        return tab.url;
    }

    return null;
}

runtime.onMessage.addListener( async(message: Message) => {
    if(message.to === 'backgound'){
        console.log('message backgound');
        if (message.action === 'get-url') {
            const url = await getCurrentTabUrl();
            console.log(`URL`, url);

            return { url };
        }
    }
})

runtime.onInstalled.addListener(() => {
    console.log('[background] loaded');
})
