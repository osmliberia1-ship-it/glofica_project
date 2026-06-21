const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const pages = [
  { path: '/', view: 'home', title: 'Home' },
  { path: '/services', view: 'services', title: 'Services' },
  { path: '/membership', view: 'membership', title: 'Membership' },
  { path: '/knowledge-events', view: 'knowledge-events', title: 'Knowledge & Events' },
  { path: '/advisory', view: 'advisory', title: 'Request Advisory Support' },
  { path: '/login', view: 'login', title: 'Member Login' },
  { path: '/advisory-board', view: 'page', title: 'Advisory Board', heading: 'Advisory Board' },
  { path: '/transparency-report', view: 'page', title: 'Transparency Report', heading: 'Transparency Report' },
  { path: '/annual-review', view: 'page', title: 'Annual Review', heading: 'Annual Review' },
  { path: '/contact', view: 'page', title: 'Contact Us', heading: 'Contact Us' },
  { path: '/privacy', view: 'page', title: 'Privacy Policy', heading: 'Privacy Policy' },
  { path: '/terms', view: 'page', title: 'Terms of Service', heading: 'Terms of Service' },
];

pages.forEach(({ path: route, view, title, heading }) => {
  app.get(route, (req, res) => {
    res.render(view, {
      title,
      heading,
      currentPath: route,
    });
  });
});

app.listen(PORT, () => {
  console.log(`GFB website running at http://localhost:${PORT}`);
});
