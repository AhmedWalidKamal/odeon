import React from "react";

export default () => {
  return (
    <div>
      <footer className="mt-5 p-4 text-center" style={{background: 'linear-gradient(to right, rgba(20,20,20,1), rgba(20,20,20,0.75), rgba(20,20,20,1))', color: 'dimgrey'}}>
        Copyright &copy; {new Date().getFullYear()} Odeon
      </footer>
    </div>
  );
};
