import { useState } from 'react';
// Para criar estados e armazenar essas informações que vem da requisição, exemplo, logar.

import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Container, Form, Background } from './style';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth(); // Função de signIn que faz a autenticação do usuário foi desestruturada de useAuth() do arquivo auth.jsx.

  function handleSignIn() {
    signIn({ email, password }); // Essa função é chamada no botão entrar "abaixo" e o email e password são enviados para a função do arquivo auth.jsx.
  }

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)} // onChange fica observando quando o conteúdo muda.
        />
        
        <Input 
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}

        />

        <Button title="Entrar" onClick={handleSignIn}/>

        <Link to="/register">
          Criar conta
        </Link>

      </Form>

      <Background />
    </Container>
  );
}