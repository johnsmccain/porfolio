import { dockApps } from "../constants";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
export const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon") as NodeListOf<HTMLElement>;
    const animateIcons = (mouseX: number) => {
        const {left} = dock.getBoundingClientRect();
        
        icons.forEach((icon: Element) => {
            const iconRect = icon.getBoundingClientRect();
            const iconCenterX = iconRect.left - left + iconRect.width / 2;
            const distance = Math.abs(mouseX - iconCenterX );
            const intensity = Math.exp(-(distance ** 2.5) / 20000); // Gaussian function for smooth scaling
            
            gsap.to(icon, {
                scale: 1 + 0.25 * intensity,
                y: -15 * intensity,
                duration: 0.2,
                ease: "power1.out"
            });
        });
     };
    const handleMouseMove = (e: MouseEvent) => {
        const {left} = dock.getBoundingClientRect();

        animateIcons(e.clientX - left);
        
    };

    const resetIcons = () => {
        icons.forEach((icon: Element) => {
            gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power1.out"
            });
        });

    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

   

  const toggleApp = ({ id, canOpen }: { id: string; canOpen: boolean }) => {
    const app = dockApps.find((app) => app.id === id);
    if (app) {
      app.canOpen = !canOpen;
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <div key={app.name} className="relative flex justify-center">
            <button
              className="dock-icon"
              type="button"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp({ id: app.id, canOpen: app.canOpen })}
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                title={app.name}
                loading="lazy"
                className={app.canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};
