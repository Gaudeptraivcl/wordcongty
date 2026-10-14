// 2. BIỆN PHÁP THI CÔNG
const { P, B, header, title, render, save } = require('./lib');
const { PJ, makeCover, endSign } = require('./project');

const out = [];
out.push(makeCover('THUYẾT MINH BIỆN PHÁP THI CÔNG', 'TỔNG THỂ VÀ CHI TIẾT CÁC HẠNG MỤC'), 'PB');
out.push(header(PJ.ORG, '......../BPTC-HT', PJ.NOI));
out.push(...title('THUYẾT MINH', 'Biện pháp thi công tổng thể và chi tiết các hạng mục công trình'));

const K = [];
K.push(['p', 'Dự án: ' + PJ.DA + '.']);
K.push(['p', PJ.GT + '. Địa điểm: ' + PJ.DD + '.']);

K.push(['h1', 'CHƯƠNG I. CĂN CỨ VÀ GIỚI THIỆU CHUNG']);
K.push(['h2', '1. Căn cứ lập biện pháp thi công']);
PJ.CANCU_CHUNG.forEach(t => K.push(['-', t]));
['QCVN 18:2021/BXD – An toàn trong thi công xây dựng; TCVN 4055:2012 – Tổ chức thi công;',
  'Các tiêu chuẩn thi công và nghiệm thu áp dụng cho từng hạng mục nêu tại Chương IV và tại Kế hoạch, biện pháp kiểm tra, kiểm soát chất lượng thi công;',
  'Kết quả khảo sát hiện trường của Nhà thầu; năng lực nhân lực, máy móc thiết bị của Nhà thầu và nhà thầu phụ.'].forEach(t => K.push(['-', t]));
K.push(['h2', '2. Quy mô, giải pháp thiết kế chủ yếu']);
PJ.QUYMO.forEach(x => K.push(x));
K.push(['h2', '3. Các hạng mục thi công theo hợp đồng']);
K.push(['tbl', [700, 5600, 2800], ['TT', 'Hạng mục', 'Đơn vị thực hiện'], PJ.HANGMUC.map((h, i) => [String(i + 1), h,
  i === 16 ? PJ.TP : 'Công ty TNHH Hoàng Tuấn' + ([0, 1, 2, 4, 6, 10].includes(i) ? ' (riêng tuyến 5, 6 do ' + PJ.TP + ')' : '')]), { center: [0] }]);
K.push(['h2', '4. Giá trị, thời gian thực hiện']);
K.push(['-', 'Giá hợp đồng trọn gói: ' + PJ.GIA + ' (Hai mươi lăm tỷ, không trăm lẻ bảy triệu, năm trăm bốn mươi chín nghìn đồng).']);
K.push(['-', 'Thời gian thực hiện: ' + PJ.TG + ', bao gồm cả ngày lễ, tết và ngày nghỉ.']);

K.push(['h1', 'CHƯƠNG II. ĐIỀU KIỆN THI CÔNG VÀ TỔ CHỨC CÔNG TRƯỜNG']);
K.push(['h2', '1. Điều kiện tự nhiên, xã hội']);
['Khu vực xây dựng thuộc vùng đồng bằng ven biển tỉnh Thanh Hoá, khí hậu nhiệt đới gió mùa; mùa mưa bão từ tháng 8 đến tháng 11, lượng mưa tập trung, dễ ngập úng.',
  'Nền đất khu vực có lớp đất yếu, khu vực cầu phải gia cố bằng cọc BTCT dài 31,5 m; nền đường chủ yếu là nền đắp.',
  'Khu vực tiếp giáp khu dân cư hiện trạng (khu dân cư Phú Quý), có đường giao thông kết nối thuận lợi cho vận chuyển vật liệu.',
  'Nguồn cấp nước đấu nối từ ống HDPE D110 khu dân cư Phú Quý (thỏa thuận số 55/CV-TT ngày 03/7/2026 của Công ty TNHH XD&TM Trường Thành); nguồn điện trung thế từ cột 95 lộ 371E9.18 (thỏa thuận số 72/2026/TTĐNCĐ ngày 10/7/2026 với Điện lực Hoằng Hóa).'].forEach(t => K.push(['-', t]));
