const fs = require('fs');
const path = require('path');

const dirsToRemove = [
  '(routes)', 'floor', 'login', 'signup', 'items', 'orders', 
  'payments', 'settings', 'staff', 'customers', 'reports'
];

dirsToRemove.forEach(d => {
  const target = path.join(__dirname, 'app', d);
  try {
    fs.rmSync(target, { recursive: true, force: true });
    console.log('Removed ' + target);
  } catch(e) {
    console.error('Failed to remove ' + target, e.message);
  }
});
