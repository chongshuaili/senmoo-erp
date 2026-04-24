// ================================================================
// 法兰管道防腐保温管件厂管理系统 - 核心JS（app.js）
// 严格按 PRD 文档实现：8大模块 + 完整CRUD + 按钮规范
// ================================================================

// ---------- 全局状态 ----------
let currentUser = null;
let currentModule = null;
let currentPage = 'dashboard';
let currentTab = null;
let searchKeyword = '';
let pagination = { page: 1, pageSize: 10, total: 0 };
let chartInstances = {};
let editTarget = null; // 当前编辑对象
let viewTarget = null; // 当前查看对象

// ---------- 登录逻辑 ----------
function doLogin() {
  try {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const role = document.getElementById('loginRole').value;
    if (!user || !pass) { alert('请输入用户名和密码'); return; }
    currentUser = { username: user, role: role, roleName: document.querySelector('#loginRole option[value="'+role+'"]').textContent };
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    const nameEl = document.getElementById('userNameDisplay');
    const roleEl = document.getElementById('userRoleDisplay');
    const avatarEl = document.getElementById('userAvatar');
    if (nameEl) nameEl.textContent = user;
    if (roleEl) roleEl.textContent = currentUser.roleName;
    if (avatarEl) avatarEl.textContent = user.charAt(0).toUpperCase();
    renderSidebar();
    navigate('dashboard');
  } catch(e) {
    console.error('Login error:', e);
    alert('登录失败: ' + e.message);
  }
}

// ---------- 退出登录 ----------
function logout() {
  if (!confirm('确定退出系统？')) return;
  currentUser = null;
  document.getElementById('mainApp').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
  Object.keys(chartInstances).forEach(k => { if (chartInstances[k]) chartInstances[k].destroy(); });
  chartInstances = {};
}

// ---------- 侧边栏完整配置（所有子页面） ----------
const SIDEBAR_CONFIG = [
  {
    id: 'home', name: '系统首页', icon: 'grid', isSingle: true,
    render: () => `<div class="nav-item" data-page="home" onclick="navigate('home')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      <span>系统首页</span>
    </div>`
  },
  {
    id: 'basic', name: '基础信息', icon: 'folder', groups: [
      { label: '基础信息', items: [
        { page: 'basic-customer', name: '客户管理' },
        { page: 'basic-supplier', name: '供应商管理' },
        { page: 'basic-employee', name: '员工管理' },
        { page: 'basic-material', name: '物料档案' },
        { page: 'basic-product', name: '产品档案' },
        { page: 'basic-process', name: '工序库' },
        { page: 'basic-outsourcing', name: '外协厂家' },
        { page: 'basic-system', name: '系统设置' },
      ]}
    ]
  },
  {
    id: 'sales', name: '销售管理', icon: 'trending-up', groups: [
      { label: '销售管理', items: [
        { page: 'sales-quote', name: '销售报价' },
        { page: 'sales-order', name: '销售订单' },
        { page: 'sales-track', name: '订单跟踪' },
        { page: 'sales-outbound', name: '销售出库' },
        { page: 'sales-reconciliation', name: '销售对账' },
        { page: 'sales-receivable', name: '应收款' },
        { page: 'sales-report', name: '销售报表' },
      ]}
    ]
  },
  {
    id: 'purchase', name: '采购管理', icon: 'shopping-cart', groups: [
      { label: '采购管理', items: [
        { page: 'purchase-apply', name: '采购申请' },
        { page: 'purchase-order', name: '采购单' },
        { page: 'purchase-inbound', name: '采购入库' },
        { page: 'purchase-reconciliation', name: '供应商对账' },
        { page: 'purchase-payable', name: '应付款' },
        { page: 'purchase-report', name: '采购报表' },
      ]}
    ]
  },
  {
    id: 'production', name: '生产管理', icon: 'tool', groups: [
      { label: '生产管理', items: [
        { page: 'prod-plan', name: '生产计划' },
        { page: 'prod-dispatch', name: '生产派工' },
        { page: 'prod-workreport', name: '工序报工' },
        { page: 'prod-outsourcing', name: '外协加工' },
        { page: 'prod-inbound', name: '生产入库' },
        { page: 'prod-board', name: '生产看板' },
        { page: 'prod-report', name: '生产报表' },
      ]}
    ]
  },
  {
    id: 'inventory', name: '库存管理', icon: 'package', groups: [
      { label: '库存管理', items: [
        { page: 'inv-overview', name: '库存概览' },
        { page: 'inv-io', name: '出入库管理' },
        { page: 'inv-check', name: '库存盘点' },
        { page: 'inv-alert', name: '库存预警' },
        { page: 'inv-waste', name: '废料管理' },
        { page: 'inv-report', name: '库存报表' },
      ]}
    ]
  },
  {
    id: 'finance', name: '财务管理', icon: 'dollar-sign', groups: [
      { label: '财务管理', items: [
        { page: 'fin-account', name: '应收应付台账' },
        { page: 'fin-cost', name: '成本核算' },
        { page: 'fin-expense', name: '费用管理' },
        { page: 'fin-reconciliation', name: '对账管理' },
        { page: 'fin-report', name: '财务报表' },
      ]}
    ]
  },
  {
    id: 'report', name: '数据看板', icon: 'bar-chart-2', groups: [
      { label: '数据看板', items: [
        { page: 'dash-operation', name: '经营概览' },
        { page: 'dash-order', name: '订单看板' },
        { page: 'dash-inventory', name: '库存看板' },
        { page: 'dash-finance', name: '财务看板' },
        { page: 'dash-production', name: '生产看板' },
        { page: 'dash-custom', name: '自定义报表' },
      ]}
    ]
  },
  {
    id: 'system', name: '系统', icon: 'settings', groups: [
      { label: '', items: [
        { page: 'message', name: '消息通知' },
        { page: 'personal', name: '个人中心' },
      ]}
    ]
  },
];

const ICONS = {
  grid: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  'trending-up': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  'shopping-cart': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  tool: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  package: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  'dollar-sign': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  'bar-chart-2': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>',
};

// ---------- 侧边栏渲染（完整重写） ----------
function renderSidebar() {
  const sidebar = document.getElementById('sidebarNav');
  const username = currentUser ? currentUser.username : '管理员';
  const roleName = currentUser ? currentUser.roleName : '系统管理员';

  let html = `<div class="sidebar-user">
    <div class="user-avatar">${username.charAt(0).toUpperCase()}</div>
    <div class="user-info">
      <div class="user-name">${username}</div>
      <div class="user-role">${roleName}</div>
    </div>
  </div>`;

  SIDEBAR_CONFIG.forEach(mod => {
    if (mod.isSingle) {
      // 单项菜单（如系统首页）
      html += mod.render();
    } else {
      // 分组菜单
      html += `<div class="nav-group">`;
      if (mod.groups[0].label) {
        html += `<div class="nav-group-title" onclick="toggleGroup(this)">
          <span class="group-label">${mod.name}</span>
          <svg class="group-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>`;
      }
      html += `<div class="nav-group-items">`;
      mod.groups.forEach(group => {
        group.items.forEach(item => {
          html += `<div class="nav-item" data-page="${item.page}" onclick="navigate('${item.page}')">
            <span class="nav-dot"></span>
            <span>${item.name}</span>
          </div>`;
        });
      });
      html += `</div></div>`;
    }
  });

  sidebar.innerHTML = html;
  // 默认展开第一个分组（基础信息）
  const firstGroup = sidebar.querySelector('.nav-group');
  if (firstGroup) firstGroup.classList.add('expanded');
}

// ---------- 展开/折叠分组 ----------
function toggleGroup(el) {
  const group = el.parentElement;
  const isExpanded = group.classList.toggle('expanded');
  el.querySelector('.group-arrow').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)';
}

// ---------- 导航函数（处理页面级导航） ----------
function navigate(pageId) {
  // 1. 更新菜单高亮
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
    // 展开所在分组
    const group = activeItem.closest('.nav-group');
    if (group && !group.classList.contains('expanded')) {
      group.classList.add('expanded');
      const title = group.querySelector('.nav-group-title .group-arrow');
      if (title) title.style.transform = 'rotate(0deg)';
    }
  }

  // 2. 更新面包屑
  const breadcrumb = document.getElementById('topbarBreadcrumb');
  const pageName = getPageName(pageId);
  if (breadcrumb) breadcrumb.innerHTML = `<span class="crumb crumb-sep">/</span><span class="crumb current">${pageName}</span>`;

  // 3. 更新页面标题
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = pageName;

  // 3. 渲染页面
  currentPage = pageId;
  renderPage(pageId);
}

// ---------- 页面名称映射 ----------
function getPageName(pageId) {
  const names = {
    'home': '系统首页',
    'basic-customer': '客户管理', 'basic-supplier': '供应商管理', 'basic-employee': '员工管理',
    'basic-material': '物料档案', 'basic-product': '产品档案', 'basic-process': '工序库',
    'basic-outsourcing': '外协厂家', 'basic-system': '系统设置',
    'sales-quote': '销售报价', 'sales-order': '销售订单', 'sales-track': '订单跟踪',
    'sales-outbound': '销售出库', 'sales-reconciliation': '销售对账', 'sales-receivable': '应收款', 'sales-report': '销售报表',
    'purchase-apply': '采购申请', 'purchase-order': '采购单', 'purchase-inbound': '采购入库',
    'purchase-reconciliation': '供应商对账', 'purchase-payable': '应付款', 'purchase-report': '采购报表',
    'prod-plan': '生产计划', 'prod-dispatch': '生产派工', 'prod-workreport': '工序报工',
    'prod-outsourcing': '外协加工', 'prod-inbound': '生产入库', 'prod-board': '生产看板', 'prod-report': '生产报表',
    'inv-overview': '库存概览', 'inv-io': '出入库管理', 'inv-check': '库存盘点',
    'inv-alert': '库存预警', 'inv-waste': '废料管理', 'inv-report': '库存报表',
    'fin-account': '应收应付台账', 'fin-cost': '成本核算', 'fin-expense': '费用管理',
    'fin-reconciliation': '对账管理', 'fin-report': '财务报表',
    'dash-operation': '经营概览', 'dash-order': '订单看板', 'dash-inventory': '库存看板',
    'dash-finance': '财务看板', 'dash-production': '生产看板', 'dash-custom': '自定义报表',
    'message': '消息通知', 'personal': '个人中心',
  };
  return names[pageId] || pageId;
}

// ================================================================
// 所有子页面渲染函数（支撑 sidebar 导航穿透）
// ================================================================

// --- 基础信息 ---
function renderBasicCustomer() { currentModule = 'basic'; currentTab = 'customers'; renderBasic(); }
function renderBasicSupplier() { currentModule = 'basic'; currentTab = 'suppliers'; renderBasic(); }
function renderBasicEmployee() { currentModule = 'basic'; currentTab = 'employees'; renderBasic(); }
function renderBasicMaterial() { currentModule = 'basic'; currentTab = 'materials'; renderBasic(); }
function renderBasicProduct() { currentModule = 'basic'; currentTab = 'products'; renderBasic(); }
function renderBasicProcess() { currentModule = 'basic'; currentTab = 'processes'; renderBasic(); }
function renderBasicOutsource() { currentModule = 'basic'; currentTab = 'outsource'; renderBasic(); }
function renderBasicSystem() { currentModule = 'basic'; currentTab = 'settings'; renderBasic(); renderSettings(); }

// --- 销售管理 ---
function renderSalesQuote() { currentModule = 'sales'; renderSales(); switchSalesTab('quotes'); }
function renderSalesOrder() { currentModule = 'sales'; renderSales(); switchSalesTab('orders'); }
function renderSalesReconciliation() { currentModule = 'sales'; renderSales(); switchSalesTab('reconcile'); }

// --- 采购管理 ---
function renderPurchaseOrder() { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('orders'); }
function renderPurchaseReconciliation() { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('reconcile'); }

// --- 生产管理 ---
function renderProductionPlan() { currentModule = 'production'; renderProduction(); switchProductionTab('plan'); }
function renderProductionDispatch() { currentModule = 'production'; renderProduction(); switchProductionTab('dispatch'); }
function renderProductionWorkreport() { currentModule = 'production'; renderProduction(); switchProductionTab('report'); }
function renderProductionOutsource() { currentModule = 'production'; renderProduction(); switchProductionTab('outsource'); }
function renderProductionInbound() { currentModule = 'production'; renderProduction(); switchProductionTab('inbound'); }
function renderProductionKanban() { currentModule = 'production'; renderProduction(); switchProductionTab('kanban'); }
function renderProductionReport() { currentModule = 'production'; renderProduction(); switchProductionTab('report_p'); }

// --- 库存管理 ---
function renderInventoryOverview() { currentModule = 'inventory'; renderInventory(); switchInventoryTab('stock'); }
function renderInventoryIO() { currentModule = 'inventory'; renderInventory(); switchInventoryTab('inbound_i'); }
function renderInventoryCheck() { currentModule = 'inventory'; renderInventory(); switchInventoryTab('outbound_i'); }
function renderInventoryWaste() { currentModule = 'inventory'; renderInventory(); switchInventoryTab('outbound_i'); }

