import React from "react";
import LabCard from "./LabCard";

function LabList({ labs, onDeleteLab, onUpdatePrice }) {
  return (
    <ul className="cards">
      {labs && labs.length > 0 ? (
        labs.map((lab) => (
          <LabCard
            key={lab.id}
            lab={lab}
            onDeleteLab={onDeleteLab}
            onUpdatePrice={onUpdatePrice}
          />
        ))
      ) : (
        <p>No labs available</p>
      )}
    </ul>
  );
}

export default LabList;