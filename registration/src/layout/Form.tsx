import { Outlet } from "react-router-dom";
import backgroundImage from "../assets/background.jpg";

interface FormPropType {
  formType: "login" | "register";
}

export default function Form({ formType }: FormPropType) {
  const heading = formType === "login" ? "Account login" : "Account register";
  return (
    <div
      className="w-screen h-[100vh] flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-card p-10 rounded-lg shadow-lg w-full max-w-md flex flex-col">
        <h2 className="text-2xl font-semibold mb-6 text-center">{heading}</h2>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
