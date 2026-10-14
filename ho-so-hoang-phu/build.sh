#!/bin/sh
# Dựng 3 văn bản và ghép vào khung file mẫu gốc (giữ font, style của người dùng)
set -e
cd "$(dirname "$0")"
TMP=$(mktemp -d)
TPL=../bien-ban-nghiem-thu/template/mau_goc.docx
for f in kh_an_toan:1_Ke_hoach_tong_hop_ve_an_toan bien_phap_thi_cong:2_Bien_phap_thi_cong kh_chat_luong:3_Ke_hoach_bien_phap_kiem_soat_chat_luong; do
  src=${f%%:*}; dst=${f##*:}
  node "$src.js" "$TMP/$src.docx"
  python3 pack.py "$TMP/$src.docx" "$TPL" "$dst.docx"
done
rm -rf "$TMP"
