import React, { useState, useEffect } from 'react';
import { Fine } from './Fines';

const FineDetails = () => {
  const params = new URLSearchParams(document.location.search);
  const id = params.get('id');
  const [fine, setFine] = useState<Fine>();

  useEffect(() => {
    fetch('http://localhost:5000/fine/' + id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFine(data);
      });
  }, [id]); // Add 'id' to the dependency array

  return <div>Fine Details for {fine?.SubjectName}</div>;
};

export default FineDetails;
