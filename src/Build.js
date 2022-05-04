import { useState, useEffect } from "react";
export default function Build() {
  const [chapmions, setChampions] = useState();
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

  console.log(chapmions, items, runes)
  return <h1>css</h1>;
}
