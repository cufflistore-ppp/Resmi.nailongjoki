// ===================== DATA =====================
const DEFAULT_LINKS = {
  admin: [
    { id: 'a1', name: 'WA NAILONG JOKI NOPE1', desc: 'Chat admin utama Nailong Joki Elite', url: 'https://wa.me/6285124697215', badge: 'ADMIN', badgeClass: '', verified: true },
    { id: 'a2', name: 'WA NAILONG JOKI NOPE2', desc: 'Chat admin backup Nailong Joki Elite', url: 'https://wa.me/6285134220987', badge: 'ADMIN', badgeClass: '', verified: true },
    { id: 'a3', name: 'WA CS LAPORAN MASALAH JOKI', desc: 'Bantuan customer service & laporan', url: 'https://wa.me/6285842728134', badge: 'Admin Laporan Order', badgeClass: 'laporan', verified: false },
    { id: 'a4', name: 'Website Buyer fresh [manen,bulanan,mingguan]', desc: 'svb buyer fresh [manen,bulanan,mingguan]', url: 'https://buyer-fresh-nailongjoki.vercel.app', badge: 'buyer fresh', badgeClass: 'buyer fresh', verified: false },
    { id: 'a5', name: 'Website Joki Nailong Resmi', desc: ' Order joki resmi', url: 'https://nailongjoki.vercel.app', badge: '', badgeClass: '', verified: false, icon: 'globe' }
],
  jb: [
    { id: 'j1', name: '𝗡Λ𝗜𝗟𝗢𝗡𝗚々𝗝𝗢𝗞𝗜 𝗘𝗟𝗜𝗧𝗘 | JB¹', desc: 'Grup jual beli & info order Nailong 1', url: 'https://chat.whatsapp.com/CpxBuLPtoui0jbonQxXIsQ', badge: 'JB', badgeClass: 'jb', verified: false },
    { id: 'j2', name: '𝗡Λ𝗜𝗟𝗢𝗡𝗚々𝗝𝗢𝗞𝗜 𝗘𝗟𝗜𝗧𝗘 | JB²', desc: 'Grup jual beli & info order Nailong 2', url: 'https://chat.whatsapp.com/example2', badge: 'JB', badgeClass: 'jb', verified: false }
     ],
  saluran: [
    { id: 's1', name: '𝗡Λ𝗜𝗟𝗢𝗡𝗚々𝗝𝗢𝗞𝗜 𝗘𝗟𝗜𝗧𝗘 | SL¹', desc: 'Saluran info, promo & pengumuman 1', url: 'https://whatsapp.com/channel/0029Vb85rHM6WaKoaWwekJ3c', badge: 'SL', badgeClass: 'sl', verified: true },
    { id: 's2', name: '𝗡Λ𝗜𝗟𝗢𝗡𝗚々𝗝𝗢𝗞𝗜 𝗘𝗟𝗜𝗧𝗘 | SL²', desc: 'Saluran info, promo & pengumuman 2', url: 'https://whatsapp.com/channel/0029Vb8bkdq4IBh6mtdFxG18', badge: 'SL', badgeClass: 'sl', verified: true },
    { id: 's3', name: '𝗡Λ𝗜𝗟𝗢𝗡𝗚々𝗝𝗢𝗞𝗜 𝗘𝗟𝗜𝗧𝗘 | SL [TEBAR JOKIAN]', desc: 'Saluran tebar jokian resmi', url: 'https://whatsapp.com/channel/0029Vb80KCH2ZjCnI4lfzh2W', badge: 'SL', badgeClass: 'sl', verified: true },
    { id: 's4', name: '𝗡Λ𝗜𝗟𝗢𝗡𝗚々𝗝𝗢𝗞𝗜 𝗘𝗟𝗜𝗧𝗘 | SL [TEBAR JASPOST]', desc: 'Saluran tebar jaspost resmi', url: 'https://whatsapp.com/channel/0029VbDbi5o60eBZn0HMLM1q', badge: 'SL', badgeClass: 'sl', verified: true }
  ],
  sosmed: [
    { id: 'sm1', name: 'Instagram', desc: 'Follow Instagram resmi Nailong Joki', url: 'https://instagram.com/nailongjoki', badge: 'IG', badgeClass: 'custom', verified: false, icon: 'instagram' },
    { id: 'sm2', name: 'TikTok', desc: 'Follow TikTok resmi Nailong Joki', url: 'https://tiktok.com/@nailongjoki', badge: 'TT', badgeClass: 'custom', verified: false, icon: 'tiktok' }
  ]
};

