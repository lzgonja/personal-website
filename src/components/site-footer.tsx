export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell connect-footer">
        <h2>Let&apos;s connect.</h2>
        <div className="connect-links">
          <a href="mailto:lanazgonjanin@gmail.com">
            <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20"><path d="M3 6.5h18v12H3zM4 7l8 6 8-6" /></svg>
            <span>lanazgonjanin@gmail.com</span>
          </a>
          <a href="http://linkedin.com/in/lanazgonjanin" rel="noreferrer" target="_blank">
            <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20"><path d="M5 9v10M5 5.5v.1M10 19v-6c0-2 1.2-3.5 3.3-3.5S17 11 17 13v6M10 10v9" /></svg>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/lzgonja" rel="noreferrer" target="_blank">
            <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20"><path d="M9 19c-4 .8-4-2-5-2.5M14.5 21v-3.2c0-1 .1-1.5-.5-2 2.8-.3 5.7-1.4 5.7-6.2A4.8 4.8 0 0 0 18.4 6c.1-.3.6-1.7-.1-3.5 0 0-1.1-.4-3.7 1.4a12.6 12.6 0 0 0-6.7 0C5.3 2.1 4.2 2.5 4.2 2.5 3.5 4.3 4 5.7 4.1 6a4.8 4.8 0 0 0-1.3 3.6c0 4.8 2.9 5.9 5.7 6.2-.5.4-.6 1-.6 2V21" /></svg>
            <span>GitHub</span>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Lana Zgonjanin</p>
      </div>
    </footer>
  );
}