// --- 财务管理 ---
function renderFinAccount() { currentModule = 'finance'; renderFinance(); switchFinanceTab('income'); }
function renderFinCost() { currentModule = 'finance'; renderFinance(); switchFinanceTab('expense'); }
function renderFinExpense() { currentModule = 'finance'; renderFinance(); switchFinanceTab('expense'); }
function renderFinReconciliation() { currentModule = 'finance'; renderFinance(); switchFinanceTab('receivable'); }
function renderFinReport() { currentModule = 'finance'; renderFinance(); switchFinanceTab('report_f'); }

// --- 数据看板 ---
function renderDashOperation() { currentModule = 'report'; renderReport(); }
function renderDashOrder() { currentModule = 'report'; renderReport(); }
function renderDashInventory() { currentModule = 'report'; renderReport(); }
function renderDashFinance() { renderReport(); }
function renderDashProduction() { renderProduction(); switchProductionTab('kanban'); }
function renderDashCustom() { renderReport(); }

// --- 系统 ---
function renderMessage() {
  const pc = document.getElementById('pageContent');
  const msgs = [
    { id: 1, type: '生产', title: '订单 ORD-202604-038 已完成生产，等待发货', time: '2026-04-23 09:15', read: false },
    { id: 2, type: '采购', title: '供应商「兴华钢材」的材料已到货入库', time: '2026-04-23 08:42', read: false },
    { id: 3, type: '财务', title: '客户「振华化工」付款 ¥85,000.00 已到账', time: '2026-04-22 16:30', read: true },
    { id: 4, type: '系统', title: '库存预警：防腐漆库存低于安全库存', time: '2026-04-22 14:20', read: false },
    { id: 5, type: '销售', title: '新报价单待审核：客户「华北石化设备厂」', time: '2026-04-22 10:05', read: false },
  ];
  pc.innerHTML = `
    <div class="filter-bar">
      <div class="filter-item"><h2 class="page-title">消息通知</h2><span class="table-record-count">共 <strong>${msgs.length}</strong> 条消息</span></div>
      <div class="filter-actions"><button class="btn btn-primary" onclick="this.closest('.filter-bar').nextElementSibling.querySelectorAll('.msg-item').forEach(m=>m.classList.add('read'))">全部标记已读</button></div>
    </div>
    <div class="data-table-wrap">
      <div class="msg-list">${msgs.map(m => `
        <div class="msg-item ${m.read ? 'read' : 'unread'}">
          <div class="msg-dot ${m.read ? '' : 'active'}"></div>
          <div class="msg-content">
            <div class="msg-title">${m.title}</div>
            <div class="msg-meta"><span class="msg-type ${m.type}">${m.type}</span><span class="msg-time">${m.time}</span></div>
          </div>
          <div class="msg-action"><button class="btn btn-sm btn-gray">${m.read ? '已读' : '标为已读'}</button></div>
        </div>`).join('')}
      </div>
    </div>`;
}

function renderPersonal() {
  const pc = document.getElementById('pageContent');
  pc.innerHTML = `
    <div class="filter-bar"><div class="filter-item"><h2 class="page-title">个人中心</h2></div></div>
    <div class="data-table-wrap">
      <div class="settings-section" style="max-width:600px">
        <h3>个人信息</h3>
        <div class="form-grid">
          <div class="form-item"><label>账号</label><input type="text" value="${currentUser ? currentUser.username : 'admin'}" disabled></div>
          <div class="form-item"><label>姓名</label><input type="text" value="${currentUser ? currentUser.username : '管理员'}"></div>
          <div class="form-item"><label>角色</label><input type="text" value="${currentUser ? currentUser.roleName : '系统管理员'}" disabled></div>
          <div class="form-item"><label>手机号</label><input type="text" value="138-0000-0000"></div>
          <div class="form-item"><label>邮箱</label><input type="text" value="admin@flangemfg.com"></div>
        </div>
        <h3>安全设置</h3>
        <div class="form-grid">
          <div class="form-item"><label>当前密码</label><input type="password" placeholder="请输入当前密码"></div>
          <div class="form-item"><label>新密码</label><input type="password" placeholder="请输入新密码"></div>
          <div class="form-item"><label>确认密码</label><input type="password" placeholder="请确认新密码"></div>
        </div>
        <div class="settings-actions"><button class="btn btn-primary">保存修改</button><button class="btn btn-warning">修改密码</button></div>
        <h3>操作日志</h3>
        <table class="data-table"><thead><tr><th>时间</th><th>操作</th><th>IP</th></tr></thead><tbody>
          <tr><td>2026-04-23 14:32</td><td>登录系统</td><td>192.168.1.101</td></tr>
          <tr><td>2026-04-23 10:15</td><td>新增客户「华北石化设备厂」</td><td>192.168.1.101</td></tr>
          <tr><td>2026-04-22 16:45</td><td>审核报价单 BJ-202604-016</td><td>192.168.1.102</td></tr>
          <tr><td>2026-04-22 09:20</td><td>登录系统</td><td>192.168.1.101</td></tr>
        </tbody></table>
      </div>
    </div>`;
}

// ---------- 统一页面渲染入口 ----------
function renderPage(pageId) {
  const pc = document.getElementById('pageContent');
  // 通用加载
  if (pageId === 'home') { renderDashboard(); return; }

  // 基础信息
  if (pageId === 'basic-customer') { renderBasicCustomer(); return; }
  if (pageId === 'basic-supplier') { renderBasicSupplier(); return; }
  if (pageId === 'basic-employee') { renderBasicEmployee(); return; }
  if (pageId === 'basic-material') { renderBasicMaterial(); return; }
  if (pageId === 'basic-product') { renderBasicProduct(); return; }
  if (pageId === 'basic-process') { renderBasicProcess(); return; }
  if (pageId === 'basic-outsourcing') { renderBasicOutsource(); return; }
  if (pageId === 'basic-system') { renderBasicSystem(); return; }

  // 销售管理
  if (pageId === 'sales-quote') { renderSalesQuote(); return; }
  if (pageId === 'sales-order') { renderSalesOrder(); return; }
  if (pageId === 'sales-track') { currentModule = 'sales'; renderSales(); switchSalesTab('track'); return; }
  if (pageId === 'sales-outbound') { currentModule = 'sales'; renderSales(); switchSalesTab('outbound'); return; }
  if (pageId === 'sales-reconciliation') { currentModule = 'sales'; renderSales(); switchSalesTab('reconcile'); return; }
  if (pageId === 'sales-receivable') { currentModule = 'sales'; renderSales(); switchSalesTab('receivable'); return; }
  if (pageId === 'sales-report') { currentModule = 'sales'; renderSales(); switchSalesTab('report'); return; }

  // 采购管理
  if (pageId === 'purchase-apply') { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('apply'); return; }
  if (pageId === 'purchase-order') { renderPurchaseOrder(); return; }
  if (pageId === 'purchase-inbound') { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('inbound'); return; }
  if (pageId === 'purchase-reconciliation') { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('reconcile'); return; }
  if (pageId === 'purchase-payable') { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('payable'); return; }
  if (pageId === 'purchase-report') { currentModule = 'purchase'; renderPurchase(); switchPurchaseTab('report'); return; }

  // 生产管理
  if (pageId === 'prod-plan') { renderProductionPlan(); return; }
  if (pageId === 'prod-dispatch') { renderProductionDispatch(); return; }
  if (pageId === 'prod-workreport') { renderProductionWorkreport(); return; }
  if (pageId === 'prod-outsourcing') { renderProductionOutsource(); return; }
  if (pageId === 'prod-inbound') { renderProductionInbound(); return; }
  if (pageId === 'prod-board') { renderProductionKanban(); return; }
  if (pageId === 'prod-report') { renderProductionReport(); return; }

  // 库存管理
  if (pageId === 'inv-overview') { renderInventoryOverview(); return; }
  if (pageId === 'inv-io') { renderInventoryIO(); return; }
  if (pageId === 'inv-check') { renderInventoryCheck(); return; }
  if (pageId === 'inv-alert') { currentModule = 'inventory'; renderInventory(); switchInventoryTab('alert'); return; }
  if (pageId === 'inv-waste') { renderInventoryWaste(); return; }
  if (pageId === 'inv-report') { currentModule = 'inventory'; renderInventory(); switchInventoryTab('report_i'); return; }

  // 财务管理
  if (pageId === 'fin-account') { renderFinAccount(); return; }
  if (pageId === 'fin-cost') { renderFinCost(); return; }
  if (pageId === 'fin-expense') { renderFinExpense(); return; }
  if (pageId === 'fin-reconciliation') { renderFinReconciliation(); return; }
  if (pageId === 'fin-report') { renderFinReport(); return; }

  // 数据看板
  if (pageId === 'dash-operation') { renderDashOperation(); return; }
  if (pageId === 'dash-order') { renderDashOrder(); return; }
  if (pageId === 'dash-inventory') { renderDashInventory(); return; }
  if (pageId === 'dash-finance') { renderDashFinance(); return; }
  if (pageId === 'dash-production') { renderDashProduction(); return; }
  if (pageId === 'dash-custom') { renderDashCustom(); return; }

  // 系统
  if (pageId === 'message') { renderMessage(); return; }
  if (pageId === 'personal') { renderPersonal(); return; }

  pc.innerHTML = `<div style="padding:40px;text-align:center;color:#999;">页面 "${pageId}" 正在开发中</div>`;
}

function navigateTo(moduleId) {
  // 兼容旧调用，映射到具体页面
  const moduleHome = {
    'dashboard': 'dashboard',
    'basic': 'basic-customer',
    'sales': 'sales-quote',
    'purchase': 'purchase-apply',
    'production': 'prod-plan',
    'inventory': 'inv-overview',
    'finance': 'fin-account',
    'report': 'dash-operation',
  };
  navigate(moduleHome[moduleId] || 'home');
}

// ---------- 页面路由分发器 ----------
function renderPage(pageId) {
  const content = document.getElementById('pageContent');
  // 更新页面操作按钮
  const actionsEl = document.getElementById('pageActions');
  if (actionsEl) actionsEl.innerHTML = getPageActions(pageId);
  // 页面不存在时的兜底
  const unknown = () => { content.innerHTML = `<div style="text-align:center;padding:60px;color:var(--color-text-muted)"><h3>页面建设中...</h3></div>`; };
  const map = {
    // 首页
    'home': renderDashboard,
    'dashboard': renderDashboard,
    // 基础信息
    'basic-customer': renderBasicCustomer,
    'basic-supplier': renderBasicSupplier,
    'basic-employee': renderBasicEmployee,
    'basic-material': renderBasicMaterial,
    'basic-product': renderBasicProduct,
    'basic-process': renderBasicProcess,
    'basic-outsourcing': renderBasicOutsource,
    'basic-system': renderBasicSystem,
    // 销售
    'sales-quote': renderSalesQuote,
    'sales-order': renderSalesOrder,
    'sales-track': renderSalesTrackContent,
    'sales-outbound': renderSalesOutboundContent,
    'sales-reconciliation': renderSalesReconcileContent,
    'sales-receivable': renderSalesReceivableContent,
    'sales-report': renderSalesReportContent,
    // 采购
    'purchase-apply': renderPurchaseApplyContent,
    'purchase-order': renderPurchaseOrder,
    'purchase-inbound': renderPurchaseInboundContent,
    'purchase-reconciliation': renderPurchaseReconcileContent,
    'purchase-payable': renderPurchasePayableContent,
    'purchase-report': renderPurchaseReportContent,
    // 生产
    'prod-plan': renderProductionPlanContent,
    'prod-dispatch': renderProductionDispatchContent,
    'prod-workreport': renderProductionWorkreport,
    'prod-outsourcing': renderProductionOutsourceContent,
    'prod-inbound': renderProductionInboundContent,
    'prod-board': renderProductionKanbanContent,
    'prod-report': renderProductionReportContent,
    // 库存
    'inv-overview': renderInventoryOverview,
    'inv-io': renderInventoryIO,
    'inv-check': renderInventoryCheck,
    'inv-alert': renderInventoryAlertContent,
    'inv-waste': renderInventoryWaste,
    'inv-report': renderInventoryReportContent,
    // 财务
    'fin-account': renderFinAccount,
    'fin-cost': renderFinCost,
    'fin-expense': renderFinanceExpenseContent,
    'fin-reconciliation': renderFinReconciliation,
    'fin-report': renderFinanceReportContent,
    // 数据看板
    'dash-operation': renderDashOperation,
    'dash-order': renderDashOrder,
    'dash-inventory': renderDashInventory,
    'dash-finance': renderDashFinance,
    'dash-production': renderDashProduction,
    'dash-custom': renderDashCustom,
    // 消息与个人
    'message': renderMessage,
    'personal': renderPersonal,
  };
  const fn = map[pageId];
  if (fn) { fn(); }
  else { unknown(); }
}

