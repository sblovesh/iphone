(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const views = {
    lock: $("#lock-screen"),
    home: $("#home-screen"),
    app: $("#app-screen")
  };

  const state = {
    view: "lock",
    app: null,
    activeChat: null,
    instagramScreen: "feed",
    activeDM: null,
    activePhoto: null,
    activeNote: null,
    unread: true,
    messages: [
      { id: "seobin", name: "서빈 님", avatar: "서", color: "pink", photo: "avatar-seobin.jpg", preview: "시현님은 맨날 다 괜찮다구 해서...", time: "오후 5:58", messages: [{from:"date",text:"2024년 9월 16일"},{from:"incoming",text:"혹시 늦어요??",time:"오후 8:12"},{from:"outgoing",text:"저 이제 퇴근 중!! 왜요??",time:"오후 8:14"},{from:"incoming",text:"저 아직 저녁 안 먹었는데 드시고 싶은 거 있나 해서...",time:"오후 8:16"},{from:"outgoing",text:"서빈 님 좋아하는 걸루 시켜용",time:"오후 8:18"},{from:"incoming",text:"음... 그러면 치킨?",time:"오후 8:21"},{from:"outgoing",text:"그럼 제가 맥주 사서 갈게요!!",time:"오후 8:23"},{from:"incoming",text:"좋아여",time:"오후 8:25"},{from:"date",text:"2024년 9월 20일"},{from:"incoming",text:"시현님",time:"오후 5:06"},{from:"outgoing",text:"무슨 일이에요??",time:"오후 5:07"},{from:"incoming",text:"저 인스타에 사진 올리려고 했는데",time:"오후 5:08"},{from:"incoming",text:"이거 괜찮나 싶어서...",time:"오후 5:08"},{from:"photo",text:"seobin-photo.jpg",time:"오후 5:09"},{from:"outgoing",text:"ㄱㄱ 좋은데여?",time:"오후 5:12"},{from:"incoming",text:"진짜 괜찮져?",time:"오후 5:13"},{from:"outgoing",text:"넹 좋아여",time:"오후 5:14"},{from:"incoming",text:"시현님은 맨날 다 괜찮다구 해서...",time:"오후 5:16"},{from:"outgoing",text:"그건 서빈님이 잘생긴 탓",time:"오후 5:18"}] },
      { id: "uyeon", name: "우연 형", avatar: "우", color: "blue", photo: "avatar-uyeon.jpg", preview: "미친놈;", time: "오후 6:58", messages: [{from:"date",text:"2024년 9월 14일"},{from:"incoming",text:"어때 최애랑 같이 사는 기분이?",time:"오전 1:12"},{from:"outgoing",text:"개좋음 진짜",time:"오전 1:13"},{from:"incoming",text:"야야 말버릇;",time:"오전 1:14"},{from:"outgoing",text:"이런 표현이 아니면 설명이 안 됨 진짜로",time:"오전 1:14"},{from:"incoming",text:"이상한 짓 하지 말고",time:"오전 1:15"},{from:"outgoing",text:"내가 뭔 이상한 짓을 해 ㅡㅡ",time:"오전 1:16"},{from:"incoming",text:"아무튼 서빈 님 잘 챙겨주고 알겠냐",time:"오전 1:17"},{from:"outgoing",text:"명을 받들겠습니다",time:"오전 1:18"},{from:"incoming",text:"오냐 형 잔다",time:"오전 1:19"},{from:"outgoing",text:"ㅂㅂ 잘자",time:"오전 1:20"},{from:"date",text:"2024년 9월 20일"},{from:"outgoing",text:"형형형 혹시",time:"오후 6:12"},{from:"outgoing",text:"서빈 님이 사진 하나 보내고 이거 괜찮냐고 물어보면 절대 ㄴㄴ안된다고해 절대로 제발",time:"오후 6:13"},{from:"incoming",text:"?",time:"오후 6:14"},{from:"incoming",text:"인스타에 올려도 괜찮냐고 물어보시긴 했는데",time:"오후 6:15"},{from:"incoming",text:"이거?",time:"오후 6:15"},{from:"photo",text:"seobin-photo.jpg",time:"오후 6:16"},{from:"outgoing",text:"ㅇㅇㅇ그거!!",time:"오후 6:17"},{from:"incoming",text:"왜? 괜찮은데?",time:"오후 6:18"},{from:"outgoing",text:"나만 가질 거임",time:"오후 6:19"},{from:"incoming",text:"미친놈;",time:"오후 6:20"}] },
      { id: "mom", name: "엄마", avatar: "엄", color: "green", preview: "밥은 꼭 챙겨 먹어", time: "오후 8:42", messages: [{from:"incoming",text:"밥은 꼭 챙겨 먹어"},{from:"outgoing",text:"응 엄마. 촬영 끝나고 먹었어."}] },
      { id: "director", name: "김도윤 감독님", avatar: "김", color: "gold", preview: "오늘 감정 연기 좋았습니다.", time: "오후 7:18", messages: [{from:"incoming",text:"오늘 감정 연기 좋았습니다. 다음 장면도 잘 부탁해요."}] },
      { id: "agency", name: "소속사 홍보팀", avatar: "홍", color: "pink", preview: "내일 공개될 티저 확인 부탁드립니다.", time: "오후 6:50", messages: [{from:"incoming",text:"내일 공개될 티저 확인 부탁드립니다."}] },
      { id: "coactor", name: "지훈이", avatar: "지", color: "blue", preview: "형 사진 올라온 거 봤어요ㅋㅋ", time: "오후 5:32", messages: [{from:"incoming",text:"형 사진 올라온 거 봤어요ㅋㅋ 완전 잘 나왔던데요?"}] },
      { id: "stylist", name: "수연 실장님", avatar: "수", color: "green", preview: "피팅 사진 전달드려요!", time: "오후 4:11", messages: [{from:"incoming",text:"피팅 사진 전달드려요! 내일 의상은 이걸로 준비할게요."}] },
      { id: "fanclub", name: "공식 팬카페 운영진", avatar: "팬", color: "gold", preview: "생일 라이브 일정 문의드립니다.", time: "오후 2:06", messages: [{from:"incoming",text:"생일 라이브 일정 관련해 확인 부탁드립니다."}] },
      { id: "college", name: "동기 배우들", avatar: "동", color: "pink", preview: "다 같이 밥 먹자!", time: "어제", messages: [{from:"incoming",text:"이번 주에 다 같이 밥 먹자!"}] },
      { id: "brand", name: "브랜드 협찬 담당자", avatar: "브", color: "blue", preview: "캠페인 제안서 보내드립니다.", time: "어제", messages: [{from:"incoming",text:"신규 캠페인 제안서 보내드립니다. 검토 부탁드립니다."}] }
    ],
    photos: [
      { id: 1, scene: "scene-1", title: "저녁 하늘", date: "오늘 오후 6:42" },
      { id: 2, scene: "scene-2", title: "카페에서", date: "오늘 오후 4:16" },
      { id: 3, scene: "scene-3", title: "창가", date: "어제 오후 2:10" },
      { id: 4, scene: "scene-4", title: "거리 풍경", date: "어제 오전 11:25" },
      { id: 5, scene: "scene-5", title: "산책길", date: "10월 15일" },
      { id: 6, scene: "scene-6", title: "기록", date: "10월 12일" }
    ],
    calls: [
      { name: "김민지", type: "outgoing", time: "오늘 오후 7:30", avatar: "민", color: "pink" },
      { name: "엄마", type: "incoming", time: "오늘 오후 6:04", avatar: "엄", color: "green" },
      { name: "알 수 없는 번호", type: "missed", time: "오늘 오후 4:01", avatar: "?", color: "gold" },
      { name: "김민지", type: "incoming", time: "어제 오후 9:12", avatar: "민", color: "pink" }
    ],
    notes: [
      { id: 1, title: "오늘 할 일", body: "□ 장보기\n□ 민지에게 답장하기\n□ 사진 정리하기", updated: Date.now() - 100000 },
      { id: 2, title: "메모", body: "잊지 말고 우산 챙기기.", updated: Date.now() - 200000 }
    ],
    nextNoteId: 3
  };

  const SEOBIN_STORAGE_KEY = "virtual-iphone-seobin-chat-v1";
  const seobinChat = state.messages.find((chat) => chat.id === "seobin");
  try {
    const saved = localStorage.getItem(SEOBIN_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.every(m => m && ["date","incoming","outgoing","photo"].includes(m.from) && typeof m.text === "string")) {
        // 저장된 이전 테스트의 스토리 메시지를 제거해, 방문할 때마다 새 시나리오로 시작
        const savedDateIndex = parsed.findIndex(m => m.from === "date" && m.text === "2025년 1월 5일");
        seobinChat.messages = savedDateIndex >= 0 ? parsed.slice(0, savedDateIndex) : parsed;
        localStorage.setItem(SEOBIN_STORAGE_KEY, JSON.stringify(seobinChat.messages));
      }
    }
  } catch (_) {}
  function saveSeobinChat() { try { localStorage.setItem(SEOBIN_STORAGE_KEY, JSON.stringify(seobinChat.messages)); } catch (_) {} }
  const SEOBIN_SCENARIO_KEY = "virtual-iphone-seobin-sleep-story-v1";
  // 시나리오 상태는 페이지 방문마다 초기화해, 이전 테스트 진행 상태를 이어받지 않음
  let seobinScenario = "new";
  try { localStorage.setItem(SEOBIN_SCENARIO_KEY, "new"); } catch (_) {}
  function saveSeobinScenario(value) { seobinScenario = value; try { localStorage.setItem(SEOBIN_SCENARIO_KEY, value); } catch (_) {} }
  function currentChatTime() { return new Date().toLocaleTimeString("ko-KR", {hour:"2-digit",minute:"2-digit",hour12:true}); }
  function addSeobinIncoming(text, photo=false) {
    seobinChat.messages.push({from: photo ? "photo" : "incoming", text: photo ? "seobin-bed-photo.jpg" : text, time: currentChatTime()});
    seobinChat.preview = photo ? "사진" : text; seobinChat.time = "방금"; saveSeobinChat();
    if (state.app === "kakao" && state.activeChat === "seobin" && state.view === "app") renderKakao();
    else { showToast(photo ? "카카오톡 · 서빈 님이 사진을 보냈어요" : "카카오톡 · 서빈 님: " + text); const dot=$("#unread-dot"); if(dot) dot.classList.remove("hidden"); }
  }
  function startSeobinSleepStory() {
    if (seobinScenario !== "received") return;
    saveSeobinScenario("replied");
    seobinChat.messages.push({from:"outgoing", text:"저 촬영 중!! 잠시 브레이크 중! 형은 뭐 해여?", time:currentChatTime()});
    seobinChat.preview = "저 촬영 중!! 잠시 브레이크 중! 형은 뭐 해여?"; seobinChat.time="방금"; saveSeobinChat(); renderKakao();
    setTimeout(() => addSeobinIncoming("나는 침대랑 한 몸이야...."), 900);
    setTimeout(() => addSeobinIncoming("", true), 2200);
    setTimeout(() => { addSeobinIncoming("나 다시 쫌 잘겡 촬영 열시미 해ㅐㅐ"); saveSeobinScenario("finished"); if (state.app === "kakao" && state.activeChat === "seobin" && state.view === "app") renderKakao(); }, 3600);
  }
  const appTitles = { messages: "메시지", photos: "사진", calls: "최근 통화", notes: "메모", kakao: "카카오톡", instagram: "Instagram" };
  let toastTimer;
  let enteredPasscode = "";
  const demoPasscode = "0711";

  function updatePasscodeDots() {
    $("#passcode-dots").querySelectorAll("span").forEach((dot, index) => {
      dot.classList.toggle("filled", index < enteredPasscode.length);
    });
  }

  function closePasscode() {
    $("#passcode-modal").classList.add("hidden");
    $("#passcode-modal").setAttribute("aria-hidden", "true");
    enteredPasscode = "";
    updatePasscodeDots();
    $("#passcode-error").textContent = "암호를 입력하세요.";
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
    const date = now.toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "long" });
    $("#status-time").textContent = time;
    $("#lock-clock").textContent = now.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit", hour12: false });
    $("#lock-date").textContent = date;
    $("#home-greeting").textContent = now.toLocaleDateString("ko-KR", { weekday: "long" });
    $("#home-date-large").textContent = now.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function setView(view) {
    state.view = view;
    Object.entries(views).forEach(([key, element]) => element.classList.toggle("hidden", key !== view));
    $("#home-indicator").style.background = view === "lock" ? "#fff" : "#222";
    $("#home-indicator").style.opacity = view === "lock" ? ".85" : ".8";
  }

  function openApp(app) {
    state.app = app;
    state.activeChat = null;
    state.activePhoto = null;
    state.activeNote = null;
    $("#app-title").textContent = appTitles[app] || "앱";
    $("#header-action").textContent = app === "notes" ? "+" : "";
    $("#header-action").setAttribute("aria-label", app === "notes" ? "새 메모" : "추가 작업");
    setView("app");
    renderApp();
  }

  function goHome() {
    state.app = null;
    state.activeChat = null;
    state.activePhoto = null;
    state.activeNote = null;
    setView("home");
  }

  function renderApp() {
    if (state.app === "messages") renderMessages();
    else if (state.app === "photos") renderPhotos();
    else if (state.app === "calls") renderCalls();
    else if (state.app === "notes") renderNotes();
    else if (state.app === "kakao") renderKakao();
    else if (state.app === "instagram") renderInstagram();
  }

  const smsPreviews = [
    {name:"매니저 민지", avatar:"민", color:"pink", time:"오후 8:42", preview:"내일 콜타임 06:30이에요! 차는 5:50에 도착합니다."},
    {name:"[광고] 프리미엄 대출", avatar:"광", color:"gold", time:"오후 8:17", preview:"고객님만을 위한 한도 조회, 지금 바로 확인하세요."},
    {name:"제작팀 조연출", avatar:"조", color:"blue", time:"오후 7:56", preview:"내일 32씬 대본 수정본 전달드립니다. 확인 부탁드려요."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"오후 7:31", preview:"시현 배우님 맞으시죠? 저 진짜 오래전부터 팬이었어요."},
    {name:"소속사 홍보팀", avatar:"홍", color:"pink", time:"오후 6:48", preview:"인터뷰 기사 초안 보내드렸습니다. 인용문만 체크해주세요."},
    {name:"스타일리스트 수연", avatar:"수", color:"green", time:"오후 6:15", preview:"내일 제작발표회 착장 최종안 공유드려요!"},
    {name:"[국제발신] 당첨 안내", avatar:"당", color:"gold", time:"오후 5:59", preview:"축하합니다! 경품 수령을 위해 링크를 확인하세요."},
    {name:"캐스팅 디렉터", avatar:"캐", color:"blue", time:"오후 5:26", preview:"차기작 미팅 일정 관련해 연락드렸습니다."},
    {name:"팬", avatar:"♡", color:"pink", time:"오후 5:02", preview:"오늘 촬영장 근처에서 봤어요… 너무 잘생기셨어요."},
    {name:"광고대행사 윤 담당자", avatar:"윤", color:"green", time:"오후 4:41", preview:"브랜드 캠페인 제안서와 촬영 가이드 전달드립니다."},
    {name:"[Web발신] 택배", avatar:"택", color:"blue", time:"오후 4:12", preview:"배송 완료: 문 앞에 상품을 두었습니다."},
    {name:"매니저 민지", avatar:"민", color:"pink", time:"오후 3:50", preview:"차량 번호 32가 8124예요. 끝나면 연락 주세요."},
    {name:"영화제 사무국", avatar:"영", color:"gold", time:"오후 3:14", preview:"초청 및 레드카펫 참석 여부 회신 부탁드립니다."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"오후 2:58", preview:"집이 여기 맞죠? 오늘도 기다리고 있을게요."},
    {name:"보이스피싱 의심", avatar:"금", color:"blue", time:"오후 2:23", preview:"[금융기관] 계좌 보호를 위해 본인 인증이 필요합니다."},
    {name:"드라마 제작사", avatar:"제", color:"green", time:"오후 1:46", preview:"대본 리딩은 금요일 오후 2시, 3층 회의실입니다."},
    {name:"팬카페 운영진", avatar:"팬", color:"pink", time:"오후 1:12", preview:"생일 서포트 관련해 소속사 확인을 요청드립니다."},
    {name:"[광고] 휴대폰 결제", avatar:"광", color:"gold", time:"오후 12:54", preview:"미납 요금이 있습니다. 즉시 납부하지 않으면 제한됩니다."},
    {name:"사진작가 도현", avatar:"도", color:"blue", time:"오전 11:38", preview:"어제 화보 셀렉본 업로드했습니다. 마음에 드는 컷 골라주세요."},
    {name:"팬", avatar:"♡", color:"pink", time:"오전 10:52", preview:"배우님이 자주 가는 카페 알아냈어요. 또 갈게요!"},
    {name:"매니저 민지", avatar:"민", color:"pink", time:"오전 10:15", preview:"오늘 인터뷰 예상 질문 정리해뒀어요. 차에서 같이 봐요."},
    {name:"오디션 안내", avatar:"오", color:"green", time:"오전 9:44", preview:"오디션 지정 대사와 캐릭터 설명을 첨부해드립니다."},
    {name:"[Web발신] 카드", avatar:"카", color:"gold", time:"오전 9:03", preview:"해외 승인 1,280,000원. 본인 사용이 아니라면 문의 바랍니다."},
    {name:"매니지먼트 팀장", avatar:"팀", color:"blue", time:"어제", preview:"계약서 수정 사항 표시해 두었으니 확인 부탁합니다."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"어제", preview:"어제 집에 들어가는 것까지 봤어요. 답장 한 번만 해줘요."},
    {name:"뷰티 브랜드", avatar:"뷰", color:"green", time:"어제", preview:"신제품 협찬 관련 콘텐츠 업로드 일정 확인 부탁드립니다."},
    {name:"방송국 작가님", avatar:"작", color:"pink", time:"어제", preview:"예능 출연 관련 사전 질문지를 보내드립니다."},
    {name:"[광고] 투자 리딩방", avatar:"투", color:"gold", time:"어제", preview:"연예인도 참여하는 비공개 급등주 정보방에 초대합니다."},
    {name:"팬", avatar:"♡", color:"pink", time:"월요일", preview:"선물 보냈어요! 숙소 주소로 보냈으니 꼭 받아주세요."},
    {name:"세무 담당자", avatar:"세", color:"blue", time:"월요일", preview:"종합소득세 자료 중 누락된 영수증이 있어 연락드립니다."}
  ];

  function renderMessages() {
    const content = $("#app-content");
    // Messages is a read-only preview inbox. It never opens a conversation or shares data with KakaoTalk.
    state.activeChat = null;
    $("#app-title").textContent = "메시지";
    $("#header-action").textContent = "";
    content.innerHTML = `
      <div class="sms-note"><strong>메시지 미리보기</strong><span>문자는 목록으로만 확인할 수 있어요.</span></div>
      <div class="section-label">최근 메시지 · ${smsPreviews.length}</div>
      <div class="list-card sms-list">
        ${smsPreviews.map((item) => `
          <div class="list-row sms-row">
            <span class="avatar ${item.color}">${escapeHTML(item.avatar)}</span>
            <span class="row-main">
              <span class="row-title">${escapeHTML(item.name)}</span>
              <span class="row-subtitle">${escapeHTML(item.preview)}</span>
            </span>
            <span class="row-trailing">${escapeHTML(item.time)}</span>
          </div>`).join("")}
      </div>
      <div class="sms-footer">알 수 없는 발신자의 링크는 열지 마세요.</div>`;
  }

  function kakaoAvatar(chat, small = false) { return chat.photo ? `<img class="kakao-avatar-img ${small ? "small" : ""}" src="${chat.photo}" alt="${escapeHTML(chat.name)} 프로필">` : `<img class="kakao-avatar-img ${small ? "small" : ""}" src="avatar-default.jpg" alt="${escapeHTML(chat.name)} 프로필">`; }

  function renderKakao() {
    const content = $("#app-content");
    $("#app-title").textContent = state.activeChat ? (state.messages.find((item) => item.id === state.activeChat)?.name || "채팅") : "채팅";
    $("#app-screen").classList.toggle("kakao-mode", !state.activeChat);
    $("#header-action").textContent = state.activeChat ? "" : "＋";
    if (state.activeChat) {
      const chat = state.messages.find((item) => item.id === state.activeChat);
      if (!chat) { state.activeChat = null; renderKakao(); return; }
      content.innerHTML = `
        <div class="kakao-chat-screen">
          <div class="kakao-chat-log" id="kakao-chat-log">
            ${chat.messages.map((message) => message.from === "date" ? `<div class="kakao-date">${escapeHTML(message.text)}</div>` : message.from === "photo" ? `<div class="kakao-message-photo incoming">${kakaoAvatar(chat, true)}<img src="${message.text}" alt="서빈 님이 보낸 사진"></div>` : `<div class="kakao-message-wrap ${message.from}">${message.from === "incoming" ? kakaoAvatar(chat, true) : ""}${message.from === "incoming" ? `<div class="kakao-message-body"><strong class="kakao-sender-name">${escapeHTML(chat.name.replace(/ 님$/, ""))}</strong><div class="kakao-message ${message.from}">${escapeHTML(message.text).replace(/\n/g, "<br>")}</div></div>` : `<div class="kakao-message ${message.from}">${escapeHTML(message.text).replace(/\n/g, "<br>")}</div>`}${message.time ? `<small class="kakao-message-time">${escapeHTML(message.time)}</small>` : ""}</div>`).join("")}
          </div>
          ${chat.id === "seobin" && seobinScenario === "received" ? `<div class="seobin-quick-replies"><button type="button" id="seobin-quick-reply">저 촬영 중!! 잠시 브레이크 중! 형은 뭐 해여?</button></div>` : ""}
          <form class="kakao-compose" id="kakao-form"><button type="button" aria-label="첨부">＋</button><input id="kakao-input" maxlength="300" placeholder="${chat.id === "seobin" && seobinScenario === "finished" ? "서빈 님은 자고 있어요…" : "메시지 입력"}" autocomplete="off"><button type="submit" aria-label="보내기">➤</button></form>
        </div>`;
      const log = $("#kakao-chat-log"); log.scrollTop = log.scrollHeight;
      const quickReply = $("#seobin-quick-reply"); if (quickReply) quickReply.addEventListener("click", startSeobinSleepStory);
      $("#kakao-form").addEventListener("submit", (event) => {
        event.preventDefault(); const input = $("#kakao-input"); const value = input.value.trim(); if (!value) return;
        chat.messages.push({ from: "outgoing", text: value, time: currentChatTime() }); chat.preview = value; chat.time = "방금"; if(chat.id === "seobin") saveSeobinChat(); renderKakao();
      });
      return;
    }
    content.innerHTML = `
      <div class="kakao-top-actions"><span>⌕</span><span>☏＋</span><span>⚙</span></div>
      <div class="kakao-filters"><b>전체</b><span>안읽음 <i>289</i></span><span>ChatGPT</span><span>통화</span><span>☷</span></div>
      <div class="kakao-ad"><small>AD</small><strong>찬 바람 불면 우울한가요?</strong><span>계절성 우울증인지 확인하기</span></div>
      <div class="kakao-list-label">채팅 ${state.messages.length}</div>
      <div class="kakao-list">
        ${state.messages.map((chat) => `<button class="kakao-row" data-kakao-chat="${chat.id}">${kakaoAvatar(chat)}<span class="kakao-row-main"><strong>${escapeHTML(chat.name)}</strong><span>${escapeHTML(chat.preview)}</span></span><span class="kakao-row-meta">${escapeHTML(chat.time)}<i>1</i></span></button>`).join("")}
      </div>
      <div class="kakao-bottom-tabs"><span>♙<small>친구</small></span><span class="selected">▤<small>채팅</small></span><span>◉<small>오픈채팅</small></span><span>◷<small>쇼핑</small></span><span>•••<small>더보기</small></span></div>`;
    content.querySelectorAll("[data-kakao-chat]").forEach((button) => button.addEventListener("click", () => { if (!["seobin", "uyeon"].includes(button.dataset.kakaoChat)) return; state.activeChat = button.dataset.kakaoChat; renderKakao(); }));
  }

  function renderInstagram() {
    const content = $("#app-content");
    $("#app-screen").classList.remove("kakao-mode");
    const defaultAvatar = '<img class="ig-avatar-photo" src="avatar-default.jpg" alt="프로필">';
    const seobinAvatar = '<img class="ig-avatar-photo" src="instagram-seobin.jpg" alt="서빈 프로필">';
    const dmItems = [
      {name:"서빈", handle:"seo_BBini", preview:"알림을 꺼놔서…", time:"방금", avatar:seobinAvatar},
      {name:"민서", handle:"minseo_fan", preview:"팬이에요! 항상 응원해요 💗", time:"12분", avatar:defaultAvatar},
      {name:"라온 엔터테인먼트", handle:"raon_ent", preview:"브랜드 캠페인 협업 문의드립니다.", time:"1시간", avatar:defaultAvatar},
      {name:"드라마 공식 계정", handle:"drama_official", preview:"티저 게시물 확인 부탁드려요.", time:"3시간", avatar:defaultAvatar},
      {name:"지우", handle:"jiwoo_actor", preview:"촬영장 사진 너무 멋있어요!", time:"어제", avatar:defaultAvatar},
      {name:"팬 계정", handle:"sihyeon_fan", preview:"정말 팬이에요 🥹", time:"어제", avatar:defaultAvatar}
    ];
    const dmConversation = [
      ["incoming","그..."],
      ["incoming","저 좋아해 주셔서 감사하긴 한데"],
      ["incoming","팔로우 취소 좀 해주시면 안 될까요...?"],
      ["incoming","실수면 좋겠지만"],
      ["incoming","실수가 아닐 수도 있으니..."],
      ["incoming","저 연예인 같은 거 이제 안 할 거라"],
      ["incoming","이런 관심 좀 부담스러워요"],
      ["outgoing","연예인 안 하시려구요?"],
      ["outgoing","왜요??"],
      ["incoming","네"],
      ["outgoing","이 시간에 안 주무세요?"],
      ["incoming","아"],
      ["incoming","저 원래 늦게 자서요..."],
      ["outgoing","혹시 왜 연예인 안 하시려는 건지"],
      ["outgoing","물어봐도 돼요?"],
      ["incoming","어..."],
      ["outgoing","너무 부담스러우시면 말씀 안 하셔도 돼요"],
      ["outgoing","그냥 팬이라서 궁금했어요"],
      ["incoming","아..."],
      ["incoming","그러면 혹시 저도 궁금한 거 물어봐도 돼요?"],
      ["outgoing","당연하죠"],
      ["incoming","그, 많고 많은 아이돌 중에"],
      ["incoming","왜 저를 좋아하시는 거예요?"],
      ["outgoing","그거 대답하면 제 질문에도"],
      ["outgoing","대답해 주시는 건가요? ㅎㅁㅎ"],
      ["incoming","어..."],
      ["incoming","넵"],
      ["outgoing","서빈 님 노래가 제일 좋았어요"],
      ["outgoing","그 릴스 딱 하나 올라온 거"],
      ["outgoing","그래서 좀 찾아봤는데"],
      ["outgoing","무대에서 춤도 잘 추시더라구요"],
      ["outgoing","그래서 좋아해요"],
      ["incoming","감사합니다..."],
      ["incoming","제가 사실"],
      ["incoming","저... 좋아하는 분 처음 봐요..."],
      ["outgoing","이제 말해 주시는 건가요?"],
      ["incoming","근데 들으셔도 별 감흥은 없으실 텐데요..."],
      ["outgoing","괜찮아요"],
      ["incoming","음..."],
      ["incoming","제가 스물넷이라"],
      ["incoming","아이돌 하기엔 넘 늦은 것 같아서요"],
      ["outgoing","네???"],
      ["outgoing","그런 게 어딨어요"],
      ["outgoing","아무 오디션이나 가면 서빈 님은 다 받을 텐데??"],
      ["incoming","그게 큰 이유는 아니고..."],
      ["incoming","제가 그룹이 두 번 엎어져서요"],
      ["outgoing","아 죄송해요"],
      ["outgoing","그거까진 몰랐어요 ㅜㅁㅜ"],
      ["incoming","괜찮아요"],
      ["incoming","모르는 게 당연하니까..."],
      ["incoming","아무튼 그래서 확신이 없어요"],
      ["incoming","주변에서 좋게 말해줘도"],
      ["incoming","제가 겁이 나서..."],
      ["outgoing","그러면 노래라도 불러주시면 안 돼요?"],
      ["incoming","노래요?"],
      ["outgoing","네네, 그 인스타 릴스에"],
      ["outgoing","올리신 거처럼..."],
      ["incoming","아..."],
      ["outgoing","인스타 릴스가 아니더라도"],
      ["outgoing","사클 같은 데도 괜찮아요!!"],
      ["incoming","어..."],
      ["incoming","꼭 제 노래여야 하는 거예요?"],
      ["outgoing","네!!"],
      ["outgoing","제가 사실 서빈 님 노래 아니면 잠을 못 자요"],
      ["incoming","네?"],
      ["outgoing","진짜입니다..."],
      ["outgoing","그러니까 부탁할게요"],
      ["outgoing","노래라도 계속 해주시면 안 돼요?"],
      ["incoming","조금만 더 고민 해보고..."],
      ["outgoing","고민이라도 해주셔서 감사합니다"],
      ["outgoing","그리고 늦은 밤에 팔로우 걸어서 죄송해요"],
      ["incoming","아 그거 실수 아니었어요?"],
      ["outgoing","실수는 맞는데"],
      ["outgoing","피해 드린 건 맞으니..."],
      ["incoming","괜찮아요"],
      ["incoming","알림을 아예 꺼놔서..."],
      ["outgoing","아무튼 늦었는데"],
      ["outgoing","얼른 주무세요!!"],
      ["incoming","배우님도요"]
    ];
    if (state.instagramScreen === "dm-chat") {
      $("#app-title").textContent = "seo_BBini"; $("#header-action").textContent = "⋯";
      content.innerHTML = `<div class="ig-dm-chat"><div class="ig-dm-person">${seobinAvatar}<div class="ig-dm-name"><strong>서빈</strong><small>seo_BBini</small></div><span class="ig-dm-head-actions">⌕　▢</span></div><div class="ig-dm-profile-intro">${seobinAvatar}<strong>서빈</strong><span>seo_BBini · Instagram</span><small>서로 팔로우하지 않음</small></div><div class="ig-dm-history" id="ig-dm-history"><div class="ig-dm-date">2024년 7월 12일 · 오전 4:00–5:00</div>${dmConversation.map(([from,text],i)=>`<div class="ig-dm-line ${from} ${from === "incoming" && i > 0 && dmConversation[i-1][0] === "incoming" ? "ig-dm-continuation" : ""}">${from === "incoming" && (i === 0 || dmConversation[i-1][0] !== "incoming") ? seobinAvatar : from === "incoming" ? '<span class="ig-dm-avatar-spacer" aria-hidden="true"></span>' : ""}<div class="ig-dm-bubble ${from}">${escapeHTML(text)}</div></div>`).join("")}</div><form class="ig-dm-compose" id="ig-dm-form"><button type="button" class="ig-camera" aria-label="카메라">◎</button><input id="ig-dm-input" placeholder="메시지 보내기..." maxlength="300"><button type="submit" aria-label="보내기">➤</button></form></div>`;
      const history = $("#ig-dm-history"); history.scrollTop = history.scrollHeight;
      $("#ig-dm-form").addEventListener("submit", e => { e.preventDefault(); const input=$("#ig-dm-input"); if(input.value.trim()){ const line=document.createElement("div"); line.className="ig-dm-line outgoing"; const bubble=document.createElement("div"); bubble.className="ig-dm-bubble outgoing"; bubble.textContent=input.value.trim(); line.appendChild(bubble); history.appendChild(line); input.value=""; history.scrollTop=history.scrollHeight; }}); return;
    }
    if (state.instagramScreen === "dm") {
      $("#app-title").textContent = "sihye0n_an"; $("#header-action").textContent = "✎";
      content.innerHTML = `<div class="ig-dm-top"><div class="ig-dm-account">sihye0n_an <span>⌄</span></div><div class="ig-dm-search">⌕　검색</div></div><div class="ig-dm-list-title">메시지 <span>요청</span></div><div class="ig-dm-list">${dmItems.map(x=>`<button class="ig-dm-row" data-dm="${x.name}">${x.avatar}<span><strong>${x.name}</strong><small>${x.preview}</small></span><time>${x.time}</time></button>`).join("")}</div><div class="ig-bottom-tabs"><button data-ig-nav="feed">⌂</button><button>▣</button><button data-ig-nav="dm" class="ig-nav-active">➤</button><button>⌕</button><button>●</button></div>`;
      content.querySelectorAll("[data-dm]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.dm !== "서빈") return; state.activeDM=b.dataset.dm;state.instagramScreen="dm-chat";renderInstagram();}));
      content.querySelectorAll("[data-ig-nav]").forEach(b=>b.addEventListener("click",()=>{state.instagramScreen=b.dataset.igNav;renderInstagram();})); return;
    }
    $("#app-title").textContent = "Instagram"; $("#header-action").textContent = "♡";
    content.innerHTML = `<div class="ig-topbar"><span>＋</span><strong>Instagram</strong><span>▣　♡</span></div><div class="ig-post"><div class="ig-post-user"><img class="ig-brand-avatar" src="TVING.jpg" alt="tvN 드라마 프로필"><div><strong>tvn_drama</strong><small>추천 게시물</small></div><span class="ig-more">•••</span></div><div class="ig-drama-ad ig-actor-photo"><img class="ig-blurred-bg" src="actor-feed.jpg" alt="청춘 실종 사건 드라마 홍보 이미지"><div class="ig-promo-overlay"><span>tvN 새 드라마</span><strong>청춘 실종 사건</strong><b>배우 안시현<br>남자 주인공 캐스팅</b><small>COMING SOON · 2026</small></div></div><div class="ig-actions"><button data-like="drama" aria-label="좋아요">♡</button><button data-comment="drama" aria-label="댓글">♧</button><button aria-label="공유">➤</button><button class="ig-save" aria-label="저장">♧</button></div><div class="ig-post-copy"><strong id="ig-likes">좋아요 24,681개</strong><p><strong>tvn_drama</strong> 배우 안시현, 드라마 '청춘 실종 사건' 남자 주인공으로 캐스팅 🎬<br>올겨울, 청춘의 비밀을 추적할 새로운 얼굴을 만나보세요.<br><span class="ig-hashtags">#안시현 #청춘실종사건 #캐스팅 #tvN드라마</span></p><p class="ig-comments">댓글 318개 모두 보기</p><small>홍보 · 2시간 전</small></div></div><div class="ig-bottom-tabs"><button data-ig-nav="feed" class="ig-nav-active">⌂</button><button>▣</button><button data-ig-nav="dm">➤</button><button>⌕</button><button>●</button></div>`;
    content.querySelectorAll("[data-like]").forEach(button=>button.addEventListener("click",()=>{button.classList.toggle("liked");button.textContent=button.classList.contains("liked")?"♥":"♡";}));
    content.querySelectorAll("[data-comment]").forEach(button=>button.addEventListener("click",()=>showToast("댓글 기능은 다음 단계에서 추가할 수 있어요.")));
    content.querySelectorAll("[data-ig-nav]").forEach(button=>button.addEventListener("click",()=>{state.instagramScreen=button.dataset.igNav;renderInstagram();}));
  }

  function renderPhotos() {
    const content = $("#app-content");
    $("#app-title").textContent = state.activePhoto ? "사진" : "사진";
    $("#header-action").textContent = "";
    if (state.activePhoto) {
      const photo = state.photos.find((item) => item.id === state.activePhoto);
      content.innerHTML = `
        <div class="photo-detail">
          <div class="photo-large"><span class="photo-scene ${photo.scene}"></span></div>
          <div class="photo-caption">${escapeHTML(photo.title)}</div>
          <div class="photo-subcaption">${escapeHTML(photo.date)}</div>
          <button class="call-action" id="photo-back">모든 사진 보기</button>
        </div>`;
      $("#photo-back").addEventListener("click", () => { state.activePhoto = null; renderPhotos(); });
      return;
    }
    content.innerHTML = `
      <div class="section-label">최근 항목</div>
      <div class="photo-grid">
        ${state.photos.map((photo) => `<button class="photo-tile" data-photo="${photo.id}" aria-label="${escapeHTML(photo.title)}"><span class="photo-scene ${photo.scene}"></span></button>`).join("")}
      </div>
      <div class="section-label">사진 ${state.photos.length}장</div>`;
    content.querySelectorAll("[data-photo]").forEach((button) => {
      button.addEventListener("click", () => { state.activePhoto = Number(button.dataset.photo); renderPhotos(); });
    });
  }

  function renderCalls() {
    const content = $("#app-content");
    $("#app-title").textContent = "최근 통화";
    $("#header-action").textContent = "편집";
    content.innerHTML = `
      <div class="section-label">최근 통화</div>
      <div class="list-card">
        ${state.calls.map((call, index) => `
          <div class="list-row">
            <span class="avatar ${call.color}">${escapeHTML(call.avatar)}</span>
            <span class="row-main">
              <span class="row-title">${escapeHTML(call.name)}</span>
              <span class="row-subtitle">${call.type === "missed" ? '<span style="color:#e04444">부재중 전화</span>' : call.type === "incoming" ? "↙ 수신 전화" : "↗ 발신 전화"}</span>
            </span>
            <span class="row-trailing">${escapeHTML(call.time)}</span>
            <button class="chevron call-detail" data-call="${index}" aria-label="${escapeHTML(call.name)} 상세">ⓘ</button>
          </div>`).join("")}
      </div>
      <button class="call-action" id="fake-call">전화 걸기 (데모)</button>
      <div class="empty-state">실제 전화는 걸리지 않는 가상 통화 기록입니다.</div>`;
    content.querySelectorAll("[data-call]").forEach((button) => {
      button.addEventListener("click", () => {
        const call = state.calls[Number(button.dataset.call)];
        showToast(`${call.name} · ${call.time}`);
      });
    });
    $("#fake-call").addEventListener("click", () => showToast("데모 화면에서는 실제 통화를 할 수 없어요."));
    $("#header-action").onclick = () => showToast("통화 기록 편집은 데모 기능입니다.");
  }

  function renderNotes() {
    const content = $("#app-content");
    $("#app-title").textContent = state.activeNote === "new" ? "새 메모" : state.activeNote !== null ? "메모 편집" : "메모";
    $("#header-action").textContent = state.activeNote === null ? "+" : "";
    if (state.activeNote !== null) {
      const note = state.activeNote === "new" ? { title: "", body: "" } : state.notes.find((item) => item.id === state.activeNote);
      content.innerHTML = `
        <div class="note-editor">
          <input class="note-title-input" id="note-title" maxlength="100" placeholder="제목" value="${escapeHTML(note.title)}" aria-label="메모 제목">
          <textarea class="note-body-input" id="note-body" maxlength="10000" placeholder="내용을 입력하세요..." aria-label="메모 내용">${escapeHTML(note.body)}</textarea>
          <button class="note-save" id="save-note">완료</button>
        </div>`;
      $("#save-note").addEventListener("click", () => {
        const title = $("#note-title").value.trim() || "제목 없음";
        const body = $("#note-body").value;
        if (state.activeNote === "new") {
          state.notes.unshift({ id: state.nextNoteId++, title, body, updated: Date.now() });
        } else {
          const existing = state.notes.find((item) => item.id === state.activeNote);
          if (existing) Object.assign(existing, { title, body, updated: Date.now() });
        }
        state.activeNote = null;
        renderNotes();
        showToast("메모를 저장했어요.");
      });
      return;
    }

    const sorted = [...state.notes].sort((a, b) => b.updated - a.updated);
    content.innerHTML = `
      <div class="notes-toolbar"><span>${sorted.length}개의 메모</span><span>iCloud 동기화 꺼짐</span></div>
      <div class="list-card">
        ${sorted.length ? sorted.map((note) => `
          <button class="note-item" data-note="${note.id}">
            <strong>${escapeHTML(note.title)}</strong>
            <p>${escapeHTML(note.body.replace(/\n/g, " ")) || "내용 없음"}</p>
          </button>`).join("") : '<div class="empty-state">아직 메모가 없습니다.<br>오른쪽 위 + 버튼으로 새 메모를 만들어 보세요.</div>'}
      </div>`;
    content.querySelectorAll("[data-note]").forEach((button) => {
      button.addEventListener("click", () => { state.activeNote = Number(button.dataset.note); renderNotes(); });
    });
  }

  $("#unlock-button").addEventListener("click", () => {
    enteredPasscode = "";
    updatePasscodeDots();
    $("#passcode-error").textContent = "암호를 입력하세요.";
    $("#passcode-modal").classList.remove("hidden");
    $("#passcode-modal").setAttribute("aria-hidden", "false");
  });

  $("#passcode-close").addEventListener("click", closePasscode);

  document.querySelectorAll("[data-digit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (enteredPasscode.length >= 4) return;
      enteredPasscode += button.dataset.digit;
      updatePasscodeDots();
      if (enteredPasscode.length === 4) {
        if (enteredPasscode === demoPasscode) {
          closePasscode();
          setView("home");
          showToast("잠금이 해제되었습니다.");
        } else {
          $("#passcode-error").textContent = "암호가 올바르지 않습니다. 다시 입력해 주세요.";
          $("#passcode-dots").classList.add("shake");
          setTimeout(() => $("#passcode-dots").classList.remove("shake"), 300);
          setTimeout(() => {
            enteredPasscode = "";
            updatePasscodeDots();
          }, 450);
        }
      }
    });
  });

  $("#passcode-delete").addEventListener("click", () => {
    enteredPasscode = enteredPasscode.slice(0, -1);
    updatePasscodeDots();
    $("#passcode-error").textContent = "암호를 입력하세요.";
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openApp(button.dataset.open));
  });

  $("#back-button").addEventListener("click", () => {
    if (state.app === "instagram" && state.instagramScreen !== "feed") {
      state.instagramScreen = state.instagramScreen === "dm-chat" ? "dm" : "feed"; renderInstagram();
    } else if ((state.app === "messages" || state.app === "kakao") && state.activeChat) {
      state.activeChat = null;
      if (state.app === "kakao") renderKakao(); else renderMessages();
    } else if (state.app === "photos" && state.activePhoto) {
      state.activePhoto = null;
      renderPhotos();
    } else if (state.app === "notes" && state.activeNote !== null) {
      state.activeNote = null;
      renderNotes();
    } else {
      goHome();
    }
  });

  $("#home-indicator").addEventListener("click", () => {
    if (state.view === "lock") {
      setView("home");
      showToast("잠금이 해제되었습니다.");
    } else if (state.view === "app") {
      goHome();
    } else {
      setView("lock");
    }
  });

  $("#header-action").addEventListener("click", () => {
    if (state.app === "notes" && state.activeNote === null) {
      state.activeNote = "new";
      renderNotes();
    }
  });

  try { if (seobinScenario === "new") { setTimeout(() => { if (!seobinChat.messages.some(m => m.from === "date" && m.text === "2025년 1월 5일")) seobinChat.messages.push({from:"date",text:"2025년 1월 5일"}); saveSeobinChat(); addSeobinIncoming("시혀나ㅏㅏ 뭐 해ㅐㅐㅐ"); saveSeobinScenario("received"); if (state.app === "kakao" && state.activeChat === "seobin" && state.view === "app") renderKakao(); }, 6500); } } catch (_) {}
  updateClock();
  setInterval(updateClock, 30000);
  $("#unread-dot").classList.toggle("hidden", !state.unread);
})();
