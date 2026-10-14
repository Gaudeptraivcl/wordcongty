// 1. KẾ HOẠCH TỔNG HỢP VỀ AN TOÀN
const { P, B, I, header, title, render, save } = require('./lib');
const { PJ, makeCover, endSign } = require('./project');

const out = [];
out.push(makeCover('KẾ HOẠCH TỔNG HỢP VỀ AN TOÀN', 'TRONG THI CÔNG XÂY DỰNG CÔNG TRÌNH'), 'PB');
out.push(header(PJ.ORG, '......../KH-HT', PJ.NOI));
out.push(...title('KẾ HOẠCH', 'Tổng hợp về an toàn trong thi công xây dựng công trình'));

const K = [];
K.push(['p', 'Dự án: ' + PJ.DA + '.']);
K.push(['p', PJ.GT + '.']);
K.push(['p', 'Địa điểm xây dựng: ' + PJ.DD + '.']);

K.push(['h1', 'PHẦN I. CĂN CỨ LẬP KẾ HOẠCH']);
[
  'Luật An toàn, vệ sinh lao động số 84/2015/QH13 và các văn bản hướng dẫn thi hành;',
  'Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ số 55/2024/QH15;',
  'Luật Bảo vệ môi trường số 72/2020/QH14;',
  'Luật Trật tự, an toàn giao thông đường bộ số 36/2024/QH15;',
  ...PJ.CANCU_CHUNG.slice(0, 3),
  'Nghị định số 44/2016/NĐ-CP ngày 15/5/2016 của Chính phủ quy định chi tiết một số điều của Luật An toàn, vệ sinh lao động về hoạt động kiểm định kỹ thuật an toàn lao động, huấn luyện an toàn, vệ sinh lao động và quan trắc môi trường lao động (đã được sửa đổi, bổ sung);',
  'QCVN 18:2021/BXD – Quy chuẩn kỹ thuật quốc gia về An toàn trong thi công xây dựng;',
  'QCVN 01:2020/BCT – Quy chuẩn kỹ thuật quốc gia về An toàn điện;',
  'TCVN 4055:2012 – Tổ chức thi công; TCVN 3254:1989 – An toàn cháy. Yêu cầu chung; TCVN 2292:1978 – Công việc sơn. Yêu cầu chung về an toàn;',
  ...PJ.CANCU_CHUNG.slice(3),
  'Biện pháp thi công và tiến độ thi công của Nhà thầu.',
].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN II. THÔNG TIN CHUNG']);
K.push(['h2', '1. Các bên tham gia']);
K.push(['tbl', [600, 2600, 5900], ['TT', 'Vai trò', 'Đơn vị'], [
  ['1', 'Chủ đầu tư', PJ.CDT + ' – đại diện: ' + PJ.CDT_DD],
  ['2', 'Tư vấn lập Báo cáo KT-KT', PJ.TVTK],
  ['3', 'Tư vấn giám sát', '....................................................................'],
  ['4', 'Nhà thầu thi công', PJ.NT + ' – đại diện: Ông ' + PJ.GD + ', Giám đốc; địa chỉ: ' + PJ.NT_DC],
  ['5', 'Nhà thầu phụ', PJ.TP + ' – đại diện: ' + PJ.TP_DD + '. Phạm vi: ' + PJ.TP_PV],
]]);
K.push(['h2', '2. Quy mô công trình']);
PJ.QUYMO.forEach(x => K.push(x));
K.push(['h2', '3. Giá trị và thời gian thực hiện']);
K.push(['-', 'Giá hợp đồng (trọn gói): ' + PJ.GIA + '.']);
K.push(['-', 'Thời gian thực hiện hợp đồng: ' + PJ.TG + '.']);
K.push(['h2', '4. Đặc điểm hiện trường ảnh hưởng đến an toàn']);
[
  'Công trường nằm trong khu dân cư, tiếp giáp đường hiện trạng và khu dân cư Phú Quý; có người dân, phương tiện qua lại thường xuyên.',
  'Có đường dây trung thế 35 kV đang vận hành (lộ 371E9.18) tại vị trí đấu nối cột 95; nhiều công việc phải thực hiện gần hoặc đấu nối vào lưới điện.',
  'Khối lượng đào, đắp lớn; nhiều hố móng, rãnh, hố ga, hào kỹ thuật; nền đất yếu khu vực cầu phải ép cọc dài 31,5 m.',
  'Thi công cầu có công việc làm việc trên cao, gần nước, lao lắp dầm DƯL 12 m bằng cần trục.',
  'Thời gian thi công kéo dài qua mùa mưa bão (tháng 8 – 11) của tỉnh Thanh Hoá; nguy cơ ngập úng, sạt lở hố đào.',
].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN III. MỤC TIÊU VÀ CHÍNH SÁCH AN TOÀN']);
[
  'Không để xảy ra tai nạn lao động chết người, sự cố công trình, cháy nổ và sự cố môi trường trong suốt quá trình thi công.',
  '100% người lao động được huấn luyện an toàn, vệ sinh lao động, khám sức khỏe và trang bị đầy đủ phương tiện bảo vệ cá nhân trước khi vào làm việc.',
  '100% máy, thiết bị có yêu cầu nghiêm ngặt về an toàn lao động được kiểm định còn hiệu lực trước khi đưa vào sử dụng.',
  'Bảo đảm an toàn giao thông, an ninh trật tự, vệ sinh môi trường khu vực thi công và khu dân cư lân cận.',
  'Mọi người trên công trường có quyền và nghĩa vụ dừng công việc khi phát hiện nguy cơ mất an toàn và báo ngay cho cán bộ phụ trách.',
].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN IV. TỔ CHỨC BỘ MÁY QUẢN LÝ AN TOÀN']);
K.push(['h2', '1. Sơ đồ tổ chức']);
K.push(['p', 'Giám đốc Công ty → Chỉ huy trưởng công trường → Cán bộ chuyên trách an toàn lao động – Cán bộ kỹ thuật các hạng mục → Tổ trưởng các tổ đội (kể cả tổ đội của nhà thầu phụ) → An toàn vệ sinh viên → Người lao động.']);
K.push(['tbl', [600, 2700, 2600, 3200], ['TT', 'Chức danh', 'Họ và tên', 'Ghi chú'], [
  ['1', 'Giám đốc Công ty (người chịu trách nhiệm cao nhất)', PJ.GD, 'Phê duyệt kế hoạch, bố trí nguồn lực'],
  ['2', 'Chỉ huy trưởng công trường', '....................', 'Trực tiếp chỉ đạo công tác an toàn'],
  ['3', 'Cán bộ chuyên trách an toàn lao động', '....................', 'Có chứng chỉ huấn luyện nhóm 2 (nhóm 3 khi kiêm nhiệm)'],
  ['4', 'Cán bộ kỹ thuật giao thông, thoát nước', '....................', ''],
  ['5', 'Cán bộ kỹ thuật cầu', '....................', ''],
  ['6', 'Cán bộ kỹ thuật điện', '....................', 'Bậc an toàn điện phù hợp'],
  ['7', 'Cán bộ y tế / sơ cứu', '....................', 'Có thể kiêm nhiệm'],
  ['8', 'Đại diện nhà thầu phụ phụ trách an toàn', '....................', PJ.TP],
]]);
K.push(['h2', '2. Trách nhiệm']);
K.push(['h3', 'a) Giám đốc Công ty']);
['Chịu trách nhiệm toàn diện trước pháp luật và Chủ đầu tư về công tác an toàn của gói thầu, kể cả phần việc do nhà thầu phụ thực hiện.',
  'Phê duyệt Kế hoạch tổng hợp về an toàn; bố trí đủ nhân sự, kinh phí, phương tiện bảo vệ cá nhân, thiết bị an toàn.',
  'Tổ chức điều tra, báo cáo khi xảy ra tai nạn lao động, sự cố theo quy định.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'b) Chỉ huy trưởng công trường']);