K.push(['h2', '2. Bố trí tổng mặt bằng thi công']);
['Nhà điều hành, nhà ở tạm cho cán bộ, công nhân, kho vật tư, bãi đúc dầm và lán trại công trình chính bố trí bên phải phía mố M1 theo hồ sơ thiết kế (hạng mục "Nhà tạm để ở và điều hành thi công" trong hợp đồng).',
  'Bãi tập kết vật liệu rời (đá, cát, CPĐD), bãi gia công cốt thép, ván khuôn bố trí trong phạm vi dự án, thuận tiện vận chuyển và không ảnh hưởng đến khu dân cư.',
  'Đường công vụ tận dụng nền các tuyến đường dự án sau khi đắp; đường tạm đến bãi đúc dầm rải cấp phối dày 20 cm.',
  'Điện thi công: đấu nối lưới điện hạ thế khu vực qua tủ điện tổng có công tơ; dự phòng máy phát điện cho các công việc đổ bê tông liên tục.',
  'Nước thi công: khoan giếng hoặc đấu nối nguồn nước khu vực; nước dùng cho bê tông được thí nghiệm đạt TCVN 4506:2012.',
  'Bố trí cổng ra vào, biển công trình, nội quy, hàng rào tạm, khu rửa xe, điểm thu gom rác, nhà vệ sinh tạm.'].forEach(t => K.push(['-', t]));
