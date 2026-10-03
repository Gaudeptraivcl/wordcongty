---
name: gia-vlxd-thanh-hoa
description: Tra cứu giá vật liệu xây dựng (VLXD) công bố của tỉnh Thanh Hóa Quý 3/2023 (Công bố 7380/LSXD-TC ngày 25/10/2023) và Quý 4/2023 (CV 529/SXD-KTXD ngày 19/01/2024) — xi măng, thép, gạch, cát, đá, đất đắp, tôn, sơn, cửa nhôm/nhựa, ống nước, dây cáp, đèn LED, cột điện, nhựa đường, xăng dầu; giá theo TP Thanh Hóa, theo từng huyện/thị xã/cụm xã và giá tại mỏ. Dùng khi người dùng hỏi giá VLXD Thanh Hóa, lập dự toán/tổng mức đầu tư ở Thanh Hóa năm 2023, so sánh giá Quý 3 và Quý 4/2023, hoặc hỏi giá vật tư tại một huyện/xã/mỏ cụ thể.
---

# Giá vật liệu xây dựng tỉnh Thanh Hóa — Quý 3 & Quý 4/2023

Skill này chứa toàn bộ bảng giá đã số hóa từ 2 văn bản công bố giá chính thức:

| Kỳ | Văn bản | Cơ quan | File dữ liệu |
|---|---|---|---|
| Quý 3/2023 (giá tháng 7–9/2023) | Công bố số **7380/LSXD-TC** ngày 25/10/2023 | Liên Sở Xây dựng – Tài chính Thanh Hóa | `references/q3-2023.md` |
| Quý 4/2023 (giá tháng 10–12/2023) | Công văn số **529/SXD-KTXD** ngày 19/01/2024 | Sở Xây dựng Thanh Hóa | `references/q4-2023.md` |

**Mọi giá đều CHƯA gồm VAT, đơn vị đồng (VNĐ).**

## Cách trả lời

1. **Xác định kỳ giá.** Nếu người dùng không nói rõ quý → dùng **Quý 4/2023** (mới nhất) và nói rõ là Quý 4; nếu thấy hữu ích, đưa kèm giá Quý 3 để so sánh.
2. **Xác định khu vực:**
   - TP Thanh Hóa / giá chung toàn tỉnh → *Phụ lục 1* (và *Phụ lục 2* phần vật liệu áp dụng cho các khu vực trong tỉnh).
   - Huyện/thị xã cụ thể → bảng theo huyện (Q4: *Phụ lục 3*; Q3: *Phụ lục 2 bảng huyện*). Mỗi huyện chia **Cụm**; danh sách xã của từng cụm ghi ngay dưới bảng. Nếu người dùng nêu tên xã, tìm xã đó để biết thuộc cụm nào.
   - Cát, đá, đất đắp → bảng **giá tại mỏ** (Q4: Phụ lục 4 đá, 5 cát, 6 đất; Q3: Phụ lục 4 đá, 5 cát, đất đắp).
3. **Tìm dữ liệu** bằng script hoặc grep — không cần đọc cả file:
   ```bash
   python3 scripts/tra_gia.py "PCB40" --huyen "Nga Sơn"
   python3 scripts/tra_gia.py "đá 1x2" --quy 4
   python3 scripts/tra_gia.py "HDPE DN110"
   ```
   Hoặc `grep -n -i "<từ khóa>" references/q4-2023.md`. Sau đó đọc tiêu đề mục (`###`) phía trên dòng tìm được để biết đơn vị cung cấp, điều kiện giao hàng, tiêu chuẩn.
4. **Trình bày kết quả** gồm: tên vật tư – quy cách, ĐVT, giá chưa VAT, kỳ công bố, khu vực/cụm hoặc đơn vị cung cấp, **điều kiện giá** (tại nhà máy / tại bãi trên phương tiện bên mua / đến chân công trình / tại mỏ / đã gồm lắp dựng…), và số văn bản để người dùng trích dẫn trong hồ sơ.
5. Nếu cần giá **gồm VAT**, tự nhân (thường VAT 10%; năm 2023–2024 nhiều mặt hàng được giảm còn 8% theo NĐ 44/2023, NĐ 94/2023) và **nói rõ** thuế suất đã giả định.
6. Nếu vật tư **không có** trong bảng: nói thẳng là không có trong công bố; gợi ý theo hướng dẫn của văn bản — chủ đầu tư xác định giá theo Phụ lục IV Thông tư 11/2021/TT-BXD (báo giá nhà sản xuất/nhà cung ứng, giá công trình tương tự…). Không bịa giá.

