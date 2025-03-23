// js/main.js
import { supervisors } from "./data.js";
import { filterSupervisors, bookmarkSupervisor } from "./functions.js";

// DOM Elements
const supervisorList = document.getElementById("supervisor-list");
const bookmarkedList = document.getElementById("bookmarked-list");
const loading = document.getElementById("loading");
const filterButton = document.getElementById("filter-button");
const resetButton = document.getElementById("reset-button");

// Display all supervisors
const displaySupervisors = (supervisors, container) => {
  container.innerHTML = supervisors
    .map(
      (supervisor) => `
      <div class="supervisor-card p-4 border rounded-lg shadow-md">
        <h3 class="text-xl font-bold text-center">${supervisor.name}</h3>
        <p class="text-center">Research Domain: ${supervisor.researchDomain}</p>
        <p class="text-center">Available Slots: ${supervisor.availableSlots}</p>
        <p class="text-center">Contact: ${supervisor.contactInfo}</p>
        <button data-id="${supervisor.id}" class="bookmark-button mt-2 px-4 py-2 bg-blue-500 text-white rounded block mx-auto hover:bg-blue-600">
          Bookmark
        </button>
      </div>
    `
    )
    .join("");

  // Add event listeners to bookmark buttons
  const bookmarkButtons = document.querySelectorAll(".bookmark-button");
  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const supervisorId = button.getAttribute("data-id");
      bookmarkSupervisor(supervisors, supervisorId);
      displayBookmarkedSupervisors(); // Refresh bookmarked list
    });
  });
};

// Display bookmarked supervisors
const displayBookmarkedSupervisors = () => {
  const bookmarked = JSON.parse(localStorage.getItem("bookmarked")) || [];
  displaySupervisors(bookmarked, bookmarkedList);
};

// Initial display
loading.style.display = "block"; // Show loading state
setTimeout(() => {
  displaySupervisors(supervisors, supervisorList);
  displayBookmarkedSupervisors();
  loading.style.display = "none"; // Hide loading state
}, 1000); // Simulate loading delay

// Filter functionality
filterButton.addEventListener("click", () => {
  const domain = document.getElementById("domain-filter").value;
  const slots = parseInt(document.getElementById("slots-filter").value);
  const filtered = filterSupervisors(supervisors, domain, slots);
  displaySupervisors(filtered, supervisorList);
});

// Reset functionality
resetButton.addEventListener("click", () => {
  document.getElementById("domain-filter").value = "";
  document.getElementById("slots-filter").value = "";
  displaySupervisors(supervisors, supervisorList);
});