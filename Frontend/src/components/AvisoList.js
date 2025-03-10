import { useState } from 'react';
import styled from 'styled-components';
import AvisoEditForm from './AvisoEditForm';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: ${({ edit }) => (edit ? 'orange' : 'red')};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 5px;
`;

const AvisoList = ({ avisos, onDeleteAviso, onUpdateAviso }) => {
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);

  return (
    <>
      <List>
        {avisos.map((aviso) => (
          <ListItem key={aviso.id}>
            <div>
              <strong>{aviso.titulo}</strong>
              <p>{aviso.descricao}</p>
              <small>{aviso.visualizado ? 'Visualizado' : 'Não visualizado'}</small>
            </div>
            <div>
              <Button edit onClick={() => setAvisoSelecionado(aviso)}>Editar</Button>
              <Button onClick={() => onDeleteAviso(aviso.id)}>Remover</Button>
            </div>
          </ListItem>
        ))}
      </List>

      {avisoSelecionado && (
        <AvisoEditForm
          aviso={avisoSelecionado}
          isOpen={!!avisoSelecionado}
          onClose={() => setAvisoSelecionado(null)}
          onUpdate={onUpdateAviso}
        />
      )}
    </>
  );
};

export default AvisoList;
