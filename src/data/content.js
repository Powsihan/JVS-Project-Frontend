import {
  contactChat,
  contactCompany,
  contactExpert,
  vehicleAuction,
  vehicleBuy,
  vehicleCustomize,
  vehicleRequest,
} from "../utils/ImagesPath";

const aboutuscontent = [
  {
    heading: "Vehicle Buying and Selling",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleBuy,
    path:"/vehicle",
  },
  {
    heading: "Preferred Vehicle Request",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleRequest,
    path:"",
  },
  {
    heading: "Vehicle Customization",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleCustomize,
    path:"",
  },
  {
    heading: "Vehicle Auctions",
    content:
      "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
    image: vehicleAuction,
    path:"/auction",
  },
];
const aboutuscontent2 = [
  {
    heading: "Contact With Company",
    content: "Contact with admin clarify any doubts and inquiries ",
    buttonText: "Contact",
    image: contactCompany,
    time: true,
    contact: true,
  },
  {
    heading: "Contact With Expert",
    content:
      "Contact vehicle experts to clarify any doubts and inquiries related to vehicles",
    buttonText: "Contact",
    image: contactExpert,
    time: true,
    contact: false,
  },
  {
    heading: "Contact With Chat Bot ",
    content:
      "Contact the AI chatbot specialized in vehicles to ask only vehicle-related questions and address any doubts",
    buttonText: "Chat",
    image: contactChat,
    time: false,
    contact: false,
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

export { aboutuscontent, aboutuscontent2, sellvehiclecontent };