## Lưu ý quan trọng về đơn vị và cách đọc

- Xi măng ở Phụ lục 1 tính **đ/tấn**; ở bảng theo huyện tính **đ/kg**.
- Nhiều mặt hàng có **nhiều mốc giá trong quý** (thép, nhựa đường, xăng dầu) → bảng có nhiều cột ngày; chọn cột phù hợp thời điểm lập dự toán, nếu không rõ thì nêu cả khoảng giá.
- "—" nghĩa là văn bản không công bố giá cho ô đó.
- Giá cát/đá/đất tại mỏ **đã gồm thuế, phí và chi phí xúc lên xe**, chưa gồm vận chuyển đến công trình.
- Cửa nhôm/nhựa: đơn giá **đã gồm lắp dựng hoàn chỉnh** tại công trình trên địa bàn tỉnh.
- Vùng sâu, vùng xa phải trung chuyển: chủ đầu tư cộng chi phí vận chuyển theo thực tế.
- Một số mục trong Quý 3 trùng giá Quý 4 nên file `q3-2023.md` chỉ dẫn sang `q4-2023.md` (ví dụ ống uPVC/HDPE Tiền Phong, dây cáp Thượng Đình, cột đèn MDC) — khi đó đọc bảng tương ứng trong file Q4.

## Độ tin cậy dữ liệu

Dữ liệu được số hóa từ bản scan PDF. Các trang có chất lượng scan kém (in lệch dòng, quét nghiêng) được đánh dấu bằng dòng *in nghiêng* "Lưu ý" ngay trong bảng tương ứng. Với hồ sơ thanh quyết toán/pháp lý, khuyến nghị người dùng **đối chiếu lại số liệu với văn bản gốc** (số trang gốc ghi trong ngoặc `[tr. N]` ở mỗi mục).

## Mục lục nhanh

**Quý 4/2023 (`q4-2023.md`)**
- Phụ lục 1 – TP Thanh Hóa: xi măng Bỉm Sơn; gạch không nung DIC; gạch ốp lát (Đô Thị/Vicenza, Viglacera); thép hình & thép tròn Thái Nguyên, thép KYOEI; nhựa đường Petrolimex; cột điện BTLT & cột H Hưng Lộc; ngói Đồng Tâm; tôn AUSTNAM, SUNTEK.
- Phụ lục 2 – toàn tỉnh: gạch Viglacera, Á Mỹ; sơn Joton, Bigworld, Fujicolor; chống thấm Bestmix; cửa nhôm/nhựa (Hồng Vũ, Hoàng Đạt, Tùng Linh, Chung Thịnh Phát, Gmartwindows); cáp điện Thượng Đình; đèn LED (LED Đài Loan, MDC Tech, Hoàng Minh, Slighting, Hoàng Gia, Winco); ống uPVC/HDPE/luồn dây Tiền Phong, ống Hoa Sen; xăng dầu.
- Phụ lục 3 – 27 huyện/thị xã/TP theo cụm xã.
- Phụ lục 4 đá tại mỏ; Phụ lục 5 cát tại mỏ; Phụ lục 6 đất đắp tại mỏ.

**Quý 3/2023 (`q3-2023.md`)**
- Phụ lục 1 – TP Thanh Hóa: xi măng Bỉm Sơn; gạch không nung; gạch Vicenza, Viglacera; gỗ ván khuôn; thép hình/tròn Thái Nguyên, Việt Ý, VAS Nghi Sơn, KYOEI; nhựa đường; xăng dầu; cửa (Quang Vinh, Techwindow, Hoàng Đạt, Tùng Linh, Gmartwindows + vách mặt dựng); cột điện BTLT PC/NPC & cột H; tôn.
- Phụ lục 2 – toàn tỉnh: sơn Maccalan, SK, Takira, Joton; chống thấm Bestmix; cáp điện (thêm cáp 36kV, 40.5kV); đèn LED; kim khí (thép buộc, đinh, que hàn); ống gân sóng HDPE, ống xoắn, ống PP-R, hộp kiểm soát/nắp hố ga composite; đồng hồ nước Hawaco; vật tư giao thông (lưới địa kỹ thuật, hộ lan tôn sóng, decan phản quang, đinh phản quang).
- Bảng theo huyện (Sầm Sơn … Mường Lát).
- Phụ lục 4 đá; Phụ lục 5 cát; đất đắp.
