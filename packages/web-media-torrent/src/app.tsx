import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Download } from './pages/download';
import { List } from './pages/list';
import { Result } from './pages/result';
import { Search } from './pages/search';

export const App: React.FC = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/foo" element={<List />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<Result />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </BrowserRouter>
  </div>
);
