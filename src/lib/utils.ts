// ─── Helper: draw cover frame on canvas ────────────────────────────────────
export function drawFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !img.complete || img.naturalWidth === 0) return;
  const ratio = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
  const cx = (canvas.width - img.naturalWidth * ratio) / 2;
  const cy = (canvas.height - img.naturalHeight * ratio) / 2;
  // Clear to transparent so PNG alpha shows through to the white bg beneath
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, cx, cy, img.naturalWidth * ratio, img.naturalHeight * ratio);
}