['Tổ chức thực hiện Kế hoạch tổng hợp về an toàn; phê duyệt biện pháp an toàn chi tiết cho từng công việc có nguy cơ cao.',
  'Không cho phép thi công khi chưa có biện pháp an toàn hoặc biện pháp chưa được thực hiện đầy đủ.',
  'Chủ trì họp an toàn hằng tuần; phối hợp với Tư vấn giám sát, Chủ đầu tư và chính quyền địa phương.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'c) Cán bộ chuyên trách an toàn lao động']);
['Kiểm tra hiện trường hằng ngày, ghi nhật ký an toàn; lập phiếu kiểm tra và yêu cầu khắc phục; đình chỉ công việc khi có nguy cơ mất an toàn.',
  'Tổ chức huấn luyện, phổ biến nội quy an toàn đầu ca (5 – 10 phút) và khi có thay đổi biện pháp thi công.',
  'Quản lý hồ sơ kiểm định thiết bị, danh sách người lao động, sổ cấp phát bảo hộ lao động; tổng hợp báo cáo định kỳ.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'd) Cán bộ kỹ thuật, tổ trưởng, an toàn vệ sinh viên']);
['Hướng dẫn biện pháp an toàn cụ thể cho công nhân trước khi giao việc; kiểm tra điều kiện an toàn nơi làm việc trước mỗi ca.',
  'Giám sát việc sử dụng phương tiện bảo vệ cá nhân; nhắc nhở, báo cáo hành vi vi phạm.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'đ) Người lao động']);