const STORAGE_KEY = 'nailong_links_v3';

// ===================== STATE =====================
let links = loadLinks();
let editMode = false;

function loadLinks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_LINKS));
}

function saveLinks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

// ===================== RENDER =====================
function renderLinks() {
  ['admin', 'jb', 'saluran', 'sosmed'].forEach(tab => {
    const container = document.getElementById(`list-${tab}`);
    if (!container) return;

    const items = links[tab] || [];
    const countEl = document.querySelector(`.tab-btn[data-tab="${tab}"] .count`);
    if (countEl) countEl.textContent = `${items.length} LINK`;

    if (items.length === 0) {
      container.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:20px;font-size:13px;">Belum ada link. Klik tombol + untuk menambah.</p>`;
      return;
    }

    container.innerHTML = items.map(item => {
      // Semua bulatan pakai foto logo
      const iconHtml = '<img src="logo.jpg" alt="">';

      const verifiedHtml = item.verified
        ? `<img src="secure.gif" alt="verified" style="width:16px;height:16px;vertical-align:middle;">`
        : '';

      const badgeHtml = item.badge
        ? `<span class="badge ${item.badgeClass || ''}">${item.badge}</span>`
        : '';

      const deleteBtn = editMode
        ? `<button class="link-delete" onclick="event.preventDefault();deleteLink('${tab}','${item.id}')" title="Hapus"><i class="fa-solid fa-times"></i></button>`
        : '';

      return `
        <a class="link-card" href="${item.url}" target="_blank" rel="noopener">
          <div class="link-icon">${iconHtml}</div>
          <div class="link-info">
            <div class="link-name">${item.name} ${verifiedHtml} ${badgeHtml}</div>
            <div class="link-desc">${item.desc}</div>
          </div>
          <span class="link-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
          ${deleteBtn}
        </a>
      `;
    }).join('');
  });
}

// ===================== TABS =====================
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.section').forEach(s => {
        s.classList.toggle('active', s.id === tab);
      });
    });
  });
}

// ===================== ADD LINK =====================
function openAddModal() {
  // Fitur tambah dinonaktifkan
  return;
}

function closeAddModal() {
  return;
}

function addLink() {
  const name = document.getElementById('linkName').value.trim();
  const desc = document.getElementById('linkDesc').value.trim();
  const url = document.getElementById('linkUrl').value.trim();
  const category = document.getElementById('linkCategory').value;
  const badge = document.getElementById('linkBadge').value.trim().toUpperCase();

  if (!name || !url) {
    showToast('Nama dan URL wajib diisi!');
    return;
  }

  let badgeClass = 'custom';
  if (badge === 'ADMIN') badgeClass = '';
  else if (badge === 'CS') badgeClass = 'cs';
  else if (badge === 'FS') badgeClass = 'fs';
  else if (badge === 'JB') badgeClass = 'jb';
  else if (badge === 'SL') badgeClass = 'sl';

  const newLink = {
    id: 'c' + Date.now(),
    name,
    desc: desc || 'Link tambahan',
    url,
    badge,
    badgeClass,
    verified: false
  };

  if (!links[category]) links[category] = [];
  links[category].push(newLink);
  saveLinks();
  renderLinks();
  closeAddModal();
  showToast('Link berhasil ditambahkan!');
}

function deleteLink(tab, id) {
  if (!confirm('Hapus link ini?')) return;
  links[tab] = links[tab].filter(l => l.id !== id);
  saveLinks();
  renderLinks();
  showToast('Link dihapus');
}

function toggleEditMode() {
  editMode = !editMode;
  document.body.classList.toggle('edit-mode', editMode);
  const btn = document.getElementById('editBtn');
  if (btn) {
    btn.innerHTML = editMode
      ? '<i class="fa-solid fa-check"></i>'
      : '<i class="fa-solid fa-pen"></i>';
  }
  renderLinks();
  showToast(editMode ? 'Mode edit aktif' : 'Mode edit nonaktif');
}

function resetLinks() {
  if (!confirm('Reset semua link ke default? Data custom akan hilang.')) return;
  localStorage.removeItem(STORAGE_KEY);
  links = loadLinks();
  renderLinks();
  showToast('Link direset ke default');
}

// ===================== TOAST =====================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ===================== INIT =====================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('app').classList.add('show');
  }, 2000);

  initTabs();
  renderLinks();
});

// Expose for onclick
window.deleteLink = deleteLink;
window.addLink = addLink;
window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;
window.toggleEditMode = toggleEditMode;
window.resetLinks = resetLinks;
