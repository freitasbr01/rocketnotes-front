import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { api } from '../../services/api';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  const [search, setSearch] = useState(""); // criado o estado para guardar o conteúdo digitado no input de pesquisa.
  const [tags, setTags] = useState([]); // tags é um array que vai armazenar as tags que serão obtidas da API. 
  const [tagsSelected, setTagsSelected] = useState([]); // vai armazenar as tags selecionadas pelo usuário.
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([]);
    } // selecionando varias tags no front e depois clicar em todos, as tags anteriores são desmarcadas.

    const alreadySelected = tagsSelected.includes(tagName);    
    // Essa função verifica se a tag já foi selecionada verificando se tagName já existe no estado tagsSelected.

    if (alreadySelected) { // Se ta selecionado eu executo aqui, caso contrario eu executo o else.
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
      // Neste bloco de código, estamos lidando com a situação em que a tag já foi selecionada pelo usuário (ou seja, alreadySelected é verdadeiro). Se a tag já está selecionada e o usuário clica nela novamente, o comportamento esperado é que a tag seja desmarcada. Para fazer isso, criamos um novo array filteredTags que contém todas as tags que estão atualmente selecionadas (tagsSelected), exceto a tag que o usuário acabou de clicar (tagName). Em seguida, atualizamos o estado tagsSelected com esse novo array filteredTags. Isso efetivamente “desmarca” a tag.

    } else {
      setTagsSelected(prevState => [...prevState, tagName]);
      // Neste bloco de código, estamos lidando com a situação em que a tag não foi selecionada pelo usuário (ou seja, alreadySelected é falso). Se a tag não está selecionada e o usuário clica nela, o comportamento esperado é que a tag seja marcada como selecionada. Para fazer isso, adicionamos a tag que o usuário acabou de clicar (tagName) ao estado atual de tagsSelected. Usamos a função setTagsSelected para fazer isso. A expressão [...prevState, tagName] cria um novo array que contém todas as tags que estavam anteriormente selecionadas (prevState) e a nova tag (tagName). Isso efetivamente “marca” a tag como selecionada.
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }
  // Essa função eu vou receber como parametro o id da nota selecionada e ai simplesmente eu vou levar o meu usuário para outra página que é a página de details, para fazer isso eu posso usar o useNavigate.




  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);
  // Se o estado que for vinculado entre as chaves muda o useEffect dispara. Eu não quero buscar o tempo todo as tags então eu vou deixar o array vazio porque para mim só importa buscar uma vez quando a página é aberta/carregada, uma vez só é necessário ir no banco de dados e buscar pelas tags.

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes();

  }, [tagsSelected, search]);

  // Os estados que eu colocar aqui dentro do vetor, quando mudar o conteúdo de "search ou tagsSelected" ele vai executar de novo o useEffect. Eu quero que esse useEffect seja executado novamente se o usuário selecionar uma tag nova (tagsSelected) porque eu quero que a pesquisa recarregue com o filtro que o usuário está aplicando naquele momento. E no search pra conforme ele for digitando também para essa informação refletir na nossa interface.
  // Quando você cria um useEffect sem nenhuma dependência, com o array vazio, o useEffect vai ser executado uma vez só assim que o componente for renderizado.


  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            title="Todos"
            onClick={() => handleTagSelected("all")}
            $isactive={tagsSelected.length === 0}
            // Aqui temos um componente Menu que contém uma lista de ButtonText. O primeiro ButtonText tem o título “Todos” e, quando clicado, chama a função handleTagSelected com o argumento “all”. A propriedade $isactive é verdadeira se nenhuma tag estiver selecionada (tagsSelected.length === 0). O tamanho (length) verifica se tem algum elemento dentro desse array,
          />
        </li>
        
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
                title={tag.name} 
                onClick={() => handleTagSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
                // Cada ButtonText tem o título da tag (tag.name) e, quando clicado, chama a função handleTagSelected com o nome da tag. A propriedade $isactive é verdadeira se a tag estiver selecionada (tagsSelected.includes(tag.name)).
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Pequisar pelo título" 
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>

      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>

    </Container>
  )
}