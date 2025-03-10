import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Modal = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 5px;
  background-color: ${({ cancel }) => (cancel ? 'gray' : '#007bff')};
  color: white;
  border: none;
  cursor: pointer;
`;

const AvisoEditForm = ({ aviso, isOpen, onClose, onUpdate }) => {
  const [titulo, setTitulo] = useState(aviso?.titulo || '');
  const [descricao, setDescricao] = useState(aviso?.descricao || '');
  const [visualizado, setVisualizado] = useState(aviso?.visualizado || false);

  useEffect(() => {
    if (aviso) {
      setTitulo(aviso.titulo);
      setDescricao(aviso.descricao);
      setVisualizado(aviso.visualizado);
    }
  }, [aviso]);

  const handleUpdate = async () => {
    const avisoAtualizado = { ...aviso, titulo, descricao, visualizado };
    try {
      const response = await api.put(`/${aviso.id}`, avisoAtualizado);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar aviso:', error);
    }
  };

  return (
    <>
      <Overlay open={isOpen} onClick={onClose} />
      <Modal open={isOpen}>
        <h2>Editar Aviso</h2>
        <Input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
        <Input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
        <label>
          <input type="checkbox" checked={visualizado} onChange={() => setVisualizado(!visualizado)} />
          Visualizado
        </label>
        <div>
          <Button onClick={handleUpdate}>Salvar</Button>
          <Button cancel onClick={onClose}>Cancelar</Button>
        </div>
      </Modal>
    </>
  );
};

export default AvisoEditForm;
