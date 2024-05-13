import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';

import { api } from '../../services/api';

import { Container, Form } from './styles';
import { ButtonText } from '../../components/ButtonText';

export function New() {
  const [title, setTitle] = useState(""); //
  const [description, setDescription] = useState(""); //

  const [links, setLinks] = useState([]); // Guarda todos os links.
  const [newLink, setNewLink] = useState(""); // Armazena o link que vai ser adicionado no momento.

  const [tags, setTags] = useState([]); // Guarda todos as tags.
  const [newTag, setNewTag] = useState(""); // Armazena a tag que vai ser adicionada no momento.

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1)
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  } // Função que atualiza o vetor de links. Eu acesso através do prevState o que que tinha antes dentro desse array. Eu monto um novo array com tudo que tinha antes e adiciona nesse novo array um novo link, dessa forma a função setLinks atualiza o estado links. O setNewLink começa vazio.

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  } // Pega o link e verifique onde o link é diferente do que eu to deletando.
  // O parâmetro deleted vai receber qual o link que eu quero deletar da lista. Dentro do prevState eu tenho todo o conteúdo atual desse estado antes de ele ser atualizado, vou aplicar um filter nele, ele vai retornar uma nova lista baseado no que será aplicado aqui, se eu quero remover um link, signifca que eu quero retornar todos os links que está dentro do meu estado menos o link que eu quero deletar, consequentemente eu tenho uma lista nova sem o link excluido.

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o titulo da nota.");
    }

    if (!description) {
      return alert("Digite a descrição da nota.");
    }

    if (newTag) {
      return alert("Você deixou uma tag no campo, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vázio.");
    }

    if (newLink) {
      return alert("Você deixou uma link no campo, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vázio.");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    });

    alert("Nota criada com sucesso!");
    navigate(-1);
  }



  return (
  <Container>
    <Header />

    <main>
      <Form>
        <header>
          <h1>Criar nota</h1>
          <ButtonText 
            title="Voltar" 
            onClick={handleBack} 
          />
        </header>

        <Input
          placeholder="Título"
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea 
          placeholder="Observações" 
          onChange={e => setDescription(e.target.value)}
        />

        <Section title="Links úteis">
          {
            links.map((link, index) => (
              <NoteItem
                key={String(index)} // sempre que eu tiver um componente sendo renderizado por uma lista, ou seja, vou ter vários desses componentes porque ele vai ser renderizado por uma lista, eu tenho que colocar uma key. O map além do link ele também devolve um index que é a posição do elemento dentro da lista. O index no método map é usado para identificar a posição atual do elemento que está sendo processado na matriz. No seu código, o index é convertido em uma string e usado como uma chave (key) para cada item NoteItem.
                value={link}
                onClick={() => handleRemoveLink(link)}
                // É um padrão quando a gente tem um parâmetro a gente usa uma arrow function.
              />
            ))
          }
          <NoteItem
            isNew 
            placeholder="Novo link"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink}
          />
        </Section>


        <Section title="Marcadores">
          <div className="tags">
            {
              tags.map((tag, index) => (
                <NoteItem
                key={String(index)}
                value={tag}
                onClick={() => {handleRemoveTag(tag)}}
              />
              ))
            }
            
            <NoteItem
              isNew 
              placeholder="Nova tag"
              onChange={e => setNewTag(e.target.value)}
              value={newTag}
              onClick={handleAddTag}
            />
          </div>
        </Section>

        <Button 
          title="Salvar"
          onClick={handleNewNote}
        />
      </Form>
    </main>
  </Container>
  );
}