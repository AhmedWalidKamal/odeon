import React from "react";

export default () => {
  return (
    <div>
      <footer className="mt-5 p-4 text-center" style={{background: '#221f1f', color: 'dimgrey'}}>
        Copyright &copy; {new Date().getFullYear()} Odeon
      </footer>
    </div>
  );
};
