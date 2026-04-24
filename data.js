// ===========================
// 模拟数据（严格按PRD示例数据）
// ===========================

const DB = {
  customers: [
    { customerId:'KH20260423001', customerName:'XX市政工程有限公司', contactPerson:'张三', contactPhone:'13800138000', customerAddress:'XX市XX区XX路XX号', cooperationType:'长期', remark:'主要采购防腐保温管道，月订单量约500米', createTime:'2026-04-23 09:30:00', createBy:'admin', status:'正常', orderCount:12 },
    { customerId:'KH20260423002', customerName:'华北石化设备厂', contactPerson:'李明', contactPhone:'13912345678', customerAddress:'河北省石家庄市工业园区', cooperationType:'长期', remark:'主要采购法兰产品，年采购额约80万', createTime:'2026-04-15 14:20:00', createBy:'admin', status:'正常', orderCount:8 },
    { customerId:'KH20260423003', customerName:'东方管道工程公司', contactPerson:'王芳', contactPhone:'0311-88765432', customerAddress:'山东省济南市历城区', cooperationType:'临时', remark:'临时项目，采购DN200法兰100套', createTime:'2026-04-10 10:00:00', createBy:'sales01', status:'正常', orderCount:3 },
    { customerId:'KH20260423004', customerName:'振华化工集团', contactPerson:'赵刚', contactPhone:'13655443322', customerAddress:'江苏省南京市化工园区', cooperationType:'长期', remark:'防腐保温管道战略客户', createTime:'2026-03-01 09:00:00', createBy:'admin', status:'正常', orderCount:25 },
    { customerId:'KH20260423005', customerName:'远景能源科技', contactPerson:'钱晓红', contactPhone:'15088776655', customerAddress:'浙江省杭州市滨江区', cooperationType:'临时', remark:'风电项目用保温管道', createTime:'2026-02-20 11:30:00', createBy:'sales02', status:'禁用', orderCount:1 },
  ],
  suppliers: [
    { supplierId:'GYS20260423001', supplierName:'XX钢材有限公司', contactPerson:'李四', contactPhone:'13900139000', supplierAddress:'XX市XX工业园区XX路XX号', supplyMaterial:'法兰毛坯（碳钢、不锈钢）', cooperationPrice:8500.00, cooperationStatus:'正常', remark:'供货周期3天，批量采购可优惠5%', createTime:'2026-04-23 10:10:00', createBy:'admin' },
    { supplierId:'GYS20260423002', supplierName:'鑫源防腐材料厂', contactPerson:'陈伟', contactPhone:'13677889900', supplierAddress:'天津市滨海新区', supplyMaterial:'防腐油漆、环氧涂料', cooperationPrice:320.00, cooperationStatus:'正常', remark:'主要供应环氧煤沥青防腐漆', createTime:'2026-04-18 09:00:00', createBy:'purchase01' },
    { supplierId:'GYS20260423003', supplierName:'华海保温材料公司', contactPerson:'林小燕', contactPhone:'0532-66778899', supplierAddress:'山东省青岛市城阳区', supplyMaterial:'保温棉、聚氨酯泡沫', cooperationPrice:180.00, cooperationStatus:'正常', remark:'国标保温材料供应商', createTime:'2026-04-05 14:00:00', createBy:'admin' },
    { supplierId:'GYS20260423004', supplierName:'盛达螺栓配件厂', contactPerson:'周成', contactPhone:'13344556677', supplierAddress:'河北省沧州市', supplyMaterial:'螺栓、螺母、垫片', cooperationPrice:15.00, cooperationStatus:'暂停', remark:'质量问题暂停合作', createTime:'2026-01-10 10:00:00', createBy:'admin' },
  ],
  employees: [
    { employeeId:'YGB20260401001', employeeName:'张管理', department:'系统管理', position:'系统管理员', phone:'13800000001', role:'admin', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401002', employeeName:'李销售', department:'销售部', position:'销售经理', phone:'13800000002', role:'sales', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401003', employeeName:'王采购', department:'采购部', position:'采购专员', phone:'13800000003', role:'purchase', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401004', employeeName:'刘仓库', department:'仓储部', position:'仓库主管', phone:'13800000004', role:'warehouse', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401005', employeeName:'陈生产', department:'生产部', position:'生产主任', phone:'13800000005', role:'production', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401006', employeeName:'赵财务', department:'财务部', position:'财务总监', phone:'13800000006', role:'finance', status:'在职', createTime:'2026-04-01 08:00:00' },
    { employeeId:'YGB20260401007', employeeName:'孙老板', department:'管理层', position:'厂长', phone:'13800000007', role:'boss', status:'在职', createTime:'2026-04-01 08:00:00' },
  ],
  materials: [
    { materialId:'YL20260001', materialCode:'YL-FL-CS-DN100', materialName:'碳钢法兰毛坯 DN100', category:'原材料', spec:'DN100 PN16', unit:'件', stockQty:850, safeQty:200, price:45.00, supplierId:'GYS20260423001', status:'正常' },
    { materialId:'YL20260002', materialCode:'YL-FL-SS-DN200', materialName:'不锈钢法兰毛坯 DN200', category:'原材料', spec:'DN200 PN16 304SS', unit:'件', stockQty:120, safeQty:100, price:185.00, supplierId:'GYS20260423001', status:'正常' },
    { materialId:'YL20260003', materialCode:'YL-FC-EP-20KG', materialName:'环氧煤沥青防腐漆', category:'原材料', spec:'20kg/桶', unit:'桶', stockQty:45, safeQty:50, price:320.00, supplierId:'GYS20260423002', status:'预警' },
    { materialId:'YL20260004', materialCode:'YL-BW-PU-50MM', materialName:'聚氨酯保温棉 50mm', category:'原材料', spec:'50mm厚，1m宽', unit:'米', stockQty:2800, safeQty:500, price:28.00, supplierId:'GYS20260423003', status:'正常' },
    { materialId:'BCP20260001', materialCode:'BC-FL-DN100', materialName:'DN100碳钢法兰（未防腐）', category:'半成品', spec:'DN100 PN16 加工完成', unit:'件', stockQty:230, safeQty:50, price:0, supplierId:'', status:'正常' },
    { materialId:'CP20260001', materialCode:'CP-FL-CS-DN100', materialName:'DN100碳钢法兰（成品）', category:'成品', spec:'DN100 PN16 防腐完成', unit:'件', stockQty:380, safeQty:100, price:0, supplierId:'', status:'正常' },
    { materialId:'CP20260002', materialCode:'CP-GD-DN200-FC', materialName:'DN200防腐保温管道 1米', category:'成品', spec:'DN200 环氧漆+保温层', unit:'米', stockQty:150, safeQty:80, price:0, supplierId:'', status:'正常' },
  ],
  products: [
    { productId:'SP20260001', productCode:'SP-FL-CS-DN100-PN16', productName:'DN100碳钢法兰 PN16', spec:'DN100 PN16 碳钢', unit:'件', salePrice:128.00, costPrice:82.00, productionCycle:'3天', status:'在售' },
    { productId:'SP20260002', productCode:'SP-FL-SS-DN200-PN16', productName:'DN200不锈钢法兰 PN16', spec:'DN200 PN16 304SS', unit:'件', salePrice:580.00, costPrice:340.00, productionCycle:'5天', status:'在售' },
    { productId:'SP20260003', productCode:'SP-GD-DN200-FC-BW', productName:'DN200防腐保温管道', spec:'DN200 环氧漆+50mm保温', unit:'米', salePrice:285.00, costPrice:195.00, productionCycle:'2天', status:'在售' },
    { productId:'SP20260004', productCode:'SP-FL-CS-DN150-PN25', productName:'DN150碳钢法兰 PN25', spec:'DN150 PN25 碳钢', unit:'件', salePrice:198.00, costPrice:125.00, productionCycle:'4天', status:'在售' },
    { productId:'SP20260005', productCode:'SP-GD-DN300-FC-BW', productName:'DN300防腐保温管道', spec:'DN300 环氧漆+75mm保温', unit:'米', salePrice:485.00, costPrice:320.00, productionCycle:'3天', status:'已停产' },
  ],
  processes: [
    { processId:'GX001', processCode:'GX-FL-001', processName:'法兰锻造成型', processType:'法兰生产', duration:'4小时/批次', equipment:'锻压机', worker:'熟练工2人', remark:'法兰毛坯热锻成型' },
    { processId:'GX002', processCode:'GX-FL-002', processName:'法兰车削加工', processType:'法兰生产', duration:'2小时/件', equipment:'数控车床', worker:'技工1人', remark:'密封面精加工' },
    { processId:'GX003', processCode:'GX-FC-001', processName:'管道除锈处理', processType:'防腐保温', duration:'1小时/10米', equipment:'喷砂机', worker:'防腐工1人', remark:'Sa2.5级除锈' },
    { processId:'GX004', processCode:'GX-FC-002', processName:'防腐漆涂刷', processType:'防腐保温', duration:'30分钟/10米+干燥4小时', equipment:'喷涂设备', worker:'防腐工1人', remark:'两道环氧漆，干膜厚度≥200μm' },
    { processId:'GX005', processCode:'GX-BW-001', processName:'保温层缠绕', processType:'防腐保温', duration:'2小时/10米', equipment:'缠绕机', worker:'保温工1人', remark:'保温棉缠绕+铝皮防护层' },
    { processId:'GX006', processCode:'GX-QC-001', processName:'成品质检', processType:'质量控制', duration:'30分钟/批次', equipment:'检测仪器', worker:'质检员1人', remark:'外观+尺寸+涂层厚度检验' },
  ],
  outsourcingVendors: [
    { vendorId:'WX001', vendorCode:'WX-DJ-001', vendorName:'盛鑫锻造厂', serviceType:'法兰锻造', contactPerson:'刘老板', contactPhone:'13766554433', address:'本市工业区', price:35.00, unit:'件', cooperationStatus:'正常', remark:'承接DN300以上大法兰锻造' },
    { vendorId:'WX002', vendorCode:'WX-FC-001', vendorName:'华丰防腐工程公司', serviceType:'高端防腐处理', contactPerson:'周总', contactPhone:'13588997766', address:'天津市', price:280.00, unit:'10米', cooperationStatus:'正常', remark:'承接高温高压特殊防腐' },
  ],
  salesQuotes: [
    { quoteId:'BJ20260423001', quoteDate:'2026-04-23', customerId:'KH20260423001', customerName:'XX市政工程有限公司', productName:'DN200防腐保温管道', qty:500, unit:'米', unitPrice:285.00, totalAmount:142500.00, validDays:30, status:'已转订单', remark:'含安装指导', createBy:'李销售' },
    { quoteId:'BJ20260422001', quoteDate:'2026-04-22', customerId:'KH20260423002', customerName:'华北石化设备厂', productName:'DN100碳钢法兰 PN16', qty:200, unit:'件', unitPrice:125.00, totalAmount:25000.00, validDays:15, status:'报价中', remark:'', createBy:'李销售' },
    { quoteId:'BJ20260420001', quoteDate:'2026-04-20', customerId:'KH20260423004', customerName:'振华化工集团', productName:'DN150碳钢法兰 PN25', qty:300, unit:'件', unitPrice:195.00, totalAmount:58500.00, validDays:30, status:'已过期', remark:'', createBy:'李销售' },
  ],
  salesOrders: [
    { orderId:'SO20260423001', orderDate:'2026-04-23', customerId:'KH20260423001', customerName:'XX市政工程有限公司', productName:'DN200防腐保温管道', qty:500, unit:'米', unitPrice:285.00, totalAmount:142500.00, deliveryDate:'2026-05-15', status:'生产中', auditStatus:'已审核', remark:'项目工地急需，优先安排', createBy:'李销售' },
    { orderId:'SO20260420001', orderDate:'2026-04-20', customerId:'KH20260423002', customerName:'华北石化设备厂', productName:'DN100碳钢法兰 PN16', qty:300, unit:'件', unitPrice:128.00, totalAmount:38400.00, deliveryDate:'2026-05-05', status:'待排产', auditStatus:'已审核', remark:'', createBy:'李销售' },
    { orderId:'SO20260418001', orderDate:'2026-04-18', customerId:'KH20260423004', customerName:'振华化工集团', productName:'DN300防腐保温管道', qty:200, unit:'米', unitPrice:485.00, totalAmount:97000.00, deliveryDate:'2026-04-30', status:'已完成', auditStatus:'已审核', remark:'已发货', createBy:'李销售' },
    { orderId:'SO20260415001', orderDate:'2026-04-15', customerId:'KH20260423003', customerName:'东方管道工程公司', productName:'DN200不锈钢法兰 PN16', qty:100, unit:'件', unitPrice:580.00, totalAmount:58000.00, deliveryDate:'2026-05-10', status:'已发货', auditStatus:'已审核', remark:'', createBy:'李销售' },
    { orderId:'SO20260410001', orderDate:'2026-04-10', customerId:'KH20260423002', customerName:'华北石化设备厂', productName:'DN100碳钢法兰 PN16', qty:500, unit:'件', unitPrice:128.00, totalAmount:64000.00, deliveryDate:'2026-04-25', status:'逾期', auditStatus:'已审核', remark:'客户要求推迟交期', createBy:'李销售' },
  ],
  purchaseApplies: [
    { applyId:'CGQ20260423001', applyDate:'2026-04-23', materialId:'YL20260003', materialName:'环氧煤沥青防腐漆', qty:100, unit:'桶', reason:'库存不足，低于安全库存', urgency:'紧急', status:'待审核', createBy:'王采购' },
    { applyId:'CGQ20260422001', applyDate:'2026-04-22', materialId:'YL20260001', materialName:'碳钢法兰毛坯 DN100', qty:500, unit:'件', reason:'生产订单SO20260420001需求', urgency:'普通', status:'已审核', createBy:'王采购' },
    { applyId:'CGQ20260420001', applyDate:'2026-04-20', materialId:'YL20260002', materialName:'不锈钢法兰毛坯 DN200', qty:200, unit:'件', reason:'备库存', urgency:'普通', status:'已转采购单', createBy:'王采购' },
  ],
  purchaseOrders: [
    { purchaseId:'CG20260423001', purchaseDate:'2026-04-23', supplierId:'GYS20260423002', supplierName:'鑫源防腐材料厂', materialName:'环氧煤沥青防腐漆', qty:100, unit:'桶', unitPrice:320.00, totalAmount:32000.00, deliveryDate:'2026-04-26', status:'待到货', auditStatus:'已审核', remark:'' },
    { purchaseId:'CG20260422001', purchaseDate:'2026-04-22', supplierId:'GYS20260423001', supplierName:'XX钢材有限公司', materialName:'碳钢法兰毛坯 DN100', qty:500, unit:'件', unitPrice:45.00, totalAmount:22500.00, deliveryDate:'2026-04-25', status:'已入库', auditStatus:'已审核', remark:'' },
    { purchaseId:'CG20260415001', purchaseDate:'2026-04-15', supplierId:'GYS20260423001', supplierName:'XX钢材有限公司', materialName:'不锈钢法兰毛坯 DN200', qty:200, unit:'件', unitPrice:185.00, totalAmount:37000.00, deliveryDate:'2026-04-20', status:'已入库', auditStatus:'已审核', remark:'' },
  ],
  productionPlans: [
    { planId:'SC20260423001', planDate:'2026-04-23', orderId:'SO20260423001', orderName:'XX市政-DN200防腐保温管道', productName:'DN200防腐保温管道', planQty:500, unit:'米', startDate:'2026-04-24', endDate:'2026-05-14', status:'生产中', progress:35, createBy:'陈生产' },
    { planId:'SC20260422001', planDate:'2026-04-22', orderId:'SO20260420001', orderName:'华北石化-DN100法兰', productName:'DN100碳钢法兰 PN16', planQty:300, unit:'件', startDate:'2026-04-23', endDate:'2026-05-04', status:'生产中', progress:60, createBy:'陈生产' },
    { planId:'SC20260418001', planDate:'2026-04-18', orderId:'SO20260418001', orderName:'振华化工-DN300防腐管道', productName:'DN300防腐保温管道', planQty:200, unit:'米', startDate:'2026-04-19', endDate:'2026-04-29', status:'已完成', progress:100, createBy:'陈生产' },
  ],
  dispatches: [
    { dispatchId:'PG20260423001', dispatchDate:'2026-04-23', planId:'SC20260423001', planName:'XX市政-DN200防腐保温管道', processName:'管道除锈处理', worker:'防腐工组-张X', qty:200, unit:'米', startDate:'2026-04-24', endDate:'2026-04-25', status:'进行中', remark:'' },
    { dispatchId:'PG20260423002', dispatchDate:'2026-04-23', planId:'SC20260422001', planName:'华北石化-DN100法兰', processName:'法兰车削加工', worker:'机加工组-王X', qty:150, unit:'件', startDate:'2026-04-23', endDate:'2026-04-24', status:'已完成', remark:'' },
    { dispatchId:'PG20260422001', dispatchDate:'2026-04-22', planId:'SC20260422001', planName:'华北石化-DN100法兰', processName:'法兰锻造成型', worker:'锻造组-刘X', qty:300, unit:'件', startDate:'2026-04-22', endDate:'2026-04-23', status:'已完成', remark:'' },
  ],
  workReports: [
    { reportId:'BG20260423001', reportDate:'2026-04-23', dispatchId:'PG20260423001', processName:'管道除锈处理', worker:'张X', completedQty:80, unqualifiedQty:2, unit:'米', status:'待审核', remark:'发现2米管道有严重锈蚀，已单独存放', photo:'有' },
    { reportId:'BG20260423002', reportDate:'2026-04-23', dispatchId:'PG20260423002', processName:'法兰车削加工', worker:'王X', completedQty:150, unqualifiedQty:0, unit:'件', status:'已审核', remark:'', photo:'无' },
  ],
  outsourcingOrders: [
    { osId:'WX20260420001', applyDate:'2026-04-20', vendorId:'WX001', vendorName:'盛鑫锻造厂', service:'法兰锻造', qty:50, unit:'件', unitPrice:35.00, totalAmount:1750.00, sendDate:'2026-04-21', receiveDate:'', status:'已发出待回收', reconcileStatus:'待对账' },
    { osId:'WX20260415001', applyDate:'2026-04-15', vendorId:'WX002', vendorName:'华丰防腐工程公司', service:'高端防腐处理', qty:100, unit:'10米', unitPrice:280.00, totalAmount:28000.00, sendDate:'2026-04-16', receiveDate:'2026-04-22', status:'已回收', reconcileStatus:'已对账' },
  ],
  inventoryLogs: [
    { logId:'RK20260423001', logDate:'2026-04-23 09:15:00', type:'采购入库', materialName:'碳钢法兰毛坯 DN100', qty:500, unit:'件', refId:'CG20260422001', operator:'刘仓库', remark:'' },
    { logId:'CK20260423001', logDate:'2026-04-23 10:30:00', type:'生产领料', materialName:'碳钢法兰毛坯 DN100', qty:300, unit:'件', refId:'SC20260422001', operator:'刘仓库', remark:'生产计划领料' },
    { logId:'RK20260422001', logDate:'2026-04-22 14:00:00', type:'生产入库', materialName:'DN100碳钢法兰（成品）', qty:150, unit:'件', refId:'SC20260418002', operator:'刘仓库', remark:'' },
    { logId:'CK20260422001', logDate:'2026-04-22 16:00:00', type:'销售出库', materialName:'DN300防腐保温管道', qty:200, unit:'米', refId:'SO20260418001', operator:'刘仓库', remark:'客户：振华化工集团' },
    { logId:'RK20260421001', logDate:'2026-04-21 09:00:00', type:'采购入库', materialName:'不锈钢法兰毛坯 DN200', qty:200, unit:'件', refId:'CG20260415001', operator:'刘仓库', remark:'' },
  ],
  financials: {
    receivable: [
      { recId:'YS20260423001', orderId:'SO20260418001', customerName:'振华化工集团', orderAmount:97000.00, receivedAmount:50000.00, unpaidAmount:47000.00, dueDate:'2026-05-18', status:'部分回款', remark:'' },
      { recId:'YS20260415001', orderId:'SO20260415001', customerName:'东方管道工程公司', orderAmount:58000.00, receivedAmount:58000.00, unpaidAmount:0, dueDate:'2026-05-15', status:'已结清', remark:'' },
      { recId:'YS20260410001', orderId:'SO20260410001', customerName:'华北石化设备厂', orderAmount:64000.00, receivedAmount:0, unpaidAmount:64000.00, dueDate:'2026-04-25', status:'逾期未收', remark:'多次催款中' },
    ],
    payable: [
      { payId:'YF20260423001', purchaseId:'CG20260423001', supplierName:'鑫源防腐材料厂', amount:32000.00, paidAmount:0, unpaidAmount:32000.00, dueDate:'2026-05-26', status:'未付款', remark:'' },
      { payId:'YF20260415001', purchaseId:'CG20260415001', supplierName:'XX钢材有限公司', amount:37000.00, paidAmount:37000.00, unpaidAmount:0, dueDate:'2026-05-15', status:'已付款', remark:'' },
      { payId:'YF20260410001', purchaseId:'CG20260422001', supplierName:'XX钢材有限公司', amount:22500.00, paidAmount:10000.00, unpaidAmount:12500.00, dueDate:'2026-05-22', status:'部分付款', remark:'' },
    ],
    expenses: [
      { expId:'FY20260423001', expDate:'2026-04-23', expType:'水电费', amount:8500.00, payer:'赵财务', status:'已付', remark:'4月水电费' },
      { expId:'FY20260422001', expDate:'2026-04-22', expType:'运输费', amount:3200.00, payer:'李销售', status:'已付', remark:'振华化工发货运费' },
      { expId:'FY20260420001', expDate:'2026-04-20', expType:'工资', amount:128000.00, payer:'赵财务', status:'已付', remark:'4月工资发放' },
      { expId:'FY20260418001', expDate:'2026-04-18', expType:'设备维修', amount:5800.00, payer:'陈生产', status:'待付', remark:'锻压机液压系统维修' },
    ],
    costOrders: [
      { costId:'COST20260418001', orderId:'SO20260418001', productName:'DN300防腐保温管道', qty:200, materialCost:38400.00, laborCost:8000.00, outsourcingCost:28000.00, overheadCost:5600.00, totalCost:80000.00, saleAmount:97000.00, grossProfit:17000.00, grossMargin:'17.5%' },
      { costId:'COST20260415001', orderId:'SO20260415001', productName:'DN200不锈钢法兰', qty:100, materialCost:18500.00, laborCost:3200.00, outsourcingCost:0, overheadCost:2800.00, totalCost:24500.00, saleAmount:58000.00, grossProfit:33500.00, grossMargin:'57.8%' },
    ]
  },
  messages: [
    { msgId:'MSG001', type:'预警', title:'库存预警：环氧煤沥青防腐漆低于安全库存', content:'当前库存45桶，安全库存50桶，请及时采购。', time:'2026-04-23 08:30:00', isRead:false, link:'inv-alert', dotColor:'red' },
    { msgId:'MSG002', type:'预警', title:'逾期订单：SO20260410001', content:'订单交期2026-04-25，当前状态逾期，请跟进处理。', time:'2026-04-23 09:00:00', isRead:false, link:'sales-order', dotColor:'red' },
    { msgId:'MSG003', type:'待处理', title:'采购申请待审核：CGQ20260423001', content:'环氧煤沥青防腐漆100桶采购申请待您审核。', time:'2026-04-23 09:15:00', isRead:false, link:'purchase-apply', dotColor:'orange' },
    { msgId:'MSG004', type:'提醒', title:'工序报工待审核：BG20260423001', content:'管道除锈处理报工单，发现2米不合格品，请审核处理。', time:'2026-04-23 10:00:00', isRead:true, link:'prod-workreport', dotColor:'blue' },
    { msgId:'MSG005', type:'提醒', title:'外协待回收：WX20260420001', content:'盛鑫锻造厂法兰锻造50件，已发出待回收。', time:'2026-04-22 14:00:00', isRead:true, link:'prod-outsourcing', dotColor:'blue' },
  ],
  inventoryCheck: [
    { checkId:'PD20260420001', checkDate:'2026-04-20', checkType:'全盘', scope:'原材料', status:'已审核', adjCount:3, operator:'刘仓库', remark:'季度盘点' },
    { checkId:'PD20260410001', checkDate:'2026-04-10', checkType:'抽盘', scope:'成品', status:'已完成', adjCount:1, operator:'刘仓库', remark:'抽查' },
  ],
  inventoryWaste: [
    { wasteId:'FL20260418001', wasteDate:'2026-04-18', materialName:'碳钢法兰毛坯 DN100（报废）', qty:5, unit:'件', reason:'加工超差报废', value:225.00, operator:'陈生产' },
    { wasteId:'FL20260415001', wasteDate:'2026-04-15', materialName:'环氧防腐漆（过期）', qty:2, unit:'桶', reason:'超出保质期', value:640.00, operator:'刘仓库' },
  ],
  salesReconciliation: [
    { recId:'XSDF20260422001', reconcileDate:'2026-04-22', orderId:'SO20260418001', customerName:'振华化工集团', invoiceAmount:97000.00, confirmedAmount:97000.00, status:'已对账', remark:'' },
    { recId:'XSDF20260420001', reconcileDate:'2026-04-20', orderId:'SO20260415001', customerName:'东方管道工程公司', invoiceAmount:58000.00, confirmedAmount:58000.00, status:'已对账', remark:'' },
  ],
  purchaseReconciliation: [
    { recId:'CGDF20260422001', reconcileDate:'2026-04-22', purchaseId:'CG20260422001', supplierName:'XX钢材有限公司', invoiceAmount:22500.00, confirmedAmount:22500.00, status:'已对账', remark:'' },
    { recId:'CGDF20260415001', reconcileDate:'2026-04-21', purchaseId:'CG20260415001', supplierName:'XX钢材有限公司', invoiceAmount:37000.00, confirmedAmount:37000.00, status:'已对账', remark:'' },
  ],
  outboundOrders: [
    { outboundId:'CK20260422001', outboundDate:'2026-04-22', orderId:'SO20260418001', customerName:'振华化工集团', productName:'DN300防腐保温管道', qty:200, unit:'米', status:'已出库', operator:'刘仓库' },
    { outboundId:'CK20260420001', outboundDate:'2026-04-20', orderId:'SO20260415001', customerName:'东方管道工程公司', productName:'DN200不锈钢法兰', qty:100, unit:'件', status:'已出库', operator:'刘仓库' },
  ],
  prodInbound: [
    { inboundId:'SCRK20260422001', inboundDate:'2026-04-22', planId:'SC20260418001', productName:'DN300防腐保温管道', qty:200, unit:'米', type:'成品', operator:'刘仓库', remark:'' },
    { inboundId:'SCRK20260420001', inboundDate:'2026-04-20', planId:'SC20260422001', productName:'DN100碳钢法兰（成品）', qty:150, unit:'件', type:'成品', operator:'刘仓库', remark:'' },
  ],

  // ---- 以下为 app.js 兼容层（统一命名） ----

  // 销售出库（兼容 app.js）
  salesOutbound: [
    { outboundId:'CK20260422001', outboundDate:'2026-04-22', orderId:'SO20260418001', customerName:'振华化工集团', productName:'DN300防腐保温管道', spec:'DN300 环氧漆+75mm保温', quantity:200, unit:'米', status:'已出库', operator:'刘仓库' },
    { outboundId:'CK20260420001', outboundDate:'2026-04-20', orderId:'SO20260415001', customerName:'东方管道工程公司', productName:'DN200不锈钢法兰', spec:'DN200 PN16 304SS', quantity:100, unit:'件', status:'已出库', operator:'刘仓库' },
    { outboundId:'CK20260418001', outboundDate:'2026-04-18', orderId:'SO20260418001', customerName:'振华化工集团', productName:'DN300防腐保温管道', spec:'DN300 环氧漆+75mm保温', quantity:180, unit:'米', status:'已出库', operator:'刘仓库' },
  ],

  // 销售对账（兼容 app.js）
  salesReconcile: [
    { reconcileId:'XSDF20260422001', customerName:'振华化工集团', period:'2026年4月', orderIds:'SO20260418001', totalAmount:97000, paidAmount:50000, balanceAmount:47000, status:'部分对账', createTime:'2026-04-22 10:00:00' },
    { reconcileId:'XSDF20260420001', customerName:'东方管道工程公司', period:'2026年4月', orderIds:'SO20260415001', totalAmount:58000, paidAmount:58000, balanceAmount:0, status:'已完成', createTime:'2026-04-20 14:00:00' },
  ],

  // 采购申请（兼容 app.js）
  purchaseApply: [
    { applyId:'CGQ20260423001', materialName:'环氧煤沥青防腐漆', spec:'20kg/桶', quantity:100, unit:'桶', urgency:'紧急', applicant:'王采购', applyDate:'2026-04-23', status:'待审核', remark:'库存不足，低于安全库存' },
    { applyId:'CGQ20260422001', materialName:'碳钢法兰毛坯 DN100', spec:'DN100 PN16', quantity:500, unit:'件', urgency:'普通', applicant:'王采购', applyDate:'2026-04-22', status:'已审核', remark:'生产订单SO20260420001需求' },
    { applyId:'CGQ20260420001', materialName:'不锈钢法兰毛坯 DN200', spec:'DN200 PN16 304SS', quantity:200, unit:'件', urgency:'普通', applicant:'王采购', applyDate:'2026-04-20', status:'已转采购单', remark:'备库存' },
  ],

  // 采购入库（兼容 app.js）
  purchaseInbound: [
    { inboundId:'CGRK20260423001', purchaseId:'CG20260423001', materialName:'环氧煤沥青防腐漆', spec:'20kg/桶', quantity:100, unit:'桶', inboundDate:'2026-04-26', inspector:'刘仓库', qualifiedQty:98, status:'待入库', remark:'含2桶轻微渗漏' },
    { inboundId:'CGRK20260422001', purchaseId:'CG20260422001', materialName:'碳钢法兰毛坯 DN100', spec:'DN100 PN16', quantity:500, unit:'件', inboundDate:'2026-04-25', inspector:'刘仓库', qualifiedQty:500, status:'已入库', remark:'' },
    { inboundId:'CGRK20260415001', purchaseId:'CG20260415001', materialName:'不锈钢法兰毛坯 DN200', spec:'DN200 PN16 304SS', quantity:200, unit:'件', inboundDate:'2026-04-20', inspector:'刘仓库', qualifiedQty:200, status:'已入库', remark:'' },
  ],

  // 采购对账（兼容 app.js）
  purchaseReconcile: [
    { reconcileId:'CGDF20260422001', supplierName:'XX钢材有限公司', period:'2026年4月', orderIds:'CG20260422001', totalAmount:22500, paidAmount:10000, balanceAmount:12500, status:'部分对账', createTime:'2026-04-22 16:00:00' },
    { reconcileId:'CGDF20260415001', supplierName:'XX钢材有限公司', period:'2026年4月', orderIds:'CG20260415001', totalAmount:37000, paidAmount:37000, balanceAmount:0, status:'已完成', createTime:'2026-04-21 10:00:00' },
  ],

  // 销售订单（兼容 app.js 字段名）
  salesOrders: [
    { orderId:'SO20260423001', customerName:'XX市政工程有限公司', productName:'DN200防腐保温管道', spec:'DN200 环氧漆+50mm保温', quantity:500, unitPrice:285, totalAmount:142500, deadline:'2026-05-15', status:'生产中', createTime:'2026-04-23 09:00:00', salesOrderId:'SO20260423001' },
    { orderId:'SO20260420001', customerName:'华北石化设备厂', productName:'DN100碳钢法兰 PN16', spec:'DN100 PN16 碳钢', quantity:300, unitPrice:128, totalAmount:38400, deadline:'2026-05-05', status:'待排产', createTime:'2026-04-20 10:00:00', salesOrderId:'SO20260420001' },
    { orderId:'SO20260418001', customerName:'振华化工集团', productName:'DN300防腐保温管道', spec:'DN300 环氧漆+75mm保温', quantity:200, unitPrice:485, totalAmount:97000, deadline:'2026-04-30', status:'已完成', createTime:'2026-04-18 08:00:00', salesOrderId:'SO20260418001' },
    { orderId:'SO20260415001', customerName:'东方管道工程公司', productName:'DN200不锈钢法兰 PN16', spec:'DN200 PN16 304SS', quantity:100, unitPrice:580, totalAmount:58000, deadline:'2026-05-10', status:'已发货', createTime:'2026-04-15 14:00:00', salesOrderId:'SO20260415001' },
    { orderId:'SO20260410001', customerName:'华北石化设备厂', productName:'DN100碳钢法兰 PN16', spec:'DN100 PN16 碳钢', quantity:500, unitPrice:128, totalAmount:64000, deadline:'2026-04-25', status:'逾期', createTime:'2026-04-10 09:00:00', salesOrderId:'SO20260410001' },
  ],

  // 报价单（兼容 app.js 字段名）
  salesQuotes: [
    { quoteId:'BJ20260423001', customerName:'XX市政工程有限公司', productName:'DN200防腐保温管道', spec:'DN200 环氧漆+50mm保温', quantity:500, unitPrice:285, totalAmount:142500, validDate:'2026-05-23', status:'已转订单', createTime:'2026-04-23 09:00:00' },
    { quoteId:'BJ20260422001', customerName:'华北石化设备厂', productName:'DN100碳钢法兰 PN16', spec:'DN100 PN16 碳钢', quantity:200, unitPrice:125, totalAmount:25000, validDate:'2026-05-07', status:'报价中', createTime:'2026-04-22 10:00:00' },
    { quoteId:'BJ20260420001', customerName:'振华化工集团', productName:'DN150碳钢法兰 PN25', spec:'DN150 PN25 碳钢', quantity:300, unitPrice:195, totalAmount:58500, validDate:'2026-05-20', status:'已过期', createTime:'2026-04-20 08:00:00' },
  ],

  // 生产订单（从生产计划+订单状态汇总）
  productionOrders: [
    { orderId:'PRD-20260423001', salesOrderId:'SO20260423001', productName:'DN200防腐保温管道', spec:'DN200 环氧漆+50mm保温', quantity:500, deadline:'2026-05-15', status:'生产中', progress:35, priority:'高', createTime:'2026-04-23 09:00:00' },
    { orderId:'PRD-20260422001', salesOrderId:'SO20260420001', productName:'DN100碳钢法兰 PN16', spec:'DN100 PN16 碳钢', quantity:300, deadline:'2026-05-05', status:'生产中', progress:60, priority:'高', createTime:'2026-04-22 09:00:00' },
    { orderId:'PRD-20260418001', salesOrderId:'SO20260418001', productName:'DN300防腐保温管道', spec:'DN300 环氧漆+75mm保温', quantity:200, deadline:'2026-04-30', status:'已完成', progress:100, priority:'中', createTime:'2026-04-18 08:00:00' },
    { orderId:'PRD-20260415001', salesOrderId:'SO20260415001', productName:'DN200不锈钢法兰 PN16', spec:'DN200 PN16 304SS', quantity:100, deadline:'2026-05-10', status:'待发货', progress:100, priority:'中', createTime:'2026-04-15 14:00:00' },
    { orderId:'PRD-20260410001', salesOrderId:'SO20260410001', productName:'DN100碳钢法兰 PN16', spec:'DN100 PN16 碳钢', quantity:500, deadline:'2026-04-25', status:'待生产', progress:0, priority:'低', createTime:'2026-04-10 09:00:00' },
  ],

  // 生产派工（兼容 app.js）
  productionDispatches: [
    { dispatchId:'PG20260423001', planId:'SC20260423001', productName:'DN200防腐保温管道', processName:'管道除锈处理', employeeName:'张X（防腐工组）', quantity:200, dispatchDate:'2026-04-23', status:'进行中', remark:'' },
    { dispatchId:'PG20260423002', planId:'SC20260422001', productName:'DN100碳钢法兰 PN16', processName:'法兰车削加工', employeeName:'王X（机加工组）', quantity:150, dispatchDate:'2026-04-23', status:'已完成', remark:'' },
    { dispatchId:'PG20260422001', planId:'SC20260422001', productName:'DN100碳钢法兰 PN16', processName:'法兰锻造成型', employeeName:'刘X（锻造组）', quantity:300, dispatchDate:'2026-04-22', status:'已完成', remark:'' },
  ],

  // 生产报工（兼容 app.js）
  productionReports: [
    { reportId:'BG20260423001', dispatchId:'PG20260423001', processName:'管道除锈处理', employeeName:'张X', qualifiedQty:80, rejectQty:2, reportDate:'2026-04-23', workingHours:8, status:'待审核', remark:'发现2米管道有严重锈蚀，已单独存放' },
    { reportId:'BG20260423002', dispatchId:'PG20260423002', processName:'法兰车削加工', employeeName:'王X', qualifiedQty:150, rejectQty:0, reportDate:'2026-04-23', workingHours:6, status:'已审核', remark:'' },
  ],

  // 外协管理（兼容 app.js）
  productionOutsource: [
    { outsourceId:'WX20260420001', salesOrderId:'SO20260423001', productName:'DN200防腐保温管道（特殊法兰）', factoryName:'盛鑫锻造厂', quantity:50, outsourceCost:1750, outDate:'2026-04-21', returnDate:'2026-04-28', status:'已发出待回收', remark:'大规格法兰外协锻造' },
    { outsourceId:'WX20260415001', salesOrderId:'SO20260418001', productName:'DN300管道防腐处理', factoryName:'华丰防腐工程公司', quantity:100, outsourceCost:28000, outDate:'2026-04-16', returnDate:'2026-04-22', status:'已回收', remark:'高温高压特殊防腐处理' },
  ],

  // 生产入库（兼容 app.js）
  productionInbound: [
    { inboundId:'SCRK20260422001', planId:'SC20260418001', productName:'DN300防腐保温管道', quantity:200, inboundDate:'2026-04-22', inspector:'刘仓库', qualifiedQty:198, status:'已入库', remark:'含2米轻微划伤，降级处理' },
    { inboundId:'SCRK20260420001', planId:'SC20260422001', productName:'DN100碳钢法兰（成品）', quantity:150, inboundDate:'2026-04-20', inspector:'刘仓库', qualifiedQty:150, status:'已入库', remark:'' },
  ],

  // 库存台账（从物料档案生成）
  inventoryStock: [
    { inventoryId:'YL20260001', category:'钢材', materialName:'碳钢法兰毛坯 DN100', spec:'DN100 PN16', quantity:850, unit:'件', unitPrice:45, totalValue:38250, location:'A区-01-01', remark:'' },
    { inventoryId:'YL20260002', category:'钢材', materialName:'不锈钢法兰毛坯 DN200', spec:'DN200 PN16 304SS', quantity:120, unit:'件', unitPrice:185, totalValue:22200, location:'A区-01-02', remark:'' },
    { inventoryId:'YL20260003', category:'防腐材料', materialName:'环氧煤沥青防腐漆', spec:'20kg/桶', quantity:45, unit:'桶', unitPrice:320, totalValue:14400, location:'B区-02-01', remark:'低于安全库存50桶' },
    { inventoryId:'YL20260004', category:'保温材料', materialName:'聚氨酯保温棉 50mm', spec:'50mm厚，1m宽', quantity:2800, unit:'米', unitPrice:28, totalValue:78400, location:'B区-03-01', remark:'' },
    { inventoryId:'BCP20260001', category:'半成品', materialName:'DN100碳钢法兰（未防腐）', spec:'DN100 PN16 加工完成', quantity:230, unit:'件', unitPrice:0, totalValue:0, location:'C区-01-01', remark:'' },
    { inventoryId:'CP20260001', category:'成品', materialName:'DN100碳钢法兰（成品）', spec:'DN100 PN16 防腐完成', quantity:380, unit:'件', unitPrice:128, totalValue:48640, location:'D区-01-01', remark:'' },
    { inventoryId:'CP20260002', category:'成品', materialName:'DN200防腐保温管道 1米', spec:'DN200 环氧漆+保温层', quantity:150, unit:'米', unitPrice:285, totalValue:42750, location:'D区-02-01', remark:'' },
  ],

  // 库存预警（自动生成）
  inventoryAlerts: [
    { alertId:'KA20260423001', materialName:'环氧煤沥青防腐漆', spec:'20kg/桶', currentStock:45, safetyStock:50, alertLevel:'警告', suggestion:'立即提交采购申请，当前库存仅够9天使用', createTime:'2026-04-23 08:30:00' },
    { alertId:'KA20260422001', materialName:'不锈钢法兰毛坯 DN200', spec:'DN200 PN16 304SS', currentStock:120, safetyStock:100, alertLevel:'提示', suggestion:'库存偏低，建议补充采购', createTime:'2026-04-22 10:00:00' },
    { alertId:'KA20260420001', materialName:'聚氨酯保温棉 50mm', spec:'50mm厚，1m宽', currentStock:2800, safetyStock:500, alertLevel:'正常', suggestion:'库存充足', createTime:'2026-04-20 09:00:00' },
  ],

  // 库存入库记录
  inventoryInbound: [
    { recordId:'RK20260423001', inventoryId:'YL20260001', materialName:'碳钢法兰毛坯 DN100', spec:'DN100 PN16', quantity:500, inboundDate:'2026-04-23', sourceType:'采购入库', sourceNo:'CG20260422001', handler:'刘仓库', remark:'' },
    { recordId:'RK20260421001', inventoryId:'YL20260002', materialName:'不锈钢法兰毛坯 DN200', spec:'DN200 PN16 304SS', quantity:200, inboundDate:'2026-04-21', sourceType:'采购入库', sourceNo:'CG20260415001', handler:'刘仓库', remark:'' },
    { recordId:'RK20260422001', inventoryId:'CP20260001', materialName:'DN100碳钢法兰（成品）', spec:'DN100 PN16 防腐完成', quantity:150, inboundDate:'2026-04-22', sourceType:'生产入库', sourceNo:'SC20260418002', handler:'刘仓库', remark:'' },
  ],

  // 库存出库记录
  inventoryOutbound: [
    { recordId:'CK20260423001', inventoryId:'YL20260001', materialName:'碳钢法兰毛坯 DN100', spec:'DN100 PN16', quantity:300, outboundDate:'2026-04-23', targetType:'生产领料', targetNo:'SC20260422001', handler:'刘仓库', remark:'生产计划领料' },
    { recordId:'CK20260422001', inventoryId:'CP20260002', materialName:'DN200防腐保温管道 1米', spec:'DN200 环氧漆+保温层', quantity:200, outboundDate:'2026-04-22', targetType:'销售出库', targetNo:'SO20260418001', handler:'刘仓库', remark:'客户：振华化工集团' },
  ],

  // 财务收入记录
  financeIncome: [
    { recordId:'SR20260422001', direction:'收入', customerName:'振华化工集团', orderId:'SO20260418001', amount:50000, paymentMethod:'银行转账', recordDate:'2026-04-22', handler:'赵财务', remark:'部分回款' },
    { recordId:'SR20260420001', direction:'收入', customerName:'东方管道工程公司', orderId:'SO20260415001', amount:58000, paymentMethod:'银行转账', recordDate:'2026-04-20', handler:'赵财务', remark:'全额回款' },
  ],

  // 财务支出记录
  financeExpense: [
    { recordId:'ZC20260423001', direction:'支出', supplierName:'XX钢材有限公司', orderId:'CG20260422001', amount:10000, paymentMethod:'银行转账', recordDate:'2026-04-23', handler:'赵财务', remark:'采购预付款' },
    { recordId:'ZC20260422001', direction:'支出', supplierName:'XX钢材有限公司', orderId:'CG20260415001', amount:37000, paymentMethod:'银行转账', recordDate:'2026-04-22', handler:'赵财务', remark:'采购款结清' },
    { recordId:'ZC20260420001', direction:'支出', supplierName:'员工', orderId:'工资单', amount:128000, paymentMethod:'银行转账', recordDate:'2026-04-20', handler:'赵财务', remark:'4月工资发放' },
    { recordId:'ZC20260418001', direction:'支出', supplierName:'设备维修商', orderId:'维修单', amount:5800, paymentMethod:'现金', recordDate:'2026-04-18', handler:'陈生产', remark:'锻压机液压系统维修' },
  ],

  // 应收账款（兼容 app.js）
  financeReceivable: [
    { receivableId:'YS20260423001', customerName:'振华化工集团', orderId:'SO20260418001', amount:97000, paidAmount:50000, balanceAmount:47000, dueDate:'2026-05-18', overdueDays:0, direction:'应收', status:'部分回款', remark:'' },
    { receivableId:'YS20260415001', customerName:'东方管道工程公司', orderId:'SO20260415001', amount:58000, paidAmount:58000, balanceAmount:0, dueDate:'2026-05-15', overdueDays:0, direction:'应收', status:'已结清', remark:'' },
    { receivableId:'YS20260410001', customerName:'华北石化设备厂', orderId:'SO20260410001', amount:64000, paidAmount:0, balanceAmount:64000, dueDate:'2026-04-25', overdueDays:28, direction:'应收', status:'逾期未收', remark:'多次催款中' },
    { receivableId:'YS20260423002', customerName:'XX市政工程有限公司', orderId:'SO20260423001', amount:142500, paidAmount:0, balanceAmount:142500, dueDate:'2026-06-15', overdueDays:0, direction:'应收', status:'待收款', remark:'交货后15日付清' },
  ],

  // 应付账款（兼容 app.js）
  financePayable: [
    { payableId:'YF20260423001', supplierName:'鑫源防腐材料厂', orderId:'CG20260423001', amount:32000, paidAmount:0, balanceAmount:32000, dueDate:'2026-05-26', overdueDays:0, status:'未付款', remark:'' },
    { payableId:'YF20260415001', supplierName:'XX钢材有限公司', orderId:'CG20260415001', amount:37000, paidAmount:37000, balanceAmount:0, dueDate:'2026-05-15', overdueDays:0, status:'已付款', remark:'' },
    { payableId:'YF20260410001', supplierName:'XX钢材有限公司', orderId:'CG20260422001', amount:22500, paidAmount:10000, balanceAmount:12500, dueDate:'2026-05-22', overdueDays:0, status:'部分付款', remark:'' },
  ],

  // 外协厂家（兼容 app.js）
  outsourceFactories: [
    { factoryId:'WX001', factoryName:'盛鑫锻造厂', contactPerson:'刘老板', contactPhone:'13766554433', address:'本市工业区', capability:'承接DN300以上大法兰锻造，热锻+精加工', remark:'合作正常，交期稳定', status:'正常' },
    { factoryId:'WX002', factoryName:'华丰防腐工程公司', contactPerson:'周总', contactPhone:'13588997766', address:'天津市滨海新区', capability:'承接高温高压特殊防腐处理，3PE、环氧粉末涂覆', remark:'技术领先，报价偏高', status:'正常' },
  ],
};
