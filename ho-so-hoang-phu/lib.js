// Thư viện dựng văn bản Word theo thể thức NĐ 30/2020/NĐ-CP (Times New Roman 13-14, A4).
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, Header, PageNumber, TabStopType, VerticalAlign, ShadingType, SymbolRun,
} = require('docx');

const W = 9072; // vùng in A4: lề trái 30mm, phải 20mm
const FONT = 'Times New Roman';
const SZ = 26;

const r1 = (t, o = {}) => new TextRun({ text: t, bold: o.b, italics: o.i, size: o.sz ?? SZ, font: FONT, language: { value: 'vi-VN' } });
const BOX = (o = {}) => new SymbolRun({ char: 'F0A8', symbolfont: 'Wingdings', size: o.sz ?? SZ });
const r = (t, o = {}) => (t.includes('□')
  ? t.split('□').flatMap((p, i) => [...(i ? [BOX(o)] : []), ...(p ? [r1(p, o)] : [])])
  : r1(t, o));
const runs = (x, o) => (typeof x === 'string' ? [r(x, o)] : x.map(e => (typeof e === 'string' ? r(e, o) : e))).flat();
const B = t => r(t, { b: true });
const I = t => r(t, { i: true });
const BI = t => r(t, { b: true, i: true });

const P = (x, o = {}) => new Paragraph({
  children: runs(x, o),
  alignment: o.c ? AlignmentType.CENTER : o.right ? AlignmentType.RIGHT : o.left ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
  spacing: { before: o.before ?? 0, after: o.after ?? 120, line: o.line ?? 260 },
  indent: o.left2 ? { left: o.left2 } : (o.c || o.right || o.left || o.noInd) ? undefined : { firstLine: o.ind ?? 567 },
  keepNext: o.keepNext, pageBreakBefore: o.pb,
});
const hr = (len, cw = W, after = 60) => new Paragraph({
  children: [], spacing: { before: 0, after, line: 120, lineRule: 'exact' },
  indent: { left: Math.round((cw - len) / 2), right: Math.round((cw - len) / 2) },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 } },
});
const blank = (n = 1) => Array.from({ length: n }, () => P('', { after: 0 }));

const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };
const LB = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const lineBorders = { top: LB, bottom: LB, left: LB, right: LB, insideHorizontal: LB, insideVertical: LB };

function cell(content, w, o = {}) {
  const ch = Array.isArray(content) && content.length && content[0] instanceof Paragraph ? content
    : String(content).split('\n').map(t => P(t, { c: o.c, left: !o.c, b: o.b, before: 20, after: 20, sz: o.sz ?? 24, line: 240 }));
  return new TableCell({
    children: ch, width: { size: w, type: WidthType.DXA }, columnSpan: o.span,
    verticalAlign: o.v ?? VerticalAlign.CENTER,
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: o.m0 ? { top: 0, bottom: 0, left: 0, right: 0 } : { top: 30, bottom: 30, left: 70, right: 70 },
  });
}
// Bảng kẻ khung; hàng bắt đầu bằng '#' là hàng nhóm (gộp cột, in đậm)
function table(widths, header, rows, o = {}) {
  const sc = W / widths.reduce((a, b) => a + b, 0);
  const ws = widths.map(x => Math.round(x * sc));
  ws[ws.length - 1] += W - ws.reduce((a, b) => a + b, 0);
  const trs = [new TableRow({ tableHeader: true, cantSplit: true, children: header.map((h, i) => cell(h, ws[i], { c: true, b: true, fill: 'E7E6E6' })) })];
  rows.forEach(row => {
    if (typeof row === 'string' && row.startsWith('#')) {
      trs.push(new TableRow({ cantSplit: true, children: [cell(row.slice(1), W, { span: ws.length, b: true })] }));
    } else {
      trs.push(new TableRow({ cantSplit: true, children: row.map((v, i) => cell(v, ws[i], { c: (o.center || [0]).includes(i) })) }));
    }
  });
  return [new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: ws, borders: lineBorders, rows: trs }), P('', { after: 60 })];
}
// Khối chữ ký: mảng hàng, mỗi ô {t, t2, n, name}
function sig(rowsDef) {
  const cols = Math.max(...rowsDef.map(x => x.length));
  const w = Math.floor(W / cols);
  const trs = rowsDef.map(row => new TableRow({
    cantSplit: true,
    children: row.map(s => cell([
      P([B(s.t)], { c: true, after: 0 }),
      ...(s.t2 ? [P([B(s.t2)], { c: true, after: 0 })] : []),
      P([I(s.n ?? '(Ký, ghi rõ họ tên, đóng dấu)')], { c: true, after: 0 }),
      ...blank(4),
      P([B(s.name || '')], { c: true, after: 120 }),
    ], w, { v: VerticalAlign.TOP })),
  }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: Array(cols).fill(w), borders: noBorders, rows: trs });
}
// Phần đầu văn bản: tên đơn vị + số ký hiệu | Quốc hiệu, Tiêu ngữ, địa danh ngày tháng
function header(org, no, place) {
  const lw = 3600, rw = W - lw;
  const left = [...org.map((t, i) => P(i === org.length - 1 ? [B(t)] : t, { c: true, sz: 24, after: 0 })), hr(1300, lw, 60), P('Số: ' + no, { c: true, after: 0 })];
  const right = [P([B('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM')], { c: true, sz: 24, after: 0 }), P([B('Độc lập - Tự do - Hạnh phúc')], { c: true, after: 0 }),
    hr(3150, rw, 60), P([I(place + ', ngày ..... tháng ..... năm 2026')], { c: true, after: 0 })];
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [lw, rw], borders: noBorders,
    rows: [new TableRow({ children: [cell(left, lw, { v: VerticalAlign.TOP, m0: true }), cell(right, rw, { v: VerticalAlign.TOP, m0: true })] })] });
}
const title = (loai, trich) => [P([B(loai)], { c: true, sz: 28, before: 240, after: 0 }), ...(trich ? [P([B(trich)], { c: true, sz: 28, after: 0 })] : []), hr(2400, W, 240)];

