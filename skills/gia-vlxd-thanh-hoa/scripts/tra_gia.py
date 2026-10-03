#!/usr/bin/env python3
"""Tra cứu nhanh bảng giá VLXD Thanh Hóa (Quý 3 & Quý 4/2023).

Ví dụ:
    python3 tra_gia.py "PCB40"
    python3 tra_gia.py "đá 1x2" --quy 4
    python3 tra_gia.py "thép" --huyen "Nga Sơn"

In ra các dòng bảng khớp từ khóa, kèm tiêu đề mục chứa nó (đơn vị cung cấp,
khu vực, điều kiện giá). Tìm kiếm không phân biệt hoa thường và dấu tiếng Việt.
"""
import argparse
import pathlib
import re
import sys
import unicodedata

REF = pathlib.Path(__file__).resolve().parent.parent / "references"
FILES = {"3": REF / "q3-2023.md", "4": REF / "q4-2023.md"}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower()).replace("đ", "d")
    return "".join(c for c in s if unicodedata.category(c) != "Mn")


def search(path, terms, huyen):
    heads = {}  # level -> heading text
    table_header = None
    hits = []
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^(#{1,6})\s+(.*)", line)
        if m:
            lvl = len(m.group(1))
            heads = {k: v for k, v in heads.items() if k < lvl}
            heads[lvl] = m.group(2)
            table_header = None
            continue
        if line.startswith("|"):
            if table_header is None:
                table_header = line
                continue
            if set(line.replace("|", "").strip()) <= set("-: "):
                continue
        else:
            table_header = None if not line.strip() else table_header
        context = " / ".join(heads[k] for k in sorted(heads))
        if huyen and norm(huyen) not in norm(context):
            continue
        if not line.startswith("|"):
            continue
        # Từ khóa có thể nằm ở tên dòng hoặc ở tiêu đề cột (vd "đá 1x2" trong bảng giá mỏ)
        hay = norm(line) + " " + norm(table_header or "")
        if all(t in hay for t in terms):
            hits.append((context, table_header, line))
    return hits


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("tu_khoa", help="Từ khóa vật tư, các từ cách nhau bằng khoảng trắng (khớp tất cả)")
    ap.add_argument("--quy", choices=["3", "4"], help="Chỉ tìm trong Quý 3 hoặc Quý 4 (mặc định: cả hai)")
    ap.add_argument("--huyen", help="Lọc theo tên huyện/thị xã/mục (khớp tiêu đề mục)")
    args = ap.parse_args()

    terms = [norm(t) for t in args.tu_khoa.split()]
    quys = [args.quy] if args.quy else ["4", "3"]
    total = 0
    for q in quys:
        hits = search(FILES[q], terms, args.huyen)
        if not hits:
            continue
        print(f"===== QUÝ {q}/2023 ({FILES[q].name}) — {len(hits)} dòng =====")
        last = None
        for context, header, line in hits:
            if (context, header) != last:
                print(f"\n## {context}")
                if header:
                    print(header)
                last = (context, header)
            print(line)
        print()
        total += len(hits)
    if not total:
        print("Không tìm thấy. Thử từ khóa ngắn hơn hoặc bỏ --huyen.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
