// Thông tin dự án lấy từ: QĐ 988/QĐ-UBND ngày 10/8/2026 (phê duyệt dự án), QĐ 1292/QĐ-UBND ngày 06/10/2026
// (phê duyệt KQLCNT), Hợp đồng 10/2026/HĐ-TCXD ngày 09/10/2026 và Phụ lục hợp đồng.
const { P, B, I, hr, blank, cover, sig } = require('./lib');

const PJ = {
  DA: 'Hạ tầng kỹ thuật Khu dân cư và công viên Cây xanh, xã Hoằng Phú, tỉnh Thanh Hoá (được UBND huyện Hoằng Hóa phê duyệt tại Quyết định số 613/QĐ-UBND ngày 21/02/2025)',
  DA_NGAN: 'Hạ tầng kỹ thuật Khu dân cư và công viên Cây xanh, xã Hoằng Phú, tỉnh Thanh Hoá',
  GT: 'Gói thầu số 03: Thi công xây dựng công trình + thiết bị',
  DD: 'Xã Hoằng Phú, tỉnh Thanh Hoá',
  CDT: 'Ủy ban nhân dân xã Hoằng Phú',
  CDT_DD: 'Bà Nguyễn Thị Loan – Chủ tịch UBND xã',
  NT: 'Công ty TNHH Hoàng Tuấn',
  NT_DC: 'Khu công nghiệp và đô thị Hoàng Long, phường Nguyệt Viên, tỉnh Thanh Hoá',
  NT_MST: '2800715307',
  GD: 'Nguyễn Duy Nở',
  TP: 'Công ty TNHH xây dựng Vũ Dũng Phát',
  TP_DD: 'Ông Nguyễn Văn Hùng – Giám đốc',
  TP_PV: 'Thi công các hạng mục giao thông, thoát nước mưa, thoát nước thải, vỉa hè, cấp nước, điện chiếu sáng của tuyến số 5 và tuyến số 6; toàn bộ phần thiết bị (giá trị 7.341.933.000 đồng, tương ứng 29,36% giá hợp đồng)',
  TVTK: 'Công ty cổ phần đầu tư và xây dựng Trần Anh',
  HD: 'Hợp đồng thi công xây dựng công trình số 10/2026/HĐ-TCXD ngày 09/10/2026 giữa UBND xã Hoằng Phú và Công ty TNHH Hoàng Tuấn',
  GIA: '25.007.549.000 đồng',
  TG: '300 ngày (10 tháng) kể từ ngày khởi công theo thông báo của Chủ đầu tư',
  QD_DA: 'Quyết định số 988/QĐ-UBND ngày 10/8/2026 của Chủ tịch UBND xã Hoằng Phú về việc phê duyệt dự án',
  QD_KQ: 'Quyết định số 1292/QĐ-UBND ngày 06/10/2026 của Chủ tịch UBND xã Hoằng Phú về việc phê duyệt kết quả lựa chọn nhà thầu Gói thầu số 03',
  ORG: ['CÔNG TY TNHH HOÀNG TUẤN'],
  NOI: 'Hoằng Phú',
};

