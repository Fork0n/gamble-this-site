export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('neo-kickflip', {
		mounted(el: HTMLElement) {
			el.style.transformOrigin = 'center center';

			if (el.parentElement) {
				el.parentElement.style.perspective = '1000px';
				el.parentElement.style.transformStyle = 'preserve-3d';
			}

			const handleFlipClick = (event: MouseEvent) => {
				if ((el as any)._isFlipping) return;
				(el as any)._isFlipping = true;

				el.style.transition = 'none';

				const rect = el.getBoundingClientRect();
				const centerX = (rect.left + rect.right) / 2;
				const centerY = (rect.top + rect.bottom) / 2;

				const clickX = (event.clientX - centerX) / (rect.width / 2);
				const clickY = (event.clientY - centerY) / (rect.height / 2);

				const axisX = -clickY;
				const axisY = clickX;
				const length = Math.sqrt(axisX * axisX + axisY * axisY) || 1;

				const normX = axisX / length;
				const normY = axisY / length;

				const distance = Math.sqrt(Math.pow(clickX, 2) + Math.pow(clickY, 2));
				const duration = Math.max(500, 1000 - distance * 400);

				const startTime = performance.now();

				function animate(now: number) {
					const elapsed = now - startTime;
					const progress = Math.min(elapsed / duration, 1);

					const ease = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);

					const scale = 1 + Math.sin(progress * Math.PI) * 0.15;
					const heightZ = Math.sin(progress * Math.PI) * 60;

					const targetRotation = ease * 360;

					el.style.transform = `
                   translateZ(${heightZ}px) 
                   rotate3d(${normX}, ${normY}, 0, ${targetRotation}deg) 
                   scale(${scale})
                `.replace(/\s+/g, ' ');

					if (progress < 1) {
						requestAnimationFrame(animate);
					} else {
						el.style.transition = 'transform 0.4s ease-out';
						el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
						(el as any)._isFlipping = false;
					}
				}
				requestAnimationFrame(animate);
			};

			el.addEventListener('click', handleFlipClick);

			(el as any)._cleanupNeoFlip = () => {
				el.removeEventListener('click', handleFlipClick);
			}
		},
		unmounted(el: HTMLElement) {
			if ((el as any)._cleanupNeoFlip) {
				(el as any)._cleanupNeoFlip();
			}
		}
	});
});