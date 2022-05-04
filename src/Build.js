import { useState, useEffect } from "react";
export default function Build() {
  const [chapmions, setChampions] = useState([]);
  const [items, setItems] = useState();
  const [runes, setRunes] = useState();
  console.log(chapmions, runes, items);
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

  return (
    <div className="max-w-lg mx-auto">
      <div>
        <p>Champion</p>
      </div>
    </div>
  );
}
