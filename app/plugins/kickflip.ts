export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('kickflip', {
		mounted(el: HTMLElement) {
			el.style.transformOrigin = 'center center';

			if (el.parentElement) {
				el.parentElement.style.perspective = '1000px';
				el.parentElement.style.transformStyle = 'preserve-3d';
			}

			el.addEventListener('click', (event: MouseEvent) => {
				if ((el as any)._isFlipping) return;
				(el as any)._isFlipping = true;

				el.style.transition = 'none';

				const rect = el.getBoundingClientRect();
				const centerX = (rect.left + rect.right) / 2;
				const centerY = (rect.top + rect.bottom) / 2;

				const clickX = (event.clientX - centerX) / (rect.width / 2);
				const clickY = (event.clientY - centerY) / (rect.height / 2);

				const maxRotation = 360;
				const rotateXTarget = -clickY * maxRotation;
				const rotateYTarget = clickX * maxRotation;

				const distance = Math.sqrt(Math.pow(clickX, 2) + Math.pow(clickY, 2));
				const duration = Math.max(400, 1000 - distance * 500);

				const startTime = performance.now();

				function animate(now: number) {
					const elapsed = now - startTime;
					const progress = Math.min(elapsed / duration, 1);

					const ease = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);
					const scale = 1 + Math.sin(progress * Math.PI) * 0.15;
					const heightZ = Math.sin(progress * Math.PI) * 50;

					const currentX = rotateXTarget * ease;
					const currentY = rotateYTarget * ease;

					el.style.transform = `translateZ(${heightZ}px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(${scale})`;

					if (progress < 1) {
						requestAnimationFrame(animate);
					} else {
						el.style.transition = 'transform 0.4s ease-out';
						el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
						(el as any)._isFlipping = false;
					}
				}
				requestAnimationFrame(animate);
			});
		}
	});
});