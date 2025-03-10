import { useEffect, useState } from 'react';
import api from '../services/api';
import AvisoForm from '../components/AvisoForm';
import AvisoList from '../components/AvisoList';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const Home = () => {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const response = await api.get('/avisos'); 
        setAvisos(response.data);
      } catch (error) {
        console.error('Erro ao buscar avisos:', error);
      }
    };
    fetchAvisos();
  }, []);

  const handleAddAviso = (novoAviso) => {
    setAvisos([...avisos, novoAviso]);
  };

  const handleDeleteAviso = async (id) => {
    try {
      await api.delete(`/${id}`); 
      setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== id)); 
    } catch (error) {
      console.error('Erro ao deletar aviso:', error);
    }
  };

  
  const handleUpdateAviso = (avisoAtualizado) => {
    setAvisos(avisos.map(aviso => 
      aviso.id === avisoAtualizado.id ? avisoAtualizado : aviso
    ));
  };

  return (
    <Container>
      <h1>Gerenciador de Avisos</h1>
      <AvisoForm onAddAviso={handleAddAviso} />
      <AvisoList 
        avisos={avisos} 
        onDeleteAviso={handleDeleteAviso} 
        onUpdateAviso={handleUpdateAviso} 
      />
    </Container>
  );
};

export default Home;
