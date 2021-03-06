import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c); // will return the first index of the given element which can be found in the array
    // will return -1 if nothing is found
    const newCheckedCategoryId = [...checked];

    // if currentlychecked was not already in checked state > push
    //else pull/take off

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id) !== -1}
        type="checkbox"
        className="form-check-input "
      />
      <label className="form-check-label ms-1">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
