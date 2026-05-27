"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { normalizeImageSrc } from "@/lib/imageDeduper";

export function ImageDeduplicationProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const seen = new Set<string>();
        const root = document.body;

        // Helper to process a single image element
        const processImage = (img: HTMLImageElement) => {
            const src = img.getAttribute("src") || img.getAttribute("srcset");
            // check srcset too as it might contain the same image
            if (!src) return;

            // We focus on the main src for deduplication identity
            const mainSrc = img.getAttribute("src") || "";
            const normalized = normalizeImageSrc(mainSrc);

            if (seen.has(normalized)) {
                // Only remove if it's not the exact same element (sanity check)
                // and if it doesn't have a specific override attribute
                if (!img.hasAttribute("data-allow-duplicate")) {
                    console.warn("[ImageDeduplication] Detected duplicate image:", normalized);
                    // DISABLED: Hiding images actively causes Hydration Mismatches with React/Next.js
                    // and incorrectly targets UI elements like recurring Avatars.
                    // We rely on server-side 'preprocessHtmlContent' for the main duplication case (Hero vs Body).

                    // img.style.display = 'none'; 
                }
            } else {
                seen.add(normalized);
                // We do NOT write to DOM to avoid hydration mismatches
                // img.setAttribute("data-normalized-src", normalized);
            }
        };

        // 1. Initial Scan
        const initialImgs = Array.from(root.querySelectorAll("img"));
        initialImgs.forEach(processImage);

        // 2. Observe for new images
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const node of Array.from(m.addedNodes)) {
                    if (node instanceof HTMLElement) {
                        if (node.tagName === "IMG") {
                            processImage(node as HTMLImageElement);
                        } else {
                            const nestedImgs = node.querySelectorAll("img");
                            nestedImgs.forEach(processImage);
                        }
                    }
                }
            }
        });

        observer.observe(root, { childList: true, subtree: true });

        // Cleanup on unmount or route change (though route change triggers re-mount of provider usually if inside proper layout, 
        // but here we are inside RootLayout so it persists. We need to clear 'seen' on pathname change? 
        // Actually, distinct pages SHOULD allow same images. 
        // The provider is inside RootLayout, but the effect depends on pathname?
        // If we want to reset strictness per page navigation:
        // We are using `key={pathname}` strategy or simply resetting `seen` in useEffect dependency.

        return () => observer.disconnect();
    }, [pathname]); // Reset logic on route change

    return <>{children}</>;
}
