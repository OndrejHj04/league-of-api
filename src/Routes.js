import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import App from "./App";
import Build from "./Build";
import { Children, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import reactRouterToArray from 'react-router-to-array';

export default function Rt() {
  const [players, setPlayers] = useState(1);
  const [showLinks, setShowLinks] = useState();
  const [allUrls, setAllUrls] = useState([]);

  const getPlayers = (p) => {
    setPlayers(p);
  };

  const links = (p) => {
    setShowLinks(p);
  };

  useEffect(() => {
    if (showLinks) {
      setAllUrls([]);
      [...Array(Number(players))].forEach((item) => {
        setAllUrls((oldVal) => {
          return [...oldVal, nanoid()];
        });
      });
    }
  }, [showLinks]);


  console.log(allUrls)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App players={players} showLinks={showLinks} getPlayers={getPlayers} links={links} />}></Route>
        {
          (showLinks&&(allUrls.map(item=><Route key={item} path={item} element={<Build />}/>)))
        }
      </Routes>
    </BrowserRouter>
  );
}
