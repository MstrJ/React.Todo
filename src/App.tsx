import "./App.css";
import { useState } from "react";
interface prop {
  id: number;
  name: string;
  active: boolean;
}
const produkty: prop[] = [
  {
    id: 1,
    name: "Milk",
    active: false,
  },
  {
    id: 2,
    name: "Woda",
    active: false,
  },
  {
    id: 3,
    name: "Makaron",
    active: false,
  },
];
const gracze: prop[] = [
  {
    id: 1,
    name: "Kuba",
    active: false,
  },
  {
    id: 2,
    name: "Seba",
    active: false,
  },
  {
    id: 3,
    name: "Paweł",
    active: false,
  },
];

const WelcomeCard = (props: { name: string; lista: prop[] }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newlist, setNewlist] = useState(props.lista);
  return (
    <div className="bg-slate-700 w-56 px-4 py-3 m-2 rounded-md flex flex-col gap-2   justify-center">
      <h3 className="text-2xl font-bold">{props.name}</h3>
      <ul className="flex flex-col gap-1 pt-4">
        {newlist.map((x) => {
          return <li key={x.id}>{ShowItem(x, newlist, setNewlist)}</li>;
        })}
      </ul>
      <div className="justify-center items-center flex ">
        <button
          className="text-3xl  w-fit h-fit "
          onClick={() => {
            setShowAdd((prev) => (prev = !prev));
          }}
        >
          {showAdd ? "˰" : "˯"}
        </button>
      </div>
      <ShowAdd showAdd={showAdd} list={newlist} setlist={setNewlist} />
    </div>
  );
};
const ShowAdd = (props: { showAdd: boolean; list: prop[]; setlist: any }) => {
  const [item, setItem] = useState("");
  const lastItem = [...props.list].pop();
  const n = lastItem && lastItem.id ? lastItem.id + 1 : 1;
  return (
    <div
      className={`flex flex-col transition-all duration-500 ${
        props.showAdd ? "" : "hidden"
      } `}
    >
      <input
        type="text"
        className="mt-4 mb-3 px-1"
        placeholder="..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        onClick={() => {
          AddHandler(n, item, props.setlist);
          setItem((prev) => "");
        }}
        className="bg-green-600 rounded-md p-1 px-2 text-sm hover:bg-green-600/50 duration-300"
      >
        Dodaj
      </button>
    </div>
  );
};
const AddHandler = (n: number, item: string, setlist: any) => {
  const obj = CreateItem({ id: n, name: item, active: false });
  setlist((prev: prop[]) => [...prev, obj]);
};
const CreateItem = (input: prop) => {
  const obj = { id: input.id, name: input.name, active: input.active };
  return obj;
};

const ShowItem = (obj: prop, list: prop[], setList: any) => {
  const active = obj.active;
  return (
    <div className="flex flex-row gap-2">
      <input
        type="checkbox"
        checked={active}
        name="active"
        onChange={() => {
          obj.active = !active;
          setList([...list]);
        }}
      ></input>
      <label htmlFor="active" className={active ? "line-through" : ""}>
        {obj.name}{" "}
      </label>
    </div>
  );
};

function App() {
  return (
    <div className="flex flex-row gap-2">
      {/* <WelcomeCard name="Lista graczy" lista={gracze} /> */}
      <WelcomeCard name="Lista produktów" lista={produkty} />
    </div>
  );
}

export default App;
