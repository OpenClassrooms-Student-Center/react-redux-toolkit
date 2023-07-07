import { useStore } from "react-redux";
import { SuperCremeux } from "../../common/models";
import { useEffect, useState } from "react";

export const Cart = () => {
  const store = useStore();

  const [list, setList] = useState(store.getState().list);
  const totalCommand = list.reduce((prv, cur) => cur.price + prv, 0);

  useEffect(() => {
    store.subscribe(() => {
      setList(store.getState().list);
    });
  }, [store]);

  return (
    <div className="Selection">
      <h1>Choisir son menu</h1>
      <div className="CartNavBar">
        <button
          onClick={() =>
            store.dispatch({ type: "ADD_PRODUCT", payload: SuperCremeux })
          }
        >
          Ajouter un super crémeux
        </button>
      </div>
      {list?.map((item, index) => (
        <span key={index} className="SelectedProduct">
          {item.title} {item.price} €
        </span>
      ))}
      {list.length === 0 ? (
        <div>Aucun produit sélectionné</div>
      ) : (
        <div>Total commande {totalCommand} euros</div>
      )}
    </div>
  );
};