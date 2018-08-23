import React from "react";

const Input = props => (

    <div className="form-group">
        <label htmlFor={props.for}>{props.title}</label>
        <input value={props.value} type="text" className="form-control" id={props.id} name={props.name} onChange={props.onChange} />
    </div>

);

export default Input;