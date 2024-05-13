// Rotas de autenticação, vai dar acesso as páginas quando o usuário não está logado.

import { Routes, Route, Navigate } from 'react-router-dom';
// Routes - vai envolver todas as minhas rotas.
// Route - para cada rota eu digo qual é o endereço, em barra eu quero renderizar o elemento minha Home.

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AuthRoutes() {
  const user = localStorage.getItem("@rocketnotes:user");
  // Pegando o usuário direto do local storage, porque não vai adiantar pegar o user do nosso contexto (usuário autenticado) porque quando passa por aqui no authroutes não tem usuário, então ele vai sempre retornar aqui que o usuário não existe. Isso vai servir para resolver o problema de favoritar uma pagina e não retornar mais para a pagina principal. Feito isso podemos renderiza condicionamente esse fallback, a gente vai renderizar o fallback apenas se o usuário for nulo

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      { !user && <Route path="*" element={<Navigate to="/" />} />}
      {/*
        O fallback acima só vai ser renderizado se realmente o usuário for nulo. Isso resolve a questão de favoritar as paginas com o user do local storage.
        O react router dom quando fazemos uma solicitação de navegação, ele vai tentar verificar qual rota que bate com o que eu coloquei na URL, por eexemplo, a rota / bate? a rota /register bate ? vai verificando uma por uma e quando chega no path *, ele vai entender o seguinte, se chegou aqui é para renderizar o componente que a gente definir aqui, poderia ser uma página de not found que é a famosa 404 etc ... só que no nosso caso vamos fazer com que o usuário volte para tela de login, só que ao invés de colocar o componente de login aqui (SignIn) vou fazer de outra maneira, vamos usar um outro componente aqui que é do próprio react router dom que é o Navigate que é um componente para navegar o usuário, usamos o <Navigate to="/" />. Se formos fazer uma analogia podemos dizer que é um else ou rota de fallback, ou seja, nenhuma rota anterior foi atendida então executa essa aqui.
      */}
    </Routes>
  );
}


