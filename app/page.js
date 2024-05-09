"use client"
import CommonButton from "./components/CommonButton";

import Navbar from "./layouts/Navbar";

export default function Home() {
  return (
    <main className="d-flex flex-column align-items-center w-100 justify-content-center min-vh-100">
      <h1 className="text-success">Heloo Project</h1>
      <Navbar/>
    </main>
  );
}
