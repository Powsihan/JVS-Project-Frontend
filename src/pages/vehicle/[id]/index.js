import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVehicleInfo } from "@/src/redux/action/vehicle"; // Assuming you have this function
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";

const VehicleDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      getVehicleInfo(id, (res) => {
        if (res && res.data) {
          setVehicle(res.data);
          dispatch(setLoading(false));
        } else {
            dispatch(setLoading(false));
          console.error("Error fetching vehicle details", res);
        }
      });
    }
  }, [id]);
 

  return (
    <div>
      <h1>{vehicle && vehicle.name}</h1>
      {/* Render vehicle details here */}
    </div>
  );
};

export default VehicleDetail;
