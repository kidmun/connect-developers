import React from "react";
import './Notification.css';


const Notification = props => {
    let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = "error";
  }
  if (props.status === 'success') {
    specialClasses = "success";
  }

  const cssClasses = `notification ${specialClasses}`;

    return  <React.Fragment>
    <section className={cssClasses}>
    <h2>{props.title}</h2>
    
    <p>{props.message}</p>
    
  </section>
  <br/>
  </React.Fragment>
}

export default Notification;