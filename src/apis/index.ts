const bufferToString = (bufferFIle: Buffer) => {
	const base64Image = btoa(new Uint8Array(bufferFIle).reduce((data, byte) => data + String.fromCharCode(byte), ''));
	const imageUrl = `data:image/png;base64,${base64Image}`;
	return imageUrl
}

export const getVoteCount = (candidateID: string, accessToken: string, type: string) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/api/polling/${candidateID}/${type}`, {
			headers: { Authorization: `Bearer ${accessToken }`}
		}
	)
		.then(response => response.json())
		.then(data => data)
}

export const getAllVoters = (page: number, searchTerm: string, accessToken: string) => {
	return fetch(
		searchTerm !== 'null' ? `${process.env.REACT_APP_API_URL}/api/voters?search=${searchTerm}` :
					`${process.env.REACT_APP_API_URL}/api/voters?page=${page}`, 
					{ headers: { Authorization: `Bearer ${accessToken}` }
		}
	)
		.then(response => response.json())
		.then(data => data)
}

export const getOneCalonLegislative = (candidateID: string | undefined, accessToken: string) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/api/candidate/${candidateID}`, {
			headers: { Authorization: `Bearer ${accessToken }`}
		}
	)
		.then(response => response.json())
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