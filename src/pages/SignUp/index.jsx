import { useState } from 'react'; // É um Hook (gancho) do React que permite adicionar o estado do React a componentes funcionais.
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api";
// Vou mandar as informações para o backend
// Variável api onde configuramos nossa api

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from './style';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // useState entrega duas coisas importantes um valor com estado e uma função para atualizá-lo que fica dentro do [].

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    api.post("users", {name, email, password})
    // Vou acessar a api, vou fazer um post em users que é a rota onde eu cadastro usuários, e agora no segundo parametro eu posso enviar o nome, email e a password do usuário.
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      navigate("/")
    })
    .catch(error => {
      if (error.response) {
        alert(error.response.data.message); // Vou pegar a propria mensagem que o backend está me mandando em UserController no if (checkUserExists).
      } else {
        alert("Não foi possível cadastrar");
      } // Caso seja uma mensagem mais especifica eu insiro uma mensagem mais generica.
    });
  }
  // Portanto, error.response.data.message é a maneira de acessar a mensagem de erro específica retornada pelo servidor quando ocorre um erro na requisição HTTP.
  // .then Este método é chamado quando a promessa (neste caso, a requisição api.post) é resolvida, ou seja, completada com sucesso.
  // .catch Este método é chamado quando a promessa é rejeitada, ou seja, quando ocorre um erro durante a execução.

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input 
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
          // função onChange, toda vez que o valor do input muda ela dispara um evento.
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
          // função onChange, toda vez que o valor do input muda ela dispara um evento.
        />
        
        <Input 
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
          // função onChange, toda vez que o valor do input muda ela dispara um evento.
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          Voltar para o login
        </Link>

      </Form>
    </Container>
  );
}

