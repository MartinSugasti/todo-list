import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import displayController from "./modules/display_controller.js";

displayController.addBasicFunctionality();
displayController.displayProjects();
