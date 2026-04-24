// ===========================
// 森沐工业ERP · 模拟数据
// 来源：法兰、管道防腐保温管件厂示例数据（客户真实业务场景）
// 共12个模块，约360条记录
// ===========================

const DB = {

  // ============================================================
  // 一、基础资料 — 客户管理
  // ============================================================
  customers: [
    { customerId:'KH20260423001', customerName:'XX市政工程有限公司', contactPerson:'张三', contactPhone:'13800138000', customerAddress:'XX市XX区XX路XX号', cooperationType:'长期', creditLimit:500000, paymentDays:60, status:'正常', remark:'主要采购防腐保温管道', createTime:'2026-04-23 09:30:00', createBy:'admin', orderCount:12 },
    { customerId:'KH20260423002', customerName:'XX石化设备安装公司', contactPerson:'李梅', contactPhone:'13900139001', customerAddress:'河北省石家庄市', cooperationType:'长期', creditLimit:800000, paymentDays:90, status:'正常', remark:'法兰产品长期供应商', createTime:'2026-04-23 10:00:00', createBy:'admin', orderCount:8 },
    { customerId:'KH20260301003', customerName:'XX建筑工程集团', contactPerson:'王伟', contactPhone:'13700137002', customerAddress:'山东省济南市', cooperationType:'项目制', creditLimit:300000, paymentDays:30, status:'正常', remark:'项目制合作', createTime:'2026-03-01 09:00:00', createBy:'admin', orderCount:6 },
    { customerId:'KH20260315004', customerName:'XX热力管网公司', contactPerson:'赵强', contactPhone:'13600136003', customerAddress:'天津市', cooperationType:'年度协议', creditLimit:1000000, paymentDays:120, status:'正常', remark:'年度战略客户', createTime:'2026-03-15 14:00:00', createBy:'admin', orderCount:15 },
    { customerId:'KH20260220005', customerName:'XX船舶重工', contactPerson:'钱芳', contactPhone:'13500135004', customerAddress:'辽宁省大连市', cooperationType:'长期', creditLimit:600000, paymentDays:60, status:'正常', remark:'船舶配套业务', createTime:'2026-02-20 11:00:00', createBy:'admin', orderCount:9 },
    { customerId:'KH20260110006', customerName:'XX水利工程处', contactPerson:'孙磊', contactPhone:'13400134005', customerAddress:'黑龙江省哈尔滨市', cooperationType:'项目制', creditLimit:200000, paymentDays:30, status:'暂停', remark:'项目暂停合作', createTime:'2026-01-10 09:00:00', createBy:'admin', orderCount:2 },
    { customerId:'KH20260401007', customerName:'XX化工装备有限公司', contactPerson:'周丽', contactPhone:'13300133006', customerAddress:'江苏省南京市', cooperationType:'长期', creditLimit:400000, paymentDays:45, status:'正常', remark:'化工防腐需求大', createTime:'2026-04-01 10:00:00', createBy:'admin', orderCount:5 },
    { customerId:'KH20260320008', customerName:'XX环保设备厂', contactPerson:'吴刚', contactPhone:'13200132007', customerAddress:'浙江省杭州市', cooperationType:'零星', creditLimit:100000, paymentDays:15, status:'正常', remark:'零星采购', createTime:'2026-03-20 15:00:00', createBy:'admin', orderCount:3 },
    { customerId:'KH20260201009', customerName:'XX城市管网建设', contactPerson:'郑洁', contactPhone:'13100131008', customerAddress:'广东省广州市', cooperationType:'年度协议', creditLimit:500000, paymentDays:60, status:'正常', remark:'城市管网改造项目', createTime:'2026-02-01 08:00:00', createBy:'admin', orderCount:10 },
    { customerId:'KH20260105010', customerName:'XX油田服务公司', contactPerson:'冯超', contactPhone:'13000130009', customerAddress:'新疆克拉玛依', cooperationType:'长期', creditLimit:1200000, paymentDays:180, status:'正常', remark:'大型长账期客户', createTime:'2026-01-05 09:00:00', createBy:'admin', orderCount:18 },
    { customerId:'KH20260415011', customerName:'XX核电设备采购部', contactPerson:'陈敏', contactPhone:'18900189010', customerAddress:'广东省深圳市', cooperationType:'战略合作', creditLimit:2000000, paymentDays:365, status:'正常', remark:'核电战略客户', createTime:'2026-04-15 10:00:00', createBy:'admin', orderCount:3 },
    { customerId:'KH20260310012', customerName:'XX炼化工程公司', contactPerson:'蒋波', contactPhone:'18800188011', customerAddress:'山东省青岛市', cooperationType:'项目制', creditLimit:350000, paymentDays:45, status:'正常', remark:'炼化项目合作', createTime:'2026-03-10 14:00:00', createBy:'admin', orderCount:7 },
  ],

  // ============================================================
  // 一、基础资料 — 供应商管理
  // ============================================================
  suppliers: [
    { supplierId:'GYS20260423001', supplierName:'XX钢材有限公司', contactPerson:'李四', contactPhone:'13900939000', supplierAddress:'XX市工业园区', supplyMaterial:'碳钢法兰毛坯、不锈钢法兰毛坯', cooperationStatus:'正常', paymentDays:30, remark:'供货周期3天', createTime:'2026-04-23 10:10:00', createBy:'admin' },
    { supplierId:'GYS20260423002', supplierName:'XX防腐材料厂', contactPerson:'张华', contactPhone:'13800938001', supplierAddress:'天津市滨海新区', supplyMaterial:'环氧防腐漆、聚氨酯漆', cooperationStatus:'正常', paymentDays:60, remark:'油漆品质稳定', createTime:'2026-04-23 10:10:00', createBy:'admin' },
    { supplierId:'GYS20260320003', supplierName:'XX保温建材公司', contactPerson:'刘洋', contactPhone:'13700937002', supplierAddress:'山东省青岛市', supplyMaterial:'岩棉保温管壳、聚氨酯瓦壳', cooperationStatus:'正常', paymentDays:45, remark:'保温材料供应商', createTime:'2026-03-20 09:00:00', createBy:'admin' },
    { supplierId:'GYS20260315004', supplierName:'XX特殊钢材有限公司', contactPerson:'陈磊', contactPhone:'13600936003', supplierAddress:'上海市宝山区', supplyMaterial:'合金钢法兰毛坯、双相钢毛坯', cooperationStatus:'正常', paymentDays:30, remark:'特殊材质供应', createTime:'2026-03-15 14:00:00', createBy:'admin' },
    { supplierId:'GYS20260210005', supplierName:'XX密封件厂', contactPerson:'王静', contactPhone:'13500935004', supplierAddress:'河北省沧州市', supplyMaterial:'法兰垫片、螺栓螺母', cooperationStatus:'正常', paymentDays:30, remark:'标准件供应商', createTime:'2026-02-10 10:00:00', createBy:'admin' },
    { supplierId:'GYS20260120006', supplierName:'XX钢管制造公司', contactPerson:'赵刚', contactPhone:'13400934005', supplierAddress:'天津市', supplyMaterial:'无缝钢管、螺旋焊管', cooperationStatus:'正常', paymentDays:60, remark:'管材供应稳定', createTime:'2026-01-20 09:00:00', createBy:'admin' },
    { supplierId:'GYS20260105007', supplierName:'XX铸造厂', contactPerson:'钱丽', contactPhone:'13300933006', supplierAddress:'山东省潍坊市', supplyMaterial:'铸铁法兰毛坯', cooperationStatus:'暂停', paymentDays:30, remark:'质量争议暂停', createTime:'2026-01-05 10:00:00', createBy:'admin' },
    { supplierId:'GYS20260401008', supplierName:'XX五金标准件厂', contactPerson:'孙伟', contactPhone:'13200932007', supplierAddress:'浙江省温州市', supplyMaterial:'螺栓、螺母、垫圈', cooperationStatus:'正常', paymentDays:30, remark:'标准件供应商', createTime:'2026-04-01 09:00:00', createBy:'admin' },
    { supplierId:'GYS20260301009', supplierName:'XX焊材有限公司', contactPerson:'周强', contactPhone:'13100931008', supplierAddress:'四川省成都市', supplyMaterial:'焊条、焊丝、焊剂', cooperationStatus:'正常', paymentDays:60, remark:'焊接材料', createTime:'2026-03-01 10:00:00', createBy:'admin' },
    { supplierId:'GYS20260222010', supplierName:'XX玻璃钢材料厂', contactPerson:'吴婷', contactPhone:'13000930009', supplierAddress:'江苏省南京市', supplyMaterial:'玻璃钢防护层材料', cooperationStatus:'正常', paymentDays:45, remark:'玻璃钢材料', createTime:'2026-02-22 14:00:00', createBy:'admin' },
    { supplierId:'GYS20260115011', supplierName:'XX钢材贸易有限公司', contactPerson:'郑勇', contactPhone:'18900989010', supplierAddress:'北京市朝阳区', supplyMaterial:'中厚板、型钢', cooperationStatus:'正常', paymentDays:30, remark:'钢材贸易商', createTime:'2026-01-15 09:00:00', createBy:'admin' },
    { supplierId:'GYS20260410012', supplierName:'XX检测设备公司', contactPerson:'冯丽', contactPhone:'18800988011', supplierAddress:'广东省深圳市', supplyMaterial:'超声波测厚仪、涂层测厚仪', cooperationStatus:'终止', paymentDays:0, remark:'合作关系终止', createTime:'2026-04-10 10:00:00', createBy:'admin' },
  ],

  // ============================================================
  // 一、基础资料 — 员工管理
  // ============================================================
  employees: [
    { employeeId:'YGB20260401001', employeeName:'管理员', department:'信息部', position:'系统管理员', phone:'13800000001', role:'admin', skillType:'管理', unitPrice:0, hireDate:'2026-01-01', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401002', employeeName:'王五', department:'销售部', position:'销售员', phone:'13800000002', role:'sales', skillType:'销售', unitPrice:0, hireDate:'2026-02-15', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401003', employeeName:'赵六', department:'采购部', position:'采购员', phone:'13800000003', role:'purchase', skillType:'采购', unitPrice:0, hireDate:'2026-03-01', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401004', employeeName:'孙七', department:'生产部', position:'班组长', phone:'13800000004', role:'production', skillType:'锻造', unitPrice:0.50, hireDate:'2026-01-10', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401005', employeeName:'周八', department:'生产部', position:'外协管理员', phone:'13800000005', role:'production', skillType:'外协', unitPrice:0, hireDate:'2026-02-01', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401006', employeeName:'吴九', department:'仓储部', position:'库管员', phone:'13800000006', role:'warehouse', skillType:'仓储', unitPrice:0, hireDate:'2026-03-15', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401007', employeeName:'郑十', department:'财务部', position:'财务员', phone:'13800000007', role:'finance', skillType:'财务', unitPrice:0, hireDate:'2026-01-20', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401008', employeeName:'钱十一', department:'质量部', position:'质检员', phone:'13800000008', role:'quality', skillType:'质检', unitPrice:0, hireDate:'2026-04-01', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401009', employeeName:'李十二', department:'生产部', position:'锻造工', phone:'13800000009', role:'production', skillType:'锻造', unitPrice:0.80, hireDate:'2026-01-15', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401010', employeeName:'张十三', department:'生产部', position:'焊工', phone:'13800000010', role:'production', skillType:'焊接', unitPrice:1.20, hireDate:'2026-02-10', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401011', employeeName:'刘十四', department:'生产部', position:'防腐工', phone:'13800000011', role:'production', skillType:'防腐', unitPrice:0.60, hireDate:'2026-03-01', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401012', employeeName:'陈十五', department:'生产部', position:'车间主任', phone:'13800000012', role:'production', skillType:'管理', unitPrice:0, hireDate:'2026-01-05', status:'在职', createTime:'2026-04-01 08:00:00' },
  ],

  // ============================================================
  // 二、物料管理 — 原材料（含DN口径、材质等行业字段）
  // ============================================================
  materials: [
    // 原材料 — 毛坯类（DN口径+PN压力等级+材质）
    { materialId:'FL001', materialCode:'FL001', materialName:'碳钢法兰毛坯', category:'原材料', spec:'DN100 PN16', dnSize:'DN100', pnRating:'PN16', material:'20#钢', unit:'吨', stockQty:24.2, safeQty:10, price:8500, batchManage:true, unitPrice:8500, remark:'', supplierId:'GYS20260423001' },
    { materialId:'FL002', materialCode:'FL002', materialName:'碳钢法兰毛坯', category:'原材料', spec:'DN200 PN25', dnSize:'DN200', pnRating:'PN25', material:'Q235B', unit:'吨', stockQty:8, safeQty:8, price:8200, batchManage:true, unitPrice:8200, remark:'', supplierId:'GYS20260423001' },
    { materialId:'FL003', materialCode:'FL003', materialName:'不锈钢法兰毛坯', category:'原材料', spec:'DN150 PN40', dnSize:'DN150', pnRating:'PN40', material:'304', unit:'吨', stockQty:5, safeQty:5, price:28500, batchManage:true, unitPrice:28500, remark:'', supplierId:'GYS20260423001' },
    { materialId:'FL004', materialCode:'FL004', materialName:'合金钢法兰毛坯', category:'原材料', spec:'DN250 PN64', dnSize:'DN250', pnRating:'PN64', material:'16Mn', unit:'吨', stockQty:3, safeQty:3, price:15600, batchManage:true, unitPrice:15600, remark:'', supplierId:'GYS20260315004' },
    // 原材料 — 防腐材料（批次管理）
    { materialId:'FF001', materialCode:'FF001', materialName:'环氧富锌底漆', category:'原材料', spec:'H06-4', dnSize:'-', pnRating:'-', material:'-', unit:'桶(25kg)', stockQty:50, safeQty:20, price:850, batchManage:true, unitPrice:850, remark:'', supplierId:'GYS20260423002' },
    { materialId:'FF002', materialCode:'FF002', materialName:'环氧防腐漆', category:'原材料', spec:'H52-6', dnSize:'-', pnRating:'-', material:'-', unit:'桶(20kg)', stockQty:78, safeQty:15, price:720, batchManage:true, unitPrice:720, remark:'临期预警', supplierId:'GYS20260423002' },
    { materialId:'FF003', materialCode:'FF003', materialName:'聚氨酯面漆', category:'原材料', spec:'S52-2', dnSize:'-', pnRating:'-', material:'-', unit:'桶(18kg)', stockQty:15, safeQty:15, price:680, batchManage:true, unitPrice:680, remark:'', supplierId:'GYS20260423002' },
    // 原材料 — 保温材料
    { materialId:'BW001', materialCode:'BW001', materialName:'岩棉保温管壳', category:'原材料', spec:'DN100 厚度50mm', dnSize:'DN100', pnRating:'-', material:'-', unit:'米', stockQty:200, safeQty:200, price:35, batchManage:false, unitPrice:35, remark:'', supplierId:'GYS20260320003' },
    { materialId:'BW002', materialCode:'BW002', materialName:'岩棉保温管壳', category:'原材料', spec:'DN200 厚度80mm', dnSize:'DN200', pnRating:'-', material:'-', unit:'米', stockQty:150, safeQty:150, price:58, batchManage:false, unitPrice:58, remark:'', supplierId:'GYS20260320003' },
    { materialId:'BW003', materialCode:'BW003', materialName:'聚氨酯瓦壳', category:'原材料', spec:'DN150 厚度40mm', dnSize:'DN150', pnRating:'-', material:'-', unit:'米', stockQty:180, safeQty:180, price:72, batchManage:false, unitPrice:72, remark:'', supplierId:'GYS20260320003' },
    // 原材料 — 辅材
    { materialId:'WP001', materialCode:'WP001', materialName:'法兰垫片', category:'原材料', spec:'DN100 PN16', dnSize:'DN100', pnRating:'PN16', material:'石墨', unit:'片', stockQty:500, safeQty:500, price:12, batchManage:false, unitPrice:12, remark:'', supplierId:'GYS20260210005' },
    { materialId:'WP002', materialCode:'WP002', materialName:'螺栓螺母套', category:'原材料', spec:'M20×100', dnSize:'-', pnRating:'-', material:'35CrMo', unit:'套', stockQty:1000, safeQty:1000, price:8, batchManage:false, unitPrice:8, remark:'', supplierId:'GYS20260210005' },
    // 原材料 — 管材
    { materialId:'ST001', materialCode:'ST001', materialName:'无缝钢管', category:'原材料', spec:'DN200×8mm', dnSize:'DN200', pnRating:'-', wallThickness:'8mm', material:'Q235B', unit:'米', stockQty:800, safeQty:300, price:180, batchManage:true, unitPrice:180, remark:'', supplierId:'GYS20260120006' },
    { materialId:'ST002', materialCode:'ST002', materialName:'无缝钢管', category:'原材料', spec:'DN300×10mm', dnSize:'DN300', pnRating:'-', wallThickness:'10mm', material:'Q235B', unit:'米', stockQty:200, safeQty:100, price:280, batchManage:true, unitPrice:280, remark:'', supplierId:'GYS20260120006' },
    // 原材料 — 防护层
    { materialId:'BW004', materialCode:'BW004', materialName:'铝皮防护层', category:'原材料', spec:'厚度0.5mm', dnSize:'-', pnRating:'-', material:'铝合金', unit:'米', stockQty:300, safeQty:100, price:15, batchManage:false, unitPrice:15, remark:'', supplierId:'GYS20260320003' },
    // 原材料 — 焊材
    { materialId:'FU001', materialCode:'FU001', materialName:'钢砂(除锈用)', category:'原材料', spec:'G80', dnSize:'-', pnRating:'-', material:'-', unit:'kg', stockQty:500, safeQty:100, price:3, batchManage:false, unitPrice:3, remark:'喷砂用', supplierId:'GYS20260301009' },
    { materialId:'FU002', materialCode:'FU002', materialName:'密封胶', category:'原材料', spec:'耐高温型', dnSize:'-', pnRating:'-', material:'-', unit:'kg', stockQty:50, safeQty:20, price:45, batchManage:false, unitPrice:45, remark:'', supplierId:'GYS20260423002' },
  ],

  // ============================================================
  // 二、物料管理 — 半成品（含当前工序）
  // ============================================================
  semiFinished: [
    { materialId:'SP001', materialCode:'SP001', name:'碳钢法兰-车加工完成', sourceProduct:'DN100法兰', currentProcess:'车加工', spec:'DN100 PN16', unit:'片', stockQty:350, dnSize:'DN100', pnRating:'PN16' },
    { materialId:'SP002', materialCode:'SP002', name:'碳钢法兰-钻孔完成', sourceProduct:'DN200法兰', currentProcess:'钻孔', spec:'DN200 PN25', unit:'片', stockQty:280, dnSize:'DN200', pnRating:'PN25' },
    { materialId:'SP003', materialCode:'SP003', name:'不锈钢法兰-锻造完成', sourceProduct:'DN150不锈钢法兰', currentProcess:'锻造', spec:'DN150 PN40', unit:'片', stockQty:120, dnSize:'DN150', pnRating:'PN40' },
    { materialId:'SP004', materialCode:'SP004', name:'管道-除锈完成', sourceProduct:'防腐保温管道', currentProcess:'喷砂除锈', spec:'DN200×8mm', unit:'米', stockQty:500, dnSize:'DN200', pnRating:'-' },
    { materialId:'SP005', materialCode:'SP005', name:'管道-底漆涂刷完成', sourceProduct:'防腐保温管道', currentProcess:'底漆涂刷', spec:'DN200×8mm', unit:'米', stockQty:420, dnSize:'DN200', pnRating:'-' },
    { materialId:'SP006', materialCode:'SP006', name:'管道-缠绕保温层完成', sourceProduct:'防腐保温管道', currentProcess:'缠绕保温', spec:'DN200×8mm', unit:'米', stockQty:360, dnSize:'DN200', pnRating:'-' },
    { materialId:'SP007', materialCode:'SP007', name:'合金钢法兰-热处理完成', sourceProduct:'DN250合金钢法兰', currentProcess:'热处理', spec:'DN250 PN64', unit:'片', stockQty:80, dnSize:'DN250', pnRating:'PN64' },
    { materialId:'SP008', materialCode:'SP008', name:'管道-焊口预制完成', sourceProduct:'预制管段', currentProcess:'管端坡口', spec:'DN150×6mm', unit:'根', stockQty:60, dnSize:'DN150', pnRating:'-' },
    { materialId:'SP009', materialCode:'SP009', name:'碳钢法兰-检验合格', sourceProduct:'DN100法兰', currentProcess:'终检', spec:'DN100 PN16', unit:'片', stockQty:300, dnSize:'DN100', pnRating:'PN16' },
    { materialId:'SP010', materialCode:'SP010', name:'不锈钢法兰-酸洗完成', sourceProduct:'DN150不锈钢法兰', currentProcess:'酸洗钝化', spec:'DN150 PN40', unit:'片', stockQty:100, dnSize:'DN150', pnRating:'PN40' },
  ],

  // ============================================================
  // 二、物料管理 — 成品（含防腐等级、3PE/环氧等）
  // ============================================================
  products: [
    { productId:'CP001', productCode:'CP001', productName:'碳钢法兰', category:'成品', spec:'DN100 PN16', antiCorrosionLevel:'-', material:'20#钢', unit:'片', bomVersion:'V2.1', costPrice:285, salePrice:420, dnSize:'DN100', pnRating:'PN16', remark:'' },
    { productId:'CP002', productCode:'CP002', productName:'碳钢法兰', category:'成品', spec:'DN200 PN25', antiCorrosionLevel:'-', material:'Q235B', unit:'片', bomVersion:'V1.8', costPrice:520, salePrice:750, dnSize:'DN200', pnRating:'PN25', remark:'' },
    { productId:'CP003', productCode:'CP003', productName:'不锈钢法兰', category:'成品', spec:'DN150 PN40', antiCorrosionLevel:'-', material:'304', unit:'片', bomVersion:'V3.0', costPrice:1850, salePrice:2600, dnSize:'DN150', pnRating:'PN40', remark:'' },
    { productId:'CP004', productCode:'CP004', productName:'合金钢法兰', category:'成品', spec:'DN250 PN64', antiCorrosionLevel:'-', material:'16Mn', unit:'片', bomVersion:'V2.5', costPrice:1200, salePrice:1800, dnSize:'DN250', pnRating:'PN64', remark:'' },
    { productId:'CP005', productCode:'CP005', productName:'防腐保温管道', category:'成品', spec:'DN200×8mm 3PE加强级', antiCorrosionLevel:'3PE', material:'Q235B/3PE', unit:'米', bomVersion:'V2.3', costPrice:320, salePrice:480, dnSize:'DN200', pnRating:'-', wallThickness:'8mm', remark:'3PE加强级防腐' },
    { productId:'CP006', productCode:'CP006', productName:'防腐保温管道', category:'成品', spec:'DN100×6mm 环氧涂层', antiCorrosionLevel:'环氧', material:'20#/环氧', unit:'米', bomVersion:'V2.1', costPrice:180, salePrice:260, dnSize:'DN100', pnRating:'-', wallThickness:'6mm', remark:'环氧涂层' },
    { productId:'CP007', productCode:'CP007', productName:'防腐管道', category:'成品', spec:'DN300×10mm 玻璃钢', antiCorrosionLevel:'玻璃钢', material:'Q235B/玻璃钢', unit:'米', bomVersion:'V1.5', costPrice:680, salePrice:980, dnSize:'DN300', pnRating:'-', wallThickness:'10mm', remark:'玻璃钢外护' },
    { productId:'CP008', productCode:'CP008', productName:'不锈钢法兰', category:'成品', spec:'DN250 PN64', antiCorrosionLevel:'-', material:'304L', unit:'片', bomVersion:'V3.0', costPrice:2800, salePrice:3900, dnSize:'DN250', pnRating:'PN64', remark:'' },
    { productId:'CP009', productCode:'CP009', productName:'预制保温管段', category:'成品', spec:'DN150 L=6m', antiCorrosionLevel:'聚氨酯', material:'Q235B/聚氨酯', unit:'根', bomVersion:'V1.2', costPrice:3500, salePrice:5200, dnSize:'DN150', pnRating:'-', wallThickness:'-', remark:'整根预制' },
    { productId:'CP010', productCode:'CP010', productName:'碳钢法兰-非标', category:'成品', spec:'DN350 PN16', antiCorrosionLevel:'-', material:'Q345B', unit:'片', bomVersion:'V1.0', costPrice:780, salePrice:1150, dnSize:'DN350', pnRating:'PN16', remark:'非标定制' },
  ],

  // ============================================================
  // 二、物料管理 — 批次库存（FL001碳钢法兰毛坯批次详情）
  // ============================================================
  batchInventory: [
    { batchId:'BN20260423001', materialId:'FL001', materialName:'碳钢法兰毛坯', batchNo:'BN20260423001', inboundDate:'2026-04-23', supplier:'XX钢材有限公司', inboundQty:15, currentStock:12.5, expireDate:'-', heatNo:'LH2026042001', status:'可用', unit:'吨' },
    { batchId:'BN20260420001', materialId:'FL001', materialName:'碳钢法兰毛坯', batchNo:'BN20260420001', inboundDate:'2026-04-20', supplier:'XX钢材有限公司', inboundQty:10, currentStock:3.2, expireDate:'-', heatNo:'LH2026041802', status:'可用', unit:'吨' },
    { batchId:'BN20260415001', materialId:'FL001', materialName:'碳钢法兰毛坯', batchNo:'BN20260415001', inboundDate:'2026-04-15', supplier:'XX钢材贸易', inboundQty:8, currentStock:0.5, expireDate:'-', heatNo:'LH2026041003', status:'可用', unit:'吨' },
    { batchId:'BN20260410001', materialId:'FL001', materialName:'碳钢法兰毛坯', batchNo:'BN20260410001', inboundDate:'2026-04-10', supplier:'XX钢材有限公司', inboundQty:12, currentStock:0, expireDate:'-', heatNo:'LH2026040504', status:'已用完', unit:'吨' },
    { batchId:'BN20260401001', materialId:'FL001', materialName:'碳钢法兰毛坯', batchNo:'BN20260401001', inboundDate:'2026-04-01', supplier:'XX钢材贸易', inboundQty:10, currentStock:0, expireDate:'-', heatNo:'LH2026032805', status:'已用完', unit:'吨' },
    { batchId:'BN20260320001', materialId:'FL001', materialName:'碳钢法兰毛坯', batchNo:'BN20260320001', inboundDate:'2026-03-20', supplier:'XX钢材有限公司', inboundQty:20, currentStock:8, expireDate:'-', heatNo:'LH2026031506', status:'可用', unit:'吨' },
    { batchId:'BN20260422001', materialId:'FF002', materialName:'环氧防腐漆', batchNo:'BN20260422001', inboundDate:'2026-04-22', supplier:'XX防腐材料厂', inboundQty:50, currentStock:50, expireDate:'2027-04-22', heatNo:'-', status:'可用', unit:'桶' },
    { batchId:'BN20260405001', materialId:'FF002', materialName:'环氧防腐漆', batchNo:'BN20260405001', inboundDate:'2026-04-05', supplier:'XX防腐材料厂', inboundQty:30, currentStock:25, expireDate:'2027-04-05', heatNo:'-', status:'可用', unit:'桶' },
    { batchId:'BN20251012001', materialId:'FF002', materialName:'环氧防腐漆', batchNo:'BN20251012001', inboundDate:'2025-10-12', supplier:'XX防腐材料厂', inboundQty:40, currentStock:3, expireDate:'2026-10-12', heatNo:'-', status:'临期预警', unit:'桶' },
    { batchId:'BN20260301001', materialId:'FF002', materialName:'环氧防腐漆', batchNo:'BN20260301001', inboundDate:'2026-03-01', supplier:'XX防腐材料厂', inboundQty:60, currentStock:0, expireDate:'2027-03-01', heatNo:'-', status:'已用完', unit:'桶' },
  ],

  // ============================================================
  // 三、销售管理 — 报价单
  // ============================================================
  salesQuotes: [
    { quoteId:'SQ20260420001', customerName:'XX市政工程', quoteDate:'2026-04-20', validDate:'2026-05-20', totalAmount:126000, status:'报价中', creator:'王五' },
    { quoteId:'SQ20260420002', customerName:'XX石化设备', quoteDate:'2026-04-20', validDate:'2026-05-05', totalAmount:520000, status:'已成交', creator:'王五' },
    { quoteId:'SQ20260419003', customerName:'XX热力管网', quoteDate:'2026-04-19', validDate:'2026-05-19', totalAmount:480000, status:'报价中', creator:'王五' },
    { quoteId:'SQ20260418004', customerName:'XX船舶重工', quoteDate:'2026-04-18', validDate:'2026-05-18', totalAmount:780000, status:'报价中', creator:'王五' },
    { quoteId:'SQ20260415005', customerName:'XX化工装备', quoteDate:'2026-04-15', validDate:'2026-04-30', totalAmount:185000, status:'已过期', creator:'王五' },
    { quoteId:'SQ20260414006', customerName:'XX建筑工程', quoteDate:'2026-04-14', validDate:'2026-05-14', totalAmount:320000, status:'已成交', creator:'王五' },
    { quoteId:'SQ20260412007', customerName:'XX油田服务', quoteDate:'2026-04-12', validDate:'2026-05-12', totalAmount:960000, status:'报价中', creator:'王五' },
    { quoteId:'SQ20260410008', customerName:'XX城市管网', quoteDate:'2026-04-10', validDate:'2026-05-10', totalAmount:650000, status:'已成交', creator:'王五' },
    { quoteId:'SQ20260408009', customerName:'XX环保设备', quoteDate:'2026-04-08', validDate:'2026-04-25', totalAmount:95000, status:'已过期', creator:'王五' },
    { quoteId:'SQ20260405010', customerName:'XX水利工程', quoteDate:'2026-04-05', validDate:'2026-05-05', totalAmount:180000, status:'已失效', creator:'王五' },
    { quoteId:'SQ20260422011', customerName:'XX核电设备', quoteDate:'2026-04-22', validDate:'2026-06-22', totalAmount:2850000, status:'报价中', creator:'王五' },
    { quoteId:'SQ20260422012', customerName:'XX炼化工程', quoteDate:'2026-04-22', validDate:'2026-05-22', totalAmount:430000, status:'报价中', creator:'王五' },
  ],

  // ============================================================
  // 三、销售管理 — 销售订单（含关联报价单）
  // ============================================================
  salesOrders: [
    { orderId:'SO20260420001', customerName:'XX市政工程', orderDate:'2026-04-20', deliveryDate:'2026-05-10', totalAmount:126000, status:'待审核', salesPerson:'王五', quoteRef:'SQ20260420001' },
    { orderId:'SO20260420002', customerName:'XX石化设备', orderDate:'2026-04-20', deliveryDate:'2026-06-01', totalAmount:520000, status:'生产中', salesPerson:'王五', quoteRef:'SQ20260420002' },
    { orderId:'SO20260419003', customerName:'XX热力管网', orderDate:'2026-04-19', deliveryDate:'2026-05-25', totalAmount:480000, status:'已审核', salesPerson:'王五', quoteRef:'SQ20260419003' },
    { orderId:'SO20260415004', customerName:'XX船舶重工', orderDate:'2026-04-15', deliveryDate:'2026-06-15', totalAmount:780000, status:'生产中', salesPerson:'王五', quoteRef:'SQ20260418004' },
    { orderId:'SO20260414005', customerName:'XX建筑工程', orderDate:'2026-04-14', deliveryDate:'2026-05-05', totalAmount:320000, status:'已发货', salesPerson:'王五', quoteRef:'SQ20260414006' },
    { orderId:'SO20260410003', customerName:'XX城市管网', orderDate:'2026-04-10', deliveryDate:'2026-04-21', totalAmount:650000, status:'逾期', salesPerson:'王五', quoteRef:'SQ20260410008' },
    { orderId:'SO20260408004', customerName:'XX环保设备', orderDate:'2026-04-08', deliveryDate:'2026-04-30', totalAmount:95000, status:'已完成', salesPerson:'王五', quoteRef:'SQ20260408009' },
    { orderId:'SO20260405001', customerName:'XX油田服务', orderDate:'2026-04-05', deliveryDate:'2026-07-01', totalAmount:960000, status:'生产中', salesPerson:'王五', quoteRef:'SQ20260412007' },
    { orderId:'SO20260401001', customerName:'XX化工装备', orderDate:'2026-04-01', deliveryDate:'2026-04-25', totalAmount:185000, status:'已完成', salesPerson:'王五', quoteRef:'SQ20260415005' },
    { orderId:'SO20260320001', customerName:'XX炼化工程', orderDate:'2026-03-20', deliveryDate:'2026-04-20', totalAmount:430000, status:'已关闭', salesPerson:'王五', quoteRef:'-' },
    { orderId:'SO20260421001', customerName:'XX核电设备', orderDate:'2026-04-21', deliveryDate:'2026-08-15', totalAmount:2850000, status:'已审核', salesPerson:'王五', quoteRef:'SQ20260422011' },
    { orderId:'SO20260422001', customerName:'XX水利工程', orderDate:'2026-04-22', deliveryDate:'2026-05-15', totalAmount:180000, status:'待审核', salesPerson:'王五', quoteRef:'SQ20260405010' },
  ],

  // ============================================================
  // 三、销售管理 — 出库通知单
  // ============================================================
  salesOutbound: [
    { outboundId:'SDN20260423001', orderId:'SO20260408004', customerName:'XX环保设备', outboundDate:'2026-04-23', amount:95000, status:'待出库', operator:'吴九' },
    { outboundId:'SDN20260422001', orderId:'SO20260320001', customerName:'XX炼化工程', outboundDate:'2026-04-22', amount:430000, status:'已出库', operator:'吴九' },
    { outboundId:'SDN20260420001', orderId:'SO20260401001', customerName:'XX化工装备', outboundDate:'2026-04-20', amount:185000, status:'已出库', operator:'吴九' },
    { outboundId:'SDN20260418001', orderId:'SO20260414005', customerName:'XX建筑工程', outboundDate:'2026-04-18', amount:160000, status:'已出库', operator:'吴九' },
    { outboundId:'SDN20260416001', orderId:'SO20260414005', customerName:'XX建筑工程', outboundDate:'2026-04-16', amount:160000, status:'已出库', operator:'吴九' },
    { outboundId:'SDN20260415001', orderId:'SO20260320001', customerName:'XX炼化工程', outboundDate:'2026-04-15', amount:215000, status:'已出库', operator:'吴九' },
    { outboundId:'SDN20260424001', orderId:'SO20260414005', customerName:'XX建筑工程', outboundDate:'2026-04-24', amount:0, status:'待出库', operator:'吴九', remark:'尾款已清' },
    { outboundId:'SDN20260424002', orderId:'SO20260420002', customerName:'XX石化设备', outboundDate:'2026-04-24', amount:260000, status:'待出库', operator:'吴九' },
  ],

  // ============================================================
  // 三、销售管理 — 应收款台账
  // ============================================================
  receivable: [
    { arId:'AR20260423001', customerName:'XX市政工程', orderId:'SO20260420001', totalAmount:50400, paidAmount:0, unpaidAmount:50400, dueDate:'2026-06-09', status:'未到期' },
    { arId:'AR20260420002', customerName:'XX石化设备', orderId:'SO20260420002', totalAmount:208000, paidAmount:0, unpaidAmount:208000, dueDate:'2026-07-01', status:'未到期' },
    { arId:'AR20260419003', customerName:'XX热力管网', orderId:'SO20260419003', totalAmount:192000, paidAmount:0, unpaidAmount:192000, dueDate:'2026-06-24', status:'未到期' },
    { arId:'AR20260415004', customerName:'XX船舶重工', orderId:'SO20260415004', totalAmount:312000, paidAmount:0, unpaidAmount:312000, dueDate:'2026-07-15', status:'未到期' },
    { arId:'AR20260414005', customerName:'XX建筑工程', orderId:'SO20260414005', totalAmount:320000, paidAmount:320000, unpaidAmount:0, dueDate:'2026-05-05', status:'已结清' },
    { arId:'AR20260410006', customerName:'XX城市管网', orderId:'SO20260410003', totalAmount:650000, paidAmount:200000, unpaidAmount:450000, dueDate:'2026-04-21', status:'已逾期' },
    { arId:'AR20260408007', customerName:'XX环保设备', orderId:'SO20260408004', totalAmount:95000, paidAmount:95000, unpaidAmount:0, dueDate:'2026-05-30', status:'已结清' },
    { arId:'AR20260405008', customerName:'XX油田服务', orderId:'SO20260405001', totalAmount:384000, paidAmount:100000, unpaidAmount:284000, dueDate:'2026-08-01', status:'未到期' },
    { arId:'AR20260401009', customerName:'XX化工装备', orderId:'SO20260401001', totalAmount:185000, paidAmount:185000, unpaidAmount:0, dueDate:'2026-05-25', status:'已结清' },
    { arId:'AR20260320010', customerName:'XX炼化工程', orderId:'SO20260320001', totalAmount:430000, paidAmount:430000, unpaidAmount:0, dueDate:'2026-04-20', status:'已结清' },
    { arId:'AR20260421011', customerName:'XX核电设备', orderId:'SO20260421001', totalAmount:1140000, paidAmount:300000, unpaidAmount:840000, dueDate:'2026-09-14', status:'未到期' },
    { arId:'AR20260423012', customerName:'XX水利工程', orderId:'SO20260422001', totalAmount:72000, paidAmount:0, unpaidAmount:72000, dueDate:'2026-06-14', status:'未到期' },
  ],

  // ============================================================
  // 三、销售管理 — 回款记录
  // ============================================================
  paymentRecords: [
    { paymentId:'RC20260422001', customerName:'XX建筑工程', amount:120000, paymentDate:'2026-04-22', arRef:'AR20260414005', paidAmount:120000, paymentMethod:'银行转账' },
    { paymentId:'RC20260418002', customerName:'XX建筑工程', amount:200000, paymentDate:'2026-04-18', arRef:'AR20260414005', paidAmount:200000, paymentMethod:'银行承兑' },
    { paymentId:'RC20260415003', customerName:'XX环保设备', amount:95000, paymentDate:'2026-04-15', arRef:'AR20260408007', paidAmount:95000, paymentMethod:'银行转账' },
    { paymentId:'RC20260410004', customerName:'XX化工装备', amount:185000, paymentDate:'2026-04-10', arRef:'AR20260401009', paidAmount:185000, paymentMethod:'银行转账' },
    { paymentId:'RC20260401005', customerName:'XX炼化工程', amount:430000, paymentDate:'2026-04-01', arRef:'AR20260320010', paidAmount:430000, paymentMethod:'银行转账' },
    { paymentId:'RC20260315006', customerName:'XX城市管网', amount:200000, paymentDate:'2026-03-15', arRef:'AR20260410006', paidAmount:200000, paymentMethod:'银行转账' },
    { paymentId:'RC20260420007', customerName:'XX油田服务', amount:100000, paymentDate:'2026-04-20', arRef:'AR20260405008', paidAmount:100000, paymentMethod:'电汇' },
    { paymentId:'RC20260421008', customerName:'XX核电设备', amount:300000, paymentDate:'2026-04-21', arRef:'AR20260421011', paidAmount:300000, paymentMethod:'银行转账' },
  ],

  // ============================================================
  // 四、采购管理 — 采购申请单
  // ============================================================
  purchaseApply: [
    { applyId:'PR20260423001', materialName:'FL001 碳钢毛坯', qty:20, unit:'吨', needDate:'2026-04-30', applicant:'赵六', reason:'生产计划PL20260419001备料', status:'待审核' },
    { applyId:'PR20260422002', materialName:'FF002 环氧防腐漆', qty:50, unit:'桶', needDate:'2026-05-05', applicant:'赵六', reason:'库存低于安全库存', status:'待审核' },
    { applyId:'PR20260420003', materialName:'BW001 岩棉管壳', qty:300, unit:'米', needDate:'2026-05-01', applicant:'赵六', reason:'生产计划PL20260418002备料', status:'已审核' },
    { applyId:'PR20260418004', materialName:'FL003 不锈钢毛坯', qty:8, unit:'吨', needDate:'2026-05-10', applicant:'赵六', reason:'订单SO20260421001备料', status:'已审核' },
    { applyId:'PR20260415005', materialName:'WP001 法兰垫片', qty:2000, unit:'片', needDate:'2026-04-25', applicant:'赵六', reason:'补库存', status:'已转采购' },
    { applyId:'PR20260410006', materialName:'FL002 碳钢毛坯', qty:15, unit:'吨', needDate:'2026-04-28', applicant:'赵六', reason:'订单SO20260419003备料', status:'已转采购' },
    { applyId:'PR20260405007', materialName:'FF001 环氧底漆', qty:30, unit:'桶', needDate:'2026-04-20', applicant:'赵六', reason:'常规备货', status:'已转采购' },
    { applyId:'PR20260401008', materialName:'BW003 聚氨酯瓦壳', qty:200, unit:'米', needDate:'2026-04-15', applicant:'赵六', reason:'订单SO20260401001备料', status:'已转采购' },
    { applyId:'PR20260320009', materialName:'FL004 合金钢毛坯', qty:5, unit:'吨', needDate:'2026-04-10', applicant:'赵六', reason:'订单SO20260320001备料', status:'已转采购' },
    { applyId:'PR20260423010', materialName:'FL001 碳钢毛坯', qty:10, unit:'吨', needDate:'2026-05-05', applicant:'赵六', reason:'补充安全库存', status:'待审核' },
  ],

  // ============================================================
  // 四、采购管理 — 采购订单
  // ============================================================
  purchaseOrders: [
    { purchaseId:'PO20260420001', supplierName:'XX钢材有限公司', purchaseDate:'2026-04-20', expectDate:'2026-04-27', amount:170000, status:'在途', buyer:'赵六', applyRef:'PR20260410006' },
    { purchaseId:'PO20260418002', supplierName:'XX防腐材料厂', purchaseDate:'2026-04-18', expectDate:'2026-04-25', amount:36000, status:'已到货', buyer:'赵六', applyRef:'PR20260405007' },
    { purchaseId:'PO20260415003', supplierName:'XX保温建材公司', purchaseDate:'2026-04-15', expectDate:'2026-04-22', amount:14400, status:'已到货', buyer:'赵六', applyRef:'PR20260401008' },
    { purchaseId:'PO20260410004', supplierName:'XX特殊钢材公司', purchaseDate:'2026-04-10', expectDate:'2026-04-25', amount:78000, status:'已到货', buyer:'赵六', applyRef:'PR20260320009' },
    { purchaseId:'PO20260420005', supplierName:'XX标准件厂', purchaseDate:'2026-04-20', expectDate:'2026-04-28', amount:24000, status:'在途', buyer:'赵六', applyRef:'PR20260415005' },
    { purchaseId:'PO20260422006', supplierName:'XX防腐材料厂', purchaseDate:'2026-04-22', expectDate:'2026-05-05', amount:36000, status:'待发货', buyer:'赵六', applyRef:'PR20260422002' },
    { purchaseId:'PO20260408007', supplierName:'XX密封件厂', purchaseDate:'2026-04-08', expectDate:'2026-04-18', amount:8500, status:'已到货', buyer:'赵六', applyRef:'-' },
    { purchaseId:'PO20260423008', supplierName:'XX钢材有限公司', purchaseDate:'2026-04-23', expectDate:'2026-04-30', amount:170000, status:'待确认', buyer:'赵六', applyRef:'PR20260423001' },
    { purchaseId:'PO20260421009', supplierName:'XX保温建材公司', purchaseDate:'2026-04-21', expectDate:'2026-05-01', amount:10500, status:'在途', buyer:'赵六', applyRef:'PR20260420003' },
    { purchaseId:'PO20260424010', supplierName:'XX钢管制造公司', purchaseDate:'2026-04-24', expectDate:'2026-05-10', amount:86000, status:'待确认', buyer:'赵六', applyRef:'-' },
    { purchaseId:'PO20260424011', supplierName:'XX焊材公司', purchaseDate:'2026-04-24', expectDate:'2026-05-05', amount:12500, status:'待确认', buyer:'赵六', applyRef:'-' },
    { purchaseId:'PO20260425001', supplierName:'XX钢材贸易公司', purchaseDate:'2026-04-25', expectDate:'2026-05-03', amount:82000, status:'待确认', buyer:'赵六', applyRef:'PR20260423010' },
  ],

  // ============================================================
  // 四、采购管理 — 采购入库单
  // ============================================================
  purchaseInbound: [
    { inboundId:'PI20260423001', purchaseId:'PO20260418002', supplierName:'XX防腐材料厂', inboundDate:'2026-04-23', materialName:'FF001', qty:30, unit:'桶', operator:'吴九', status:'已入库' },
    { inboundId:'PI20260422002', purchaseId:'PO20260415003', supplierName:'XX保温建材公司', inboundDate:'2026-04-22', materialName:'BW003', qty:200, unit:'米', operator:'吴九', status:'已入库' },
    { inboundId:'PI20260420003', purchaseId:'PO20260410004', supplierName:'XX特殊钢材公司', inboundDate:'2026-04-20', materialName:'FL004', qty:5, unit:'吨', operator:'吴九', status:'已入库' },
    { inboundId:'PI20260418004', purchaseId:'PO20260408007', supplierName:'XX密封件厂', inboundDate:'2026-04-18', materialName:'WP001', qty:3000, unit:'片', operator:'吴九', status:'已入库' },
    { inboundId:'PI20260415005', purchaseId:'PO20260410004', supplierName:'XX特殊钢材公司', inboundDate:'2026-04-15', materialName:'FL004', qty:0.3, unit:'吨', operator:'吴九', status:'退货', remark:'质量不合格' },
    { inboundId:'PI20260423006', purchaseId:'PO20260420001', supplierName:'XX钢材有限公司', inboundDate:'2026-04-23', materialName:'FL002', qty:8, unit:'吨', operator:'吴九', status:'已入库' },
    { inboundId:'PI20260426001', purchaseId:'PO20260420001', supplierName:'XX钢材有限公司', inboundDate:'2026-04-26', materialName:'FL002', qty:7, unit:'吨', operator:'吴九', status:'预期到货' },
    { inboundId:'PI20260428001', purchaseId:'PO20260420005', supplierName:'XX标准件厂', inboundDate:'2026-04-28', materialName:'WP002', qty:1500, unit:'套', operator:'吴九', status:'预期到货' },
    { inboundId:'PI20260423007', purchaseId:'PO20260423008', supplierName:'XX钢材有限公司', inboundDate:'2026-04-23', materialName:'FL001', qty:10, unit:'吨', operator:'吴九', status:'预期到货' },
  ],

  // ============================================================
  // 五、生产管理 — BOM（CP005防腐保温管道DN200 3PE）
  // ============================================================
  bomList: [
    { bomId:'BOM005-01', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:1, materialId:'FL002', materialName:'碳钢法兰毛坯DN200', qty:2, unit:'片', processNo:'OP10', lossRate:0.5 },
    { bomId:'BOM005-02', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:2, materialId:'ST001', materialName:'无缝钢管DN200×8mm', qty:1, unit:'米', processNo:'OP10', lossRate:1 },
    { bomId:'BOM005-03', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:3, materialId:'FF001', materialName:'环氧富锌底漆', qty:0.5, unit:'kg', processNo:'OP30', lossRate:10 },
    { bomId:'BOM005-04', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:4, materialId:'FF002', materialName:'环氧防腐漆', qty:0.8, unit:'kg', processNo:'OP40', lossRate:8 },
    { bomId:'BOM005-05', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:5, materialId:'BW001', materialName:'岩棉保温管壳', qty:1.05, unit:'米', processNo:'OP50', lossRate:5 },
    { bomId:'BOM005-06', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:6, materialId:'BW004', materialName:'铝皮防护层', qty:1.02, unit:'米', processNo:'OP60', lossRate:2 },
    { bomId:'BOM005-07', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:7, materialId:'FU001', materialName:'钢砂(除锈用)', qty:3, unit:'kg', processNo:'OP20', lossRate:15 },
    { bomId:'BOM005-08', productId:'CP005', productName:'CP005 防腐保温管道DN200', seq:8, materialId:'FU002', materialName:'密封胶', qty:0.05, unit:'kg', processNo:'OP70', lossRate:5 },
  ],

  // ============================================================
  // 五、生产管理 — 工艺路线（CP005防腐保温管道）
  // ============================================================
  processRoutes: [
    { seq:1, processNo:'OP10', processName:'管材/法兰检验', workCenter:'来料检验区', stdHours:5, isKey:true, canOutsource:false, prevProcess:'-' },
    { seq:2, processNo:'OP20', processName:'喷砂除锈', workCenter:'除锈车间', stdHours:15, isKey:true, canOutsource:true, prevProcess:'OP10' },
    { seq:3, processNo:'OP30', processName:'底漆涂刷', workCenter:'防腐车间', stdHours:8, isKey:true, canOutsource:false, prevProcess:'OP20' },
    { seq:4, processNo:'OP40', processName:'防腐层涂刷(2遍)', workCenter:'防腐车间', stdHours:20, isKey:true, canOutsource:false, prevProcess:'OP30' },
    { seq:5, processNo:'OP50', processName:'保温层缠绕', workCenter:'保温车间', stdHours:12, isKey:false, canOutsource:true, prevProcess:'OP40' },
    { seq:6, processNo:'OP60', processName:'防护层安装', workCenter:'保温车间', stdHours:10, isKey:false, canOutsource:false, prevProcess:'OP50' },
    { seq:7, processNo:'OP70', processName:'端部密封处理', workCenter:'保温车间', stdHours:5, isKey:false, canOutsource:false, prevProcess:'OP60' },
    { seq:8, processNo:'OP80', processName:'终检与水压试验', workCenter:'检验区', stdHours:10, isKey:true, canOutsource:false, prevProcess:'OP70' },
  ],

  // ============================================================
  // 五、生产管理 — 生产计划
  // ============================================================
  productionPlans: [
    { planId:'PL20260419001', orderId:'SO20260420001', productName:'CP005 防腐保温管道DN200', qty:300, unit:'米', startDate:'2026-04-21', endDate:'2026-05-08', status:'已确认', progress:45 },
    { planId:'PL20260418002', orderId:'SO20260420002', productName:'CP005 防腐保温管道DN200', qty:1200, unit:'米', startDate:'2026-04-20', endDate:'2026-05-25', status:'执行中', progress:28 },
    { planId:'PL20260420003', orderId:'SO20260419003', productName:'CP006 防腐保温管道DN100', qty:2000, unit:'米', startDate:'2026-04-22', endDate:'2026-05-20', status:'已派工', progress:15 },
    { planId:'PL20260415004', orderId:'SO20260415004', productName:'CP003 不锈钢法兰DN150', qty:500, unit:'片', startDate:'2026-04-17', endDate:'2026-05-30', status:'执行中', progress:55 },
    { planId:'PL20260414005', orderId:'SO20260414005', productName:'CP001 碳钢法兰DN100', qty:800, unit:'片', startDate:'2026-04-15', endDate:'2026-04-25', status:'已完工', progress:100 },
    { planId:'PL20260410006', orderId:'SO20260410003', productName:'CP005 防腐保温管道DN200', qty:1500, unit:'米', startDate:'2026-04-12', endDate:'2026-04-30', status:'已完工', progress:100 },
    { planId:'PL20260405007', orderId:'SO20260405001', productName:'CP004 合金钢法兰DN250', qty:600, unit:'片', startDate:'2026-04-08', endDate:'2026-06-15', status:'执行中', progress:38 },
    { planId:'PL20260421008', orderId:'SO20260421001', productName:'CP003 不锈钢法兰DN150', qty:1200, unit:'片', startDate:'2026-04-25', endDate:'2026-07-20', status:'待确认', progress:0 },
    { planId:'PL20260422009', orderId:'SO20260422001', productName:'CP001 碳钢法兰DN100', qty:600, unit:'片', startDate:'2026-04-24', endDate:'2026-05-10', status:'待确认', progress:5 },
    { planId:'PL20260401010', orderId:'SO20260401001', productName:'CP006 防腐保温管道DN100', qty:1200, unit:'米', startDate:'2026-04-02', endDate:'2026-04-18', status:'已完工', progress:100 },
  ],

  // ============================================================
  // 五、生产管理 — 派工单
  // ============================================================
  productionDispatches: [
    { dispatchId:'DP20260423001', planId:'PL20260418002', process:'OP20 喷砂除锈', workCenter:'除锈车间', qty:200, unit:'米', leader:'孙七', dispatchDate:'2026-04-23', status:'执行中' },
    { dispatchId:'DP20260423002', planId:'PL20260418002', process:'OP40 防腐涂刷', workCenter:'防腐车间', qty:300, unit:'米', leader:'孙七', dispatchDate:'2026-04-23', status:'执行中' },
    { dispatchId:'DP20260422003', planId:'PL20260420003', process:'OP10 来料检验', workCenter:'检验区', qty:2000, unit:'米', leader:'孙七', dispatchDate:'2026-04-22', status:'已完成' },
    { dispatchId:'DP20260422004', planId:'PL20260420003', process:'OP20 喷砂除锈', workCenter:'除锈车间', qty:500, unit:'米', leader:'孙七', dispatchDate:'2026-04-22', status:'执行中' },
    { dispatchId:'DP20260421005', planId:'PL20260415004', process:'OP10 锻造', workCenter:'锻造车间', qty:200, unit:'片', leader:'孙七', dispatchDate:'2026-04-21', status:'已完成' },
    { dispatchId:'DP20260420006', planId:'PL20260415004', process:'OP20 车加工', workCenter:'机加车间', qty:200, unit:'片', leader:'孙七', dispatchDate:'2026-04-20', status:'执行中' },
    { dispatchId:'DP20260416007', planId:'PL20260414005', process:'OP30 钻孔', workCenter:'机加车间', qty:800, unit:'片', leader:'孙七', dispatchDate:'2026-04-16', status:'已完成' },
    { dispatchId:'DP20260412008', planId:'PL20260410006', process:'OP20 喷砂除锈', workCenter:'除锈车间', qty:800, unit:'米', leader:'孙七', dispatchDate:'2026-04-12', status:'已完成' },
    { dispatchId:'DP20260424009', planId:'PL20260422009', process:'OP10 下料', workCenter:'下料车间', qty:600, unit:'片', leader:'孙七', dispatchDate:'2026-04-24', status:'执行中' },
    { dispatchId:'DP20260424010', planId:'PL20260421008', process:'OP10 锻造', workCenter:'锻造车间', qty:300, unit:'片', leader:'孙七', dispatchDate:'2026-04-24', status:'执行中' },
  ],

  // ============================================================
  // 五、生产管理 — 工序报工单
  // ============================================================
  productionReports: [
    { reportId:'RP20260424001', dispatchId:'DP20260422003', process:'OP10 来料检验', qualifiedQty:1950, unqualifiedQty:50, worker:'钱十一', reportTime:'2026-04-24 09:00', status:'已审核' },
    { reportId:'RP20260423002', dispatchId:'DP20260421005', process:'OP10 锻造', qualifiedQty:198, unqualifiedQty:2, worker:'李十二', reportTime:'2026-04-23 16:00', status:'已审核' },
    { reportId:'RP20260420003', dispatchId:'DP20260416007', process:'OP30 钻孔', qualifiedQty:795, unqualifiedQty:5, worker:'张十三', reportTime:'2026-04-20 14:00', status:'已审核' },
    { reportId:'RP20260415004', dispatchId:'DP20260412008', process:'OP20 喷砂除锈', qualifiedQty:780, unqualifiedQty:20, worker:'刘十四', reportTime:'2026-04-15 11:00', status:'已审核' },
    { reportId:'RP20260423005', dispatchId:'DP20260423001', process:'OP20 喷砂除锈', qualifiedQty:150, unqualifiedQty:0, worker:'刘十四', reportTime:'2026-04-23 15:00', status:'待审核' },
    { reportId:'RP20260423006', dispatchId:'DP20260423002', process:'OP40 防腐涂刷', qualifiedQty:280, unqualifiedQty:20, worker:'刘十四', reportTime:'2026-04-23 17:00', status:'待审核' },
    { reportId:'RP20260422007', dispatchId:'DP20260422004', process:'OP20 喷砂除锈', qualifiedQty:450, unqualifiedQty:50, worker:'刘十四', reportTime:'2026-04-22 16:00', status:'已审核' },
    { reportId:'RP20260418008', dispatchId:'DP20260420006', process:'OP20 车加工', qualifiedQty:185, unqualifiedQty:15, worker:'张十三', reportTime:'2026-04-18 14:00', status:'已审核' },
    { reportId:'RP20260425001', dispatchId:'DP20260424009', process:'OP10 下料', qualifiedQty:300, unqualifiedQty:0, worker:'李十二', reportTime:'2026-04-25 10:00', status:'待审核' },
    { reportId:'RP20260425002', dispatchId:'DP20260424010', process:'OP10 锻造', qualifiedQty:300, unqualifiedQty:5, worker:'李十二', reportTime:'2026-04-25 11:00', status:'待审核' },
  ],

  // ============================================================
  // 五、生产管理 — 计件工资记录
  // ============================================================
  pieceWageRecords: [
    { wageId:'PW20260424001', employee:'钱十一', reportRef:'RP20260424001', process:'来料检验', qualifiedQty:1950, unitPrice:0.30, wage:585, date:'2026-04-24' },
    { wageId:'PW20260423002', employee:'李十二', reportRef:'RP20260423002', process:'锻造', qualifiedQty:198, unitPrice:0.80, wage:158.4, date:'2026-04-23' },
    { wageId:'PW20260420003', employee:'张十三', reportRef:'RP20260420003', process:'钻孔', qualifiedQty:795, unitPrice:0.50, wage:397.5, date:'2026-04-20' },
    { wageId:'PW20260415004', employee:'刘十四', reportRef:'RP20260415004', process:'喷砂除锈', qualifiedQty:780, unitPrice:0.60, wage:468, date:'2026-04-15' },
    { wageId:'PW20260423005', employee:'刘十四', reportRef:'RP20260423005', process:'喷砂除锈', qualifiedQty:150, unitPrice:0.60, wage:90, date:'2026-04-23' },
    { wageId:'PW20260423006', employee:'刘十四', reportRef:'RP20260423006', process:'防腐涂刷', qualifiedQty:280, unitPrice:1.20, wage:336, date:'2026-04-23' },
    { wageId:'PW20260422007', employee:'刘十四', reportRef:'RP20260422007', process:'喷砂除锈', qualifiedQty:450, unitPrice:0.60, wage:270, date:'2026-04-22' },
    { wageId:'PW20260418008', employee:'张十三', reportRef:'RP20260418008', process:'车加工', qualifiedQty:185, unitPrice:0.80, wage:148, date:'2026-04-18' },
    { wageId:'PW20260425001', employee:'李十二', reportRef:'RP20260425001', process:'下料', qualifiedQty:300, unitPrice:0.40, wage:120, date:'2026-04-25' },
    { wageId:'PW20260425002', employee:'李十二', reportRef:'RP20260425002', process:'锻造', qualifiedQty:300, unitPrice:0.80, wage:240, date:'2026-04-25' },
  ],

  // ============================================================
  // 六、委外管理 — 委外订单
  // ============================================================
  outsourceOrders: [
    { osId:'OS20260422001', vendorName:'XX锻造厂', process:'法兰锻造', material:'FL003 不锈钢毛坯', qty:500, unit:'片', sendDate:'2026-04-22', expectReturn:'2026-05-05', status:'已发出' },
    { osId:'OS20260418002', vendorName:'XX防腐专业厂', process:'喷砂除锈+底漆', material:'钢管DN200', qty:800, unit:'米', sendDate:'2026-04-18', expectReturn:'2026-04-25', status:'已回收' },
    { osId:'OS20260415003', vendorName:'XX保温施工队', process:'保温层缠绕', material:'管道半成品', qty:600, unit:'米', sendDate:'2026-04-15', expectReturn:'2026-04-22', status:'逾期未回' },
    { osId:'OS20260420004', vendorName:'XX锻造厂', process:'法兰锻造', material:'FL004 合金钢毛坯', qty:300, unit:'片', sendDate:'2026-04-20', expectReturn:'2026-05-10', status:'已发出' },
    { osId:'OS20260410005', vendorName:'XX热处理厂', process:'热处理', material:'合金钢法兰', qty:200, unit:'片', sendDate:'2026-04-10', expectReturn:'2026-04-17', status:'已回收' },
    { osId:'OS20260423006', vendorName:'XX镀锌厂', process:'镀锌处理', material:'碳钢法兰DN100', qty:1000, unit:'片', sendDate:'2026-04-23', expectReturn:'2026-05-05', status:'已发出' },
    { osId:'OS20260405007', vendorName:'XX喷涂厂', process:'聚氨酯喷涂', material:'管道DN150', qty:400, unit:'米', sendDate:'2026-04-05', expectReturn:'2026-04-15', status:'已回收' },
    { osId:'OS20260424008', vendorName:'XX锻造厂', process:'法兰锻造', material:'FL001 碳钢毛坯', qty:800, unit:'片', sendDate:'2026-04-24', expectReturn:'2026-05-08', status:'待发出' },
    { osId:'OS20260424009', vendorName:'XX防腐专业厂', process:'3PE防腐', material:'钢管DN300', qty:200, unit:'米', sendDate:'2026-04-24', expectReturn:'2026-05-15', status:'待确认' },
    { osId:'OS20260401010', vendorName:'XX机械加工厂', process:'车加工', material:'不锈钢法兰', qty:400, unit:'片', sendDate:'2026-04-01', expectReturn:'2026-04-14', status:'已回收' },
  ],

  // ============================================================
  // 六、委外管理 — 回收记录
  // ============================================================
  outsourceRecovery: [
    { recoveryId:'OSR20260424001', osId:'OS20260418002', returnDate:'2026-04-24', qualifiedQty:780, rejectQty:10, lossQty:10, location:'半成品库-A01', status:'已入库' },
    { recoveryId:'OSR20260422002', osId:'OS20260410005', returnDate:'2026-04-22', qualifiedQty:195, rejectQty:5, lossQty:0, location:'半成品库-B02', status:'已入库' },
    { recoveryId:'OSR20260418003', osId:'OS20260405007', returnDate:'2026-04-18', qualifiedQty:390, rejectQty:8, lossQty:2, location:'半成品库-C03', status:'已入库' },
    { recoveryId:'OSR20260414004', osId:'OS20260401010', returnDate:'2026-04-14', qualifiedQty:395, rejectQty:3, lossQty:2, location:'半成品库-D04', status:'已入库' },
    { recoveryId:'OSR20260412005', osId:'OS20260405007', returnDate:'2026-04-12', qualifiedQty:200, rejectQty:0, lossQty:0, location:'半成品库-C03', status:'已入库' },
    { recoveryId:'OSR20260420006', osId:'OS20260410005', returnDate:'2026-04-20', qualifiedQty:0, rejectQty:5, lossQty:0, location:'-', status:'报废入库' },
    { recoveryId:'OSR20260426001', osId:'OS20260415003', returnDate:'2026-04-26', qualifiedQty:null, rejectQty:null, lossQty:null, location:'-', status:'预期回收' },
    { recoveryId:'OSR20260426002', osId:'OS20260422001', returnDate:'2026-04-26', qualifiedQty:null, rejectQty:null, lossQty:null, location:'-', status:'预期回收' },
  ],

  // ============================================================
  // 六、委外管理 — 对账单
  // ============================================================
  outsourceReconcile: [
    { reconcileId:'OSREC202604001', vendorName:'XX锻造厂', period:'2026-04-01~04-30', amount:125000, paidAmount:0, status:'待确认' },
    { reconcileId:'OSREC202604002', vendorName:'XX防腐专业厂', period:'2026-04-01~04-30', amount:48000, paidAmount:48000, status:'已结算' },
    { reconcileId:'OSREC202604003', vendorName:'XX保温施工队', period:'2026-04-01~04-30', amount:36000, paidAmount:0, status:'待确认' },
    { reconcileId:'OSREC202604004', vendorName:'XX热处理厂', period:'2026-04-01~04-30', amount:28000, paidAmount:28000, status:'已结算' },
    { reconcileId:'OSREC202604005', vendorName:'XX镀锌厂', period:'2026-04-01~04-30', amount:18500, paidAmount:0, status:'待确认' },
    { reconcileId:'OSREC202604006', vendorName:'XX喷涂厂', period:'2026-04-01~04-30', amount:22000, paidAmount:22000, status:'已结算' },
    { reconcileId:'OSREC202604007', vendorName:'XX机械加工厂', period:'2026-04-01~04-30', amount:56000, paidAmount:30000, status:'部分付款' },
  ],

  // ============================================================
  // 七、库存管理 — 仓库/货位
  // ============================================================
  warehouses: [
    { whId:'WH01', whName:'原材料库', whType:'原料仓', locations:[
      { locId:'WH01-A01', locName:'法兰毛坯区-碳钢' },
      { locId:'WH01-A02', locName:'法兰毛坯区-不锈钢' },
      { locId:'WH01-B01', locName:'管材区-无缝钢管' },
      { locId:'WH01-C01', locName:'防腐材料区-油漆' },
      { locId:'WH01-C02', locName:'保温材料区-岩棉' },
    ]},
    { whId:'WH02', whName:'半成品库', whType:'半成品仓', locations:[
      { locId:'WH02-A01', locName:'法兰半成品区' },
      { locId:'WH02-B01', locName:'管道半成品区' },
    ]},
    { whId:'WH03', whName:'成品库', whType:'成品仓', locations:[
      { locId:'WH03-A01', locName:'法兰成品区' },
      { locId:'WH03-B01', locName:'管道成品区' },
    ]},
    { whId:'WH04', whName:'废料库', whType:'废品仓', locations:[
      { locId:'WH04-A01', locName:'废钢区' },
    ]},
  ],

  // ============================================================
  // 七、库存管理 — 出入库流水
  // ============================================================
  inventoryLogs: [
    { logId:'INV20260423001', bizType:'采购入库', bizNo:'PI20260423001', materialName:'FF001', batchNo:'BN20260422001', changeQty:30, unit:'桶', afterQty:80, operatorTime:'2026-04-23 10:00', operator:'吴九' },
    { logId:'INV20260423002', bizType:'采购入库', bizNo:'PI20260423006', materialName:'FL002', batchNo:'BN20260420001', changeQty:8, unit:'吨', afterQty:18, operatorTime:'2026-04-23 14:00', operator:'吴九' },
    { logId:'INV20260423003', bizType:'生产领料', bizNo:'PK20260423001', materialName:'FL002', batchNo:'BN20260420001', changeQty:-2, unit:'吨', afterQty:16, operatorTime:'2026-04-23 15:00', operator:'吴九' },
    { logId:'INV20260423004', bizType:'生产领料', bizNo:'PK20260423001', materialName:'FF001', batchNo:'BN20260422001', changeQty:-5, unit:'桶', afterQty:75, operatorTime:'2026-04-23 15:05', operator:'吴九' },
    { logId:'INV20260422005', bizType:'委外发出', bizNo:'OS20260422001', materialName:'FL003', batchNo:'-', changeQty:-500, unit:'片', afterQty:120, operatorTime:'2026-04-22 09:00', operator:'吴九' },
    { logId:'INV20260424006', bizType:'委外回收入库', bizNo:'OSR20260424001', materialName:'SP004', batchNo:'-', changeQty:780, unit:'米', afterQty:1280, operatorTime:'2026-04-24 11:00', operator:'吴九' },
    { logId:'INV20260424007', bizType:'生产入库', bizNo:'PRIN20260424001', materialName:'CP001', batchNo:'-', changeQty:300, unit:'片', afterQty:850, operatorTime:'2026-04-24 16:00', operator:'吴九' },
    { logId:'INV20260422008', bizType:'销售出库', bizNo:'SDN20260422001', materialName:'CP005', batchNo:'-', changeQty:-850, unit:'米', afterQty:450, operatorTime:'2026-04-22 14:00', operator:'吴九' },
    { logId:'INV20260420009', bizType:'采购退货', bizNo:'PI20260415005', materialName:'FL004', batchNo:'BN20260410003', changeQty:-0.3, unit:'吨', afterQty:4.7, operatorTime:'2026-04-20 10:00', operator:'吴九' },
    { logId:'INV20260423010', bizType:'报废入库', bizNo:'NG20260423001', materialName:'SP001', batchNo:'-', changeQty:15, unit:'片', afterQty:15, operatorTime:'2026-04-23 13:00', operator:'吴九' },
  ],

  // ============================================================
  // 七、库存管理 — 盘点单
  // ============================================================
  inventoryChecks: [
    { checkId:'CK20260423001', warehouse:'WH01 原材料库', checkDate:'2026-04-23', operator:'吴九', materialCount:150, profitLoss:'盘亏3项', status:'待审核' },
    { checkId:'CK20260331001', warehouse:'WH01 原材料库', checkDate:'2026-03-31', operator:'吴九', materialCount:145, profitLoss:'账实相符', status:'已完成' },
    { checkId:'CK20260331002', warehouse:'WH03 成品库', checkDate:'2026-03-31', operator:'吴九', materialCount:35, profitLoss:'盘盈1项', status:'已完成' },
    { checkId:'CK20260331003', warehouse:'WH02 半成品库', checkDate:'2026-03-31', operator:'吴九', materialCount:42, profitLoss:'账实相符', status:'已完成' },
    { checkId:'CK20260228001', warehouse:'WH01 原材料库', checkDate:'2026-02-28', operator:'吴九', materialCount:140, profitLoss:'盘亏2项', status:'已完成' },
    { checkId:'CK20260131001', warehouse:'全仓', checkDate:'2026-01-31', operator:'吴九', materialCount:380, profitLoss:'盘盈3项盘亏5项', status:'已完成' },
    { checkId:'CK20260423002', warehouse:'WH03 成品库', checkDate:'2026-04-23', operator:'吴九', materialCount:38, profitLoss:'待确认', status:'进行中' },
    { checkId:'CK20260423003', warehouse:'WH02 半成品库', checkDate:'2026-04-23', operator:'吴九', materialCount:40, profitLoss:'待确认', status:'进行中' },
    { checkId:'CK20260424001', warehouse:'WH04 废料库', checkDate:'2026-04-24', operator:'吴九', materialCount:8, profitLoss:'待确认', status:'进行中' },
  ],

  // ============================================================
  // 七、库存管理 — 废料登记
  // ============================================================
  wasteRecords: [
    { wasteId:'WS20260423001', source:'生产报废', materialName:'FL001 碳钢毛坯边角料', qty:0.5, unit:'吨', residualValue:850, wasteDate:'2026-04-23', destination:'废料库' },
    { wasteId:'WS20260422002', source:'工序不合格', materialName:'SP001 碳钢法兰半成品', qty:15, unit:'片', residualValue:600, wasteDate:'2026-04-22', destination:'废料库' },
    { wasteId:'WS20260420003', source:'委外报废', materialName:'FL003 不锈钢毛坯', qty:3, unit:'片', residualValue:1200, wasteDate:'2026-04-20', destination:'废料库' },
    { wasteId:'WS20260415004', source:'库存报废', materialName:'FF002 过期油漆', qty:8, unit:'桶', residualValue:200, wasteDate:'2026-04-15', destination:'危废处理' },
    { wasteId:'WS20260410005', source:'生产报废', materialName:'BW001 岩棉边角料', qty:25, unit:'米', residualValue:50, wasteDate:'2026-04-10', destination:'废料库' },
    { wasteId:'WS20260405006', source:'生产报废', materialName:'ST001 钢管下脚料', qty:0.8, unit:'吨', residualValue:1200, wasteDate:'2026-04-05', destination:'废料库' },
    { wasteId:'WS20260328007', source:'委外损耗', materialName:'FL004 合金钢毛坯', qty:2, unit:'片', residualValue:800, wasteDate:'2026-03-28', destination:'废料库' },
    { wasteId:'WS20260320008', source:'库存报废', materialName:'WP001 垫片锈蚀', qty:200, unit:'片', residualValue:30, wasteDate:'2026-03-20', destination:'废料库' },
    { wasteId:'WS20260424009', source:'生产报废', materialName:'FL002 碳钢毛坯切削屑', qty:0.3, unit:'吨', residualValue:500, wasteDate:'2026-04-24', destination:'废料库' },
    { wasteId:'WS20260424010', source:'不合格品', materialName:'CP001 批次不合格', qty:5, unit:'片', residualValue:200, wasteDate:'2026-04-24', destination:'废料库' },
  ],

  // ============================================================
  // 八、质量管理 — 检验标准
  // ============================================================
  inspectionStandards: [
    { stdId:'INS001', stdName:'法兰尺寸检验', scope:'CP001-CP004', checkItem:'外径偏差', stdValue:'±1.5', unit:'mm', method:'卡尺 3点测量', refStandard:'GB/T9119', remark:'' },
    { stdId:'INS002', stdName:'法兰外观检验', scope:'CP001-CP004', checkItem:'表面裂纹', stdValue:'0', unit:'处', method:'目视+磁粉探伤', refStandard:'-', remark:'' },
    { stdId:'INS003', stdName:'防腐层厚度', scope:'CP005-CP007', checkItem:'干膜厚度', stdValue:'≥300', unit:'μm', method:'涂层测厚仪 5点', refStandard:'SY/T0413', remark:'' },
    { stdId:'INS004', stdName:'除锈等级', scope:'OP20 喷砂除锈', checkItem:'清洁度', stdValue:'Sa2.5', unit:'级', method:'标准样块对比', refStandard:'ISO8501-1', remark:'' },
    { stdId:'INS005', stdName:'锚纹深度', scope:'OP20 喷砂除锈', checkItem:'粗糙度', stdValue:'50-80', unit:'μm', method:'锚纹测量仪', refStandard:'-', remark:'' },
    { stdId:'INS006', stdName:'水压试验', scope:'CP005-CP009', checkItem:'试验压力', stdValue:'1.5倍设计压力', unit:'MPa', method:'水压泵 30分钟', refStandard:'无泄漏', remark:'' },
    { stdId:'INS007', stdName:'保温层密度', scope:'OP50 保温缠绕', checkItem:'密度', stdValue:'≥80', unit:'kg/m³', method:'取样称重', refStandard:'-', remark:'' },
    { stdId:'INS008', stdName:'法兰密封面', scope:'CP001-CP004', checkItem:'粗糙度', stdValue:'Ra≤3.2', unit:'μm', method:'粗糙度仪', refStandard:'-', remark:'' },
    { stdId:'INS009', stdName:'防腐层附着力', scope:'CP005-CP007', checkItem:'剥离强度', stdValue:'≥8', unit:'kN/m', method:'拉力试验机', refStandard:'-', remark:'' },
    { stdId:'INS010', stdName:'不锈钢酸洗', scope:'CP003', checkItem:'表面钝化膜', stdValue:'均匀无锈斑', unit:'-', method:'目视+蓝点法', refStandard:'-', remark:'' },
  ],

  // ============================================================
  // 八、质量管理 — 检验记录
  // ============================================================
  inspectionRecords: [
    { recordId:'IS20260424001', refType:'RP20260424001 报工', stdId:'INS004', checkQty:2000, qualifiedQty:1950, unqualifiedQty:50, inspector:'钱十一', checkDate:'2026-04-24', result:'让步接收' },
    { recordId:'IS20260423002', refType:'RP20260423002 报工', stdId:'INS001+INS002', checkQty:200, qualifiedQty:198, unqualifiedQty:2, inspector:'钱十一', checkDate:'2026-04-23', result:'合格' },
    { recordId:'IS20260420003', refType:'RP20260420003 报工', stdId:'INS001', checkQty:800, qualifiedQty:795, unqualifiedQty:5, inspector:'钱十一', checkDate:'2026-04-20', result:'合格' },
    { recordId:'IS20260415004', refType:'RP20260415004 报工', stdId:'INS004+INS005', checkQty:800, qualifiedQty:780, unqualifiedQty:20, inspector:'钱十一', checkDate:'2026-04-15', result:'合格' },
    { recordId:'IS20260423005', refType:'PO20260418002 采购入库', stdId:'INS005', checkQty:150, qualifiedQty:150, unqualifiedQty:0, inspector:'钱十一', checkDate:'2026-04-23', result:'合格' },
    { recordId:'IS20260423006', refType:'OS20260418002 委外回收', stdId:'INS003+INS009', checkQty:790, qualifiedQty:785, unqualifiedQty:5, inspector:'钱十一', checkDate:'2026-04-24', result:'合格' },
    { recordId:'IS20260420007', refType:'PRIN20260420001 生产入库', stdId:'INS006', checkQty:300, qualifiedQty:300, unqualifiedQty:0, inspector:'钱十一', checkDate:'2026-04-20', result:'合格' },
    { recordId:'IS20260425008', refType:'RP20260425001 报工', stdId:'INS001', checkQty:300, qualifiedQty:300, unqualifiedQty:0, inspector:'钱十一', checkDate:'2026-04-25', result:'合格' },
    { recordId:'IS20260425009', refType:'RP20260425002 报工', stdId:'INS001+INS002', checkQty:305, qualifiedQty:300, unqualifiedQty:5, inspector:'钱十一', checkDate:'2026-04-25', result:'合格' },
    { recordId:'IS20260424010', refType:'成品终检', stdId:'INS002+INS008+INS006', checkQty:500, qualifiedQty:498, unqualifiedQty:2, inspector:'钱十一', checkDate:'2026-04-24', result:'合格' },
  ],

  // ============================================================
  // 八、质量管理 — 不合格品处置单
  // ============================================================
  ngRecords: [
    { ngId:'NG20260424001', source:'IS20260424001', materialName:'CP006管道', qty:'50米', reason:'除锈等级不达标', disposeType:'返工', handler:'孙七', status:'已返工' },
    { ngId:'NG20260423002', source:'IS20260423002', materialName:'FL003', qty:'2片', reason:'裂纹', disposeType:'报废', handler:'钱十一', status:'已报废' },
    { ngId:'NG20260420003', source:'IS20260420003', materialName:'FL001', qty:'5片', reason:'孔径超差', disposeType:'让步接收', handler:'陈十五', status:'已接收' },
    { ngId:'NG20260415004', source:'IS20260415004', materialName:'CP005', qty:'20米', reason:'锚纹深度不足', disposeType:'返工', handler:'孙七', status:'已返工' },
    { ngId:'NG20260423005', source:'RP20260423006', materialName:'CP005', qty:'20米', reason:'涂层厚度不足', disposeType:'返工', handler:'孙七', status:'待返工' },
    { ngId:'NG20260424006', source:'IS20260424010', materialName:'CP001', qty:'2片', reason:'密封面划痕', disposeType:'降级', handler:'钱十一', status:'待处置' },
    { ngId:'NG20260425001', source:'IS20260425009', materialName:'FL001', qty:'5片', reason:'表面裂纹', disposeType:'报废', handler:'钱十一', status:'待处置' },
    { ngId:'NG20260422007', source:'委外回收', materialName:'FL003', qty:'10片', reason:'尺寸超差', disposeType:'退货', handler:'周八', status:'已退货' },
    { ngId:'NG20260421008', source:'库存巡检', materialName:'FF002油漆', qty:'3桶', reason:'临近保质期', disposeType:'优先使用', handler:'吴九', status:'已处理' },
    { ngId:'NG20260418009', source:'工序自检', materialName:'CP004', qty:'3片', reason:'硬度不达标', disposeType:'返工', handler:'孙七', status:'已返工' },
  ],

  // ============================================================
  // 九、财务管理 — 应收账款汇总
  // ============================================================
  arSummary: [
    { customerName:'XX城市管网', totalAmount:650000, paidAmount:200000, unpaidAmount:450000, overdueAmount:450000, overdueDays:3, riskLevel:'高' },
    { customerName:'XX油田服务', totalAmount:384000, paidAmount:100000, unpaidAmount:284000, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX石化设备', totalAmount:208000, paidAmount:0, unpaidAmount:208000, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX热力管网', totalAmount:192000, paidAmount:0, unpaidAmount:192000, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX船舶重工', totalAmount:312000, paidAmount:0, unpaidAmount:312000, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX市政工程', totalAmount:50400, paidAmount:50400, unpaidAmount:0, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX核电设备', totalAmount:1140000, paidAmount:300000, unpaidAmount:840000, overdueAmount:0, overdueDays:0, riskLevel:'关注' },
    { customerName:'XX水利工程', totalAmount:72000, paidAmount:0, unpaidAmount:72000, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX环保设备', totalAmount:95000, paidAmount:95000, unpaidAmount:0, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
    { customerName:'XX化工装备', totalAmount:185000, paidAmount:185000, unpaidAmount:0, overdueAmount:0, overdueDays:0, riskLevel:'正常' },
  ],

  // ============================================================
  // 九、财务管理 — 费用登记
  // ============================================================
  expenseRecords: [
    { expId:'EX20260423001', expType:'水电费', expItem:'4月车间电费', amount:28500, expDate:'2026-04-23', remark:'按表计量' },
    { expId:'EX20260422002', expType:'运输费', expItem:'销售发货物流费', amount:3500, expDate:'2026-04-22', remark:'SO20260320001' },
    { expId:'EX20260420003', expType:'维修费', expItem:'液压机检修', amount:8500, expDate:'2026-04-20', remark:'设备编号EQ003' },
    { expId:'EX20260418004', expType:'办公费', expItem:'4月办公用品采购', amount:2300, expDate:'2026-04-18', remark:'管理费用' },
    { expId:'EX20260415005', expType:'检测费', expItem:'第三方焊缝探伤', amount:12000, expDate:'2026-04-15', remark:'项目委托检测' },
    { expId:'EX20260410006', expType:'劳保费', expItem:'车间安全帽手套等', amount:4600, expDate:'2026-04-10', remark:'季度采购' },
    { expId:'EX20260405007', expType:'培训费', expItem:'新员工安全培训', amount:1800, expDate:'2026-04-05', remark:'外聘讲师' },
    { expId:'EX20260401008', expType:'招待费', expItem:'客户考察招待', amount:3200, expDate:'2026-04-01', remark:'XX石化设备来访' },
    { expId:'EX20260328009', expType:'模具费', expItem:'模具MD005维修', amount:15000, expDate:'2026-03-28', remark:'维修+配件' },
    { expId:'EX20260424010', expType:'认证费', expItem:'ISO9001年审费', amount:8500, expDate:'2026-04-24', remark:'年度审核' },
  ],

  // ============================================================
  // 九、财务管理 — 成本核算（完工订单）
  // ============================================================
  costRecords: [
    { costId:'COST001', orderId:'SO20260414005', productName:'CP001×800片', revenue:320000, materialCost:182400, laborCost:38400, outsourceCost:0, overhead:12000, totalCost:232800, grossProfit:87200, grossMargin:'27.30%' },
    { costId:'COST002', orderId:'SO20260401001', productName:'CP006×1200米', revenue:185000, materialCost:144000, laborCost:21600, outsourceCost:12000, overhead:8500, totalCost:186100, grossProfit:-1100, grossMargin:'-0.60%' },
    { costId:'COST003', orderId:'SO20260320001', productName:'CP004×600片', revenue:430000, materialCost:288000, laborCost:57600, outsourceCost:28000, overhead:16000, totalCost:389600, grossProfit:40400, grossMargin:'9.40%' },
    { costId:'COST004', orderId:'SO20260410003', productName:'CP005×1500米', revenue:650000, materialCost:390000, laborCost:58500, outsourceCost:48000, overhead:22000, totalCost:518500, grossProfit:131500, grossMargin:'20.20%' },
    { costId:'COST005', orderId:'SO20260408004', productName:'CP006×500米', revenue:95000, materialCost:60000, laborCost:9000, outsourceCost:5000, overhead:3500, totalCost:77500, grossProfit:17500, grossMargin:'18.40%' },
    { costId:'COST006', orderId:'SO20260315001', productName:'CP002×800片', revenue:600000, materialCost:332800, laborCost:51200, outsourceCost:16000, overhead:18000, totalCost:418000, grossProfit:182000, grossMargin:'30.30%' },
    { costId:'COST007', orderId:'SO20260310001', productName:'CP007×200米', revenue:196000, materialCost:112000, laborCost:16800, outsourceCost:22400, overhead:7200, totalCost:158400, grossProfit:37600, grossMargin:'19.20%' },
    { costId:'COST008', orderId:'SO20260220002', productName:'CP009×100根', revenue:520000, materialCost:280000, laborCost:35000, outsourceCost:52000, overhead:21000, totalCost:388000, grossProfit:132000, grossMargin:'25.40%' },
    { costId:'COST009', orderId:'SO20260205003', productName:'CP003×300片', revenue:780000, materialCost:444000, laborCost:55500, outsourceCost:37000, overhead:28000, totalCost:564500, grossProfit:215500, grossMargin:'27.60%' },
    { costId:'COST010', orderId:'SO20260115004', productName:'CP008×200片', revenue:780000, materialCost:448000, laborCost:56000, outsourceCost:42000, overhead:30000, totalCost:576000, grossProfit:204000, grossMargin:'26.20%' },
  ],

  // ============================================================
  // 十、资源管理 — 设备台账
  // ============================================================
  equipment: [
    { eqId:'EQ001', eqName:'数控车床', model:'CK6140', workshop:'机加车间', purchaseDate:'2024-03-15', power:7.5, status:'运行中', totalHours:8520 },
    { eqId:'EQ002', eqName:'立式钻床', model:'Z5132A', workshop:'机加车间', purchaseDate:'2023-06-20', power:4, status:'运行中', totalHours:12450 },
    { eqId:'EQ003', eqName:'液压机', model:'YT32-315', workshop:'锻造车间', purchaseDate:'2022-01-10', power:22, status:'故障停机', totalHours:28500 },
    { eqId:'EQ004', eqName:'喷砂设备', model:'PS-800', workshop:'除锈车间', purchaseDate:'2025-05-08', power:15, status:'运行中', totalHours:3200 },
    { eqId:'EQ005', eqName:'喷涂机', model:'GP-6C', workshop:'防腐车间', purchaseDate:'2024-09-12', power:5.5, status:'运行中', totalHours:6800 },
    { eqId:'EQ006', eqName:'卷板机', model:'W11-20', workshop:'保温车间', purchaseDate:'2023-03-25', power:11, status:'运行中', totalHours:9800 },
    { eqId:'EQ007', eqName:'水压试验泵', model:'4DSY-16', workshop:'检验区', purchaseDate:'2024-07-18', power:18.5, status:'运行中', totalHours:4200 },
    { eqId:'EQ008', eqName:'缠绕机', model:'CR-500', workshop:'保温车间', purchaseDate:'2025-01-05', power:3, status:'运行中', totalHours:1800 },
    { eqId:'EQ009', eqName:'埋弧焊机', model:'MZ-1000', workshop:'焊接车间', purchaseDate:'2023-08-30', power:30, status:'待料', totalHours:15600 },
    { eqId:'EQ010', eqName:'坡口机', model:'PK-400', workshop:'下料车间', purchaseDate:'2025-11-20', power:2.2, status:'运行中', totalHours:850 },
  ],

  // ============================================================
  // 十、资源管理 — 模具台账
  // ============================================================
  molds: [
    { moldId:'MD001', moldName:'DN100 PN16法兰锻模',适用产品:'CP001', material:'H13热作模', totalLife:10000, usedLife:4200, remainLife:5800, location:'模具架A-01', status:'可用' },
    { moldId:'MD002', moldName:'DN200 PN25法兰锻模',适用产品:'CP002', material:'H13热作模', totalLife:8000, usedLife:3200, remainLife:4800, location:'模具架A-02', status:'可用' },
    { moldId:'MD003', moldName:'DN150 PN40法兰锻模',适用产品:'CP003', material:'H13热作模', totalLife:6000, usedLife:3800, remainLife:2200, location:'模具架B-01', status:'可用' },
    { moldId:'MD004', moldName:'DN250 PN64法兰锻模',适用产品:'CP004', material:'H13热作模', totalLife:5000, usedLife:4100, remainLife:900, location:'模具架B-02', status:'预警' },
    { moldId:'MD005', moldName:'DN350 PN16法兰锻模',适用产品:'CP010', material:'H13热作模', totalLife:5000, usedLife:4820, remainLife:180, location:'模具架C-01', status:'预警' },
    { moldId:'MD006', moldName:'DN100法兰冲孔模',适用产品:'CP001', material:'Cr12MoV', totalLife:20000, usedLife:8500, remainLife:11500, location:'模具架C-02', status:'可用' },
    { moldId:'MD007', moldName:'DN200法兰冲孔模',适用产品:'CP002', material:'Cr12MoV', totalLife:15000, usedLife:6200, remainLife:8800, location:'模具架D-01', status:'可用' },
    { moldId:'MD008', moldName:'DN150法兰冲孔模',适用产品:'CP003', material:'Cr12MoV', totalLife:12000, usedLife:7800, remainLife:4200, location:'模具架D-02', status:'可用' },
    { moldId:'MD009', moldName:'DN250法兰冲孔模',适用产品:'CP004', material:'Cr12MoV', totalLife:10000, usedLife:9200, remainLife:800, location:'模具架E-01', status:'预警' },
    { moldId:'MD010', moldName:'特殊法兰模具A',适用产品:'非标', material:'定制', totalLife:3000, usedLife:1500, remainLife:1500, location:'模具架E-02', status:'可用' },
  ],

  // ============================================================
  // 十一、工作台 — 待办中心（12条）
  // ============================================================
  todos: [
    { todoId:1, todoType:'订单审核', title:'销售订单 SO20260420001 待审核', priority:'高', creator:'销售员王五', createTime:'2026-04-20 09:15', status:'待处理' },
    { todoId:2, todoType:'采购申请审核', title:'采购申请 PR20260420002 待审批', priority:'中', creator:'采购员赵六', createTime:'2026-04-20 10:30', status:'待处理' },
    { todoId:3, todoType:'生产报工审核', title:'派工单 DP20260421005 报工待审', priority:'中', creator:'班组长孙七', createTime:'2026-04-21 14:00', status:'待处理' },
    { todoId:4, todoType:'委外回收确认', title:'委外单 OS20260418001 待回收确认', priority:'高', creator:'外协管理员周八', createTime:'2026-04-22 08:00', status:'待处理' },
    { todoId:5, todoType:'盘点审核', title:'盘点单 CK20260423001 待审批', priority:'低', creator:'库管员吴九', createTime:'2026-04-23 16:00', status:'待处理' },
    { todoId:6, todoType:'付款审批', title:'应付单 AP20260420003 待付款审批', priority:'高', creator:'财务员郑十', createTime:'2026-04-20 15:00', status:'待处理' },
    { todoId:7, todoType:'不合格品处置', title:'不合格品单 NG20260421001 待处置', priority:'中', creator:'质检员钱十一', createTime:'2026-04-21 11:00', status:'待处理' },
    { todoId:8, todoType:'超额领料审批', title:'领料单 PK20260422002 超BOM定额', priority:'中', creator:'班组长孙七', createTime:'2026-04-22 09:30', status:'待处理' },
    { todoId:9, todoType:'客户信用预警', title:'客户 KH20260301003 累计应收超信用额度', priority:'高', creator:'系统自动', createTime:'2026-04-23 07:00', status:'待处理' },
    { todoId:10, todoType:'设备故障通知', title:'设备 EQ003 液压机故障停机', priority:'高', creator:'设备管理员', createTime:'2026-04-23 13:00', status:'待处理' },
    { todoId:11, todoType:'模具寿命预警', title:'模具 MD005 剩余寿命不足200次', priority:'中', creator:'系统自动', createTime:'2026-04-23 06:00', status:'待处理' },
    { todoId:12, todoType:'逾期订单提醒', title:'销售订单 SO20260410003 已逾期3天', priority:'高', creator:'系统自动', createTime:'2026-04-18 08:00', status:'待处理' },
  ],

  // ============================================================
  // 十一、工作台 — 消息通知（10条）
  // ============================================================
  notifications: [
    { notifyId:1, notifyType:'低库存预警', content:'物料 FL001 碳钢法兰毛坯 当前库存24.2吨，低于安全库存10吨', roles:'采购员、库管员', time:'2026-04-23 06:00', isRead:false },
    { notifyId:2, notifyType:'批次临期', content:'物料 FF002 环氧防腐漆 批号BN20251012001 距有效期不足30天', roles:'库管员、质检员', time:'2026-04-23 06:00', isRead:false },
    { notifyId:3, notifyType:'委外到期未回', content:'委外单 OS20260415001 计划回收日期已过2天', roles:'外协管理员', time:'2026-04-22 08:00', isRead:true },
    { notifyId:4, notifyType:'订单状态变更', content:'订单 SO20260419001 已转生产计划 PL20260419001', roles:'销售员', time:'2026-04-19 14:00', isRead:true },
    { notifyId:5, notifyType:'派工通知', content:'派工单 DP20260423001 已分配至一车间锻造班', roles:'班组长', time:'2026-04-23 08:00', isRead:false },
    { notifyId:6, notifyType:'报工异常', content:'派工单 DP20260421004 报工不合格率超15%', roles:'生产厂长', time:'2026-04-21 16:00', isRead:true },
    { notifyId:7, notifyType:'回款到账', content:'客户 XX市政工程 回款200000元已到账', roles:'销售员、财务员', time:'2026-04-22 10:00', isRead:true },
    { notifyId:8, notifyType:'供应商发货', content:'采购单 PO20260420002 供应商已发货', roles:'采购员、库管员', time:'2026-04-21 09:00', isRead:false },
    { notifyId:9, notifyType:'盘点差异', content:'盘点单 CK20260423001 物料 BW005 盘亏3米', roles:'库管员、财务员', time:'2026-04-23 17:00', isRead:false },
    { notifyId:10, notifyType:'系统维护', content:'系统将于明日凌晨2:00-3:00进行备份维护', roles:'全用户', time:'2026-04-22 18:00', isRead:true },
  ],

  // ============================================================
  // 十一、看板 — KPI指标
  // ============================================================
  kpis: [
    { kpiName:'本月营收(元)', currentValue:'1,852,000', mom:'12.3', yoy:'18.5', targetValue:'2,500,000', achieveRate:'74.1', trend:'up' },
    { kpiName:'本月净利润(元)', currentValue:'389,000', mom:'8.7', yoy:'15.2', targetValue:'-', achieveRate:'-', trend:'up' },
    { kpiName:'毛利率(%)', currentValue:'22.4', mom:'-0.5', yoy:'2.1', targetValue:'25', achieveRate:'89.6', trend:'down' },
    { kpiName:'产能利用率(%)', currentValue:'82.5', mom:'3.2', yoy:'5.8', targetValue:'85', achieveRate:'97.1', trend:'up' },
    { kpiName:'一次合格率(%)', currentValue:'97.2', mom:'-0.3', yoy:'0.8', targetValue:'98', achieveRate:'99.2', trend:'down' },
    { kpiName:'逾期应收(元)', currentValue:'450,000', mom:'-15', yoy:'-22', targetValue:'200,000', achieveRate:'-', trend:'down' },
    { kpiName:'库存周转天数', currentValue:'28.5', mom:'-2.1', yoy:'-5.3', targetValue:'25', achieveRate:'-', trend:'down' },
    { kpiName:'设备OEE(%)', currentValue:'78.6', mom:'4.1', yoy:'6.5', targetValue:'80', achieveRate:'98.3', trend:'up' },
    { kpiName:'今日在产订单(张)', currentValue:'18', mom:'-', yoy:'-', targetValue:'-', achieveRate:'-', trend:'-' },
    { kpiName:'今日出货金额(元)', currentValue:'95,000', mom:'-', yoy:'-', targetValue:'-', achieveRate:'-', trend:'-' },
    { kpiName:'低库存预警数', currentValue:'3', mom:'-', yoy:'-', targetValue:'-', achieveRate:'-', trend:'-' },
    { kpiName:'逾期未回委外单', currentValue:'1', mom:'-', yoy:'-', targetValue:'-', achieveRate:'-', trend:'-' },
  ],

  // ============================================================
  // 十一、看板 — 甘特图数据（当日产线状态）
  // ============================================================
  ganttData: [
    { orderNo:'SO20260420002', product:'CP005管道', process:'OP20 喷砂除锈', startTime:'2026-04-23 08:00', endTime:'2026-04-24 17:00', progress:75, status:'正常', handler:'刘十四' },
    { orderNo:'SO20260420002', product:'CP005管道', process:'OP40 防腐涂刷', startTime:'2026-04-23 09:00', endTime:'2026-04-25 12:00', progress:45, status:'预警', handler:'刘十四' },
    { orderNo:'SO20260419003', product:'CP006管道', process:'OP10 来料检验', startTime:'2026-04-22 08:00', endTime:'2026-04-22 17:00', progress:100, status:'完成', handler:'钱十一' },
    { orderNo:'SO20260419003', product:'CP006管道', process:'OP20 喷砂除锈', startTime:'2026-04-22 13:00', endTime:'2026-04-24 17:00', progress:62, status:'正常', handler:'刘十四' },
    { orderNo:'SO20260415004', product:'CP003法兰', process:'OP20 车加工', startTime:'2026-04-20 08:00', endTime:'2026-04-25 17:00', progress:48, status:'正常', handler:'张十三' },
    { orderNo:'SO20260405001', product:'CP004法兰', process:'OP10 锻造', startTime:'2026-04-08 08:00', endTime:'2026-04-20 17:00', progress:100, status:'完成', handler:'李十二' },
    { orderNo:'SO20260405001', product:'CP004法兰', process:'OP20 车加工', startTime:'2026-04-15 08:00', endTime:'2026-05-01 17:00', progress:65, status:'正常', handler:'张十三' },
    { orderNo:'SO20260405001', product:'CP004法兰', process:'OP30 热处理', startTime:'-', endTime:'2026-05-05 17:00', progress:0, status:'未开始', handler:'-' },
    { orderNo:'SO20260422001', product:'CP001法兰', process:'OP10 下料', startTime:'2026-04-24 08:00', endTime:'2026-04-25 17:00', progress:30, status:'正常', handler:'李十二' },
    { orderNo:'SO20260421001', product:'CP003法兰', process:'OP10 锻造', startTime:'2026-04-25 08:00', endTime:'2026-05-05 17:00', progress:0, status:'未开始', handler:'-' },
  ],

  // ============================================================
  // 十一、看板 — 账龄分析
  // ============================================================
  agingAnalysis: [
    { customerName:'XX城市管网', totalAmount:450000, notDue:0, days1_30:450000, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX油田服务', totalAmount:284000, notDue:284000, days1_30:0, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX石化设备', totalAmount:208000, notDue:208000, days1_30:0, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX热力管网', totalAmount:192000, notDue:192000, days1_30:0, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX船舶重工', totalAmount:312000, notDue:312000, days1_30:0, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX核电设备', totalAmount:840000, notDue:840000, days1_30:0, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX水利工程', totalAmount:72000, notDue:72000, days1_30:0, days31_60:0, days61_90:0, days90plus:0 },
    { customerName:'XX建筑工程', totalAmount:100000, notDue:0, days1_30:0, days31_60:100000, days61_90:0, days90plus:0 },
    { customerName:'XX炼化工程', totalAmount:150000, notDue:0, days1_30:0, days31_60:0, days61_90:150000, days90plus:0 },
    { customerName:'历史客户合计', totalAmount:380000, notDue:0, days1_30:0, days31_60:0, days61_90:0, days90plus:380000 },
  ],

  // ============================================================
  // 十一、看板 — 自定义报表配置
  // ============================================================
  customReports: [
    { reportId:'CUS20260423001', creator:'老板', reportName:'月度产品毛利Top20', dataModule:'财务', filter:'时间=本月；产品类型=全部', chartType:'柱状图+表格' },
    { reportId:'CUS20260422002', creator:'销售经理', reportName:'销售员业绩排行', dataModule:'销售', filter:'时间=本月；部门=销售部', chartType:'排行榜' },
    { reportId:'CUS20260420003', creator:'生产厂长', reportName:'各车间产能对比', dataModule:'生产', filter:'时间=近30天；车间=全部', chartType:'折线图' },
    { reportId:'CUS20260415004', creator:'采购经理', reportName:'供应商交付准时率', dataModule:'采购', filter:'时间=本季度', chartType:'饼图+表格' },
    { reportId:'CUS20260410005', creator:'财务', reportName:'月度费用趋势分析', dataModule:'财务', filter:'时间=近12个月；费用类型=全部', chartType:'趋势图' },
    { reportId:'CUS20260405006', creator:'质量主管', reportName:'工序一次合格率趋势', dataModule:'质量', filter:'时间=近30天；工序=全部', chartType:'折线图' },
    { reportId:'CUS20260401007', creator:'仓库主管', reportName:'呆滞物料预警', dataModule:'库存', filter:'库存天数>90', chartType:'表格' },
    { reportId:'CUS20260423008', creator:'老板', reportName:'客户价值分析', dataModule:'销售+财务', filter:'时间=本年累计', chartType:'矩阵图' },
    { reportId:'CUS20260423009', creator:'外协主管', reportName:'委外成本占比', dataModule:'委外+财务', filter:'时间=本月', chartType:'饼图' },
    { reportId:'CUS20260424010', creator:'老板', reportName:'现金流预测', dataModule:'财务', filter:'预测周期=30天', chartType:'瀑布图' },
  ],

};
