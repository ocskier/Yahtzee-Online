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

  return (
    <div
      style={{
        marginTop: '-4rem',
        minHeight: 'calc(100vh - 112px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="https://images.vexels.com/media/users/3/135811/isolated/preview/f3dc1094d770aadce0dff261623fddb6-dices-3d-icon-by-vexels.png"
        width="300"
        height="300"
        className="d-inline-block align-top mainlogo"
        alt="React Bootstrap logo"
      />
    </div>
  );
}

export default Yahtzee;
