import { Container } from './styles'

export function Button({ title, loading = false, ...rest }) {
  return(
  <Container
      type="button"
      disabled={loading}
      {...rest}
    >
    {loading ? 'Carregando...' : title}
  </Container>
  )
}



/*
  return(
    <Container type="button">
      {props.title}
    </Container>
    )
    exemplo sem desestruturar

    ...rest -> Significa que qualquer outra propriedade que eu não tenha deixado explicito aqui mas tenha sido informada, vai ser inserida nos componentes

    loading = false -> Quando fazemos isso estamos dizendo o seguinte, caso a propriedade loading não seja informada, ele vai definir um valor padrão que vai ser o falso para a propriedade
*/

// Uma propriedade nada mais é que uma variavel, por isso temos que colocar entre chaves