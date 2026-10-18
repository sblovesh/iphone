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

  function renderMessages() {
    const content = $("#app-content");
    if (state.activeChat) {
      const chat = state.messages.find((item) => item.id === state.activeChat);
      if (!chat) { state.activeChat = null; renderMessages(); return; }
      $("#app-title").textContent = chat.name;
      $("#header-action").textContent = "";
      content.innerHTML = `
        <div class="chat-view">
          <div class="chat-person">
            <div class="avatar ${chat.color}">${escapeHTML(chat.avatar)}</div>
            <strong>${escapeHTML(chat.name)}</strong>
            <p>메시지 · 데모 대화</p>
          </div>
          <div class="chat-log" id="chat-log">
            <div class="chat-date">오늘</div>
            ${chat.messages.map((message) => `<div class="bubble ${message.from}">${escapeHTML(message.text).replace(/\n/g, "<br>")}</div>`).join("")}
          </div>
          <form class="chat-compose" id="chat-form">
            <input id="chat-input" type="text" maxlength="300" placeholder="메시지 입력" aria-label="메시지 입력" autocomplete="off">
            <button class="send-button" type="submit" aria-label="보내기">↑</button>
          </form>
        </div>`;
      const log = $("#chat-log");
      log.scrollTop = log.scrollHeight;
      $("#chat-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const input = $("#chat-input");
        const value = input.value.trim();
        if (!value) return;
        chat.messages.push({ from: "outgoing", text: value });
        chat.preview = value;
        chat.time = "방금";
        renderMessages();
        const newLog = $("#chat-log");
        newLog.scrollTop = newLog.scrollHeight;
      });
      return;
    }

    $("#app-title").textContent = "메시지";
    $("#header-action").textContent = "";
    content.innerHTML = `
      <div class="section-label">고정된 대화</div>
      <div class="list-card">
        ${state.messages.map((chat) => `
          <button class="list-row" data-chat="${chat.id}">
            <span class="avatar ${chat.color}">${escapeHTML(chat.avatar)}</span>
            <span class="row-main">
              <span class="row-title">${escapeHTML(chat.name)}</span>
              <span class="row-subtitle">${escapeHTML(chat.preview)}</span>
            </span>
            <span class="row-trailing">${escapeHTML(chat.time)}　›</span>
          </button>`).join("")}
      </div>
      <div class="section-label">안내</div>
      <div class="empty-state">대화를 선택해 내용을 확인하거나<br>직접 메시지를 입력해 보세요.</div>`;
    content.querySelectorAll("[data-chat]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeChat = button.dataset.chat;
        state.unread = false;
        $("#unread-dot").classList.add("hidden");
        renderMessages();
      });
    });
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
          <div class="kakao-chat-info">${kakaoAvatar(chat, true)}<strong>${escapeHTML(chat.name)}</strong><span>온라인</span></div>
          <div class="kakao-chat-log" id="kakao-chat-log">
            <div class="kakao-date">오늘</div>
            ${chat.messages.map((message) => message.from === "date" ? `<div class="kakao-date">${escapeHTML(message.text)}</div>` : message.from === "photo" ? `<div class="kakao-message-photo ${chat.id === "uyeon" ? "incoming" : "outgoing"}"><img src="${message.text}" alt="보낸 사진"></div>` : `<div class="kakao-message-wrap ${message.from}">${message.from === "incoming" ? kakaoAvatar(chat, true) : ""}<div class="kakao-message ${message.from}">${escapeHTML(message.text)}${message.time ? `<small>${escapeHTML(message.time)}</small>` : ""}</div></div>`).join("")}
          </div>
          <form class="kakao-compose" id="kakao-form"><button type="button" aria-label="첨부">＋</button><input id="kakao-input" maxlength="300" placeholder="메시지 입력" autocomplete="off"><button type="submit" aria-label="보내기">➤</button></form>
        </div>`;
      const log = $("#kakao-chat-log"); log.scrollTop = log.scrollHeight;
      $("#kakao-form").addEventListener("submit", (event) => {
        event.preventDefault(); const input = $("#kakao-input"); const value = input.value.trim(); if (!value) return;
        chat.messages.push({ from: "outgoing", text: value }); chat.preview = value; chat.time = "방금"; renderKakao();
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
    content.querySelectorAll("[data-kakao-chat]").forEach((button) => button.addEventListener("click", () => { state.activeChat = button.dataset.kakaoChat; renderKakao(); }));
  }

  function renderInstagram() {
    const content = $("#app-content");
    $("#app-screen").classList.remove("kakao-mode");
    const dmItems = [
      {name:"서빈", avatar:"서", color:"pink", preview:"오늘도 고생 많았어!", time:"방금"},
      {name:"민서", avatar:"민", color:"blue", preview:"팬이에요! 항상 응원해요 💗", time:"12분", disabled:true},
      {name:"라온 엔터테인먼트", avatar:"R", color:"gold", preview:"브랜드 캠페인 협업 문의드립니다.", time:"1시간"},
      {name:"드라마 공식 계정", avatar:"D", color:"green", preview:"티저 게시물 확인 부탁드려요.", time:"3시간"},
      {name:"지우", avatar:"지", color:"pink", preview:"촬영장 사진 너무 멋있어요!", time:"어제"},
      {name:"팬 계정", avatar:"♡", color:"blue", preview:"정말 팬이에요 🥹", time:"어제"}
    ];
    if (state.instagramScreen === "dm-chat") {
      $("#app-title").textContent = "서빈"; $("#header-action").textContent = "⋯";
      content.innerHTML = `<div class="ig-dm-chat"><div class="ig-dm-person"><span class="ig-mini-avatar pink">서</span><strong>서빈</strong><small>프로필 보기</small></div><div class="ig-dm-history"><div class="ig-dm-date">오늘</div><div class="ig-dm-bubble incoming">오늘 촬영 끝났어? 고생 많았어!</div><div class="ig-dm-bubble outgoing">응 이제 끝났어 ㅎㅎ 너는 뭐 해?</div><div class="ig-dm-bubble incoming">나도 방금 집 도착! 내일 티저 공개라며 👀</div><div class="ig-dm-bubble outgoing">맞아ㅋㅋ 긴장된다</div></div><form class="ig-dm-compose" id="ig-dm-form"><input id="ig-dm-input" placeholder="메시지 보내기..." maxlength="300"><button>➤</button></form></div>`;
      $("#ig-dm-form").addEventListener("submit", e => { e.preventDefault(); const input=$("#ig-dm-input"); if(input.value.trim()){ const bubble=document.createElement("div"); bubble.className="ig-dm-bubble outgoing"; bubble.textContent=input.value.trim(); $(".ig-dm-history").appendChild(bubble); input.value=""; }}); return;
    }
    if (state.instagramScreen === "dm") {
      $("#app-title").textContent = "sihye0n_an"; $("#header-action").textContent = "✎";
      content.innerHTML = `<div class="ig-dm-top"><div class="ig-dm-account">sihye0n_an <span>●</span></div><div class="ig-dm-search">⌕　검색</div></div><div class="ig-dm-list-title">메시지 <span>요청</span></div><div class="ig-dm-list">${dmItems.map(x=>`<button class="ig-dm-row" data-dm="${x.name}"><span class="ig-mini-avatar ${x.color}">${x.avatar}</span><span><strong>${x.name}</strong><small>${x.preview}</small></span><time>${x.time}</time></button>`).join("")}</div><div class="ig-bottom-tabs"><button data-ig-nav="feed">⌂</button><button>▣</button><button data-ig-nav="dm" class="ig-nav-active">➤</button><button>⌕</button><button>●</button></div>`;
      content.querySelectorAll("[data-dm]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.dm !== "서빈") return; state.activeDM=b.dataset.dm;state.instagramScreen="dm-chat";renderInstagram();}));
      content.querySelectorAll("[data-ig-nav]").forEach(b=>b.addEventListener("click",()=>{state.instagramScreen=b.dataset.igNav;renderInstagram();})); return;
    }
    $("#app-title").textContent = "Instagram"; $("#header-action").textContent = "♡";
    content.innerHTML = `<div class="ig-topbar"><span>＋</span><strong>Instagram</strong><span>▣　♡</span></div><div class="ig-post"><div class="ig-post-user"><span class="ig-mini-avatar blue">tvN</span><div><strong>tvn_drama</strong><small>협찬 · 공식 계정</small></div><span class="ig-more">•••</span></div><div class="ig-drama-ad ig-actor-photo"><img src="actor-feed.jpg" alt="안시현 배우 사진"></div><div class="ig-actions"><button data-like="drama" aria-label="좋아요">♡</button><button data-comment="drama" aria-label="댓글">♧</button><button aria-label="공유">➤</button><button class="ig-save" aria-label="저장">♧</button></div><div class="ig-post-copy"><strong id="ig-likes">좋아요 24,681개</strong><p><strong>tvn_drama</strong> 올겨울을 설레게 할 새로운 드라마. 배우 안시현, 드라마 ‘청춘 실종 사건’ 남자 주인공으로 캐스팅 🎬 많은 기대 부탁드립니다. #안시현 #청춘실종사건 #캐스팅</p><p class="ig-comments">댓글 318개 모두 보기</p><small>홍보 · 2시간 전</small></div></div><div class="ig-bottom-tabs"><button data-ig-nav="feed" class="ig-nav-active">⌂</button><button>▣</button><button data-ig-nav="dm">➤</button><button>⌕</button><button>●</button></div>`;
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

  updateClock();
  setInterval(updateClock, 30000);
  $("#unread-dot").classList.toggle("hidden", !state.unread);
})();
