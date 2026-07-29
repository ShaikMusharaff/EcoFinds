import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;