// Bìa có khung đôi
function cover(lines) {
  const DB = { style: BorderStyle.DOUBLE, size: 12, color: '000000' };
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], borders: { top: DB, bottom: DB, left: DB, right: DB },
    rows: [new TableRow({ height: { value: 14000, rule: 'atLeast' }, children: [new TableCell({ width: { size: W, type: WidthType.DXA }, margins: { top: 300, bottom: 300, left: 300, right: 300 }, children: lines })] })] });
}

// Nội dung dạng khối: ['h1',t] ['h2',t] ['h3',t] ['p',t] ['-',t] ['+',t] ['i',t] ['tbl',w,h,rows,opt] ['raw',elements]
function render(blocks) {
  const out = [];
  for (const b of blocks) {
    const [k, a] = b;
    if (k === 'h1') out.push(P([B(a)], { before: 180, keepNext: true, noInd: true, sz: 26 }));
    else if (k === 'h2') out.push(P([B(a)], { before: 60, keepNext: true }));
    else if (k === 'h3') out.push(P([BI(a)], { keepNext: true }));
    else if (k === 'p') out.push(P(a));
    else if (k === '-') out.push(P('- ' + a));
    else if (k === '+') out.push(P('+ ' + a, { left2: 567 }));
    else if (k === 'i') out.push(P([I(a)]));
    else if (k === 'tbl') out.push(...table(b[1], b[2], b[3], b[4]));
    else if (k === 'raw') out.push(...[].concat(a));
    else if (k === 'pb') out.push('PB');
  }
  return out;
}

function save(children, outPath, meta = {}) {
  const groups = [[]];
  children.flat().forEach(e => (e === 'PB' ? groups.push([]) : groups[groups.length - 1].push(e)));
  const hdr = () => new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SZ })] })] });
  const doc = new Document({
    creator: meta.creator || 'Công ty TNHH Hoàng Tuấn', title: meta.title || '',
    styles: { default: { document: { run: { font: FONT, size: SZ, language: { value: 'vi-VN' } } } } },
    sections: groups.filter(g => g.length).map((g, i) => ({
      properties: { titlePage: i === 0, page: { size: { width: 11907, height: 16840 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1701, header: 567, footer: 567 } } },
      headers: i === 0 ? { default: hdr(), first: new Header({ children: [new Paragraph({ children: [] })] }) } : { default: hdr() },
      children: g,
    })),
  });
  return Packer.toBuffer(doc).then(buf => fs.writeFileSync(outPath, buf));
}

module.exports = { W, P, B, I, BI, r, hr, blank, cell, table, sig, header, title, cover, render, save };
