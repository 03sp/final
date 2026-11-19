// The prototype is a self-contained page served from /public/prototype/index.html.
// Its readable source lives in /prototype-src (shell.js, screens/*.js, shell.css).
export default function Page() {
  return (
    <iframe
      src="/prototype/index.html"
      title="DMS Collections prototype"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