// ---------- 页面操作按钮 ----------
function getPageActions(pageId) {
  const actions = {
    'home': '',
    'basic-customer': '<button class="btn btn-primary" onclick="openAddModal(\'customers\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增客户</button>',
    'basic-supplier': '<button class="btn btn-primary" onclick="openAddModal(\'suppliers\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增供应商</button>',
    'basic-employee': '<button class="btn btn-primary" onclick="openAddModal(\'employees\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增员工</button>',
    'basic-material': '<button class="btn btn-primary" onclick="openAddModal(\'materials\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增物料</button>',
    'basic-product': '<button class="btn btn-primary" onclick="openAddModal(\'products\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增产品</button>',
    'basic-process': '<button class="btn btn-primary" onclick="openAddModal(\'processes\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增工序</button>',
    'basic-outsourcing': '<button class="btn btn-primary" onclick="openAddModal(\'outsourceFactories\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增外协厂家</button>',
    'sales-quote': '<button class="btn btn-primary" onclick="openAddModal(\'salesQuotes\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建报价</button>',
    'sales-order': '<button class="btn btn-primary" onclick="openAddModal(\'salesOrders\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建订单</button>',
    'purchase-apply': '<button class="btn btn-primary" onclick="openAddModal(\'purchaseApply\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建申请</button>',
    'purchase-order': '<button class="btn btn-primary" onclick="openAddModal(\'purchaseOrders\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建采购单</button>',
    'purchase-inbound': '<button class="btn btn-primary" onclick="openAddModal(\'purchaseInbound\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建入库</button>',
    'prod-plan': '<button class="btn btn-primary" onclick="openAddModal(\'productionPlans\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建计划</button>',
    'prod-dispatch': '<button class="btn btn-primary" onclick="openAddModal(\'productionDispatches\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建派工</button>',
    'prod-workreport': '<button class="btn btn-primary" onclick="openAddModal(\'productionReports\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建报工</button>',
    'prod-outsourcing': '<button class="btn btn-primary" onclick="openAddModal(\'productionOutsource\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建外协</button>',
    'prod-inbound': '<button class="btn btn-primary" onclick="openAddModal(\'productionInbound\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建入库</button>',
    'inv-overview': '',
    'inv-io': '<button class="btn btn-primary" onclick="openAddModal(\'inventoryInbound\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新建入库</button>',
    'fin-account': '<button class="btn btn-primary" onclick="openAddModal(\'financeIncome\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增记录</button>',
    'fin-expense': '<button class="btn btn-primary" onclick="openAddModal(\'financeExpense\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增费用</button>',
  };
  return actions[pageId] || '';
}

// ---------- 模块渲染入口 ----------
function renderModule(moduleId) {
  const content = document.getElementById('pageContent');
  switch(moduleId) {
    case 'dashboard': renderDashboard(); break;
    case 'basic': renderBasic(); break;
    case 'sales': renderSales(); break;
    case 'purchase': renderPurchase(); break;
    case 'production': renderProduction(); break;
    case 'inventory': renderInventory(); break;
    case 'finance': renderFinance(); break;
    case 'report': renderReport(); break;
    default: content.innerHTML = '<div class="page-coming-soon"><h2>功能开发中</h2></div>';
  }
}

// ================================================================
// 模块1：系统首页仪表盘
// ================================================================
function renderDashboard() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="dashboard">
      <!-- 统计卡片 -->
      <div class="stat-cards">
        <div class="stat-card blue">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
          <div class="stat-info">
            <div class="stat-num">¥328.5<span>万</span></div>
            <div class="stat-label">本月销售总额</div>
            <div class="stat-trend up">↑ 12.3%</div>
          </div>
        </div>
        <div class="stat-card amber">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
          <div class="stat-info">
            <div class="stat-num">¥86.2<span>万</span></div>
            <div class="stat-label">本月采购总额</div>
            <div class="stat-trend down">↓ 3.1%</div>
          </div>
        </div>
        <div class="stat-card green">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
          <div class="stat-info">
            <div class="stat-num">156</div>
            <div class="stat-label">本月生产订单</div>
            <div class="stat-trend up">↑ 8.5%</div>
          </div>
        </div>
        <div class="stat-card red">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
          <div class="stat-info">
            <div class="stat-num">¥52.3<span>万</span></div>
            <div class="stat-label">应收账款</div>
            <div class="stat-trend warn">⚠ 超期12.5万</div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="dashboard-charts">
        <div class="chart-card">
          <div class="chart-header">
            <h3>销售趋势</h3>
            <div class="chart-legend">
              <span class="legend-item"><span class="dot blue"></span>销售额</span>
              <span class="legend-item"><span class="dot orange"></span>采购额</span>
            </div>
          </div>
          <div class="chart-body"><canvas id="salesTrendChart"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>订单状态分布</h3>
          </div>
          <div class="chart-body"><canvas id="orderStatusChart"></canvas></div>
        </div>
      </div>

      <!-- 生产进度 + 待办 -->
      <div class="dashboard-bottom">
        <div class="panel">
          <div class="panel-header">
            <h3>生产进度跟踪</h3>
            <a href="javascript:navigateTo('production')" class="panel-more">更多 →</a>
          </div>
          <div class="production-list" id="dashboardProductionList"></div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <h3>待办事项</h3>
            <span class="panel-badge" id="todoCount">5</span>
          </div>
          <div class="todo-list" id="todoList"></div>
        </div>
      </div>

      <!-- 最新动态 -->
      <div class="panel" style="margin-top:16px">
        <div class="panel-header"><h3>最新订单动态</h3></div>
        <div id="latestOrders"></div>
      </div>
    </div>`;

  // 填充生产进度
  const productions = DB.productionOrders.slice(0, 5);
  document.getElementById('dashboardProductionList').innerHTML = productions.map(p => `
    <div class="production-item" onclick="navigateTo('production'); setTimeout(()=>renderProductionOrderDetail('${p.orderId}'),300)">
      <div class="pi-top">
        <span class="pi-id">${p.orderId}</span>
        <span class="pi-status ${getStatusClass(p.status)}">${p.status}</span>
      </div>
      <div class="pi-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:${p.progress}%"></div></div>
        <span class="progress-text">${p.progress}%</span>
      </div>
      <div class="pi-meta">${p.productName} · ${p.quantity}件 · ${p.deadline}</div>
    </div>`).join('');

  // 待办事项
  const todos = [
    { text:'审核客户「华北石化设备厂」的新报价单', priority:'high' },
    { text:'跟进订单 ORD-202604-035 的生产进度', priority:'high' },
    { text:'确认供应商「兴华钢材」的材料到货时间', priority:'medium' },
    { text:'完成本月销售报表并发送给老板', priority:'medium' },
    { text:'更新法兰规格库的基础数据', priority:'low' }
  ];
  document.getElementById('todoList').innerHTML = todos.map(t => `
    <div class="todo-item ${t.priority}">
      <div class="todo-check" onclick="this.classList.toggle('checked')"></div>
      <span class="todo-text">${t.text}</span>
    </div>`).join('');

  // 最新订单
  document.getElementById('latestOrders').innerHTML = `
    <table class="data-table">
      <thead><tr><th>订单编号</th><th>客户</th><th>产品</th><th>金额</th><th>状态</th><th>创建时间</th></tr></thead>
      <tbody>${DB.salesOrders.slice(0,5).map(o => `<tr>
        <td><a href="javascript:void(0)" onclick="viewSalesOrder('${o.orderId}')">${o.orderId}</a></td>
        <td>${o.customerName}</td>
        <td>${o.productName}</td>
        <td class="money">¥${formatMoney(o.totalAmount)}</td>
        <td><span class="status-badge ${getStatusClass(o.status)}">${o.status}</span></td>
        <td>${o.createTime}</td>
      </tr>`).join('')}</tbody>
    </table>`;

  // 渲染图表
  setTimeout(() => initDashboardCharts(), 50);
}

function initDashboardCharts() {
  const labels = ['1月','2月','3月','4月','5月','6月'];
  const salesData = [210, 245, 228, 278, 295, 328];
  const purchaseData = [85, 92, 78, 88, 82, 86];

  // 销售趋势
  const stCtx = document.getElementById('salesTrendChart');
  if (stCtx) {
    if (chartInstances['st']) chartInstances['st'].destroy();
    chartInstances['st'] = new Chart(stCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label:'销售额(万)', data: salesData, borderColor:'#1a6ef5', backgroundColor:'rgba(26,110,245,0.08)', fill:true, tension:0.4, borderWidth:2, pointRadius:3 },
          { label:'采购额(万)', data: purchaseData, borderColor:'#f59e0b', backgroundColor:'rgba(245,158,11,0.08)', fill:true, tension:0.4, borderWidth:2, pointRadius:3 }
        ]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top',labels:{usePointStyle:true,pointStyle:'circle'}}}, scales:{y:{beginAtZero:false}} }
    });
  }

  // 订单状态饼图
  const osCtx = document.getElementById('orderStatusChart');
  if (osCtx) {
    if (chartInstances['os']) chartInstances['os'].destroy();
    chartInstances['os'] = new Chart(osCtx, {
      type: 'doughnut',
      data: {
        labels:['待生产','生产中','待发货','已完成','已取消'],
        datasets: [{ data:[23,45,18,89,5], backgroundColor:['#6b7280','#3b82f6','#f59e0b','#10b981','#ef4444'], borderWidth:0 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right',labels:{usePointStyle:true,pointStyle:'circle',padding:15,font:{size:12}}}} }
    });
  }
}

function initCharts() {
  // 空的，在renderDashboard里处理
}

// ================================================================
// 模块2：基础信息管理
// ================================================================
function renderBasic() {
  currentTab = 'customers';
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="module-page">
      <div class="module-tabs" id="basicTabs">
        <button class="tab-btn active" onclick="switchBasicTab('customers')">客户管理</button>
        <button class="tab-btn" onclick="switchBasicTab('suppliers')">供应商管理</button>
        <button class="tab-btn" onclick="switchBasicTab('employees')">员工管理</button>
        <button class="tab-btn" onclick="switchBasicTab('materials')">物料档案</button>
        <button class="tab-btn" onclick="switchBasicTab('products')">产品管理</button>
        <button class="tab-btn" onclick="switchBasicTab('processes')">工序管理</button>
        <button class="tab-btn" onclick="switchBasicTab('outsource')">外协厂家</button>
        <button class="tab-btn" onclick="switchBasicTab('settings')">系统设置</button>
      </div>
      <div id="tabContent"></div>
    </div>`;
  switchBasicTab('customers');
}