['Chấp hành nội quy, quy trình, biện pháp an toàn; sử dụng đúng, đủ phương tiện bảo vệ cá nhân được cấp phát.',
  'Từ chối làm công việc khi thấy rõ nguy cơ xảy ra tai nạn đe dọa nghiêm trọng tính mạng, sức khỏe và báo ngay cho người phụ trách.'].forEach(t => K.push(['-', t]));
K.push(['h3', 'e) Nhà thầu phụ']);
['Thực hiện Kế hoạch này đối với phần việc được giao; cử người phụ trách an toàn; chịu sự kiểm tra, giám sát của Nhà thầu chính.',
  'Người lao động của nhà thầu phụ phải được huấn luyện, khám sức khỏe, trang bị bảo hộ như người lao động của Nhà thầu chính.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN V. NHẬN DIỆN MỐI NGUY VÀ ĐÁNH GIÁ RỦI RO']);
K.push(['p', 'Mức rủi ro được đánh giá theo khả năng xảy ra và mức độ hậu quả: Cao (C) – phải có biện pháp chi tiết được Chỉ huy trưởng duyệt và giám sát liên tục; Trung bình (TB) – kiểm soát bằng biện pháp chung và kiểm tra hằng ngày; Thấp (T).']);
K.push(['tbl', [500, 2100, 3000, 700, 2800], ['TT', 'Công việc / Hạng mục', 'Mối nguy', 'Mức', 'Biện pháp kiểm soát chính'], [
  ['1', 'Đào nền, đào khuôn, vét hữu cơ', 'Sạt lở thành hố đào; máy đào va chạm người; rơi xuống hố', 'C', 'Mở mái taluy theo đất; rào chắn, biển báo; cấm người trong bán kính quay máy; người xi nhan'],
  ['2', 'Đắp nền K95, K98; lu lèn', 'Xe, máy lu cán, va chạm; lật máy ở mép taluy', 'C', 'Người điều khiển giao thông; giữ khoảng cách mép taluy ≥ 1 m; còi lùi, đèn cảnh báo'],
  ['3', 'Thi công móng CPĐD, rải BTN C16, tưới nhựa', 'Bỏng nhựa nóng (140 – 160 °C); cháy; hít khí độc; xe va chạm', 'C', 'Quần áo, găng, ủng chịu nhiệt; bình chữa cháy tại máy rải; cấm lửa trần gần nhựa lỏng'],
  ['4', 'Rãnh thoát nước, hố thu, giếng thăm, cống D300', 'Sạt lở rãnh sâu; ngã xuống hố; vật rơi; tấm đan đè', 'C', 'Chống vách khi sâu > 1,5 m hoặc đất yếu; lan can, nắp đậy tạm; cẩu lắp có người chỉ huy'],
  ['5', 'Hào kỹ thuật, giếng, bể xử lý (không gian hạn chế)', 'Thiếu ôxy, khí độc, ngạt; ngập nước', 'C', 'Đo khí trước khi vào; thông gió; người giám sát bên ngoài; dây cứu sinh'],
  ['6', 'Ép cọc BTCT 30×30 cm dài 31,5 m', 'Đổ máy ép, rơi cọc khi cẩu; dây cáp đứt; kẹp tay', 'C', 'Nền đặt máy đầm chặt, kê tà vẹt; kiểm tra cáp, móc; cấm đứng dưới tải'],
  ['7', 'Đúc dầm DƯL, căng kéo cáp', 'Đứt cáp, bật neo khi căng; đổ ván khuôn', 'C', 'Rào khu vực căng kéo, cấm người đứng phía sau kích và hai đầu bệ; tấm chắn bảo vệ'],
  ['8', 'Lao lắp dầm cầu, cẩu lắp cấu kiện', 'Lật cần trục; rơi dầm; va chạm đường dây điện', 'C', 'Cần trục được kiểm định; người điều khiển có chứng chỉ; tính toán tải; khoảng cách an toàn với điện'],
  ['9', 'Làm việc trên cao, sát mép nước (mố, mặt cầu, lan can)', 'Ngã cao; đuối nước', 'C', 'Dây an toàn toàn thân; lan can tạm, lưới an toàn; phao cứu sinh tại mép nước'],
  ['10', 'Ván khuôn, cốt thép, đổ bê tông', 'Đổ ván khuôn; thép đâm; điện giật máy đầm; vật rơi', 'TB', 'Kiểm tra cây chống, giằng; che đầu thép chờ; máy đầm có tiếp địa, cầu dao chống giật'],
  ['11', 'Điện thi công', 'Điện giật, chập cháy', 'C', 'Tủ điện có CB chống dòng rò ≤ 30 mA; dây bọc cách điện, treo cao; thợ điện có bậc an toàn'],
  ['12', 'Cáp ngầm 35 kV, đấu nối cột 95, TBA 320 kVA, đóng điện', 'Điện giật cao áp; phóng điện; ngã cao khi đấu nối', 'C', 'Phiếu công tác, cắt điện, thử điện, tiếp địa di động; phối hợp Điện lực Hoằng Hóa'],
  ['13', 'Hàn, cắt kim loại', 'Bỏng; cháy; tia hồ quang; chai khí nổ', 'TB', 'Mặt nạ hàn; bình chữa cháy; chai khí đặt đứng, có xích giữ, cách nguồn lửa ≥ 10 m'],
  ['14', 'Hàn nối ống HDPE, lắp ống cấp nước, thử áp lực', 'Bỏng máy gia nhiệt; bung đầu ống khi thử áp', 'TB', 'Tăng áp từng cấp; cấm người đứng ở đầu ống, đầu bịt khi thử'],
  ['15', 'Sơn kẻ vạch nhiệt dẻo', 'Bỏng; cháy lò nấu sơn; xe va chạm', 'TB', 'Rào chắn, nón giao thông; bình chữa cháy theo lò nấu'],
  ['16', 'Vận chuyển vật liệu, xe, máy ra vào công trường', 'Tai nạn giao thông với người dân; rơi vãi', 'C', 'Người điều tiết tại cổng; giới hạn tốc độ 5 km/h; phủ bạt thùng xe'],
  ['17', 'Thời tiết mưa bão, nắng nóng', 'Sét đánh; ngập; sạt lở; say nắng', 'TB', 'Dừng thi công khi gió ≥ cấp 5 với công việc cẩu, trên cao; chống sét; nước uống, bố trí giờ làm'],
], { center: [0, 3] }]);

