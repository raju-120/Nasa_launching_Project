import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {

  const fetchedPlanets = await httpGetPlanets();
  console.log("Data are fetched: ", fetchedPlanets); // ✅ Log the actual data
  
  savePlanets(fetchedPlanets);
}, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
