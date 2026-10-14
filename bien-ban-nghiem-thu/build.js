const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, PageBreak, Footer, Header, PageNumber, TabStopType, PositionalTab,
  PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader, SymbolRun, VerticalAlign, ShadingType,
} = require('docx');

// ---------- Thông tin dự án (lấy theo file mẫu) ----------
const DA = 'Xử lý khẩn cấp kè biển khu du lịch Hải Tiến, xã Hoằng Tiến';
const GT = 'Gói thầu số 06: Thi công xây dựng (bao gồm bảo hiểm công trình, đảm bảo an toàn giao thông)';
const DD = 'Xã Hoằng Tiến, tỉnh Thanh Hóa';
const CDT = 'UBND xã Hoằng Tiến';
const QLDA = 'Ban Quản lý dự án Hàng hải và Đường thủy';
const TVGS = 'Công ty Cổ phần Tư vấn xây dựng Vinasean';
const NT = 'Liên danh Công ty TNHH Hoàng Tuấn – Công ty Cổ phần Đầu tư và Xây dựng Tuấn Linh';
const NT1 = 'Công ty TNHH Hoàng Tuấn';
const NT2 = 'Công ty Cổ phần Đầu tư và Xây dựng Tuấn Linh';
const LD_HEAD = ['LIÊN DANH CÔNG TY TNHH HOÀNG TUẤN -', 'CÔNG TY CP ĐT&XD TUẤN LINH'];
const GD = 'Nguyễn Duy Nở';
const QD = 'Quyết định số 974/QĐ-UBND ngày 17/7/2026 của Chủ tịch UBND xã Hoằng Tiến về việc phê duyệt dự án';
const HD = 'Hợp đồng thi công xây dựng số 02/2026/HĐ-TCXD ngày 23/7/2026 giữa UBND xã Hoằng Tiến và Liên danh Công ty TNHH Hoàng Tuấn – Công ty Cổ phần Đầu tư và Xây dựng Tuấn Linh';
const NOI = 'Hoằng Tiến';

const W = 9072; // bề rộng vùng in (A4, lề trái 30mm, phải 20mm)
const FONT = 'Times New Roman';
const SZ = 26; // 13pt

// ---------- Helpers ----------
const r1 = (t, o = {}) => new TextRun({ text: t, bold: o.b, italics: o.i, underline: o.u ? {} : undefined, size: o.sz ?? SZ, font: FONT, language: { value: 'vi-VN' }, break: o.br });
// Ô vuông "□" dùng ký tự hộp kiểm Wingdings 168 của Word để không bị lỗi font trên máy khác
const BOX = (o = {}) => new SymbolRun({ char: 'F0A8', symbolfont: 'Wingdings', size: o.sz ?? SZ, bold: o.b, italics: o.i });
function runsOf(t, o) {
  const parts = t.split('□');
  const out = [];
  parts.forEach((p, i) => { if (i) out.push(BOX(o)); if (p) out.push(r1(p, o)); });
  return out.length ? out : [r1('', o)];
}
const r = (t, o = {}) => (t.includes('□') ? runsOf(t, o) : r1(t, o));
function runs(x, o) {
  if (typeof x === 'string') return [r(x, o)].flat();
  return x.map(e => (typeof e === 'string' ? r(e, o) : e)).flat();
}
const P = (x, o = {}) => new Paragraph({
  children: runs(x, o),
  alignment: o.c ? AlignmentType.CENTER : o.right ? AlignmentType.RIGHT : o.left ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
  spacing: { before: o.before ?? 0, after: o.after ?? 120, line: o.line ?? 240 },
  indent: o.left2 ? { left: o.left2 } : (o.c || o.right || o.left || o.noInd) ? undefined : { firstLine: o.ind ?? 567 },
  keepNext: o.keepNext,
  tabStops: o.tabs,
});
const B = t => r(t, { b: true });
const I = t => r(t, { i: true });
const BI = t => r(t, { b: true, i: true });
const dotTab = () => new PositionalTab({ alignment: PositionalTabAlignment.RIGHT, relativeTo: PositionalTabRelativeTo.MARGIN, leader: PositionalTabLeader.DOT });
const dots = (label = '', o = {}) => new Paragraph({ children: [...runs(label, o), r('\t')], tabStops: [{ type: TabStopType.RIGHT, position: o.w ?? W, leader: 'dot' }], spacing: { before: 0, after: 120, line: 240 }, indent: o.w ? undefined : { firstLine: 567 } });
const H = t => P([B(t)], { keepNext: true });
const PB = Symbol('pagebreak');
const pb = () => PB; // mỗi biểu mẫu là một section riêng, bắt đầu trang mới
const blank = (n = 1) => Array.from({ length: n }, () => P(''));

// Người tham gia: "- Ông/Bà: ......  Chức vụ: ......"
const person = (name = '', role = '') => new Paragraph({
  children: [r('- Ông (Bà): ' + (name || '')), r('\tChức vụ: ' + (role || '')), ...(role ? [] : [r('\t')])],
  tabStops: [{ type: TabStopType.LEFT, position: 4700, leader: name ? 'none' : 'dot' }, { type: TabStopType.RIGHT, position: W - 284, leader: 'dot' }],
  spacing: { before: 0, after: 120, line: 240 }, indent: { firstLine: 567 },
});

const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };
const LB = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const lineBorders = { top: LB, bottom: LB, left: LB, right: LB, insideHorizontal: LB, insideVertical: LB };

function cell(content, w, o = {}) {
  const ch = Array.isArray(content) && content.length && content[0] instanceof Paragraph ? content
    : [P(content, { c: o.c ?? false, before: 20, after: 20, b: o.b, left: !o.c })];
  return new TableCell({
    children: ch, width: { size: w, type: WidthType.DXA }, columnSpan: o.span,
    verticalAlign: o.v ?? VerticalAlign.CENTER,
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: o.m0 ? { top: 0, bottom: 0, left: 0, right: 0 } : { top: 40, bottom: 40, left: 80, right: 80 },
  });
}
// Bảng dữ liệu có kẻ khung
function grid(widths, header, rows) {
  const scale = W / widths.reduce((a, b) => a + b, 0);
  const ws = widths.map(x => Math.round(x * scale));
  ws[ws.length - 1] += W - ws.reduce((a, b) => a + b, 0);
  const trs = [new TableRow({ tableHeader: true, children: header.map((h, i) => cell(h, ws[i], { c: true, b: true, fill: 'E7E6E6' })) })];
  rows.forEach(row => trs.push(new TableRow({ children: row.map((v, i) => cell(v, ws[i], { c: i === 0 })) })));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: ws, borders: lineBorders, rows: trs });
}
// Khối chữ ký: mảng các hàng, mỗi hàng là mảng {t, n, name}
function sig(rowsDef) {
  const trs = rowsDef.map(row => {
    const w = Math.floor(W / row.length);
    const ws = row.map((_, i) => (i === row.length - 1 ? W - w * (row.length - 1) : w));
    return new TableRow({
      cantSplit: true,
      children: row.map((s, i) => cell([
        P([B(s.t)], { c: true, before: 120, after: 0 }),
        ...(s.t2 ? [P([B(s.t2)], { c: true, before: 0, after: 0 })] : []),
        P([I(s.n ?? '(Ký, ghi rõ họ tên, chức vụ)')], { c: true, before: 0, after: 0 }),
        ...blank(4),
        P('', { c: true, before: 0, after: 120 }),
      ], ws[i], { v: VerticalAlign.TOP })),
    });
  });
  const cols = Math.max(...rowsDef.map(x => x.length));
  const w = Math.floor(W / cols);
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: Array.from({ length: cols }, (_, i) => (i === cols - 1 ? W - w * (cols - 1) : w)), borders: noBorders, rows: trs });
}
// Đường kẻ ngang nét liền dài len, đặt cân đối trong độ rộng cw (NĐ 30/2020/NĐ-CP, Phụ lục I)
const hr = (len, cw = W, after = 60) => new Paragraph({
  children: [], spacing: { before: 0, after, line: 120, lineRule: 'exact' },
  indent: { left: Math.round((cw - len) / 2), right: Math.round((cw - len) / 2) },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 } },
});
// Quốc hiệu, tiêu ngữ + địa danh ngày tháng
// Phần đầu văn bản theo NĐ 30/2020/NĐ-CP: ô trái = tên cơ quan chủ quản (thường), tên cơ quan
// ban hành (đậm), đường kẻ, số ký hiệu; ô phải = Quốc hiệu, Tiêu ngữ, đường kẻ, địa danh ngày tháng.
function quocHieu(o = {}) {
  if (!o.org) {
    return [
      P([B('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM')], { c: true, after: 0 }),
      P([B('Độc lập - Tự do - Hạnh phúc')], { c: true, after: 0 }),
      hr(3300, W, 120),
      P([I((o.place || NOI) + ', ngày ..... tháng ..... năm 2026')], { right: true, after: 0 }),
    ];
  }
  const org = o.org;
  const lw = 3200, rw = W - lw, cw = lw, rcw = rw;
  const left = [
    ...(org.parent || []).map(t => P(t, { c: true, sz: 24, after: 0 })),
    ...org.main.map(t => P([B(t)], { c: true, sz: 24, after: 0 })),
    hr(1300, cw, 60),
    ...(o.no ? [P('Số: ' + o.no, { c: true, after: 0 })] : []),
  ];
  const right = [
    P([B('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM')], { c: true, sz: 24, after: 0 }),
    P([B('Độc lập - Tự do - Hạnh phúc')], { c: true, after: 0 }),
    hr(3150, rcw, 60),
    P([I((o.place || NOI) + ', ngày ..... tháng ..... năm 2026')], { c: true, after: 0 }),
  ];
  return [new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [lw, rw], borders: noBorders,
    rows: [new TableRow({ children: [cell(left, lw, { v: VerticalAlign.TOP, m0: true }), cell(right, rw, { v: VerticalAlign.TOP, m0: true })] })],
  })];
}
const formTag = (code, name) => P([I(code + ' – ' + name)], { right: true, before: 0, after: 60, sz: 22 });
const title = (loai, trich, no) => [
  P([B(loai)], { c: true, sz: 28, before: 240, after: 0 }),
  ...(no ? [P([B('Số: ' + no)], { c: true, after: 0 })] : []),
  ...(trich ? [P([B(trich)], { c: true, sz: 28, after: 0 })] : []),
  hr(2400, W, 240),
];
const projInfo = (extra = []) => [
  P([B('Dự án: '), r(DA + '.')]),
  P([B('Gói thầu: '), r(GT.replace('Gói thầu số 06: ', 'số 06 – ') + '.')]),
  ...extra,
  P([B('Địa điểm xây dựng: '), r(DD + '.')]),
];
const timeBlock = (tai = true) => [
  P('Bắt đầu: ..... giờ ..... phút, ngày ..... tháng ..... năm 2026.', { left2: 284 }),
  P('Kết thúc: ..... giờ ..... phút, ngày ..... tháng ..... năm 2026.', { left2: 284 }),
  ...(tai ? [dots('Tại: ', {})] : []),
];
const party = (label, unit, people) => [P([B(label), B(unit ? ': ' + unit : '')], { keepNext: true }), ...people.map(p => person(p[0], p[1]))];