K.push(['h2', '3. Nhân lực']);
K.push(['tbl', [600, 3800, 1400, 3300], ['TT', 'Chức danh / Tổ đội', 'Số lượng', 'Ghi chú'], [
  ['1', 'Giám đốc Công ty', '01', PJ.GD],
  ['2', 'Chỉ huy trưởng công trường', '01', 'Chứng chỉ hành nghề phù hợp'],
  ['3', 'Cán bộ kỹ thuật giao thông, thoát nước', '02', ''],
  ['4', 'Cán bộ kỹ thuật cầu', '01', ''],
  ['5', 'Cán bộ kỹ thuật điện', '01', ''],
  ['6', 'Cán bộ kỹ thuật cấp thoát nước', '01', ''],
  ['7', 'Cán bộ trắc đạc', '01', ''],
  ['8', 'Cán bộ QA/QC, thí nghiệm hiện trường', '01', ''],
  ['9', 'Cán bộ chuyên trách an toàn lao động', '01', ''],
  ['10', 'Tổ đào đắp, nền đường (lái máy, phụ máy)', '10 – 15', 'Thợ vận hành có chứng chỉ'],
  ['11', 'Tổ bê tông, cốt thép, ván khuôn', '20 – 25', ''],
  ['12', 'Tổ xây, lát, hoàn thiện', '15 – 20', ''],
  ['13', 'Tổ cầu (ép cọc, đúc dầm, lao lắp)', '10 – 12', ''],
  ['14', 'Tổ điện, cấp nước', '8 – 10', 'Thợ điện có bậc an toàn phù hợp'],
  ['15', 'Nhân lực nhà thầu phụ ' + PJ.TP, 'Theo phạm vi', 'Tuyến 5, 6 và thiết bị'],
], { center: [0, 2] }]);
K.push(['i', 'Danh sách cụ thể (họ tên, chứng chỉ) theo E-HSDT và được Nhà thầu cập nhật, trình Chủ đầu tư khi có thay đổi.']);
K.push(['h2', '4. Máy móc, thiết bị thi công chủ yếu']);
K.push(['tbl', [600, 5200, 1300, 2000], ['TT', 'Tên thiết bị', 'Số lượng', 'Sử dụng cho'], [
  ['1', 'Máy đào một gầu bánh xích 1,25 m³; 0,4 m³', '02; 02', 'Đào nền, rãnh, hố móng'],
  ['2', 'Máy ủi 110 CV', '02', 'San, đắp nền'],
  ['3', 'Máy lu bánh thép 10 T, 16 T; lu rung 12 T; lu bánh hơi 16 T, 25 T', '05', 'Lu nền, móng, mặt đường'],
  ['4', 'Ô tô tự đổ 7 T, 12 T', '06 – 08', 'Vận chuyển vật liệu'],
  ['5', 'Ô tô tưới nước 5 m³', '01', 'Móng CPĐD, giảm bụi'],
  ['6', 'Máy rải cấp phối đá dăm 50 – 60 m³/h', '01', 'Móng CPĐD'],
  ['7', 'Máy rải bê tông nhựa 130 – 140 CV; máy phun nhựa 190 CV; máy nén khí 600 m³/h', '01 bộ', 'Mặt đường BTN'],
  ['8', 'Trạm trộn BTN 120 T/h (thuê, có hợp đồng nguyên tắc)', '01', 'Sản xuất BTN C16'],
  ['9', 'Thiết bị sơn kẻ vạch YHK 10A, lò nấu sơn YHK 3A', '01 bộ', 'Vạch sơn nhiệt dẻo'],
  ['10', 'Máy ép cọc trước 200 T', '01', 'Cọc mố cầu'],
  ['11', 'Cần trục ô tô 10 T; cần cẩu bánh hơi 16 T, 25 T; cần cẩu bánh xích 50 T', '04', 'Cẩu cọc, cấu kiện, lao lắp dầm'],
  ['12', 'Cổng trục 60 T, kích căng kéo, bệ căng', '01 bộ', 'Đúc dầm DƯL'],
  ['13', 'Ô tô chuyển trộn bê tông 10,7 m³; xe bơm bê tông 50 m³/h', '03; 01', 'Bê tông thương phẩm'],
  ['14', 'Máy trộn bê tông 250 l, máy trộn vữa 150 l', '03', 'Bê tông, vữa tại chỗ'],
  ['15', 'Máy đầm dùi 1,5 kW, đầm bàn 1,0 kW, đầm cóc 70 kg', '10', 'Đầm bê tông, đất'],
  ['16', 'Máy cắt uốn thép 5 kW, máy hàn 23 kW, máy cắt gạch', '06', 'Gia công cốt thép, hoàn thiện'],
  ['17', 'Máy hàn nhiệt ống HDPE', '01', 'Ống cấp nước'],
  ['18', 'Máy bơm nước diezel 5 CV, 75 CV', '04', 'Thoát nước hố móng'],
  ['19', 'Máy toàn đạc điện tử, máy thủy bình', '01; 02', 'Trắc đạc'],
  ['20', 'Bộ thiết bị thí nghiệm điện cao áp (do đơn vị thí nghiệm thực hiện)', '01 bộ', 'Thí nghiệm, đóng điện'],
], { center: [0, 2] }]);
K.push(['h2', '5. Vật liệu và nguồn cung cấp']);
['Đất đắp nền: đất đồi tại mỏ được cấp phép trong tỉnh, thí nghiệm chỉ tiêu cơ lý trước khi sử dụng.',
  'Cấp phối đá dăm loại I, II; đá dăm các loại: mỏ đá được cấp phép tại Thanh Hoá.',
  'Bê tông nhựa C16: trạm trộn có giấy phép, hợp đồng nguyên tắc; vận chuyển bằng ô tô tự đổ có phủ bạt giữ nhiệt.',
  'Xi măng PCB40, thép, cáp DƯL, gạch không nung, gạch lát giả đá, bó vỉa đúc sẵn, ống cống BTCT D300, ống HDPE, cáp điện, thiết bị trạm biến áp: nhà sản xuất có chứng nhận hợp quy/hợp chuẩn, được Chủ đầu tư, Tư vấn giám sát chấp thuận trước khi đặt hàng.',
  'Bê tông thương phẩm: trạm trộn được chấp thuận; thiết kế cấp phối được thí nghiệm, phê duyệt trước khi sử dụng.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'CHƯƠNG III. TRÌNH TỰ VÀ TIẾN ĐỘ THI CÔNG TỔNG THỂ']);
K.push(['h2', '1. Nguyên tắc tổ chức thi công']);
['Thi công theo phương pháp dây chuyền kết hợp song song, chia mặt bằng thành các mũi: Mũi 1 – nền đường và công trình ngầm tuyến 1, 2, 3; Mũi 2 – tuyến 4; Mũi 3 – tuyến 5, 6 (nhà thầu phụ); Mũi 4 – cầu; Mũi 5 – điện, cấp nước.',
  'Ưu tiên thi công các công trình ngầm (thoát nước mưa, thoát nước thải, hào kỹ thuật, cáp điện, ống cấp nước qua đường) trước khi thi công móng, mặt đường để tránh đào phá.',
  'Thi công cầu triển khai ngay từ đầu (ép cọc, đúc dầm) vì là hạng mục có thời gian dài nhất, nằm trên đường găng.',
  'Các công việc đất, mặt đường BTN bố trí tránh thời gian mưa lớn; các công việc trong nhà trạm, lắp đặt thiết bị bố trí vào mùa mưa.'].forEach(t => K.push(['-', t]));
K.push(['h2', '2. Tiến độ thi công dự kiến (300 ngày)']);
K.push(['tbl', [600, 4300, 1300, 1300, 1600], ['TT', 'Công việc', 'Bắt đầu (ngày thứ)', 'Kết thúc (ngày thứ)', 'Ghi chú'], [
  ['1', 'Chuẩn bị: nhận mặt bằng, tim mốc, lán trại, tập kết máy, thí nghiệm vật liệu', '1', '20', ''],
  ['2', 'Phát quang, vét hữu cơ, đào nền không thích hợp', '10', '60', ''],
  ['3', 'Đắp nền K95, K98 các tuyến', '25', '150', 'Theo phân đoạn'],
  ['4', 'Thoát nước mưa: rãnh, hố thu, tấm đan', '40', '170', ''],
  ['5', 'Thoát nước thải: cống D300, giếng thăm; bể xử lý', '45', '170', ''],
  ['6', 'Hào kỹ thuật, hố thăm hào', '60', '180', ''],
  ['7', 'Cầu: ép cọc, thí nghiệm nén tĩnh', '20', '70', 'Đường găng'],
  ['8', 'Cầu: đúc dầm DƯL tại bãi', '30', '100', 'Song song ép cọc'],
  ['9', 'Cầu: mố, lao lắp dầm, bản mặt cầu, lan can, bản chuyển tiếp', '70', '190', 'Đường găng'],
  ['10', 'Cấp nước sạch, trụ cứu hỏa; nhà bơm, bể nước PCCC', '90', '210', ''],
  ['11', 'Điện trung áp 35 kV, trạm biến áp, hạ áp 0,4 kV, tủ công tơ', '120', '240', ''],
  ['12', 'Chiếu sáng: móng cột, cáp, cột đèn', '150', '250', ''],
  ['13', 'Móng CPĐD loại II, loại I', '140', '220', ''],
  ['14', 'Bó vỉa, đan rãnh, khóa hè, hố trồng cây', '170', '240', ''],
  ['15', 'Tưới nhựa thấm bám, thảm BTN C16 mặt đường và mặt cầu', '220', '255', 'Tránh mưa'],
  ['16', 'Lát vỉa hè gạch giả đá', '230', '275', ''],
  ['17', 'Sơn kẻ vạch, biển báo', '255', '270', ''],
  ['18', 'Thí nghiệm, hiệu chỉnh, đóng điện; đấu nối cấp nước', '240', '280', ''],
  ['19', 'Hoàn thiện, hoàn công, nghiệm thu hoàn thành, bàn giao', '270', '300', ''],
], { center: [0, 2, 3] }]);
K.push(['i', 'Tiến độ chi tiết (biểu đồ ngang) được Nhà thầu trình Chủ đầu tư trong thời hạn 05 ngày sau ngày khởi công theo Điều kiện cụ thể của hợp đồng.']);

K.push(['h1', 'CHƯƠNG IV. BIỆN PHÁP THI CÔNG CHI TIẾT']);
K.push(['h2', '1. Công tác chuẩn bị và trắc đạc']);
['Nhận bàn giao mặt bằng, mốc tọa độ, cao độ từ Chủ đầu tư; lập biên bản bàn giao mặt bằng, tim mốc (BM-03 bộ biểu mẫu nghiệm thu).',
  'Lập lưới khống chế thi công, dẫn mốc ra ngoài phạm vi thi công, bảo vệ bằng bê tông; kiểm tra định kỳ hằng tháng.',
  'Định vị tim tuyến, mép nền, chân taluy, vị trí rãnh, hố ga, cầu bằng máy toàn đạc; đo cao độ tự nhiên để đối chiếu khối lượng trước khi thi công.',
  'Thí nghiệm vật liệu đầu vào, thiết kế cấp phối bê tông, thí nghiệm đầm nén tiêu chuẩn đất đắp; trình Tư vấn giám sát chấp thuận.'].forEach(t => K.push(['-', t]));

K.push(['h2', '2. Thi công nền đường']);
K.push(['h3', 'a) Vét hữu cơ, đào nền không thích hợp']);
['Dùng máy đào 1,25 m³ kết hợp ô tô tự đổ vét lớp hữu cơ, đất không thích hợp theo chiều sâu thiết kế; vận chuyển đến bãi thải được chấp thuận.',
  'Sau khi vét, đo cao độ, kiểm tra đáy nền cùng Tư vấn giám sát, nghiệm thu trước khi đắp.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'b) Đắp nền K95 bằng đất đồi']);
['Thi công đoạn thử (dài 50 – 100 m) để xác định chiều dày lớp rải, số lượt lu, độ ẩm tối ưu; kết quả được Tư vấn giám sát chấp thuận làm cơ sở thi công đại trà.',
  'Đắp từng lớp dày không quá 25 cm (sau lu), rải bằng máy ủi, điều chỉnh độ ẩm bằng ô tô tưới nước; lu sơ bộ bằng lu bánh thép 10 T, lu chặt bằng lu 16 T đến độ chặt K ≥ 0,95.',
  'Đắp rộng hơn mỗi bên 30 – 50 cm để bảo đảm độ chặt mép taluy; gọt taluy theo độ dốc 1/1,5 khi hoàn thiện.',
  'Kiểm tra độ chặt mỗi lớp bằng phương pháp rót cát (TCVN 8730:2012) với tần suất theo Kế hoạch kiểm soát chất lượng; chỉ đắp lớp tiếp theo khi lớp dưới đạt yêu cầu.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'c) Lớp đất đắp K98 dày 30 cm']);
['Đắp thành 02 lớp, mỗi lớp 15 cm; lu bằng lu bánh thép 16 T và lu rung 12 T đến K ≥ 0,98; hoàn thiện mặt bằng, dốc ngang 2% đúng thiết kế.'].forEach(t => K.push(['-', t]));

K.push(['h2', '3. Thi công móng cấp phối đá dăm']);
['Vật liệu CPĐD loại II (dày 18 cm) và loại I (dày 15 cm) được thí nghiệm thành phần hạt, chỉ số dẻo, độ hao mòn Los Angeles trước khi đưa vào sử dụng.',
  'Vận chuyển bằng ô tô tự đổ, rải bằng máy rải 50 – 60 m³/h; độ ẩm khống chế trong phạm vi ±2% độ ẩm tối ưu.',
  'Lu sơ bộ bằng lu bánh thép 10 T (3 – 4 lượt/điểm), lu chặt bằng lu rung 12 T và lu bánh hơi 16 T, lu hoàn thiện bằng lu bánh thép; lu từ mép vào tim, vệt sau chồng vệt trước 20 – 25 cm.',
  'Nghiệm thu độ chặt K ≥ 0,98, chiều dày, cao độ, độ bằng phẳng, độ dốc ngang trước khi thi công lớp trên.'].forEach(t => K.push(['-', t]));

K.push(['h2', '4. Thi công mặt đường bê tông nhựa C16 dày 7 cm']);
['Vệ sinh mặt móng CPĐD loại I bằng máy nén khí; tưới nhựa thấm bám tiêu chuẩn 1,0 kg/m² bằng máy phun nhựa; chờ nhựa thấm, đông đặc (tối thiểu 24 giờ) trước khi rải BTN.',
  'BTN C16 sản xuất tại trạm trộn 120 T/h theo công thức chế tạo được phê duyệt; nhiệt độ hỗn hợp khi ra khỏi trạm 150 – 160 °C; vận chuyển bằng ô tô tự đổ 12 T có bạt phủ.',
  'Rải bằng máy rải 130 – 140 CV, nhiệt độ hỗn hợp khi rải không nhỏ hơn 120 °C; chỉ rải khi trời không mưa, mặt móng khô ráo.',
  'Lu sơ bộ bằng lu bánh thép 10 T, lu chặt bằng lu bánh hơi 25 T, lu hoàn thiện bằng lu bánh thép; kết thúc lu khi nhiệt độ hỗn hợp còn trên 70 °C.',
  'Xử lý mối nối dọc, ngang bằng cắt thẳng, quét nhựa dính bám trước khi rải vệt tiếp theo.',
  'Khoan mẫu kiểm tra chiều dày, độ chặt; đo độ bằng phẳng bằng thước 3 m; nghiệm thu theo TCVN 13567-1:2022.'].forEach(t => K.push(['-', t]));
K.push(['h2', '5. Sơn kẻ vạch tín hiệu giao thông']);
['Định vị vạch 3.1a, 3.1b, 7.1, 7.3a bằng dây và phấn; vệ sinh, làm khô bề mặt BTN.',
  'Sơn nhiệt dẻo phản quang dày 2 mm bằng thiết bị YHK 10A, sơn nấu ở lò YHK 3A đúng nhiệt độ của nhà sản xuất; rắc hạt phản quang ngay sau khi sơn.',
  'Rào chắn bảo vệ đến khi sơn khô; kiểm tra kích thước, chiều dày, độ phản quang theo TCVN 8791:2018.'].forEach(t => K.push(['-', t]));

K.push(['h2', '6. Thi công thoát nước mưa']);
['Định vị tuyến rãnh B = 80 cm, hố thu; đào bằng máy đào 0,4 m³ kết hợp thủ công, đào đến đâu xây đến đó, có hố thu nước và bơm tiêu.',
  'Thi công lớp đá đệm móng Dmax ≤ 6 cm dày 10 cm, đầm chặt; đổ bê tông móng M200 dày 15 cm (rãnh thường) hoặc bê tông cốt thép M200 (rãnh chịu lực) theo đúng ván khuôn và cốt thép đã nghiệm thu.',
  'Xây thân rãnh bằng gạch không nung VXM M75 dày 22 cm, mạch vữa đầy, so le; trát VXM M75 dày 2 cm, bảo dưỡng ẩm.',
  'Đổ mũ mố BTCT M250; sản xuất tấm đan BTCT M250 tại bãi, bảo dưỡng đủ cường độ mới lắp đặt bằng cần trục ô tô.',
  'Hố thu (53 hố): đáy thấp hơn đáy rãnh 30 cm; lắp khung và nắp ga Composite tải trọng H10 đúng cao độ hoàn thiện vỉa hè.',
  'Đắp hoàn trả hai bên thành rãnh bằng đầm cóc từng lớp ≤ 20 cm sau khi khối xây đủ cường độ.'].forEach(t => K.push(['-', t]));

K.push(['h2', '7. Thi công thoát nước thải']);
['Đào hố móng cống D300 bằng máy đào kết hợp thủ công, đáy hố đúng cao độ và độ dốc thiết kế; kiểm tra bằng máy thủy bình trước khi đặt gối.',
  'Đặt gối cống BTXM M200 (3 gối/2,5 m cống); cẩu đặt ống cống BTCT D300 (H10 và HL93 tại vị trí qua đường), điều chỉnh tim, cao độ; xảm mối nối kín nước.',
  'Xây giếng thăm (34 hố) trên lớp bê tông lót M100 dày 10 cm và móng M200 dày 15 cm; thân gạch không nung VXM M75, trát 2 cm; mũ mố và tấm đan BTCT M250.',
  'Đặt chờ ống PVC D110 đấu nối từ hộ dân vào giếng thăm.',
  'Thử kín nước từng đoạn cống giữa hai giếng trước khi lấp; lấp cát, đất đầm chặt theo thiết kế.',
  'Thi công bể xử lý nước thải và cửa xả D300 theo bản vẽ: đào móng, bê tông lót, bê tông cốt thép đáy, thành, nắp; thử kín nước bể trước khi hoàn thiện.'].forEach(t => K.push(['-', t]));

K.push(['h2', '8. Thi công hào kỹ thuật (tuynel) dọc tuyến']);
['Đào hào và hố thăm (21 hố), bê tông lót M100 dày 10 cm, bê tông móng M150/M200; xây thân hào gạch không nung VXM M75, trát VXM M75.',
  'Bảo đảm độ dốc đáy hào về các hố ga kỹ thuật; bố trí lỗ thông hơi; lắp giá đỡ cáp, gối kê, ống luồn cáp theo thiết kế.',
  'Lắp tấm đan BTCT M250 đúc sẵn; đắp hoàn trả, đầm chặt hai bên.'].forEach(t => K.push(['-', t]));

K.push(['h2', '9. Thi công vỉa hè, bó vỉa, đan rãnh, khóa hè, hố trồng cây']);
['Bó vỉa đúc sẵn (26×23×100 cm đoạn thẳng; 26×23×40 cm đoạn cong) đặt trên lớp bê tông móng M150 dày 10 cm và vữa đệm M75 dày 2 cm; căng dây định vị tim, cao độ; mạch nối đều.',
  'Đan rãnh rộng 25 cm: móng CPĐD và đất đắp K98 như kết cấu mặt đường; bê tông M250 dày 7 cm đổ tại chỗ, tạo khe co giãn theo thiết kế.',
  'Khóa vỉa hè xây gạch không nung dày 11 cm, VXM M75, trát M75 dày 1,5 cm trên móng bê tông M150 dày 10 cm.',
  'Hố trồng cây (73 hố) kích thước 1,0×1,0 m: móng bê tông M150 dày 10 cm, thành bê tông M200.',
  'Nền vỉa hè đầm chặt K ≥ 0,95; trải nilon chống mất nước; đổ bê tông lót đá 1×2 M150 dày 10 cm; lát gạch giả đá 400×400×50 mm bằng vữa xi măng, dốc 2% về phía mặt đường; chèn mạch, vệ sinh.'].forEach(t => K.push(['-', t]));

K.push(['h2', '10. Thi công cấp nước sinh hoạt và PCCC']);
['Đào rãnh đặt ống dưới vỉa hè đúng độ sâu thiết kế; tại vị trí qua đường đặt ống lồng thép bảo vệ.',
  'Ống HDPE D110, D50 nối bằng phương pháp hàn nhiệt đối đầu hoặc măng sông điện trở; phụ kiện van, tê, cút lắp theo bản vẽ; gối đỡ, mố néo bê tông tại các vị trí đổi hướng.',
  'Lắp đặt 05 trụ cứu hỏa DN100, van chặn, đồng hồ; đấu nối với nguồn ống HDPE D110 khu dân cư Phú Quý khi được đơn vị cấp nước chấp thuận.',
  'Thử áp lực từng đoạn tuyến với áp lực thử theo chỉ dẫn kỹ thuật (thường bằng 1,5 lần áp lực làm việc, giữ tối thiểu 30 phút không sụt áp); súc xả, khử trùng đường ống trước khi đưa vào sử dụng.',
  'Nhà bơm, bể nước PCCC: thi công móng, bể BTCT, nhà bơm khung BTCT tường xây; lắp máy bơm chữa cháy, tủ điều khiển, đường ống thép tráng kẽm; chạy thử liên động.'].forEach(t => K.push(['-', t]));

K.push(['h2', '11. Thi công cầu dầm bản BTCT DƯL L = 12 m']);
K.push(['h3', 'a) Ép cọc BTCT 30×30 cm, L = 31,5 m']);
['Cọc đúc sẵn tại nhà máy hoặc bãi đúc, kiểm tra kích thước, cường độ trước khi vận chuyển; nối cọc bằng bản mã hàn theo thiết kế.',
  'Ép cọc thử để kiểm tra sức chịu tải, xác định chiều dài, lực ép thiết kế; thí nghiệm nén tĩnh theo TCVN 9393:2012 với số lượng cọc thí nghiệm theo thiết kế và hợp đồng.',
  'Ép đại trà bằng máy ép 200 T; ghi nhật ký ép cọc từng đoạn; dừng ép khi đạt đồng thời chiều dài và lực ép thiết kế; cắt đầu cọc, đập bê tông đầu cọc đúng cao độ.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'b) Mố cầu và bản chuyển tiếp']);
['Đào hố móng mố, bơm hút nước, đổ bê tông lót; lắp dựng cốt thép, ván khuôn bệ mố, thân mố, tường cánh; đổ bê tông 30 MPa liên tục bằng xe bơm, đầm dùi, bảo dưỡng ẩm tối thiểu 7 ngày.',
  'Thi công đá kê gối, lắp gối cao su bản thép 200×150×28 mm đúng vị trí, cao độ.',
  'Đắp đất sau mố từng lớp, đầm chặt; quét nhựa đường lòng mố, chèn bao tải tẩm nhựa đường khe; thi công bản chuyển tiếp dài 4,0 m dày 30 cm trên lớp đá dăm 10 cm.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'c) Đúc dầm bản DƯL kéo trước tại bãi đúc']);
['Thi công bệ căng, bệ đúc; kiểm định kích, đồng hồ áp lực; thí nghiệm cáp DƯL 12,7 mm Grade 270 (ASTM A416).',
  'Lắp cốt thép thường, ống tạo lỗ, căng cáp từng tao đến lực thiết kế 138 kN/tao sau khi tháo kích; ghi biên bản căng kéo (lực căng, độ dãn dài).',
  'Đổ bê tông dầm f\'c = 40 MPa liên tục; bảo dưỡng; khi bê tông đạt cường độ theo thiết kế mới cắt cáp đối xứng qua tim dầm; cắt cáp hai đầu, quét keo epoxy chống ăn mòn.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'd) Lao lắp dầm, bản mặt cầu, lan can, mặt cầu']);
['Vận chuyển dầm từ bãi đúc đến vị trí bằng xe chuyên dụng; lao lắp bằng cần cẩu bánh xích 50 T theo biện pháp được duyệt; điều chỉnh dầm đúng vị trí gối.',
  'Lắp cốt thép, đổ bê tông bản mặt cầu f\'c = 30 MPa dày tối thiểu 15 cm liên kết các dầm; lắp khe co giãn răng lược, ống thoát nước D150 bằng gang.',
  'Đổ gờ chắn bánh BTCT 25 MPa, lắp lan can thép ống D110/101 mm bằng bu lông; quét lớp phòng nước, tưới nhựa dính bám 0,5 kg/m², rải BTN C16 dày 7 cm cùng đợt với mặt đường.'].forEach(t => K.push(['-', t]));

K.push(['h2', '12. Thi công điện trung áp, trạm biến áp, hạ áp và chiếu sáng']);
['Đường dây 35 kV ngầm (115 m): đào rãnh cáp; rải cát đen dày 400 mm; kéo cáp Cu/XLPE/PVC/DSTA/PVC 3×120 mm² luồn trong ống HDPE 160/125 (ống thép mạ kẽm D219 tại vị trí qua đường); đặt tấm đan bê tông bảo vệ, lưới báo hiệu cáp; lấp đất dày 700 mm.',
  'Đấu nối tại cột 95 lộ 371E9.18: lắp xà, cầu dao phụ tải 35 kV, chống sét van, sứ, tiếp địa RC-4, hộp đầu cáp theo phương án cắt điện đã đăng ký với Điện lực Hoằng Hóa.',
  'Trạm biến áp kiosk 320 kVA – 35(22)/0,4 kV: thi công móng trạm, hệ thống tiếp địa; cẩu lắp vỏ trạm, máy biến áp, tủ RMU 35 kV, tủ hạ thế; đấu nối cáp.',
  'Lưới 0,4 kV (4 lộ, khoảng 1.082 m): kéo cáp Cu/XLPE/PVC/DSTA/PVC trong ống HDPE 105/80 đặt trong rãnh cáp và hào kỹ thuật; lắp 08 tủ công tơ 12 công tơ trên móng bê tông, tiếp địa RC-2; đặt chờ ống HDPE 32/25 đến các hộ.',
  'Chiếu sáng: đổ móng cột (29 móng), dựng cột thép bát giác 7 m (27 cột đơn, 2 cột đôi), lắp đèn LED 100 W kết hợp bộ năng lượng mặt trời, kéo cáp 3×16+1×10 mm² trong ống HDPE 50/40; lắp tủ điều khiển chiếu sáng 100 A cạnh trạm biến áp; tiếp địa lặp lại RC-1.',
  'Thí nghiệm, hiệu chỉnh thiết bị (máy biến áp, tủ RMU, cáp, chống sét, tiếp địa...) do đơn vị thí nghiệm có năng lực thực hiện; nghiệm thu đóng điện cùng Điện lực Hoằng Hóa.'].forEach(t => K.push(['-', t]));

K.push(['h2', '13. Công tác bê tông, cốt thép, ván khuôn chung']);
['Ván khuôn thép hoặc gỗ ép, kín khít, đủ cứng, đúng kích thước; quét chất chống dính; nghiệm thu trước khi đổ bê tông.',
  'Cốt thép gia công tại bãi, đúng chủng loại, đường kính, chiều dài nối, chiều dày lớp bảo vệ (con kê bê tông); nghiệm thu trước khi lắp ván khuôn thành.',
  'Bê tông trộn bằng máy hoặc bê tông thương phẩm theo cấp phối đã duyệt; kiểm tra độ sụt tại hiện trường; lấy mẫu thí nghiệm cường độ theo TCVN 4453:1995; đầm kỹ, không để rỗ.',
  'Bảo dưỡng ẩm liên tục tối thiểu 7 ngày (TCVN 8828:2011); tháo ván khuôn khi bê tông đạt cường độ cho phép.'].forEach(t => K.push(['-', t]));

K.push(['h2', '14. Hoàn thiện, nghiệm thu và bàn giao']);
['Vệ sinh toàn bộ mặt bằng, khơi thông rãnh, hố ga, cống; hoàn trả mặt bằng tạm; tháo dỡ lán trại.',
  'Lập bản vẽ hoàn công, hồ sơ quản lý chất lượng theo Phụ lục VII Nghị định số 207/2026/NĐ-CP; tổ chức nghiệm thu hoàn thành hạng mục, công trình và bàn giao đưa vào sử dụng.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'CHƯƠNG V. BIỆN PHÁP BẢO ĐẢM CHẤT LƯỢNG, AN TOÀN, MÔI TRƯỜNG VÀ TIẾN ĐỘ']);
['Chất lượng: thực hiện theo "Kế hoạch, biện pháp kiểm tra, kiểm soát chất lượng thi công xây dựng" của Nhà thầu; mọi công việc phải được nghiệm thu trước khi chuyển bước thi công.',
  'An toàn lao động, phòng chống cháy nổ, an toàn giao thông, vệ sinh môi trường: thực hiện theo "Kế hoạch tổng hợp về an toàn" đã được Chủ đầu tư chấp thuận.',
  'Mùa mưa bão: chuẩn bị máy bơm, bạt che, rãnh thoát nước tạm; không thi công đất, BTN khi trời mưa; chằng chống lán trại, hạ cần trục khi có bão.',
  'Bảo đảm tiến độ: theo dõi tiến độ hằng tuần; khi chậm so với kế hoạch tăng ca, bổ sung nhân lực, thiết bị; báo cáo Chủ đầu tư hằng tháng.',
  'Phối hợp: Nhà thầu chính chịu trách nhiệm điều phối mặt bằng, tiến độ, chất lượng, an toàn đối với phần việc của nhà thầu phụ ' + PJ.TP + '.'].forEach(t => K.push(['-', t]));

out.push(...render(K), ...endSign());
save(out, process.argv[2], { title: 'Biện pháp thi công' }).then(() => console.log('written', process.argv[2]));