function switchBasicTab(tab) {
  currentTab = tab;
  document.querySelectorAll('#basicTabs .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['customers','suppliers','employees','materials','products','processes','outsource','settings'][i] === tab);
  });
  const configs = {
    customers: { title:'客户管理', fields:['customerId','customerName','contactPerson','contactPhone','customerAddress','cooperationType','remark','status'], headers:['客户编号','客户名称','联系人','联系电话','地址','合作类型','备注','状态'], data:DB.customers, addFields:[
      {name:'customerName',label:'客户名称',type:'text',required:true},
      {name:'contactPerson',label:'联系人',type:'text',required:true},
      {name:'contactPhone',label:'联系电话',type:'text',required:true},
      {name:'customerAddress',label:'地址',type:'text'},
      {name:'cooperationType',label:'合作类型',type:'select',options:['长期','临时']},
      {name:'remark',label:'备注',type:'textarea'}
    ]},
    suppliers: { title:'供应商管理', fields:['supplierId','supplierName','contactPerson','contactPhone','supplierAddress','mainSupply','cooperationType','remark','status'], headers:['供应商编号','供应商名称','联系人','联系电话','地址','主营供应','合作类型','备注','状态'], data:DB.suppliers, addFields:[
      {name:'supplierName',label:'供应商名称',type:'text',required:true},
      {name:'contactPerson',label:'联系人',type:'text',required:true},
      {name:'contactPhone',label:'联系电话',type:'text',required:true},
      {name:'supplierAddress',label:'地址',type:'text'},
      {name:'mainSupply',label:'主营供应',type:'text'},
      {name:'cooperationType',label:'合作类型',type:'select',options:['长期','临时']},
      {name:'remark',label:'备注',type:'textarea'}
    ]},
    employees: { title:'员工管理', fields:['employeeId','employeeName','gender','department','position','phone','idCard','joinDate','status'], headers:['员工编号','姓名','性别','部门','职位','手机号','身份证号','入职日期','状态'], data:DB.employees, addFields:[
      {name:'employeeName',label:'姓名',type:'text',required:true},
      {name:'gender',label:'性别',type:'select',options:['男','女']},
      {name:'department',label:'部门',type:'select',options:['生产部','销售部','采购部','财务部','行政部','技术部']},
      {name:'position',label:'职位',type:'text',required:true},
      {name:'phone',label:'手机号',type:'text',required:true},
      {name:'idCard',label:'身份证号',type:'text'},
      {name:'joinDate',label:'入职日期',type:'date',required:true}
    ]},
    materials: { title:'物料档案', fields:['materialId','materialName','spec','unit','unitPrice','supplier','category','safetyStock','remark'], headers:['物料编号','物料名称','规格','单位','单价','供应商','类别','安全库存','备注'], data:DB.materials, addFields:[
      {name:'materialName',label:'物料名称',type:'text',required:true},
      {name:'spec',label:'规格',type:'text',required:true},
      {name:'unit',label:'单位',type:'text',required:true},
      {name:'unitPrice',label:'单价',type:'number',required:true},
      {name:'supplier',label:'供应商',type:'text'},
      {name:'category',label:'类别',type:'select',options:['钢材','防腐材料','保温材料','管件','紧固件','其他']},
      {name:'safetyStock',label:'安全库存',type:'number'},
      {name:'remark',label:'备注',type:'textarea'}
    ]},
    products: { title:'产品管理', fields:['productId','productName','spec','unit','price','bom','processRoute','remark'], headers:['产品编号','产品名称','规格','单位','单价','BOM','工艺路线','备注'], data:DB.products, addFields:[
      {name:'productName',label:'产品名称',type:'text',required:true},
      {name:'spec',label:'规格',type:'text',required:true},
      {name:'unit',label:'单位',type:'text',required:true},
      {name:'price',label:'单价',type:'number',required:true},
      {name:'bom',label:'BOM（物料构成）',type:'textarea'},
      {name:'processRoute',label:'工艺路线',type:'textarea'},
      {name:'remark',label:'备注',type:'textarea'}
    ]},
    processes: { title:'工序管理', fields:['processId','processName','processNo','department','standardHours','remark'], headers:['工序编号','工序名称','工序顺序','负责部门','标准工时(h)','备注'], data:DB.processes, addFields:[
      {name:'processName',label:'工序名称',type:'text',required:true},
      {name:'processNo',label:'工序顺序',type:'number',required:true},
      {name:'department',label:'负责部门',type:'select',options:['生产部','技术部','质检部']},
      {name:'standardHours',label:'标准工时(h)',type:'number',required:true},
      {name:'remark',label:'备注',type:'textarea'}
    ]},
    outsource: { title:'外协厂家管理', fields:['factoryId','factoryName','contactPerson','contactPhone','address','capability','remark','status'], headers:['外协编号','厂家名称','联系人','联系电话','地址','加工能力','备注','状态'], data:DB.outsourceFactories, addFields:[
      {name:'factoryName',label:'厂家名称',type:'text',required:true},
      {name:'contactPerson',label:'联系人',type:'text',required:true},
      {name:'contactPhone',label:'联系电话',type:'text',required:true},
      {name:'address',label:'地址',type:'text'},
      {name:'capability',label:'加工能力',type:'textarea'},
      {name:'remark',label:'备注',type:'textarea'}
    ]},
    settings: { title:'系统设置', fields:[], headers:[], data:[], isSettings:true }
  };

  const cfg = configs[tab];
  document.getElementById('tabContent').innerHTML = renderListPage(cfg.title, cfg.fields, cfg.headers, cfg.data, tab, cfg.addFields, cfg.isSettings);
  if (cfg.isSettings) renderSettings();
}

// ================================================================
// 通用列表页面渲染
// ================================================================
function renderListPage(title, fields, headers, data, module, addFields, isSettings) {
  const keyword = searchKeyword || '';
  const filtered = keyword ? data.filter(d => fields.some(f => String(d[f]||'').includes(keyword))) : data;
  const total = filtered.length;
  const pages = Math.ceil(total / pagination.pageSize) || 1;
  const p = Math.min(Math.max(1, pagination.page), pages);
  const pageData = filtered.slice((p-1)*pagination.pageSize, p*pagination.pageSize);

  let html = `
    <div class="filter-bar">
      <div class="filter-item">
        <h2 class="page-title">${title}</h2>
        <span class="table-record-count">共 <strong>${total}</strong> 条记录</span>
      </div>
      <div class="filter-actions">
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="搜索..." value="${keyword}" onkeydown="if(event.key==='Enter')doSearch('${module}')">
          <button class="btn-icon" onclick="doSearch('${module}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
        ${!isSettings ? `<button class="btn btn-primary" onclick="openAddModal('${module}', ${JSON.stringify(addFields).replace(/"/g,'&quot;')})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          新增
        </button>` : ''}
      </div>
    </div>
    <div class="data-table-wrap">
    <table class="data-table">
      <thead><tr>${headers.map((h,i) => `<th>${h}</th>`).join('')}<th>操作</th></tr></thead>
      <tbody>`;

  if (pageData.length === 0) {
    html += `<tr><td colspan="${headers.length+1}" class="empty-cell">暂无数据</td></tr>`;
  } else {
    pageData.forEach((item, idx) => {
      html += `<tr>`;
      fields.forEach(f => {
        if (f === 'status') {
          html += `<td><span class="status-badge ${getStatusClass(item[f])}">${item[f]}</span></td>`;
        } else if (f === 'totalAmount' || f === 'amount' || f === 'price' || f === 'unitPrice') {
          html += `<td class="money">¥${formatMoney(item[f])}</td>`;
        } else {
          html += `<td>${item[f] ?? '-'}</td>`;
        }
      });
      html += `<td class="action-cell">
        <button class="btn btn-success btn-sm" onclick="viewRecord('${module}','${item[fields[0]]}')">查</button>
        <button class="btn btn-warning btn-sm" onclick="editRecord('${module}','${item[fields[0]]}')">编</button>
        <button class="btn btn-danger btn-sm" onclick="delRecord('${module}','${item[fields[0]]}')">删</button>
      </td></tr>`;
    });
  }

  html += `</tbody></table></div>`;

  // 分页
  html += `<div class="pagination">
    <span class="page-info">第 ${p} / ${pages} 页，共 ${total} 条</span>
    <div class="page-btns">
      <button class="btn btn-sm" onclick="goPage(${p-1},'${module}')" ${p<=1?'disabled':''}>上一页</button>
      ${Array.from({length:Math.min(pages,5)},(_,i)=>{
        let np = p <= 3 ? i+1 : (p >= pages-2 ? pages-4+i : p-2+i);
        if(np<1||np>pages) return '';
        return `<button class="btn btn-sm ${np===p?'btn-blue':''}" onclick="goPage(${np},'${module}')">${np}</button>`;
      }).join('')}
      <button class="btn btn-sm" onclick="goPage(${p+1},'${module}')" ${p>=pages?'disabled':''}>下一页</button>
    </div>
  </div>`;

  return html;
}

function doSearch(module) {
  searchKeyword = document.getElementById('searchInput').value;
  pagination.page = 1;
  refreshCurrentModule();
}

function goPage(page, module) {
  pagination.page = page;
  refreshCurrentModule();
}

function refreshCurrentModule() {
  if (currentModule === 'basic') switchBasicTab(currentTab);
  else if (currentModule === 'sales') switchSalesTab(currentSalesTab || 'quotes');
  else if (currentModule === 'purchase') switchPurchaseTab(currentPurchaseTab || 'apply');
  else if (currentModule === 'production') switchProductionTab(currentProductionTab || 'plan');
  else if (currentModule === 'inventory') switchInventoryTab(currentInventoryTab || 'stock');
  else if (currentModule === 'finance') switchFinanceTab(currentFinanceTab || 'income');
}

// ================================================================
// 通用增删改查操作
// ================================================================
function openAddModal(module, fields) {
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = '新增记录';
  let html = '<div class="form-grid">';
  fields.forEach(f => {
    const req = f.required ? '<span class="required">*</span>' : '';
    if (f.type === 'select') {
      html += `<div class="form-item"><label>${req}${f.label}</label><select id="field_${f.name}" ${f.required?'required':''}><option value="">请选择</option>${(f.options||[]).map(o=>`<option value="${o}">${o}</option>`).join('')}</select></div>`;
    } else if (f.type === 'textarea') {
      html += `<div class="form-item full-width"><label>${req}${f.label}</label><textarea id="field_${f.name}" rows="3" ${f.required?'required':''}></textarea></div>`;
    } else {
      html += `<div class="form-item"><label>${req}${f.label}</label><input type="${f.type||'text'}" id="field_${f.name}" ${f.required?'required':''}></div>`;
    }
  });
  html += '</div>';
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalFooter').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">取消</button>
    <button class="btn btn-primary" onclick="saveAddRecord('${module}')">保存</button>`;
  document.getElementById('modal').classList.add('show');
  document.getElementById('modalOverlay').classList.add('show');
}

function saveAddRecord(module) {
  const modal = document.getElementById('modal');
  const selects = modal.querySelectorAll('input, select, textarea');
  const newRecord = {};
  let valid = true;
  selects.forEach(el => {
    const id = el.id.replace('field_', '');
    if (!id) return;
    const req = el.hasAttribute('required') && !el.value;
    if (req) valid = false;
    newRecord[id] = el.value;
  });
  if (!valid) { alert('请填写必填项'); return; }
  // 生成ID
  const dbMap = { basic_customers:'customers', basic_suppliers:'suppliers', basic_employees:'employees', basic_materials:'materials', basic_products:'products', basic_processes:'processes', basic_outsource:'outsourceFactories' };
  const dbKey = dbMap[module] || module;
  if (DB[dbKey]) {
    const prefix = { customers:'KH', suppliers:'GY', employees:'YG', materials:'WL', products:'CP', processes:'GX', outsourceFactories:'WX' }[dbKey] || 'ID';
    const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
    newRecord[Object.keys(DB[dbKey][0])[0]] = prefix + date + String(DB[dbKey].length+1).padStart(3,'0');
    newRecord.createTime = new Date().toISOString().slice(0,19).replace('T',' ');
    newRecord.createBy = currentUser.username;
    newRecord.status = '正常';
    DB[dbKey].unshift(newRecord);
  }
  closeModal();
  alert('添加成功！');
  refreshCurrentModule();
}

function viewRecord(module, id) {
  const dbMap = { basic_customers:'customers', basic_suppliers:'suppliers', basic_employees:'employees', basic_customers:'customers', basic_suppliers:'suppliers', basic_materials:'materials', basic_products:'products', basic_processes:'processes', basic_outsource:'outsourceFactories' };
  const map2 = { sales_quotes:'salesQuotes', sales_orders:'salesOrders', sales_outbound:'salesOutbound', sales_reconcile:'salesReconcile', purchase_apply:'purchaseApply', purchase_orders:'purchaseOrders', purchase_inbound:'purchaseInbound', purchase_reconcile_p:'purchaseReconcile', production_plan:'productionPlans', production_dispatch:'productionDispatches', production_report:'productionReports', production_outsource_p:'productionOutsource', production_inbound_p:'productionInbound', inventory_stock:'inventoryStock', inventory_inbound:'inventoryInbound', inventory_outbound_i:'inventoryOutbound', finance_income:'financeIncome', finance_expense:'financeExpense', finance_receivable:'financeReceivable', finance_payable:'financePayable' };
  const dbKey = map2[module] || dbMap[module] || module;
  const data = DB[dbKey];
  if (!data) return;
  const record = data.find(d => Object.values(d).includes(id));
  if (!record) return;
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = '查看详情';
  let html = '<div class="form-grid view-mode">';
  Object.entries(record).forEach(([k, v]) => {
    if (typeof v === 'object') return;
    const label = { customerId:'客户编号', customerName:'客户名称', contactPerson:'联系人', contactPhone:'联系电话', customerAddress:'地址', cooperationType:'合作类型', remark:'备注', status:'状态', createTime:'创建时间', createBy:'创建人' }[k] || k;
    html += `<div class="form-item"><label>${label}</label><div class="view-value">${v ?? '-'}</div></div>`;
  });
  html += '</div>';
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalFooter').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal').classList.add('show');
  document.getElementById('modalOverlay').classList.add('show');
}

function editRecord(module, id) {
  const map2 = { basic_customers:'customers', basic_suppliers:'suppliers', basic_employees:'employees', basic_materials:'materials', basic_products:'products', basic_processes:'processes', basic_outsource:'outsourceFactories', sales_quotes:'salesQuotes', sales_orders:'salesOrders', sales_outbound:'salesOutbound', sales_reconcile:'salesReconcile', purchase_apply:'purchaseApply', purchase_orders:'purchaseOrders', purchase_inbound:'purchaseInbound', production_plan:'productionPlans', production_dispatch:'productionDispatches', production_report:'productionReports', production_outsource_p:'productionOutsource', production_inbound_p:'productionInbound', inventory_stock:'inventoryStock', inventory_inbound:'inventoryInbound', inventory_outbound_i:'inventoryOutbound', finance_income:'financeIncome', finance_expense:'financeExpense', finance_receivable:'financeReceivable', finance_payable:'financePayable' };
  const dbKey = map2[module] || module;
  const data = DB[dbKey];
  if (!data) return;
  const record = data.find(d => Object.values(d).includes(id));
  if (!record) return;
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = '编辑记录';
  let html = '<div class="form-grid">';
  Object.entries(record).forEach(([k, v]) => {
    if (['createTime','createBy'].includes(k)) return;
    html += `<div class="form-item"><label>${k}</label><input type="text" id="efield_${k}" value="${v??''}"></div>`;
  });
  html += '</div>';
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalFooter').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal()">取消</button>
    <button class="btn btn-primary" onclick="saveEditRecord('${module}','${id}')">保存</button>`;
  document.getElementById('modal').classList.add('show');
  document.getElementById('modalOverlay').classList.add('show');
}

