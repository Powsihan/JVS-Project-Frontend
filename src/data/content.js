import {
  vehicleAuction,
  vehicleBuy,
  vehicleCustomize,
  vehicleRequest,
} from "../utils/ImagesPath";

const aboutuscontent = [
  {
    heading: "Vehicle Buying",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleBuy,
    path: "/vehicle",
  },
  {
    heading: "Preferred Vehicle Request",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleRequest,
    path: "",
  },
  {
    heading: "Vehicle Selling",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleCustomize,
    path: "/sell",
  },
  {
    heading: "Vehicle Auctions",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleAuction,
    path: "/auction",
  },
];

const sellvehiclecontent = [
  "Quick and Easy Sales",
  "Trusted Buyer Network",
  "Nationwide Pickup Service",
  "Maximum Value Guaranteed",
  "Expert Vehicle Appraisals",
  "Sell with Confidence",
];
const auctionvehiclecontent = [
  "Register with JVS",
  "Explore Auctions for Your Next Vehicle",
  "Bid and Win the Best Deals",
];

export { aboutuscontent, sellvehiclecontent, auctionvehiclecontent };
