import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

// Create context object
export const StorageContext = createContext({});

// Create the provider component
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();

  const { currency, sortBy } = useContext(CryptoContext);

  // Save a coin to localStorage and update state
  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins")) || [];

    if (oldCoins.includes(coinId)) {
      return; // Coin already exists
    } else {
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  // Remove a coin from localStorage and update state
  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins")) || [];
    let newCoins = oldCoins.filter((id) => id !== coinId);
    setAllCoins(newCoins);
    localStorage.setItem("coins", JSON.stringify(newCoins));
  };

  // Fetch saved data for the coins
  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
     if(allCoins.length > 0){
       getSavedData(allCoins);
     }else{
       setSavedData();
     }
  }, [allCoins])

  useLayoutEffect(() => {
    let existingCoins = JSON.parse(localStorage.getItem("coins"));

    if (!existingCoins) {
      // Initialize local storage if not present
      localStorage.setItem("coins", JSON.stringify([]));
      setAllCoins([]); // Set empty array in state
    } else {
      setAllCoins(existingCoins); // Set state with existing coins

      if (existingCoins.length > 0) {
        getSavedData(existingCoins); // Fetch data for the existing coins
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        allCoins,
        removeCoin, // Now removeCoin is defined
        savedData,
        resetSavedResult,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
