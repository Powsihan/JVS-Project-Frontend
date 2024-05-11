"use client"
import Link from "next/link";
import CommonButton from "../components/CommonButton";
// import CommonButton from "../components/CommonButton";




export default function Home() {
  return (
    <main className="d-flex flex-column align-items-center w-100 justify-content-center min-vh-100">
      <h1 className="text-success">Heloo Project</h1>
      <CommonButton text={"heloo"} />
      
    </main>
  );
}
