import Navbar from "@/src/layouts/Navbar";
import React from "react";
import { buildUrl } from 'cloudinary-build-url';
import Image from "next/image";

const index = () => {
  const url = buildUrl('samples/powsi/1_ac11zf', {
    cloud: {
      cloudName: 'dkvtkwars',
    },
  });
 
  return (
    <div>
      {/* <Navbar /> */}
      <Image
              src={url}
              alt="Galaxy"
              width={500}
              height={250}
              // fill={true}
            />

    </div>
  );
};

export default index;
