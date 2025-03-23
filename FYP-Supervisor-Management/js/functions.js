// js/functions.js

// Filter supervisors by research domain and available slots
export const filterSupervisors = (supervisors, domain, minSlots) => {
  return supervisors.filter(
    (supervisor) =>
      supervisor.researchDomain.toLowerCase().includes(domain.toLowerCase()) &&
      supervisor.availableSlots >= minSlots
  );
};

// Bookmark a supervisor by ID
export const bookmarkSupervisor = (supervisors, id) => {
  const supervisor = supervisors.find((supervisor) => supervisor.id === id);
  if (supervisor) {
    console.log(`Bookmarked: ${supervisor.name}`);
    const bookmarked = JSON.parse(localStorage.getItem("bookmarked")) || [];
    if (!bookmarked.some((item) => item.id === supervisor.id)) {
      bookmarked.push(supervisor);
      localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
    }
  }
};