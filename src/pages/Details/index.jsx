import { useState, useEffect } from 'react';
import { Container, Links, Content } from './styles';
import { useParams, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Tag } from '../../components/Tag';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header'
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Details() {
  const [data, setData] = useState(null); // Criar um estado para armazenar as informações da nota.

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1)
    }
  }
  // window.confirm é do próprio js e eu coloco uma mensagem, então o confirm vai guardar um verdadeiro ou falso.
  
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data);

    }

    fetchNote();
  })
  // Quero usar o useEffect para buscar por esse parâmetro e buscar as notas para mim quando a minha interface for carregada.

  return (
    <Container>
      <Header />
    
    {
      data && // Se tem conteúdo mostra o data, se não tem conteúdo não mostra o data
      <main>
      <Content>
        <ButtonText
          title="Excluir nota"
          onClick={handleRemove}
        />

        <h1>
          {data.title}
        </h1>

        <p>
          {data.description}
        </p>


        {
          data.links &&
          <Section title="Links úteis">
            <Links>
            {
              data.links.map(link => (
                <li key={String(link.id)} >
                  <a href={link.url} target='_blank'>
                    {link.url}
                  </a>
                </li>
              ))
            }
            </Links>
          </Section>
        }

        {
          data.tags && // Só vou renderizar essa seção se tiver tags para ser renderizadas.
          <Section title="Marcadores">
            {
              data.tags.map(tag => (
                <Tag
                  key={String(tag.id)}
                  title={tag.name} 
                />
              ))
            }
          </Section>
        }

        <Button
          title="Voltar"
          onClick={handleBack} 
        />                
      </Content>
      </main>
    }




    </Container>
  )
}