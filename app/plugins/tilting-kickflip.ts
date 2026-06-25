export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('tilting-kickflip', {
		mounted(el : HTMLElement) {
			el.style.transformOrigin = 'center center';
			el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out';

			if (el.parentElement) {
				el.parentElement.style.perspective = '1000px';
				el.parentElement.style.transformStyle = 'preserve-3d';
			}

			const maxTilt = 25;
			let currentTiltX = 0;
			let currentTiltY = 0;

			// --- Mouse Hover Tilt ---
			const handleMouseMove = (event : MouseEvent) => {
				if ((el as any)._isFlipping) return;

				const rect = el.getBoundingClientRect();
				const centerX = (rect.left + rect.right) / 2;
				const centerY = (rect.top + rect.bottom) / 2;
				const mouseX = event.clientX - centerX;
				const mouseY = event.clientY - centerY;

				currentTiltX = -(mouseY / (rect.height / 2)) * maxTilt;
				currentTiltY = (mouseX / (rect.width / 2)) * maxTilt;

				el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out';
				el.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) scale(1.05) translateZ(20px)`;
			}

			const handleMouseLeave = () => {
				if ((el as any)._isFlipping) return;

				currentTiltX = 0;
				currentTiltY = 0;
				el.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
				el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
			}

			// --- Mouse Click Flip ---
			const handleFlipClick = (event: MouseEvent) => {
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

				const startingTiltX = currentTiltX;
				const startingTiltY = currentTiltY;

				const startTime = performance.now();

				function animate(now: number) {
					const elapsed = now - startTime;
					const progress = Math.min(elapsed / duration, 1);

					const ease = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);
					const scale = 1 + Math.sin(progress * Math.PI) * 0.15;
					const heightZ = Math.sin(progress * Math.PI) * 50;

					const currentX = startingTiltX + (rotateXTarget * ease);
					const currentY = startingTiltY + (rotateYTarget * ease);

					el.style.transform = `translateZ(${heightZ}px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(${scale})`;

					if (progress < 1) {
						requestAnimationFrame(animate);
					} else {
						currentTiltX = 0;
						currentTiltY = 0;
						el.style.transition = 'transform 0.4s ease-out, box-shadow 0.3s ease-out';
						el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
						(el as any)._isFlipping = false;
					}
				}

				requestAnimationFrame(animate);
			};

			el.addEventListener('mousemove', handleMouseMove);
			el.addEventListener('mouseleave', handleMouseLeave);
			el.addEventListener('click', handleFlipClick);

			(el as any)._cleanupTiltFlip = () => {
				el.removeEventListener('mousemove', handleMouseMove);
				el.removeEventListener('mouseleave', handleMouseLeave);
				el.removeEventListener('click', handleFlipClick);
			}
		},
		unmounted(el : HTMLElement) {
			if ((el as any)._cleanupTiltFlip) {
				(el as any)._cleanupTiltFlip();
			}
		}
	})
});