// Quy mô theo QĐ 988/QĐ-UBND
PJ.QUYMO = [
  ['-', 'Loại, cấp công trình: Dự án nhóm C, công trình hạ tầng kỹ thuật cấp IV; diện tích quy hoạch khoảng 2,45 ha.'],
  ['-', 'Giao thông: 06 tuyến đường nội bộ, tổng chiều dài L = 843,5 m; mặt đường Bm = 7,5 m; nền đường Bn = 13,5 ÷ 17,5 m; kết cấu áo đường: BTN chặt C16 dày 7 cm, tưới nhựa thấm bám 1,0 kg/m², CPĐD loại I dày 15 cm, CPĐD loại II dày 18 cm, đất đắp K98 dày 30 cm; nền đắp đất đồi K ≥ 0,95, mái ta luy 1/1,5; vạch sơn 3.1a, 3.1b, 7.1, 7.3a.'],
  ['-', 'Vỉa hè, bó vỉa, đan rãnh, cây xanh: lát gạch giả đá 400×400×50 mm trên bê tông lót đá 1×2 M150 dày 10 cm và lớp nilon; bó vỉa bê tông đúc sẵn 26×23×100 cm (đoạn thẳng) và 26×23×40 cm (đoạn cong); đan rãnh rộng 25 cm, bê tông M250 dày 7 cm, tổng chiều dài 1.477,71 m; 73 hố trồng cây 1,0×1,0 m; khóa vỉa xây gạch không nung.'],
  ['-', 'Thoát nước mưa: rãnh xây B = 80 cm, L = 848,32 m (thân xây gạch không nung VXM M75, mũ mố BTCT M250, móng BTXM M200 dày 15 cm, tấm đan BTCT M250); rãnh chịu lực BTCT M200; 53 hố thu, khung và nắp ga Composite tải trọng H10.'],
  ['-', 'Thoát nước thải: hệ thống riêng, cống BTCT D300 L = 715,80 m, gối cống BTXM M200; 34 giếng thăm; ống chờ PVC D110 đấu nối hộ dân; bể xử lý nước thải và cửa xả D300.'],
  ['-', 'Hào kỹ thuật dọc tuyến L = 927,65 m, 21 hố thăm hào; bên trong bố trí giá đỡ cáp, gối kê.'],
  ['-', 'Cấp nước sinh hoạt và PCCC: mạng vòng kết hợp mạng cụt, ống HDPE D110, D50 đấu nối từ ống HDPE D110 khu dân cư Phú Quý; 05 trụ cứu hỏa DN100; nhà bơm, bể nước PCCC.'],
  ['-', 'Cấp điện: đường dây 35 kV hạ ngầm dài 115 m (cáp Cu/XLPE/PVC/DSTA/PVC 3×120 mm² – 35 kV) từ cột 95 lộ 371E9.18 đến 01 trạm biến áp kiosk 320 kVA – 35(22)/0,4 kV; lưới 0,4 kV ngầm khoảng 1.082 m (4 lộ), 08 tủ công tơ 12 công tơ; chiếu sáng 29 cột đèn LED 100 W kết hợp năng lượng mặt trời, cáp ngầm dài 831 m.'],
  ['-', 'Cầu: cầu dầm bản BTCT DƯL kéo trước 01 nhịp 12 m, chiều dài cầu L = 16,1 m, bề rộng B = 0,5 + 7,5 + 0,5 = 8,5 m; mố chữ U BTCT 30 MPa trên móng cọc BTCT 30×30 cm dài 31,5 m; bản mặt cầu BTCT f\'c = 30 MPa, gối cao su bản thép 200×150×28 mm, khe co giãn răng lược, lan can thép ống D110; lớp phủ BTN C16 dày 7 cm; bản chuyển tiếp dài 4,0 m; bãi đúc dầm và lán trại bố trí bên phải mố M1.'],
];

PJ.HANGMUC = [
  'Giao thông (nền, mặt đường, vạch sơn)', 'Thoát nước mưa', 'Thoát nước thải', 'Tuynel (hào kỹ thuật) dọc tuyến',
  'Lát hè, bó vỉa, đan rãnh, khóa hè, hố trồng cây', 'Cầu khẩu độ 12 m', 'Cấp nước sạch', 'Đường điện trung áp xây dựng mới',
  'Trạm biến áp quy hoạch', 'Đường điện hạ áp quy hoạch', 'Hệ thống chiếu sáng', 'Lắp đặt, thí nghiệm và hiệu chỉnh thiết bị',
  'Bể xử lý nước thải', 'Nhà bơm, bể nước PCCC', 'Nhà tạm để ở và điều hành thi công', 'Đấu nối cấp nước, đấu nối đường dây 35 kV, nghiệm thu đóng điện',
  'Thiết bị (máy biến áp 320 kVA, tủ RMU 35 kV, tủ hạ thế, vỏ trạm kiosk...)',
];

