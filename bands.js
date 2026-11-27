/* IELTS Ocean · Luật rừng: phân tích band descriptors + nhập điểm + đề xuất.
   Nội dung là phần diễn giải tiếng Việt của IELTS Ocean, dựa trên Band Descriptors chính thức (IELTS, bản Writing cập nhật 5/2023). */
(function(){
const DOCS=[
  {f:'docs/ielts-writing-band-descriptors.pdf',t:'Writing Band Descriptors',s:'Task 1 + Task 2 · 9 trang · bản cập nhật 5/2023'},
  {f:'docs/ielts-speaking-band-descriptors.pdf',t:'Speaking Band Descriptors',s:'4 tiêu chí · 4 trang'}
];
const PRACTICE={
  writing:['#writing','Writing Mắt Xích','luyện câu Task 1 và chuỗi lập luận Task 2, có chữa lỗi'],
  vocab:['#tu-vung','Học từ vựng','40 từ mỗi topic, có ví dụ và từ gần nghĩa khác sắc thái'],
  dict:['#dictation','Dictation','nghe chép rồi shadowing lại từng câu']
};
/* d = band đó trông như thế nào · up[b] = muốn từ b lên b+1 thì đổi gì · traps = bẫy kẹt band */
const C={
TA:{n:'Task Achievement',vi:'Hoàn thành yêu cầu đề (Task 1)',pr:['writing'],
 d:{9:'Mọi yêu cầu của đề được đáp ứng trọn vẹn và đúng cách; nội dung gần như không có sơ hở.',
    8:'Đặc điểm chính được chọn lọc khéo, trình bày rõ, nhấn mạnh và có số liệu minh họa. Chỉ thỉnh thoảng sót hoặc hở.',
    7:'Có overview rõ ràng, dữ liệu được nhóm hợp lý, xu hướng và khác biệt chính đều được chỉ ra. Đặc điểm chính có nêu nhưng phần minh họa có thể chưa đầy đủ.',
    6:'Có cố gắng viết overview liên quan đến đề. Thông tin được chọn hợp lý và có số liệu đi kèm, nhưng có thể có chi tiết sai, thừa, thiếu hoặc chưa được mở rộng.',
    5:'Đặc điểm chính chưa được phủ đủ. Kể chi tiết một cách máy móc, có khi không có số liệu chứng minh, hay sa vào chi tiết mà không thấy bức tranh chung.',
    4:'Chỉ chọn được vài đặc điểm chính; những gì được nêu có thể lạc đề, lặp hoặc sai.'},
 low:'Band 3 trở xuống: không làm đúng yêu cầu đề, có thể do đọc sai biểu đồ; thông tin rất ít hoặc gần như không liên quan.',
 up:{4:'Phủ đủ các đặc điểm chính của biểu đồ và đưa số liệu vào.',
     5:'Viết một đoạn overview (dù chưa sắc) và chọn lọc thông tin thay vì kể lần lượt từng số. Số nào đưa vào cũng phải đúng.',
     6:'Overview phải rõ: nêu xu hướng chính hoặc khác biệt lớn nhất, không cần số. Nhóm dữ liệu (nhóm tăng / nhóm giảm, cao nhất / thấp nhất) thay vì đi từng hạng mục. Hết sai số liệu.',
     7:'Mỗi đặc điểm chính đều có số minh họa đầy đủ và được so sánh trực tiếp. Chọn đúng những con số quan trọng nhất, không sót ý lớn.',
     8:'Không còn sơ hở nào: đáp ứng mọi yêu cầu một cách đầy đủ và phù hợp.'},
 traps:['Không có overview: band 6 đã yêu cầu ít nhất có thử viết, band 7 cần overview rõ. Thiếu overview là kẹt ở 5–6.',
        'Kể từng số mà không so sánh bị coi là "máy móc", đặc điểm của band 5.',
        'Sai số liệu ở phần chính kéo thẳng về 5.',
        'Chỉ tả chi tiết, không thấy bức tranh chung: band 5.',
        'Dưới 20 từ là band 1; phần chép lại đề không được tính.']},
TR:{n:'Task Response',vi:'Trả lời đề (Task 2)',pr:['writing'],
 d:{9:'Đề được khai thác sâu. Quan điểm rõ, phát triển trọn vẹn và trả lời thẳng câu hỏi; ý nào cũng liên quan, được mở rộng và có dẫn chứng đầy đủ.',
    8:'Đề được trả lời đầy đủ. Quan điểm rõ và phát triển tốt; ý được mở rộng và có dẫn chứng. Thỉnh thoảng có chỗ sót hoặc hở.',
    7:'Trả lời được các phần chính của đề, quan điểm rõ và có phát triển. Ý chính có mở rộng, nhưng hay khái quát hóa quá mức hoặc dẫn chứng chưa trúng, chưa cụ thể.',
    6:'Trả lời các phần chính nhưng có phần mỏng hơn phần khác. Có quan điểm, nhưng kết luận có thể mơ hồ, thiếu căn cứ hoặc lặp lại. Một số ý chưa phát triển đủ, dẫn chứng chưa liên quan lắm.',
    5:'Trả lời đề chưa đủ. Có quan điểm nhưng phần phát triển không phải lúc nào cũng rõ. Ý ít, chưa phát triển, có thể có chi tiết lạc đề hoặc lặp.',
    4:'Trả lời rất tối thiểu hoặc lệch đề. Người đọc phải đọc kỹ mới thấy quan điểm; ý chính khó xác định.'},
 low:'Band 3 trở xuống: không phần nào của đề được trả lời thỏa đáng hoặc hiểu sai đề; không xác định được quan điểm.',
 up:{4:'Đọc kỹ đề và trả lời đúng câu hỏi; nêu quan điểm ngay ở mở bài.',
     5:'Trả lời đủ mọi phần của đề (đề hai câu hỏi thì trả lời cả hai). Mỗi thân bài có một ý chính rõ và có giải thích.',
     6:'Quan điểm nhất quán từ mở bài đến kết bài; các phần của đề được trả lời cân đối. Mỗi ý có chuỗi giải thích và một ví dụ cụ thể. Kết luận khớp với thân bài.',
     7:'Bỏ khái quát hóa quá mức: thay khẳng định chung chung bằng chuỗi lý do có từng bước và ví dụ chính xác. Ý nào cũng có dẫn chứng tốt.',
     8:'Khai thác đề có chiều sâu; không còn sơ hở về nội dung.'},
 traps:['Bỏ sót một phần của đề: "trả lời chưa đủ" là đặc điểm band 5.',
        'Kết luận mập mờ hoặc chỉ lặp lại: dấu hiệu band 6.',
        'Khái quát hóa quá mức, nhảy cóc từ một nhóm nhỏ lên cả xã hội: kẹt 7.',
        'Viết sai thể loại (gạch đầu dòng, ghi chú) có thể bị đánh giá là sai format.',
        'Bài học thuộc toàn bộ bị cho 0; dưới 20 từ là band 1.']},
CC:{n:'Coherence & Cohesion',vi:'Mạch lạc & liên kết',pr:['writing'],
 d:{9:'Đọc trôi tuyệt đối. Liên kết tự nhiên đến mức người đọc không để ý; chia đoạn khéo léo.',
    8:'Đọc dễ dàng. Ý sắp xếp logic, liên kết được quản lý tốt; chia đoạn đủ và hợp lý. Thỉnh thoảng hở.',
    7:'Tổ chức logic, mạch phát triển rõ suốt bài. Dùng nhiều phương tiện liên kết, kể cả đại từ và từ thay thế, nhưng còn vài chỗ sai hoặc dùng thừa/thiếu. (Task 2: chia đoạn hỗ trợ mạch bài, ý trong đoạn đi theo thứ tự hợp lý.)',
    6:'Sắp xếp nhìn chung mạch lạc và có tiến triển. Từ nối có tác dụng nhưng có thể máy móc, dùng sai, lạm dụng hoặc thiếu; đại từ và cách thay thế kém linh hoạt nên gây lặp. (Task 2: chia đoạn có lúc chưa hợp lý, ý trung tâm của đoạn có lúc không rõ.)',
    5:'Có tổ chức nhưng không hoàn toàn logic, thiếu mạch chung. Theo được ý nhưng các câu nối với nhau chưa trôi; từ nối ít hoặc lạm dụng; lặp vì không biết thay thế. (Task 2: chia đoạn chưa đủ hoặc không có.)',
    4:'Ý có nhưng không được sắp xếp mạch lạc, không có tiến triển. Quan hệ giữa các ý không rõ; chỉ dùng từ nối cơ bản, sai hoặc lặp. (Task 2: có thể không chia đoạn.)'},
 low:'Band 3 trở xuống: không có tổ chức logic, gần như không dùng từ nối, khó biết đại từ chỉ gì.',
 up:{4:'Chia bài thành đoạn, mỗi đoạn một nhóm ý.',
     5:'Mỗi câu nối với câu trước bằng một quan hệ rõ ràng; dùng từ nối đúng chức năng; đổi cách gọi để bớt lặp.',
     6:'Bỏ kiểu đặt Firstly / Moreover / In addition ở đầu mọi câu. Nối bằng this / these / such + danh từ, mệnh đề which, đại từ. Mỗi đoạn một câu chủ đề rõ, các câu sau đi theo chuỗi.',
     7:'Liên kết gần như không sai và vừa đủ, không thừa; chia đoạn hợp lý hoàn toàn.',
     8:'Liên kết "vô hình": người đọc không nhận ra mình đang được dẫn dắt.'},
 traps:['Lạm dụng từ nối là "máy móc": kẹt 6.',
        'Đại từ chỉ không rõ (it, they, this không biết thay cho gì): kẹt 6.',
        'Đoạn văn không có ý trung tâm (Task 2): đặc điểm band 6.',
        'Không chia đoạn ở Task 2: kéo về 5, thậm chí 4.']},
LR:{n:'Lexical Resource',vi:'Từ vựng (Writing)',pr:['vocab','writing'],
 d:{9:'Từ vựng rộng, chính xác và rất tự nhiên. Lỗi chính tả hay cấu tạo từ cực hiếm.',
    8:'Vốn từ rộng, dùng trôi chảy và linh hoạt để diễn đạt chính xác. Dùng khéo từ ít phổ biến hoặc thành ngữ khi hợp, dù đôi khi chọn từ hay collocation chưa chuẩn.',
    7:'Đủ để diễn đạt linh hoạt và chính xác ở mức nhất định. Dùng được một số từ ít phổ biến; có ý thức về văn phong và collocation nhưng vẫn có chỗ chưa phù hợp. Ít lỗi chính tả, không làm mờ nghĩa.',
    6:'Vốn từ nhìn chung đủ và phù hợp; nghĩa nhìn chung rõ dù phạm vi hẹp hoặc chọn từ chưa chính xác. Người "liều" dùng từ khó thì đa dạng hơn nhưng sai nhiều hơn. Có lỗi chính tả nhưng không cản trở.',
    5:'Vốn từ hạn chế nhưng tạm đủ. Từ đơn giản dùng đúng nhưng ít đa dạng; hay chọn từ không phù hợp, phải đơn giản hóa hoặc lặp. Lỗi chính tả gây khó đọc.',
    4:'Từ cơ bản, lặp, không đủ cho đề. Có thể dùng cụm học thuộc hoặc chép từ đề không phù hợp; sai từ, sai chính tả làm sai nghĩa.'},
 low:'Band 3 trở xuống: vốn từ không đủ (có thể do bài quá ngắn), phụ thuộc vào từ của đề hoặc cụm học thuộc, lỗi chiếm đa số.',
 up:{4:'Học từ theo chủ đề để đủ nói ý của mình; không chép nguyên cụm từ đề.',
     5:'Hết lặp từ khóa: có 2–3 cách nói cho mỗi khái niệm chính. Sửa chính tả các từ hay dùng.',
     6:'Học theo collocation chứ không học từ lẻ. Có vài từ ít phổ biến dùng đúng ngữ cảnh; giữ văn phong học thuật, không dùng văn nói.',
     7:'Dùng từ ít phổ biến và idiomatic một cách khéo và chính xác; lỗi collocation chỉ còn lác đác.',
     8:'Tự nhiên như người viết bản ngữ; gần như không còn lỗi.'},
 traps:['Nhồi từ "khó" sai ngữ cảnh: đa dạng hơn nhưng sai nhiều hơn, đặc điểm band 6.',
        'Câu mẫu, cụm học thuộc dùng gượng: đặc điểm band 4.',
        'Chép nhiều từ đề: không chứng minh được vốn từ của bạn.',
        'Lỗi chính tả lặp lại có hệ thống: khó qua 6.']},
GRA:{n:'Grammatical Range & Accuracy',vi:'Ngữ pháp (Writing)',pr:['writing'],
 d:{9:'Cấu trúc đa dạng, hoàn toàn linh hoạt và kiểm soát; ngữ pháp và dấu câu đúng suốt bài, lỗi cực hiếm.',
    8:'Cấu trúc đa dạng, linh hoạt và chính xác. Đa số câu không lỗi, dấu câu tốt; chỉ có lỗi lẻ tẻ, không thành hệ thống.',
    7:'Dùng nhiều cấu trúc phức với độ linh hoạt và chính xác nhất định. Câu không lỗi xuất hiện thường xuyên; còn vài lỗi nhưng không cản trở giao tiếp.',
    6:'Có cả câu đơn và câu phức nhưng kém linh hoạt; câu phức sai nhiều hơn câu đơn. Có lỗi ngữ pháp và dấu câu nhưng hiếm khi gây khó hiểu.',
    5:'Cấu trúc hạn chế và lặp. Câu phức có thử nhưng hay sai; câu đơn mới là chỗ đúng nhất. Lỗi có thể nhiều, gây khó cho người đọc; dấu câu có thể sai.',
    4:'Rất ít cấu trúc; hiếm mệnh đề phụ, chủ yếu câu đơn. Lỗi nhiều, có thể làm sai nghĩa; dấu câu thường sai.'},
 low:'Band 3 trở xuống: lỗi chiếm đa số (trừ cụm học thuộc), phần lớn nghĩa không truyền đạt được.',
 up:{4:'Viết được câu có mệnh đề phụ (because, when, which…).',
     5:'Kiểm soát chắc câu đơn; thêm câu phức đơn giản; soát chia động từ và số nhiều.',
     6:'Đặt mục tiêu "câu không lỗi xuất hiện thường xuyên": soát danh sách lỗi cá nhân sau mỗi bài. Dùng đúng mệnh đề quan hệ, V-ing, bị động, câu điều kiện.',
     7:'Đa số câu không lỗi; lỗi còn lại không lặp thành hệ thống; dấu câu chuẩn.',
     8:'Linh hoạt hoàn toàn, lỗi gần như không còn.'},
 traps:['Lỗi lặp lại có hệ thống (thì, số nhiều, hòa hợp chủ–vị): kẹt 6.',
        'Chỉ viết câu đơn: không lỗi vẫn kẹt 5 vì thiếu độ đa dạng.',
        'Câu phức dài nhưng sai nhiều: đặc điểm band 6.',
        'Comma splice, thiếu dấu câu: bị tính vào độ chính xác.']},
FC:{n:'Fluency & Coherence',vi:'Trôi chảy & mạch lạc',pr:['dict'],
 d:{9:'Trôi chảy, rất hiếm lặp hay tự sửa. Ngập ngừng chỉ để nghĩ nội dung, không phải để tìm từ; phát triển chủ đề mạch lạc và đủ dài.',
    8:'Trôi chảy, hiếm lặp hay tự sửa. Thỉnh thoảng ngập ngừng tìm từ, nhưng chủ yếu là do nghĩ nội dung. Phát triển chủ đề mạch lạc, phù hợp.',
    7:'Nói dài dễ dàng, không thấy tốn sức. Có ngập ngừng, lặp, tự sửa giữa câu vì tìm từ, nhưng không làm mất mạch. Dùng linh hoạt từ nối và discourse markers.',
    6:'Sẵn sàng nói dài, nhưng đôi lúc mất mạch vì ngập ngừng, lặp, tự sửa. Từ nối đa dạng nhưng không phải lúc nào cũng đúng.',
    5:'Thường duy trì được nhưng phải nhờ lặp, tự sửa hoặc nói chậm; hay ngập ngừng tìm từ và ngữ pháp cơ bản. Lạm dụng vài từ nối. Câu đơn giản thì trôi, câu phức là vấp.',
    4:'Không nói liền được, ngập ngừng rõ; nói chậm, lặp nhiều, hay tự sửa. Nối câu đơn bằng từ nối lặp đi lặp lại; có lúc đứt mạch.'},
 low:'Band 3 trở xuống: ngừng lâu để tìm từ, khó nối câu đơn, thường không truyền được ý cơ bản.',
 up:{4:'Luyện trả lời mỗi câu bằng 2–3 câu liền mạch về chủ đề quen thuộc.',
     5:'Luôn mở rộng câu trả lời (lý do + ví dụ); đa dạng từ nối thay vì "and… and…".',
     6:'Nói dài không tốn sức; khi tự sửa thì sửa nhanh, không bỏ dở mạch. Dùng discourse markers tự nhiên (well, actually, the thing is…).',
     7:'Ngập ngừng chủ yếu để nghĩ ý chứ không phải tìm từ hay ngữ pháp; phát triển ý trọn vẹn, đúng trọng tâm.',
     8:'Hiếm khi lặp hay tự sửa; mọi ngập ngừng đều vì nội dung.'},
 traps:['Trả lời cụt: không chứng minh được khả năng nói dài, kẹt 5–6.',
        'Ngập ngừng vì tìm từ, ngữ pháp cơ bản: đặc điểm band 5.',
        'Từ nối kiểu văn viết (Firstly, Moreover) dùng liên tục khi nói: lạm dụng, band 5.',
        'Tự sửa liên tục làm mất mạch: band 6.']},
SLR:{n:'Lexical Resource',vi:'Từ vựng (Speaking)',pr:['vocab'],
 d:{9:'Hoàn toàn linh hoạt và chính xác với mọi chủ đề; dùng ngôn ngữ chính xác, idiomatic một cách ổn định.',
    8:'Vốn từ rộng, dùng sẵn sàng và linh hoạt cho mọi chủ đề. Dùng khéo từ ít phổ biến và idiomatic dù đôi khi chọn từ, collocation chưa chuẩn; paraphrase hiệu quả.',
    7:'Dùng linh hoạt cho nhiều chủ đề. Có một số từ ít phổ biến, idiomatic; có ý thức về văn phong và collocation dù vẫn có chỗ chưa hợp; paraphrase hiệu quả.',
    6:'Đủ để nói dài về các chủ đề. Có thể dùng từ chưa hợp nhưng nghĩa vẫn rõ; nhìn chung paraphrase được.',
    5:'Đủ cho chủ đề quen và lạ nhưng kém linh hoạt. Có thử paraphrase nhưng không phải lúc nào cũng thành công.',
    4:'Đủ cho chủ đề quen; chủ đề lạ chỉ truyền được ý cơ bản. Chọn từ hay sai; hiếm khi thử paraphrase.'},
 low:'Band 3 trở xuống: chỉ có từ đơn giản để nói về bản thân, không đủ cho chủ đề lạ.',
 up:{4:'Học từ cho các chủ đề Part 1 phổ biến; tập nói lại một ý theo cách khác.',
     5:'Đủ từ để nói dài về mọi chủ đề. Quên từ thì diễn giải vòng thay vì dừng.',
     6:'Đưa vài từ ít phổ biến, collocation, idiom vào đúng chỗ. Chú ý văn phong: nói tự nhiên, không trang trọng như văn viết.',
     7:'Dùng idiomatic khéo léo và chính xác cho mọi chủ đề.',
     8:'Chính xác và tự nhiên tuyệt đối.'},
 traps:['Idiom học thuộc dùng gượng ép (raining cats and dogs): không được cộng mà còn thành chỗ "chưa phù hợp".',
        'Từ trang trọng kiểu văn viết trong Speaking: lỗi văn phong.',
        'Quên từ là dừng, không paraphrase được: kẹt 5.']},
SGRA:{n:'Grammatical Range & Accuracy',vi:'Ngữ pháp (Speaking)',pr:['dict'],
 d:{9:'Cấu trúc chính xác mọi lúc, chỉ có kiểu "lỡ lời" như người bản ngữ.',
    8:'Cấu trúc đa dạng, dùng linh hoạt; đa số câu không lỗi. Có chỗ chưa hợp và lỗi lẻ tẻ, có thể còn vài lỗi cơ bản.',
    7:'Nhiều cấu trúc, dùng linh hoạt; câu không lỗi xuất hiện thường xuyên. Dùng hiệu quả cả câu đơn và câu phức dù có lỗi; còn vài lỗi cơ bản.',
    6:'Kết hợp câu ngắn và câu phức, có nhiều cấu trúc nhưng kém linh hoạt. Câu phức hay sai nhưng hiếm khi gây khó hiểu.',
    5:'Kiểm soát khá câu cơ bản. Câu phức có thử nhưng ít, gần như luôn sai và có thể phải nói lại.',
    4:'Nói được câu cơ bản và vài câu ngắn không lỗi. Hiếm mệnh đề phụ; câu ngắn, cấu trúc lặp, lỗi nhiều.'},
 low:'Band 3 trở xuống: lỗi nhiều, trừ những câu có vẻ học thuộc.',
 up:{4:'Nói được câu có because, when, if.',
     5:'Kiểm soát chắc câu cơ bản (thì quá khứ, he/she, số nhiều), thêm câu phức ngắn.',
     6:'Câu phức đúng nhiều hơn sai: mệnh đề quan hệ, câu điều kiện, so sánh. Diệt các lỗi cơ bản lặp lại.',
     7:'Đa số câu không lỗi; dùng cấu trúc đa dạng một cách tự nhiên.',
     8:'Chính xác mọi lúc.'},
 traps:['Lỗi cơ bản lặp lại (thì quá khứ, he/she, số nhiều): kẹt 6.',
        'Chỉ nói câu đơn cho an toàn: kẹt 5.',
        'Câu học thuộc nghe ra ngay: giám khảo không dựa vào đó để chấm.']},
P:{n:'Pronunciation',vi:'Phát âm',pr:['dict'],
 d:{9:'Dùng đầy đủ đặc điểm ngữ âm để truyền nghĩa tinh tế; nối âm linh hoạt suốt bài. Nghe hiểu không tốn sức; giọng địa phương không ảnh hưởng.',
    8:'Nhiều đặc điểm ngữ âm; giữ được nhịp phù hợp, trọng âm và ngữ điệu linh hoạt cả trong câu dài, dù đôi khi lỡ. Dễ hiểu suốt; giọng ảnh hưởng rất ít.',
    7:'Có mọi điểm tích cực của band 6 và một phần (chưa đủ) của band 8.',
    6:'Có nhiều đặc điểm ngữ âm nhưng kiểm soát không đều. Ngắt cụm nhìn chung hợp lý, nhưng nhịp bị ảnh hưởng vì không nhấn theo trọng âm hoặc nói quá nhanh. Ngữ điệu có nhưng không duy trì. Vài từ, âm sai gây khó hiểu đôi chỗ; nhìn chung hiểu được không tốn nhiều sức.',
    5:'Có mọi điểm tích cực của band 4 và một phần (chưa đủ) của band 6.',
    4:'Có một số đặc điểm chấp nhận được nhưng hạn chế. Ngắt cụm có nhưng nhịp hay sai; ngữ điệu, trọng âm kiểm soát kém. Phát âm sai nhiều gây khó hiểu; người nghe phải cố, có đoạn không hiểu.'},
 low:'Band 3 trở xuống: hầu hết từ và âm bị phát âm sai, thường không hiểu được.',
 up:{4:'Luyện âm cuối, trọng âm từ; ngắt câu theo cụm ý.',
     5:'Giữ ngữ điệu lên xuống và trọng âm câu; phát âm rõ các từ hay dùng.',
     6:'Duy trì ngữ điệu và trọng âm ổn định, không nói quá nhanh; hầu hết từ phát âm rõ.',
     7:'Nhịp tự nhiên kể cả câu dài; nối âm; dễ hiểu suốt bài.',
     8:'Dùng ngữ âm để truyền sắc thái tinh tế.'},
 traps:['Band 3, 5, 7 không có mô tả riêng: phải có đủ điểm của band dưới và một phần band trên.',
        'Nói nhanh để "trông trôi chảy": nhịp hỏng, kẹt 6.',
        'Giọng đều đều, không lên xuống: ngữ điệu không duy trì, kẹt 6.',
        'Nuốt âm cuối (s, t, d, k): khó hiểu đôi chỗ.']}
};
const SK={
  w1:{n:'Writing Task 1',c:['TA','CC','LR','GRA']},
  w2:{n:'Writing Task 2',c:['TR','CC','LR','GRA']},
  sp:{n:'Speaking',c:['FC','SLR','SGRA','P']}
};
const SHORT={TA:'TA',TR:'TR',CC:'CC',LR:'LR',GRA:'GRA',FC:'FC',SLR:'LR',SGRA:'GRA',P:'P'};
const RULES=[
  'Phải khớp toàn bộ đặc điểm tích cực của một band mới được band đó. Chỉ cần hở một điểm là kẹt ở band dưới.',
  'Trong file Writing, chữ in đậm là đặc điểm tiêu cực sẽ giới hạn điểm, dù các phần khác tốt.',
  'Task 2 nặng gấp đôi Task 1 trong điểm Writing.',
  'LR, GRA và CC gần như giống hệt nhau giữa Task 1 và Task 2: luyện một là được cả hai.',
  'Writing: dưới 20 từ là band 1, phần chép đề không được tính, bài học thuộc toàn bộ bị cho 0.',
  'Speaking: điểm là mức trung bình trên cả 3 part, không phải câu hay nhất của bạn.'
];

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const flo=x=>Math.round(x*2+1e-9)/2;
const fmt=x=>x.toFixed(1);
let st={tab:null,sk:'w2',cr:'TR'},store=null,el=null;

function css(){
  if(document.getElementById('lrCss'))return;
  const s=document.createElement('style');s.id='lrCss';s.textContent=`
.lr{margin:6px 0 24px;padding:22px;gap:14px;background:linear-gradient(160deg,var(--surface),var(--inset));border-color:var(--tint)}
.lr-title{font:400 clamp(34px,5vw,52px)/1.1 'Great Vibes',cursive;margin:4px 0 2px;color:var(--ink);text-shadow:0 0 18px var(--tint);display:block}
.lr-docs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.lr-doc{display:flex;gap:12px;align-items:center;padding:14px;border-radius:16px;border:1px solid var(--line);background:var(--tint-2);color:var(--ink);text-decoration:none;transition:transform .2s,border-color .2s,box-shadow .2s}
.lr-doc:hover{transform:translateY(-2px);border-color:var(--glow);box-shadow:0 10px 26px -14px var(--tint)}
.lr-doc .ic{flex:none;width:44px;height:52px;border-radius:8px;background:linear-gradient(160deg,#2F6BFF,#7FD1FF);display:grid;place-items:center;font:700 12px Inter,sans-serif;color:var(--accent-ink)}
.lr-doc b{display:block;font-size:15px}
.lr .tabs{margin:4px 0 0}
.lr-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.lr-grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:16px}
@media(max-width:820px){.lr-grid{grid-template-columns:1fr}}
.lad{display:flex;flex-direction:column;gap:0}
.lad .b{display:grid;grid-template-columns:52px 1fr;gap:12px;padding:12px;border-radius:14px;border:1px solid transparent;transition:background .2s,border-color .2s}
.lad .b:hover{background:var(--tint);border-color:var(--line)}
.lad .b.me{background:var(--tint-2);border-color:var(--glow)}
.lad .num{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font:600 18px Inter,sans-serif;background:var(--tint);color:var(--glow)}
.lad .b.me .num{background:var(--glow);color:var(--accent-ink)}
.lad .b p{margin:0;font-size:15px;line-height:1.55}
.lad .step{margin:0 0 0 34px;padding:6px 12px 6px 30px;border-left:2px dashed var(--tint);font-size:14px;color:var(--glow);position:relative}
.lad .step::before{content:'↑';position:absolute;left:10px;top:5px}
.lad .step.me{color:#fff;font-weight:500}
.lad .lo{font-size:13px;color:var(--mute);padding:10px 12px}
.trap{border-radius:16px;padding:14px 16px;background:rgba(255,120,120,.08);border:1px solid rgba(255,150,150,.3)}
.trap h3,.lr-box h3{margin:0 0 8px;font-size:16px}
.trap ul,.lr-box ul{margin:0;padding-left:18px;font-size:14px;line-height:1.55}
.trap li,.lr-box li{margin:4px 0}
.lr-box{border-radius:16px;padding:14px 16px;background:var(--tint);border:1px solid var(--line)}
.lr details summary{cursor:pointer;color:var(--glow);font-size:15px}
.sc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
.sc{border:1px solid var(--line);border-radius:16px;padding:14px;background:var(--inset)}
.sc h3{margin:0 0 10px;font-size:16px}
.sc label{display:grid;grid-template-columns:1fr 86px;align-items:center;gap:8px;margin:6px 0;font-size:14px}
.sc select{height:38px;border-radius:999px;border:1px solid var(--line);background:var(--inset);color:var(--ink);padding:0 10px;font-size:15px;cursor:pointer}
.sc select:focus-visible{outline:2px solid var(--glow);outline-offset:2px}
.res{border-radius:18px;padding:16px;border:1px solid var(--line);background:var(--surface)}
.res .hd{display:flex;gap:14px;align-items:baseline;flex-wrap:wrap}
.res .big{font:600 34px Inter,sans-serif;color:var(--glow)}
.bars{display:grid;gap:6px;margin:10px 0}
.bars .br{display:grid;grid-template-columns:150px 1fr 34px;gap:8px;align-items:center;font-size:13px}
.bars .tr{height:10px;border-radius:99px;background:var(--tint);position:relative;overflow:hidden}
.bars .fl{position:absolute;inset:0 auto 0 0;border-radius:99px;background:linear-gradient(90deg,#2F6BFF,#7FD1FF)}
.bars .fl.low{background:linear-gradient(90deg,#c0567a,#ff9a9a)}
.bars .tg{position:absolute;top:-3px;bottom:-3px;width:2px;background:#fff}
.plan{margin:10px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.plan li{border-radius:14px;padding:12px 14px;background:var(--tint-2);border:1px solid var(--line)}
.plan .go{display:inline-block;margin-top:6px;color:var(--glow);font-size:14px}
.warnb{border-radius:12px;padding:10px 12px;background:rgba(255,190,90,.1);border:1px solid rgba(255,200,120,.35);font-size:14px;margin:8px 0}
`;document.head.appendChild(s);
}

function get(){return (store&&store.get())||{}}
function put(d){d.at=Date.now();store&&store.set(d)}

function render(target,s){
  el=target;store=s;css();
  const d=get();
  if(!st.tab)st.tab=(d.w2||d.sp||d.w1)?'me':'an';
  el.innerHTML=`<section class="card lr" aria-labelledby="lrT">
    <div><span class="tag b">Luật rừng</span>
      <h2 class="lr-title" id="lrT">Đi đêm lắm có ngày kẹt band!</h2>
      <p class="small" style="margin:0">Bản gốc band descriptors của IELTS, phần mổ xẻ từng band của từng tiêu chí, và chỗ để bạn nhập điểm rồi nhận lộ trình lên band.</p></div>
    <div class="lr-docs">${DOCS.map(x=>`<a class="lr-doc" href="${x.f}" target="_blank" rel="noopener"><span class="ic">PDF</span><span><b>${x.t}</b><span class="small">${x.s} · mở ↗</span></span></a>`).join('')}</div>
    <div class="tabs" role="tablist">
      <button class="tab" role="tab" data-lrtab="an" aria-selected="${st.tab==='an'}">Mổ xẻ từng band</button>
      <button class="tab" role="tab" data-lrtab="me" aria-selected="${st.tab==='me'}">Điểm của tôi & đề xuất</button>
    </div>
    <div id="lrBody"></div>
  </section>`;
  el.querySelector('.tabs').onclick=e=>{const b=e.target.closest('[data-lrtab]');if(!b)return;st.tab=b.dataset.lrtab;render(el,store)};
  st.tab==='an'?renderAn():renderMe();
}

function myScore(sk,cr){const d=get();return d[sk]&&d[sk][cr]!=null?+d[sk][cr]:null}

function renderAn(){
  const b=el.querySelector('#lrBody');
  if(!SK[st.sk].c.includes(st.cr))st.cr=SK[st.sk].c[0];
  const c=C[st.cr],me=myScore(st.sk,st.cr);
  let lad='';
  for(let n=9;n>=4;n--){
    if(n<9)lad+=`<div class="step${me===n?' me':''}"><b>${n} → ${n+1}:</b> ${esc(c.up[n])}</div>`;
    lad+=`<div class="b${me===n?' me':''}"><span class="num">${n}</span><p>${me===n?'<span class="tag b" style="margin-right:6px">Bạn đang ở đây</span>':''}${esc(c.d[n])}</p></div>`;
  }
  lad+=`<div class="lo">${esc(c.low)}</div>`;
  b.innerHTML=`<div class="lr-row" role="group" aria-label="Kỹ năng">${Object.keys(SK).map(k=>`<button class="chip" data-sk="${k}" aria-pressed="${st.sk===k}">${SK[k].n}</button>`).join('')}</div>
    <div class="lr-row" role="group" aria-label="Tiêu chí" style="margin-top:8px">${SK[st.sk].c.map(k=>`<button class="chip" data-cr="${k}" aria-pressed="${st.cr===k}">${SHORT[k]} · ${esc(C[k].vi)}</button>`).join('')}</div>
    <div class="lr-grid" style="margin-top:14px">
      <div><h3 style="margin:0 0 4px;font-size:18px">${esc(c.n)}</h3>
        <p class="small" style="margin:0 0 10px">Đọc từ dưới lên: mỗi mũi tên là thứ phải thay đổi để lên band kế tiếp.${me==null?' Nhập điểm ở tab bên cạnh để web đánh dấu bạn đang ở đâu.':''}</p>
        <div class="lad">${lad}</div></div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="trap"><h3>Bẫy kẹt band</h3><ul>${c.traps.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
        <div class="lr-box"><h3>Luyện trên IELTS Ocean</h3><ul>${c.pr.map(p=>`<li><a href="${PRACTICE[p][0]}" style="color:var(--glow)">${PRACTICE[p][1]}</a>: ${PRACTICE[p][2]}</li>`).join('')}</ul></div>
        <details class="lr-box"><summary>6 luật chung ai cũng phải biết</summary><ul style="margin-top:8px">${RULES.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></details>
      </div>
    </div>`;
  b.onclick=e=>{const s=e.target.closest('[data-sk]'),r=e.target.closest('[data-cr]');
    if(s){const old=SHORT[st.cr];st.sk=s.dataset.sk;const m=SK[st.sk].c.find(k=>SHORT[k]===old);st.cr=m||SK[st.sk].c[0];renderAn()}
    if(r){st.cr=r.dataset.cr;renderAn()}};
}

function opts(v,list,ph){return `<option value="">${ph}</option>`+list.map(x=>`<option value="${x}"${v!=null&&+v===+x?' selected':''}>${x}</option>`).join('')}
const WHOLE=[9,8,7,6,5,4,3,2,1],HALF=['9.0','8.5','8.0','7.5','7.0','6.5','6.0','5.5','5.0','4.5','4.0'];

function renderMe(){
  const b=el.querySelector('#lrBody'),d=get();
  const box=k=>`<div class="sc"><h3>${SK[k].n}</h3>${SK[k].c.map(c=>`<label>${SHORT[c]} · ${esc(C[c].vi.replace(/ \((Writing|Speaking|Task \d)\)/,''))}<select data-k="${k}" data-c="${c}">${opts(d[k]&&d[k][c],WHOLE,'—')}</select></label>`).join('')}</div>`;
  b.innerHTML=`<p class="small" style="margin:0">Nhập điểm từng tiêu chí từ bài thi thật, bài chấm của giáo viên hoặc lần tự chấm gần nhất. Tiêu chí luôn là số nguyên. Điểm được lưu vào tài khoản của bạn.</p>
    <div class="sc-grid">${box('w1')}${box('w2')}${box('sp')}
      <div class="sc"><h3>Mục tiêu</h3>
        <label>Writing<select data-t="tw">${opts(d.tw,HALF,'—')}</select></label>
        <label>Speaking<select data-t="ts">${opts(d.ts,HALF,'—')}</select></label>
        <p class="small" style="margin:8px 0 0">${d.at?'Cập nhật lần cuối '+new Date(d.at).toLocaleDateString('vi-VN'):'Chưa có điểm nào.'}</p>
        <button class="btn" type="button" data-clear style="margin-top:10px;height:38px">Xóa điểm</button></div>
    </div>
    <div id="lrRes" style="display:grid;gap:14px"></div>`;
  b.onchange=e=>{const s=e.target;if(s.tagName!=='SELECT')return;const d=get(),v=s.value===''?null:+s.value;
    if(s.dataset.t){d[s.dataset.t]=v}else{const k=s.dataset.k;d[k]=d[k]||{};d[k][s.dataset.c]=v}
    put(d);results()};
  b.querySelector('[data-clear]').onclick=()=>{if(!Object.keys(get()).length)return;put({});renderMe()};
  results();
}

function full(o,cs){return o&&cs.every(c=>o[c]!=null)}
function avg(o,cs){return cs.reduce((a,c)=>a+o[c],0)/cs.length}
function estW(d){
  const a=full(d.w1,SK.w1.c),b=full(d.w2,SK.w2.c);
  if(a&&b)return flo((avg(d.w1,SK.w1.c)+2*avg(d.w2,SK.w2.c))/3);
  if(b)return flo(avg(d.w2,SK.w2.c));
  if(a)return flo(avg(d.w1,SK.w1.c));
  return null;
}
function estS(d){return full(d.sp,SK.sp.c)?flo(avg(d.sp,SK.sp.c)):null}

/* Lộ trình tối thiểu: mỗi lần nâng tiêu chí thấp nhất 1 band (Task 2 nặng gấp đôi nên được ưu tiên khi bằng điểm) cho tới khi chạm mục tiêu */
function plan(d,kind,target){
  const x=JSON.parse(JSON.stringify(d)),steps=[];
  const items=kind==='w'?[...(full(x.w2,SK.w2.c)?SK.w2.c.map(c=>['w2',c,2]):[]),...(full(x.w1,SK.w1.c)?SK.w1.c.map(c=>['w1',c,1]):[])]:SK.sp.c.map(c=>['sp',c,1]);
  const est=()=>kind==='w'?estW(x):estS(x);
  let guard=0;
  while(est()<target&&guard++<40){
    const cand=items.filter(([k,c])=>x[k][c]<9).sort((a,b)=>x[a[0]][a[1]]-x[b[0]][b[1]]||b[2]-a[2]);
    if(!cand.length)break;
    const [k,c]=cand[0];steps.push([k,c,x[k][c]]);x[k][c]++;
  }
  return steps;
}

function bars(k,o,target){
  return `<div class="bars">${SK[k].c.map(c=>{const v=o[c],low=target!=null&&v<Math.floor(target);return `<div class="br"><span>${SHORT[c]} · ${esc(C[c].vi.replace(/ \((Writing|Speaking|Task \d)\)/,''))}</span><span class="tr"><span class="fl${low?' low':''}" style="width:${v/9*100}%"></span>${target!=null?`<span class="tg" style="left:${target/9*100}%"></span>`:''}</span><b>${v}</b></div>`}).join('')}</div>`;
}

function skillCard(kind){
  const d=get(),title=kind==='w'?'Writing':'Speaking',est=kind==='w'?estW(d):estS(d);
  const keys=kind==='w'?['w1','w2'].filter(k=>full(d[k],SK[k].c)):(full(d.sp,SK.sp.c)?['sp']:[]);
  if(est==null)return `<div class="res"><div class="hd"><b style="font-size:18px">${title}</b><span class="small">Nhập đủ 4 tiêu chí${kind==='w'?' của ít nhất một task':''} để xem ước tính và đề xuất.</span></div></div>`;
  const tRaw=kind==='w'?d.tw:d.ts,target=tRaw!=null?+tRaw:Math.min(9,est+0.5);
  let warn=[];
  keys.forEach(k=>{const o=d[k],a=avg(o,SK[k].c);SK[k].c.forEach(c=>{if(o[c]<=a-1)warn.push(`<b>${SK[k].n} · ${SHORT[c]} = ${o[c]}</b> thấp hơn mặt bằng ${fmt(a)} của bạn: đây là nút cổ chai, kéo cả task xuống.`)})});
  if(kind==='w'&&keys.length===1)warn.push(keys[0]==='w2'?'Chưa có điểm Task 1: ước tính chỉ dựa trên Task 2.':'Chưa có điểm Task 2: Task 2 nặng gấp đôi, nên ước tính này chưa đáng tin.');
  const steps=est<target?plan(d,kind,target):[];
  const g={};steps.forEach(([k,c,from])=>{const id=k+c;(g[id]=g[id]||{k,c,from,to:from}).to++});
  const list=Object.values(g);
  let body;
  if(est>=target){
    body=`<p style="margin:8px 0 0">Bạn đã chạm mục tiêu ${fmt(target)}. ${target<9?`Muốn lên ${fmt(Math.min(9,target+0.5))}, đặt mục tiêu mới để xem lộ trình.`:''}</p>`;
  }else if(!list.length){
    body=`<p style="margin:8px 0 0">Không tìm được lộ trình: các tiêu chí đã ở band 9.</p>`;
  }else{
    body=`<p style="margin:10px 0 0">Để lên <b>${fmt(target)}</b>, cách ít bước nhất là nâng ${list.length} tiêu chí, bắt đầu từ chỗ thấp nhất:</p>
    <ol class="plan">${list.map(x=>{const c=C[x.c];const st=[];for(let n=x.from;n<x.to;n++)st.push(`<div><b>${n} → ${n+1}:</b> ${esc(c.up[n]||c.up[Math.max(4,Math.min(8,n))])}</div>`);
      return `<li><div><span class="tag b">${SK[x.k].n} · ${SHORT[x.c]}</span> <b>${x.from} → ${x.to}</b></div>${st.join('')}
        <div class="small" style="margin-top:6px">Bẫy cần tránh: ${esc(c.traps[0])}</div>
        ${c.pr.map(p=>`<a class="go" href="${PRACTICE[p][0]}">Luyện với ${PRACTICE[p][1]} →</a>`).join(' · ')}
        <button class="linkbtn" type="button" data-see="${x.k}|${x.c}" style="margin-left:8px">Xem bậc thang ${SHORT[x.c]}</button></li>`}).join('')}</ol>`;
  }
  return `<div class="res"><div class="hd"><b style="font-size:18px">${title}</b><span class="big">${fmt(est)}</span><span class="small">ước tính · mục tiêu ${fmt(target)}${tRaw==null?' (tự đặt +0.5 vì bạn chưa chọn)':''}</span></div>
    ${keys.map(k=>`<div class="small" style="margin-top:8px">${SK[k].n} · trung bình ${fmt(avg(d[k],SK[k].c))}</div>${bars(k,d[k],target)}`).join('')}
    ${warn.map(w=>`<div class="warnb">${w}</div>`).join('')}
    ${body}</div>`;
}

function results(){
  const r=el.querySelector('#lrRes');if(!r)return;
  r.innerHTML=skillCard('w')+skillCard('s')+`<p class="small" style="margin:0">Điểm Writing ước tính theo trọng số Task 2 gấp đôi Task 1; làm tròn đến 0.5 gần nhất, giống cách IELTS làm tròn điểm overall. IELTS không công bố cách làm tròn chi tiết cho từng kỹ năng, nên đây chỉ là ước tính.</p>`;
  r.onclick=e=>{const s=e.target.closest('[data-see]');if(!s)return;const [k,c]=s.dataset.see.split('|');st.sk=k;st.cr=c;st.tab='an';render(el,store);el.scrollIntoView({behavior:'smooth',block:'start'})};
}

window.IOBands={render};
})();
