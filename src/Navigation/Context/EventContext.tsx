import { createContext, useContext, useState } from 'react';
import { RegisteredUser } from '../../Types/Index';

// 1. Define what data the context will provide
type EventContextType = {
    user: RegisteredUser;
    setUser: React.Dispatch<React.SetStateAction<RegisteredUser>>;
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
    const [user, setUser] = useState<RegisteredUser>({
        firebaseUid: '',
        financialGoal: '',
        riskProfile: '',
    });


    return (
        <EventContext.Provider value={{user, setUser}}>
            {children}
        </EventContext.Provider>
    );
};

export {EventProvider, useEventContext};
