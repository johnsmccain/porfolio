import { useMotionValue } from "framer-motion";
import { apps } from "~/configs";

interface DockProps {
  open: (id: string) => void;
  showApps: {
    [key: string]: boolean;
  };
  showLaunchpad: boolean;
  toggleLaunchpad: (target: boolean) => void;
  hide: boolean;
}

export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}: DockProps) {
  const { dockSize, dockMag } = useStore((state) => ({
    dockSize: state.dockSize,
    dockMag: state.dockMag
  }));

  const openApp = (id: string) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue<number | null>(null);
  const isMobile = window.innerWidth < 640;
  const displayedApps = isMobile ? apps.slice(0, 4) : apps;

  return (
    <div
      className={`dock fixed bottom-0 left-0 right-0 ${hide ? "z-0" : "z-50"} 
        sm:bottom-1 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2`}
      w="full sm:max"
    >
      <ul
        className="flex justify-center space-x-1 sm:space-x-2 px-2 sm:px-2 py-2 sm:py-0 
          backdrop-blur-2xl bg-c-white/20 h-16 sm:h-auto"
        border="~ c-400/40 rounded-none sm:rounded-xl"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          height: window.innerWidth < 640 ? '4rem' : `${(dockSize + 15) / 16}rem`
        }}
      >
        {displayedApps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.title}
            img={app.img}
            mouseX={mouseX}
            desktop={app.desktop}
            openApp={openApp}
            isOpen={app.desktop && showApps[app.id]}
            link={app.link}
            dockSize={dockSize}
            dockMag={dockMag}
          />
        ))}
      </ul>
    </div>
  );
}
