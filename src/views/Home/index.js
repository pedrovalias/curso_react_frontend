// useState: Recurso do React que ARMAZENA ESTADOS de uma determinada variável (aula 42)
// useEffect: Função que é carregada TODA VEZ QUE A TELA É CARREGADA
import React, { useState, useEffect } from 'react'; 
import * as S from './styles';

// Importa as rotas da API desenvolvida no backend
import api from '../../services/api';

// NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';


function Home() {

  // useState: VARIÁVEIS DE ESTADO
  // Essa constante será um vetor
  // onde filterActived é o NOME do 
  const [filterActived, setFilterActived] = useState('today');
  // Constante que vai armazenar uma coleção de informações, que começa vazia ([])
  const [tasks, setTasks] = useState([]);

  // console.log(api);

  // O response armazena todas as informações que estão retornando da API
  async function loadTasks(){
    await api.get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
    .then(response => {
      setTasks(response.data)
    })
    .catch(error => {
      console.log(error.response)
    });
  }

  // O react vai chamar a função loadTasks puxando do backend toda vez que a tela carregar
  // bem como toda vez que o estado do parâmetro filterActived mudar, chamando novamente a função loadTasks
  useEffect(() => {
    loadTasks();
  }, [filterActived]) // pode ser passado mais parametros ou nenhum, depende da necessidade

  return (
    <S.Container>

      <Header />

      <S.FilterArea>

        {/* Utilizando os cards como botões para possibilitar o reconhecimento do clique
            passando o parametro desejado */}
        <button type="button" onClick={() => setFilterActived("all")}>
          <FilterCard title="Todos" actived={filterActived === 'all'}/>
        </button>

        <button type="button" onClick={() => setFilterActived("today")}>
          <FilterCard title="Hoje" actived={filterActived === 'today'}/>
        </button>

        <button type="button" onClick={() => setFilterActived("week")}>
          <FilterCard title="Semana" actived={filterActived === 'week'}/>
        </button>

        <button type="button" onClick={() => setFilterActived("month")}>
          <FilterCard title="Mês" actived={filterActived === 'month'}/>
        </button>

        <button type="button" onClick={() => setFilterActived("year")}>
          <FilterCard title="Ano" actived={filterActived === 'year'}/>
        </button>

      </S.FilterArea>

      <S.Title>
        <h3>Tarefas</h3>
      </S.Title>
      
      <S.Content>
        {/* O map percorre item a item dentro da coleção - é uma estrutura de repetiçao */}
        {
          tasks.map(t => (
            <TaskCard />
          ))
        }
      </S.Content>

      <Footer />

    </S.Container>
  )
}

export default Home;
