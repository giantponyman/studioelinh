document.addEventListener('DOMContentLoaded', () => {
  const gallery = Array.from(document.querySelectorAll('.gallery img'));
  if (!gallery.length) return;

  // Ensure a single lightbox overlay exists; create it if missing
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-nav prev" aria-label="Previous image">&larr;</button>
      <button class="lightbox-nav next" aria-label="Next image">&rarr;</button>
      <span class="close" aria-hidden="true">&times;</span>
      <img id="lightbox-img" src="" alt="" />
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById('lightbox-img');
  const nextBtn = lightbox.querySelector('.lightbox-nav.next');
  const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
  const closeBtn = lightbox.querySelector('.close');
  let currentIndex = -1;

  function showImage(index) {
    currentIndex = (index + gallery.length) % gallery.length;
    lightboxImg.src = gallery[currentIndex].src;
    lightbox.classList.add('active');
  }
  function closeLightbox() { lightbox.classList.remove('active'); }
  function nextImage() { showImage(currentIndex + 1); }
  function prevImage() { showImage(currentIndex - 1); }

  gallery.forEach((img, i) => img.addEventListener('click', () => showImage(i)));
  nextBtn && nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  prevBtn && prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  closeBtn && closeBtn.addEventListener('click', () => closeLightbox());

  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextImage();
    else if (e.key === 'ArrowLeft') prevImage();
    else if (e.key === 'Escape') closeLightbox();
  });
});