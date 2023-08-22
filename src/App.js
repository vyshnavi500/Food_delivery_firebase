import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";
import SubMenucontainer from "./Components/SubMenucontainer";
import Bannername from "./Components/Bannername";
import Menucard from "./Components/Menucard";
import { MenuItems, Items } from "./Components/Jsondata";
import Itemcard from "./Components/Itemcard";
import Cartitem from "./Components/Cartitem";
import { useStateValue } from "./Components/StateProvider";
import { db } from "./firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

function App() {
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId == "buger01")
  );

  const navigate = useNavigate();

  const navigatetoCustomdetails = () => {
    navigate("/customdetails");
  };

  const [{ cart, total }, dispatch] = useStateValue();
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedMenucard, setSelectedMenucard] = useState(null);

  const cartTotal = cart
    ? cart.reduce((acc, item) => acc + parseFloat(item.price) * item.qnty, 0)
    : 0;

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    const Menucard = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenucard");

    function setMenucardActive() {
      Menucard.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    Menucard.forEach((n) => n.addEventListener("click", setMenucardActive));
  }, [isMainData, cart, total, totalPrice]);

  const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId == itemId));
    setSelectedMenucard(itemId);
  };

  useEffect(() => {
    if (selectedMenucard) {
      setMainData(
        Items.filter((element) => element.itemId === selectedMenucard)
      );
    } else {
      setMainData(Items.filter((element) => element.itemId === "burger01"));
    }
  }, [selectedMenucard]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalNetPrice = cart.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.qnty,
        0
      );
      setTotalPrice(totalNetPrice.toFixed(2));
    } else {
      setTotalPrice("0.00");
    }
  }, [cart]);

  const addTotal = () => {
    if (cart && cart.length > 0) {
      const totalNetPrice = cart.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price) * item.qnty;
        return acc + itemPrice;
      }, 0);
      setTotalPrice(totalNetPrice.toFixed(2).toString());
    } else {
      setTotalPrice("0.00");
    }
  };
  useEffect(() => {
    addTotal();
  }, [cart]);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const name = userDetails?.name;

  const saveCartToFirebase = async () => {
    try {
      const cartData = cart.map((item) => ({
        id: item.id,
        name: item.name,
        imgSrc: item.imgSrc,
        qnty: item.qnty,
        price: item.price,
      }));

      const docRef = await setDoc(doc(db, "cart", name), {
        cart: cartData,
        totalPrice: totalPrice,
        username: name,
      });

      // const data = {
      //   cart: cartData,
      //   totalPrice: totalPrice,
      //   username: name,
      // };

      // const docRef = await setDoc(collection(db, "cart")).doc(name).set(data);

      console.log("Cart data saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving cart data: ", error);
    }
  };

  return (
    <div className="App">
      <Header />

      <main>
        <div className="mainContainer">
          <div className="banner">
            <Bannername discount={"30"} more={"#"} />
          </div>

          <div className="MenuItemContainer">
            <div className="Menucard">
              <SubMenucontainer />
            </div>

            <div className="rowContainer">
              {MenuItems &&
                MenuItems.map((data) => (
                  <div key={data.id} onClick={() => setData(data.itemId)}>
                    <Menucard
                      imgSrc={data.imgSrc}
                      name={data.name}
                      isActive={data.itemId === selectedMenucard}
                    />
                  </div>
                ))}
            </div>

            <div className="dishItemContainer">
              {isMainData &&
                isMainData.map((data) => (
                  <Itemcard
                    key={data.id}
                    itemId={data.id}
                    imgSrc={data.imgSrc}
                    name={data.name}
                    ratings={data.ratings}
                    price={parseFloat(data.price)}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="rightMenu">
          <h1 className="cartheader">Cart</h1>
          {!cart || cart.length === 0 ? (
            <div className="addSomeItem"></div>
          ) : (
            <div className="cartCheckOut">
              <div className="cartContainer">
                <SubMenucontainer />

                <div className="Cartitems">
                  {cart &&
                    cart.map((data) => (
                      <Cartitem
                        key={data.id}
                        itemId={data.id}
                        name={data.name}
                        imgSrc={data.imgSrc}
                        qnty={data.qnty}
                        price={data.price}
                        addTotal={addTotal}
                      />
                    ))}
                </div>
              </div>
              <div className="totalSection">
                <h3>Total</h3>
                <div className="totalprice">
                  <p>
                    <span>£</span>
                  </p>
                  <p className="addtotal">{String(totalPrice)}</p>
                </div>
              </div>
              <button
                className="checkOut"
                onClick={() => {
                  saveCartToFirebase();
                  navigatetoCustomdetails();
                }}
              >
                CheckOut
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
