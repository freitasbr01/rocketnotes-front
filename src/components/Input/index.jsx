import { Container } from './styles';

export function Input({ icon: Icon, ...rest }) {
  return (
    <Container>
      { Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}

// Se existir icone eu mostro ele, caso contrário não.