PJ.CANCU_CHUNG = [
  'Luật Xây dựng số 135/2025/QH15 ngày 10/12/2025;',
  'Nghị định số 207/2026/NĐ-CP ngày 15/6/2026 của Chính phủ quy định chi tiết một số điều của Luật Xây dựng về quản lý chất lượng, thi công xây dựng và bảo trì công trình xây dựng;',
  'Thông tư số 32/2026/TT-BXD ngày 22/6/2026 của Bộ Xây dựng quy định chi tiết một số điều của Nghị định số 207/2026/NĐ-CP;',
  PJ.QD_DA + ';',
  PJ.QD_KQ + ';',
  PJ.HD + ' và Phụ lục hợp đồng;',
  'Hồ sơ Báo cáo kinh tế – kỹ thuật, hồ sơ thiết kế bản vẽ thi công, chỉ dẫn kỹ thuật và dự toán được phê duyệt;',
  'E-HSMT, E-HSDT của Gói thầu số 03 và các tài liệu có liên quan.',
];

// Bìa văn bản
function makeCover(loai, ten) {
  return cover([
    P([B('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM')], { c: true, after: 0 }),
    P([B('Độc lập - Tự do - Hạnh phúc')], { c: true, after: 0 }),
    hr(3300, 8400, 300),
    P([B('CHỦ ĐẦU TƯ: ỦY BAN NHÂN DÂN XÃ HOẰNG PHÚ')], { c: true, after: 0 }),
    P([B('NHÀ THẦU THI CÔNG: CÔNG TY TNHH HOÀNG TUẤN')], { c: true, after: 0 }),
    ...blank(5),
    P([B(loai)], { c: true, sz: 40, after: 120 }),
    ...(ten ? [P([B(ten)], { c: true, sz: 30, after: 300 })] : []),
    ...blank(2),
    P([B('DỰ ÁN: HẠ TẦNG KỸ THUẬT KHU DÂN CƯ VÀ CÔNG VIÊN CÂY XANH, XÃ HOẰNG PHÚ, TỈNH THANH HOÁ')], { c: true, after: 60 }),
    P([I('(được UBND huyện Hoằng Hóa phê duyệt tại Quyết định số 613/QĐ-UBND ngày 21/02/2025)')], { c: true, after: 120 }),
    P([B('GÓI THẦU SỐ 03: THI CÔNG XÂY DỰNG CÔNG TRÌNH + THIẾT BỊ')], { c: true, after: 60 }),
    P([B('ĐỊA ĐIỂM: XÃ HOẰNG PHÚ, TỈNH THANH HOÁ')], { c: true, after: 300 }),
    ...blank(4),
    sig([[{ t: 'CHỦ ĐẦU TƯ', t2: 'UBND XÃ HOẰNG PHÚ', n: '(Ký, ghi rõ họ tên, đóng dấu)' }, { t: 'NHÀ THẦU THI CÔNG', t2: 'CÔNG TY TNHH HOÀNG TUẤN', n: '(Ký, ghi rõ họ tên, đóng dấu)' }]]),
    ...blank(3),
    P([B('THANH HÓA, NĂM 2026')], { c: true, after: 0 }),
  ]);
}

// Phần ký cuối văn bản: nhà thầu lập, TVGS kiểm tra, chủ đầu tư chấp thuận
function endSign() {
  return [
    P('', { after: 120 }),
    sig([[
      { t: 'NHÀ THẦU THI CÔNG', t2: 'CÔNG TY TNHH HOÀNG TUẤN', n: '(Giám đốc ký, ghi rõ họ tên, đóng dấu)', name: PJ.GD },
      { t: 'TƯ VẤN GIÁM SÁT', t2: 'KIỂM TRA', n: '(Ký, ghi rõ họ tên)' },
    ], [
      { t: 'CHỦ ĐẦU TƯ CHẤP THUẬN', t2: 'UBND XÃ HOẰNG PHÚ', n: '(Ký, ghi rõ họ tên, đóng dấu)' },
      { t: ' ', n: ' ' },
    ]]),
  ];
}

module.exports = { PJ, makeCover, endSign };
