import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Assets from './pages/Assets';
import Compliance from './pages/Compliance';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/compliance" element={<Compliance />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
