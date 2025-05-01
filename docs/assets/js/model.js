// public/assets/js/model.js
export async function fetchCourses () {
  const url = location.hostname === 'localhost' ? '/api/courses' : './courses.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  return res.json();                 // [{id,name,prerequisites}, …]
}

