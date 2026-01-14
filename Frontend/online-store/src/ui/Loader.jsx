import { Atom } from "react-loading-indicators";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <Atom color="#9333ea" size="large" text="" textColor="" />
    </div>
  );
}

export default Loader;
