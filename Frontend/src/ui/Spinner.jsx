function Spinner() {
  return (
    <div className="mx-auto my-12">
      <div
        className="h-16 w-16 animate-spin rounded-full"
        style={{
          background: `radial-gradient(farthest-side, #9333ea 94%, transparent) top/10px 10px no-repeat, conic-gradient(transparent 30%, #9333ea)`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)`,
        }}
      ></div>
    </div>
  );
}

export default Spinner;