K.push(['h1', 'PHẦN VI. BIỆN PHÁP AN TOÀN CHUNG TRÊN CÔNG TRƯỜNG']);
K.push(['h2', '1. Tổng mặt bằng và rào chắn']);
['Bố trí tổng mặt bằng thi công gồm: nhà tạm, nhà điều hành, kho, bãi vật liệu, bãi đúc dầm (bên phải mố M1), khu gia công cốt thép, khu tập kết xe máy, nhà vệ sinh, điểm thu gom rác; đường tạm và lối thoát hiểm.',
  'Rào chắn kín khu vực bãi đúc dầm, kho, khu thi công cầu; các khu vực đào, hố, rãnh rào bằng barie, dây phản quang và đèn cảnh báo ban đêm.',
  'Cổng công trường có biển công trình, nội quy công trường, sơ đồ tổng mặt bằng, số điện thoại khẩn cấp; có người bảo vệ 24/24 giờ.',
  'Lắp đặt biển báo theo quy chuẩn báo hiệu đường bộ hiện hành tại các điểm giao với đường hiện trạng.',
].forEach(t => K.push(['-', t]));
K.push(['h2', '2. Người lao động']);
['Chỉ sử dụng người lao động đủ 18 tuổi, có giấy chứng nhận sức khỏe, được huấn luyện an toàn và có thẻ an toàn; danh sách được cập nhật hằng tuần.',
  'Người làm công việc có yêu cầu nghiêm ngặt về an toàn (vận hành cần trục, thợ hàn, thợ điện, làm việc trên cao, vận hành máy ép cọc, căng kéo DƯL) phải có chứng chỉ huấn luyện nhóm 3 và chứng chỉ nghề phù hợp.',
  'Huấn luyện lần đầu trước khi vào làm việc; huấn luyện lại khi thay đổi công việc, thiết bị, biện pháp; phổ biến an toàn đầu ca hằng ngày.',
  'Cấp phát đầy đủ phương tiện bảo vệ cá nhân: mũ bảo hộ, giày/ủng, quần áo bảo hộ có phản quang, găng tay, kính, khẩu trang, dây an toàn toàn thân, ủng cách điện, găng cách điện, quần áo chịu nhiệt.',
  'Cấm uống rượu, bia, sử dụng chất kích thích trước và trong giờ làm việc.'].forEach(t => K.push(['-', t]));