// ---------- Căn cứ pháp lý dùng chung ----------
const CANCU_PL = [
  '- Luật Xây dựng và các văn bản quy định chi tiết, hướng dẫn thi hành;',
  '- Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ quy định chi tiết một số điều của Luật Xây dựng về quản lý chất lượng, thi công xây dựng và bảo trì công trình xây dựng;',
  '- Thông tư số 32/2026/TT-BXD ngày 22/6/2026 của Bộ trưởng Bộ Xây dựng quy định chi tiết một số điều của Nghị định số 207/2026/NĐ-CP;',
];
const TCVN = [
  '+ QCVN 18:2021/BXD – Quy chuẩn kỹ thuật quốc gia về an toàn trong thi công xây dựng;',
  '+ TCVN 4055:2012 – Tổ chức thi công;',
  '+ TCVN 4447:2012 – Công tác đất. Thi công và nghiệm thu;',
  '+ TCVN 4453:1995 – Kết cấu bê tông và bê tông cốt thép toàn khối. Quy phạm thi công và nghiệm thu;',
  '+ TCVN 9115:2019 – Kết cấu bê tông và bê tông cốt thép lắp ghép. Thi công và nghiệm thu;',
  '+ TCVN 9844:2013 – Yêu cầu thiết kế, thi công và nghiệm thu vải địa kỹ thuật trong xây dựng nền đắp trên đất yếu;',
  '+ Các quy chuẩn, tiêu chuẩn khác được quy định trong Chỉ dẫn kỹ thuật của gói thầu.',
];

const content = [];
const add = (...x) => x.flat().forEach(e => content.push(e));

// =====================================================================
// BÌA
// =====================================================================
function cover() {
  const box = [
    P([B('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM')], { c: true, before: 200, after: 0 }),
    P([B('Độc lập - Tự do - Hạnh phúc')], { c: true, after: 0 }),
    hr(3300, W - 600, 0),
    ...blank(2),
    P([B('CHỦ ĐẦU TƯ: ' + CDT.toUpperCase())], { c: true, after: 0 }),
    P([B('TƯ VẤN QUẢN LÝ DỰ ÁN: ' + QLDA.toUpperCase())], { c: true, after: 0 }),
    P([B('TƯ VẤN GIÁM SÁT: ' + TVGS.toUpperCase())], { c: true, after: 0 }),
    P([B('NHÀ THẦU THI CÔNG: ' + NT.toUpperCase())], { c: true, after: 0 }),
    ...blank(2),
    P([B('HỒ SƠ TRÌNH DUYỆT')], { c: true, sz: 32, after: 120 }),
    P([B('BỘ BIỂU MẪU BIÊN BẢN NGHIỆM THU')], { c: true, sz: 40, after: 0 }),
    P([B('VÀ HỒ SƠ QUẢN LÝ CHẤT LƯỢNG THI CÔNG XÂY DỰNG')], { c: true, sz: 30, after: 200 }),
    P([I('(Lập theo Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ và Thông tư số 32/2026/TT-BXD ngày 22/6/2026 của Bộ Xây dựng)')], { c: true, after: 300 }),
    ...blank(2),
    P([B('DỰ ÁN: '), B(DA.toUpperCase())], { c: true, after: 60 }),
    P([B(GT.toUpperCase())], { c: true, after: 60 }),
    P([B('ĐỊA ĐIỂM: '), B(DD.toUpperCase())], { c: true, after: 300 }),
    ...blank(2),
  ];
  const sigT = new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W / 2, W / 2], borders: noBorders,
    rows: [new TableRow({ children: [
      cell([P([B('TƯ VẤN GIÁM SÁT')], { c: true }), P([B('CHẤP THUẬN')], { c: true }), ...blank(4)], W / 2, { v: VerticalAlign.TOP }),
      cell([P([B('ĐẠI DIỆN LIÊN DANH NHÀ THẦU')], { c: true }), P([B('CÔNG TY TNHH HOÀNG TUẤN')], { c: true }), ...blank(4)], W / 2, { v: VerticalAlign.TOP }),
    ] })],
  });
  const outer = new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    borders: { top: { style: BorderStyle.DOUBLE, size: 12, color: '000000' }, bottom: { style: BorderStyle.DOUBLE, size: 12, color: '000000' }, left: { style: BorderStyle.DOUBLE, size: 12, color: '000000' }, right: { style: BorderStyle.DOUBLE, size: 12, color: '000000' } },
    rows: [new TableRow({ children: [new TableCell({ width: { size: W, type: WidthType.DXA }, margins: { top: 200, bottom: 200, left: 300, right: 300 }, children: [...box, sigT, ...blank(1), P([B('THANH HÓA, NĂM 2026')], { c: true, after: 200 })] })] })],
  });
  add(outer, pb());
}

// =====================================================================
// TỜ TRÌNH
// =====================================================================
function toTrinh() {
  add(quocHieu({ org: { main: LD_HEAD }, no: '......../TTr-HT-TL', place: 'Thanh Hóa' }));
  add(title('TỜ TRÌNH', 'Về việc chấp thuận Bộ biểu mẫu biên bản nghiệm thu và hồ sơ quản lý chất lượng thi công xây dựng áp dụng cho Gói thầu số 06: Thi công xây dựng (Bao gồm bảo hiểm công trình, đảm bảo ATGT). Công trình: ' + DA));
  add(P('Kính gửi:', { left2: 1400, after: 0 }));
  add(P('- UBND xã Hoằng Tiến (Chủ đầu tư);', { left2: 2400, before: 0, after: 0 }));
  add(P('- ' + QLDA + ' (Tư vấn quản lý dự án);', { left2: 2400, before: 0, after: 0 }));
  add(P('- ' + TVGS + ' (Tư vấn giám sát).', { left2: 2400, before: 0, after: 160 }));
  add(P('Căn cứ Luật Xây dựng và các văn bản quy định chi tiết, hướng dẫn thi hành;', { ind: 567 }));
  add(P('Căn cứ Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ quy định chi tiết một số điều của Luật Xây dựng về quản lý chất lượng, thi công xây dựng và bảo trì công trình xây dựng (có hiệu lực từ ngày 01/7/2026);', { ind: 567 }));
  add(P('Căn cứ Thông tư số 32/2026/TT-BXD ngày 22/6/2026 của Bộ trưởng Bộ Xây dựng quy định chi tiết một số điều của Nghị định số 207/2026/NĐ-CP;', { ind: 567 }));
  add(P('Căn cứ ' + QD + ';', { ind: 567 }));
  add(P('Căn cứ ' + HD + ' về việc thi công ' + GT + '. Công trình: ' + DA + ';', { ind: 567 }));
  add(P('Căn cứ Hồ sơ thiết kế bản vẽ thi công, Chỉ dẫn kỹ thuật và tiến độ thi công đã được phê duyệt.', { ind: 567 }));
  add(P(NT + ' là nhà thầu thi công Gói thầu số 06 thuộc dự án ' + DA + '. Để thống nhất hình thức, nội dung hồ sơ quản lý chất lượng trong suốt quá trình thi công, nghiệm thu và bàn giao công trình theo quy định mới tại Nghị định số 207/2026/NĐ-CP và Thông tư số 32/2026/TT-BXD (thay thế các quy định trước đây tại Nghị định số 06/2021/NĐ-CP), Liên danh đã rà soát, chỉnh sửa bộ biểu mẫu đang sử dụng, cụ thể:', { ind: 567 }));
  add(P('1. Chỉnh sửa căn cứ pháp lý, nội dung và thành phần ký của các biên bản nghiệm thu vật liệu, công việc xây dựng, giai đoạn/bộ phận công trình và hoàn thành hạng mục công trình/công trình theo đúng Điều 14, Điều 22, Điều 23 và Điều 24 Nghị định số 207/2026/NĐ-CP;', { ind: 567 }));
  add(P('2. Loại bỏ các nội dung không còn phù hợp: viện dẫn Nghị định số 06/2021/NĐ-CP; các nội dung dành cho hợp đồng BOT, BTL và "Doanh nghiệp dự án"; thành phần "Cơ quan nhà nước có thẩm quyền" ký biên bản nghiệm thu; biên bản "nghiệm thu thanh toán" (thay bằng Bảng xác nhận khối lượng hoàn thành theo hợp đồng); các mẫu bị trùng số hiệu;', { ind: 567 }));
  add(P('3. Bổ sung các biểu mẫu còn thiếu: Biên bản kiểm tra sự phù hợp năng lực của nhà thầu; Biên bản bàn giao mặt bằng, tim mốc thi công; Biên bản lấy mẫu thí nghiệm; Biên bản bàn giao công trình đưa vào sử dụng.', { ind: 567 }));
  add(P('Bộ biểu mẫu gồm 15 mẫu (có Danh mục kèm theo). Liên danh kính đề nghị Chủ đầu tư, Tư vấn quản lý dự án và Tư vấn giám sát xem xét, chấp thuận để Nhà thầu áp dụng thống nhất cho Gói thầu số 06.', { ind: 567 }));
  add(P([I('(Có Bộ biểu mẫu kèm theo)')], { ind: 567 }));
  add(P('Xin trân trọng cảm ơn!', { ind: 567, after: 240 }));
  add(new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [4300, W - 4300], borders: noBorders,
    rows: [new TableRow({ children: [
      cell([P([BI('Nơi nhận:')], { left: true, before: 0, after: 0, sz: 24 }), P('- Như Kính gửi;', { left: true, before: 0, after: 0, sz: 22 }), P('- Lưu: VT, VP.', { left: true, before: 0, after: 0, sz: 22 })], 4300, { v: VerticalAlign.TOP }),
      cell([P([B('ĐẠI DIỆN LIÊN DANH')], { c: true, before: 0, after: 0 }), P([B('CÔNG TY TNHH HOÀNG TUẤN')], { c: true, before: 0, after: 0 }), P([B('GIÁM ĐỐC')], { c: true, before: 0, after: 0 }), ...blank(4), P([B(GD)], { c: true })], W - 4300, { v: VerticalAlign.TOP }),
    ] })],
  }));
  add(P('', { after: 120 }));
  // Ý kiến của TVGS và TVQLDA
  const op = (t) => cell([P([B(t)], { c: true }), dots('', { w: W / 2 - 200 }), dots('', { w: W / 2 - 200 }), dots('', { w: W / 2 - 200 }), P([I('Ngày ..... tháng ..... năm 2026')], { c: true }), P([I('(Ký, ghi rõ họ tên, chức vụ)')], { c: true }), ...blank(3)], W / 2, { v: VerticalAlign.TOP });
  add(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W / 2, W / 2], borders: lineBorders, rows: [new TableRow({ cantSplit: true, children: [op('Ý KIẾN CỦA TƯ VẤN GIÁM SÁT'), op('Ý KIẾN CỦA TƯ VẤN QUẢN LÝ DỰ ÁN')] })] }));
  add(pb());
}

