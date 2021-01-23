import React, { useMemo } from 'react';
import { format } from 'date-fns';
import * as S from './styles';

import typeIcons from '../../utils/typeIcons';

function TaskCard({type, title, when, done}) {
  
  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'));
  const hour = useMemo(() => format(new Date(when), 'HH:mm'));

  return (
    // Passando o Done como uma PROPRIEDADE no Container para que possa ser recuperado no style
    <S.Container done={done}>

      <S.TopCard>
        {/* O ícone é recuperado pela variável type passsada como parâmetro dentro do vetor typeIcons */}
        <img src={typeIcons[type]} alt="Icone da Tarefa"/>
        <h3>{title}</h3>
      </S.TopCard>

      <S.BottomCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </S.BottomCard>

    </S.Container>
  )
}

export default TaskCard;
