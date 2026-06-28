const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const ejs = require('ejs');

const renderFile = promisify(ejs.renderFile);
const root = path.join(__dirname, '..');
const viewsDir = path.join(root, 'views');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(root, 'images');
const distDir = path.join(root, 'dist');

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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sourcePath = path.join(src, entry.name);
    const targetPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function getOutputPath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }

  const routeParts = route.split('/').filter(Boolean);
  return path.join(distDir, ...routeParts, 'index.html');
}

async function renderPage(page) {
  const viewPath = path.join(viewsDir, `${page.view}.ejs`);
  const html = await renderFile(viewPath, {
    title: page.title,
    heading: page.heading,
    currentPath: page.path,
  }, {
    root: viewsDir,
    filename: viewPath,
  });

  const outputPath = getOutputPath(page.path);
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, html, 'utf8');
}

function cleanDist() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  ensureDir(distDir);
}

async function build() {
  cleanDist();
  copyDirectory(publicDir, distDir);
  copyDirectory(imagesDir, path.join(distDir, 'images'));

  for (const page of pages) {
    await renderPage(page);
  }

  fs.writeFileSync(path.join(distDir, '404.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 Not Found</title>
    <style>body{font-family:system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#e2e8f0;margin:0}.content{text-align:center;padding:2rem;border:1px solid #334155;border-radius:16px;background:#020617}</style>
  </head>
  <body>
    <div class="content">
      <h1>404 Not Found</h1>
      <p>The page you were looking for could not be found.</p>
      <p><a href="/">Return home</a></p>
    </div>
  </body>
</html>
`, 'utf8');

  console.log('Static export completed to dist/');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