// =====================================================================
// DANH MỤC
// =====================================================================
const FORMS = [
  ['BM-01', 'Phiếu yêu cầu nghiệm thu', 'Điều 22, 23, 24 NĐ 207/2026', 'Sửa (tách từ Mẫu 2 cũ, dùng chung cho các cấp nghiệm thu)'],
  ['BM-02', 'Biên bản kiểm tra sự phù hợp năng lực của nhà thầu (nhân lực, thiết bị, phòng thí nghiệm)', 'Quy định về giám sát thi công xây dựng – NĐ 207/2026', 'Bổ sung'],
  ['BM-03', 'Biên bản bàn giao mặt bằng, tim mốc thi công', 'Quy định về quản lý thi công xây dựng – NĐ 207/2026', 'Bổ sung'],
  ['BM-04', 'Biên bản lấy mẫu thí nghiệm vật liệu', 'Điều 14 NĐ 207/2026', 'Bổ sung'],
  ['BM-05', 'Biên bản nghiệm thu vật liệu, sản phẩm, cấu kiện, thiết bị trước khi đưa vào sử dụng', 'Điều 14 NĐ 207/2026', 'Sửa (Mẫu 1 cũ)'],
  ['BM-06', 'Biên bản nghiệm thu công việc xây dựng', 'Điều 22 NĐ 207/2026', 'Sửa (Mẫu 2 cũ)'],
  ['BM-07', 'Biên bản nghiệm thu giai đoạn thi công xây dựng / bộ phận công trình xây dựng', 'Điều 23 NĐ 207/2026', 'Sửa (Mẫu 3 cũ)'],
  ['BM-08', 'Biên bản nghiệm thu hoàn thành hạng mục công trình / công trình xây dựng đưa vào sử dụng', 'Điều 24 NĐ 207/2026', 'Sửa, gộp (Mẫu 3* và Mẫu 4 cũ)'],
  ['BM-09', 'Biên bản bàn giao hạng mục công trình / công trình đưa vào sử dụng', 'Luật Xây dựng; NĐ 207/2026', 'Bổ sung (tách phần bàn giao khỏi Mẫu 4 cũ)'],
  ['BM-10', 'Bảng xác nhận khối lượng hoàn thành theo hợp đồng (phục vụ thanh toán)', 'Hợp đồng xây dựng', 'Thay thế Mẫu 5 cũ "Nghiệm thu thanh toán"'],
  ['BM-11', 'Biên bản kiểm tra, xử lý vi phạm chất lượng tại hiện trường', 'NĐ 207/2026', 'Sửa (Mẫu 7 cũ)'],
  ['BM-12', 'Biên bản xử lý kỹ thuật tại hiện trường', 'NĐ 207/2026', 'Sửa (Mẫu 8 cũ)'],
  ['BM-13', 'Nhật ký thi công xây dựng công trình', 'Khoản 13 Điều 15, Phụ lục IIa NĐ 207/2026', 'Sửa'],
  ['BM-14', 'Bản vẽ hoàn công – mẫu dấu bản vẽ hoàn công', 'Phụ lục IIb NĐ 207/2026', 'Sửa'],
  ['BM-15', 'Danh mục hồ sơ hoàn thành công trình', 'Điều 28, Phụ lục VII NĐ 207/2026', 'Sửa'],
];
function danhMuc() {
  add(P([B('DANH MỤC BIỂU MẪU')], { c: true, sz: 28, before: 0, after: 0 }));
  add(P([I('(Kèm theo Tờ trình số ......../TTr-HT-TL ngày ..... /...../2026 của ' + NT + ')')], { c: true, after: 120 }));
  add(grid([600, 1000, 3600, 2200, 2000], ['TT', 'Ký hiệu', 'Tên biểu mẫu', 'Căn cứ', 'Ghi chú'], FORMS.map((f, i) => [String(i + 1), ...f])));
  add(H('Các mẫu loại bỏ khỏi bộ mẫu cũ và lý do:'));
  [
    '- Mẫu 5 "Biên bản nghiệm thu thanh toán khối lượng xây lắp hoàn thành": Nghị định số 207/2026/NĐ-CP không quy định loại nghiệm thu này. Việc xác định khối lượng thanh toán thực hiện theo hợp đồng và quy định về hợp đồng xây dựng, nên thay bằng Bảng xác nhận khối lượng hoàn thành (BM-10).',
    '- Mẫu 6 "Phiếu yêu cầu nghiệm thu, nhật ký thi công": chỉ có tiêu đề, không có nội dung. Đã thay bằng BM-01 và BM-13.',
    '- Mẫu 7 "Hồ sơ hoàn công công trình" bị trùng số hiệu với Mẫu 7 "Xử lý vi phạm": đánh số lại thành BM-14 và BM-15.',
    '- Mẫu 3* "Nghiệm thu hoàn thành công trình" trùng nội dung với Mẫu 4 và có ghi chú dành cho hợp đồng BOT, BTL: gộp vào BM-08.',
    '- Thành phần "Cơ quan nhà nước có thẩm quyền" ký biên bản nghiệm thu hoàn thành: cơ quan chuyên môn về xây dựng chỉ kiểm tra công tác nghiệm thu và ra văn bản thông báo kết quả kiểm tra, không ký biên bản nghiệm thu của chủ đầu tư.',
    '- Các cụm từ "Doanh nghiệp dự án", "Nghị định 06/2021/NĐ-CP" và tiêu chuẩn TCVN 5308:1991 (đã được thay bằng QCVN 18:2021/BXD).',
  ].forEach(t => add(P(t, { ind: 0 })));
  add(H('Lưu ý khi sử dụng:'));
  [
    '- Các phần "....." do người lập điền theo thực tế. Chữ in nghiêng trong ngoặc là hướng dẫn ghi, cần xóa khi phát hành biên bản.',
    '- Thời hạn: người giám sát thi công của chủ đầu tư phải nghiệm thu kịp thời, không quá 24 giờ kể từ khi nhận được yêu cầu nghiệm thu công việc xây dựng của nhà thầu; trường hợp không đồng ý nghiệm thu thì phải thông báo lý do bằng văn bản cho nhà thầu (Điều 22 NĐ 207/2026).',
    '- Biên bản nghiệm thu công việc có thể lập cho từng công việc hoặc lập chung cho nhiều công việc của một hạng mục theo trình tự thi công (Điều 22 NĐ 207/2026).',
    '- Việc nghiệm thu của chủ đầu tư không thay thế, không làm giảm trách nhiệm của nhà thầu về chất lượng phần việc do mình thực hiện.',
  ].forEach(t => add(P(t)));
  add(pb());
}

// =====================================================================
// BM-01 Phiếu yêu cầu nghiệm thu
// =====================================================================
function bm01() {
  add(formTag('BM-01', 'Phiếu yêu cầu nghiệm thu'));
  add(quocHieu());
  add(title('PHIẾU YÊU CẦU NGHIỆM THU', null, '......../PYCNT-HT-TL'));
  add(projInfo());
  add(P([B('Kính gửi: ')], { after: 0 }));
  add(P('- ' + QLDA + ' (Tư vấn quản lý dự án);', { left2: 1100, before: 0, after: 0 }));
  add(P('- ' + TVGS + ' (Tư vấn giám sát).', { left2: 1100, before: 0, after: 60 }));
  add(P('Căn cứ Điều 22 (Điều 23, Điều 24) Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ; căn cứ kết quả tự kiểm tra của Nhà thầu, Nhà thầu đã hoàn thành và tự kiểm tra đạt yêu cầu các công việc dưới đây. Đề nghị Tư vấn giám sát (Tư vấn quản lý dự án) kiểm tra hiện trường và tổ chức nghiệm thu:', { ind: 567 }));
  add(P([B('Cấp nghiệm thu: '), r('□ Vật liệu, sản phẩm, thiết bị   □ Công việc xây dựng   □ Giai đoạn / bộ phận công trình   □ Hoàn thành hạng mục / công trình')]));
  add(grid([500, 2600, 2300, 1900, 1700], ['TT', 'Tên đối tượng / công việc đề nghị nghiệm thu', 'Vị trí, lý trình, khối lượng', 'Thời gian đề nghị', 'Hồ sơ kèm theo'],
    [['1', '', '', '..... giờ ..... ngày ...../...../2026', ''], ['2', '', '', '', ''], ['3', '', '', '', '']]));
  add(P('Nhà thầu cam kết đã thi công đúng hồ sơ thiết kế được phê duyệt, chỉ dẫn kỹ thuật và tiêu chuẩn áp dụng; đã chuẩn bị đầy đủ nhân lực, thiết bị, dụng cụ đo kiểm và hồ sơ phục vụ công tác nghiệm thu.', { ind: 567, before: 100 }));
  add(P([B('Hồ sơ kèm theo: '), I('(kết quả thí nghiệm, bản vẽ hoàn công, phiếu đo đạc...)')]));
  const lw = W / 2;
  add(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [lw, lw], borders: noBorders, rows: [new TableRow({ cantSplit: true, children: [
    cell([P([B('Ý KIẾN CỦA TƯ VẤN GIÁM SÁT')], { c: true }), P([I('□ Đồng ý tổ chức nghiệm thu vào hồi ..... giờ ..... ngày ...../...../2026. Yêu cầu Nhà thầu chuẩn bị đầy đủ thiết bị, dụng cụ phục vụ kiểm tra, nghiệm thu.')]), P([I('□ Không đồng ý. Lý do: ...........................................')]), P([I('(Ký, ghi rõ họ tên)')], { c: true }), ...blank(4)], lw, { v: VerticalAlign.TOP }),
    cell([P([B('ĐẠI DIỆN NHÀ THẦU THI CÔNG')], { c: true }), P([B('CHỈ HUY TRƯỞNG')], { c: true }), P([I('(Ký, ghi rõ họ tên)')], { c: true }), ...blank(5)], lw, { v: VerticalAlign.TOP }),
  ] })] }));
  add(pb());
}

// Thành phần chuẩn
const P_TVGS = () => party('Đại diện Tư vấn giám sát', TVGS, [['Lê Ngọc Đông', 'Tư vấn giám sát viên'], ['Lê Đại Dương', 'Tư vấn giám sát viên']]);
const P_TVGS_TRUONG = () => party('Đại diện Tư vấn giám sát', TVGS, [['', 'Tư vấn giám sát trưởng'], ['Lê Ngọc Đông', 'Tư vấn giám sát viên']]);
const P_NT = () => [P([B('Đại diện Nhà thầu thi công: '), B(NT)], { keepNext: true }),
  P([I('- Thành viên đứng đầu liên danh: ' + NT1)], { keepNext: true }), person('Đinh Trọng Bình', 'Chỉ huy trưởng công trường'), person('Lê Công Trung', 'Cán bộ kỹ thuật thi công trực tiếp'),
  P([I('- Thành viên liên danh: ' + NT2)], { keepNext: true }), person('', 'Cán bộ kỹ thuật thi công trực tiếp')];
const P_QLDA = () => party('Đại diện Tư vấn quản lý dự án', QLDA, [['', ''], ['', '']]);
const P_CDT = () => party('Đại diện Chủ đầu tư', CDT, [['', ''], ['', '']]);
const P_TK = () => party('Đại diện Nhà thầu thiết kế', '..........................................', [['', 'Chủ nhiệm / chủ trì thiết kế'], ['', '']]);

