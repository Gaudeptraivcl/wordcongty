const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Footer,
  PageNumber, TableOfContents, LevelFormat, PageBreak, BorderStyle,
} = require('docx');

const FONT = 'Times New Roman';
const SIZE = 26; // 13pt
const LINE = 360; // 1.5 lines

const lines = fs.readFileSync(path.join(__dirname, 'content.txt'), 'utf8')
  .split('\n').map((l) => l.trimEnd()).filter((l) => l.length);

const body = [];
const breakBefore = new Set(['MỞ ĐẦU', 'KẾT LUẬN', 'TÀI LIỆU THAM KHẢO']);

for (const line of lines) {
  if (line.startsWith('# ')) {
    const t = line.slice(2);
    body.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      pageBreakBefore: breakBefore.has(t),
      children: [new TextRun(t)],
    }));
  } else if (line.startsWith('## CHƯƠNG')) {
    body.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      pageBreakBefore: !line.includes('CHƯƠNG 1'),
      children: [new TextRun(line.slice(3))],
    }));
  } else if (line.startsWith('## ')) {
    body.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(line.slice(3))] }));
  } else if (line.startsWith('### ')) {
    body.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(line.slice(4))] }));
  } else if (line.startsWith('- ')) {
    body.push(new Paragraph({
      numbering: { reference: 'dash', level: 0 },
      alignment: AlignmentType.JUSTIFIED,
      children: [new TextRun(line.slice(2))],
    }));
  } else if (line.startsWith('> ')) {
    body.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
      children: [new TextRun({ text: line.slice(2), italics: true })],
    }));
  } else if (line.startsWith('@ ')) {
    body.push(new Paragraph({
      numbering: { reference: 'refs', level: 0 },
      alignment: AlignmentType.JUSTIFIED,
      children: [new TextRun(line.slice(2))],
    }));
  } else {
    body.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 567 },
      children: [new TextRun(line)],
    }));
  }
}

const c = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: opts.before || 0, after: opts.after || 0, line: 300 },
  children: [new TextRun({ text, bold: opts.bold, size: opts.size || SIZE, italics: opts.italics })],
});
const info = (label, value) => new Paragraph({
  indent: { left: 2268 },
  spacing: { after: 60 },
  children: [new TextRun({ text: label, bold: true }), new TextRun(value)],
});

const cover = [
  c('BỘ GIÁO DỤC VÀ ĐÀO TẠO', { bold: true, size: 28 }),
  c('TRƯỜNG ĐẠI HỌC ...............................', { bold: true, size: 28 }),
  c('KHOA ...............................', { bold: true, size: 26, after: 120 }),
  c('-------- ✦ --------', { after: 1400 }),
  c('TIỂU LUẬN', { bold: true, size: 44, after: 200 }),
  c('MÔN: TRIẾT HỌC MÁC – LÊNIN', { bold: true, size: 30, after: 600 }),
  c('ĐỀ TÀI:', { bold: true, size: 28, after: 160 }),
  c('LÝ LUẬN CỦA CHỦ NGHĨA MÁC – LÊNIN VỀ VAI TRÒ CỦA QUẦN CHÚNG NHÂN DÂN VÀ VAI TRÒ CỦA CÁ NHÂN KIỆT XUẤT – LÃNH TỤ. THỰC TIỄN VẬN DỤNG Ở VIỆT NAM TRONG TIẾN TRÌNH CÁCH MẠNG TỪ 1930 ĐẾN NAY',
    { bold: true, size: 28, after: 1400 }),
  info('Giảng viên hướng dẫn: ', '.......................................'),
  info('Sinh viên thực hiện: ', '.........................................'),
  info('Mã số sinh viên: ', '..............................................'),
  info('Lớp: ', '.................................................................'),
  c('Hà Nội, năm 2026', { bold: true, before: 1600 }),
];

const toc = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: 'MỤC LỤC', bold: true, size: 28 })],
  }),
  new TableOfContents('MỤC LỤC', { hyperlink: true, headingStyleRange: '1-3' }),
];

const margins = { top: 1134, bottom: 1134, left: 1701, right: 1134 };
const pageSize = { width: 11906, height: 16838 };

const doc = new Document({
  creator: 'Sinh viên',
  title: 'Tiểu luận Triết học Mác – Lênin',
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: SIZE }, paragraph: { spacing: { line: LINE, after: 120 } } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 28, bold: true, color: '000000' },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 26, bold: true, color: '000000' },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1, keepNext: true } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 26, bold: true, italics: true, color: '000000' },
        paragraph: { spacing: { before: 160, after: 120 }, outlineLevel: 2, keepNext: true } },
    ],
  },
  numbering: {
    config: [
      { reference: 'dash', levels: [{ level: 0, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 567, hanging: 283 } } } }] },
      { reference: 'refs', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 567, hanging: 567 } } } }] },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: pageSize, margin: margins,
          borders: {
            pageBorderTop: { style: BorderStyle.DOUBLE, size: 6, color: '000000', space: 24 },
            pageBorderBottom: { style: BorderStyle.DOUBLE, size: 6, color: '000000', space: 24 },
            pageBorderLeft: { style: BorderStyle.DOUBLE, size: 6, color: '000000', space: 24 },
            pageBorderRight: { style: BorderStyle.DOUBLE, size: 6, color: '000000', space: 24 },
          },
        },
      },
      children: cover,
    },
    {
      properties: { page: { size: pageSize, margin: margins, pageNumbers: { start: 1 } } },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT] })] })] }),
      },
      children: [...toc, ...body],
    },
  ],
});

const out = process.argv[2] || path.join(__dirname, '..', 'TieuLuan_Triet_QuanChung_LanhTu.docx');
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log('wrote', out); });
