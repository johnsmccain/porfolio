import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { useRef } from "react"

interface FontTypes {
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

const FONT_WEIGHTS: FontTypes = {
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

const setUpTextHover = (container: HTMLElement | null, type: keyof FontTypes) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter: Element, weight: number, duration: number = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power3.out",
            fontVariationSettings: `'wght' ${weight}`
        })
    }

    const handleMouseMove = (e: MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        Array.from(letters).forEach((letter) => {
            const { left: letterLeft, width: letterWidth } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (letterLeft - left + letterWidth / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    }

    const handleMouseLeave = () => {
        Array.from(letters).forEach((letter) => {
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
    const subtitleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const titleCleanUp = setUpTextHover(subtitleRef.current, "subtitle");
        const subtitleCleanUp = setUpTextHover(titleRef.current, "title");

        return () => {
            titleCleanUp?.();
            subtitleCleanUp?.();
        }   
    }, []);
    
    return (
        <section id="welcome">
            <p ref={subtitleRef}>
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