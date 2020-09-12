import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";

import API from '../../utils/API';
import { AxiosResponse } from 'axios';

function Yahtzee() {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState({});

  useEffect(() => {
    API.checkConnection().then((res: AxiosResponse) => console.log(res));
  }, []);

  return <div></div>;
}

export default Yahtzee;
