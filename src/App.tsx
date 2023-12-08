import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthContextProvider } from "./context/AuthContext";
import { LegislativeTypeProvider } from "./context/LegislativeType";

export function App() {
  return (
    <AuthContextProvider>
      <LegislativeTypeProvider>
        <RouterProvider router={router} />
      </LegislativeTypeProvider>
    </AuthContextProvider>
  );
}
