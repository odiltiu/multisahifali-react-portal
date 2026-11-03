import { BrowserRouter, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';

// 1. Auth importlari
import Login from './pages/auth/login';
import Register from './pages/auth/register';

// 2. Portfolio importlari
import PortfolioProjects from './pages/portfolio/projects';
import Resume from './pages/portfolio/resume';

// 3. Root importlari
import Home from './pages/root/home';
import Categories from './pages/root/categories';
import RootProjects from './pages/root/projects';
import Profile from './pages/root/profile';
import Settings from './pages/root/settings';

// 4. Mustaqil sahifalar importi
import Chat from './pages/chat';
import Posts from './pages/posts';
import Users from './pages/users';

// Layoutlar
const RootLayout = () => (
  <div>
    <header>
      <h2>Root Section</h2>
      <nav>
        <Link to="/root/home">Home</Link> | 
        <Link to="/root/categories">Categories</Link> | 
        <Link to="/root/projects">Projects</Link> | 
        <Link to="/root/profile">Profile</Link> | 
        <Link to="/root/settings">Settings</Link>
      </nav>
    </header>
    <main><Outlet /></main>
  </div>
);

const AuthLayout = () => (
  <div>
    <h2>Auth Section</h2>
    <nav>
      <Link to="/auth/login">Login</Link> | 
      <Link to="/auth/register">Register</Link>
    </nav>
    <main><Outlet /></main>
  </div>
);

const PortfolioLayout = () => (
  <div>
    <h2>Portfolio Section</h2>
    <nav>
      <Link to="/portfolio/resume">Resume</Link> | 
      <Link to="/portfolio/projects">Projects</Link>
    </nav>
    <main><Outlet /></main>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/root/home">Root</Link> | 
        <Link to="/auth/login">Auth</Link> | 
        <Link to="/portfolio/resume">Portfolio</Link> | 
        <Link to="/chat">Chat</Link> | 
        <Link to="/posts">Posts</Link> | 
        <Link to="/users">Users</Link>
      </nav>
      <hr />

      <Routes>
        <Route path="/root" element={<RootLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="projects" element={<RootProjects />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/portfolio" element={<PortfolioLayout />}>
          <Route index element={<Navigate to="resume" replace />} />
          <Route path="resume" element={<Resume />} />
          <Route path="projects" element={<PortfolioProjects />} />
        </Route>

        <Route path="/chat" element={<Chat />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />

        <Route path="/" element={<Navigate to="/root/home" replace />} />
        <Route path="*" element={<h1>404 - Sahifa Topilmadi</h1>} />
      </Routes>
    </BrowserRouter>
  );
}