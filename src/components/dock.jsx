import { Tooltip } from "react-tooltip";
import { dockApps } from "#constants";
import { React, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const Dock = () => {
  const dockRef = useRef(null);
  const { openWindow, closeWindow, restoreWindow, windows } = useWindowStore();

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const handleMouseEnter = (icon) => {
      gsap.to(icon, { scale: 1.12, duration: 0.15, ease: "power2.out" });
    };
    const handleMouseLeave = (icon) => {
      gsap.to(icon, { scale: 1, duration: 0.15, ease: "power2.out" });
    };

    icons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => handleMouseEnter(icon));
      icon.addEventListener("mouseleave", () => handleMouseLeave(icon));
    });

    return () => {
      icons.forEach((icon) => {
        icon.removeEventListener("mouseenter", () => handleMouseEnter(icon));
        icon.removeEventListener("mouseleave", () => handleMouseLeave(icon));
      });
    };
  }, []);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const win = windows[app.id];
    if (win.isOpen) {
      if (win.isMinimized) {
        restoreWindow(app.id);
      } else {
        closeWindow(app.id);
      }
    } else {
      openWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const win = windows[id];
          const isOpen = win?.isOpen && !win?.isMinimized;

          return (
            <div key={id} className="dock-icon-wrapper relative">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-place="right"
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-50"}
                />
              </button>

              {win?.isOpen && (
                <span className="dock-indicator" aria-hidden="true" />
              )}
            </div>
          );
        })}

        <Tooltip id="dock-tooltip" place="right" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