K.push(['h2', '3. Máy, thiết bị thi công']);
['Máy, thiết bị phải có lý lịch, được kiểm tra trước khi đưa vào công trường và được Tư vấn giám sát chấp thuận.',
  'Thiết bị thuộc danh mục có yêu cầu nghiêm ngặt về an toàn lao động (cần trục ô tô, cần trục bánh xích, cổng trục, tời, pa lăng, xe nâng, máy vận thăng, bình chịu áp lực của máy nén khí...) phải được kiểm định và còn hiệu lực kiểm định.',
  'Người vận hành phải có chứng chỉ phù hợp; chỉ người được giao mới được vận hành; máy có còi lùi, đèn cảnh báo, gương chiếu hậu.',
  'Kiểm tra hằng ngày trước khi vận hành (phanh, cáp, móc, thiết bị khống chế quá tải, hệ thống thủy lực); ghi sổ theo dõi.'].forEach(t => K.push(['-', t]));
K.push(['tbl', [600, 4300, 1400, 2800], ['TT', 'Thiết bị phải kiểm định trước khi sử dụng', 'Số lượng', 'Số giấy kiểm định / hạn'], [
  ['1', 'Cần trục ô tô 10 T', '..........', ''], ['2', 'Cần cẩu bánh xích 50 T (lao lắp dầm)', '..........', ''], ['3', 'Cần cẩu bánh hơi 16 T, 25 T', '..........', ''],
  ['4', 'Cổng trục 60 T tại bãi đúc dầm', '..........', ''], ['5', 'Tời điện 5 T, pa lăng xích 5 T', '..........', ''], ['6', 'Máy ép cọc 200 T, kích nâng 100 – 500 T', '..........', ''],
  ['7', 'Xe nâng hàng 2 T, xe nâng người 12 m', '..........', ''], ['8', 'Máy nén khí (bình chịu áp lực)', '..........', ''], ['9', 'Máy vận thăng 0,8 T (nếu sử dụng)', '..........', ''],
], { center: [0, 2] }]);
K.push(['h2', '4. An toàn điện thi công']);
['Nguồn điện thi công lấy từ lưới điện khu vực qua công tơ và tủ điện tổng; có cầu dao tổng, aptomat chống dòng rò cho từng nhánh.',
  'Dây dẫn dùng cáp bọc cách điện, đi trên cột cao ≥ 2,5 m (≥ 5 m khi qua đường xe); cấm đặt dây dưới đất nơi xe qua lại hoặc ngâm nước.',
  'Vỏ kim loại máy hàn, máy trộn, máy đầm, tủ điện phải được nối đất bảo vệ; kiểm tra điện trở nối đất trước khi sử dụng.',
  'Chỉ thợ điện được phân công mới được đấu nối, sửa chữa; cắt điện và treo biển "Cấm đóng điện – Có người đang làm việc" khi sửa chữa.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN VII. BIỆN PHÁP AN TOÀN CHO CÁC CÔNG VIỆC CÓ NGUY CƠ CAO']);
K.push(['h2', '1. Công tác đào, đắp đất và hố móng']);
['Trước khi đào phải xác định vị trí công trình ngầm (cáp điện, ống nước, cáp viễn thông) cùng đơn vị quản lý; đánh dấu và bảo vệ.',
  'Hố đào sâu trên 1,5 m hoặc đất yếu, bão hòa nước phải đào mở mái theo độ dốc an toàn hoặc chống vách; không chất vật liệu, đất đào trong phạm vi 1 m từ mép hố.',
  'Có thang lên xuống hố đào; rào chắn, biển báo quanh hố; đèn đỏ cảnh báo ban đêm.',
  'Bơm thoát nước hố móng; dừng thi công và kiểm tra thành hố sau mưa lớn trước khi cho người xuống.',
  'Không cho người đứng trong bán kính quay của máy đào cộng thêm 5 m; ô tô nhận đất phải đứng ngoài phạm vi sạt lở và tài xế ra khỏi cabin khi máy đổ đất (trừ cabin có mái bảo vệ).'].forEach(t => K.push(['-', t]));
