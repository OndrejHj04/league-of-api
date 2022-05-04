import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Build from "./Build";
import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { getFirestore, setDoc, doc, collection, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export default function Rt() {
  const [players, setPlayers] = useState(1);
  const [showLinks, setShowLinks] = useState();
  const [allUrls, setAllUrls] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDObszvg5RZasNoTHHg32btNLNbdM3A_Hc",
    authDomain: "league-of-api.firebaseapp.com",
    projectId: "league-of-api",
    storageBucket: "league-of-api.appspot.com",
    messagingSenderId: "622387037522",
    appId: "1:622387037522:web:09e6d814a07999c059e68b",
  };
  initializeApp(firebaseConfig);
  const db = getFirestore();
  const urlRef = collection(db, "urls");

  const getPlayers = (p) => {
    setPlayers(p);
  };

  const links = (p) => {
    setShowLinks(p);
  };


  useEffect(() => {
    if (showLinks) {
      [...Array(Number(players))].forEach((item) => {
        const id = nanoid();
        setDoc(doc(db, "urls", id), {
          url: id,
          time: new Date().getTime(),
        });
      });
    }
  }, [showLinks, db, players]);

  const getData = () => {
    onSnapshot(urlRef, (snapshot) => {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data() });
      });
      setAllUrls(arr);
    });
  };

  const tempData = useRef();

  tempData.current = getData;
  useEffect(() => {
    tempData.current();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App players={players} showLinks={showLinks} getPlayers={getPlayers} links={links} />}></Route>
        {allUrls.map((item) => (
          <Route key={item.url} path={item.url} element={<Build />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
