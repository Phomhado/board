import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import TaskCard from './components/TaskCard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TaskCard title='test'></TaskCard>
    </ThemeProvider>
  );
}

export default App;
