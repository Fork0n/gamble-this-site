export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('tilt', {
		mounted(el : HTMLElement) {
			el.style.transformOrigin = 'center center';
			el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out';

			if (el.parentElement) {
				el.parentElement.style.perspective = '1000px';
				el.parentElement.style.transformStyle = 'preserve-3d';
			}

			const maxTilt = 25;

			const handleMouseMove = (event : MouseEvent) => {
				const rect = el.getBoundingClientRect();
				const centerX = (rect.left + rect.right) / 2;
				const centerY = (rect.top + rect.bottom) / 2;
				const mouseX = event.clientX - centerX;
				const mouseY = event.clientY - centerY;
				const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
				const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

				el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(20px)`;
			}
			const handleMouseLeave = () => {
				el.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
				el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';

				setTimeout(() => {
					el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out';
				}, 300);
			}
			el.addEventListener('mousemove', handleMouseMove);
			el.addEventListener('mouseleave', handleMouseLeave);

			(el as any)._cleanupTilt = () => {
				el.removeEventListener('mousemove', handleMouseMove);
				el.removeEventListener('mouseleave', handleMouseLeave);
			}
		},
		unmounted(el : HTMLElement) {
			if ((el as any)._cleanupTilt) {
				(el as any)._cleanupTilt();
			}
		}
	})
})