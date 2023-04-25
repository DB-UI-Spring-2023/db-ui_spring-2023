import React from "react";



export const FlagBookAdminTab = ({ item }) => {
  const { book_id, IBSN, Title, Author, Cost, Seller } = item;

  return (
    <div>
      <p>Book ID: {book_id}</p>
      <p>IBSN: {IBSN}</p>
      <p>Title: {Title}</p>
      <p>Author: {Author}</p>
      <p>Cost: {Cost}</p>
      <p>Seller: {Seller}</p>
    </div>
  );
};
 export default FlagBookAdminTab;