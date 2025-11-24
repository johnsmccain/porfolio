import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { useRef } from "react"

interface fontTypes {
    subtitle: {
        min: number;
        max: number;
        default: number;
    };
    title: {
        min: number;
        max: number;
        default: number;
    };
}

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
}
const renderText = (text: string, className: string, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span key={i} className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const setUpTextHover = (container:any, type: any) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type as keyof fontTypes];

    const animateLetter = (letter: string, weight: number, duration: number = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power3.out",
            fontVariantionSettings: `'wght' ${weight}'`
        })
    }

    const handleMouseMove = (e: MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.array.forEach((letter: any) => {
            const { left: letterLeft, width: letterWidth } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (letterLeft - left + letterWidth / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    }

    const handleMouseLeave = () => {
        letters.array.forEach((letter: any) => {
            animateLetter(letter, base, 0.3);
        });
    }
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mousemove", handleMouseMove);
    };
}
const Welcome = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const subtileRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tiltleCleanUp = setUpTextHover(subtileRef.current, "subtitle");
        const setUTextHoverCleanUp = setUpTextHover(titleRef.current, "title");

        return () => {
            tiltleCleanUp && tiltleCleanUp();
            setUTextHoverCleanUp && setUTextHoverCleanUp();
        }   
    }, []);
    
    return (
        <section id="welcome">
            <p ref={subtileRef}>
                {renderText("Hey, I'm John! Welcome to my", "text-3xl font-georama", 100)}
            </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText("portfolio", "text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>This portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    )
}


export default Welcome