function saveEditRecord(module, id) {
  const map2 = { basic_customers:'customers', basic_suppliers:'suppliers', basic_employees:'employees', basic_materials:'materials', basic_products:'products', basic_processes:'processes', basic_outsource:'outsourceFactories', sales_quotes:'salesQuotes', sales_orders:'salesOrders', sales_outbound:'salesOutbound', sales_reconcile:'salesReconcile', purchase_apply:'purchaseApply', purchase_orders:'purchaseOrders', purchase_inbound:'purchaseInbound', production_plan:'productionPlans', production_dispatch:'productionDispatches', production_report:'productionReports', production_outsource_p:'productionOutsource', production_inbound_p:'productionInbound', inventory_stock:'inventoryStock', inventory_inbound:'inventoryInbound', inventory_outbound_i:'inventoryOutbound', finance_income:'financeIncome', finance_expense:'financeExpense', finance_receivable:'financeReceivable', finance_payable:'financePayable' };
  const dbKey = map2[module] || module;
  const data = DB[dbKey];
  if (!data) return;
  const idx = data.findIndex(d => Object.values(d).includes(id));
  if (idx < 0) return;
  const inputs = document.querySelectorAll('#modalBody input');
  inputs.forEach(el => {
    const k = el.id.replace('efield_', '');
    if (k && data[idx]) data[idx][k] = el.value;
  });
  closeModal();
  alert('保存成功！');
  refreshCurrentModule();
}

function delRecord(module, id) {
  if (!confirm('确定删除此记录？')) return;
  const map2 = { basic_customers:'customers', basic_suppliers:'suppliers', basic_employees:'employees', basic_materials:'materials', basic_products:'products', basic_processes:'processes', basic_outsource:'outsourceFactories', sales_quotes:'salesQuotes', sales_orders:'salesOrders', sales_outbound:'salesOutbound', sales_reconcile:'salesReconcile', purchase_apply:'purchaseApply', purchase_orders:'purchaseOrders', purchase_inbound:'purchaseInbound', production_plan:'productionPlans', production_dispatch:'productionDispatches', production_report:'productionReports', production_outsource_p:'productionOutsource', production_inbound_p:'productionInbound', inventory_stock:'inventoryStock', inventory_inbound:'inventoryInbound', inventory_outbound_i:'inventoryOutbound', finance_income:'financeIncome', finance_expense:'financeExpense', finance_receivable:'financeReceivable', finance_payable:'financePayable' };
  const dbKey = map2[module] || module;
  if (!DB[dbKey]) return;
  const idx = DB[dbKey].findIndex(d => Object.values(d).includes(id));
  if (idx >= 0) DB[dbKey].splice(idx, 1);
  alert('删除成功！');
  refreshCurrentModule();
}

