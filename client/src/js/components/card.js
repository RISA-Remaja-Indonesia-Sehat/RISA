export function renderCard(title, description) {
  return `
    <div class="border rounded-xl shadow p-4 hover:shadow-md transition">
      <h2 class="font-semibold text-lg mb-2">${title}</h2>
      <p class="text-gray-600">${description}</p>
    </div>
  `;
}
