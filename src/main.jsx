import React from 'react'; // Permite que a gente desenvolva nossas interfaces, disponibiliza a sintaxe do jsx
import ReactDOM from 'react-dom/client'; // Permite manipular os elementos que fazem parte da página
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme'
import GlobalStyles from './styles/global'; // Importando do arquivo global.js de estilização

import { AuthProvider } from './hooks/auth'; // Importando o meu contexto.

import { Routes } from './routes'; // Importação das rotas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)

