export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-colors duration-500"></div>
                <div className="relative w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
