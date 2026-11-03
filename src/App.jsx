import { BrowserRouter, Routes, Route, NavLink, Outlet, Navigate, Link, useLocation } from 'react-router-dom';

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

// Bosh menyu. "match" — bo'limdagi istalgan ichki sahifada ham faol ko'rinishi uchun
const MAIN_LINKS = [
  { to: '/root/home', match: '/root', label: 'Asosiy' },
  { to: '/auth/login', match: '/auth', label: 'Kirish' },
  { to: '/portfolio/resume', match: '/portfolio', label: 'Portfolio' },
  { to: '/chat', match: '/chat', label: 'Chat' },
  { to: '/posts', match: '/posts', label: 'Postlar' },
  { to: '/users', match: '/users', label: 'Foydalanuvchilar' },
];

const SECTIONS = {
  root: {
    title: "Asosiy bo'lim",
    links: [
      { to: '/root/home', label: 'Bosh sahifa' },
      { to: '/root/categories', label: 'Kategoriyalar' },
      { to: '/root/projects', label: 'Loyihalar' },
      { to: '/root/profile', label: 'Profil' },
      { to: '/root/settings', label: 'Sozlamalar' },
    ],
  },
  auth: {
    title: 'Avtorizatsiya',
    links: [
      { to: '/auth/login', label: 'Kirish' },
      { to: '/auth/register', label: "Ro'yxatdan o'tish" },
    ],
  },
  portfolio: {
    title: 'Portfolio',
    links: [
      { to: '/portfolio/resume', label: 'Rezyume' },
      { to: '/portfolio/projects', label: 'Loyihalar' },
    ],
  },
};

// Tuzatildi: uchala layout bir xil kod edi. Endi bitta komponent; NavLink "active" klassini qo'yadi
// (oldin Link ishlatilgani uchun CSS'dagi a.active uslubi hech qachon ishlamasdi)
function SectionLayout({ section }) {
  const { title, links } = SECTIONS[section];
  return (
    <div className={`${section}-layout`}>
      <header>
        <h2>{title}</h2>
        <nav aria-label={title}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
          ))}
        </nav>
      </header>
      <main><Outlet /></main>
    </div>
  );
}

function MainNav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Asosiy menyu">
      {MAIN_LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} className={pathname.startsWith(l.match) ? 'active' : undefined}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}

// Mustaqil sahifalar ham bir xil <main> ichida chiqadi
const PlainLayout = () => (
  <main><Outlet /></main>
);

function NotFound() {
  return (
    <main>
      <h1>404 — Sahifa topilmadi</h1>
      <p style={{ marginTop: 16 }}>
        <Link to="/root/home">Bosh sahifaga qaytish</Link>
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainNav />

      <Routes>
        <Route path="/root" element={<SectionLayout section="root" />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="projects" element={<RootProjects />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/auth" element={<SectionLayout section="auth" />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/portfolio" element={<SectionLayout section="portfolio" />}>
          <Route index element={<Navigate to="resume" replace />} />
          <Route path="resume" element={<Resume />} />
          <Route path="projects" element={<PortfolioProjects />} />
        </Route>

        <Route element={<PlainLayout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
        </Route>

        <Route path="/" element={<Navigate to="/root/home" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
