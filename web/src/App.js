import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';
import './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
//prop =  Informações de um componente PAI passa para o FILHO
//state = Informações mantidas pelo componente - Imutabilidade!
//component = bloco isolado de HTML, CSS e JS q não intefere em + nada


function App() {
  const [devs, setDevs] = useState([])


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    loadDevs()
  }, []);

  async function handleAddDev(data) {
    try {
      const response = await api.post('/devs', data);
      setDevs([...devs, response.data.dev])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;
