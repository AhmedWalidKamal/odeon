import React from "react";

export default () => {
  return (
    <div>
      <footer className="mt-5 p-4 text-center" style={{background: '#111111', color: 'dimgrey', height: 'auto'}}>
        Copyright &copy; {new Date().getFullYear()} Odeon
      </footer>
    </div>
  );
};
