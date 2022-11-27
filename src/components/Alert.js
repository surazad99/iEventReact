import React from "react";

const Alert = (props) => {
 
  const handleClose = ()=>{
    props.showAlert(null, null);
  }
  return (
    <div className={`container my-2 alert alert-${props.alert.type} alert-dismissible ${props.alert.msg ? 'show' : 'fade'}`} role="alert">
      {props.alert.msg}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleClose}
      ></button>
    </div>
  );
};

export default Alert;
