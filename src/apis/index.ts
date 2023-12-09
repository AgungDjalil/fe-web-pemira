const bufferToString = (bufferFIle: Buffer) => {
	const base64Image = btoa(new Uint8Array(bufferFIle).reduce((data, byte) => data + String.fromCharCode(byte), ''));
	const imageUrl = `data:image/png;base64,${base64Image}`;
	return imageUrl
}

export const getCalonLegislative = (type: string) => {
	return fetch(`${process.env.REACT_APP_API_URL}/api/candidate?legislativeType=${type}`)
		.then(response => response.json())
		.then(data =>
			data.map((candidate: any) => {
				return {
					...candidate,
					photo: bufferToString(candidate.photo.data)
				}
			})
		)
		.catch(err => console.log(err))
}