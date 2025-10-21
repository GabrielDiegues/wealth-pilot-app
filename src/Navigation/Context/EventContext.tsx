import { createContext, useContext, useState } from 'react';

// 1. Define what data the context will provide
type EventContextType = {
    firebaseUid: string;
    setfirebaseUid: React.Dispatch<React.SetStateAction<string>>;
}


// 2. Create the context
const EventContext = createContext<EventContextType | undefined>(undefined);


// 3. Create a custom hook for easier usage
const useEventContext = () => {
    const context = useContext(EventContext);
    if(!context) { throw new Error('useEventContext must be used inside EventProvider'); }
    return context;
};


// 4. Create the provider component
const EventProvider = ({children}: {children: React.ReactNode}) => {
    const [firebaseUid, setfirebaseUid] = useState('');


    return (
        <EventContext.Provider value={{firebaseUid, setfirebaseUid}}>
            {children}
        </EventContext.Provider>
    );
};

export {EventProvider, useEventContext};
