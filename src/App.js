import { data } from "autoprefixer";
import logo from "./logo.png";
export default function App() {

  fetch("http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion.json").then(res=>res.json()).then(data=>console.log(data.data))
  return (
    <>
      <div className="relative w-fit mx-auto">
        <img src={logo} width="500" className="mx-auto" />
        <div className="absolute bg-red-500 h-5 w- bottom-32"></div>
      </div>
    </>
  );
}
