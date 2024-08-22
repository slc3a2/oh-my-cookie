module.exports = {
  name: 'OhMyCookie',
  version: '1.2.0',
  description:
    'An extension to manage cookies, localStorage, and sessionStorage.',
  author: 'slc3a2',
  manifest_version: 3,
  icons: { 16: 'icons/logo16.png', 128: 'icons/logo128.png' },
  permissions: ['activeTab', 'tabs', 'cookies', 'scripting'],
  host_permissions: ['<all_urls>'],
  action: {
    default_title: 'OhMyCookie',
    default_popup: 'pages/popup.html'
  },
  background: {
    service_worker: 'js/background.js'
  },
  devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self';"
  },
  web_accessible_resources: [
    {
      resources: ['panel.html', 'js/content.js'],
      matches: ['<all_urls>']
    }
  ]
}
