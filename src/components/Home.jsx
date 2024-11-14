import React, { useEffect, useState } from "react";
import NewLabForm from "./NewLabForm";
import LabList from "./LabList";
import Search from "./Search";

function Home() {
  const [labs, setLabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    fetch("https://phase-2-deploy.onrender.com")
      .then((response) => response.json())
      .then((data) => setLabs(data))
      .catch((error) => console.error("Error fetching labs:", error));
  }, []);

 
  function handleAddLab(newLab) {
    setLabs([...labs, newLab]);
  }

 
  function handleDeleteLab(id) {
    setLabs(labs.filter((lab) => lab.id !== id));
  }

 
  function handleUpdatePrice(updatedLab) {
    setLabs(
      labs.map((lab) => (lab.id === updatedLab.id ? updatedLab : lab))
    );
  }

  
  const displayedLabs = labs.filter((lab) =>
    `${lab.test} ${lab.sample}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <h1>Welcome to Smartlab Diagnostics</h1>
      <NewLabForm onAddLab={handleAddLab} />
      <Search onSearchChange={setSearchTerm} />
      <LabList
        labs={displayedLabs}
        onDeleteLab={handleDeleteLab}
        onUpdatePrice={handleUpdatePrice}
      />
    </main>
  );
}

export default Home;