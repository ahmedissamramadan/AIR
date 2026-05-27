'use client';

// Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className="antialiased min-h-screen flex items-center justify-center p-4 text-center font-sans">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Something went wrong!</h2>
                    <p className="text-gray-500">Global Error Boundary Caught Exception</p>
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
