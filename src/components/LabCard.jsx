import React, { useState } from "react";

function LabCard({ lab, onDeleteLab, onUpdatePrice }) {
  const [outOfStock, setOutOfStock] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    test: lab.test,
    sample: lab.sample,
    price: lab.price,
    image: lab.image
  });

  function handleToggleAvailability() {
    setOutOfStock(!outOfStock);
  }

  function handleDelete() {
    fetch(`https://phase-2-deploy.onrender.com/${lab.id}`, {
      method: "DELETE"
    }).then(() => onDeleteLab(lab.id));
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }


  function handleFormSubmit(e) {
    e.preventDefault(); 
    fetch(`https://phase-2-deploy.onrender.com/${lab.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        test: formData.test,
        sample: formData.sample,
        price: parseFloat(formData.price),
        image: formData.image

       })
    })
      .then((response) => response.json())
      .then((updatedLab) => {
        onUpdatePrice(updatedLab);
        setIsEditing(false);
      });
  }

  return (
    <li className="card">
      <img src={lab.image} alt={`${lab.test} ${lab.sample}`} />
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="edit-form">
          <input
            type="text"
            name="test"
            value={formData.test}
            onChange={handleInputChange}
            placeholder="Test"
          />
          <input
            type="text"
            name="sample"
            value={formData.sample}
            onChange={handleInputChange}
            placeholder="Sample"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h4>{lab.test} {lab.sample}</h4>
          <p>Price: ${lab.price}</p>
          <button onClick={handleToggleAvailability} className={outOfStock ? "" : "primary"}>
            {outOfStock ? "Out of Stock" : "Available"}
          </button>
          <button onClick={handleEditClick} className="edit-button">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default LabCard;