import React from "react";
import NotesAppRoutes from "./NotesAppRoutes";
import { AuthProvider } from "./Authentication/AuthProvider";

const App = () => {
  return (
    <>
      <AuthProvider>
        <NotesAppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
