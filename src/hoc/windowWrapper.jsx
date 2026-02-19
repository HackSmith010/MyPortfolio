import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useRef, useLayoutEffect, useEffect } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];

    const ref = useRef(null);
    const draggableRef = useRef(null);

    // ── Open animation ──────────────────────────────────────────────
    // Only play the pop-in animation when NOT maximized (maximized windows
    // just fill the screen with CSS, no animation needed).
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMaximized) return;

      el.style.display = "block";
      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }, [isOpen]);

    // ── Draggable — restricted to #window-header ─────────────────────
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector("#window-header");

      const [instance] = Draggable.create(el, {
        // Only the header acts as the drag handle
        trigger: header || el,
        // Prevent dragging out of the viewport
        bounds: window,
        onPress: () => focusWindow(windowKey),
      });

      draggableRef.current = instance;
      return () => instance.kill();
    }, []);

    // ── Enable / disable drag when maximize toggles ──────────────────
    useEffect(() => {
      const instance = draggableRef.current;
      if (!instance) return;
      if (isMaximized) {
        instance.enable();
      } else {
        instance.enable();
      }
    }, [isMaximized]);

    // ── Visibility + minimize animation ─────────────────────────────
    // When minimizing: animate scale+opacity out FROM the current screen
    // position (getBoundingClientRect), then hide.
    // When restoring: just show — the open animation handles the rest.
    const prevMinimized = useRef(false);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Closing the window — instant hide
      if (!isOpen) {
        gsap.killTweensOf(el);
        el.style.display = "none";
        prevMinimized.current = false;
        return;
      }

      // Transitioning INTO minimized
      if (isMinimized && !prevMinimized.current) {
        prevMinimized.current = true;
        // Animate out from wherever the window currently sits on screen
        gsap.to(el, {
          scale: 0.5,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
            // Reset transform so when restored it appears at normal scale
            gsap.set(el, { scale: 1, opacity: 1 });
          },
        });
        return;
      }

      // Transitioning OUT of minimized (restore)
      if (!isMinimized && prevMinimized.current) {
        prevMinimized.current = false;
        el.style.display = "block";
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
        );
        return;
      }

      // Normal show (not from a minimize transition)
      el.style.display = "block";
    }, [isOpen, isMinimized]);

    // ── CSS class ────────────────────────────────────────────────────
    const windowClass = [
      "absolute",
      "window-resizable",
      isMaximized ? "window-maximized" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className={windowClass}>
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
