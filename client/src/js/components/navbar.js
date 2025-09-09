export function renderNavbar() {
  return `
    <nav class="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm relative">
      <!-- Logo -->
      <div class="flex items-center gap-2">
         <img src="./media/LogoRisa.png"  alt="RISA Logo" class="h-8"/>
      </div>

      <!-- Menu Desktop -->
      <ul class="hidden md:flex gap-6 text-gray-700 font-medium">
        <li><a href="index.html" class="hover:text-pink-500">Beranda</a></li>
        <li><a href="game.html" class="hover:text-pink-500">Mini Games</a></li>
        <li><a href="cycle.html" class="hover:text-pink-500">My Cycle</a></li>
        <li><a href="vaksin.html" class="hover:text-pink-500">Vaksin HPV</a></li>
      </ul>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Search -->
        <button aria-label="Cari" class="text-gray-600 hover:text-pink-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>


        <!-- Auth Buttons (desktop) -->
        <div class="hidden md:flex gap-2">
          <a href="signup.html" class="px-3 py-1 border border-pink-400 text-pink-500 rounded-md hover:bg-pink-50 text-sm font-medium">Daftar</a>
          <a href="login.html" class="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 text-sm font-medium">Masuk</a>
        </div>

        <!-- Mobile Toggle -->
        <button id="menu-toggle" class="md:hidden text-gray-600 hover:text-pink-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu (Sidebar) -->
      <div id="mobile-menu" class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out z-50 md:hidden flex flex-col p-6 gap-4">
        <button id="menu-close" class="self-end text-gray-600 hover:text-pink-500">
          ✕
        </button>
        <a href="index.html" class="hover:text-pink-500">Beranda</a>
        <a href="game.html" class="hover:text-pink-500">Mini Games</a>
        <a href="cycle.html" class="hover:text-pink-500">My Cycle</a>
        <a href="vaksin.html" class="hover:text-pink-500">Vaksin HPV</a>
        <a href="signup.html" class="px-3 py-1 border border-pink-400 text-pink-500 rounded-md hover:bg-pink-50 text-sm font-medium">Daftar</a>
        <a href="login.html" class="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 text-sm font-medium">Masuk</a>
      </div>
    </nav>
  `;
}

export function initNavbarToggle() {
  const menu = document.getElementById("mobile-menu");

  document.addEventListener("click", (e) => {
    if (e.target.closest("#menu-toggle")) {
      menu.classList.remove("translate-x-full");
    }
    if (e.target.closest("#menu-close")) {
      menu.classList.add("translate-x-full");
    }
  });
}
