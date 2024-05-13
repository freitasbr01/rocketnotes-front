import { Container } from './styles';
import { Tag } from '../Tag'; 

export function Note({ data, ...rest }) {
  return (
    <Container {...rest}>
      <h1>{data.title}</h1>

      {
        data.tags &&
        <footer>
          {
            data.tags.map(tag => (
              <Tag key={tag.id} title={tag.name} />
            ))
          }
        </footer>
      }
    </Container>
  )
}

// Para cada item que a gente está percorrendo de Tags, estamos renderizando um componente chamado Tag e paddando uma chave e um title