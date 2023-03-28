import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      console.log(loggedInUser)
    }
  }, []);

  if (!authenticated) {
  // Redirect
  } else {
    return (
    <div>
        <p>Welcome to your Dashboard</p>
    </div>
    );
  }
};

//export default Dashboard;