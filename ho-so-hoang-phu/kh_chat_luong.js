// 3. KẾ HOẠCH, BIỆN PHÁP KIỂM TRA, KIỂM SOÁT CHẤT LƯỢNG THI CÔNG XÂY DỰNG
const { P, B, header, title, render, save } = require('./lib');
const { PJ, makeCover, endSign } = require('./project');

const out = [];
out.push(makeCover('KẾ HOẠCH, BIỆN PHÁP KIỂM TRA,', 'KIỂM SOÁT CHẤT LƯỢNG THI CÔNG XÂY DỰNG'), 'PB');
out.push(header(PJ.ORG, '......../KHCL-HT', PJ.NOI));
out.push(...title('KẾ HOẠCH', 'Biện pháp kiểm tra, kiểm soát chất lượng thi công xây dựng công trình'));

const K = [];
K.push(['p', 'Dự án: ' + PJ.DA + '.']);
K.push(['p', PJ.GT + '. Địa điểm: ' + PJ.DD + '.']);

K.push(['h1', 'I. CĂN CỨ LẬP KẾ HOẠCH']);
PJ.CANCU_CHUNG.forEach(t => K.push(['-', t]));
K.push(['-', 'Biện pháp thi công, Kế hoạch tổng hợp về an toàn và Bộ biểu mẫu biên bản nghiệm thu áp dụng cho gói thầu.']);

K.push(['h1', 'II. THÔNG TIN CHUNG VỀ CÔNG TRÌNH']);
K.push(['-', 'Chủ đầu tư: ' + PJ.CDT + '.']);
K.push(['-', 'Nhà thầu thi công: ' + PJ.NT + '; nhà thầu phụ: ' + PJ.TP + ' (' + PJ.TP_PV + ').']);
K.push(['-', 'Giá hợp đồng: ' + PJ.GIA + '; thời gian thực hiện: ' + PJ.TG + '.']);
PJ.QUYMO.forEach(x => K.push(x));

K.push(['h1', 'III. SƠ ĐỒ TỔ CHỨC VÀ TRÁCH NHIỆM QUẢN LÝ CHẤT LƯỢNG']);
K.push(['h2', '1. Sơ đồ tổ chức']);
K.push(['p', 'Giám đốc Công ty → Chỉ huy trưởng công trường → Bộ phận quản lý chất lượng (QA/QC, thí nghiệm, trắc đạc) và cán bộ kỹ thuật phụ trách từng hạng mục → Tổ trưởng các tổ đội thi công (kể cả nhà thầu phụ). Bộ phận QA/QC hoạt động độc lập với bộ phận thi công, báo cáo trực tiếp Chỉ huy trưởng.']);
K.push(['tbl', [600, 3000, 2300, 3200], ['TT', 'Chức danh', 'Họ và tên', 'Trách nhiệm chính về chất lượng'], [
  ['1', 'Giám đốc Công ty', PJ.GD, 'Chịu trách nhiệm toàn diện về chất lượng gói thầu trước Chủ đầu tư và pháp luật'],
  ['2', 'Chỉ huy trưởng công trường', '....................', 'Tổ chức thực hiện kế hoạch; ký phiếu yêu cầu nghiệm thu; ký biên bản nghiệm thu giai đoạn, hoàn thành'],
  ['3', 'Cán bộ QA/QC', '....................', 'Kiểm tra nội bộ trước khi mời nghiệm thu; quản lý hồ sơ chất lượng'],
  ['4', 'Cán bộ kỹ thuật giao thông, thoát nước', '....................', 'Hướng dẫn, giám sát thi công; ký biên bản nghiệm thu công việc'],
  ['5', 'Cán bộ kỹ thuật cầu', '....................', 'Như trên đối với hạng mục cầu'],
  ['6', 'Cán bộ kỹ thuật điện, cấp nước', '....................', 'Như trên đối với hạng mục điện, cấp nước'],
  ['7', 'Cán bộ trắc đạc', '....................', 'Định vị, đo đạc, kiểm tra kích thước hình học, lập số liệu hoàn công'],
  ['8', 'Cán bộ thí nghiệm hiện trường', '....................', 'Lấy mẫu, thí nghiệm hiện trường; phối hợp phòng thí nghiệm'],
  ['9', 'Đại diện nhà thầu phụ', '....................', 'Chịu trách nhiệm chất lượng phần việc của nhà thầu phụ trước Nhà thầu chính'],
]]);
K.push(['h2', '2. Phòng thí nghiệm']);
K.push(['-', 'Phòng thí nghiệm chuyên ngành xây dựng hợp tác: ......................................................., mã số LAS-XD ............; phạm vi phép thử phù hợp với các chỉ tiêu nêu tại Mục V. Hồ sơ năng lực phòng thí nghiệm được trình Chủ đầu tư, Tư vấn giám sát chấp thuận trước khi thí nghiệm.']);
K.push(['-', 'Phòng thí nghiệm hiện trường đặt tại công trường gồm: bộ rót cát, cân, tủ sấy, côn đo độ sụt, khuôn đúc mẫu bê tông, thước 3 m, nhiệt kế đo nhiệt độ BTN.']);

