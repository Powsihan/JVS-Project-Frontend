
import { Margin } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bmw from "../../assets/images/bmw.png";
export default function App() {
  const images = [
    {
      // id: "102",
      // author: "Ben Moore",
      // width: 4320,
      // height: 3240,
      url: "https://unsplash.com/photos/pJILiyPdrXI",
      download_url: "https://picsum.photos/id/102/4320/3240"
    },
    {
      // id: "103",
      // author: "Ilham Rahmansyah",
      // width: 2592,
      // height: 1936,
      url: "https://unsplash.com/photos/DwTZwZYi9Ww",
      download_url: "https://picsum.photos/id/103/2592/1936"
    },
    {
      // id: "104",
      // author: "Dyaa Eldin",
      // width: 3840,
      // height: 2160,
      url: "https://unsplash.com/photos/2fl-ocJ5MOA",
      download_url: "https://picsum.photos/id/104/3840/2160"
    },
    {
      // id: "106",
      // author: "Arvee Marie",
      // width: 2592,
      // height: 1728,
      url: "https://unsplash.com/photos/YnfGtpt2gf4",
      download_url: "https://picsum.photos/id/106/2592/1728"
    },
    {
      // id: "107",
      // author: "Lukas Schweizer",
      // width: 5000,
      // height: 3333,
      url: "https://unsplash.com/photos/9VWOr22LhVI",
      download_url: "https://picsum.photos/id/107/5000/3333"
    },
    {
      // id: "108",
      // author: "Florian Klauer",
      // width: 2000,
      // height: 1333,
      url: "https://unsplash.com/photos/t1mqA3V3-7g",
      download_url: "https://picsum.photos/id/108/2000/1333"
    },
    {
      // id: "109",
      // author: "Zwaddi",
      // width: 4287,
      // height: 2392,
      url: "https://unsplash.com/photos/YvYBOSiBJE8",
      download_url: "https://picsum.photos/id/109/4287/2392"
    }
  ];
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Carousel
        style={{width:400,Margin:"auto"}}
        autoPlay
        infiniteLoop
        centerMode
        interval={1000}
      >
        {images.map((image) => (
          <img src={image.download_url} alt={image.author} />
        ))}
      </Carousel>
    </div>
  );
}
