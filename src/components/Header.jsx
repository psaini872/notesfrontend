import React from "react";
import { useAppContext } from "../context/appContext.js";

export default function Header() {
  const { logout, user } = useAppContext();
  return (
    <header>
      <h1>Notes</h1>
      {user && <h3 onClick={logout}>Logout</h3>}
    </header>
  );
}
