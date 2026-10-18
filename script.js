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
    activePhoto: null,
    activeNote: null,
    unread: true,
    messages: [
      {
        id: "minji",
        name: "김민지",
        avatar: "민",
        color: "pink",
        preview: "오늘 사진 보냈어! 확인해 봐",
        time: "오후 7:42",
        messages: [
          { from: "incoming", text: "집에 잘 들어갔어?" },
          { from: "outgoing", text: "응, 방금 도착했어." },
          { from: "incoming", text: "오늘 찍은 사진 보내줄게!" },
          { from: "incoming", text: "오늘 사진 보냈어! 확인해 봐" }
        ]
      },
      {
        id: "mom",
        name: "엄마",
        avatar: "엄",
        color: "green",
        preview: "내일 늦지 않게 일어나",
        time: "오후 6:18",
        messages: [
          { from: "incoming", text: "밥은 먹었니?" },
          { from: "outgoing", text: "응, 먹었어. 걱정하지 마." },
          { from: "incoming", text: "내일 늦지 않게 일어나" }
        ]
      },
      {
        id: "unknown",
        name: "알 수 없는 번호",
        avatar: "?",
        color: "gold",
        preview: "모르는 번호로 온 메시지",
        time: "오후 4:03",
        messages: [
          { from: "incoming", text: "안녕하세요. 번호가 맞는지 확인하려고 연락드렸습니다." }
        ]
      }
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

  const appTitles = { messages: "메시지", photos: "사진", calls: "최근 통화", notes: "메모" };
  let toastTimer;
  let enteredPasscode = "";
  const demoPasscode = "1234";

  function updatePasscodeDots() {
    $("#passcode-dots").querySelectorAll("span").forEach((dot, index) => {
      dot.classList.toggle("filled", index < enteredPasscode.length);
    });
  }

  function closePasscode() {
    $("#passcode-modal").classList.add("hidden");
    enteredPasscode = "";
    updatePasscodeDots();
    $("#passcode-error").textContent = "데모 암호: 1234";
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
    $("#passcode-error").textContent = "데모 암호: 1234";
    $("#passcode-modal").classList.remove("hidden");
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
    $("#passcode-error").textContent = "데모 암호: 1234";
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openApp(button.dataset.open));
  });

  $("#back-button").addEventListener("click", () => {
    if (state.app === "messages" && state.activeChat) {
      state.activeChat = null;
      renderMessages();
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
