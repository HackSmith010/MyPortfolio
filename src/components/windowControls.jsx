import useWindowStore from "#store/window";

const CloseIcon = () => (
  <svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="1" x2="7" y2="7" />
    <line x1="7" y1="1" x2="1" y2="7" />
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="4" x2="7" y2="4" />
  </svg>
);

const MaximizeIcon = ({ isMaximized }) => (
  <svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
    {isMaximized ? (
      <>
        <rect x="2.5" y="1" width="4.5" height="4.5" />
        <rect x="1" y="2.5" width="4.5" height="4.5" />
      </>
    ) : (
      <rect x="1" y="1" width="6" height="6" />
    )}
  </svg>
);

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, windows } =
    useWindowStore();
  const isMaximized = windows[target]?.isMaximized ?? false;

  return (
    <div id="window-controls">
      <button
        type="button"
        className="ctrl-btn close"
        aria-label="Close"
        onClick={() => closeWindow(target)}
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        className="ctrl-btn minimize"
        aria-label="Minimize"
        onClick={() => minimizeWindow(target)}
      >
        <MinimizeIcon />
      </button>

      <button
        type="button"
        className="ctrl-btn maximize"
        aria-label={isMaximized ? "Restore" : "Maximize"}
        onClick={() => maximizeWindow(target)}
      >
        <MaximizeIcon isMaximized={isMaximized} />
      </button>
    </div>
  );
};

export default WindowControls;