// =====================================================================
// BM-02 Kiểm tra năng lực nhà thầu
// =====================================================================
function bm02() {
  add(formTag('BM-02', 'Kiểm tra sự phù hợp năng lực nhà thầu'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Kiểm tra sự phù hợp năng lực của nhà thầu thi công xây dựng so với hồ sơ dự thầu và hợp đồng', '......../BBKT-NL'));
  add(projInfo());
  add(H('I. Thành phần tham gia kiểm tra:'));
  add(P_QLDA(), P_TVGS_TRUONG(), P_NT());
  add(H('II. Thời gian, địa điểm kiểm tra:'));
  add(timeBlock());
  add(H('III. Căn cứ kiểm tra:'));
  add(P('- Hồ sơ dự thầu, hồ sơ đề xuất và ' + HD + ';'));
  add(P('- Biện pháp thi công, kế hoạch quản lý chất lượng của nhà thầu được chấp thuận;'));
  add(P('- Quy định về giám sát thi công xây dựng tại Nghị định số 207/2026/NĐ-CP.'));
  add(H('IV. Kết quả kiểm tra:'));
  add(P([BI('1. Nhân lực chủ chốt')]));
  add(grid([500, 2200, 2000, 1800, 1300, 1300], ['TT', 'Họ và tên', 'Vị trí đảm nhận', 'Chứng chỉ hành nghề / số, hạng', 'Theo HSDT', 'Thực tế'],
    [['1', 'Đinh Trọng Bình', 'Chỉ huy trưởng', '', '', ''], ['2', 'Lê Công Trung', 'Cán bộ kỹ thuật', '', '', ''], ['3', '', 'Cán bộ an toàn lao động', '', '', ''], ['4', '', '', '', '', '']]));
  add(P([BI('2. Máy móc, thiết bị thi công chủ yếu')], { before: 100 }));
  add(grid([500, 2800, 1300, 1300, 1600, 1600], ['TT', 'Tên thiết bị, công suất', 'Số lượng HSDT', 'Số lượng thực tế', 'Kiểm định / đăng kiểm (số, hạn)', 'Đánh giá'],
    [['1', 'Máy đào ......m³', '', '', '', ''], ['2', 'Máy ủi ......CV', '', '', '', ''], ['3', 'Ô tô tự đổ ......T', '', '', '', ''], ['4', 'Máy toàn đạc, máy thủy bình', '', '', '', '']]));
  add(P([BI('3. Phòng thí nghiệm, đơn vị thí nghiệm hợp tác')], { before: 100 }));
  add(dots('- Tên đơn vị, mã số LAS-XD / quyết định công nhận: '));
  add(dots('- Phạm vi phép thử phù hợp với yêu cầu của gói thầu: '));
  add(H('V. Kết luận:'));
  add(P('□ Năng lực thực tế của Nhà thầu phù hợp với hồ sơ dự thầu và hợp đồng.'));
  add(P('□ Chưa phù hợp, yêu cầu Nhà thầu bổ sung/thay thế trước ngày ...../...../2026: '));
  add(dots(''));
  add(sig([[{ t: 'TƯ VẤN QUẢN LÝ DỰ ÁN' }, { t: 'TƯ VẤN GIÁM SÁT' }, { t: 'NHÀ THẦU THI CÔNG', name: 'Đinh Trọng Bình' }]]));
  add(pb());
}

// =====================================================================
// BM-03 Bàn giao mặt bằng, tim mốc
// =====================================================================
function bm03() {
  add(formTag('BM-03', 'Bàn giao mặt bằng, tim mốc'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Bàn giao mặt bằng, tim mốc thi công', '......../BBBG-MB'));
  add(projInfo([dots('Hạng mục / đoạn tuyến: ')]));
  add(H('I. Thành phần tham gia:'));
  add(P([B('1. Bên giao:')]));
  add(P_QLDA(), P_TK(), P_TVGS());
  add(P([B('2. Bên nhận:')]));
  add(P_NT());
  add(H('II. Thời gian, địa điểm:'));
  add(timeBlock());
  add(H('III. Nội dung bàn giao:'));
  add(P([BI('1. Mặt bằng thi công: '), r('phạm vi từ Km ......... đến Km ......... ; hiện trạng: ')]));
  add(dots(''));
  add(P([BI('2. Hệ thống mốc tọa độ, cao độ:')]));
  add(grid([600, 1700, 1800, 1800, 1500, 1700], ['TT', 'Tên mốc', 'X (m)', 'Y (m)', 'Cao độ H (m)', 'Ghi chú (hệ tọa độ, tình trạng)'],
    [['1', '', '', '', '', ''], ['2', '', '', '', '', ''], ['3', '', '', '', '', ''], ['4', '', '', '', '', '']]));
  add(P([BI('3. Các công trình ngầm, công trình lân cận cần bảo vệ: ')], { before: 100 }));
  add(dots(''));
  add(H('IV. Trách nhiệm các bên:'));
  add(P('- Nhà thầu thi công có trách nhiệm bảo vệ, gửi mốc, kiểm tra định kỳ hệ thống mốc trong suốt quá trình thi công; phát triển lưới khống chế thi công và báo cáo Tư vấn giám sát kiểm tra trước khi sử dụng.'));
  add(P('- Mọi sai lệch về mốc, mặt bằng so với hồ sơ thiết kế phải được các bên lập biên bản xử lý kỹ thuật hiện trường (BM-12).'));
  add(sig([[{ t: 'TƯ VẤN QUẢN LÝ DỰ ÁN' }, { t: 'NHÀ THẦU THIẾT KẾ' }], [{ t: 'TƯ VẤN GIÁM SÁT', name: 'Lê Ngọc Đông' }, { t: 'NHÀ THẦU THI CÔNG', name: 'Đinh Trọng Bình' }]]));
  add(pb());
}

// =====================================================================
// BM-04 Lấy mẫu thí nghiệm
// =====================================================================
function bm04() {
  add(formTag('BM-04', 'Lấy mẫu thí nghiệm'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Lấy mẫu thí nghiệm vật liệu', '......../BBLM'));
  add(projInfo([dots('Hạng mục sử dụng: ')]));
  add(H('I. Thành phần tham gia:'));
  add(P_TVGS(), P_NT());
  add(party('Đại diện đơn vị thí nghiệm', '..........................................', [['', '']]));
  add(H('II. Thời gian, địa điểm lấy mẫu:'));
  add(timeBlock());
  add(H('III. Nội dung lấy mẫu:'));
  add(grid([500, 1800, 1500, 1300, 1200, 1500, 1500], ['TT', 'Tên vật liệu, chủng loại', 'Nguồn gốc / nhà sản xuất', 'Khối lượng lô', 'Số lượng mẫu', 'Chỉ tiêu thí nghiệm', 'Tiêu chuẩn lấy mẫu, thử'],
    [['1', 'Đá hộc', '', '', '', '', ''], ['2', 'Đá 4x6, đá 2x4', '', '', '', '', ''], ['3', 'Xi măng bền sun phát', '', '', '', '', ''], ['4', 'Thép', '', '', '', '', ''], ['5', 'Vải địa kỹ thuật', '', '', '', '', ''], ['6', 'Ống Geotube', '', '', '', '', '']]));
  add(P('Mẫu được lấy ngẫu nhiên tại hiện trường dưới sự chứng kiến của các bên, niêm phong, có chữ ký của đại diện các bên trên nhãn niêm phong và được chuyển đến phòng thí nghiệm ............................................ trong ngày.', { before: 100 }));
  add(sig([[{ t: 'TƯ VẤN GIÁM SÁT', name: 'Lê Ngọc Đông' }, { t: 'ĐƠN VỊ THÍ NGHIỆM' }, { t: 'NHÀ THẦU THI CÔNG', name: 'Lê Công Trung' }]]));
  add(pb());
}

// =====================================================================
// BM-05 Nghiệm thu vật liệu
// =====================================================================
function bm05() {
  add(formTag('BM-05', 'Nghiệm thu vật liệu, sản phẩm, cấu kiện, thiết bị'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Nghiệm thu vật liệu, sản phẩm, cấu kiện, thiết bị trước khi đưa vào sử dụng cho công trình', '......../BBNT-VL'));
  add(projInfo([dots('Hạng mục sử dụng: ')]));
  add(H('1. Đối tượng nghiệm thu: ') , P([I('(ghi rõ tên vật liệu, sản phẩm, cấu kiện, thiết bị và lô nghiệm thu)')]));
  add(grid([500, 2000, 1500, 1500, 1000, 1200, 1300], ['TT', 'Tên vật liệu, sản phẩm, cấu kiện, thiết bị', 'Chủng loại, quy cách', 'Nhà sản xuất, xuất xứ', 'Đơn vị', 'Khối lượng (lô)', 'Số sê-ri / số lô (nếu có)'],
    [['1', 'Khối bê tông đúc sẵn: bậc cầu thang 2T', '', 'Đúc tại bãi', 'khối', '', ''], ['2', 'Khối chặn chân', '', '', 'khối', '', ''], ['3', 'Khối vai kè', '', '', 'khối', '', ''], ['4', '', '', '', '', '', '']]));
  add(H('2. Thành phần trực tiếp nghiệm thu:'));
  add(P_TVGS(), P_NT());
  add(P([I('(Trường hợp có nhà thầu cung ứng, nhà thầu phụ thì bổ sung đại diện tham gia)')]));
  add(H('3. Thời gian và địa điểm nghiệm thu:'));
  add(timeBlock());
  add(H('4. Căn cứ nghiệm thu:'));
  [
    'a) Phiếu yêu cầu nghiệm thu số ......... ngày ......... của Nhà thầu;',
    'b) Hồ sơ thiết kế bản vẽ thi công, chỉ dẫn kỹ thuật và những thay đổi thiết kế đã được chấp thuận;',
    'c) ' + HD + ';',
    'd) Chứng chỉ xuất xứ (CO), chứng chỉ chất lượng (CQ), giấy chứng nhận hợp quy/hợp chuẩn, nhãn mác hàng hóa (nếu có);',
    'đ) Kết quả thí nghiệm, kiểm định mẫu vật liệu số ......... ngày ......... (theo biên bản lấy mẫu số .........);',
    'e) Điều 14 Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ.',
  ].forEach(t => add(P(t, { left2: 284 })));
  add(H('5. Đánh giá chất lượng:'));
  add(grid([500, 3700, 2600, 2300], ['TT', 'Nội dung kiểm tra', 'Yêu cầu theo thiết kế / CDKT', 'Kết quả kiểm tra'],
    [['1', 'Chủng loại, quy cách, xuất xứ so với hợp đồng', '', ''], ['2', 'Kích thước hình học, ngoại quan', '', ''], ['3', 'Kết quả thí nghiệm (cường độ, ...)', '', ''], ['4', 'Hồ sơ chất lượng (CO, CQ, hợp quy)', '', '']]));
  add(H('6. Các ý kiến khác (nếu có):'));
  add(dots(''));
  add(H('7. Kết luận:'));
  add(P('□ Chấp nhận nghiệm thu, đồng ý cho Nhà thầu đưa vật liệu, sản phẩm, cấu kiện, thiết bị nêu trên vào sử dụng cho công trình.'));
  add(P('□ Không chấp nhận nghiệm thu. Lý do và yêu cầu xử lý: '));
  add(dots(''));
  add(P([I('Việc nghiệm thu của chủ đầu tư không làm giảm trách nhiệm của nhà thầu cung ứng và nhà thầu thi công về chất lượng vật liệu, sản phẩm, cấu kiện, thiết bị đã cung cấp, sử dụng.')]));
  add(sig([[{ t: 'NGƯỜI GIÁM SÁT THI CÔNG', t2: 'CỦA CHỦ ĐẦU TƯ (TVGS)', n: '(Ký, ghi rõ họ tên)', name: 'Lê Ngọc Đông' }, { t: 'NGƯỜI PHỤ TRÁCH KỸ THUẬT', t2: 'CỦA NHÀ THẦU THI CÔNG', n: '(Ký, ghi rõ họ tên)', name: 'Lê Công Trung' }]]));
  add(P([B('Hồ sơ nghiệm thu gồm: ')], { before: 120 }));
  add(P('- Biên bản nghiệm thu này và bảng kết quả thí nghiệm, kiểm định kèm theo;'));
  add(P('- Các tài liệu làm căn cứ nghiệm thu (CO, CQ, chứng nhận hợp quy...).'));
  add(pb());
}

// =====================================================================
// BM-06 Nghiệm thu công việc xây dựng
// =====================================================================
function bm07() {
  add(formTag('BM-06', 'Nghiệm thu công việc xây dựng'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Nghiệm thu công việc xây dựng', '......../BBNT-CV'));
  add(projInfo([P([B('Hạng mục: '), I('(ví dụ: Cống hộp đúc sẵn BxH = 2x(1,5x1,5)m ngang kênh tại Km3+500)')])]));
  add(H('1. Tên công việc được nghiệm thu: '), P([I('(ghi rõ tên công việc, vị trí, lý trình; có thể lập chung cho nhiều công việc của một hạng mục theo trình tự thi công)')]));
  add(dots(''));
  add(H('2. Thành phần ký biên bản nghiệm thu:'));
  add(P([B('2.1. Người trực tiếp giám sát thi công xây dựng của chủ đầu tư – '), B(TVGS)], { keepNext: true }));
  add(person('Lê Ngọc Đông', 'Tư vấn giám sát viên'), person('Lê Đại Dương', 'Tư vấn giám sát viên'));
  add(P([B('2.2. Người trực tiếp phụ trách kỹ thuật thi công của nhà thầu – '), B(NT)], { keepNext: true }));
  add(P([I('- ' + NT1 + ':')], { keepNext: true }), person('Lê Công Trung', 'Cán bộ kỹ thuật thi công trực tiếp'));
  add(P([I('- ' + NT2 + ':')], { keepNext: true }), person('', 'Cán bộ kỹ thuật thi công trực tiếp'));
  add(P([I('(Nhà thầu liên danh: người phụ trách kỹ thuật của thành viên liên danh nào thi công công việc thì ký biên bản cho phần việc do thành viên đó thực hiện; xóa dòng không sử dụng)')]));
  add(H('3. Thời gian và địa điểm nghiệm thu:'));
  add(timeBlock(false));
  add(P('Tại: công trường ' + DA + '.', { left2: 284 }));
  add(H('4. Đánh giá công việc xây dựng đã thực hiện:'));
  add(P([BI('4.1. Căn cứ nghiệm thu:')]));
  [
    '- Phiếu yêu cầu nghiệm thu số ......../PYCNT-HT-TL ngày ...../...../2026 của Nhà thầu;',
    ...CANCU_PL.slice(1),
    '- Hồ sơ thiết kế bản vẽ thi công được phê duyệt theo ' + QD + ' và các thay đổi thiết kế đã được chấp thuận;',
    '- Chỉ dẫn kỹ thuật kèm theo ' + HD + ';',
    '- Quy chuẩn, tiêu chuẩn áp dụng:',
  ].forEach(t => add(P(t)));
  TCVN.forEach(t => add(P(t, { left2: 284 })));
  [
    '- Biện pháp thi công đã được chấp thuận;',
    '- Biên bản nghiệm thu vật liệu, kết quả thí nghiệm, đo đạc của đối tượng nghiệm thu;',
    '- Nhật ký thi công xây dựng công trình và các văn bản khác có liên quan.',
  ].forEach(t => add(P(t)));
  add(P([BI('4.2. Chất lượng công việc xây dựng '), I('(đối chiếu với thiết kế, chỉ dẫn kỹ thuật, tiêu chuẩn áp dụng):')]));
  add(grid([500, 3100, 2300, 1600, 1500], ['TT', 'Chỉ tiêu kiểm tra', 'Yêu cầu thiết kế / sai số cho phép', 'Kết quả kiểm tra', 'Đánh giá'],
    [['1', 'Vị trí, tim, cao độ', '', '', ''], ['2', 'Kích thước hình học', '', '', ''], ['3', 'Vật liệu sử dụng', '', '', ''], ['4', 'Kết quả thí nghiệm hiện trường (nếu có)', '', '', '']]));
  add(P([BI('4.3. Khối lượng thực hiện: '), r('theo bản vẽ hoàn công kèm theo.')], { before: 80 }));
  add(P([BI('4.4. Các ý kiến khác (nếu có): ')]));
  add(dots(''));
  add(H('5. Kết luận:'));
  add(P('□ Chấp nhận nghiệm thu, đồng ý cho Nhà thầu triển khai công việc tiếp theo.'));
  add(P('□ Không chấp nhận nghiệm thu. Yêu cầu sửa chữa, hoàn thiện (nêu rõ nội dung, thời hạn): '));
  add(dots(''));
  add(sig([[{ t: 'NGƯỜI GIÁM SÁT THI CÔNG', t2: 'CỦA CHỦ ĐẦU TƯ (TVGS)', n: '(Ký, ghi rõ họ tên)', name: 'Lê Ngọc Đông' }, { t: 'KỸ THUẬT THI CÔNG', t2: 'CÔNG TY TNHH HOÀNG TUẤN', n: '(Ký, ghi rõ họ tên)', name: 'Lê Công Trung' }, { t: 'KỸ THUẬT THI CÔNG', t2: 'CÔNG TY CP ĐT&XD TUẤN LINH', n: '(Ký, ghi rõ họ tên)' }]]));
  add(P([B('Hồ sơ nghiệm thu công việc xây dựng gồm:')], { before: 120 }));
  add(P('- Biên bản nghiệm thu công việc xây dựng và các phụ lục kèm theo (nếu có);'));
  add(P('- Bản vẽ hoàn công công việc xây dựng;'));
  add(P('- Các tài liệu làm căn cứ để nghiệm thu.'));
  add(pb());
}

// =====================================================================
// BM-07 Nghiệm thu giai đoạn / bộ phận
// =====================================================================
function bm08() {
  add(formTag('BM-07', 'Nghiệm thu giai đoạn / bộ phận công trình'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Nghiệm thu giai đoạn thi công xây dựng (hoặc bộ phận công trình xây dựng) hoàn thành', '......../BBNT-GĐ'));
  add(projInfo([dots('Hạng mục: ')]));
  add(H('1. Đối tượng nghiệm thu: '), P([I('(ghi rõ tên giai đoạn thi công / bộ phận công trình, phạm vi, lý trình)')]));
  add(dots(''));
  add(H('2. Thành phần trực tiếp nghiệm thu:'));
  add(P_QLDA(), P_TVGS_TRUONG(), P_NT());
  add(P([I('(Bổ sung đại diện Chủ đầu tư, nhà thầu thiết kế nếu theo thỏa thuận giữa chủ đầu tư và các nhà thầu)')]));
  add(H('3. Thời gian và địa điểm nghiệm thu:'));
  add(timeBlock());
  add(H('4. Đánh giá giai đoạn thi công / bộ phận công trình:'));
  add(P([BI('4.1. Tài liệu làm căn cứ nghiệm thu:')]));
  [
    'a) Quy trình kiểm tra, giám sát, nghiệm thu đã được thống nhất giữa chủ đầu tư và các nhà thầu;',
    'b) Phiếu yêu cầu nghiệm thu của Nhà thầu;',
    'c) Hồ sơ thiết kế bản vẽ thi công và những thay đổi thiết kế đã được chấp thuận;',
    'd) Chỉ dẫn kỹ thuật và quy chuẩn, tiêu chuẩn áp dụng;',
    'đ) Các biên bản nghiệm thu công việc xây dựng thuộc giai đoạn / bộ phận đã được nghiệm thu theo Điều 22 Nghị định số 207/2026/NĐ-CP;',
    'e) Các kết quả thí nghiệm, kiểm tra, kiểm định, quan trắc, đo đạc, thử nghiệm, chạy thử có liên quan;',
    'g) Bản vẽ hoàn công giai đoạn / bộ phận công trình;',
    'h) Nhật ký thi công xây dựng và các văn bản khác có liên quan;',
    'i) Điều 23 Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ.',
  ].forEach(t => add(P(t, { left2: 284 })));
  add(P([BI('4.2. Chất lượng thi công xây dựng: '), I('(đối chiếu với thiết kế, tiêu chuẩn, chỉ dẫn kỹ thuật)')]));
  add(dots(''));
  add(P([BI('4.3. Khối lượng thi công xây dựng: '), I('(theo bảng tổng hợp khối lượng kèm theo)')]));
  add(dots(''));
  add(P([BI('4.4. Các ý kiến khác (nếu có): ')]));
  add(dots(''));
  add(H('5. Kết luận:'));
  add(P('□ Chấp nhận nghiệm thu giai đoạn thi công / bộ phận công trình nêu trên, đồng ý cho triển khai giai đoạn thi công xây dựng tiếp theo.'));
  add(P('□ Không chấp nhận nghiệm thu. Yêu cầu sửa chữa, hoàn thiện và các yêu cầu khác: '));
  add(dots(''));
  add(sig([[{ t: 'TƯ VẤN QUẢN LÝ DỰ ÁN' }, { t: 'TƯ VẤN GIÁM SÁT', n: '(Giám sát trưởng ký, ghi rõ họ tên)' }, { t: 'NHÀ THẦU THI CÔNG', n: '(Chỉ huy trưởng ký, ghi rõ họ tên)', name: 'Đinh Trọng Bình' }]]));
  add(P([B('Hồ sơ nghiệm thu gồm:')], { before: 120 }));
  add(P('- Biên bản nghiệm thu giai đoạn / bộ phận công trình và các phụ lục kèm theo;'));
  add(P('- Bảng tổng hợp khối lượng; bản vẽ hoàn công;'));
  add(P('- Các tài liệu làm căn cứ để nghiệm thu.'));
  add(pb());
}

// =====================================================================
// BM-08 Nghiệm thu hoàn thành
// =====================================================================
function bm09() {
  add(formTag('BM-08', 'Nghiệm thu hoàn thành hạng mục / công trình'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Nghiệm thu hoàn thành hạng mục công trình (công trình) xây dựng để đưa vào sử dụng', '......../BBNT-HT'));
  add(projInfo());
  add(H('1. Tên hạng mục công trình / công trình xây dựng được nghiệm thu:'));
  add(dots(''));
  add(P([I('(Ghi rõ quy mô, phạm vi, lý trình, vị trí xây dựng)')]));
  add(H('2. Thời gian và địa điểm nghiệm thu:'));
  add(timeBlock());
  add(H('3. Thành phần ký biên bản nghiệm thu:'));
  add(party('3.1. Chủ đầu tư', CDT, [['', 'Người đại diện theo pháp luật (hoặc người được ủy quyền)']]));
  add(party('3.2. Tư vấn quản lý dự án', QLDA, [['', 'Giám đốc / người được ủy quyền'], ['', 'Cán bộ phụ trách']]));
  add(party('3.3. Tư vấn giám sát', TVGS, [['', 'Người đại diện theo pháp luật (hoặc người được ủy quyền)'], ['', 'Giám sát trưởng']]));
  add(party('3.4. Nhà thầu thi công xây dựng', NT, [[GD, 'Giám đốc ' + NT1 + ' – đại diện liên danh'], ['', 'Đại diện ' + NT2], ['Đinh Trọng Bình', 'Chỉ huy trưởng công trường']]));
  add(party('3.5. Nhà thầu thiết kế xây dựng', '..........................................', [['', 'Người đại diện theo pháp luật (hoặc người được ủy quyền)'], ['', 'Chủ nhiệm thiết kế']]));
  add(P([I('(Nhà thầu thiết kế tham gia khi chủ đầu tư có yêu cầu. Trường hợp có tổng thầu, nhà thầu phụ thì bổ sung đại diện tương ứng)')]));
  add(H('4. Đánh giá về điều kiện nghiệm thu, chất lượng hạng mục công trình / công trình:'));
  add(P([BI('4.1. Tài liệu làm căn cứ nghiệm thu:')]));
  [
    'a) Hồ sơ thiết kế xây dựng được phê duyệt và các thay đổi thiết kế đã được chấp thuận;',
    'b) Chỉ dẫn kỹ thuật, quy chuẩn và tiêu chuẩn áp dụng;',
    'c) Các biên bản nghiệm thu vật liệu, công việc xây dựng, giai đoạn thi công / bộ phận công trình;',
    'd) Kết quả thí nghiệm, quan trắc, đo đạc, kiểm định, thử nghiệm, chạy thử (nếu có);',
    'đ) Bản vẽ hoàn công hạng mục công trình / công trình;',
    'e) Hồ sơ hoàn thành công trình theo Phụ lục VII Nghị định số 207/2026/NĐ-CP;',
    'g) Văn bản chấp thuận của cơ quan có thẩm quyền về phòng cháy chữa cháy, môi trường, an toàn vận hành (nếu thuộc đối tượng);',
    'h) Điều 24 Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ.',
  ].forEach(t => add(P(t, { left2: 284 })));
  add(P([BI('4.2. Điều kiện nghiệm thu: '), I('(các công việc đã thi công theo thiết kế; kết quả thí nghiệm, kiểm định, quan trắc đáp ứng yêu cầu kỹ thuật; hồ sơ hoàn thành đầy đủ)')]));
  add(dots(''));
  add(P([BI('4.3. Chất lượng hạng mục công trình / công trình: '), I('(đối chiếu với thiết kế, quy chuẩn, tiêu chuẩn và yêu cầu kỹ thuật)')]));
  add(dots(''));
  add(P([BI('4.4. Khối lượng hoàn thành: '), I('(theo bảng tổng hợp khối lượng kèm theo)')]));
  add(dots(''));
  add(P([BI('4.5. Các ý kiến khác (nếu có): ')]));
  add(dots(''));
  add(H('5. Kết luận:'));
  add(P('□ Chấp nhận nghiệm thu hoàn thành hạng mục công trình / công trình để đưa vào sử dụng.'));
  add(P('□ Chấp nhận nghiệm thu có điều kiện: công trình cơ bản hoàn thành, còn các tồn tại không ảnh hưởng đến khả năng chịu lực, tuổi thọ, công năng sử dụng và an toàn khai thác (chi tiết tồn tại, biện pháp và thời hạn khắc phục tại Phụ lục kèm theo).'));
  add(P('□ Không chấp nhận nghiệm thu. Lý do và yêu cầu sửa chữa, hoàn thiện: '));
  add(dots(''));
  add(P([B('6. Thời điểm bắt đầu tính thời gian bảo hành: '), r('từ ngày ...../...../2026. Thời gian bảo hành: ......... tháng (theo hợp đồng và quy định).')]));
  add(sig([
    [{ t: 'CHỦ ĐẦU TƯ', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }, { t: 'TƯ VẤN QUẢN LÝ DỰ ÁN', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }],
    [{ t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }, { t: 'ĐẠI DIỆN LIÊN DANH NHÀ THẦU', t2: 'CÔNG TY TNHH HOÀNG TUẤN', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)', name: GD }],
    [{ t: 'NHÀ THẦU THIẾT KẾ', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }, { t: ' ', n: ' ' }],
  ]));
  add(P([B('Hồ sơ nghiệm thu gồm:')], { before: 120 }));
  add(P('- Biên bản nghiệm thu hoàn thành và các phụ lục kèm theo (bảng tổng hợp khối lượng, danh mục tồn tại nếu có);'));
  add(P('- Hồ sơ hoàn thành công trình theo danh mục BM-15;'));
  add(P('- Các tài liệu làm căn cứ để nghiệm thu.'));
  add(P([I('Ghi chú: Đối với công trình thuộc đối tượng kiểm tra công tác nghiệm thu, chủ đầu tư chỉ đưa công trình vào sử dụng sau khi có văn bản thông báo kết quả kiểm tra của cơ quan chuyên môn về xây dựng theo quy định. Cơ quan chuyên môn không ký biên bản này.')], { before: 80 }));
  add(pb());
}

// =====================================================================
// BM-09 Bàn giao
// =====================================================================
function bm10() {
  add(formTag('BM-09', 'Bàn giao công trình đưa vào sử dụng'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Bàn giao hạng mục công trình (công trình) xây dựng đưa vào sử dụng', '......../BBBG'));
  add(projInfo());
  add(H('1. Đối tượng bàn giao: '), dots(''));
  add(H('2. Thành phần:'));
  add(P([B('2.1. Bên giao:')]));
  add(party('- Chủ đầu tư', CDT, [['', '']]));
  add(party('- Tư vấn quản lý dự án', QLDA, [['', '']]));
  add(party('- Nhà thầu thi công', NT, [[GD, 'Giám đốc ' + NT1 + ' – đại diện liên danh'], ['Đinh Trọng Bình', 'Chỉ huy trưởng']]));
  add(party('- Tư vấn giám sát (chứng kiến)', TVGS, [['', '']]));
  add(P([B('2.2. Bên nhận:')]));
  add(party('- Đơn vị quản lý, sử dụng / khai thác công trình', '..........................................', [['', ''], ['', '']]));
  add(H('3. Thời gian, địa điểm:'));
  add(timeBlock());
  add(H('4. Căn cứ bàn giao:'));
  add(P('- Biên bản nghiệm thu hoàn thành hạng mục công trình / công trình số ......../BBNT-HT ngày ...../...../2026;'));
  add(P('- Văn bản thông báo kết quả kiểm tra công tác nghiệm thu của cơ quan chuyên môn về xây dựng số ......... ngày ......... (nếu thuộc đối tượng).'));
  add(H('5. Nội dung bàn giao:'));
  add(P('a) Hiện trạng hạng mục công trình / công trình: '));
  add(dots(''));
  add(P('b) Hồ sơ bàn giao: hồ sơ hoàn công; quy trình vận hành, quy trình bảo trì công trình; danh mục thiết bị, phụ tùng, vật tư dự trữ (nếu có); hồ sơ phục vụ quản lý, sử dụng công trình.'));
  add(P('c) Các tồn tại cần tiếp tục khắc phục trong thời gian bảo hành (nếu có): '));
  add(dots(''));
  add(H('6. Trách nhiệm các bên sau bàn giao:'));
  add(P('- Bên nhận chịu trách nhiệm quản lý, sử dụng, vận hành và bảo trì công trình kể từ ngày bàn giao theo quy trình bảo trì được phê duyệt.'));
  add(P('- Nhà thầu thi công thực hiện nghĩa vụ bảo hành công trình theo hợp đồng và quy định của Nghị định số 207/2026/NĐ-CP.'));
  add(sig([
    [{ t: 'CHỦ ĐẦU TƯ', n: '(Ký, ghi rõ họ tên, đóng dấu)' }, { t: 'TƯ VẤN QUẢN LÝ DỰ ÁN', n: '(Ký, ghi rõ họ tên, đóng dấu)' }],
    [{ t: 'ĐẠI DIỆN LIÊN DANH NHÀ THẦU', t2: 'CÔNG TY TNHH HOÀNG TUẤN', n: '(Ký, ghi rõ họ tên, đóng dấu)', name: GD }, { t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên, đóng dấu)' }],
    [{ t: 'ĐƠN VỊ TIẾP NHẬN QUẢN LÝ, SỬ DỤNG', n: '(Ký, ghi rõ họ tên, đóng dấu)' }, { t: ' ', n: ' ' }],
  ]));
  add(pb());
}

// =====================================================================
// BM-10 Bảng xác nhận khối lượng hoàn thành
// =====================================================================
function bm11() {
  add(formTag('BM-10', 'Xác nhận khối lượng hoàn thành'));
  add(quocHieu());
  add(title('BẢNG XÁC NHẬN', 'Khối lượng hoàn thành theo hợp đồng (đề nghị thanh toán đợt .....)', '......../XNKL'));
  add(projInfo());
  add(P([B('Hợp đồng: '), r(HD + '.')]));
  add(P([B('Thời kỳ xác nhận: '), r('từ ngày ...../...../2026 đến ngày ...../...../2026.')]));
  add(H('1. Căn cứ xác định khối lượng:'));
  add(P('- Hợp đồng thi công xây dựng và các phụ lục hợp đồng;'));
  add(P('- Các biên bản nghiệm thu công việc / giai đoạn / hoàn thành đã được ký số: ...........................................;'));
  add(P('- Bản vẽ hoàn công và hồ sơ thiết kế được duyệt.'));
  add(H('2. Bảng khối lượng hoàn thành:'));
  add(grid([500, 2600, 800, 1200, 1300, 1300, 1300], ['TT', 'Tên công việc', 'Đơn vị', 'KL theo hợp đồng', 'Lũy kế đến hết kỳ trước', 'Thực hiện kỳ này', 'Lũy kế đến hết kỳ này'],
    [['1', '', '', '', '', '', ''], ['2', '', '', '', '', '', ''], ['3', '', '', '', '', '', ''], ['', 'Khối lượng phát sinh (nếu có)', '', '', '', '', '']]));
  add(H('3. Ý kiến các bên:'));
  add(P('Các bên thống nhất khối lượng hoàn thành kỳ này như bảng trên là cơ sở để Nhà thầu lập hồ sơ đề nghị thanh toán theo hợp đồng. Bảng này không thay thế các biên bản nghiệm thu chất lượng theo Nghị định số 207/2026/NĐ-CP.'));
  add(sig([[{ t: 'TƯ VẤN QUẢN LÝ DỰ ÁN', n: '(Ký, ghi rõ họ tên, đóng dấu)' }, { t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên, đóng dấu)' }, { t: 'ĐẠI DIỆN LIÊN DANH NHÀ THẦU', n: '(Ký, ghi rõ họ tên, đóng dấu)', name: GD }]]));
  add(pb());
}

// =====================================================================
// BM-11 Vi phạm chất lượng
// =====================================================================
function bm12() {
  add(formTag('BM-11', 'Kiểm tra, xử lý vi phạm chất lượng'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Kiểm tra, xử lý vi phạm chất lượng tại hiện trường', '......../BBVP'));
  add(H('1. Đối tượng:'));
  add(projInfo([dots('Hạng mục: '), dots('Lý trình: ')]));
  add(H('2. Thành phần trực tiếp tham gia:'));
  add(P_TVGS(), P_NT());
  add(party('Đại diện Tư vấn quản lý dự án (nếu có)', QLDA, [['', '']]));
  add(H('3. Thời gian: '), P('..... giờ ..... phút, ngày ..... tháng ..... năm 2026.'));
  add(P('Qua kiểm tra hiện trường thi công tại hạng mục nêu trên, phát hiện Nhà thầu thi công đã vi phạm các quy định về quản lý chất lượng công trình như sau:'));
  add(H('4. Nội dung vi phạm: '), P([I('(mô tả vi phạm, vị trí, khối lượng, quy định/điều khoản thiết kế, chỉ dẫn kỹ thuật bị vi phạm; kèm ảnh chụp)')]));
  add(dots(''), dots(''));
  add(H('5. Biện pháp xử lý và thời hạn khắc phục:'));
  add(P('□ Tạm dừng thi công phần việc vi phạm.   □ Phá dỡ, làm lại.   □ Sửa chữa, gia cố.   □ Khác.'));
  add(dots(''), dots(''));
  add(P('Thời hạn hoàn thành khắc phục: trước ngày ...../...../2026. Nhà thầu báo cáo kết quả khắc phục bằng văn bản để Tư vấn giám sát kiểm tra lại. Mọi chi phí khắc phục do Nhà thầu chịu.'));
  add(H('6. Ý kiến của Nhà thầu: '), dots(''));
  add(sig([[{ t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên, chức vụ)', name: 'Lê Ngọc Đông' }, { t: 'NHÀ THẦU THI CÔNG', n: '(Ký, ghi rõ họ tên, chức vụ)', name: 'Đinh Trọng Bình' }, { t: 'TƯ VẤN QUẢN LÝ DỰ ÁN', n: '(Ký, ghi rõ họ tên, chức vụ)' }]]));
  add(pb());
}

// =====================================================================
// BM-12 Xử lý kỹ thuật hiện trường
// =====================================================================
function bm13() {
  add(formTag('BM-12', 'Xử lý kỹ thuật hiện trường'));
  add(quocHieu());
  add(title('BIÊN BẢN', 'Xử lý kỹ thuật tại hiện trường', '......../BBXLKT'));
  add(H('1. Đối tượng:'));
  add(projInfo([dots('Hạng mục: '), dots('Lý trình: ')]));
  add(H('2. Thành phần trực tiếp tham gia:'));
  add(P_CDT(), P_QLDA(), P_TK(), P_TVGS_TRUONG(), P_NT());
  add(H('3. Thời gian: '), P('..... giờ ..... phút, ngày ..... tháng ..... năm 2026.'));
  add(P('Qua kiểm tra, đối chiếu hồ sơ thiết kế với thực tế hiện trường, các bên thống nhất như sau:'));
  add(H('4. Mô tả thực trạng tại hiện trường: '), P([I('(nêu rõ sự sai khác giữa thiết kế và thực tế: địa chất, địa hình, cao độ, công trình ngầm...; kèm ảnh, số liệu đo)')]));
  add(dots(''), dots(''), dots(''));
  add(H('5. Biện pháp xử lý kỹ thuật: '));
  add(dots(''), dots(''), dots(''));
  add(P([I('Trường hợp biện pháp xử lý làm thay đổi thiết kế, khối lượng hoặc giá trị hợp đồng thì Nhà thầu thiết kế lập hồ sơ thiết kế điều chỉnh, trình thẩm định, phê duyệt theo quy định trước khi thi công.')]));
  add(H('6. Khối lượng phát sinh tăng / giảm (dự kiến): '), dots(''));
  add(H('7. Ý kiến khác: '), dots(''));
  add(sig([
    [{ t: 'CHỦ ĐẦU TƯ', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }, { t: 'TƯ VẤN QUẢN LÝ DỰ ÁN', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }],
    [{ t: 'NHÀ THẦU THIẾT KẾ', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }, { t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên, chức vụ)' }],
    [{ t: 'NHÀ THẦU THI CÔNG', n: '(Ký, ghi rõ họ tên, chức vụ, đóng dấu)' }, { t: ' ', n: ' ' }],
  ]));
  add(pb());
}

// =====================================================================
// BM-13 Nhật ký thi công
// =====================================================================
function bm14() {
  add(formTag('BM-13', 'Nhật ký thi công xây dựng công trình'));
  add(P([B('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM')], { c: true, before: 0, after: 0 }));
  add(P([B('Độc lập - Tự do - Hạnh phúc')], { c: true, after: 0 }));
  add(hr(3300, W, 600));
  add(P([B('NHẬT KÝ THI CÔNG XÂY DỰNG CÔNG TRÌNH')], { c: true, sz: 36, after: 120 }));
  add(P([B('QUYỂN SỐ: ............')], { c: true, after: 400 }));
  add(P([B('Dự án: '), r(DA)]));
  add(P([B(GT)]));
  add(dots('Hạng mục / đoạn tuyến: Km ............ đến Km '));
  add(P([B('Chủ đầu tư: '), r(CDT)]));
  add(P([B('Tư vấn quản lý dự án: '), r(QLDA)]));
  add(P([B('Tư vấn giám sát: '), r(TVGS)]));
  add(P([B('Nhà thầu thi công: '), r(NT)]));
  add(P('Sổ này gồm ......... trang, đánh số thứ tự từ 01 đến ......... , có đóng dấu giáp lai của Nhà thầu thi công và xác nhận của Chủ đầu tư (Tư vấn quản lý dự án).', { before: 200 }));
  add(P([B('THANH HÓA, NĂM 2026')], { c: true, before: 600 }));
  add(pb());
  add(P([B('HƯỚNG DẪN GHI NHẬT KÝ THI CÔNG')], { c: true, after: 120 }));
  [
    '1. Nhật ký thi công xây dựng công trình do Nhà thầu thi công lập cho gói thầu theo Phụ lục IIa Nghị định số 207/2026/NĐ-CP. Các thành viên liên danh thống nhất trách nhiệm ghi nhật ký cho phần việc do mình thực hiện. Trường hợp có nhà thầu phụ, nhà thầu chính thỏa thuận với nhà thầu phụ về trách nhiệm ghi nhật ký đối với phần việc do nhà thầu phụ thực hiện.',
    '2. Nhật ký được đánh số trang, đóng dấu giáp lai; Chủ đầu tư (Tư vấn quản lý dự án) và Nhà thầu thống nhất về thể thức trước khi sử dụng. Người được phép ghi và ký nhật ký được xác định tại Phần II.',
    '3. Nhật ký được ghi hằng ngày, liên tục từ khi khởi công đến khi hoàn thành công trình; không tẩy xóa, không bỏ trống trang. Nội dung sửa phải gạch bỏ và ký xác nhận. Ngày nghỉ việc ghi rõ lý do.',
    '4. Khi thay đổi người phụ trách ghi nhật ký, người cũ phải ghi: "Tôi khóa sổ ngày ...../...../2026 và bàn giao cho ông (bà) ......... từ ngày ...../...../2026", ký và ghi rõ họ tên.',
    '5. Người giám sát thi công của chủ đầu tư ghi nhận xét về tình hình và chất lượng thi công; nhà thầu ghi ý kiến tiếp thu, giải trình. Các ý kiến phải ghi rõ họ tên, chức vụ, đơn vị và ký.',
    '6. Nhật ký thi công là căn cứ để nghiệm thu và là thành phần của hồ sơ hoàn thành công trình (Phụ lục VII Nghị định số 207/2026/NĐ-CP).',
  ].forEach(t => add(P(t)));
  add(P([B('PHẦN I. THÔNG TIN CHUNG VỀ CÔNG TRÌNH')], { before: 160 }));
  [
    'Tên công trình / hạng mục: ', 'Quyết định phê duyệt dự án: ' + QD.replace('Quyết định ', ''), 'Quyết định phê duyệt thiết kế bản vẽ thi công: ', 'Nhà thầu thiết kế: ', 'Hợp đồng thi công: ' + HD.replace('Hợp đồng thi công xây dựng ', ''), 'Hợp đồng tư vấn giám sát số: ', 'Ngày khởi công theo hợp đồng: ............ ; thực tế: ', 'Ngày hoàn thành theo hợp đồng: ',
  ].forEach(t => add(dots('- ' + t)));
  add(P([B('PHẦN II. DANH SÁCH NHÂN SỰ ĐƯỢC GHI, KÝ NHẬT KÝ')], { before: 160 }));
  add(grid([500, 2200, 2000, 1800, 1300, 1300], ['TT', 'Họ và tên', 'Đơn vị', 'Chức danh', 'Ngày nhận nhiệm vụ', 'Chữ ký mẫu'],
    [['1', 'Lê Ngọc Đông', 'TVGS – Vinasean', 'TVGS viên', '', ''], ['2', 'Lê Đại Dương', 'TVGS – Vinasean', 'TVGS viên', '', ''], ['3', 'Đinh Trọng Bình', 'Hoàng Tuấn', 'Chỉ huy trưởng', '', ''], ['4', 'Lê Công Trung', 'Hoàng Tuấn', 'Cán bộ kỹ thuật', '', ''], ['5', '', 'Tuấn Linh', 'Cán bộ kỹ thuật', '', ''], ['6', '', 'TVQLDA', '', '', '']]));
  add(P([B('PHẦN III. VĂN BẢN LIÊN QUAN')], { before: 160 }));
  add(grid([500, 2200, 2300, 4100], ['TT', 'Văn bản số, ngày', 'Cơ quan ban hành', 'Trích yếu nội dung'], [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', '']]));
  add(pb());
  add(P([B('PHẦN IV. NHẬT KÝ THI CÔNG HẰNG NGÀY')], { c: true }));
  add(P([B('Ngày ..... tháng ..... năm 2026')], { c: true, after: 120 }));
  add(P([B('1. Thời tiết: '), r('Sáng: ............ ; Chiều: ............ ; Đêm: ............')]));
  add(P([B('2. Nhân lực, thiết bị thi công:')]));
  add(dots('a) Nhân lực (cán bộ kỹ thuật, công nhân): '));
  add(dots('b) Máy, thiết bị thi công tại hiện trường: '));
  add(P([B('3. Tình hình thi công:')]));
  add(dots('a) Nội dung, vị trí, khối lượng công việc thực hiện trong ngày: '));
  add(dots(''));
  add(dots('b) Vật liệu nhập về công trường, lấy mẫu thí nghiệm: '));
  add(dots('c) Công việc đã được nghiệm thu trong ngày (số biên bản): '));
  add(P([B('4. Sự cố, hư hỏng và các vấn đề phát sinh trong quá trình thi công:')]));
  add(dots(''));
  add(P([B('5. Kiến nghị và ý kiến chỉ đạo giải quyết của các bên '), I('(Chủ đầu tư, Tư vấn quản lý dự án, giám sát tác giả):')]));
  add(dots(''));
  add(P([B('6. Nhận xét của người giám sát thi công về tình hình và chất lượng công việc '), I('(ghi rõ họ tên, chức vụ, ký):')]));
  add(dots(''));
  add(P([B('7. Ý kiến tiếp thu, giải trình của Nhà thầu:')]));
  add(dots(''));
  add(sig([[{ t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên)', name: 'Lê Ngọc Đông' }, { t: 'NHÀ THẦU THI CÔNG', t2: 'Cán bộ kỹ thuật', n: '(Ký, ghi rõ họ tên)', name: 'Lê Công Trung' }]]));
  add(pb());
}

// =====================================================================
// BM-14 Bản vẽ hoàn công
// =====================================================================
function stamp(cols) {
  const w = Math.floor(W / cols.length);
  const ws = cols.map((_, i) => (i === cols.length - 1 ? W - w * (cols.length - 1) : w));
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: ws, borders: lineBorders,
    rows: [
      new TableRow({ children: [cell([P([B('TÊN NHÀ THẦU THI CÔNG XÂY DỰNG (THÀNH VIÊN LIÊN DANH)')], { c: true, before: 20, after: 20 })], W, { span: cols.length })] }),
      new TableRow({ children: [cell([P([B('BẢN VẼ HOÀN CÔNG')], { c: true, before: 20, after: 0 }), P([I('Ngày ..... tháng ..... năm 2026')], { c: true, before: 0, after: 20 })], W, { span: cols.length })] }),
      new TableRow({ children: cols.map((c, i) => cell([P(c, { c: true, before: 20, after: 0, sz: 22 }), P([I('(Ký, ghi rõ họ tên)')], { c: true, before: 0, after: 0, sz: 22 }), ...blank(3)], ws[i], { v: VerticalAlign.TOP })) }),
    ],
  });
}
function bm15() {
  add(formTag('BM-14', 'Bản vẽ hoàn công – mẫu dấu'));
  add(title('BẢN VẼ HOÀN CÔNG', 'Lập bản vẽ hoàn công và mẫu dấu bản vẽ hoàn công (theo Phụ lục IIb Nghị định số 207/2026/NĐ-CP)'));
  add(H('1. Lập bản vẽ hoàn công:'));
  [
    'a) Bản vẽ hoàn công thể hiện vị trí, kích thước, vật liệu và thiết bị thực tế được sử dụng của công trình, hạng mục công trình, bộ phận công trình đã thi công.',
    'b) Trường hợp kích thước, thông số thực tế không vượt quá sai số cho phép so với thiết kế, được phép chụp (photocopy) bản vẽ thiết kế thi công, các bên liên quan đóng dấu và ký xác nhận lên bản vẽ để làm bản vẽ hoàn công.',
    'c) Trường hợp cần thiết, Nhà thầu thi công vẽ lại bản vẽ hoàn công mới, có khung tên như bản vẽ thiết kế và đóng mẫu dấu bản vẽ hoàn công dưới đây.',
    'd) Đối với bộ phận công trình bị che khuất phải lập bản vẽ hoàn công hoặc đo đạc xác định kích thước, thông số thực tế trước khi thi công công việc tiếp theo.',
    'đ) Trường hợp nhà thầu liên danh, từng thành viên lập bản vẽ hoàn công phần việc do mình thực hiện, không ủy quyền cho thành viên khác.',
    'e) Người giám sát thi công xây dựng của chủ đầu tư kiểm tra, ký xác nhận bản vẽ hoàn công.',
  ].forEach(t => add(P(t, { left2: 284 })));
  add(H('2. Mẫu dấu bản vẽ hoàn công:'));
  add(stamp(['Người lập', 'Chỉ huy trưởng công trường của nhà thầu thi công', 'Người giám sát thi công xây dựng của chủ đầu tư (TVGS)']));
  add(P([I('Hình 1 – Mẫu dấu khi không áp dụng hợp đồng tổng thầu. Kích thước dấu tùy thuộc khổ bản vẽ.')], { c: true, after: 200 }));
  add(stamp(['Người lập', 'Chỉ huy trưởng của nhà thầu phụ', 'Chỉ huy trưởng của tổng thầu', 'Người giám sát thi công của chủ đầu tư (TVGS)']));
  add(P([I('Hình 2 – Mẫu dấu khi áp dụng hợp đồng tổng thầu thi công xây dựng.')], { c: true }));
  add(pb());
}

// =====================================================================
// BM-15 Danh mục hồ sơ hoàn thành
// =====================================================================
function bm16() {
  add(formTag('BM-15', 'Danh mục hồ sơ hoàn thành công trình'));
  add(title('DANH MỤC', 'Hồ sơ hoàn thành công trình (theo Điều 28 và Phụ lục VII Nghị định số 207/2026/NĐ-CP)'));
  add(P([I('Ghi chú: Chủ đầu tư tổ chức lập hồ sơ hoàn thành; mỗi nhà thầu lập và chịu trách nhiệm phần hồ sơ do mình thực hiện. Cột "Tình trạng" ghi: Có / Chưa có / Không thuộc đối tượng.')]));
  const rows = [];
  const grp = (t) => rows.push(['', t, '', '']);
  let n = 0;
  const it = (t) => rows.push([String(++n), t, '', '']);
  grp('A. HỒ SƠ CHUẨN BỊ ĐẦU TƯ VÀ HỢP ĐỒNG');
  ['Quyết định chủ trương đầu tư (nếu có); quyết định phê duyệt dự án đầu tư xây dựng (' + QD.replace('Quyết định ', '') + ') và hồ sơ dự án kèm theo.',
    'Văn bản thẩm định, ý kiến của cơ quan có liên quan đối với dự án.',
    'Văn bản về đất đai, giải phóng mặt bằng; giấy phép xây dựng (trừ trường hợp được miễn).',
    'Văn bản chấp thuận, thỏa thuận về môi trường, an toàn, đấu nối hạ tầng (nếu có).',
    'Quyết định phê duyệt kết quả lựa chọn nhà thầu và các hợp đồng xây dựng giữa chủ đầu tư với các nhà thầu.',
    'Tài liệu chứng minh điều kiện năng lực của các nhà thầu (BM-02).'].forEach(it);
  grp('B. HỒ SƠ KHẢO SÁT, THIẾT KẾ XÂY DỰNG');
  ['Nhiệm vụ, phương án kỹ thuật khảo sát; báo cáo kết quả khảo sát xây dựng; biên bản nghiệm thu kết quả khảo sát.',
    'Kết quả thẩm định, thẩm tra thiết kế; quyết định phê duyệt thiết kế kèm hồ sơ thiết kế (có danh mục bản vẽ) và chỉ dẫn kỹ thuật.',
    'Biên bản nghiệm thu hồ sơ thiết kế xây dựng.',
    'Các văn bản, tài liệu khác có liên quan đến khảo sát, thiết kế.'].forEach(it);
  grp('C. HỒ SƠ QUẢN LÝ THI CÔNG VÀ NGHIỆM THU');
  ['Danh mục các thay đổi thiết kế trong quá trình thi công và các văn bản thẩm định, phê duyệt của cấp có thẩm quyền.',
    'Bản vẽ hoàn công (có danh mục bản vẽ kèm theo) – BM-14.',
    'Kế hoạch tổng hợp về an toàn; biện pháp thi công; kế hoạch, biện pháp kiểm tra, kiểm soát chất lượng thi công.',
    'Biên bản bàn giao mặt bằng, tim mốc (BM-03).',
    'Chứng chỉ xuất xứ, chứng nhận chất lượng, hợp quy, hợp chuẩn, nhãn mác của vật liệu, sản phẩm, thiết bị; biên bản lấy mẫu (BM-04) và biên bản nghiệm thu vật liệu (BM-05).',
    'Các kết quả quan trắc, đo đạc, thí nghiệm trong quá trình thi công.',
    'Nhật ký thi công xây dựng công trình (BM-13).',
    'Các biên bản nghiệm thu công việc xây dựng (BM-06), nghiệm thu giai đoạn / bộ phận công trình (BM-07).',
    'Kết quả thí nghiệm đối chứng, kiểm định chất lượng, thí nghiệm khả năng chịu lực kết cấu (nếu có).',
    'Biên bản xử lý kỹ thuật (BM-12), xử lý vi phạm chất lượng (BM-11) và hồ sơ giải quyết sự cố công trình (nếu có).',
    'Lý lịch thiết bị lắp đặt; quy trình vận hành, khai thác; quy trình bảo trì công trình.',
    'Văn bản chấp thuận của cơ quan có thẩm quyền về phòng cháy chữa cháy, môi trường, an toàn vận hành (nếu thuộc đối tượng).',
    'Văn bản thông báo kết quả kiểm tra công tác nghiệm thu của cơ quan chuyên môn về xây dựng (nếu thuộc đối tượng) và hồ sơ liên quan đến việc kiểm tra.',
    'Biên bản nghiệm thu hoàn thành hạng mục công trình / công trình (BM-08) và phụ lục tồn tại cần khắc phục (nếu có).',
    'Biên bản bàn giao công trình đưa vào sử dụng (BM-09).',
    'Các hồ sơ, tài liệu khác có liên quan trong giai đoạn thi công và nghiệm thu.'].forEach(it);
  add(grid([600, 6000, 1300, 1200], ['TT', 'Tên hồ sơ, tài liệu', 'Tình trạng', 'Ghi chú'], rows));
  add(sig([[{ t: 'TƯ VẤN GIÁM SÁT', n: '(Ký, ghi rõ họ tên)' }, { t: 'NHÀ THẦU THI CÔNG', n: '(Ký, ghi rõ họ tên)' }]]));
}

cover(); toTrinh(); danhMuc();
bm01(); bm02(); bm03(); bm04(); bm05(); bm07(); bm08();
bm09(); bm10(); bm11(); bm12(); bm13(); bm14(); bm15(); bm16();

const doc = new Document({
  creator: NT,
  title: 'Bộ biểu mẫu biên bản nghiệm thu – NĐ 207/2026',
  styles: { default: { document: { run: { font: FONT, size: SZ, language: { value: 'vi-VN' } } } } },
  sections: (() => {
    const groups = [[]];
    content.forEach(e => (e === PB ? groups.push([]) : groups[groups.length - 1].push(e)));
    const header = new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SZ })] })] });
    return groups.filter(g => g.length).map((g, i) => ({
      properties: { titlePage: i === 0, page: { size: { width: 11907, height: 16840 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1701, header: 567, footer: 567 } } },
      headers: i === 0 ? { default: header, first: new Header({ children: [new Paragraph({ children: [] })] }) } : { default: header },
      children: g,
    }));
  })(),
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log('written', process.argv[2]); });
