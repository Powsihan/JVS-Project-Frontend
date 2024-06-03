"use client";
import Image from "next/image";
import pagenotfound from "../assets/images/404page.svg";
import CommonButton from "../components/CommonButton";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center Page-Not-Found">
      <Image src={pagenotfound} />
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <p>Go back to the Home</p>
      <CommonButton
        text={"Click Here"}
        width={150}
        onClick={() => {
          router.push("/");
        }}
      />
    </main>
  );
}
