import React, { useState } from "react";
import { IINPUTTYPE } from "./inputTypes";
import XForm from "./XForm";

const options: IINPUTTYPE[] = [
  { labelName: "input", value: "input" },
  { labelName: "date", value: "date" },
  { labelName: "email", value: "email" },
  { labelName: "teaxtarea", value: "teaxtarea" },
];

const TodoType = () => {
  const [state, setState] = useState<{
    labelName: string;
    placeholder: string;
    type: string;
  }>({ labelName: "", placeholder: "", type: "" });

  const [data, setData] = useState<
    { labelName: string; placeholder: string; type: string }[]
  >([]);

  const SelectJsx = () => (
    <select
      className="form-select"
      name="type"
      value={state.type}
      onChange={(e) => handleChange(e)}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {" "}
          {item.labelName}{" "}
        </option>
      ))}
    </select>
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(e.target.name);
  };

  const HandleAddToListClick = () => {
    setData([...data, state]);
  };

  const removeList = (labelName: string) => {
    setData(data.filter(item=> {return item.labelName !== labelName}))
  }

  return (
    <div style={{ display: "flex" , justifyContent: 'space-evenly' }}>
      <div style={{ width: "18rem" }}>
        <div className="mb-3">
          <label className="form-label"> label name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="labelName"
            value={state.labelName}
            onChange={(event) => handleChange(event)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Place holder</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="placeholder"
            value={state.placeholder}
            onChange={(event) => handleChange(event)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label"> Select Input Types </label>
          <SelectJsx />
        </div>

        <div className="mb-4 d-grid gap-2">
          <button className="btn btn-primary" onClick={HandleAddToListClick}>
            Add to List
          </button>
        </div>
      </div>

      <div style={{ width: "18rem" }}>
          <XForm data={data} removeList = {removeList}/>
      </div>
    </div>
  );
};

export default TodoType;
