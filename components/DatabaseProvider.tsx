import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Suspense, use } from 'react';
import * as SQLite from 'expo-sqlite';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Function to initialize database schema
async function initializeDatabase(db: any) {
    try {
        // Create activities table if it doesn't exist
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS activities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                steps INTEGER NOT NULL,
                date INTEGER DEFAULT (strftime('%s', 'now'))
            )
        `);
        console.log('Database schema initialized successfully');
    } catch (error) {
        console.error('Error initializing database schema:', error);
    }
}

async function loadDatabase() {
    const name = 'activities.db';
    const dbPath = `${FileSystem.documentDirectory}SQLite/${name}`;
    const fileinfo = await FileSystem.getInfoAsync(dbPath);
    if (!fileinfo.exists) {
        console.log('Database file not found — copying from assets...');      // If the database file does not exist, copy it from the assets folder
        const dbAsset = require('../assets/activities.db'); // + name)
        const dbUri = Asset.fromModule(dbAsset).uri;
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`,
            { intermediates: true }
        );
        console.log('Copying database from assets to', dbPath);

        await FileSystem.downloadAsync(dbUri, dbPath);
 
        console.log('Database copied successfully');
    
    }
    console.log('Opening database at', dbPath);
}

function useDB(){
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        loadDatabase().then(() => setLoaded(true))
}, [])

return { loaded };
}

function DatabaseProvider({ children }: { children: React.ReactNode }) {
    const { loaded } = useDB();

    if (!loaded) {
        return null; // or a loading spinner
    }

    return (
        <Suspense fallback={<View><Text>Loading</Text></View>}>
        <SQLite.SQLiteProvider useSuspense databaseName='activities.db'>
            <DatabaseInitializer>
                {children}
            </DatabaseInitializer>
        </SQLite.SQLiteProvider>
        </Suspense>
    );
}

// Component to initialize database schema
function DatabaseInitializer({ children }: { children: React.ReactNode }) {
    const db = SQLite.useSQLiteContext();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (db && !initialized) {
            initializeDatabase(db).then(() => setInitialized(true));
        }
    }, [db, initialized]);

    if (!initialized) {
        return <View><Text>Initializing database...</Text></View>;
    }

    return <>{children}</>;
}

export default DatabaseProvider;
