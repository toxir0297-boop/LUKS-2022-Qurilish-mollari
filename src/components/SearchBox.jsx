import React from "react";


export default function SearchBox({
  value,
  onChange,
  placeholder="Qidirish..."
}) {


  return (

    <input

      className="sale-input"

      type="text"

      placeholder={"🔍 " + placeholder}

      value={value}

      onChange={(e)=>onChange(e.target.value)}

    />

  );

}