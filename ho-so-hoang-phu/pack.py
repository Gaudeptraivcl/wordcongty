"""Ghép nội dung do build.js sinh ra vào khung file mẫu gốc của người dùng.

Giữ nguyên styles, fontTable, theme, settings của file mẫu gốc (đã mở tốt trên máy người dùng),
chỉ thay phần thân văn bản (document.xml) và đầu trang.

Dùng: python3 pack.py <noi_dung.docx> <mau_goc.docx> <ket_qua.docx>
"""
import re
import sys
import zipfile

gen_path, tpl_path, out_path = sys.argv[1:4]
gen = zipfile.ZipFile(gen_path)
tpl = zipfile.ZipFile(tpl_path)

REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/'
HDR_CT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml'

# Quan hệ của file mẫu, bỏ header/footer cũ
tpl_rels = tpl.read('word/_rels/document.xml.rels').decode('utf-8')
rels = re.findall(r'<Relationship [^>]*/>', tpl_rels)
dropped = [r for r in rels if re.search(r'/(header|footer)"', r)]
rels = [r for r in rels if r not in dropped]
dropped_parts = {'word/' + re.search(r'Target="([^"]+)"', r).group(1) for r in dropped}

# Đầu trang của nội dung mới, cấp lại rId để không trùng với file mẫu
gen_rels = gen.read('word/_rels/document.xml.rels').decode('utf-8')
doc = gen.read('word/document.xml').decode('utf-8')
headers = []
for rid, target in re.findall(r'Id="(rId\d+)" Type="[^"]+/header" Target="([^"]+)"', gen_rels):
    new_id = 'rIdHdr' + str(len(headers) + 1)
    doc = doc.replace('r:id="%s"' % rid, 'r:id="%s"' % new_id)
    rels.append('<Relationship Id="%s" Type="%sheader" Target="%s"/>' % (new_id, REL_NS, target))
    headers.append(target)
assert not re.search(r'r:id="rId\d+"', doc), 'còn tham chiếu rId chưa ánh xạ'

rels_xml = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            + ''.join(rels) + '</Relationships>')

ct = tpl.read('[Content_Types].xml').decode('utf-8')
for part in dropped_parts:
    ct = re.sub(r'<Override PartName="/%s"[^>]*/>' % re.escape(part), '', ct)
ct = ct.replace('</Types>', ''.join(
    '<Override PartName="/word/%s" ContentType="%s"/>' % (h, HDR_CT) for h in headers) + '</Types>')

with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as out:
    for item in tpl.infolist():
        name = item.filename
        if name in dropped_parts or name == 'word/document.xml' or name.startswith('word/_rels/header') \
                or name.startswith('word/_rels/footer'):
            continue
        if name == 'word/_rels/document.xml.rels':
            out.writestr(name, rels_xml)
        elif name == '[Content_Types].xml':
            out.writestr(name, ct)
        else:
            out.writestr(item, tpl.read(name))
    out.writestr('word/document.xml', doc)
    for h in headers:
        out.writestr('word/' + h, gen.read('word/' + h))
print('written', out_path, '-', len(headers), 'headers')
