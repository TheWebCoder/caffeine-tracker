import CoffeeForm from "./components/CoffeeForm";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import Stats from "./components/Stats";
import History from "./components/History";
import { useAuth } from "./context/AuthContext";

function App() {
    const { globalUser, isLoading, globalData } = useAuth();
    const isAuthenticated = !!globalUser;
    const isData = globalData && !!Object.keys(globalData).length;

    const authenticatedContent = (
        <>
            <Stats />
            <History />
        </>
    );

    return (
        <Layout>
            <Hero />
            <CoffeeForm isAuthenticated={isAuthenticated} />
            {isAuthenticated && isLoading && (
                <div className="flex items-center gap-3 text-stone-400 animate-in opacity-0">
                    <span
                        className="inline-block w-6 h-6 border-2 border-amber-500/60 border-t-transparent rounded-full animate-spin"
                        aria-hidden
                    />
                    <span>Loading your data…</span>
                </div>
            )}
            {isAuthenticated && isData && authenticatedContent}
        </Layout>
    );
}

export default App;
