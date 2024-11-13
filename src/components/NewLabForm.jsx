import React, { useState } from "react";

function NewLabForm({ onAddLab }) {
  const [formData, setFormData] = useState({
    test: "",
    sample: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newLab = {
      test: formData.test,
      sample: formData.sample,
      image: formData.image,
      price: parseFloat(formData.price)
    };

    fetch("http://localhost:3000/labs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newLab)
    })
      .then((response) => response.json())
      .then((data) => {
        onAddLab(data);
        setFormData({ test: "", sample: "", image: "", price: "" });
      });
  }

  return (
    <div className="new-lab-form">
      <h2>New Lab</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="test"
          placeholder="Lab test"
          value={formData.test}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sample"
          placeholder="Lab sample"
          value={formData.sample}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Lab</button>
      </form>
    </div>
  );
}

export default NewLabForm;