K.push(['h2', '2. Thi công mặt đường bê tông nhựa và tưới nhựa']);
['Rào chắn, bố trí người cảnh giới; xe chở BTN lùi vào máy rải phải có người hướng dẫn.',
  'Công nhân thao tác BTN nóng mặc quần áo dài, giày/ủng chịu nhiệt, găng tay, khẩu trang; không đứng trước bánh lu, máy rải.',
  'Tưới nhựa thấm bám: cấm lửa trần trong phạm vi 25 m; có bình chữa cháy bột, cát tại vị trí thi công.'].forEach(t => K.push(['-', t]));
K.push(['h2', '3. Ép cọc, thi công mố cầu']);
['Nền đặt máy ép được san phẳng, đầm chặt, kê tà vẹt; kiểm tra độ ổn định đối trọng trước mỗi lần ép.',
  'Cẩu cọc dùng móc, cáp đã kiểm tra; có người đánh tín hiệu; cấm người đứng dưới cọc đang cẩu và trong phạm vi bán kính đổ của cọc.',
  'Ván khuôn, đà giáo mố được tính toán, lắp dựng theo biện pháp được duyệt; sàn công tác có lan can cao ≥ 1,0 m.'].forEach(t => K.push(['-', t]));
K.push(['h2', '4. Đúc dầm DƯL kéo trước và lao lắp dầm']);
['Bệ căng, neo, kích được kiểm tra, kiểm định; đồng hồ áp lực được hiệu chuẩn.',
  'Khu vực căng kéo được rào chắn; trong khi căng cấm người đứng ở hai đầu bệ, phía sau kích; đặt tấm chắn bảo vệ tại đầu bệ.',
  'Lập biện pháp lao lắp dầm riêng, được Tư vấn giám sát chấp thuận: vị trí đứng cần trục, tải trọng, tầm với, cáp treo, nền đặt cần trục.',
  'Chỉ một người chỉ huy cẩu lắp; dừng cẩu khi gió từ cấp 5 trở lên, trời mưa to, tầm nhìn hạn chế.',
  'Đảm bảo khoảng cách an toàn từ cần trục đến đường dây điện trên không theo QCVN 18:2021/BXD và QCVN 01:2020/BCT.'].forEach(t => K.push(['-', t]));
K.push(['h2', '5. Làm việc trên cao và gần mặt nước']);
['Làm việc ở độ cao từ 2 m trở lên phải có sàn công tác, lan can hoặc dây an toàn toàn thân móc vào điểm neo chắc chắn.',
  'Lắp lưới an toàn dưới khu vực thi công mặt cầu; thu dọn dụng cụ, vật liệu trên cao để tránh rơi.',
  'Tại khu vực mố cầu sát nước bố trí phao cứu sinh, sào cứu hộ; người làm việc sát mép nước phải mặc áo phao.'].forEach(t => K.push(['-', t]));
K.push(['h2', '6. Thi công trong không gian hạn chế (hào kỹ thuật, giếng thăm, bể xử lý, bể nước)']);
['Chỉ vào khi có lệnh của cán bộ kỹ thuật; đo nồng độ ôxy (19,5 – 23,5%) và khí độc trước khi vào và định kỳ trong khi làm việc.',
  'Thông gió cưỡng bức; luôn có người giám sát bên ngoài; người vào mang dây cứu sinh; dùng đèn chiếu sáng điện áp an toàn.'].forEach(t => K.push(['-', t]));
K.push(['h2', '7. Thi công điện trung áp 35 kV, trạm biến áp và đóng điện']);
['Lập phương án cắt điện, đấu nối và đăng ký lịch cắt điện với Điện lực Hoằng Hóa theo thỏa thuận đấu nối số 72/2026/TTĐNCĐ ngày 10/7/2026.',
  'Thực hiện đúng trình tự: phiếu công tác – cắt điện – thử không còn điện – đặt tiếp địa di động – treo biển báo – rào chắn khu vực làm việc.',
  'Người làm việc có thẻ an toàn điện bậc phù hợp; sử dụng găng, ủng cách điện, sào thao tác đã được thử nghiệm.',
  'Thí nghiệm hiệu chỉnh và đóng điện do đơn vị có năng lực thực hiện; khu vực thử nghiệm cao áp được rào chắn và có người canh gác.'].forEach(t => K.push(['-', t]));
