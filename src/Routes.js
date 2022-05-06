import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Build from "./Build";
import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { getFirestore, setDoc, doc, collection, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import ForOuFor from "./ForOuFor";

export default function Rt() {
  const [players, setPlayers] = useState(1);
  const [showLinks, setShowLinks] = useState();
  const [allUrls, setAllUrls] = useState([]);
  const [newUrls, setNewUrls] = useState([]);
  const [champions, setChampions] = useState();
  const [items, setItems] = useState();
  const [runes, setRunes] = useState();

  useEffect(() => {
    fetch("http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion.json")
      .then((res) => res.json())
      .then((data) => setChampions(data.data));

    fetch("http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/item.json")
      .then((res) => res.json())
      .then((data) => setItems(data));

    fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json")
      .then((res) => res.json())
      .then((data) => setRunes(data));
  }, []);

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

  const getRandomChamp = () => {
    const rand = champions[Object.keys(champions)[Math.floor(Math.random() * Object.keys(champions).length)]];
    return rand;
  };

  const generateSeconds = () => {
    return runes[Object.keys(runes)[Math.floor(Math.random() * Object.keys(runes).length)]];
  };

  const getMainTree = () => {
    let obj;
    const tree = runes[Object.keys(runes)[Math.floor(Math.random() * Object.keys(runes).length)]];
    const treeOne = tree.slots[0].runes[Math.floor(Math.random() * tree.slots[0].runes.length)];
    const treeTwo = tree.slots[1].runes[Math.floor(Math.random() * tree.slots[1].runes.length)];
    const treeThree = tree.slots[2].runes[Math.floor(Math.random() * tree.slots[2].runes.length)];
    const treeFour = tree.slots[3].runes[Math.floor(Math.random() * tree.slots[3].runes.length)];

    let secondTree = "";
    while (secondTree === "" || secondTree === tree) {
      secondTree = generateSeconds();
    }

    const firstLength = secondTree.slots[Math.floor(Math.random()*3)+1];
    const secondLength = secondTree.slots[Math.floor(Math.random()*3)+1];

    const secondTreeFirst = firstLength.runes[Math.floor(Math.random()*firstLength.runes.length)]
    const secondTreeSecond = secondLength.runes[Math.floor(Math.random()*secondLength.runes.length)]
    // pojisti ze sekundarky budou plny a az pak poslat
    obj = { treeOne: treeOne.icon, treeTwo: treeTwo.icon, treeThree: treeThree.icon, treeFour: treeFour.icon, secondFirst: secondTreeFirst.icon, secondSecond: secondTreeSecond.icon };
    return obj;
  };

  const getRandomItems = () => {
    if (items) {
      let arr = [];
      for (let i = 0; i < 6; i++) {
        arr.push(items.data[Object.keys(items.data)[Math.floor(Math.random() * Object.keys(items.data).length)]].image);
      }
      return arr;
    }
  };

  useEffect(() => {
    setNewUrls([]);
    if (showLinks) {
      [...Array(Number(players))].forEach((item) => {
        const id = nanoid();
        setDoc(doc(db, "urls", id), {
          url: id,
          time: new Date().getTime(),
          champion: getRandomChamp(),
          mainTree: getMainTree(),
          items: getRandomItems(),
        });
        setNewUrls((oldVal) => {
          return [...oldVal, id];
        });
      });
    } //eslint-disable-next-line
  }, [showLinks, db, players]);

  const getData = () => {
    onSnapshot(urlRef, (snapshot) => {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setAllUrls(arr);
    });
  };

  const tempData = useRef();

  tempData.current = getData;
  useEffect(() => {
    tempData.current();
  }, []);

  getDocs(urlRef).then((snapshot) => {
    let arr = [];
    snapshot.docs.forEach((doc) => {
      if (new Date().getTime() - doc.data().time > 3600000) {
        arr.push(doc.data().url);
      }
    });
    arr.forEach((item) => {
      deleteDoc(doc(db, "urls", item));
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App players={players} showLinks={showLinks} getPlayers={getPlayers} links={links} newUrls={newUrls} />}></Route>
        {allUrls.map((item) => (
          <Route key={item.url} path={item.url} element={<Build champion={item.champion} mainTree={item.mainTree} items={item.items} />} />
        ))}
        <Route path="xd" element={<Build />} />
        <Route path="*" element={<ForOuFor />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
