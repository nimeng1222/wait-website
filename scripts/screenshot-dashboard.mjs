// 官网素材截图：mock 后端渲染 wait-web-next 首页，截取亮色/暗色两版仪表盘。
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4174';

const nodes = [
  { uuid: 'uuid-hk', name: 'HK-Prod-01', region: '🇭🇰', os: 'Debian 12', mem: 2, disk: 40, price: 12.5, online: true, cpu: 23.5, memUsed: 0.62, diskUsed: 0.47, up: 1.2, down: 45.8 },
  { uuid: 'uuid-jp', name: 'JP-Edge-02', region: '🇯🇵', os: 'Ubuntu 24.04', mem: 4, disk: 80, price: 8, online: true, cpu: 67.2, memUsed: 0.81, diskUsed: 0.33, up: 0.8, down: 120.4 },
  { uuid: 'uuid-sg', name: 'SG-DB-Main', region: '🇸🇬', os: 'Debian 12', mem: 8, disk: 240, price: 25, online: true, cpu: 41.0, memUsed: 0.55, diskUsed: 0.71, up: 2.1, down: 88.2 },
  { uuid: 'uuid-us', name: 'US-Backup', region: '🇺🇸', os: 'AlmaLinux 9', mem: 1, disk: 25, price: 3.5, online: false, cpu: 0, memUsed: 0, diskUsed: 0, up: 0, down: 0 },
  { uuid: 'uuid-de', name: 'DE-Storage', region: '🇩🇪', os: 'Ubuntu 22.04', mem: 16, disk: 500, price: 30, online: true, cpu: 12.8, memUsed: 0.38, diskUsed: 0.59, up: 0.5, down: 64.0 },
];

const G = 1024 ** 3;
const rpcNodes = Object.fromEntries(nodes.map((n) => [n.uuid, {
  uuid: n.uuid, name: n.name, cpu_name: 'AMD EPYC 7763', virtualization: 'KVM', arch: 'x86_64',
  cpu_cores: 4, os: n.os, kernel_version: '6.8.0', gpu_name: '', region: n.region,
  mem_total: n.mem * G, swap_total: 0, disk_total: n.disk * G,
  version: 'v1.2.0', weight: 0, price: n.price, tags: '', billing_cycle: 30,
  currency: '$', group: '', public_remark: '', traffic_limit: 500 * G, traffic_limit_type: 'sum',
  traffic_reset_type: 'month', purchase_date: '2026-01-01T00:00:00Z', expired_at: '2026-09-15T00:00:00Z',
  created_at: '2026-01-01T00:00:00Z', updated_at: '2026-07-01T00:00:00Z', ipv4: '', ipv6: '',
}]));

const liveStatus = Object.fromEntries(nodes.map((n) => [n.uuid, {
  client: n.uuid, time: '2026-07-19T14:45:00Z', cpu: n.cpu, gpu: 0,
  ram: Math.round(n.mem * G * n.memUsed), ram_total: n.mem * G, swap: 0, swap_total: 0,
  load: 1.2, load5: 1.0, load15: 0.8, disk: Math.round(n.disk * G * n.diskUsed), disk_total: n.disk * G,
  net_in: n.down * 1024 ** 2, net_out: n.up * 1024 ** 2,
  net_total_up: 45 * G, net_total_down: 320 * G, net_cycle_up: 12 * G, net_cycle_down: 96 * G,
  process: 128, connections: 342, connections_udp: 45, online: n.online, uptime: 3456789, ping: {},
}]));

const envelope = (data) => ({ status: 'success', data });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

await page.route('**/api/public', (route) => route.fulfill({
  status: 200, contentType: 'application/json',
  body: JSON.stringify(envelope({ sitename: 'wait', private_site: false, theme: 'default', theme_settings: {}, custom_head: '', custom_body: '' })),
}));
await page.route('**/api/me', (route) => route.fulfill({
  status: 200, contentType: 'application/json', body: JSON.stringify(envelope({ logged_in: false })),
}));
await page.route('**/api/rpc2', async (route) => {
  const request = route.request();
  if (request.method() !== 'POST') { await route.fulfill({ status: 405, body: 'Method Not Allowed' }); return; }
  const payload = request.postDataJSON();
  const results = { 'common:getNodes': rpcNodes, 'common:getNodesLatestStatus': liveStatus };
  await route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ jsonrpc: '2.0', id: payload?.id ?? null, result: results[payload?.method] ?? {} }),
  });
});

await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForSelector('text=HK-Prod-01', { timeout: 15_000 });
await page.waitForTimeout(1200);

// 隐藏 mock 环境特有的 WS 断连横幅和重连状态标识
const hideMockArtifacts = `(() => {
  const has = (el, s) => (el.textContent ?? '').includes(s);
  // 找到最内层包含目标文本的元素（子元素不再包含该文本），再向上定位到 alert 容器
  const innermost = [...document.querySelectorAll('div, span')].filter(
    (el) => has(el, 'WebSocket 连接已关闭') && ![...el.children].some((c) => has(c, 'WebSocket 连接已关闭')),
  );
  for (const el of innermost) {
    // 最内层匹配者即横幅容器本身，直接隐藏（不要碰 parent，那可能是整页容器）
    el.style.display = 'none';
  }
  const pill = [...document.querySelectorAll('span')].find(
    (el) => /RPC2\\s*[·\\-—]\\s*(reconnecting|connecting)/.test(el.textContent ?? '') && el.children.length === 0,
  );
  if (pill) {
    const box = pill.closest('div');
    if (box) box.style.display = 'none';
  }
})()`;
await page.evaluate(hideMockArtifacts);

await page.screenshot({ path: process.argv[2] ?? 'dashboard-light.png' });

// 暗色主题：next-themes 存储键为 theme，预置后 reload
await page.evaluate(() => localStorage.setItem('theme', 'dark'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.evaluate(hideMockArtifacts);
await page.screenshot({ path: process.argv[3] ?? 'dashboard-dark.png' });
console.log('dark captured');

await browser.close();
console.log('done');