K.push(['h2', '8. Hàn, cắt và sử dụng khí nén']);
['Thợ hàn có chứng chỉ; máy hàn có tiếp địa; khu vực hàn có bình chữa cháy và tấm che tia hồ quang.',
  'Chai khí đặt thẳng đứng, có giá giữ, tránh nắng và nguồn nhiệt; ống dẫn khí không rò rỉ, có van chống cháy ngược.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN VIII. BẢO ĐẢM AN TOÀN GIAO THÔNG VÀ AN NINH TRẬT TỰ']);
['Lập phương án phân luồng, bảo đảm giao thông tại các điểm đấu nối với đường hiện trạng; bố trí biển báo, cọc tiêu, đèn cảnh báo, người điều tiết giao thông.',
  'Xe vận chuyển vật liệu không chở quá tải, phủ bạt kín; rửa bánh xe trước khi ra khỏi công trường.',
  'Bảo đảm lối đi lại an toàn cho người dân trong suốt thời gian thi công; hoàn trả mặt bằng tạm sau khi thi công xong từng đoạn.',
  'Đăng ký tạm trú cho người lao động với chính quyền địa phương; quản lý người ra vào công trường; bảo vệ trực 24/24 giờ.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN IX. VỆ SINH LAO ĐỘNG VÀ BẢO VỆ MÔI TRƯỜNG']);
['Bụi: tưới nước đường công vụ, bãi vật liệu 2 – 3 lần/ngày vào ngày nắng; che phủ vật liệu rời.',
  'Tiếng ồn, rung: không vận hành máy gây ồn lớn (ép cọc, lu rung) từ 22h00 đến 6h00 và trong giờ nghỉ trưa trong khu dân cư.',
  'Nước thải: bố trí rãnh, hố lắng tạm; không xả nước có dầu mỡ, vữa xi măng trực tiếp ra kênh mương.',
  'Chất thải rắn: phân loại, thu gom về điểm tập kết, hợp đồng vận chuyển đến nơi quy định; chất thải nguy hại (dầu thải, giẻ dính dầu, vỏ thùng nhựa đường) lưu chứa riêng.',
  'Nhà vệ sinh tạm, nước uống sạch, khu nghỉ giữa ca có mái che; tủ thuốc sơ cứu tại nhà điều hành.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN X. PHÒNG CHÁY, CHỮA CHÁY']);
['Lập phương án PCCC cho công trường; thành lập đội PCCC cơ sở gồm cán bộ, công nhân được huấn luyện.',
  'Trang bị bình chữa cháy (bột ABC, CO₂) tại nhà điều hành, kho, khu gia công, khu hàn, máy rải BTN, lò nấu sơn; bể cát, xẻng, thùng nước.',
  'Kho xăng dầu, nhựa đường, sơn đặt cách xa nguồn lửa, có biển cấm lửa; không đun nấu trong khu vực thi công.',
  'Kiểm tra hệ thống điện, tắt thiết bị điện khi hết ca làm việc.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN XI. ỨNG PHÓ TÌNH HUỐNG KHẨN CẤP']);
K.push(['h2', '1. Nguyên tắc chung']);
['Khi xảy ra sự cố: dừng công việc, cắt nguồn nguy hiểm (điện, máy), sơ cứu ban đầu, gọi cấp cứu, báo ngay Chỉ huy trưởng; giữ nguyên hiện trường.',
  'Chỉ huy trưởng báo cáo Giám đốc Công ty, Chủ đầu tư, Tư vấn giám sát và cơ quan chức năng theo quy định.'].forEach(t => K.push(['-', t]));
