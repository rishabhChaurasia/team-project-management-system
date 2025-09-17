import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
