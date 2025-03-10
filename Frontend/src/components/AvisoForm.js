import { useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const AvisoForm = ({ onAddAviso }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [visualizado, setVisualizado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) return;

    const novoAviso = { titulo, descricao, visualizado };
    try {
      const response = await api.post('', novoAviso);
      onAddAviso(response.data);
      setTitulo('');
      setDescricao('');
      setVisualizado(false);
    } catch (error) {
      console.error('Erro ao adicionar aviso:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <Input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <CheckboxContainer>
        <input type="checkbox" checked={visualizado} onChange={(e) => setVisualizado(e.target.checked)} />
        <label>Visualizado</label>
      </CheckboxContainer>
      <Button type="submit">Adicionar Aviso</Button>
    </Form>
  );
};

export default AvisoForm;
