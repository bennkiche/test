import React, { useState } from "react";

function LabCard({ lab, onDeleteLab, onUpdatePrice }) {
  const [outOfStock, setOutOfStock] = useState(false);

  function handleToggleAvailability() {
    setOutOfStock(!outOfStock);
  }

  function handleDelete() {
    fetch(`http://localhost:3000/labs/${lab.id}`, {
      method: "DELETE"
    }).then(() => onDeleteLab(lab.id));
  }

  function handlePriceUpdate(e) {
    const newPrice = parseFloat(e.target.value);
    fetch(`http://localhost:3000/labs/${lab.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then((response) => response.json())
      .then((updatedLab) => {
        onUpdatePrice(updatedLab);
      });
  }

  return (
    <li className="card">
      <img src={lab.image} alt={`${lab.test} ${lab.sample}`} />
      <h4>{lab.test} {lab.sample}</h4>
      <p>Price: ${lab.price}</p>
      <input
        type="number"
        step="0.01"
        defaultValue={lab.price}
        onBlur={handlePriceUpdate}
      />
      <button onClick={handleToggleAvailability} className={outOfStock ? "" : "primary"}>
        {outOfStock ? "Out of Stock" : "Available"}
      </button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </li>
  );
}

export default LabCard;