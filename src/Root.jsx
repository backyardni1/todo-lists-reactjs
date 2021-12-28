import React from 'react';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Blog from './components/pages/Blog';
import BlogPost from './components/pages/BlogPost';

export default function Root() {
  let routes = [
    { to: '/', pageName: 'Home' },
    { to: '/about', pageName: 'About' },
    { to: '/blog', pageName: 'Blog' },
    { to: '/contact', pageName: 'Contact' },
  ];
  return (
    <Router>
      <div>
        <nav className="nav-container">
          <ul>
            {routes.map((route) => (
              <li key={route.to}>
                <NavLink
                  to={route.to}
                  className={({ isActive }) =>
                    'nav-link' + (!isActive ? '' : ' selected')
                  }
                >
                  {route.pageName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/about" element={'about here'} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blog/:id" element={<BlogPost />} />
          <Route exact path="/contact" element={'contact here'} />
          <Route exact path="*" element={'Page Not found 404'} />
        </Routes>
      </div>
    </Router>
  );
}