// ================================================================
// 模块3：销售管理
// ================================================================
let currentSalesTab = 'quotes';
let currentProductionTab = 'plan';
let currentInventoryTab = 'stock';
let currentFinanceTab = 'income';
function renderSales() {
  currentModule = 'sales';
  currentSalesTab = 'quotes';
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="module-page">
      <div class="module-tabs" id="salesTabs">
        <button class="tab-btn active" onclick="switchSalesTab('quotes')">报价单管理</button>
        <button class="tab-btn" onclick="switchSalesTab('orders')">销售订单</button>
        <button class="tab-btn" onclick="switchSalesTab('track')">订单状态跟踪</button>
        <button class="tab-btn" onclick="switchSalesTab('outbound')">销售出库</button>
        <button class="tab-btn" onclick="switchSalesTab('reconcile')">销售对账</button>
        <button class="tab-btn" onclick="switchSalesTab('receivable')">应收账款</button>
        <button class="tab-btn" onclick="switchSalesTab('report')">销售报表</button>
      </div>
      <div id="tabContent"></div>
    </div>`;
  switchSalesTab('quotes');
}

function switchSalesTab(tab) {
  currentSalesTab = tab;
  document.querySelectorAll('#salesTabs .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['quotes','orders','track','outbound','reconcile','receivable','report'][i] === tab);
  });
  switch (tab) {
    case 'quotes': renderSalesQuotes(); break;
    case 'orders': renderSalesOrders(); break;
    case 'track': renderSalesTrackContent(); break;
    case 'outbound': renderSalesOutboundContent(); break;
    case 'reconcile': renderSalesReconcileContent(); break;
    case 'receivable': renderSalesReceivableContent(); break;
    case 'report': renderSalesReportContent(); break;
  }
}

function renderSalesQuotes() {
  const fields = ['quoteId','customerName','productName','spec','quantity','unitPrice','totalAmount','validDate','status','createTime'];
  const headers = ['报价编号','客户','产品名称','规格','数量','单价','报价金额','有效期至','状态','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('报价单管理', fields, headers, DB.salesQuotes, 'sales_quotes', [
    {name:'customerName',label:'客户名称',type:'text',required:true},
    {name:'productName',label:'产品名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text'},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'unitPrice',label:'单价',type:'number',required:true},
    {name:'validDate',label:'有效期至',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderSalesOrders() {
  const fields = ['orderId','customerName','productName','spec','quantity','unitPrice','totalAmount','deadline','status','createTime'];
  const headers = ['订单编号','客户','产品名称','规格','数量','单价','订单金额','交货日期','状态','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('销售订单', fields, headers, DB.salesOrders, 'sales_orders', [
    {name:'customerName',label:'客户名称',type:'text',required:true},
    {name:'productName',label:'产品名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text'},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'unitPrice',label:'单价',type:'number',required:true},
    {name:'deadline',label:'交货日期',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderSalesTrackContent() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="filter-bar">
      <div class="filter-item">
        <h2 class="page-title">订单状态跟踪</h2>
      </div>
    </div>
    <div class="track-timeline" id="trackTimeline"></div>`;

  const orders = DB.salesOrders.map(o => {
    const plan = DB.productionPlans.find(p => p.orderId === o.orderId);
    return { ...o, plan };
  });

  document.getElementById('trackTimeline').innerHTML = orders.slice(0, 10).map(o => {
    const steps = [
      { label:'报价', done: true, time: o.createTime },
      { label:'订单确认', done: true, time: o.createTime },
      { label:'生产计划', done: !!o.plan, time: o.plan ? o.plan.createTime : '' },
      { label:'生产中', done: o.status==='生产中'||o.status==='待发货'||o.status==='已完成', time: '' },
      { label:'待发货', done: o.status==='待发货'||o.status==='已完成', time: '' },
      { label:'已完成', done: o.status==='已完成', time: '' }
    ];
    return `
      <div class="track-card">
        <div class="track-header">
          <span class="track-order">${o.orderId}</span>
          <span class="status-badge ${getStatusClass(o.status)}">${o.status}</span>
          <span class="track-customer">${o.customerName}</span>
          <span class="track-amount">¥${formatMoney(o.totalAmount)}</span>
        </div>
        <div class="track-steps">
          ${steps.map((s,i) => `<div class="track-step ${s.done?'done':''}">
            <div class="step-dot">${i+1}</div>
            <div class="step-label">${s.label}</div>
            ${s.time ? `<div class="step-time">${s.time.slice(0,10)}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function renderSalesOutboundContent() {
  const fields = ['outboundId','orderId','customerName','productName','quantity','outboundDate','receiver','status','remark'];
  const headers = ['出库单号','关联订单','客户','产品名称','数量','出库日期','收货人','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('销售出库', fields, headers, DB.salesOutbound, 'sales_outbound', [
    {name:'orderId',label:'关联订单',type:'text',required:true},
    {name:'customerName',label:'客户名称',type:'text',required:true},
    {name:'productName',label:'产品名称',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'outboundDate',label:'出库日期',type:'date',required:true},
    {name:'receiver',label:'收货人',type:'text'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderSalesReconcileContent() {
  const fields = ['reconcileId','customerName','period','orderIds','totalAmount','paidAmount','balanceAmount','status','createTime'];
  const headers = ['对账单号','客户','对账周期','包含订单','对账金额','已付款','应收余额','状态','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('销售对账', fields, headers, DB.salesReconcile, 'sales_reconcile', [
    {name:'customerName',label:'客户名称',type:'text',required:true},
    {name:'period',label:'对账周期',type:'text',required:true},
    {name:'orderIds',label:'包含订单',type:'textarea',required:true},
    {name:'totalAmount',label:'对账金额',type:'number',required:true},
    {name:'paidAmount',label:'已付款',type:'number'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderSalesReceivableContent() {
  const fields = ['receivableId','customerName','orderId','amount','paidAmount','balanceAmount','dueDate','overdueDays','status','remark'];
  const headers = ['应收单号','客户','订单号','应收金额','已收金额','应收余额','到期日','超期天数','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('应收账款', fields, headers, DB.financeReceivable.filter(r=>r.direction==='应收'), 'finance_receivable', []);
}

function renderSalesReportContent() {
  document.getElementById('pageContent').innerHTML = `
    <div class="filter-bar"><div class="filter-item"><h2 class="page-title">销售报表</h2></div></div>
    <div class="report-grid">
      <div class="chart-card"><div class="chart-header"><h3>月度销售额（万元）</h3></div><div class="chart-body"><canvas id="reportSalesChart"></canvas></div></div>
      <div class="chart-card"><div class="chart-header"><h3>客户销售排名</h3></div><div class="chart-body"><canvas id="reportCustomerChart"></canvas></div></div>
      <div class="chart-card full"><div class="chart-header"><h3>产品销售明细</h3></div>
        <table class="data-table"><thead><tr><th>产品名称</th><th>规格</th><th>销量</th><th>销售额</th><th>占比</th></tr></thead><tbody>
          ${DB.products.map(p => {
            const qty = Math.floor(Math.random()*50)+10;
            const amt = qty * p.price;
            return `<tr><td>${p.productName}</td><td>${p.spec}</td><td>${qty}件</td><td class="money">¥${formatMoney(amt)}</td><td>${(amt/3285000*100).toFixed(1)}%</td></tr>`;
          }).join('')}
        </tbody></table>
      </div>
    </div>`;
  setTimeout(() => {
    new Chart(document.getElementById('reportSalesChart'), {
      type:'bar',
      data:{labels:['1月','2月','3月','4月','5月','6月'],datasets:[{label:'销售额(万)',data:[210,245,228,278,295,328],backgroundColor:'rgba(26,110,245,0.7)',borderRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
    new Chart(document.getElementById('reportCustomerChart'), {
      type:'bar',
      data:{labels:DB.customers.slice(0,5).map(c=>c.customerName.slice(0,6)),datasets:[{label:'销售额(万)',data:[85,62,48,35,28],backgroundColor:['#1a6ef5','#3b82f6','#60a5fa','#93c5fd','#bfdbfe'],borderRadius:4}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
  }, 50);
}

function viewSalesOrder(orderId) {
  const order = DB.salesOrders.find(o => o.orderId === orderId);
  if (!order) return;
  viewRecord('sales_orders', orderId);
}

// ================================================================
// 模块4：采购管理
// ================================================================
let currentPurchaseTab = 'apply';
function renderPurchase() {
  currentModule = 'purchase';
  currentPurchaseTab = 'apply';
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="module-page">
      <div class="module-tabs" id="purchaseTabs">
        <button class="tab-btn active" onclick="switchPurchaseTab('apply')">采购申请</button>
        <button class="tab-btn" onclick="switchPurchaseTab('orders')">采购单</button>
        <button class="tab-btn" onclick="switchPurchaseTab('inbound')">采购入库</button>
        <button class="tab-btn" onclick="switchPurchaseTab('reconcile')">采购对账</button>
        <button class="tab-btn" onclick="switchPurchaseTab('payable')">应付账款</button>
        <button class="tab-btn" onclick="switchPurchaseTab('report')">采购报表</button>
      </div>
      <div id="tabContent"></div>
    </div>`;
  switchPurchaseTab('apply');
}

function switchPurchaseTab(tab) {
  currentPurchaseTab = tab;
  document.querySelectorAll('#purchaseTabs .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['apply','orders','inbound','reconcile','payable','report'][i] === tab);
  });
  switch (tab) {
    case 'apply': renderPurchaseApplyContent(); break;
    case 'orders': renderPurchaseOrdersContent(); break;
    case 'inbound': renderPurchaseInboundContent(); break;
    case 'reconcile': renderPurchaseReconcileContent(); break;
    case 'payable': renderPurchasePayableContent(); break;
    case 'report': renderPurchaseReportContent(); break;
  }
}

function renderPurchaseApplyContent() {
  const fields = ['applyId','materialName','spec','quantity','unit','urgency','applicant','applyDate','status','remark'];
  const headers = ['申请单号','物料名称','规格','数量','单位','紧急程度','申请人','申请日期','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('采购申请', fields, headers, DB.purchaseApply, 'purchase_apply', [
    {name:'materialName',label:'物料名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'unit',label:'单位',type:'text',required:true},
    {name:'urgency',label:'紧急程度',type:'select',options:['普通','紧急','加急'],required:true},
    {name:'applicant',label:'申请人',type:'text',required:true},
    {name:'applyDate',label:'申请日期',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderPurchaseOrdersContent() {
  const fields = ['purchaseId','supplierName','materialName','spec','quantity','unitPrice','totalAmount','deliveryDate','status','createTime'];
  const headers = ['采购单号','供应商','物料名称','规格','数量','单价','采购金额','交货日期','状态','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('采购单', fields, headers, DB.purchaseOrders, 'purchase_orders', [
    {name:'supplierName',label:'供应商',type:'text',required:true},
    {name:'materialName',label:'物料名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text'},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'unitPrice',label:'单价',type:'number',required:true},
    {name:'deliveryDate',label:'交货日期',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderPurchaseInboundContent() {
  const fields = ['inboundId','purchaseId','materialName','spec','quantity','inboundDate','inspector','qualifiedQty','status','remark'];
  const headers = ['入库单号','采购单号','物料名称','规格','数量','入库日期','质检员','合格数量','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('采购入库', fields, headers, DB.purchaseInbound, 'purchase_inbound', [
    {name:'purchaseId',label:'采购单号',type:'text',required:true},
    {name:'materialName',label:'物料名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text'},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'inboundDate',label:'入库日期',type:'date',required:true},
    {name:'inspector',label:'质检员',type:'text'},
    {name:'qualifiedQty',label:'合格数量',type:'number'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderPurchaseReconcileContent() {
  const fields = ['reconcileId','supplierName','period','orderIds','totalAmount','paidAmount','balanceAmount','status','createTime'];
  const headers = ['对账单号','供应商','对账周期','包含订单','对账金额','已付款','应付余额','状态','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('采购对账', fields, headers, DB.purchaseReconcile, 'purchase_reconcile_p', []);
}

function renderPurchasePayableContent() {
  const fields = ['payableId','supplierName','orderId','amount','paidAmount','balanceAmount','dueDate','overdueDays','status','remark'];
  const headers = ['应付单号','供应商','订单号','应付金额','已付金额','应付余额','到期日','超期天数','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('应付账款', fields, headers, DB.financePayable, 'finance_payable', []);
}

function renderPurchaseReportContent() {
  document.getElementById('pageContent').innerHTML = `
    <div class="filter-bar"><div class="filter-item"><h2 class="page-title">采购报表</h2></div></div>
    <div class="report-grid">
      <div class="chart-card"><div class="chart-header"><h3>月度采购额（万元）</h3></div><div class="chart-body"><canvas id="reportPurchaseChart"></canvas></div></div>
      <div class="chart-card"><div class="chart-header"><h3>供应商采购排名</h3></div><div class="chart-body"><canvas id="reportSupplierChart"></canvas></div></div>
      <div class="chart-card full"><div class="chart-header"><h3>物料采购明细</h3></div>
        <table class="data-table"><thead><tr><th>物料名称</th><th>规格</th><th>采购量</th><th>采购额</th><th>占比</th></tr></thead><tbody>
          ${DB.materials.slice(0,6).map(m => {
            const qty = Math.floor(Math.random()*200)+50;
            const amt = qty * m.unitPrice;
            return `<tr><td>${m.materialName}</td><td>${m.spec}</td><td>${qty}${m.unit}</td><td class="money">¥${formatMoney(amt)}</td><td>${(amt/862000*100).toFixed(1)}%</td></tr>`;
          }).join('')}
        </tbody></table>
      </div>
    </div>`;
  setTimeout(() => {
    new Chart(document.getElementById('reportPurchaseChart'), {
      type:'bar',
      data:{labels:['1月','2月','3月','4月','5月','6月'],datasets:[{label:'采购额(万)',data:[85,92,78,88,82,86],backgroundColor:'rgba(245,158,11,0.7)',borderRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
    new Chart(document.getElementById('reportSupplierChart'), {
      type:'bar',
      data:{labels:DB.suppliers.slice(0,5).map(s=>s.supplierName.slice(0,6)),datasets:[{label:'采购额(万)',data:[28,22,18,12,8],backgroundColor:['#f59e0b','#fbbf24','#fcd34d','#fde68a','#fef3c7'],borderRadius:4}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
  }, 50);
}

// ================================================================
// 模块5：生产管理
// ================================================================
function renderProduction() {
  currentProductionTab = 'plan';
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="module-page">
      <div class="module-tabs" id="productionTabs">
        <button class="tab-btn active" onclick="switchProductionTab('plan')">生产计划</button>
        <button class="tab-btn" onclick="switchProductionTab('dispatch')">生产派工</button>
        <button class="tab-btn" onclick="switchProductionTab('report')">生产报工</button>
        <button class="tab-btn" onclick="switchProductionTab('outsource')">外协管理</button>
        <button class="tab-btn" onclick="switchProductionTab('inbound')">生产入库</button>
        <button class="tab-btn" onclick="switchProductionTab('kanban')">生产看板</button>
        <button class="tab-btn" onclick="switchProductionTab('report_p')">生产报表</button>
      </div>
      <div id="tabContent"></div>
    </div>`;
  switchProductionTab('plan');
}

function switchProductionTab(tab) {
  currentProductionTab = tab;
  document.querySelectorAll('#productionTabs .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['plan','dispatch','report','outsource','inbound','kanban','report_p'][i] === tab);
  });
  switch (tab) {
    case 'plan': renderProductionPlanContent(); break;
    case 'dispatch': renderProductionDispatchContent(); break;
    case 'report': renderProductionReportContent(); break;
    case 'outsource': renderProductionOutsourceContent(); break;
    case 'inbound': renderProductionInboundContent(); break;
    case 'kanban': renderProductionKanbanContent(); break;
    case 'report_p': renderProductionReportP(); break;
  }
}

function renderProductionPlanContent() {
  const fields = ['planId','orderId','productName','spec','planQty','unit','startDate','endDate','status','progress','createTime'];
  const headers = ['计划编号','销售订单','产品名称','规格','数量','计划开始','计划结束','状态','进度','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('生产计划', fields, headers, DB.productionPlans, 'production_plan', [
    {name:'salesOrderId',label:'销售订单',type:'text',required:true},
    {name:'productName',label:'产品名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text'},
    {name:'planQty',label:'数量',type:'number',required:true},
    {name:'startDate',label:'计划开始',type:'date',required:true},
    {name:'endDate',label:'计划结束',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderProductionDispatchContent() {
  const fields = ['dispatchId','planId','productName','processName','employeeName','quantity','dispatchDate','status','remark'];
  const headers = ['派工单号','生产计划','工序','派工人','数量','派工日期','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('生产派工', fields, headers, DB.productionDispatches, 'production_dispatch', [
    {name:'planId',label:'生产计划',type:'text',required:true},
    {name:'processName',label:'工序',type:'text',required:true},
    {name:'employeeName',label:'派工人',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'dispatchDate',label:'派工日期',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderProductionReportContent() {
  const fields = ['reportId','dispatchId','processName','employeeName','qualifiedQty','rejectQty','reportDate','workingHours','status','remark'];
  const headers = ['报工单号','派工单号','工序','报工人','合格数','不合格数','报工日期','工时(h)','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('生产报工', fields, headers, DB.productionReports, 'production_report', [
    {name:'dispatchId',label:'派工单号',type:'text',required:true},
    {name:'processName',label:'工序',type:'text',required:true},
    {name:'employeeName',label:'报工人',type:'text',required:true},
    {name:'qualifiedQty',label:'合格数',type:'number',required:true},
    {name:'rejectQty',label:'不合格数',type:'number'},
    {name:'reportDate',label:'报工日期',type:'date',required:true},
    {name:'workingHours',label:'工时(h)',type:'number'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderProductionOutsourceContent() {
  const fields = ['outsourceId','salesOrderId','productName','factoryName','quantity','outsourceCost','outDate','returnDate','status','remark'];
  const headers = ['外协单号','销售订单','产品名称','外协厂家','数量','外协费用','发出日期','预计返回','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('外协管理', fields, headers, DB.productionOutsource, 'production_outsource_p', [
    {name:'salesOrderId',label:'销售订单',type:'text',required:true},
    {name:'productName',label:'产品名称',type:'text',required:true},
    {name:'factoryName',label:'外协厂家',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'outsourceCost',label:'外协费用',type:'number',required:true},
    {name:'outDate',label:'发出日期',type:'date',required:true},
    {name:'returnDate',label:'预计返回',type:'date',required:true},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderProductionInboundContent() {
  const fields = ['inboundId','planId','productName','quantity','inboundDate','inspector','qualifiedQty','status','remark'];
  const headers = ['入库单号','生产计划','产品名称','数量','入库日期','质检员','合格数量','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('生产入库', fields, headers, DB.productionInbound, 'production_inbound_p', [
    {name:'planId',label:'生产计划',type:'text',required:true},
    {name:'productName',label:'产品名称',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'inboundDate',label:'入库日期',type:'date',required:true},
    {name:'inspector',label:'质检员',type:'text'},
    {name:'qualifiedQty',label:'合格数量',type:'number'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderProductionKanbanContent() {
  const content = document.getElementById('pageContent');
  const stats = { '待生产':0, '生产中':0, '待发货':0, '已完成':0 };
  DB.productionOrders.forEach(o => { if (stats[o.status] !== undefined) stats[o.status]++; });

  // 甘特图时间轴（未来30天 + 过去10天 = 40天窗口）
  const today = new Date();
  const start = new Date(today); start.setDate(start.getDate() - 10);
  const end = new Date(today); end.setDate(end.getDate() + 30);
  const totalDays = Math.ceil((end - start) / 86400000);
  const dayWidth = 100 / totalDays;

  // 甘特图头部：日期标签
  const ganttDays = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
    const day = d.getDate();
    const month = d.getMonth()+1;
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const isToday = d.toDateString() === today.toDateString();
    ganttDays.push({ label: `${month}/${day}`, weekend: isWeekend, today: isToday });
  }

  content.innerHTML = `
    <!-- 生产看板Tab切换：看板视图 / 甘特图 -->
    <div class="kanban-viewswitch">
      <button class="view-btn active" id="viewKanban" onclick="switchKanbanView('kanban')">看板视图</button>
      <button class="view-btn" id="viewGantt" onclick="switchKanbanView('gantt')">甘特图视图</button>
    </div>

    <!-- 看板视图 -->
    <div id="kanbanView">
      <div class="kanban-board">
        ${['待生产','生产中','待发货','已完成'].map(status => `
          <div class="kanban-column">
            <div class="kanban-header ${status}">
              <span class="kanban-title">${status}</span>
              <span class="kanban-count">${stats[status]}</span>
            </div>
            <div class="kanban-cards" id="kanban_${status}"></div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 甘特图视图 -->
    <div id="ganttView" style="display:none">
      <div class="gantt-toolbar">
        <h3>生产计划甘特图</h3>
        <div class="gantt-legend">
          <span class="gantt-legend-item"><span class="gantt-bar" style="background:#3b82f6"></span>计划周期</span>
          <span class="gantt-legend-item"><span class="gantt-bar" style="background:#10b981"></span>已完成</span>
          <span class="gantt-legend-item"><span class="gantt-bar" style="background:#f59e0b"></span>进行中</span>
          <span class="gantt-legend-item"><span class="gantt-bar" style="background:#ef4444"></span>已延期</span>
        </div>
      </div>
      <div class="gantt-container">
        <!-- 时间轴头部 -->
        <div class="gantt-header">
          <div class="gantt-label-col">订单编号</div>
          <div class="gantt-label-col">产品</div>
          <div class="gantt-label-col">数量</div>
          <div class="gantt-timeline-col">
            <div class="gantt-days">${ganttDays.map(d => `<div class="gantt-day ${d.weekend?'weekend':''} ${d.today?'today':''}" style="width:${dayWidth}%">${d.label}</div>`).join('')}</div>
          </div>
        </div>
        <!-- 甘特图行 -->
        <div class="gantt-rows" id="ganttRows"></div>
      </div>
    </div>`;

  // 填充看板卡片
  ['待生产','生产中','待发货','已完成'].forEach(status => {
    const orders = DB.productionOrders.filter(o => o.status === status);
    document.getElementById(`kanban_${status}`).innerHTML = orders.map(o => `
      <div class="kanban-card" onclick="viewProductionOrderDetail('${o.orderId}')">
        <div class="kc-top">
          <span class="kc-id">${o.orderId}</span>
          <span class="kc-priority ${o.priority==='高'?'high':(o.priority==='中'?'medium':'low')}">${o.priority}优</span>
        </div>
        <div class="kc-product">${o.productName}</div>
        <div class="kc-meta">${o.spec} · ${o.quantity}件</div>
        <div class="kc-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${o.progress}%"></div></div>
          <span>${o.progress}%</span>
        </div>
        <div class="kc-footer">
          <span class="kc-deadline">📅 ${o.deadline}</span>
        </div>
      </div>`).join('') || '<div class="kanban-empty">暂无</div>';
  });

  // 填充甘特图行
  const ganttRows = document.getElementById('ganttRows');
  ganttRows.innerHTML = DB.productionPlans.map(plan => {
    const order = DB.productionOrders.find(o => o.salesOrderId === plan.orderId) || {};
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    const startOffset = Math.max(0, Math.ceil((startDate - start) / 86400000));
    const duration = Math.max(1, Math.ceil((endDate - startDate) / 86400000));
    const left = startOffset * dayWidth;
    const width = duration * dayWidth;
    const barColor = plan.status === '已完成' ? '#10b981' : (plan.status === '生产中' ? '#f59e0b' : '#3b82f6');
    return `<div class="gantt-row">
      <div class="gantt-label-col">${plan.planId}</div>
      <div class="gantt-label-col">${plan.productName.slice(0,8)}</div>
      <div class="gantt-label-col">${plan.quantity}件</div>
      <div class="gantt-timeline-col">
        <div class="gantt-row-bg">${ganttDays.map(d => `<div class="gantt-day ${d.weekend?'weekend':''}" style="width:${dayWidth}%"></div>`).join('')}</div>
        <div class="gantt-bar-wrap" style="left:${left}%;width:${width}%">
          <div class="gantt-bar" style="background:${barColor}" title="${plan.startDate} ~ ${plan.endDate}">
            <span class="gantt-bar-label">${plan.progress}%</span>
          </div>
        </div>
        <div class="gantt-today-line" style="left:${Math.ceil((today-start)/86400000)*dayWidth}%"></div>
      </div>
    </div>`;
  }).join('');
}

// ---------- 看板/甘特图切换 ----------
function switchKanbanView(view) {
  document.getElementById('kanbanView').style.display = view === 'kanban' ? 'block' : 'none';
  document.getElementById('ganttView').style.display = view === 'gantt' ? 'block' : 'none';
  document.getElementById('viewKanban').classList.toggle('active', view === 'kanban');
  document.getElementById('viewGantt').classList.toggle('active', view === 'gantt');
}

function viewProductionOrderDetail(orderId) {
  const order = DB.productionOrders.find(o => o.orderId === orderId);
  if (!order) return;
  const plan = DB.productionPlans.find(p => p.orderId === order.salesOrderId);
  const dispatches = DB.productionDispatches.filter(d => d.planId === (plan ? plan.planId : ''));

  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = '生产订单详情 - ' + orderId;
  document.getElementById('modalBody').innerHTML = `
    <div class="form-grid view-mode">
      <div class="form-item"><label>订单编号</label><div class="view-value">${order.orderId}</div></div>
      <div class="form-item"><label>销售订单</label><div class="view-value">${order.salesOrderId}</div></div>
      <div class="form-item"><label>产品名称</label><div class="view-value">${order.productName}</div></div>
      <div class="form-item"><label>规格</label><div class="view-value">${order.spec}</div></div>
      <div class="form-item"><label>数量</label><div class="view-value">${order.quantity}件</div></div>
      <div class="form-item"><label>状态</label><div class="view-value"><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></div></div>
      <div class="form-item"><label>优先级</label><div class="view-value">${order.priority}优先级</div></div>
      <div class="form-item"><label>交货日期</label><div class="view-value">${order.deadline}</div></div>
      <div class="form-item"><label>完成进度</label><div class="view-value">
        <div class="progress-bar" style="margin:4px 0"><div class="progress-fill" style="width:${order.progress}%"></div></div>
        ${order.progress}%
      </div></div>
      <div class="form-item full-width"><label>派工明细</label><div class="view-value">
        <table class="data-table"><thead><tr><th>派工单号</th><th>工序</th><th>派工人</th><th>数量</th><th>状态</th></tr></thead><tbody>
          ${dispatches.map(d => `<tr><td>${d.dispatchId}</td><td>${d.processName}</td><td>${d.employeeName}</td><td>${d.quantity}</td><td><span class="status-badge ${getStatusClass(d.status)}">${d.status}</span></td></tr>`).join('') || '<tr><td colspan="5">暂无派工记录</td></tr>'}
        </tbody></table>
      </div></div>
    </div>`;
  document.getElementById('modalFooter').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal').classList.add('show');
  document.getElementById('modalOverlay').classList.add('show');
}

function renderProductionReportP() {
  document.getElementById('pageContent').innerHTML = `
    <div class="filter-bar"><div class="filter-item"><h2 class="page-title">生产报表</h2></div></div>
    <div class="report-grid">
      <div class="chart-card"><div class="chart-header"><h3>月度产量统计</h3></div><div class="chart-body"><canvas id="prodReportChart1"></canvas></div></div>
      <div class="chart-card"><div class="chart-header"><h3>工序工时统计</h3></div><div class="chart-body"><canvas id="prodReportChart2"></canvas></div></div>
      <div class="chart-card full">
        <div class="chart-header"><h3>生产订单汇总</h3></div>
        <table class="data-table"><thead><tr><th>月份</th><th>计划数</th><th>完成数</th><th>完成率</th><th>平均工时</th></tr></thead><tbody>
          ${['1月','2月','3月','4月','5月','6月'].map((m,i) => `<tr><td>${m}</td><td>${[42,48,45,52,56,61][i]}</td><td>${[38,45,42,50,54,58][i]}</td><td>${[90.5,93.8,93.3,96.2,96.4,95.1].toFixed(1)}%</td><td>${[8.2,7.8,8.1,7.5,7.3,7.6][i]}h</td></tr>`).join('')}
        </tbody></table>
      </div>
    </div>`;
  setTimeout(() => {
    new Chart(document.getElementById('prodReportChart1'), {
      type:'bar',
      data:{labels:['1月','2月','3月','4月','5月','6月'],datasets:[{label:'计划',data:[42,48,45,52,56,61],backgroundColor:'rgba(59,130,246,0.7)',borderRadius:4},{label:'完成',data:[38,45,42,50,54,58],backgroundColor:'rgba(16,185,129,0.7)',borderRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false}
    });
    new Chart(document.getElementById('prodReportChart2'), {
      type:'bar',
      data:{labels:DB.processes.map(p=>p.processName),datasets:[{label:'标准工时',data:DB.processes.map(p=>p.standardHours),backgroundColor:'rgba(245,158,11,0.7)',borderRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false,indexAxis:'y'}
    });
  }, 50);
}

// ================================================================
// 模块6：库存管理
// ================================================================
function renderInventory() {
  currentModule = 'inventory';
  currentInventoryTab = 'stock';
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="module-page">
      <div class="module-tabs" id="inventoryTabs">
        <button class="tab-btn active" onclick="switchInventoryTab('stock')">库存查询</button>
        <button class="tab-btn" onclick="switchInventoryTab('inbound_i')">入库管理</button>
        <button class="tab-btn" onclick="switchInventoryTab('outbound_i')">出库管理</button>
        <button class="tab-btn" onclick="switchInventoryTab('alert')">库存预警</button>
        <button class="tab-btn" onclick="switchInventoryTab('report_i')">库存报表</button>
      </div>
      <div id="tabContent"></div>
    </div>`;
  switchInventoryTab('stock');
}

function switchInventoryTab(tab) {
  currentInventoryTab = tab;
  document.querySelectorAll('#inventoryTabs .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['stock','inbound_i','outbound_i','alert','report_i'][i] === tab);
  });
  switch (tab) {
    case 'stock': renderInventoryStockContent(); break;
    case 'inbound_i': renderInventoryInboundContent(); break;
    case 'outbound_i': renderInventoryOutboundContent(); break;
    case 'alert': renderInventoryAlertContent(); break;
    case 'report_i': renderInventoryReportContent(); break;
  }
}

function renderInventoryStockContent() {
  const fields = ['inventoryId','category','materialName','spec','quantity','unit','unitPrice','totalValue','location','remark'];
  const headers = ['库存编号','类别','物料名称','规格','库存数量','单位','单价','库存价值','存放位置','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('库存查询', fields, headers, DB.inventoryStock, 'inventory_stock', [
    {name:'materialName',label:'物料名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'unit',label:'单位',type:'text',required:true},
    {name:'unitPrice',label:'单价',type:'number',required:true},
    {name:'location',label:'存放位置',type:'text'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderInventoryInboundContent() {
  const fields = ['recordId','inventoryId','materialName','spec','quantity','inboundDate','sourceType','sourceNo','handler','remark'];
  const headers = ['记录编号','库存编号','物料名称','规格','数量','入库日期','来源类型','来源单号','经手人','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('入库管理', fields, headers, DB.inventoryInbound, 'inventory_inbound', [
    {name:'materialName',label:'物料名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'inboundDate',label:'入库日期',type:'date',required:true},
    {name:'sourceType',label:'来源类型',type:'select',options:['采购入库','生产入库','退货入库','其他']},
    {name:'sourceNo',label:'来源单号',type:'text'},
    {name:'handler',label:'经手人',type:'text'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderInventoryOutboundContent() {
  const fields = ['recordId','inventoryId','materialName','spec','quantity','outboundDate','targetType','targetNo','handler','remark'];
  const headers = ['记录编号','库存编号','物料名称','规格','数量','出库日期','去向类型','去向单号','经手人','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('出库管理', fields, headers, DB.inventoryOutbound, 'inventory_outbound_i', [
    {name:'materialName',label:'物料名称',type:'text',required:true},
    {name:'spec',label:'规格',type:'text',required:true},
    {name:'quantity',label:'数量',type:'number',required:true},
    {name:'outboundDate',label:'出库日期',type:'date',required:true},
    {name:'targetType',label:'去向类型',type:'select',options:['生产领料','销售出库','其他']},
    {name:'targetNo',label:'去向单号',type:'text'},
    {name:'handler',label:'经手人',type:'text'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderInventoryAlertContent() {
  const fields = ['alertId','materialName','spec','currentStock','safetyStock','alertLevel','suggestion','createTime'];
  const headers = ['预警编号','物料名称','规格','当前库存','安全库存','预警级别','处理建议','创建时间'];
  document.getElementById('tabContent').innerHTML = renderListPage('库存预警', fields, headers, DB.inventoryAlerts, 'inventory_alert', []);
}

function renderInventoryReportContent() {
  document.getElementById('pageContent').innerHTML = `
    <div class="filter-bar"><div class="filter-item"><h2 class="page-title">库存报表</h2></div></div>
    <div class="report-grid">
      <div class="chart-card"><div class="chart-header"><h3>库存价值分布</h3></div><div class="chart-body"><canvas id="invPieChart"></canvas></div></div>
      <div class="chart-card"><div class="chart-header"><h3>库龄分析</h3></div><div class="chart-body"><canvas id="invAgeChart"></canvas></div></div>
      <div class="chart-card full"><div class="chart-header"><h3>库存汇总</h3></div>
        <table class="data-table"><thead><tr><th>类别</th><th>物料数</th><th>总数量</th><th>总价值</th></tr></thead><tbody>
          ${['钢材','防腐材料','保温材料','管件','紧固件'].map(cat => {
            const items = DB.inventoryStock.filter(s=>s.category===cat);
            const qty = items.reduce((a,b)=>a+b.quantity,0);
            const val = items.reduce((a,b)=>a+b.totalValue,0);
            return `<tr><td>${cat}</td><td>${items.length}</td><td>${qty}</td><td class="money">¥${formatMoney(val)}</td></tr>`;
          }).join('')}
          <tr style="font-weight:bold"><td>合计</td><td>${DB.inventoryStock.length}</td><td>${DB.inventoryStock.reduce((a,b)=>a+b.quantity,0)}</td><td class="money">¥${formatMoney(DB.inventoryStock.reduce((a,b)=>a+b.totalValue,0))}</td></tr>
        </tbody></table>
      </div>
    </div>`;
  setTimeout(() => {
    new Chart(document.getElementById('invPieChart'), {
      type:'doughnut',
      data:{labels:['钢材','防腐材料','保温材料','管件','紧固件'],datasets:[{data:[35,20,18,15,12],backgroundColor:['#1a6ef5','#10b981','#f59e0b','#8b5cf6','#ef4444'],borderWidth:0}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{usePointStyle:true,pointStyle:'circle'}}}}
    });
    new Chart(document.getElementById('invAgeChart'), {
      type:'bar',
      data:{labels:['0-30天','31-60天','61-90天','91-180天','180天以上'],datasets:[{label:'库存金额(万)',data:[120,85,45,30,18],backgroundColor:'rgba(139,92,246,0.7)',borderRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
  }, 50);
}

// ================================================================
// 模块7：财务管理
// ================================================================
function renderFinance() {
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="module-page">
      <div class="module-tabs" id="financeTabs">
        <button class="tab-btn active" onclick="switchFinanceTab('income')">收入登记</button>
        <button class="tab-btn" onclick="switchFinanceTab('expense')">支出登记</button>
        <button class="tab-btn" onclick="switchFinanceTab('receivable')">应收账款</button>
        <button class="tab-btn" onclick="switchFinanceTab('payable')">应付账款</button>
        <button class="tab-btn" onclick="switchFinanceTab('report_f')">财务报表</button>
      </div>
      <div id="tabContent"></div>
    </div>`;
  switchFinanceTab('income');
}

function switchFinanceTab(tab) {
  currentModule = 'finance';
  currentFinanceTab = tab;
  document.querySelectorAll('#financeTabs .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', ['income','expense','receivable','payable','report_f'][i] === tab);
  });
  switch (tab) {
    case 'income': renderFinanceIncomeContent(); break;
    case 'expense': renderFinanceExpenseContent(); break;
    case 'receivable': renderFinanceReceivableContent(); break;
    case 'payable': renderFinancePayableContent(); break;
    case 'report_f': renderFinanceReportContent(); break;
  }
}

function renderFinanceIncomeContent() {
  const fields = ['recordId','direction','customerName','orderId','amount','paymentMethod','recordDate','handler','remark'];
  const headers = ['记录编号','类型','客户','订单号','金额','收款方式','收款日期','经手人','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('收入登记', fields, headers, DB.financeIncome, 'finance_income', [
    {name:'customerName',label:'客户名称',type:'text',required:true},
    {name:'orderId',label:'订单号',type:'text',required:true},
    {name:'amount',label:'金额',type:'number',required:true},
    {name:'paymentMethod',label:'收款方式',type:'select',options:['银行转账','现金','支票','其他']},
    {name:'recordDate',label:'收款日期',type:'date',required:true},
    {name:'handler',label:'经手人',type:'text'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderFinanceExpenseContent() {
  const fields = ['recordId','direction','supplierName','orderId','amount','paymentMethod','recordDate','handler','remark'];
  const headers = ['记录编号','类型','供应商','订单号','金额','付款方式','付款日期','经手人','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('支出登记', fields, headers, DB.financeExpense, 'finance_expense', [
    {name:'supplierName',label:'供应商',type:'text',required:true},
    {name:'orderId',label:'订单号',type:'text',required:true},
    {name:'amount',label:'金额',type:'number',required:true},
    {name:'paymentMethod',label:'付款方式',type:'select',options:['银行转账','现金','支票','其他']},
    {name:'recordDate',label:'付款日期',type:'date',required:true},
    {name:'handler',label:'经手人',type:'text'},
    {name:'remark',label:'备注',type:'textarea'}
  ]);
}

function renderFinanceReceivableContent() {
  const fields = ['receivableId','customerName','orderId','amount','paidAmount','balanceAmount','dueDate','overdueDays','status','remark'];
  const headers = ['应收单号','客户','订单号','应收金额','已收金额','应收余额','到期日','超期天数','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('应收账款', fields, headers, DB.financeReceivable.filter(r=>r.direction==='应收'), 'finance_receivable', []);
}

function renderFinancePayableContent() {
  const fields = ['payableId','supplierName','orderId','amount','paidAmount','balanceAmount','dueDate','overdueDays','status','remark'];
  const headers = ['应付单号','供应商','订单号','应付金额','已付金额','应付余额','到期日','超期天数','状态','备注'];
  document.getElementById('tabContent').innerHTML = renderListPage('应付账款', fields, headers, DB.financePayable, 'finance_payable', []);
}

function renderFinanceReportContent() {
  const totalIncome = DB.financeIncome.reduce((a,b)=>a+b.amount,0);
  const totalExpense = DB.financeExpense.reduce((a,b)=>a+b.amount,0);
  const netProfit = totalIncome - totalExpense;
  document.getElementById('pageContent').innerHTML = `
    <div class="filter-bar"><div class="filter-item"><h2 class="page-title">财务报表</h2></div></div>
    <div class="stat-cards" style="margin-bottom:16px">
      <div class="stat-card green"><div class="stat-info"><div class="stat-num">¥${formatMoney(totalIncome)}</div><div class="stat-label">总收入</div></div></div>
      <div class="stat-card red"><div class="stat-info"><div class="stat-num">¥${formatMoney(totalExpense)}</div><div class="stat-label">总支出</div></div></div>
      <div class="stat-card blue"><div class="stat-info"><div class="stat-num">¥${formatMoney(netProfit)}</div><div class="stat-label">净利润</div></div></div>
    </div>
    <div class="report-grid">
      <div class="chart-card"><div class="chart-header"><h3>收支趋势</h3></div><div class="chart-body"><canvas id="finTrendChart"></canvas></div></div>
      <div class="chart-card"><div class="chart-header"><h3>支出构成</h3></div><div class="chart-body"><canvas id="finPieChart"></canvas></div></div>
    </div>`;
  setTimeout(() => {
    new Chart(document.getElementById('finTrendChart'), {
      type:'line',
      data:{labels:['1月','2月','3月','4月','5月','6月'],datasets:[
        {label:'收入(万)',data:[210,245,228,278,295,328],borderColor:'#10b981',backgroundColor:'rgba(16,185,129,0.08)',fill:true,tension:0.4,borderWidth:2},
        {label:'支出(万)',data:[85,92,78,88,82,86],borderColor:'#ef4444',backgroundColor:'rgba(239,68,68,0.08)',fill:true,tension:0.4,borderWidth:2}
      ]},
      options:{responsive:true,maintainAspectRatio:false}
    });
    new Chart(document.getElementById('finPieChart'), {
      type:'doughnut',
      data:{labels:['原材料','人工','外协','物流','其他'],datasets:[{data:[55,20,12,8,5],backgroundColor:['#1a6ef5','#10b981','#f59e0b','#8b5cf6','#6b7280'],borderWidth:0}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{usePointStyle:true,pointStyle:'circle'}}}}
    });
  }, 50);
}

// ================================================================
// 模块8：数据看板（老板端）
// ================================================================
function renderReport() {
  currentModule = 'report';
  const content = document.getElementById('pageContent');
  content.innerHTML = `
    <div class="dashboard boss-dashboard">
      <div class="boss-header">
        <h2>老板数据看板</h2>
        <span class="boss-date">数据更新：${new Date().toLocaleDateString('zh-CN')}</span>
      </div>
      <div class="boss-kpis">
        <div class="kpi-card"><div class="kpi-val">¥328.5<span>万</span></div><div class="kpi-label">本月销售额</div><div class="kpi-trend up">↑12.3%</div></div>
        <div class="kpi-card"><div class="kpi-val">¥86.2<span>万</span></div><div class="kpi-label">本月采购额</div><div class="kpi-trend down">↓3.1%</div></div>
        <div class="kpi-card"><div class="kpi-val">¥242.3<span>万</span></div><div class="kpi-label">毛利润</div><div class="kpi-trend up">↑8.7%</div></div>
        <div class="kpi-card"><div class="kpi-val">¥52.3<span>万</span></div><div class="kpi-label">应收账款</div><div class="kpi-trend warn">⚠ 超期12.5万</div></div>
        <div class="kpi-card"><div class="kpi-val">¥18.6<span>万</span></div><div class="kpi-label">应付账款</div><div class="kpi-trend normal">正常</div></div>
        <div class="kpi-card"><div class="kpi-val">89.2<span>%</span></div><div class="kpi-label">订单完成率</div><div class="kpi-trend up">↑2.1%</div></div>
        <div class="kpi-card"><div class="kpi-val">7.4<span>h</span></div><div class="kpi-label">平均工时/件</div><div class="kpi-trend down">↓0.3h</div></div>
        <div class="kpi-card"><div class="kpi-val">156</div><div class="kpi-label">本月订单数</div><div class="kpi-trend up">↑8.5%</div></div>
      </div>
      <div class="boss-charts">
        <div class="chart-card"><div class="chart-header"><h3>年度销售趋势</h3></div><div class="chart-body"><canvas id="bossSalesChart"></canvas></div></div>
        <div class="chart-card"><div class="chart-header"><h3>各产品销售占比</h3></div><div class="chart-body"><canvas id="bossProductChart"></canvas></div></div>
        <div class="chart-card"><div class="chart-header"><h3>客户贡献排名 TOP10</h3></div><div class="chart-body"><canvas id="bossCustomerChart"></canvas></div></div>
        <div class="chart-card"><div class="chart-header"><h3>采购与库存对比</h3></div><div class="chart-body"><canvas id="bossInvChart"></canvas></div></div>
      </div>
    </div>`;
  setTimeout(() => {
    new Chart(document.getElementById('bossSalesChart'), {
      type:'line',
      data:{labels:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
           datasets:[{label:'2026年',data:[210,245,228,278,295,328,310,345,362,348,380,400],borderColor:'#1a6ef5',backgroundColor:'rgba(26,110,245,0.08)',fill:true,tension:0.4,borderWidth:2},
                     {label:'2025年',data:[180,195,210,225,240,258,248,268,285,278,305,320],borderColor:'#d1d5db',backgroundColor:'rgba(209,213,219,0.08)',fill:true,tension:0.4,borderWidth:2,borderDash:[5,3]}]},
      options:{responsive:true,maintainAspectRatio:false}
    });
    new Chart(document.getElementById('bossProductChart'), {
      type:'doughnut',
      data:{labels:DB.products.map(p=>p.productName),datasets:[{data:DB.products.map((_,i)=>[38,25,18,12,7][i]),backgroundColor:['#1a6ef5','#10b981','#f59e0b','#8b5cf6','#ef4444'],borderWidth:0}]},
      options:{responsive:true,maintainAspectRatio:false}
    });
    new Chart(document.getElementById('bossCustomerChart'), {
      type:'bar',
      data:{labels:['振华化工','XX市政','华北石化','东方管道','其他'].slice(0,5),datasets:[{label:'销售额(万)',data:[85,62,48,35,98.5],backgroundColor:'rgba(26,110,245,0.7)',borderRadius:4}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false}
    });
    new Chart(document.getElementById('bossInvChart'), {
      type:'bar',
      data:{labels:['钢材','防腐材料','保温材料','管件','紧固件'],datasets:[{label:'月采购额(万)',data:[28,12,10,8,6],backgroundColor:'rgba(245,158,11,0.7)',borderRadius:4},{label:'库存价值(万)',data:[120,48,36,30,24],backgroundColor:'rgba(26,110,245,0.7)',borderRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false}
    });
  }, 50);
}

// ================================================================
// 系统设置页面
// ================================================================
function renderSettings() {
  document.getElementById('pageContent').innerHTML += `
    <div class="settings-section">
      <h3>基本信息</h3>
      <div class="form-grid">
        <div class="form-item"><label>公司名称</label><input type="text" value="法兰管道防腐保温管件厂"></div>
        <div class="form-item"><label>联系电话</label><input type="text" value="024-88888888"></div>
        <div class="form-item"><label>公司地址</label><input type="text" value="辽宁省沈阳市工业开发区"></div>
      </div>
      <h3>业务参数</h3>
      <div class="form-grid">
        <div class="form-item"><label>订单编号前缀</label><input type="text" value="ORD-"></div>
        <div class="form-item"><label>库存预警比例</label><input type="text" value="20%"></div>
        <div class="form-item"><label>默认税率</label><input type="text" value="13%"></div>
      </div>
      <h3>数据管理</h3>
      <div class="settings-actions">
        <button class="btn btn-primary">导出数据</button>
        <button class="btn btn-warning">导入数据</button>
        <button class="btn btn-danger">清空日志</button>
      </div>
    </div>`;
}

// ================================================================
// 工具函数
// ================================================================
function getStatusClass(status) {
  const map = {
    '正常':'status-green','生产中':'status-blue','待发货':'status-orange','已完成':'status-green',
    '待审核':'status-gray','已审核':'status-blue','待入库':'status-orange','已入库':'status-green',
    '待派工':'status-gray','待生产':'status-orange','待付款':'status-orange','待收款':'status-orange',
    '待对账':'status-gray','已取消':'status-red','已作废':'status-red',
    '严重':'status-red','警告':'status-orange','提示':'status-blue'
  };
  return map[status] || 'status-gray';
}

function formatMoney(num) {
  if (!num && num !== 0) return '0.00';
  return Number(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.getElementById('modalOverlay').classList.remove('show');
}

// 点击模态框背景关闭
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    document.getElementById('modal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}
});

// 回车登录
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('loginPage').style.display !== 'none') {
    doLogin();
  }
});

// ---------- 顶部导航功能 ----------
function doLogout() { logout(); }

function toggleSidebar() {
  const sidebar = document.getElementById('sidebarNav');
  const overlay = document.getElementById('sidebarOverlay');
  const isMobile = window.innerWidth <= 768;
  if (sidebar) {
    if (isMobile) {
      sidebar.classList.toggle('mobile-open');
      if (overlay) overlay.classList.toggle('show');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  }
}

function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
    // 点击其他地方关闭
    document.addEventListener('click', function closeDropdown(e) {
      if (!document.getElementById('topbarUser').contains(e.target)) {
        dropdown.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
      }
    });
  }
}

// ---------- Toast 提示 ----------
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show toast-' + (type || 'info');
  setTimeout(() => { toast.classList.remove('show'); }, 2500);
}