K.push(['h1', 'IV. MỤC TIÊU, CHÍNH SÁCH ĐẢM BẢO CHẤT LƯỢNG']);
['Thi công đúng hồ sơ thiết kế được duyệt, chỉ dẫn kỹ thuật, quy chuẩn và tiêu chuẩn áp dụng; 100% công việc được nghiệm thu đạt yêu cầu ngay lần đầu hoặc sau khi khắc phục.',
  'Không sử dụng vật liệu, sản phẩm, cấu kiện, thiết bị chưa được nghiệm thu; không chuyển bước thi công khi công việc trước chưa được nghiệm thu.',
  'Hồ sơ quản lý chất lượng được lập đồng thời với tiến độ thi công, đầy đủ, trung thực, có thể truy xuất.',
  'Việc nghiệm thu của Chủ đầu tư không làm giảm trách nhiệm của Nhà thầu về chất lượng phần việc do mình thực hiện.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'V. KẾ HOẠCH THÍ NGHIỆM, KIỂM TRA VẬT LIỆU VÀ CHẤT LƯỢNG THI CÔNG']);
K.push(['i', 'Tần suất dưới đây là tần suất tối thiểu tham khảo theo tiêu chuẩn; trường hợp chỉ dẫn kỹ thuật của gói thầu quy định khác thì áp dụng theo chỉ dẫn kỹ thuật.']);
K.push(['tbl', [450, 1900, 2500, 2050, 2200], ['TT', 'Vật liệu / Công tác', 'Chỉ tiêu thí nghiệm, kiểm tra', 'Tiêu chuẩn áp dụng', 'Tần suất'], [
  '#A. VẬT LIỆU ĐẦU VÀO',
  ['1', 'Đất đắp nền (đất đồi)', 'Thành phần hạt, giới hạn chảy, chỉ số dẻo, đầm nén tiêu chuẩn (γcmax, Wopt), CBR', 'TCVN 4447:2012; TCVN 12790:2020; TCVN 8821:2011', 'Mỗi mỏ / 10.000 m³ hoặc khi thay đổi nguồn'],
  ['2', 'Cấp phối đá dăm loại I, II', 'Thành phần hạt, chỉ số dẻo, độ hao mòn Los Angeles, hàm lượng hạt dẹt, CBR, đầm nén', 'TCVN 8859:2023', '3.000 m³ / 1 mẫu, mỗi nguồn'],
  ['3', 'Bê tông nhựa C16 và vật liệu chế tạo (đá, cát, bột khoáng, nhựa đường)', 'Thành phần hạt, hàm lượng nhựa, độ ổn định Marshall, độ rỗng; chỉ tiêu nhựa đường', 'TCVN 13567-1:2022; TCVN 7493:2005; TCVN 8860:2011', 'Thiết kế hỗn hợp trước khi sản xuất; mỗi ngày rải / 200 tấn'],
  ['4', 'Nhựa thấm bám, dính bám', 'Các chỉ tiêu theo loại nhựa', 'TCVN 8818-1:2011 / TCVN 8817-1:2011', 'Mỗi lô hàng'],
  ['5', 'Xi măng PCB40', 'Cường độ, thời gian đông kết, độ ổn định thể tích', 'TCVN 6260:2020', '50 tấn / 1 mẫu, mỗi lô'],
  ['6', 'Cát, đá dăm cho bê tông, vữa', 'Thành phần hạt, hàm lượng bùn sét, tạp chất, cường độ đá gốc', 'TCVN 7570:2006; TCVN 7572:2006', '200 m³ (cát), 200 m³ (đá) / 1 mẫu'],
  ['7', 'Nước trộn bê tông, vữa', 'Các chỉ tiêu hóa', 'TCVN 4506:2012', 'Mỗi nguồn'],
  ['8', 'Thép cốt bê tông', 'Giới hạn chảy, giới hạn bền, độ giãn dài, uốn', 'TCVN 1651-1:2018; TCVN 1651-2:2018', 'Mỗi lô ≤ 50 tấn, mỗi đường kính / 1 tổ mẫu'],
  ['9', 'Cáp DƯL 12,7 mm, neo', 'Lực kéo đứt, giới hạn chảy, độ giãn dài, chùng ứng suất', 'ASTM A416; TCVN 6284:1997', 'Mỗi lô'],
  ['10', 'Gạch bê tông không nung', 'Kích thước, cường độ nén, độ hút nước', 'TCVN 6477:2016', 'Mỗi lô ≤ 100.000 viên'],
  ['11', 'Gạch lát giả đá 400×400×50', 'Kích thước, cường độ uốn, độ mài mòn, độ hút nước', 'TCVN 6065:1995 / TCVN 7744:2013', 'Mỗi lô'],
  ['12', 'Bó vỉa, tấm đan, ống cống BTCT D300 đúc sẵn', 'Kích thước, cường độ bê tông, khả năng chịu tải (ống cống)', 'TCVN 9113:2012; TCVN 4453:1995', 'Mỗi lô sản xuất'],
  ['13', 'Ống HDPE, phụ kiện; ống PVC', 'Kích thước, chiều dày, áp lực danh định (theo chứng chỉ nhà sản xuất)', 'TCVN 7305:2008; TCVN 8491:2011', 'Mỗi lô hàng'],
  ['14', 'Cáp điện, phụ kiện, máy biến áp, tủ RMU, tủ hạ thế, đèn chiếu sáng', 'Chứng nhận hợp quy, biên bản thử nghiệm xuất xưởng; thí nghiệm hiệu chỉnh trước khi đóng điện', 'Theo quy chuẩn, tiêu chuẩn chuyên ngành điện', 'Mỗi thiết bị / mỗi lô'],
  ['15', 'Gối cầu cao su bản thép, khe co giãn', 'Kích thước, độ cứng, chứng chỉ chất lượng', 'TCVN 10308:2014', 'Mỗi lô'],
  ['16', 'Sơn vạch kẻ đường nhiệt dẻo', 'Các chỉ tiêu cơ lý, độ phản quang', 'TCVN 8791:2018', 'Mỗi lô'],
  '#B. KIỂM TRA TRONG QUÁ TRÌNH THI CÔNG',
  ['17', 'Nền đắp K95, K98', 'Độ chặt K (rót cát), độ ẩm; cao độ, bề rộng, độ dốc', 'TCVN 8730:2012; TCVN 9436:2012', '800 m² / 1 điểm mỗi lớp (tối thiểu 3 điểm / lớp / đoạn)'],
  ['18', 'Móng CPĐD loại I, II', 'Độ chặt K ≥ 0,98; chiều dày; độ bằng phẳng; cao độ', 'TCVN 8859:2023', '800 m² / 1 điểm độ chặt; 25 m / 1 mặt cắt hình học'],
  ['19', 'Mặt đường BTN C16', 'Nhiệt độ khi rải, lu; chiều dày, độ chặt (khoan mẫu); độ bằng phẳng (thước 3 m); độ nhám', 'TCVN 13567-1:2022', 'Mỗi chuyến xe (nhiệt độ); 2.500 m² / 1 tổ mẫu khoan'],
  ['20', 'Bê tông các loại (M100 – M250, 25 – 40 MPa)', 'Độ sụt; cường độ nén mẫu 28 ngày', 'TCVN 4453:1995; TCVN 3105:2022; TCVN 3118:2022', 'Mỗi mẻ (độ sụt); mỗi kết cấu / mỗi đợt đổ ≥ 1 tổ 3 mẫu theo TCVN 4453'],
  ['21', 'Vữa xây, trát', 'Cường độ nén', 'TCVN 3121:2022', 'Mỗi hạng mục / 1 tổ mẫu'],
  ['22', 'Cọc BTCT ép', 'Nhật ký ép (lực ép, chiều dài); thí nghiệm nén tĩnh', 'TCVN 9394:2012; TCVN 9393:2012', '100% cọc (nhật ký); số cọc thí nghiệm theo thiết kế'],
  ['23', 'Dầm bản DƯL', 'Lực căng, độ dãn dài; cường độ bê tông khi cắt cáp; kích thước, độ vồng', 'TCVN 12885:2020; hồ sơ thiết kế', 'Mỗi dầm'],
  ['24', 'Cống thoát nước thải, bể xử lý', 'Thử kín nước; cao độ đáy, độ dốc', 'Chỉ dẫn kỹ thuật', 'Mỗi đoạn giữa hai giếng; mỗi bể'],
  ['25', 'Đường ống cấp nước', 'Thử áp lực; súc xả, khử trùng', 'Chỉ dẫn kỹ thuật; quy định của đơn vị cấp nước', 'Mỗi đoạn tuyến'],
  ['26', 'Tiếp địa, cáp điện, thiết bị điện', 'Điện trở nối đất; điện trở cách điện; thí nghiệm cao áp; thí nghiệm máy biến áp', 'Quy chuẩn, tiêu chuẩn ngành điện', '100% vị trí / thiết bị'],
  ['27', 'Vạch sơn', 'Kích thước, chiều dày, độ phản quang', 'TCVN 8791:2018', 'Mỗi tuyến'],
], { center: [0] }]);

K.push(['h1', 'VI. BIỆN PHÁP KIỂM SOÁT VẬT LIỆU, SẢN PHẨM, CẤU KIỆN, THIẾT BỊ']);
['Trước khi đặt hàng: trình Chủ đầu tư, Tư vấn giám sát hồ sơ nguồn gốc, nhà sản xuất, catalogue, chứng nhận hợp quy/hợp chuẩn; chỉ đặt hàng khi được chấp thuận.',
  'Khi vật liệu về công trường: kiểm tra chủng loại, số lượng, quy cách, CO/CQ, nhãn mác; lấy mẫu thí nghiệm dưới sự chứng kiến của Tư vấn giám sát (BM-04).',
  'Nghiệm thu vật liệu, sản phẩm, cấu kiện, thiết bị trước khi đưa vào sử dụng theo Điều 14 Nghị định số 207/2026/NĐ-CP (BM-05); biên bản ghi rõ tên, chủng loại, khối lượng, số sê-ri/số lô.',
  'Vật liệu không đạt phải đánh dấu, cách ly và chuyển khỏi công trường trong vòng 24 giờ; lập biên bản.',
  'Bảo quản: xi măng trong kho kín, kê cao; thép kê cao, che mưa; vật liệu rời để trên nền cứng, phân ô theo chủng loại; thiết bị điện để trong kho, giữ nguyên bao bì đến khi lắp đặt.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'VII. QUY TRÌNH KIỂM TRA, GIÁM SÁT VÀ NGHIỆM THU']);
K.push(['h2', '1. Quy trình chung']);
K.push(['tbl', [600, 3800, 2400, 2300], ['Bước', 'Nội dung', 'Trách nhiệm', 'Biểu mẫu'], [
  ['1', 'Nhận bàn giao mặt bằng, tim mốc; kiểm tra năng lực nhà thầu', 'Chủ đầu tư, TVGS, Nhà thầu', 'BM-02, BM-03'],
  ['2', 'Lấy mẫu, nghiệm thu vật liệu đầu vào', 'Nhà thầu, TVGS', 'BM-04, BM-05'],
  ['3', 'Thi công, tự kiểm tra (đo đạc, thí nghiệm hiện trường), ghi nhật ký', 'Cán bộ kỹ thuật, QA/QC', 'Nhật ký thi công (BM-13)'],
  ['4', 'Lập phiếu yêu cầu nghiệm thu gửi TVGS', 'Chỉ huy trưởng', 'BM-01'],
  ['5', 'Nghiệm thu công việc xây dựng (TVGS nghiệm thu kịp thời, không quá 24 giờ kể từ khi nhận yêu cầu)', 'TVGS, cán bộ kỹ thuật nhà thầu', 'BM-06'],
  ['6', 'Nghiệm thu giai đoạn / bộ phận công trình', 'Chủ đầu tư, TVGS, Nhà thầu', 'BM-07'],
  ['7', 'Nghiệm thu hoàn thành hạng mục / công trình; bàn giao', 'Chủ đầu tư và các bên', 'BM-08, BM-09'],
], { center: [0] }]);
K.push(['i', 'Ký hiệu biểu mẫu theo Bộ biểu mẫu biên bản nghiệm thu áp dụng cho gói thầu (được Chủ đầu tư chấp thuận).']);
K.push(['h2', '2. Các điểm dừng kiểm tra bắt buộc (không được thi công tiếp khi chưa nghiệm thu)']);
['Đáy nền sau khi vét hữu cơ; từng lớp đất đắp; lớp K98; từng lớp móng CPĐD; mặt móng trước khi tưới nhựa.',
  'Đáy hố móng rãnh, cống, giếng, hố ga, bể, mố cầu; cốt thép, ván khuôn trước khi đổ bê tông.',
  'Cọc ép trước khi thi công bệ mố; dầm DƯL trước khi cắt cáp và trước khi lao lắp; gối cầu trước khi lắp dầm.',
  'Cống, ống trước khi lấp (sau thử kín nước, thử áp lực); cáp ngầm trước khi lấp rãnh; tiếp địa trước khi lấp.',
  'Thiết bị điện trước khi đóng điện (biên bản thí nghiệm hiệu chỉnh đạt yêu cầu).'].forEach(t => K.push(['-', t]));

K.push(['h1', 'VIII. YÊU CẦU KIỂM TRA KÍCH THƯỚC HÌNH HỌC CHỦ YẾU']);
K.push(['i', 'Sai số cho phép dưới đây áp dụng khi hồ sơ thiết kế, chỉ dẫn kỹ thuật không quy định khác.']);
K.push(['tbl', [500, 2400, 3000, 3200], ['TT', 'Hạng mục', 'Chỉ tiêu', 'Sai số cho phép'], [
  ['1', 'Nền đường', 'Cao độ; bề rộng; độ dốc ngang; độ dốc taluy', '-20 ÷ +10 mm; -10 cm; ±0,5%; không dốc hơn thiết kế'],
  ['2', 'Móng CPĐD', 'Chiều dày; cao độ; độ bằng phẳng (thước 3 m)', '±5% chiều dày (≤ 10 mm); -10 ÷ +5 mm; ≤ 10 mm'],
  ['3', 'Mặt đường BTN C16', 'Chiều dày; bề rộng; độ dốc ngang; độ bằng phẳng (thước 3 m)', '-5% chiều dày; không nhỏ hơn thiết kế; ±0,25%; ≤ 5 mm'],
  ['4', 'Bó vỉa, đan rãnh', 'Tim, cao độ; mạch nối', '±10 mm; đều, thẳng'],
  ['5', 'Rãnh, cống thoát nước', 'Cao độ đáy; độ dốc dọc; kích thước lòng', '±10 mm; đúng chiều dốc thiết kế; ±10 mm'],
  ['6', 'Kết cấu bê tông cốt thép', 'Kích thước tiết diện; lớp bê tông bảo vệ; vị trí tim', 'Theo TCVN 4453:1995 và TCVN 9115:2019'],
  ['7', 'Cọc ép', 'Độ lệch tâm đầu cọc; độ nghiêng', 'Theo TCVN 9394:2012'],
  ['8', 'Vỉa hè lát gạch', 'Độ phẳng (thước 2 m); độ dốc; mạch lát', '≤ 3 mm; đúng 2%; thẳng, đều'],
], { center: [0] }]);

K.push(['h1', 'IX. QUAN TRẮC, ĐO ĐẠC']);
['Kiểm tra định kỳ hệ thống mốc khống chế (hằng tháng và sau mưa bão); lập sổ đo, báo cáo Tư vấn giám sát.',
  'Quan trắc lún nền đắp tại các vị trí nền đất yếu, đặc biệt đường đầu cầu, theo yêu cầu của hồ sơ thiết kế; dừng đắp khi tốc độ lún vượt giới hạn cho phép và báo cáo xử lý.',
  'Đo độ vồng dầm DƯL sau khi cắt cáp và trước khi lao lắp; quan trắc lún mố cầu trong quá trình thi công.',
  'Số liệu đo đạc là cơ sở lập bản vẽ hoàn công và hồ sơ hoàn thành công trình.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'X. KIỂM SOÁT SỰ KHÔNG PHÙ HỢP VÀ HÀNH ĐỘNG KHẮC PHỤC']);
['Khi phát hiện công việc, vật liệu không đạt yêu cầu: dừng thi công phần việc liên quan, đánh dấu khu vực, lập biên bản (BM-11 hoặc BM-12).',
  'Phân tích nguyên nhân, đề xuất biện pháp khắc phục (sửa chữa, làm lại, gia cố) trình Tư vấn giám sát chấp thuận; trường hợp ảnh hưởng đến thiết kế phải có ý kiến của nhà thầu thiết kế và Chủ đầu tư.',
  'Thực hiện khắc phục, kiểm tra lại, nghiệm thu lại; chi phí khắc phục do Nhà thầu chịu.',
  'Tổng hợp các sự không phù hợp hằng tháng để rút kinh nghiệm, phòng ngừa tái diễn.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'XI. HỒ SƠ QUẢN LÝ CHẤT LƯỢNG VÀ BẢN VẼ HOÀN CÔNG']);
['Hồ sơ được lập, lưu trữ theo danh mục hồ sơ hoàn thành công trình tại Phụ lục VII Nghị định số 207/2026/NĐ-CP, gồm: biên bản nghiệm thu vật liệu, công việc, giai đoạn, hoàn thành; kết quả thí nghiệm, quan trắc, đo đạc; nhật ký thi công; bản vẽ hoàn công; CO/CQ vật liệu, thiết bị; lý lịch thiết bị; quy trình vận hành, bảo trì.',
  'Nhật ký thi công lập theo Phụ lục IIa, bản vẽ hoàn công lập theo Phụ lục IIb Nghị định số 207/2026/NĐ-CP; bản vẽ hoàn công được lập ngay sau khi nghiệm thu từng công việc, bộ phận bị che khuất.',
  'Nhà thầu phụ lập bản vẽ hoàn công, hồ sơ chất lượng phần việc của mình và chuyển Nhà thầu chính kiểm tra, tổng hợp.',
  'Hồ sơ được sắp xếp theo hạng mục, đánh số, có danh mục; lưu bản gốc tại công trường và bản sao tại văn phòng Công ty.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'XII. BẢO HÀNH CÔNG TRÌNH']);
['Nhà thầu thực hiện bảo hành công trình theo hợp đồng và quy định của Nghị định số 207/2026/NĐ-CP kể từ ngày nghiệm thu hoàn thành đưa vào sử dụng.',
  'Trong thời gian bảo hành, Nhà thầu cử cán bộ phụ trách; khắc phục hư hỏng trong thời gian quy định kể từ khi nhận thông báo của Chủ đầu tư.'].forEach(t => K.push(['-', t]));

K.push(['h1', 'XIII. TỔ CHỨC THỰC HIỆN']);
K.push(['p', 'Kế hoạch này được Nhà thầu trình Chủ đầu tư chấp thuận trước khi thi công và phổ biến tới toàn bộ cán bộ, công nhân, nhà thầu phụ. Trong quá trình thi công, Kế hoạch được cập nhật khi có thay đổi thiết kế, biện pháp thi công hoặc theo yêu cầu của Chủ đầu tư, Tư vấn giám sát.']);

out.push(...render(K), ...endSign());
save(out, process.argv[2], { title: 'Kế hoạch kiểm soát chất lượng' }).then(() => console.log('written', process.argv[2]));
