export async function urlsToFiles(urls) {
	let files = []
	for (const url of urls) {
		try {
				const response = await fetch(url);
				const data = await response.blob();
				const metadata = {
						type: 'image/jpeg',
				};
				const file = new File([data], 'image.jpg', metadata);
				files.push(file)
		} catch {
			return null
		}
	}
	return files
}

export function filesToBase64(files) {
	let imgsSrc = [];
	for (const file of files) {
		const reader = new FileReader();
		reader.onload = event => {
			imgsSrc.push(event.target.result)
		};
		reader.readAsDataURL(file);
	}
	return imgsSrc
}