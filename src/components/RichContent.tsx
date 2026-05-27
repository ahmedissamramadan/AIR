import Image from 'next/image';
import parse, { DOMNode, Element } from 'html-react-parser';

interface RichContentProps {
    content: string;
}

export function RichContent({ content }: RichContentProps) {
    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element && domNode.name === 'img') {
                const { src, alt, style } = domNode.attribs;

                // Allow styles to pass through but override width/height for responsive layout
                const isCentered = style?.includes('text-align: center') || domNode.parent && (domNode.parent as Element).attribs?.style?.includes('text-align: center');

                return (
                    <div className={`relative w-full my-8 ${isCentered ? 'flex justify-center' : ''}`}>
                        {/* Wrapper for aspect ratio or max-width control */}
                        <div className="relative w-full max-w-3xl mx-auto h-auto">
                            <Image
                                src={src}
                                alt={alt || 'Blog Image'}
                                width={800} // Default base width
                                height={450} // Aspect ratio placeholder, height is auto in CSS
                                className="rounded-xl shadow-lg w-full h-auto object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            />
                        </div>
                    </div>
                );
            }
        }
    };

    return <div className="rich-content">{parse(content, options)}</div>;
}