K.push(['h2', '2. Kịch bản ứng phó']);
K.push(['tbl', [500, 2300, 6300], ['TT', 'Tình huống', 'Hành động ứng phó'], [
  ['1', 'Tai nạn lao động (ngã cao, vật rơi, máy cán)', 'Sơ cứu tại chỗ, cầm máu, cố định; gọi 115 hoặc đưa đến cơ sở y tế gần nhất; báo cáo và lập biên bản.'],
  ['2', 'Sạt lở hố đào, vùi lấp', 'Dừng máy gần khu vực; cứu người bằng dụng cụ thủ công; gia cố thành hố chống sạt tiếp; gọi cấp cứu.'],
  ['3', 'Điện giật', 'Cắt nguồn điện hoặc dùng vật cách điện tách nạn nhân; hô hấp nhân tạo, ép tim ngoài lồng ngực; gọi cấp cứu.'],
  ['4', 'Cháy, nổ', 'Báo động; dùng bình chữa cháy tại chỗ; sơ tán người; gọi 114; cắt điện khu vực cháy.'],
  ['5', 'Mưa bão, áp thấp nhiệt đới, ngập lụt', 'Theo dõi bản tin dự báo; chằng chống lán trại, hạ cần trục, thu dọn vật tư; ngừng thi công trên cao, dưới hố; bơm thoát nước; bố trí trực ứng phó 24/24.'],
  ['6', 'Sự cố công trình (đổ ván khuôn, sập đà giáo, nứt kết cấu)', 'Sơ tán người khỏi khu vực; khoanh vùng nguy hiểm; báo Chủ đầu tư, Tư vấn giám sát để xử lý theo quy định về sự cố công trình.'],
], { center: [0] }]);
K.push(['h2', '3. Thông tin liên lạc khẩn cấp']);
K.push(['tbl', [600, 4700, 3800], ['TT', 'Đơn vị / Người liên hệ', 'Số điện thoại'], [
  ['1', 'Cấp cứu y tế', '115'], ['2', 'Cảnh sát PCCC và CNCH', '114'], ['3', 'Công an', '113'],
  ['4', 'Trạm y tế xã Hoằng Phú', '....................'], ['5', 'Điện lực Hoằng Hóa', '....................'],
  ['6', 'Chỉ huy trưởng công trường', '....................'], ['7', 'Cán bộ chuyên trách an toàn', '....................'],
  ['8', 'Đại diện Chủ đầu tư', '....................'], ['9', 'Tư vấn giám sát', '....................'],
], { center: [0, 2] }]);

K.push(['h1', 'PHẦN XII. KIỂM TRA, GIÁM SÁT VÀ BÁO CÁO']);
K.push(['tbl', [600, 3500, 2200, 2800], ['TT', 'Nội dung', 'Tần suất', 'Người thực hiện'], [
  ['1', 'Phổ biến an toàn đầu ca', 'Hằng ngày', 'Cán bộ kỹ thuật, tổ trưởng'],
  ['2', 'Kiểm tra hiện trường, ghi nhật ký an toàn', 'Hằng ngày', 'Cán bộ chuyên trách an toàn'],
  ['3', 'Kiểm tra máy, thiết bị trước khi vận hành', 'Mỗi ca', 'Người vận hành'],
  ['4', 'Họp giao ban an toàn', 'Hằng tuần', 'Chỉ huy trưởng'],
  ['5', 'Kiểm tra tổng thể có Tư vấn giám sát tham gia', 'Hằng tháng', 'Chỉ huy trưởng, TVGS'],
  ['6', 'Báo cáo tình hình an toàn gửi Chủ đầu tư', 'Hằng tháng, đột xuất', 'Nhà thầu'],
  ['7', 'Rà soát, cập nhật Kế hoạch', 'Khi thay đổi biện pháp hoặc sau sự cố', 'Chỉ huy trưởng'],
], { center: [0] }]);
['Vi phạm nội quy an toàn bị nhắc nhở, lập biên bản, đình chỉ công việc hoặc buộc rời công trường tùy mức độ; khen thưởng tổ, cá nhân thực hiện tốt.',
  'Hồ sơ an toàn lưu tại công trường gồm: Kế hoạch này và các biện pháp chi tiết; danh sách, chứng chỉ huấn luyện, giấy khám sức khỏe; hồ sơ kiểm định thiết bị; sổ cấp phát bảo hộ lao động; nhật ký an toàn; biên bản kiểm tra; báo cáo định kỳ.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'PHẦN XIII. TỔ CHỨC THỰC HIỆN']);
K.push(['p', 'Kế hoạch tổng hợp về an toàn này được Nhà thầu lập trước khi khởi công, trình Chủ đầu tư chấp thuận và phổ biến đến toàn bộ cán bộ, công nhân (kể cả nhà thầu phụ). Trong quá trình thi công, Kế hoạch được rà soát, cập nhật phù hợp với thực tế và các biện pháp thi công chi tiết.']);

out.push(...render(K), ...endSign());
save(out, process.argv[2], { title: 'Kế hoạch tổng hợp về an toàn' }).then(() => console.log('written', process.argv[2]));
