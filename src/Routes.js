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
  const [ss, setSs] = useState();

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
    fetch("http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/summoner.json")
      .then((res) => res.json())
      .then((data) => {
        setSs(data);
      });
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyBLkpwcdUuiOnl_L76InIsg8wQUKahpA9M",
    authDomain: "zalozni-6077d.firebaseapp.com",
    projectId: "zalozni-6077d",
    storageBucket: "zalozni-6077d.appspot.com",
    messagingSenderId: "602536796708",
    appId: "1:602536796708:web:5132a40ce9cd57df5faeb1",
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

    let arr = [1, 2, 3];
    let rand = Math.floor(Math.random() * 3) + 1;
    arr = arr.filter((i) => i !== rand);

    const firstLength = secondTree.slots[arr[0]];
    const secondLength = secondTree.slots[arr[1]];

    const secondTreeFirst = firstLength.runes[Math.floor(Math.random() * firstLength.runes.length)];
    const secondTreeSecond = secondLength.runes[Math.floor(Math.random() * secondLength.runes.length)];

    obj = { treeOne: treeOne.icon, treeTwo: treeTwo.icon, treeThree: treeThree.icon, treeFour: treeFour.icon, secondFirst: secondTreeFirst.icon, secondSecond: secondTreeSecond.icon };
    return obj;
  };

  const randomSs = () => {
    let arr = [ss.data.SummonerFlash, ss.data.SummonerBarrier, ss.data.SummonerDot, ss.data.SummonerExhaust, ss.data.SummonerHeal, ss.data.SummonerHaste];
    return arr[Math.floor(Math.random() * arr.length)].image;
  };

  const getRandomItems = () => {
    if (items) {
      let properItems = [];
      let guardians = []
      Object.keys(items.data).forEach((i) => {
        if (items.data[i].maps[12] && items.data[i].gold.purchasable && items.data[i].from && items.data[i].name !== "Broken Stopwatch") {
          properItems.push(items.data[i]);
        }else if(items.data[i].name.includes("Guardian")){
          guardians.push(items.data[i])
        }
      });
      guardians = guardians[Math.floor(Math.random()*guardians.length)].image.full

      let arr = [];
      for (let i = 0; i < properItems.length; i++) {
        arr.push(properItems[Math.floor(Math.random() * properItems.length)].image);
      }
      while(arr.length < 6){
        const rand = properItems[Math.floor(Math.random() * properItems.length)].image
        if(!arr.includes(rand)){
          arr.push(rand)
        }
      }
      return [arr, guardians];
    }
  };
  const pickRandomChamp = (p) => {
    let arr = [];
    while (arr.length < p) {
      let rand = champions[Object.keys(champions)[Math.floor(Math.random() * Object.keys(champions).length)]];
      if (!arr.includes(rand)) {
        arr.push(rand);
      }
    }
    return arr;
  };

  useEffect(() => {
    setNewUrls([]);
    if (showLinks) {
      let champs = pickRandomChamp(players); //eslint-disable-next-line
      let res = [...Array(Number(players))].forEach((item, i) => {
        const id = nanoid();
        setDoc(doc(db, "urls", id), {
          url: id,
          time: new Date().getTime(),
          champion: champs[i],
          mainTree: getMainTree(),
          items: getRandomItems()[0],
          guardians: getRandomItems()[1],
          ss: randomSs(),
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
          <Route key={item.url} path={item.url} element={<Build champion={item.champion} mainTree={item.mainTree} items={item.items} ss={item.ss} guardians={item.guardians}/>} />
        ))}
        <Route path="xd" element={<Build />} />
        <Route path="*" element={<ForOuFor />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
