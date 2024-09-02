export function resizeImage(image: string, width: number, height: number): Promise<string> {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.src = image;

		img.onload = function () {
			let resizingCanvas: HTMLCanvasElement = document.createElement('canvas');
			let resizingCanvasContext = resizingCanvas.getContext('2d');

			if (!resizingCanvasContext) {
				reject(new Error('Failed to get 2D context'));
				return;
			}

			let curImageDimensions = { width: img.width, height: img.height };
			let halfImageDimensions = {
				width: curImageDimensions.width / 2,
				height: curImageDimensions.height / 2
			};

			resizingCanvas.width = curImageDimensions.width;
			resizingCanvas.height = curImageDimensions.height;

			resizingCanvasContext.drawImage(img, 0, 0);

			while (curImageDimensions.width * 0.5 > width) {
				resizingCanvasContext.drawImage(
					resizingCanvas,
					0,
					0,
					curImageDimensions.width,
					curImageDimensions.height,
					0,
					0,
					halfImageDimensions.width,
					halfImageDimensions.height
				);

				curImageDimensions.width = halfImageDimensions.width;
				curImageDimensions.height = halfImageDimensions.height;
			}

			// Now do final resize for the resizingCanvas to meet the dimension requirements
			// directly to the output canvas, that will output the final image
			let outputCanvas: HTMLCanvasElement = document.createElement('canvas');
			let outputCanvasContext = outputCanvas.getContext('2d');

			if (!outputCanvasContext) {
				reject(new Error('Failed to get 2D context for output canvas'));
				return;
			}

			outputCanvas.width = width;
			outputCanvas.height = height;

			outputCanvasContext.drawImage(
				resizingCanvas,
				0,
				0,
				curImageDimensions.width,
				curImageDimensions.height,
				0,
				0,
				width,
				height
			);

			// output the canvas pixels as an image. params: format, quality
			let base64ResizedImage = outputCanvas.toDataURL('image/jpeg', 0.85);
			resolve(base64ResizedImage);
		};
	});
}
