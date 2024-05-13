// Esse código é parte de um sistema de autenticação em uma aplicação React que cria um contexto de autenticação para gerenciar o estado de autenticação do usuário.

import { createContext, useContext, useEffect, useState } from "react";
// O createContext cria um contexto de autenticação.
// O useContext acessa o contexto.
// O useState gerencia o estado do usuário autenticado.

import { api } from '../services/api'
// Este módulo é usado para fazer solicitações HTTP para um servidor de back-end.

export const AuthContext = createContext({});
// Cria um novo contexto de autenticação, este contexto será utilizado para fornecer/prover dados e funções relacionadas à autenticação para componentes filhos que o requisitarem.

function AuthProvider({ children }) {
  // Recebe um parâmetro chamado children, que representa os componentes filhos que serão envolvidos pelo contexto de autenticação.
  const [data, setData] = useState({});
  // Usa o hook useState para criar um estado para armazenar os dados do usuário autenticado. O estado data será utilizado para armazenar informações sobre o usuário autenticado e o token de autenticação.

  async function signIn({ email, password }) {
    // É uma função de autenticação assíncrona que recebe um objeto contendo um email e senha como parâmetro. Ela é responsável por fazer a autenticação do usuário.
    try {
      const response = await api.post("/sessions", { email, password });
      // Faz uma requisição POST para a rota /sessions do servidor de back-end com email e password como corpo da solicitação.
      const { user, token } = response.data;
      // Extrai user e token dos dados da resposta da solicitação acima.

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);
      // Utilizando o localStorage para armazenar as informações de usuário no navegador quando é feito o login, depois uso o useEffect para buscar as informações armazenadas no localStorage quando o usuário recarregar a página

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Quando o token de autenticação é inserido no cabeçalho de uma requisição HTTP, ele se torna um token de autorização.
      // Isso porque ele está sendo usado para autorizar a requisição, permitindo que o servidor verifique se o cliente tem permissão para acessar os recursos solicitados.
      // está definindo o cabeçalho de autorização para todas as requisições feitas pela instância api. Ele adiciona um token de autorização do tipo Bearer ao cabeçalho Authorization.
      // Estou inserindo um token do tipo Bearer no cabeçalho de autorização por padrão para todas as requisições que o usuário vai fazer a partir de agora. Foi inserido dentro do cabeçario de autorização. Pecisamos passar o token no header da requisição porque o backend captura ele lá para verificar se estamos autenticados ou não.
      setData({ user, token });
      // Atualiza o estado data com o user e token recebidos.
    
    } catch (error) {
      if (error.response) { // Se o error tem um response então vamos exibir a mensagem personalizada do AppError do backend.
        alert(error.response.data.message); 
      } else { // Caso contrário será exibido um alerta mais generico.
        alert("Não foi possível entrar.")
      }           
    }
  }
  // signIn é um componente filho que consome o valor do contexto AuthContext. Ele não pode fornecer o contexto porque ele está em um nível mais baixo na árvore de componentes.

  function signOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({}); // Para reflitir nas minhas rotas que vai mudar o estado automaticamente mudando o estado ele vai passar a ter um usuário vazio e vai levar para o <AuthRoutes /> e não mais para o <AppRoutes />
  }
  // Função criado para o logout.

  async function updateProfile({ user, avatarFile }) {
    // A função updateProfile recebe o novo objeto user e avatarFile do arquivo index.jsx profile e tenta atualizar o perfil do usuário no servidor através da chamada await api.put("/users", user).
    try {

      if(avatarFile) { // Se tem um arquivo selecionado "avatarFile"
        const fileUploadForm = new FormData();
        // preciso enviar ele como arquivo, o arquivo lá no backend está esperando em um campo chamado avatar. A classe FormData é uma interface do JavaScript que permite criar facilmente objetos que representam dados de formulário HTML. Ela é frequentemente utilizada para enviar dados por meio de requisições HTTP, especialmente quando você precisa enviar arquivos binários, como imagens, áudios ou vídeos.
        fileUploadForm.append("avatar", avatarFile);
        // este código está preparando um formulário de upload de arquivo, adicionando um arquivo de imagem chamado avatarFile com a chave "avatar". Este formulário pode ser posteriormente enviado para um servidor usando uma solicitação HTTP.
        const response = await api.patch("users/avatar", fileUploadForm);
        // fazendo uma requisição para o users avatar mandando o formulario, na resposta eu espero o avatar atualizado.
        user.avatar = response.data.avatar;
        // está definindo o avatar do usuário para ser o avatar que foi retornado em algum tipo de resposta de dados, provavelmente de uma solicitação de API ou algo similar.
      }

      await api.put("/users", user);
      // Esta linha faz uma chamada para a API para atualizar os detalhes do usuário no servidor. A rota da API é /users e os novos dados do usuário são passados como o segundo argumento.
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      // Esta linha atualiza os detalhes do usuário no armazenamento local do navegador. Isso é útil para persistir os dados do usuário entre as sessões do navegador.

      setData({ user, token: data.token });
      // Esta linha atualiza o estado local do aplicativo com os novos detalhes do usuário e o token de autenticação existente.
      alert("Perfil atualizado!");

    } catch (error) {
      if (error.response) { // Se o error tem um response então vamos exibir a mensagem personalizada do AppError do backend.
        alert(error.response.data.message); 
      } else { // Caso contrário será exibido um alerta mais generico.
        alert("Não foi possível atualizar o perfil.")
      }           
    }
  }
  // A função é usada para atualizar o perfil do usuário.
  // A execução começa no arquivo index.jsx do perfil e, em seguida, passa para a função updateProfile no arquivo auth.jsx quando o usuário decide atualizar seu perfil.

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
      
      setData({
        token,
        user: JSON.parse(user)
      });
      // Atualizando o estado com a função setData com o token e user que foram armazenados no localStorage. estou pegando os dados armazenados do usuário no formato de texto e voltei ele para um objeto do tipo JSON em user.
    }
  }, []);
  // Vou buscar as informações no localStorage quando o usuário recarregar a página e preencher o estado para refletir nos lugares que está usando esse meu estado, vai ser usado o userEffect para fazer isso, o useEffect vai buscar para mim esssas informações.
  // O useEffect está buscando as informações no local storage.

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile, 
      user: data.user 
    }}
    > 
      {children}
    </AuthContext.Provider>
  )
  // É utilizado o componente <AuthContext.Provider> para envolver os componentes filhos. Ele fornece o contexto de autenticação para os componentes filhos e passa os valores da função signIn e o usuário autenticado data.user como valor para o contexto.
  // A função signOut é passada como valor para ficar dentro do contexto.
  // A função signIn com os parametros é chamada no arquivo index.jsx SignIn.

}
// O AuthProvider é um componente que recebe children como propriedade e irá fornecer o AuthContext contexto de autenticação para seus componentes filhos. Ele é geralmente usado no nível mais alto do seu aplicativo para que o contexto possa ser acessado por todos os componentes abaixo dele na árvore de componentes. Em resumo, AuthProvider é usado para fornecer o contexto e useAuth é usado para consumir o contexto.

function useAuth() {
  const context = useContext(AuthContext);
  
  return context;
}
// A função useAuth que foi exportada é uma função personalizada que usa o Hook useContext para acessar o valor atual do contexto AuthContext.
// O valor do contexto AuthContext é definido no componente AuthProvider.
// Em resumo, AuthProvider é usado para fornecer o contexto e useAuth é usado para consumir o contexto.

export { AuthProvider, useAuth };

