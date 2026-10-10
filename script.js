'use strict';
const footwear = {
  curve: { name: 'Curve Foot', before: '36.4%', after: '115.0', std: '5.8', alt: 'Simulated curved footwear on the robot’s feet' },
  single_geta: { name: 'Single Geta', before: '36.8%', after: '113.5', std: '6.5', alt: 'Simulated single-support geta footwear on the robot’s feet' },
  double_geta: { name: 'Double Geta', before: '17.7%', after: '103.6', std: '12.7', alt: 'Simulated double-support geta footwear on the robot’s feet' },
  skate: { name: 'Skates', before: '38.6%', after: '97.2', std: '5.1', alt: 'Simulated skate footwear on the robot’s feet' }
};
document.querySelectorAll('[data-shoe]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.shoe;
    const shoe = footwear[key];
    document.querySelectorAll('[data-shoe]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const image = document.getElementById('shoe-image');
    image.src = `assets/${key}.webp`;
    image.alt = shoe.alt;
    document.getElementById('shoe-name').textContent = shoe.name;
    document.getElementById('shoe-before').textContent = shoe.before;
    const value = document.getElementById('shoe-after');
    const uncertainty = document.createElement('small');
    uncertainty.textContent = `± ${shoe.std}%`;
    value.replaceChildren(`${shoe.after} `, uncertainty);
  });
});
document.getElementById('copy-citation').addEventListener('click', async () => {
  const citation = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent);
    status.textContent = 'Citation copied.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C (or ⌘C) to copy.';
  }
});
