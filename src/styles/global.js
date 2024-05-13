import { createGlobalStyle } from "styled-components";
// O createGlobalStyle é uma função específica da biblioteca styled-components usada para definir estilos globais em sua aplicação React. Mesmo que você já tenha importado styled-components, você ainda precisará importar createGlobalStyle explicitamente se quiser usar essa funcionalidade.

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 62.5%;
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};
    
  }

  body, input, button, textarea {
    font-family: "Roboto Slab", serif;
    font-size: 1.6rem;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }
`;