import { renderNavbar, initNavbarToggle } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";
import { renderCard } from "./components/card.js";


document.getElementById("navbar").innerHTML = renderNavbar(), initNavbarToggle();
document.getElementById("footer").innerHTML = renderFooter();
   const leaderboardData = [
      { rank: 1, name: "Putri C. Ramya", points: 10275 },
      { rank: 2, name: "Budi P. Thomsen", points: 9875 },
      { rank: 3, name: "Siska L. Gunawan", points: 8420 },
      { rank: 4, name: "Joko S. Gunary", points: 7870 },
      { rank: 5, name: "Maya R. Hernade", points: 7320 },
      { rank: 6, name: "Thomas R. Maden", points: 6930 },
      { rank: 7, name: "Nadia L. Cahyani", points: 6520 },
      { rank: 8, name: "Rian A. Putra", points: 6120 },
    ];

    const tbody = document.getElementById("leaderboardBody");

    function renderLeaderboard() {
      tbody.innerHTML = "";
      leaderboardData.forEach(user => {
        const tr = document.createElement("tr");
        tr.className = "leader-row";
        tr.innerHTML = `
          <td class="px-4 py-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                ${user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
              </div>
            </div>
          </td>
          <td class="px-4 py-3">
            <div class="font-medium">${user.name}</div>
          </td>
          <td class="px-4 py-3">
            <div class="font-semibold text-slate-800">${user.points.toLocaleString()}</div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    renderLeaderboard();

    // Buttons interaction
    document.getElementById("playNowBtn").addEventListener("click", () => {
      alert("Game dimulai! Siap dapatkan poin 🎉");
      // place where you can route to game page, e.g. location.href = '/games/quiz-hiv'
    });

    document.getElementById("jumpLeaderboardBtn").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("leaderboard").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Optional: responsive tweaks (example: reduce table on mobile)
    function handleResize() {
      const table = document.querySelector("table");
      if (!table) return;
      if (window.innerWidth < 520) {
        table.classList.add("text-sm");
      } else {
        table.classList.remove("text-sm");
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();