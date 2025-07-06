import { useActivities } from "@/hooks/useActivities";
import { createContext, useContext } from "react";

type Activity = {
    id: number;
    steps: number;
    date: number;
};

type ActivitiesContextType = {
    activities: Activity[];
    getActivities: () => Promise<Activity[]>;
    loadActivities: () => Promise<void>;
    insertActivity: (steps: number) => Promise<any>;
    deleteAllActivities: () => Promise<void>;
    deleteActivity: (id: number) => Promise<void>;
};

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export const useActivitiesContext = () => {
    const context = useContext(ActivitiesContext);
    if (!context) {
        throw new Error('useActivitiesContext must be used within an ActivitiesProvider');
    }
    return context;
};

export function ActivitiesProvider({ 
    children,
}: { 
    children: React.ReactNode;
}) {
    const activities = useActivities(); 

    return (
        <ActivitiesContext.Provider value={activities}>
            {children}
        </ActivitiesContext.Provider>
    );
}