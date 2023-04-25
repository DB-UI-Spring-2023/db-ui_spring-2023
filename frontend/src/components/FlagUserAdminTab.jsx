import React from "react";

export const FlagUserAdminTab = ({ item }) => {
  const { email, privileges, firstName, lastName } = item;

  return (
    <div>
      <p>Email: {email}</p>
      <p>Privileges: {privileges}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
    </div>
  );
};
