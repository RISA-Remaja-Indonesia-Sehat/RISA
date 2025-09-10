import { renderNavbar, initNavbarToggle  } from "./components/navbar";
import { renderFooter } from "./components/footer";

document.getElementById('navbar').innerHTML = renderNavbar(), initNavbarToggle();
document.getElementById('footer').innerHTML = renderFooter();