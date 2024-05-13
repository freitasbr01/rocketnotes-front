import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import { Container, Form, Avatar } from './styles';

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();
  // Quando o componente Profile é renderizado, ele inicializa o estado do nome, email e senhas com os valores atuais do usuário.

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl); // EXIBI O AVATAR. Se o usuário já tiver um avatar eu vou colocar aqui.
  const [avatarFile, setAvatarFile] = useState(null);  // GUARDA O ARQUIVO SELECIONADO. O avatarFile vou usar exclusivamente para carregar a nova foto selecionada pelo usuário, por isso vou colocar como null.

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1)
  }

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }

    const userUpdated = Object.assign(user, updated);
    // O updated vai sobrescrever o user com as informações atualizadas.

    await updateProfile({ user: userUpdated, avatarFile }); // avatarFile que é o arquivo selecionado pelo usuário
  } // Quando o usuário decide atualizar seu perfil, a função handleUpdate é chamada. Esta função cria um objeto updated com os novos valores do nome, email e senhas. Em seguida, ela chama a função updateProfile passando o novo objeto updated e avatarFile. A execução começa no arquivo index.jsx do perfil e, em seguida, passa para a função updateProfile no arquivo auth.jsx.

  function handleChangeAvatar(event) { // event é o evento de alteração do avatar, o onChange vai transferir de forma automática pra ele esse evento.
    const file = event.target.files[0]; // Vou extrair o arquivo e vou pegar ele de event.target.files[0] e vou pegar a primeira posição, nesse caso quero pegar uma única foto que o usuário vai selecionar.
    // captura o arquivo de imagem selecionado pelo usuário e guarda em uma constante file.
    setAvatarFile(file); // vou colocar o arquivo que o usuário acabou de selecionar no estado avatarFile.

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
    // toda vez que o usuário mudar de avatar, vou gerar uma URL para atualizar o estado "avatar" que é o estado que exibi o avatar.
    // utiliza um método nativo do navegador, URL.createObjectURL(), que recebe como parâmetro o arquivo de imagem e retorna uma URL que aponta diretamente para o arquivo. Essa URL é utilizada para atualizar o estado da variável avatar com a nova imagem selecionada pelo usuário. Assim, o componente é atualizado e o avatar do usuário aparece na página.
  }  

  return (
  <Container>
    <header>
      <button type='button' onClick={handleBack}>
        <FiArrowLeft />
      </button>
    </header>

    <Form>
      <Avatar>
        <img 
          src={avatar}
          alt="Foto do usuário" 
        />

        <label htmlFor="avatar">
          <FiCamera />

          <input 
            id="avatar"
            type="file"
            onChange={handleChangeAvatar}
          />
        </label>
      </Avatar>

      <Input 
        placeholder="Nome"
        tyoe="text"
        icon={FiUser}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Input 
        placeholder="E-mail"
        tyoe="text"
        icon={FiMail}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <Input 
        placeholder="Senha"
        tyoe="password"
        icon={FiLock}
        onChange={e => setPasswordOld(e.target.value)}
      />

      <Input 
        placeholder="Nova senha"
        tyoe="password"
        icon={FiLock}
        onChange={e => setPasswordNew(e.target.value)}
      />

      <Button title="Salvar" onClick={handleUpdate} />
    </Form>    

  </Container>
  );
}