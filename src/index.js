import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import localStorageController from "./local_storage_controller.js";
import displayController from "./display_controller.js";

let projects = localStorageController.getLocalStorage();
displayController.displayProjects(projects);
