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
    activePhoto: null,
    activeNote: null,
    unread: false,
    messages: [
      { id: "seobin", name: "서빈 형", avatar: "서", color: "pink", photo: "avatar-seobin.jpg", preview: "시현님은 맨날 다 괜찮다구 해서...", time: "오후 5:58", messages: [{from:"date",text:"2024년 9월 16일"},{from:"incoming",text:"혹시 늦어요??",time:"오후 8:12"},{from:"outgoing",text:"저 이제 퇴근 중!! 왜요??",time:"오후 8:14"},{from:"incoming",text:"저 아직 저녁 안 먹었는데 드시고 싶은 거 있나 해서...",time:"오후 8:16"},{from:"outgoing",text:"서빈 님 좋아하는 걸루 시켜용",time:"오후 8:18"},{from:"incoming",text:"음... 그러면 치킨?",time:"오후 8:21"},{from:"outgoing",text:"그럼 제가 맥주 사서 갈게요!!",time:"오후 8:23"},{from:"incoming",text:"좋아여",time:"오후 8:25"},{from:"date",text:"2024년 9월 20일"},{from:"incoming",text:"시현님",time:"오후 5:06"},{from:"outgoing",text:"무슨 일이에요??",time:"오후 5:07"},{from:"incoming",text:"저 인스타에 사진 올리려고 했는데",time:"오후 5:08"},{from:"incoming",text:"이거 괜찮나 싶어서...",time:"오후 5:08"},{from:"photo",text:"seobin-photo.jpg",time:"오후 5:09"},{from:"outgoing",text:"ㄱㄱ 좋은데여?",time:"오후 5:12"},{from:"incoming",text:"진짜 괜찮져?",time:"오후 5:13"},{from:"outgoing",text:"넹 좋아여",time:"오후 5:14"},{from:"incoming",text:"시현님은 맨날 다 괜찮다구 해서...",time:"오후 5:16"},{from:"outgoing",text:"그건 서빈님이 잘생긴 탓",time:"오후 5:18"}] },
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
    notes: [],
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
  // 앱마다 독립된 가상 시계 (24시간제 시작 시각 → "오전/오후 h:mm" 문자열, 1분씩 증가)
  function makeChatClock(startHour, startMinute) {
    let total = startHour * 60 + startMinute;
    return () => {
      const t = total % 1440; total += 1;
      const h = Math.floor(t / 60), m = t % 60;
      return `${h < 12 ? "오전" : "오후"} ${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")}`;
    };
  }
  const kakaoTime = makeChatClock(10, 34);   // 카카오톡 서빈 시나리오 (2025년 1월 5일 오전)
  const bubbleTime = makeChatClock(15, 10);  // 버블 (2025년 4월 8일 마지막 메시지 오후 2:52 이후)
  function addSeobinIncoming(text, photo=false) {
    seobinChat.messages.push({from: photo ? "photo" : "incoming", text: photo ? "seobin-bed-photo.jpg" : text, time: kakaoTime()});
    seobinChat.preview = photo ? "사진" : text; seobinChat.time = "방금"; saveSeobinChat();
    if (state.app === "kakao" && state.activeChat === "seobin" && state.view === "app") renderKakao();
    else { showToast(photo ? "카카오톡 · 서빈 형이 사진을 보냈어요" : "카카오톡 · 서빈 형: " + text, "kakao"); state.unread = true; const dot=$("#unread-dot"); if(dot) dot.classList.remove("hidden"); if (state.app === "kakao" && !state.activeChat && state.view === "app") renderKakao(); }
  }
  function startSeobinSleepStory() {
    if (seobinScenario !== "received") return;
    saveSeobinScenario("replied");
    seobinChat.messages.push({from:"outgoing", text:"저 촬영 중!! 잠시 브레이크 중! 형은 뭐 해여?", time:kakaoTime()});
    seobinChat.preview = "저 촬영 중!! 잠시 브레이크 중! 형은 뭐 해여?"; seobinChat.time="방금"; saveSeobinChat(); renderKakao();
    setTimeout(() => addSeobinIncoming("나는 침대랑 한 몸이야...."), 900);
    setTimeout(() => addSeobinIncoming("", true), 2200);
    setTimeout(() => { addSeobinIncoming("나 다시 쫌 잘겡 촬영 열시미 해ㅐㅐ"); saveSeobinScenario("finished"); if (state.app === "kakao" && state.activeChat === "seobin" && state.view === "app") renderKakao(); }, 3600);
  }
  const appTitles = { messages: "메시지", photos: "사진", calls: "전화", notes: "메모", kakao: "카카오톡", instagram: "Instagram", bubble: "bubble" };
  let toastTimer;
  let notificationTimer;
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

  }

  function showToast(message, kind = "generic") {
    const toast = $("#toast");
    toast.innerHTML = "";
    if (kind === "kakao") {
      toast.classList.add("kakao-notification");
      { const m = /^카카오톡 · (.+?)(?:: (.*)|이 사진을 보냈어요)$/.exec(message) || []; const who = m[1] || "서빈 형", body = m[2] !== undefined ? m[2] : "사진을 보냈습니다.";
        toast.innerHTML = '<img class="kakao-notify-icon" src="kakao-icon.svg" alt=""><span class="kakao-notify-copy"><strong>' + escapeHTML(who) + '</strong><span>' + escapeHTML(body) + '</span></span><time>지금</time>'; }
      toast.onclick = () => { toast.classList.remove("show"); openApp("kakao"); state.activeChat = "seobin"; renderKakao(); };
      toast.style.pointerEvents = "auto";
    } else {
      toast.classList.remove("kakao-notification"); toast.textContent = message; toast.onclick = null; toast.style.pointerEvents = "none";
    }
    pulseIsland();
    toast.classList.add("show"); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.classList.remove("show"); toast.style.pointerEvents = "none"; }, kind === "kakao" ? 2000 : 2200);
  }

  function setView(view) {
    state.view = view;
    if (view !== "lock") views.lock.style.transform = "";
    Object.entries(views).forEach(([key, element]) => element.classList.toggle("hidden", key !== view));
    $("#home-indicator").style.background = view === "lock" ? "#fff" : "#222";
    $("#home-indicator").style.opacity = view === "lock" ? ".85" : ".8";
  }

  // ===== v30: iOS 스타일 전환 애니메이션 =====
  const screenEl = $(".screen");
  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let motionGen = 0;
  let motionAnims = [];
  function stopMotion() { motionGen++; motionAnims.forEach((a) => { try { a.cancel(); } catch (e) {} }); motionAnims = []; return motionGen; }
  function runAnim(el, frames, opts) { const a = el.animate(frames, Object.assign({ fill: "both" }, opts)); motionAnims.push(a); return a.finished.catch(() => {}); }
  function iconGeometry(app) {
    const el = document.querySelector('.app-grid [data-open="' + app + '"] .app-art') || document.querySelector('.dock [data-open="' + app + '"]');
    if (!el) return null;
    const ir = el.getBoundingClientRect(), sr = screenEl.getBoundingClientRect();
    if (!ir.width || !sr.width) return null;
    const s = ir.width / sr.width;
    return { dx: (ir.left + ir.width / 2) - (sr.left + sr.width / 2), dy: (ir.top + ir.height / 2) - (sr.top + sr.height / 2), s, r: 14 / s };
  }
  function playOpen(app) {
    const g = iconGeometry(app);
    if (!g || reduceMotion()) return;
    const gen = stopMotion();
    const home = views.home, appEl = views.app;
    home.classList.remove("hidden");
    const g2 = iconGeometry(app); if (!g2) { home.classList.add("hidden"); return; }
    const ease = "cubic-bezier(.22,.9,.26,1)";
    runAnim(home, [{ transform: "scale(1)", opacity: 1 }, { transform: "scale(1.1)", opacity: .55 }], { duration: 420, easing: ease });
    runAnim(appEl, [
      { transform: "translate(" + g2.dx + "px," + g2.dy + "px) scale(" + g2.s + ")", borderRadius: g2.r + "px", opacity: 0 },
      { opacity: 1, offset: .22 },
      { transform: "none", borderRadius: "0px", opacity: 1 }
    ], { duration: 420, easing: ease }).then(() => {
      if (gen !== motionGen) return;
      home.classList.add("hidden"); motionAnims.forEach((a) => { try { a.cancel(); } catch (e) {} }); motionAnims = [];
    });
  }
  function playClose(app, fromTransform, fromRadius) {
    const gen = stopMotion();
    const home = views.home, appEl = views.app;
    state.view = "home";
    $("#home-indicator").style.background = "#222";
    home.classList.remove("hidden"); views.lock.classList.add("hidden"); appEl.classList.remove("hidden");
    const g = iconGeometry(app) || { dx: 0, dy: 0, s: .2, r: 60 };
    const ease = "cubic-bezier(.3,.8,.3,1)";
    runAnim(home, [{ transform: "scale(1.1)", opacity: .55 }, { transform: "scale(1)", opacity: 1 }], { duration: 360, easing: ease });
    runAnim(appEl, [
      { transform: fromTransform || "none", borderRadius: fromRadius || "0px", opacity: 1 },
      { opacity: 1, offset: .7 },
      { transform: "translate(" + g.dx + "px," + g.dy + "px) scale(" + g.s + ")", borderRadius: g.r + "px", opacity: 0 }
    ], { duration: 360, easing: ease }).then(() => {
      if (gen !== motionGen) return;
      appEl.classList.add("hidden"); appEl.classList.remove("phone-mode", "ig-mode");
      motionAnims.forEach((a) => { try { a.cancel(); } catch (e) {} }); motionAnims = [];
    });
  }
  function playUnlock() {
    if (reduceMotion()) { setView("home"); return; }
    const gen = stopMotion();
    const lock = views.lock, home = views.home;
    setView("home"); lock.classList.remove("hidden"); lock.style.zIndex = 5;
    runAnim(home, [{ transform: "scale(1.12)", opacity: .6 }, { transform: "scale(1)", opacity: 1 }], { duration: 420, easing: "cubic-bezier(.22,.9,.26,1)" });
    runAnim(lock, [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-18%)", opacity: 0 }], { duration: 380, easing: "cubic-bezier(.4,.1,.3,1)" }).then(() => {
      lock.style.zIndex = "";
      if (gen !== motionGen) return;
      lock.classList.add("hidden"); motionAnims.forEach((a) => { try { a.cancel(); } catch (e) {} }); motionAnims = [];
    });
  }
  function pulseIsland() { const i = $("#dynamic-island"); if (!i) return; i.classList.add("alert"); clearTimeout(pulseIsland.t); pulseIsland.t = setTimeout(() => i.classList.remove("alert"), 2200); }

  function openApp(app) {
    if (app === "bubble") bubbleChatOpen = false;
    state.app = app;
    state.activeChat = null;
    state.activePhoto = null;
    state.activeNote = null;
    $("#app-screen").classList.remove("photos-mode", "kakao-mode", "kakao-on", "kakao-room", "no-hdr", "photo-viewing", "phone-mode", "ig-mode");
    if (app === "messages" || app === "notes" || app === "bubble") $("#app-screen").classList.add("no-hdr");
    if (app === "calls") { phoneState.tab = "recents"; phoneState.filter = "all"; phoneState.detail = null; phoneState.query = ""; }
    $("#header-action").onclick = null;
    $("#app-title").textContent = appTitles[app] || "앱";
    $("#header-action").textContent = app === "notes" ? "+" : "";
    $("#header-action").setAttribute("aria-label", app === "notes" ? "새 메모" : "추가 작업");
    const fromHome = state.view === "home";
    stopMotion();
    views.app.style.transform = ""; views.app.style.borderRadius = "";
    setView("app");
    renderApp();
    if (fromHome) playOpen(app);
  }

  function goHome(fromTransform, fromRadius) {
    const co = document.getElementById("call-overlay"); if (co) co.remove();
    const prevApp = state.app, wasApp = state.view === "app";
    state.app = null;
    state.activeChat = null;
    state.activePhoto = null;
    state.activeNote = null;
    if (wasApp && prevApp && !reduceMotion()) { playClose(prevApp, fromTransform, fromRadius); return; }
    stopMotion();
    $("#app-screen").classList.remove("phone-mode", "ig-mode");
    setView("home");
  }

  function renderApp() {
    if (state.app === "messages") renderMessages();
    else if (state.app === "photos") renderPhotos();
    else if (state.app === "calls") renderCalls();
    else if (state.app === "notes") renderNotes();
    else if (state.app === "kakao") renderKakao();
    else if (state.app === "instagram") renderInstagram();
    else if (state.app === "bubble") renderBubble();
  }

  const smsPreviews = [
    {name:"매니저 우연 형", avatar:"우", color:"blue", time:"오후 8:42", preview:"내일 콜타임 06:30. 차는 5:50에 도착할게. 늦지 말고 자."},
    {name:"[광고] 프리미엄 대출", avatar:"광", color:"gold", time:"오후 8:17", preview:"고객님만을 위한 한도 조회, 지금 바로 확인하세요."},
    {name:"제작팀 조연출", avatar:"조", color:"blue", time:"오후 7:56", preview:"내일 32씬 대본 수정본 전달드립니다. 확인 부탁드려요."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"오후 7:31", preview:"시현 배우님 맞으시죠? 저 진짜 오래전부터 팬이었어요."},
    {name:"소속사 홍보팀", avatar:"홍", color:"pink", time:"오후 6:48", preview:"인터뷰 기사 초안 보내드렸습니다. 인용문만 체크해주세요."},
    {name:"스타일리스트 수연", avatar:"수", color:"green", time:"오후 6:15", preview:"내일 제작발표회 착장 최종안 공유드려요!"},
    {name:"[국제발신] 당첨 안내", avatar:"당", color:"gold", time:"오후 5:59", preview:"축하합니다! 경품 수령을 위해 링크를 확인하세요."},
    {name:"캐스팅 디렉터", avatar:"캐", color:"blue", time:"오후 5:26", preview:"차기작 미팅 일정 관련해 연락드렸습니다."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"오후 5:02", preview:"오늘 촬영장 뒤편에서 기다린 거 봤죠? 모른 척하지 마요. 나만큼 오래 좋아한 사람 없잖아."},
    {name:"광고대행사 윤 담당자", avatar:"윤", color:"green", time:"오후 4:41", preview:"브랜드 캠페인 제안서와 촬영 가이드 전달드립니다."},
    {name:"[Web발신] 택배", avatar:"택", color:"blue", time:"오후 4:12", preview:"배송 완료: 문 앞에 상품을 두었습니다."},
    {name:"매니저 우연 형", avatar:"우", color:"blue", time:"오후 3:50", preview:"차량 번호 32가 8124야. 끝나면 바로 연락해."},
    {name:"영화제 사무국", avatar:"영", color:"gold", time:"오후 3:14", preview:"초청 및 레드카펫 참석 여부 회신 부탁드립니다."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"오후 2:58", preview:"집 여기 맞네. 불 켜지는 거 확인했어. 오늘은 왜 이렇게 늦게 들어왔어?"},
    {name:"보이스피싱 의심", avatar:"금", color:"blue", time:"오후 2:23", preview:"[금융기관] 계좌 보호를 위해 본인 인증이 필요합니다."},
    {name:"드라마 제작사", avatar:"제", color:"green", time:"오후 1:46", preview:"대본 리딩은 금요일 오후 2시, 3층 회의실입니다."},
    {name:"팬카페 운영진", avatar:"팬", color:"pink", time:"오후 1:12", preview:"생일 서포트 관련해 소속사 확인을 요청드립니다."},
    {name:"[광고] 휴대폰 결제", avatar:"광", color:"gold", time:"오후 12:54", preview:"미납 요금이 있습니다. 즉시 납부하지 않으면 제한됩니다."},
    {name:"사진작가 도현", avatar:"도", color:"blue", time:"오전 11:38", preview:"어제 화보 셀렉본 업로드했습니다. 마음에 드는 컷 골라주세요."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"오전 10:52", preview:"단골 카페 바꿨더라. 피해 다녀도 소용없어요. 어디 가는지 다 알고 있으니까."},
    {name:"매니저 우연 형", avatar:"우", color:"blue", time:"오전 10:15", preview:"인터뷰 예상 질문 정리해 뒀어. 차에서 같이 보자."},
    {name:"오디션 안내", avatar:"오", color:"green", time:"오전 9:44", preview:"오디션 지정 대사와 캐릭터 설명을 첨부해드립니다."},
    {name:"[Web발신] 카드", avatar:"카", color:"gold", time:"오전 9:03", preview:"해외 승인 1,280,000원. 본인 사용이 아니라면 문의 바랍니다."},
    {name:"매니지먼트 팀장", avatar:"팀", color:"blue", time:"어제", preview:"계약서 수정 사항 표시해 두었으니 확인 부탁합니다."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"어제", preview:"어제 집 앞에서 두 시간 기다렸어. 커튼 사이로 보이던데 왜 연락 안 받아? 나 이렇게까지 만들지 마."},
    {name:"뷰티 브랜드", avatar:"뷰", color:"green", time:"어제", preview:"신제품 협찬 관련 콘텐츠 업로드 일정 확인 부탁드립니다."},
    {name:"방송국 작가님", avatar:"작", color:"pink", time:"어제", preview:"예능 출연 관련 사전 질문지를 보내드립니다."},
    {name:"[광고] 투자 리딩방", avatar:"투", color:"gold", time:"어제", preview:"연예인도 참여하는 비공개 급등주 정보방에 초대합니다."},
    {name:"알 수 없는 번호", avatar:"?", color:"gold", time:"월요일", preview:"숙소 주소 알아냈어요. 선물 보냈으니까 꼭 받아요. 계속 무시하면 직접 찾아갈 수밖에 없잖아."},
    {name:"세무 담당자", avatar:"세", color:"blue", time:"월요일", preview:"종합소득세 자료 중 누락된 영수증이 있어 연락드립니다."}
  ];

  const MS_ICON = {
    compose: '<svg viewBox="0 0 24 24"><path d="M11 4.5H7a3 3 0 0 0-3 3v9.500a3 3 0 0 0 3 3h9.500a3 3 0 0 0 3-3V13"/><path d="m17.600 3.700 2.700 2.700L12 14.700 8.700 15.300l.6-3.300z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.300"/><path d="m15.400 15.400 5 5"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="9" r="4.300"/><path d="M3.800 22c.6-4.800 4-7.200 8.200-7.200s7.600 2.400 8.200 7.200z"/></svg>'
  };
  function renderMessages() {
    const content = $("#app-content");
    // Messages is a read-only preview inbox. It never opens a conversation or shares data with KakaoTalk.
    state.activeChat = null;
    $("#app-title").textContent = "메시지";
    $("#header-action").textContent = "";
    const unknown = (item) => item.avatar === "?" || /^\[/.test(item.name) || /의심/.test(item.name);
    content.innerHTML = `
      <div class="ms-screen">
        <div class="ms-top"><span class="ms-edit">편집</span><span class="ms-compose">${MS_ICON.compose}</span></div>
        <h1 class="ms-title">메시지</h1>
        <div class="ms-search">${MS_ICON.search}<span>검색</span></div>
        <div class="ms-list">
          ${smsPreviews.map((item, i) => `
          <div class="ms-row">
            <span class="ms-dot${i === 0 ? " on" : ""}"></span>
            ${unknown(item) ? `<span class="ms-avatar unk">${MS_ICON.person}</span>` : `<span class="ms-avatar">${escapeHTML(item.avatar)}</span>`}
            <span class="ms-main">
              <span class="ms-head"><strong>${escapeHTML(item.name)}</strong><time>${escapeHTML(item.time)}</time><i>${MS_ICON.chev}</i></span>
              <span class="ms-prev">${escapeHTML(item.preview)}</span>
            </span>
          </div>`).join("")}
        </div>
        <div class="ms-footer">알 수 없는 발신자의 링크는 열지 마세요.</div>
      </div>`;
  }

  const BUBBLE_STORAGE_KEY = "virtual-iphone-bubble-seobin-v2";
  let bubbleChatOpen = false;
  const bubbleInitialMessages = [
    {from:"artist",day:"2025년 4월 5일",text:"안녀엉",time:"오전 9:11"},
    {from:"artist",day:"2025년 4월 5일",text:"좋은 아침",time:"오전 9:11"},
    {from:"artist",day:"2025년 4월 5일",text:"다들 오늘 하루도 화이띵",time:"오전 9:12"},
    {from:"artist",day:"2025년 4월 5일",text:"오랜만에 기타를 들어따",time:"오후 3:04"},
    {from:"artist",day:"2025년 4월 5일",image:"bubble-guitar.jpg",time:"오후 3:05"},
    {from:"artist",day:"2025년 4월 5일",text:"사진 누가 찍어줬냐구??",time:"오후 3:06"},
    {from:"artist",day:"2025년 4월 5일",text:"시현이가 찍어줬는뎅...",time:"오후 3:06"},
    {from:"artist",day:"2025년 4월 5일",text:"시현이 사진 짱 잘 찍음",time:"오후 3:07"},
    {from:"artist",day:"2025년 4월 5일",text:"만난 지 한 달...? 두 달 됐을 때",time:"오후 3:07"},
    {from:"artist",day:"2025년 4월 5일",text:"시현이한테 셀카 강의 많이 받아써",time:"오후 3:08"},
    {from:"artist",day:"2025년 4월 5일",text:"셀카 달라구?",time:"오후 3:08"},
    {from:"artist",day:"2025년 4월 5일",image:"bubble-selfie.jpg",time:"오후 3:09"},
    {from:"artist",day:"2025년 4월 5일",text:"자 요기",time:"오후 3:09"},
    {from:"artist",day:"2025년 4월 5일",text:"어때?? 이제 셀카 쫌 잘 찍지??",time:"오후 3:10"},
    {from:"fan",day:"2025년 4월 5일",text:"완전",time:"오후 3:11"},
    {from:"fan",day:"2025년 4월 5일",text:"가르쳐준 보람이 나네 막",time:"오후 3:11"},
    {from:"artist",day:"2025년 4월 5일",text:"조만간 기타 커버곡 하나 올릴게ㅔ",time:"오후 3:12"},
    {from:"artist",day:"2025년 4월 5일",text:"신청곡 같은 거 받아야 하나??",time:"오후 3:12"},
    {from:"artist",day:"2025년 4월 5일",text:"여기다 여러 개 적어바 하나 골라서 연습할게",time:"오후 3:13"},
    {from:"artist",day:"2025년 4월 5일",text:"아무튼 난 다시 간다ㅏ",time:"오후 3:14"},
    {from:"artist",day:"2025년 4월 6일",text:"오늘도 조은 아침",time:"오전 8:07"},
    {from:"artist",day:"2025년 4월 6일",text:"요즘 바쁘다 바빠",time:"오전 8:09"},
    {from:"artist",day:"2025년 4월 6일",text:"왜 바쁘냐고?",time:"오전 8:10"},
    {from:"artist",day:"2025년 4월 6일",text:"그건 비밀",time:"오전 8:10"},
    {from:"artist",day:"2025년 4월 8일",text:"컴백 소식을 봤는감",time:"오후 2:48"},
    {from:"artist",day:"2025년 4월 8일",text:"춤은 많이 췄으니 다시 기타 잡구 노래 부를 예정",time:"오후 2:49"},
    {from:"artist",day:"2025년 4월 8일",text:"이걸로 눈도장 찍었으니까 ㅎㅎ",time:"오후 2:50"},
    {from:"artist",day:"2025년 4월 8일",text:"한 번은 다시 해보구 싶었당",time:"오후 2:51"},
    {from:"fan",day:"2025년 4월 8일",text:"최고",time:"오후 2:52"}
  ];
  let bubbleMessages = bubbleInitialMessages.map(message => ({ ...message }));
  // 카카오 서빈 채팅과 동일하게 방문할 때마다 처음 상태에서 시작 (이전 저장값은 삭제)
  try { localStorage.removeItem(BUBBLE_STORAGE_KEY); } catch (_) {}

  // 방문 30초 후 서빈의 버블 알림 시나리오: 각 알림이 뜨는 순간 해당 메시지를 실제 대화에 추가
  const bubbleRevealMessages = [
    "시혀나",
    "나 너 휴대폰 봣는데",
    "너 왜 내 버블 구독하구 있냐",
    "딱 들켯어 너"
  ];
  let bubbleRevealStarted = false;
  let bubbleRevealOpened = false;
  let bubbleRevealIndex = 0;
  let bubbleNoticeTimer = null;
  let bubbleNoticeHideTimer = null;
  let bubbleUnread = 105;
  const bubbleNoticeIntervals = [0, 2000, 5000, 10000];

  function ensureBubbleNotice() {
    let notice = document.getElementById("bubble-push-notice");
    if (!notice) {
      notice = document.createElement("button");
      notice.type = "button";
      notice.id = "bubble-push-notice";
      notice.className = "bubble-push-notice";
      notice.innerHTML = '<img src="bubble-cat.jpg" alt=""><span class="bubble-push-copy"><strong>버블 · 서빈</strong><span id="bubble-push-text"></span></span><time>지금</time>';
      document.body.appendChild(notice);
      notice.addEventListener("click", () => {
        bubbleRevealOpened = true;
        bubbleUnread = 0;
        clearTimeout(bubbleNoticeTimer);
        clearTimeout(bubbleNoticeHideTimer);
        notice.classList.remove("show");
        bubbleNoticeIndexStop();
        openApp("bubble");
        bubbleChatOpen = true;
        renderBubble();
      });
    }
    return notice;
  }
  function bubbleNoticeIndexStop() {
    bubbleRevealIndex = bubbleRevealMessages.length;
  }
  function showBubblePush(index) {
    if (bubbleRevealOpened || index >= bubbleRevealMessages.length) return;
    bubbleRevealIndex = index;
    const notice = ensureBubbleNotice();
    const text = document.getElementById("bubble-push-text");
    if (text) text.textContent = bubbleRevealMessages[index];
    if (!bubbleMessages.some(m => m.from === "artist" && m.day === "2025년 4월 8일" && m.text === bubbleRevealMessages[index])) {
      bubbleMessages.push({ from: "artist", day: "2025년 4월 8일", text: bubbleRevealMessages[index], time: bubbleTime() });
      if (!(state.app === "bubble" && state.view === "app" && bubbleChatOpen)) bubbleUnread += 1;
    }
    if (state.app === "bubble" && state.view === "app") renderBubble();
    notice.classList.add("show");
    clearTimeout(bubbleNoticeHideTimer);
    bubbleNoticeHideTimer = setTimeout(() => notice.classList.remove("show"), 2000);
    if (index < bubbleRevealMessages.length - 1) {
      bubbleNoticeTimer = setTimeout(() => showBubblePush(index + 1), bubbleNoticeIntervals[index + 1]);
    }
  }
  setTimeout(() => {
    if (!bubbleRevealStarted) { bubbleRevealStarted = true; showBubblePush(0); }
  }, 30000);
  function renderBubble() {
    const content = $("#app-content");
    $("#app-title").textContent = bubbleChatOpen ? "서빈" : "CHATS";
    $("#header-action").textContent = "";
    if (!bubbleChatOpen) {
      const latest = bubbleMessages[bubbleMessages.length - 1] || bubbleInitialMessages[bubbleInitialMessages.length - 1];
      const preview = latest.image ? "사진" : latest.text;
      content.innerHTML = `<div class="bb-nav"><h1>CHATS</h1><span class="bb-ic">${MS_ICON.search}</span><span class="bb-ic"><svg viewBox="0 0 24 24"><path d="M6 17h12l-1.600-2.300V10.500a4.400 4.400 0 0 0-8.800 0v4.200z"/><path d="M10 19.500a2 2 0 0 0 4 0"/></svg></span></div><div class="bubble-inbox"><div class="bubble-inbox-subtitle">최근 채팅방</div><button class="bubble-room-row" id="bubble-open-room"><img src="bubble-cat.jpg" alt="서빈 프로필"><span class="bubble-room-main"><strong>서빈</strong><span>${escapeHTML(preview)}</span></span><span class="bubble-room-trailing"><time>${escapeHTML(latest.time)}</time>${bubbleUnread > 0 ? `<b>${bubbleUnread}</b>` : ""}</span></button></div>`;
      $("#bubble-open-room").addEventListener("click", () => { bubbleChatOpen = true; bubbleUnread = 0; renderBubble(); });
      return;
    }
    const lines = bubbleMessages.map((message, index) => {
      const previous = bubbleMessages[index - 1];
      const divider = !previous || previous.day !== message.day ? `<div class="bubble-day-divider"><span>${escapeHTML(message.day || "2025년 4월 8일")}</span></div>` : "";
      const body = message.image ? `<img class="bubble-photo-message" src="${message.image}" alt="서빈이 보낸 사진">` : `<div class="bubble-message ${message.from}">${escapeHTML(message.text).replace(/\n/g, "<br>")}</div>`;
      return `${divider}<div class="bubble-line ${message.from}">${message.from === "artist" ? `<img class="bubble-mini-avatar" src="bubble-cat.jpg" alt="서빈">` : ""}<div class="bubble-message-group">${message.from === "artist" ? `<span class="bubble-sender">서빈</span>` : ""}${body}</div><time>${escapeHTML(message.time)}</time></div>`;
    }).join("");
    content.innerHTML = `<div class="bb-nav room"><button type="button" class="bb-ic back" id="bb-back" aria-label="뒤로">${NT_ICON.back}</button><h1>서빈</h1><span class="bb-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="5.500" r="1.200" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.200" fill="currentColor" stroke="none"/><circle cx="12" cy="18.500" r="1.200" fill="currentColor" stroke="none"/></svg></span></div><div class="bubble-app"><div class="bubble-chat-log" id="bubble-chat-log">${lines}</div><form class="bubble-compose" id="bubble-form"><input id="bubble-input" maxlength="300" placeholder="메시지 보내기" autocomplete="off"><button type="submit" class="bubble-send" aria-label="보내기">↑</button></form></div>`;
    const log = $("#bubble-chat-log");
    log.scrollTop = log.scrollHeight;
    $("#bb-back").addEventListener("click", () => { bubbleChatOpen = false; renderBubble(); });
    $("#bubble-form").addEventListener("submit", event => {
      event.preventDefault(); const input = $("#bubble-input"); const value = input.value.trim(); if (!value) return;
      bubbleMessages.push({ from: "fan", day: "2025년 4월 8일", text: value, time: bubbleTime() });
      renderBubble(); $("#bubble-input").focus();
    });
  }

  function kakaoAvatar(chat, small = false) { return chat.photo ? `<img class="kakao-avatar-img ${small ? "small" : ""}" src="${chat.photo}" alt="${escapeHTML(chat.name)} 프로필">` : `<img class="kakao-avatar-img ${small ? "small" : ""}" src="avatar-default.jpg" alt="${escapeHTML(chat.name)} 프로필">`; }

  // ===== v31: 실제 카카오톡 UI =====
  const KT = {
    search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.3"/><path d="m15.4 15.4 5 5"/></svg>',
    newChat: '<svg viewBox="0 0 24 24"><path d="M12 4.2c-4.6 0-8.2 3-8.2 6.9 0 2.2 1.2 4.1 3 5.4l-.7 3.4 3.6-2.1c.7.1 1.5.2 2.3.2 4.6 0 8.2-3 8.2-6.9"/><path d="M18.5 2.8v5.4M15.8 5.5h5.4"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.1"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="m15 4.5-7.5 7.5 7.5 7.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 6.5h16M4 12h16M4 17.5h16"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 4.5v15M4.5 12h15"/></svg>',
    smile: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><path d="M8.2 14.2c.9 1.5 2.2 2.3 3.8 2.3s2.9-.8 3.8-2.3"/><circle cx="9.1" cy="9.8" r=".6" fill="currentColor"/><circle cx="14.9" cy="9.8" r=".6" fill="currentColor"/></svg>',
    hash: '<svg viewBox="0 0 24 24"><path d="M9.5 4 8 20M16 4l-1.5 16M5 9h15M4 15h15"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M12 19V5.5M6 11.5l6-6 6 6"/></svg>',
    tabFriends: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.9"/><path d="M4.6 20.2c.5-4 3.5-6.1 7.4-6.1s6.9 2.1 7.4 6.1"/></svg>',
    tabChat: '<svg viewBox="0 0 24 24"><path d="M12 3.4c-5 0-9 3.3-9 7.4 0 2.6 1.6 4.9 4 6.2l-.9 3.6 4-2.4c.6.1 1.3.2 1.9.2 5 0 9-3.3 9-7.4S17 3.4 12 3.4z" fill="currentColor" stroke="none"/></svg>',
    tabOpen: '<svg viewBox="0 0 24 24"><path d="M12 3.6c-4.7 0-8.4 3-8.4 6.8 0 2.2 1.2 4.1 3.2 5.3l-.6 3.4 3.5-2c.7.1 1.5.2 2.3.2 4.7 0 8.4-3 8.4-6.9S16.700 3.600 12 3.600z"/><circle cx="8.400" cy="10.300" r=".9" fill="currentColor"/><circle cx="12" cy="10.300" r=".9" fill="currentColor"/><circle cx="15.600" cy="10.300" r=".9" fill="currentColor"/></svg>',
    tabShop: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.600a3 3 0 0 1 6 0V8"/></svg>',
    tabMore: '<svg viewBox="0 0 24 24"><circle cx="5.500" cy="12" r="1.600" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.600" fill="currentColor" stroke="none"/><circle cx="18.500" cy="12" r="1.600" fill="currentColor" stroke="none"/></svg>'
  };
  const ktGroupCount = { agency: 4, fanclub: 7, college: 12 };
  const ktUnread = () => ({ seobin: state.unread ? 1 : 0, agency: 2, coactor: 1, fanclub: 12, college: 5 });
  const ktLastTime = (chat) => { for (let i = chat.messages.length - 1; i >= 0; i--) { const m = chat.messages[i]; if (m.from !== "date" && m.time) return m.time; } return chat.time === "방금" ? "" : chat.time; };
  const ktDate = (text) => { const m = /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/.exec(text); if (!m || /요일/.test(text)) return text; return text + " " + "일월화수목금토"[new Date(+m[1], +m[2] - 1, +m[3]).getDay()] + "요일"; };
  const ktSenderKind = (m) => (m.from === "photo" ? "incoming" : m.from);

  function renderKakao() {
    const content = $("#app-content");
    const appEl = $("#app-screen");
    appEl.classList.add("kakao-on");
    appEl.classList.toggle("kakao-room", !!state.activeChat);
    $("#header-action").textContent = "";
    if (state.activeChat) {
      if (state.activeChat === "seobin") { state.unread = false; $("#unread-dot").classList.add("hidden"); }
      const chat = state.messages.find((item) => item.id === state.activeChat);
      if (!chat) { state.activeChat = null; renderKakao(); return; }
      const msgs = chat.messages;
      let lastIncoming = -1; msgs.forEach((m, i) => { if (ktSenderKind(m) === "incoming") lastIncoming = i; });
      const rows = msgs.map((m, i) => {
        if (m.from === "date") return `<div class="kt-date">${escapeHTML(ktDate(m.text))}</div>`;
        const kind = ktSenderKind(m), prev = msgs[i - 1], next = msgs[i + 1];
        const sameRun = (o) => o && o.from !== "date" && ktSenderKind(o) === kind && !!o.time && o.time === m.time;
        const first = !sameRun(prev), last = !sameRun(next);
        const body = m.from === "photo"
          ? `<div class="kt-photo"><img src="${m.text}" alt="사진"></div>`
          : `<div class="kt-bubble ${kind}${first ? " tail" : ""}">${escapeHTML(m.text).replace(/\n/g, "<br>")}</div>`;
        const unread1 = kind === "outgoing" && i > lastIncoming;
        const meta = `<span class="kt-meta">${unread1 ? '<b class="kt-unread">1</b>' : ""}${last && m.time ? `<time>${escapeHTML(m.time)}</time>` : ""}</span>`;
        if (kind === "outgoing") return `<div class="kt-row outgoing${first ? " first" : ""}">${meta}${body}</div>`;
        return `<div class="kt-row incoming${first ? " first" : ""}">${first ? kakaoAvatar(chat, true).replace("kakao-avatar-img", "kt-avatar") : '<span class="kt-avatar-gap"></span>'}<div class="kt-col">${first ? `<div class="kt-name">${escapeHTML(chat.name)}</div>` : ""}<div class="kt-line">${body}${meta}</div></div></div>`;
      }).join("");
      const gc = ktGroupCount[chat.id];
      const finished = chat.id === "seobin" && seobinScenario === "finished";
      content.innerHTML = `
        <div class="kt-room-screen">
          <div class="kt-room-head">
            <button type="button" class="kt-ic back" id="kt-back" aria-label="뒤로">${KT.back}</button><span class="kt-back-count">289</span>
            <div class="kt-room-title"><strong>${escapeHTML(chat.name)}</strong>${gc ? `<em>${gc}</em>` : ""}</div>
            <span class="kt-ic">${KT.search}</span><span class="kt-ic">${KT.menu}</span>
          </div>
          <div class="kt-log" id="kakao-chat-log">${rows}</div>
          ${chat.id === "seobin" && seobinScenario === "received" ? `<div class="seobin-quick-replies"><button type="button" id="seobin-quick-reply">저 촬영 중!! 잠시 브레이크 중! 형은 뭐 해여?</button></div>` : ""}
          <form class="kt-compose" id="kakao-form">
            <button type="button" class="kt-plus" aria-label="첨부">${KT.plus}</button>
            <div class="kt-field"><input id="kakao-input" maxlength="300" placeholder="${finished ? "서빈 형은 자고 있어요…" : ""}" autocomplete="off"><span class="kt-smile">${KT.smile}</span></div>
            <button type="button" class="kt-hash" id="kt-hash" aria-label="샵검색">${KT.hash}</button>
            <button type="submit" class="kt-send" id="kt-send" aria-label="전송">${KT.send}</button>
          </form>
        </div>`;
      const log = $("#kakao-chat-log"); const toBottom = () => { log.scrollTop = log.scrollHeight; }; toBottom(); requestAnimationFrame(toBottom); log.querySelectorAll("img").forEach((im) => { if (!im.complete) im.addEventListener("load", toBottom); });
      $("#kt-back").addEventListener("click", () => { state.activeChat = null; renderKakao(); });
      const quickReply = $("#seobin-quick-reply"); if (quickReply) quickReply.addEventListener("click", startSeobinSleepStory);
      const input = $("#kakao-input"), form = $("#kakao-form");
      input.addEventListener("input", () => form.classList.toggle("has-text", input.value.trim().length > 0));
      form.addEventListener("submit", (event) => {
        event.preventDefault(); const value = input.value.trim(); if (!value) return;
        chat.messages.push({ from: "outgoing", text: value, time: kakaoTime() }); chat.preview = value; chat.time = "방금"; if (chat.id === "seobin") saveSeobinChat(); renderKakao();
      });
      return;
    }
    const unreadMap = ktUnread();
    content.innerHTML = `
      <div class="kt-list-screen">
        <div class="kt-head"><h2>채팅</h2><span class="kt-ic">${KT.search}</span><span class="kt-ic">${KT.newChat}</span><span class="kt-ic">${KT.gear}</span></div>
        <div class="kt-chips"><b>전체</b><span>안읽음 <i>289</i></span><span>ChatGPT</span><span>통화</span><span>즐겨찾기</span></div>
        <div class="kt-scroll">
          <div class="kt-ad"><small>AD</small><strong>찬 바람 불면 우울한가요?</strong><span>계절성 우울증인지 확인하기</span></div>
          <div class="kt-list">
            ${state.messages.map((chat) => { const n = unreadMap[chat.id] || 0, gc = ktGroupCount[chat.id]; return `<button class="kt-item" data-kakao-chat="${chat.id}">${kakaoAvatar(chat).replace("kakao-avatar-img", "kt-avatar big")}<span class="kt-item-main"><span class="kt-item-name"><strong>${escapeHTML(chat.name)}</strong>${gc ? `<em>${gc}</em>` : ""}</span><span class="kt-item-prev">${escapeHTML(chat.preview)}</span></span><span class="kt-item-meta"><time>${escapeHTML(ktLastTime(chat))}</time>${n ? `<i>${n}</i>` : ""}</span></button>`; }).join("")}
          </div>
        </div>
        <nav class="kt-tabs">
          <span class="kt-tab" aria-label="친구">${KT.tabFriends}</span>
          <span class="kt-tab sel" aria-label="채팅">${KT.tabChat}<i>99+</i></span>
          <span class="kt-tab" aria-label="오픈채팅">${KT.tabOpen}</span>
          <span class="kt-tab" aria-label="쇼핑">${KT.tabShop}</span>
          <span class="kt-tab" aria-label="더보기">${KT.tabMore}</span>
        </nav>
      </div>`;
    content.querySelectorAll("[data-kakao-chat]").forEach((button) => button.addEventListener("click", () => { if (!["seobin", "uyeon"].includes(button.dataset.kakaoChat)) return; state.activeChat = button.dataset.kakaoChat; renderKakao(); }));
  }

  // Instagram 아이콘 세트 (모든 아이콘을 같은 선 굵기/스타일로 통일)
  const igSvg = (inner, cls = "") => `<svg class="ig-ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
  const IG_HEART = "M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z";
  const IG_HOME = "M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z";
  const IG_SQUARE = "M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.703 2 8.552Z";
  const IG = {
    heart: igSvg(`<path d="${IG_HEART}"/>`),
    heartFill: igSvg(`<path d="${IG_HEART}"/>`, "red"),
    comment: igSvg('<path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"/>'),
    send: igSvg('<line x1="22" y1="3" x2="9.218" y2="10.083"/><polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"/>'),
    sendFill: igSvg('<line x1="22" y1="3" x2="9.218" y2="10.083"/><polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"/>', "fill"),
    save: igSvg('<polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21"/>'),
    saveFill: igSvg('<polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21"/>', "fill"),
    home: igSvg(`<path d="${IG_HOME}"/>`),
    homeFill: igSvg(`<path d="${IG_HOME}"/>`, "fill"),
    reels: igSvg('<line x1="2.049" y1="7.002" x2="21.95" y2="7.002"/><line x1="13.504" y1="2.001" x2="16.362" y2="7.002"/><line x1="7.207" y1="2.11" x2="10.002" y2="7.002"/><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"/><path class="pf" d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"/>'),
    search: igSvg('<path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"/><line x1="16.511" y1="16.511" x2="22" y2="22"/>'),
    plus: igSvg(`<path d="${IG_SQUARE}"/><line x1="6.545" y1="12.001" x2="17.455" y2="12.001"/><line x1="12.003" y1="6.545" x2="12.003" y2="17.455"/>`),
    more: igSvg('<circle class="pf" cx="12" cy="12" r="1.5"/><circle class="pf" cx="6" cy="12" r="1.5"/><circle class="pf" cx="18" cy="12" r="1.5"/>', "thin"),
    back: igSvg('<path d="M15.500 4.500 8 12l7.500 7.500"/>'),
    chevDown: igSvg('<path d="m6 9.500 6 6 6-6"/>', "sm"),
    compose: igSvg('<path d="M12.202 3.203H5.250a3 3 0 0 0-3 3V18.750a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"/><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"/><line x1="16.848" y1="3.924" x2="20.076" y2="7.153"/>'),
    camera: igSvg('<path d="M4 8.500A2.500 2.500 0 0 1 6.500 6h1.200l1.100-1.800A1.500 1.500 0 0 1 10.100 3.500h3.800a1.500 1.500 0 0 1 1.300.700L16.300 6h1.200A2.500 2.500 0 0 1 20 8.500v8a2.500 2.500 0 0 1-2.500 2.500h-11A2.500 2.500 0 0 1 4 16.500Z"/><circle cx="12" cy="12.500" r="3.500"/>'),
    call: igSvg('<path d="M5.500 3.500h3l1.500 4-2 1.500a11 11 0 0 0 5.500 5.500l1.500-2 4 1.500v3a2 2 0 0 1-2 2A15.500 15.500 0 0 1 3.500 5.500a2 2 0 0 1 2-2Z"/>'),
    video: igSvg('<rect x="2.500" y="6" width="13" height="12" rx="3"/><path d="m15.500 10.500 5-2.500v8l-5-2.500"/>'),
    mic: igSvg('<rect x="9" y="2.500" width="6" height="11" rx="3"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3.500"/>'),
    image: igSvg('<rect x="3" y="3" width="18" height="18" rx="3.500"/><circle cx="9" cy="9" r="1.800"/><path d="m3.500 17 4.500-4.500 3.500 3.500 3-3 6 5"/>'),
    sticker: igSvg('<path d="M20.500 12A8.500 8.500 0 1 1 12 3.500h3.500A5 5 0 0 1 20.500 8.500Z"/><path d="M20.500 12H18a3 3 0 0 0-3 3v5"/><circle class="pf" cx="9" cy="11" r="1"/><circle class="pf" cx="13" cy="11" r="1"/><path d="M8.800 14.800q1.500 1.500 3.200 1"/>'),
    miniPlus: igSvg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', "mini")
  };
  const igDmSent = [];
  function renderInstagram() {
    const content = $("#app-content");
    $("#app-screen").classList.remove("kakao-mode", "kakao-on", "kakao-room");
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
    const dmAll = dmConversation.concat(igDmSent);
    const screen = $("#app-screen");
    screen.classList.add("ig-mode");
    const tabs = (active) => `<nav class="igx-tabs">
      <button type="button" data-ig-nav="feed" aria-label="홈">${active === "feed" ? IG.homeFill : IG.home}</button>
      <button type="button" aria-label="릴스">${IG.reels}</button>
      <button type="button" data-ig-nav="dm" aria-label="메시지" class="igx-dm-tab">${active === "dm" ? IG.sendFill : IG.send}<b>1</b></button>
      <button type="button" aria-label="검색">${IG.search}</button>
      <button type="button" aria-label="프로필"><img class="igx-me${active === "me" ? " on" : ""}" src="avatar-default.jpg" alt=""></button>
    </nav>`;
    const bindNav = () => content.querySelectorAll("[data-ig-nav]").forEach(b => b.addEventListener("click", () => { state.instagramScreen = b.dataset.igNav; renderInstagram(); }));
    const personAvatar = (src, cls = "") => `<img class="igx-av ${cls}" src="${src}" alt="">`;
    if (state.instagramScreen === "dm-chat") {
      content.innerHTML = `<div class="igx-app"><div class="igx-chat">
        <div class="igx-chat-top"><button type="button" class="igx-ic-btn" id="ig-chat-back" aria-label="뒤로">${IG.back}</button>${personAvatar("instagram-seobin.jpg", "s36")}<div class="igx-chat-name"><strong>서빈</strong><small>seo_BBini</small></div><span class="igx-chat-actions"><button type="button" class="igx-ic-btn" aria-label="음성 통화">${IG.call}</button><button type="button" class="igx-ic-btn" aria-label="영상 통화">${IG.video}</button></span></div>
        <div class="ig-dm-history" id="ig-dm-history"><div class="ig-dm-profile-intro">${seobinAvatar}<strong>서빈</strong><span>seo_BBini · Instagram</span><small>서로 팔로우 중</small></div><div class="ig-dm-date">2024년 7월 12일 오전 4:00</div>${dmAll.map(([from,text],i)=>`<div class="ig-dm-line ${from} ${from === "incoming" && i > 0 && dmAll[i-1][0] === "incoming" ? "ig-dm-continuation" : ""}">${from === "incoming" && (i === 0 || dmAll[i-1][0] !== "incoming") ? seobinAvatar : from === "incoming" ? '<span class="ig-dm-avatar-spacer" aria-hidden="true"></span>' : ""}<div class="ig-dm-bubble ${from}">${escapeHTML(text)}</div></div>`).join("")}</div>
        <form class="igx-compose" id="ig-dm-form"><span class="igx-cam" aria-hidden="true">${IG.camera}</span><input id="ig-dm-input" placeholder="메시지 보내기..." maxlength="300" autocomplete="off"><span class="igx-compose-icons" id="ig-compose-icons">${IG.mic}${IG.image}${IG.sticker}</span><button type="submit" class="igx-send-text" id="ig-send-text">보내기</button></form>
      </div></div>`;
      const history = $("#ig-dm-history"); history.scrollTop = history.scrollHeight;
      $("#ig-chat-back").addEventListener("click", () => { state.instagramScreen = "dm"; renderInstagram(); });
      const input = $("#ig-dm-input"), form = $("#ig-dm-form");
      input.addEventListener("input", () => form.classList.toggle("typing", !!input.value.trim()));
      form.addEventListener("submit", e => { e.preventDefault(); const v = input.value.trim(); if (!v) return; igDmSent.push(["outgoing", v]); const line=document.createElement("div"); line.className="ig-dm-line outgoing"; const bubble=document.createElement("div"); bubble.className="ig-dm-bubble outgoing"; bubble.textContent=v; line.appendChild(bubble); history.appendChild(line); input.value=""; form.classList.remove("typing"); history.scrollTop=history.scrollHeight; });
      return;
    }
    if (state.instagramScreen === "dm") {
      content.innerHTML = `<div class="igx-app"><div class="igx-body">
        <div class="igx-dm-top"><button type="button" class="igx-ic-btn" data-ig-nav="feed" aria-label="뒤로">${IG.back}</button><div class="igx-dm-account">sihye0n_an ${IG.chevDown}</div><button type="button" class="igx-ic-btn" aria-label="새 메시지">${IG.compose}</button></div>
        <label class="igx-search">${IG.search}<input placeholder="검색" autocomplete="off"></label>
        <div class="igx-dm-title"><strong>메시지</strong><span>요청</span></div>
        <div class="igx-dm-list">${dmItems.map(x=>`<button type="button" class="igx-dm-row" data-dm="${x.name}">${x.avatar.replace('ig-avatar-photo','igx-av s56')}<span class="igx-dm-text"><strong>${x.name}</strong><small>${x.preview} · ${x.time}</small></span><span class="igx-dm-cam">${IG.camera}</span></button>`).join("")}</div>
      </div>${tabs("dm")}</div>`;
      content.querySelectorAll("[data-dm]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.dm !== "서빈") return; state.instagramScreen="dm-chat";renderInstagram();}));
      bindNav(); return;
    }
    const stories = [["내 스토리","avatar-default.jpg",true],["seo_BBini","instagram-seobin.jpg"]];
    content.innerHTML = `<div class="igx-app"><div class="igx-body">
      <div class="igx-top"><button type="button" class="igx-ic-btn" aria-label="만들기">${IG.plus}</button><strong class="igx-logo">Instagram</strong><button type="button" class="igx-ic-btn" aria-label="알림">${IG.heart}</button></div>
      <div class="igx-stories">${stories.map(([n,src,mine]) => `<div class="igx-story"><span class="igx-ring${mine ? " mine" : ""}"><img src="${src}" alt="">${mine ? `<i>${IG.miniPlus}</i>` : ""}</span><small>${n}</small></div>`).join("")}</div>
      <article class="igx-post">
        <div class="igx-post-head"><img class="igx-av s32" src="TVING.jpg" alt="tvN 드라마 프로필"><div><strong>tvn_drama</strong><small>광고</small></div><button type="button" class="igx-ic-btn" aria-label="더 보기">${IG.more}</button></div>
        <div class="ig-drama-ad ig-actor-photo"><img class="ig-blurred-bg" src="actor-feed.jpg" alt="청춘 실종 사건 드라마 홍보 이미지"><div class="ig-promo-overlay"><span>tvN 새 드라마</span><strong>청춘 실종 사건</strong><b>배우 안시현<br>남자 주인공 캐스팅</b><small>COMING SOON · 2026</small></div></div>
        <div class="igx-actions"><button type="button" data-like="drama" aria-label="좋아요">${IG.heart}<span id="ig-likes">2.4만</span></button><button type="button" data-comment="drama" aria-label="댓글">${IG.comment}<span>318</span></button><button type="button" data-share="drama" aria-label="공유">${IG.send}<span>1,203</span></button><button type="button" class="igx-save" data-save="drama" aria-label="저장">${IG.save}</button></div>
        <div class="igx-copy"><p><strong>tvn_drama</strong> 배우 안시현, 드라마 '청춘 실종 사건' 남자 주인공으로 캐스팅 🎬<br>올겨울, 청춘의 비밀을 추적할 새로운 얼굴을 만나보세요.<br><span class="ig-hashtags">#안시현 #청춘실종사건 #캐스팅 #tvN드라마</span></p><p class="ig-comments">댓글 318개 모두 보기</p><small>2시간 전 · 광고</small></div>
      </article></div>${tabs("feed")}</div>`;
    content.querySelectorAll("[data-like]").forEach(button=>button.addEventListener("click",()=>{const on=button.classList.toggle("liked");button.querySelector("svg").outerHTML=on?IG.heartFill:IG.heart;}));
    content.querySelectorAll("[data-save]").forEach(button=>button.addEventListener("click",()=>{const on=button.classList.toggle("saved");button.querySelector("svg").outerHTML=on?IG.saveFill:IG.save;}));
    content.querySelectorAll("[data-comment]").forEach(button=>button.addEventListener("click",()=>showToast("댓글 기능은 다음 단계에서 추가할 수 있어요.")));
    content.querySelectorAll("[data-share]").forEach(button=>button.addEventListener("click",()=>showToast("공유는 데모에서 지원하지 않아요.")));
    bindNav();
  }

  const photoFavs = new Set();
  // 2024년 8월 12일부터 순차적으로 저장된 사진 (id 1이 가장 오래된 사진)
  const PHOTO_STAMPS = [
    ["2024년 8월 12일","오후 3:42"],["2024년 8월 12일","오후 7:18"],["2024년 8월 14일","오전 11:05"],
    ["2024년 8월 17일","오후 2:27"],["2024년 8월 19일","오후 9:03"],["2024년 8월 23일","오전 8:51"],
    ["2024년 8월 26일","오후 5:36"],["2024년 8월 31일","오후 1:14"],["2024년 9월 3일","오후 10:22"],
    ["2024년 9월 7일","오후 4:09"],["2024년 9월 9일","오전 9:47"],["2024년 9월 14일","오전 1:08"],
    ["2024년 9월 15일","오후 6:31"],["2024년 9월 20일","오후 5:10"],["2024년 9월 24일","오후 12:38"],
    ["2024년 9월 28일","오후 8:55"],["2024년 10월 2일","오전 10:16"],["2024년 10월 6일","오후 3:24"],
    ["2024년 10월 11일","오후 11:02"]
  ];
  const photoDateLabel = (id) => PHOTO_STAMPS[id - 1][0];
  const photoTimeLabel = (id) => PHOTO_STAMPS[id - 1][1];
  const PHOTO_ICON = {
    back: '<svg viewBox="0 0 24 24"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 14.5V3.5M8.2 7.2 12 3.5l3.8 3.7M7 10H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.3s-7.6-4.6-9.2-9.5C1.7 7.4 3.6 4.4 6.8 4.4c2 0 3.6 1.1 5.2 3.1 1.6-2 3.2-3.1 5.2-3.1 3.2 0 5.1 3 4 6.4-1.6 4.9-9.2 9.5-9.2 9.5z"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.2"/><circle cx="12" cy="7.8" r=".5" fill="currentColor"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.8 12.5h9.4L17.5 7M10 11v5.5M14 11v5.5"/></svg>'
  };
  function renderPhotos() {
    const content = $("#app-content");
    const screen = $("#app-screen");
    screen.classList.add("photos-mode");
    screen.classList.toggle("photo-viewing", !!state.activePhoto);
    $("#app-title").textContent = "사진";
    $("#header-action").textContent = "";
    const galleryPhotos = Array.from({length:19}, (_,i) => ({id:i+1, src:`photo-${String(i+1).padStart(2,"0")}.jpg`, title:`사진 ${i+1}`, date:photoDateLabel(i+1)}));
    if (state.activePhoto) {
      let cur = Math.max(0, galleryPhotos.findIndex(p => p.id === state.activePhoto));
      content.innerHTML = `<div class="photo-viewer" id="photo-viewer">
        <div class="photo-track" id="photo-track">${galleryPhotos.map(p => `<div class="photo-slide"><img src="${p.src}" alt="${p.title}" draggable="false"></div>`).join("")}</div>
        <div class="photo-top photo-chrome">
          <button type="button" class="photo-circle-btn" id="photo-back" aria-label="보관함">${PHOTO_ICON.back}</button>
          <div class="photo-title"><strong id="photo-title-date"></strong><span id="photo-title-time"></span></div>
          <button type="button" class="photo-circle-btn" id="photo-more" aria-label="더 보기">${PHOTO_ICON.more}</button>
        </div>
        <div class="photo-bottom photo-chrome">
          <div class="photo-strip" id="photo-strip">${galleryPhotos.map((p, i) => `<button type="button" class="photo-strip-item" data-strip="${i}" aria-label="사진 ${i + 1}"><img src="${p.src}" alt="" draggable="false"></button>`).join("")}</div>
          <div class="photo-toolbar">
            <button type="button" id="photo-share" aria-label="공유">${PHOTO_ICON.share}</button>
            <button type="button" id="photo-fav" aria-label="즐겨찾기">${PHOTO_ICON.heart}</button>
            <button type="button" id="photo-info" aria-label="정보">${PHOTO_ICON.info}</button>
            <button type="button" id="photo-trash" aria-label="삭제">${PHOTO_ICON.trash}</button>
          </div>
        </div>
      </div>`;
      const viewer = $("#photo-viewer"), track = $("#photo-track"), strip = $("#photo-strip");
      const updateMeta = () => {
        const p = galleryPhotos[cur];
        state.activePhoto = p.id;
        $("#photo-title-date").textContent = p.date;
        $("#photo-title-time").textContent = photoTimeLabel(p.id);
        $("#photo-fav").classList.toggle("on", photoFavs.has(p.id));
        strip.querySelectorAll(".photo-strip-item").forEach((el, i) => el.classList.toggle("current", i === cur));
        const el = strip.children[cur];
        strip.scrollLeft = el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
      };
      updateMeta();
      track.scrollLeft = cur * track.clientWidth;
      track.addEventListener("scroll", () => {
        const i = Math.max(0, Math.min(galleryPhotos.length - 1, Math.round(track.scrollLeft / (track.clientWidth || 1))));
        if (i !== cur) { cur = i; updateMeta(); }
      });
      // 마우스 드래그로도 넘길 수 있게 (터치는 기본 스크롤 스냅 사용)
      let dragX = null, startLeft = 0, moved = false;
      track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; dragX = e.clientX; startLeft = track.scrollLeft; moved = false; track.style.scrollSnapType = "none"; });
      track.addEventListener("pointermove", e => { if (dragX === null) return; const dx = e.clientX - dragX; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = startLeft - dx; });
      const endDrag = () => { if (dragX === null) return; dragX = null; track.style.scrollSnapType = ""; const w = track.clientWidth; track.scrollTo({ left: Math.round(track.scrollLeft / w) * w, behavior: "smooth" }); };
      track.addEventListener("pointerup", endDrag); track.addEventListener("pointerleave", endDrag); track.addEventListener("pointercancel", endDrag);
      track.addEventListener("click", () => { if (moved) { moved = false; return; } viewer.classList.toggle("fs"); });
      strip.querySelectorAll("[data-strip]").forEach(b => b.addEventListener("click", () => track.scrollTo({ left: Number(b.dataset.strip) * track.clientWidth, behavior: "smooth" })));
      $("#photo-back").addEventListener("click", () => { state.activePhoto = null; renderPhotos(); });
      $("#photo-more").addEventListener("click", () => showToast("사진 옵션"));
      $("#photo-share").addEventListener("click", () => showToast("공유는 데모에서 지원하지 않아요."));
      $("#photo-info").addEventListener("click", () => showToast("사진 정보"));
      $("#photo-trash").addEventListener("click", () => showToast("삭제는 데모에서 지원하지 않아요."));
      $("#photo-fav").addEventListener("click", () => { const id = galleryPhotos[cur].id; if (photoFavs.has(id)) photoFavs.delete(id); else photoFavs.add(id); updateMeta(); });
      return;
    }
    content.innerHTML = `<div class="photos-library"><div class="photos-library-heading"><div><h2>보관함</h2><strong>711개의 항목</strong></div><div class="photos-heading-actions"><button aria-label="정렬" id="photos-filter">☰</button><button id="photos-select">선택</button></div></div><div class="photos-grid">${galleryPhotos.map(p=>`<button class="photos-image-tile${photoFavs.has(p.id) ? " fav" : ""}" data-photo="${p.id}" aria-label="${p.title}"><img src="${p.src}" loading="lazy" alt="${p.title}"></button>`).join("")}</div><div class="photos-bottom-tabs"><button class="photos-tab active" data-photos-tab="library"><span>▧</span>보관함</button><button class="photos-tab" data-photos-tab="albums"><span>▤</span>모음</button><button class="photos-search" aria-label="검색">⌕</button></div></div>`;
    content.querySelectorAll("[data-photo]").forEach(button=>button.addEventListener("click",()=>{state.activePhoto=Number(button.dataset.photo);renderPhotos();}));
    content.querySelectorAll("[data-photos-tab]").forEach(button=>button.addEventListener("click",()=>{if(button.dataset.photosTab==="albums"){showToast("모음 화면은 다음 단계에서 추가할 수 있어요.");}else showToast("보관함");}));
    $("#photos-select").addEventListener("click",()=>{const grid=content.querySelector(".photos-grid");grid.classList.toggle("photos-selecting");$("#photos-select").textContent=grid.classList.contains("photos-selecting")?"완료":"선택";});
    $("#photos-filter").addEventListener("click",()=>showToast("최근 항목 · 최신순"));
  }

  // ===== 전화 앱 (최근 통화 / 연락처 / 키패드 ...) =====
  const CONTACTS = [
    {name:"서빈 형", phone:"010-3821-7745", photo:"avatar-seobin.jpg", fav:true},
    {name:"우연 형", phone:"010-4417-2086", photo:"avatar-uyeon.jpg", fav:true, note:"매니저"},
    {name:"엄마", phone:"010-9264-1103", fav:true},
    {name:"아빠", phone:"010-9264-1108", fav:true},
    {name:"할머니", phone:"010-5530-8841"},
    {name:"김도윤 감독님", phone:"010-2748-6392", note:"<청춘 실종 사건> 감독"},
    {name:"강하늘 선배님", phone:"010-7391-5520", note:"선배 배우"},
    {name:"박서진 선배님", phone:"010-6205-4417", note:"선배 배우"},
    {name:"고은채", phone:"010-3358-9071", note:"동료 배우"},
    {name:"한지훈", phone:"010-8842-1356", note:"동료 배우"},
    {name:"지훈이", phone:"010-5126-7739", note:"동료 배우", fav:true},
    {name:"나유진", phone:"010-2093-6648", note:"동료 배우"},
    {name:"동기 재현", phone:"010-7714-2205", note:"연기과 동기"},
    {name:"소속사 대표님", phone:"010-4650-3187", note:"소속사"},
    {name:"소속사 홍보팀", phone:"02-6021-4410", note:"소속사"},
    {name:"매니지먼트 팀장님", phone:"010-3067-8294", note:"소속사"},
    {name:"수연 실장님", phone:"010-9183-5546", note:"스타일리스트"},
    {name:"은지 실장님", phone:"010-6672-0931", note:"헤어"},
    {name:"다은 실장님", phone:"010-5409-7823", note:"메이크업"},
    {name:"사진작가 도현", phone:"010-2281-4067", note:"화보 촬영"},
    {name:"조연출 박성민", phone:"010-8035-6912", note:"제작팀"},
    {name:"캐스팅 디렉터", phone:"010-4976-2358", note:"캐스팅"},
    {name:"드라마 제작사 PD님", phone:"02-3412-7750", note:"제작사"},
    {name:"방송국 작가님", phone:"010-7468-1624", note:"방송 작가"},
    {name:"광고대행사 윤 담당자", phone:"010-3590-8176", note:"광고"},
    {name:"브랜드 협찬 담당자", phone:"010-6841-2049", note:"협찬"},
    {name:"영화제 사무국", phone:"02-780-3300", note:"영화제"},
    {name:"세무 담당자", phone:"010-2714-9965", note:"세무"},
    {name:"Ryan 트레이너", phone:"010-9507-3318", note:"헬스"},
    {name:"Jenny 어학원", phone:"02-515-4472", note:"영어 회화"}
  ];
  const CALLABLE = ["서빈 형", "우연 형"]; // 이 두 사람에게만 전화가 연결됨
  const STALKER = ["010-4827-3391", "010-2095-7746", "010-6613-0584"];
  // kind: out(발신) / in(수신) / missed(부재중). who: 연락처 이름 또는 번호. count: 연속 통화 수
  const RECENT_CALLS = [
    {who:STALKER[0], kind:"missed", count:7, time:"오후 9:47", day:"오늘", dur:null},
    {who:"서빈 형", kind:"in", time:"오후 8:52", day:"오늘", dur:"12분 8초"},
    {who:"발신자 표시 제한", kind:"missed", count:3, time:"오후 7:15", day:"오늘", dur:null},
    {who:"우연 형", kind:"out", time:"오후 6:30", day:"오늘", dur:"3분 41초"},
    {who:STALKER[1], kind:"missed", count:4, time:"오후 4:22", day:"오늘", dur:null},
    {who:"엄마", kind:"in", time:"오후 12:08", day:"오늘", dur:"5분 19초"},
    {who:STALKER[0], kind:"missed", count:5, time:"오후 11:36", day:"어제", dur:null},
    {who:"서빈 형", kind:"out", time:"오후 10:14", day:"어제", dur:"47분 2초"},
    {who:"우연 형", kind:"in", time:"오후 6:02", day:"어제", dur:"1분 55초"},
    {who:STALKER[2], kind:"missed", count:2, time:"오후 2:40", day:"어제", dur:null},
    {who:"김도윤 감독님", kind:"in", time:"오전 9:30", day:"어제", dur:"4분 12초"},
    {who:"우연 형", kind:"missed", time:"오후 8:20", day:"일요일", dur:null},
    {who:STALKER[0], kind:"missed", count:9, time:"오후 3:51", day:"일요일", dur:null},
    {who:"수연 실장님", kind:"in", time:"오후 1:15", day:"일요일", dur:"2분 30초"},
    {who:"서빈 형", kind:"in", time:"오전 1:26", day:"토요일", dur:"1시간 3분"},
    {who:"아빠", kind:"missed", time:"오후 7:03", day:"토요일", dur:null},
    {who:"발신자 표시 제한", kind:"missed", count:6, time:"오후 5:48", day:"금요일", dur:null},
    {who:"소속사 대표님", kind:"in", time:"오후 4:10", day:"금요일", dur:"8분 21초"},
    {who:"고은채", kind:"out", time:"오후 12:44", day:"금요일", dur:"6분 3초"},
    {who:STALKER[1], kind:"missed", count:11, time:"오전 3:12", day:"목요일", dur:null}
  ];
  const phoneState = { tab:"recents", filter:"all", detail:null, query:"", dialed:"", calling:null };
  const contactByName = (n) => CONTACTS.find(c => c.name === n);
  const hangulInitials = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const hangulBase = ["ㄱ","ㄱ","ㄴ","ㄷ","ㄷ","ㄹ","ㅁ","ㅂ","ㅂ","ㅅ","ㅅ","ㅇ","ㅈ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  function contactSection(name) {
    const ch = name.trim().charAt(0), code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return hangulBase[Math.floor((code - 0xAC00) / 588)];
    if (/[A-Za-z]/.test(ch)) return ch.toUpperCase();
    return "#";
  }
  const sectionOrder = [...new Set(hangulBase), ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];
  const PH_ICON = {
    star:'<svg viewBox="0 0 24 24"><path d="m12 3.6 2.4 5.1 5.6.7-4.1 3.9 1.1 5.5-5-2.8-5 2.8 1.1-5.5L4 9.4l5.6-.7z"/></svg>',
    clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.4l3.6 2"/></svg>',
    person:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8.6" r="3.8"/><path d="M4.6 20c.6-4 3.5-6 7.4-6s6.8 2 7.4 6"/></svg>',
    keypad:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="6" cy="5" r="1.7"/><circle cx="12" cy="5" r="1.7"/><circle cx="18" cy="5" r="1.7"/><circle cx="6" cy="11" r="1.7"/><circle cx="12" cy="11" r="1.7"/><circle cx="18" cy="11" r="1.7"/><circle cx="6" cy="17" r="1.7"/><circle cx="12" cy="17" r="1.7"/><circle cx="18" cy="17" r="1.7"/><circle cx="12" cy="22" r="1.7"/></svg>',
    vm:'<svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="3.6"/><circle cx="17" cy="12" r="3.6"/><path d="M7 15.6h10"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6.6 3.5 9 3c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .8-.3 1.1L9.3 9.4c1 2.1 2.7 3.9 4.9 5l1.3-1.3c.3-.3.7-.4 1.1-.3l3.2.8c.5.1.8.5.8 1l-.5 2.4c-.1.7-.7 1.2-1.4 1.2C11.5 18.2 5.8 12.500 5.400 4.900c0-.7.5-1.300 1.200-1.400z"/></svg>',
    out:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6.6 3.5 9 3c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .8-.3 1.1L9.3 9.4c1 2.1 2.7 3.9 4.9 5l1.3-1.3c.3-.3.7-.4 1.1-.3l3.2.8c.5.1.8.5.8 1l-.5 2.4c-.1.7-.7 1.2-1.4 1.2C11.5 18.2 5.8 12.500 5.400 4.900c0-.7.5-1.300 1.200-1.400z"/></svg>',
    msg:'<svg viewBox="0 0 24 24"><path d="M5 5.5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-7l-4.500 3.500V17H5a2 2 0 0 1-2-2V7.500a2 2 0 0 1 2-2z"/></svg>',
    video:'<svg viewBox="0 0 24 24"><rect x="3" y="6.500" width="12.500" height="11" rx="2.500"/><path d="m15.500 10.500 5.500-3v9l-5.500-3z"/></svg>',
    mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5.500" width="18" height="13" rx="2.500"/><path d="m3.500 7.500 8.500 6 8.500-6"/></svg>',
    search:'<svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="m15.500 15.500 5 5"/></svg>',
    plus:'<svg viewBox="0 0 24 24"><path d="M12 4.500v15M4.500 12h15"/></svg>',
    del:'<svg viewBox="0 0 24 24"><path d="M9 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-6-6z"/><path d="m12.500 9.500 5 5m0-5-5 5"/></svg>'
  };
  const PH_COLORS = ["#8e9aa8","#a1a3b0","#9aa5a0","#b0a496","#9a97b0","#a8999f"];
  function phAvatar(name, big) {
    const c = contactByName(name);
    const cls = "ph-avatar" + (big ? " big" : "");
    if (c && c.photo) return `<span class="${cls}"><img src="${c.photo}" alt=""></span>`;
    if (!c) return `<span class="${cls} unknown">${PH_ICON.person}</span>`;
    const idx = [...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % PH_COLORS.length;
    return `<span class="${cls}" style="background:linear-gradient(#b8bdc7,${PH_COLORS[idx]})">${escapeHTML(name.replace(/^[^가-힣A-Za-z]+/, "").charAt(0))}</span>`;
  }
  const phoneOf = (who) => (contactByName(who) ? contactByName(who).phone : /^[0-9-]+$/.test(who) ? who : "");

  function startCall(name) {
    phoneState.calling = name; phoneState.callSecs = -1;
    const overlay = document.createElement("section");
    overlay.className = "call-overlay"; overlay.id = "call-overlay";
    overlay.innerHTML = `<div class="call-top">${phAvatar(name, true)}<h2>${escapeHTML(contactByName(name)?.name || name)}</h2><p id="call-status">전화 거는 중...</p></div>
      <div class="call-grid">${[["mute","소리 끔"],["keypad","키패드"],["speaker","스피커"],["add","통화 추가"],["video","FaceTime"],["contacts","연락처"]].map(([k,l]) => `<button type="button"><i></i><span>${l}</span></button>`).join("")}</div>
      <button type="button" class="call-end" id="call-end" aria-label="통화 종료">${PH_ICON.phone}</button>`;
    $(".screen").appendChild(overlay);
    const canConnect = CALLABLE.includes(contactByName(name)?.name);
    const status = () => $("#call-status");
    const timers = [];
    const close = () => { timers.forEach(clearTimeout); overlay.remove(); phoneState.calling = null; };
    if (canConnect) {
      timers.push(setTimeout(() => { if (status()) status().textContent = "연결 중..."; }, 1600));
    } else {
      // 서빈 형, 우연 형 외에는 연결되지 않음
      timers.push(setTimeout(() => { if (status()) status().textContent = "통화 실패"; overlay.classList.add("failed"); }, 1800));
      timers.push(setTimeout(close, 3200));
    }
    $("#call-end").addEventListener("click", close);
  }

  function renderCalls() {
    const content = $("#app-content");
    const screen = $("#app-screen");
    screen.classList.add("phone-mode");
    $("#app-title").textContent = "전화";
    $("#header-action").textContent = "";
    const d = phoneState.detail;
    const tabs = [["favorites","즐겨찾기","star"],["recents","최근 통화","clock"],["contacts","연락처","person"],["keypad","키패드","keypad"],["voicemail","음성 사서함","vm"]];
    let body = "";
    if (d) body = phoneDetailHTML(d);
    else if (phoneState.tab === "favorites") body = phoneFavoritesHTML();
    else if (phoneState.tab === "recents") body = phoneRecentsHTML();
    else if (phoneState.tab === "contacts") body = phoneContactsHTML();
    else if (phoneState.tab === "keypad") body = phoneKeypadHTML();
    else body = phoneVoicemailHTML();
    const missedCount = RECENT_CALLS.filter(c => c.kind === "missed" && c.day === "오늘").length;
    content.innerHTML = `<div class="ph-app">
      <div class="ph-body" id="ph-body">${body}</div>
      ${!d && phoneState.tab === "contacts" ? `<div class="ph-index">${(phoneState.letters || []).map(k => `<button type="button" data-ph-jump="${k}">${k}</button>`).join("")}</div>` : ""}
      ${d ? "" : `<nav class="ph-tabs">${tabs.map(([k,l,ic]) => `<button type="button" class="ph-tab${phoneState.tab === k ? " active" : ""}" data-ph-tab="${k}"><span class="ph-tab-ic">${PH_ICON[ic]}${k === "recents" && missedCount ? `<b>${missedCount}</b>` : ""}</span>${l}</button>`).join("")}</nav>`}
    </div>`;
    bindPhone(content);
  }

  function phoneRecentsHTML() {
    const list = RECENT_CALLS.map((c, i) => ({...c, i})).filter(c => phoneState.filter === "all" || c.kind === "missed");
    return `<div class="ph-nav"><button type="button" class="ph-link" id="ph-edit">편집</button>
        <div class="ph-seg" role="tablist"><button type="button" class="${phoneState.filter === "all" ? "on" : ""}" data-ph-filter="all">전체</button><button type="button" class="${phoneState.filter === "missed" ? "on" : ""}" data-ph-filter="missed">부재중</button></div><span></span></div>
      <h2 class="ph-large">최근 통화</h2>
      <div class="ph-list">${list.map(c => {
        const contact = contactByName(c.who);
        const name = contact ? contact.name : c.who;
        const sub = contact ? "휴대전화" : (c.who === "발신자 표시 제한" ? "알 수 없음" : "휴대전화 · 대한민국");
        const ic = c.kind === "out" ? `<i class="ph-out">${PH_ICON.out}</i>` : "";
        return `<div class="ph-row${c.kind === "missed" ? " missed" : ""}" data-ph-call="${c.i}"><div class="ph-row-main"><strong>${escapeHTML(name)}${c.count ? ` <em>(${c.count})</em>` : ""}</strong><span>${ic}${sub}</span></div><time>${c.day === "오늘" ? c.time : c.day}</time><button type="button" class="ph-info" data-ph-info="${c.i}" aria-label="상세 정보">ⓘ</button></div>`;
      }).join("")}${list.length ? "" : '<div class="ph-empty">부재중 전화가 없습니다.</div>'}</div>`;
  }

  function phoneFavoritesHTML() {
    const favs = CONTACTS.filter(c => c.fav);
    return `<div class="ph-nav"><button type="button" class="ph-link">편집</button><span></span><button type="button" class="ph-link ph-plus" aria-label="추가">${PH_ICON.plus}</button></div>
      <h2 class="ph-large">즐겨찾기</h2>
      <div class="ph-list">${favs.map(c => `<div class="ph-row ph-fav" data-ph-contact="${escapeHTML(c.name)}">${phAvatar(c.name)}<div class="ph-row-main"><strong>${escapeHTML(c.name)}</strong><span>휴대전화</span></div><button type="button" class="ph-info" data-ph-info-contact="${escapeHTML(c.name)}" aria-label="상세 정보">ⓘ</button></div>`).join("")}</div>`;
  }

  function phoneContactsHTML() {
    const q = phoneState.query.trim();
    const sorted = [...CONTACTS].filter(c => !q || c.name.includes(q) || c.phone.replace(/-/g, "").includes(q.replace(/-/g, "")))
      .sort((a, b) => { const sa = sectionOrder.indexOf(contactSection(a.name)), sb = sectionOrder.indexOf(contactSection(b.name)); return sa - sb || a.name.localeCompare(b.name, "ko"); });
    const groups = {}; sorted.forEach(c => (groups[contactSection(c.name)] ||= []).push(c));
    const letters = sectionOrder.filter(k => groups[k]); phoneState.letters = letters;
    return `<div class="ph-nav"><button type="button" class="ph-link">목록</button><span></span><button type="button" class="ph-link ph-plus" aria-label="연락처 추가">${PH_ICON.plus}</button></div>
      <h2 class="ph-large">연락처</h2>
      <label class="ph-search">${PH_ICON.search}<input id="ph-search" placeholder="검색" value="${escapeHTML(phoneState.query)}" autocomplete="off"></label>
      <div class="ph-me"><span class="ph-avatar" style="background:linear-gradient(#b8bdc7,#8e9aa8)">안</span><div><strong>안시현</strong><span>내 카드</span></div></div>
      <div class="ph-contacts-wrap"><div class="ph-contacts">${letters.map(k => `<div class="ph-group" id="ph-sec-${k}"><div class="ph-letter">${k}</div>${groups[k].map(c => CALLABLE.includes(c.name) ? `<button type="button" class="ph-contact" data-ph-contact="${escapeHTML(c.name)}">${escapeHTML(c.name)}</button>` : `<div class="ph-contact off">${escapeHTML(c.name)}</div>`).join("")}</div>`).join("")}${sorted.length ? `<div class="ph-count">${sorted.length}명의 연락처</div>` : '<div class="ph-empty">검색 결과 없음</div>'}</div>
</div>`;
  }

  function phoneKeypadHTML() {
    const keys = [["1",""],["2","ABC"],["3","DEF"],["4","GHI"],["5","JKL"],["6","MNO"],["7","PQRS"],["8","TUV"],["9","WXYZ"],["*",""],["0","+"],["#",""]];
    return `<div class="ph-keypad"><div class="ph-suggest" id="ph-suggest"></div>
      <div class="ph-dialed" id="ph-dialed">${escapeHTML(formatDial(phoneState.dialed))}</div>
      <div class="ph-keys">${keys.map(([k,l]) => `<button type="button" data-ph-key="${k}"><b>${k}</b><small>${l}</small></button>`).join("")}</div>
      <div class="ph-dial-actions"><span></span><button type="button" class="ph-dial-call" id="ph-dial-call" aria-label="통화">${PH_ICON.phone}</button><button type="button" class="ph-dial-del" id="ph-dial-del" aria-label="지우기">${PH_ICON.del}</button></div></div>`;
  }
  function formatDial(v) {
    if (/^010\d+$/.test(v)) { const m = v.match(/^(010)(\d{0,4})(\d{0,4})/); return [m[1], m[2], m[3]].filter(Boolean).join("-"); }
    return v;
  }

  function phoneVoicemailHTML() {
    return `<div class="ph-nav"><span></span><span></span><span></span></div><h2 class="ph-large">음성 사서함</h2>
      <div class="ph-vm-empty"><strong>음성 사서함 없음</strong><span>새로운 음성 메시지가 없습니다.</span></div>`;
  }

  function phoneDetailHTML(d) {
    const isCall = d.type === "call";
    const call = isCall ? RECENT_CALLS[d.index] : null;
    const who = isCall ? call.who : d.name;
    const contact = contactByName(who);
    const name = contact ? contact.name : who;
    const phone = phoneOf(who);
    const history = RECENT_CALLS.filter(c => c.who === who);
    const kindLabel = (c) => c.kind === "missed" ? "부재중 전화" : c.kind === "out" ? "발신 전화" : "수신 전화";
    return `<div class="ph-nav ph-detail-nav"><button type="button" class="ph-link ph-back" id="ph-detail-back">‹ ${isCall ? "최근 통화" : "연락처"}</button><span></span>${contact ? '<button type="button" class="ph-link">편집</button>' : "<span></span>"}</div>
      <div class="ph-detail-head">${phAvatar(who, true)}<h2>${escapeHTML(name)}</h2>${contact && contact.note ? `<p>${escapeHTML(contact.note)}</p>` : ""}</div>
      <div class="ph-actions">${[["msg","메시지"],["phone","음성"],["video","FaceTime"],["mail","이메일"]].map(([ic,l]) => `<button type="button" data-ph-action="${ic}">${ic === "phone" ? `<span>${PH_ICON.phone}</span>` : `<span>${PH_ICON[ic]}</span>`}${l}</button>`).join("")}</div>
      ${isCall || history.length ? `<div class="ph-card"><div class="ph-card-title">최근 통화</div>${(isCall ? [call] : history.slice(0, 5)).map(c => `<div class="ph-hist${c.kind === "missed" ? " missed" : ""}"><span>${c.day} ${c.time}</span><strong>${kindLabel(c)}</strong><small>${c.dur ? c.dur : ""}</small></div>`).join("")}</div>` : ""}
      <div class="ph-card"><div class="ph-card-title">휴대전화</div><div class="ph-phone-num">${escapeHTML(phone || "알 수 없음")}</div></div>
      ${!contact ? '<div class="ph-card ph-danger-card"><button type="button" class="ph-card-btn" data-ph-action="block">이 발신자 차단</button></div>' : ""}`;
  }

  function bindPhone(content) {
    content.querySelectorAll("[data-ph-tab]").forEach(b => b.addEventListener("click", () => { phoneState.tab = b.dataset.phTab; phoneState.detail = null; renderCalls(); }));
    content.querySelectorAll("[data-ph-filter]").forEach(b => b.addEventListener("click", () => { phoneState.filter = b.dataset.phFilter; renderCalls(); }));
    content.querySelectorAll("[data-ph-call]").forEach(r => r.addEventListener("click", (e) => {
      if (e.target.closest("[data-ph-info]")) return;
      const c = RECENT_CALLS[Number(r.dataset.phCall)]; startCall(contactByName(c.who)?.name || c.who);
    }));
    content.querySelectorAll("[data-ph-info]").forEach(b => b.addEventListener("click", () => { phoneState.detail = {type:"call", index:Number(b.dataset.phInfo)}; renderCalls(); }));
    content.querySelectorAll("[data-ph-info-contact]").forEach(b => b.addEventListener("click", (e) => { e.stopPropagation(); phoneState.detail = {type:"contact", name:b.dataset.phInfoContact}; renderCalls(); }));
    content.querySelectorAll("[data-ph-contact]").forEach(r => r.addEventListener("click", (e) => {
      if (e.target.closest("[data-ph-info-contact]")) return;
      const n = r.dataset.phContact;
      if (phoneState.tab === "favorites") { startCall(n); return; }
      phoneState.detail = {type:"contact", name:n}; renderCalls();
    }));
    const back = $("#ph-detail-back"); if (back) back.addEventListener("click", () => { phoneState.detail = null; renderCalls(); });
    content.querySelectorAll("[data-ph-action]").forEach(b => b.addEventListener("click", () => {
      const d = phoneState.detail, a = b.dataset.phAction;
      const who = d.type === "call" ? RECENT_CALLS[d.index].who : d.name;
      if (a === "phone") startCall(contactByName(who)?.name || who);
      else if (a === "block") showToast("데모에서는 차단할 수 없어요.");
      else showToast("데모에서는 지원하지 않아요.");
    }));
    const search = $("#ph-search");
    if (search) search.addEventListener("input", () => { phoneState.query = search.value; const pos = search.selectionStart; renderCalls(); const s2 = $("#ph-search"); s2.focus(); s2.setSelectionRange(pos, pos); });
    content.querySelectorAll("[data-ph-jump]").forEach(b => b.addEventListener("click", () => { const t = $("#ph-sec-" + b.dataset.phJump), body = $("#ph-body"); if (t && body) body.scrollTo({top: t.offsetTop - 4, behavior:"smooth"}); }));
    const dialed = $("#ph-dialed");
    if (dialed) {
      const sync = () => {
        dialed.textContent = formatDial(phoneState.dialed);
        const q = phoneState.dialed;
        const matches = q ? CONTACTS.filter(c => CALLABLE.includes(c.name) && c.phone.replace(/-/g, "").includes(q)) : [];
        const box = $("#ph-suggest");
        box.innerHTML = matches.map(c => `<button type="button" data-ph-suggest="${escapeHTML(c.name)}"><strong>${escapeHTML(c.name)}</strong><span>${escapeHTML(c.phone)}</span></button>`).join("");
        box.querySelectorAll("[data-ph-suggest]").forEach(b => b.addEventListener("click", () => { phoneState.dialed = contactByName(b.dataset.phSuggest).phone.replace(/-/g, ""); sync(); }));
        $("#ph-dial-del").style.visibility = phoneState.dialed ? "visible" : "hidden";
        dialed.classList.toggle("long", phoneState.dialed.length > 11);
      };
      sync();
      content.querySelectorAll("[data-ph-key]").forEach(b => b.addEventListener("click", () => { if (phoneState.dialed.length < 15) { phoneState.dialed += b.dataset.phKey; sync(); } }));
      $("#ph-dial-del").addEventListener("click", () => { phoneState.dialed = phoneState.dialed.slice(0, -1); sync(); });
      $("#ph-dial-call").addEventListener("click", () => { if (!phoneState.dialed) return; const m = CONTACTS.find(c => c.phone.replace(/-/g, "") === phoneState.dialed); startCall(m ? m.name : formatDial(phoneState.dialed)); });
    }
  }

  const NT_ICON = {
    compose: '<svg viewBox="0 0 24 24"><path d="M11 4.500H7a3 3 0 0 0-3 3v9.500a3 3 0 0 0 3 3h9.500a3 3 0 0 0 3-3V13"/><path d="m17.600 3.700 2.700 2.700L12 14.700 8.700 15.300l.6-3.300z"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="7.800" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="16.200" cy="12" r="1" fill="currentColor" stroke="none"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="m15 4.500-7.500 7.500 7.500 7.500"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.300"/><path d="m15.400 15.400 5 5"/></svg>'
  };
  const ntTime = (t) => new Date(t).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit", hour12: true });
  function renderNotes() {
    const content = $("#app-content");
    $("#app-title").textContent = "메모";
    $("#header-action").textContent = "";
    if (state.activeNote !== null) {
      const note = state.activeNote === "new" ? { title: "", body: "" } : state.notes.find((item) => item.id === state.activeNote);
      content.innerHTML = `
        <div class="nt-screen">
          <div class="nt-nav"><button type="button" class="nt-link" id="nt-back">${NT_ICON.back}메모</button><button type="button" class="nt-link bold" id="save-note">완료</button></div>
          <div class="nt-editor">
            <input class="nt-title" id="note-title" maxlength="100" placeholder="제목" value="${escapeHTML(note.title)}" aria-label="메모 제목">
            <textarea class="nt-body" id="note-body" maxlength="10000" placeholder="" aria-label="메모 내용">${escapeHTML(note.body)}</textarea>
          </div>
        </div>`;
      const save = () => {
        const title = $("#note-title").value.trim(), body = $("#note-body").value;
        if (state.activeNote === "new") {
          if (title || body.trim()) state.notes.unshift({ id: state.nextNoteId++, title: title || body.trim().split("\n")[0].slice(0, 30) || "새로운 메모", body, updated: Date.now() });
        } else {
          const existing = state.notes.find((item) => item.id === state.activeNote);
          if (existing) Object.assign(existing, { title: title || existing.title, body, updated: Date.now() });
        }
        state.activeNote = null;
        renderNotes();
      };
      $("#save-note").addEventListener("click", save);
      $("#nt-back").addEventListener("click", save);
      return;
    }

    const sorted = [...state.notes].sort((a, b) => b.updated - a.updated);
    content.innerHTML = `
      <div class="nt-screen">
        <div class="nt-nav"><span></span><span class="nt-circle">${NT_ICON.more}</span></div>
        <div class="nt-scroll">
          <h1 class="nt-large">메모</h1>
          <div class="nt-search">${NT_ICON.search}<span>검색</span></div>
          ${sorted.length ? `<div class="nt-section">오늘</div>
          <div class="nt-card">${sorted.map((note) => `
            <button class="nt-item" data-note="${note.id}">
              <strong>${escapeHTML(note.title)}</strong>
              <span><time>${ntTime(note.updated)}</time>${escapeHTML(note.body.replace(/\n/g, " ")) || "추가 텍스트 없음"}</span>
            </button>`).join("")}</div>` : ""}
        </div>
        <div class="nt-bar"><span></span><span class="nt-count">${sorted.length}개의 메모</span><button type="button" class="nt-new" id="nt-new" aria-label="새로운 메모">${NT_ICON.compose}</button></div>
      </div>`;
    $("#nt-new").addEventListener("click", () => { state.activeNote = "new"; renderNotes(); });
    content.querySelectorAll("[data-note]").forEach((button) => {
      button.addEventListener("click", () => { state.activeNote = Number(button.dataset.note); renderNotes(); });
    });
  }

  function openPasscode() {
    enteredPasscode = "";
    updatePasscodeDots();
    $("#passcode-error").textContent = "암호를 입력하세요.";
    $("#passcode-modal").classList.remove("hidden");
    $("#passcode-modal").setAttribute("aria-hidden", "false");
  }
  let lockDragged = false;
  $("#unlock-button").addEventListener("click", () => { if (lockDragged) { lockDragged = false; return; } openPasscode(); });

  // 잠금화면 위로 쓸어올려서 암호 입력 열기
  (() => {
    const lock = views.lock; let startY = null, id = null, dy = 0;
    lock.addEventListener("pointerdown", (e) => { if (state.view !== "lock" || !$("#passcode-modal").classList.contains("hidden")) return; startY = e.clientY; id = e.pointerId; dy = 0; lockDragged = false; });
    lock.addEventListener("pointermove", (e) => {
      if (startY === null || e.pointerId !== id) return;
      dy = Math.max(0, startY - e.clientY);
      if (dy > 8) { lockDragged = true; try { lock.setPointerCapture(id); } catch (err) {} }
      if (lockDragged) { lock.style.transform = "translateY(" + (-dy * .7) + "px)"; lock.style.opacity = String(Math.max(.4, 1 - dy / 500)); }
    });
    const end = (e) => {
      if (startY === null || e.pointerId !== id) return;
      const done = dy > 70; startY = null;
      if (lockDragged) {
        const from = lock.style.transform || "none"; lock.style.transform = ""; lock.style.opacity = "";
        if (!reduceMotion()) lock.animate([{ transform: from }, { transform: "none" }], { duration: 300, easing: "cubic-bezier(.2,.9,.3,1)" });
        if (done) openPasscode();
        setTimeout(() => { lockDragged = false; }, 50);
      }
    };
    lock.addEventListener("pointerup", end); lock.addEventListener("pointercancel", end);
  })();

  $("#passcode-close").addEventListener("click", closePasscode);

  document.querySelectorAll("[data-digit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (enteredPasscode.length >= 4) return;
      enteredPasscode += button.dataset.digit;
      updatePasscodeDots();
      if (enteredPasscode.length === 4) {
        if (enteredPasscode === demoPasscode) {
          closePasscode();
          playUnlock();
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
    } else {
      goHome();
    }
  });

  // 홈 인디케이터: 탭 = 홈, 위로 드래그 = 앱이 손가락을 따라오다 홈으로
  let swipeSuppressClick = false;
  (() => {
    const bar = $("#home-indicator"); let startY = null, id = null, dy = 0;
    const appEl = views.app;
    const tf = () => "translateY(" + (-dy * .55) + "px) scale(" + Math.max(.78, 1 - dy / 900) + ")";
    const rad = () => Math.min(43, dy / 4) + "px";
    bar.addEventListener("pointerdown", (e) => { startY = e.clientY; id = e.pointerId; dy = 0; swipeSuppressClick = false; try { bar.setPointerCapture(id); } catch (err) {} });
    bar.addEventListener("pointermove", (e) => {
      if (startY === null || e.pointerId !== id) return;
      dy = Math.max(0, startY - e.clientY);
      if (dy > 6) swipeSuppressClick = true;
      if (state.view === "app" && dy > 6) { stopMotion(); appEl.style.transform = tf(); appEl.style.borderRadius = rad(); }
    });
    const end = (e) => {
      if (startY === null || e.pointerId !== id) return;
      startY = null;
      if (!swipeSuppressClick) return;
      if (state.view === "app") {
        const from = tf(), fromR = rad();
        appEl.style.transform = ""; appEl.style.borderRadius = "";
        if (dy > 70) goHome(from, fromR);
        else if (!reduceMotion()) appEl.animate([{ transform: from, borderRadius: fromR }, { transform: "none", borderRadius: "0px" }], { duration: 280, easing: "cubic-bezier(.2,.9,.3,1)" });
      } else if (state.view === "lock" && dy > 70) { openPasscode(); }
      setTimeout(() => { swipeSuppressClick = false; }, 50);
    };
    bar.addEventListener("pointerup", end); bar.addEventListener("pointercancel", end);
  })();
  $("#home-indicator").addEventListener("click", () => {
    if (swipeSuppressClick) return;
    if (state.view === "lock") {
      playUnlock();
      showToast("잠금이 해제되었습니다.");
    } else if (state.view === "app") {
      goHome();
    } else {
      setView("lock");
    }
  });


  try { if (seobinScenario === "new") { setTimeout(() => { if (!seobinChat.messages.some(m => m.from === "date" && m.text === "2025년 1월 5일")) seobinChat.messages.push({from:"date",text:"2025년 1월 5일"}); saveSeobinChat(); addSeobinIncoming("시혀나ㅏㅏ 뭐 해ㅐㅐㅐ"); saveSeobinScenario("received"); if (state.app === "kakao" && state.activeChat === "seobin" && state.view === "app") renderKakao(); }, 6500); } } catch (_) {}
  document.addEventListener("keydown", (e) => {
    if (state.view !== "app" || state.app !== "photos" || !state.activePhoto) return;
    const t = $("#photo-track"); if (!t) return;
    if (e.key === "ArrowLeft") t.scrollBy({ left: -t.clientWidth, behavior: "smooth" });
    else if (e.key === "ArrowRight") t.scrollBy({ left: t.clientWidth, behavior: "smooth" });
    else if (e.key === "Escape") { state.activePhoto = null; renderPhotos(); }
  });
  updateClock();
  setInterval(updateClock, 30000);
  $("#unread-dot").classList.toggle("hidden", !state.unread);
})();
