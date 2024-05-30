"use client";
import Link from "next/link";
import CommonButton from "../components/CommonButton";
import { MutatingDots } from "react-loader-spinner";
// import CommonButton from "../components/CommonButton";
import "../styles/admin.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      router.push("/home");
    }, [2000]);
  }, []);
  return (
    <main className="d-flex flex-column align-items-center w-100 justify-content-center min-vh-100">
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center Admin-Login-Intro">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <MutatingDots
            visible={true}
            height={100}
            width={100}
            color="#FFFF"
            secondaryColor="#FFF"
            radius={12.5}
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </main>
  );
}
