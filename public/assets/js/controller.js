// public/assets/js/controller.js
import { fetchCourses } from './model.js';
import { renderGraph  } from './view.js';

(async function init () {
  try {
    const courses = await fetchCourses();
    renderGraph(courses);
  } catch (err) {
    console.error(err);
    document.getElementById('graph')
            .textContent = 'Error loading course data.';
  }
})();

