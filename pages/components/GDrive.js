import axios from "axios";
import {useEffect, useState} from "react";

export default function GDrive() {
	const [access, setAccess] = useState('')
	const [d, setD] = useState([])
	const [recordedBlobs, setRecordedBlobs] = useState([])
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [start, setStart] = useState(false)
	const [percent, setPercent] = useState(0)



	useEffect(() => {
		axios.post('https://www.googleapis.com/oauth2/v4/token', {
			"client_id": '1046398706985-kh1ef3qo4ntiqdef65n67ll822h8e39f.apps.googleusercontent.com',
			"client_secret": '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',
			"refresh_token": '1//04dTyJXtpfsMDCgYIARAAGAQSNwF-L9IrytHWCOblt6rVheKIIhoRzch4UJ6MONUWCp952SRppORX6wGE_j3B0FfvftailuwOQJY',
			"grant_type": "refresh_token"
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			setAccess(res.data.access_token)
		})
	}, [])
	useEffect(() => {
		if (start) {
			let options = {
				videoBitsPerSecond : 135000,
				mimeType: 'video/webm;codecs=vp9,opus',
			}

			const r = new MediaRecorder(window.stream, options)
			setMediaRecorder(r)
		}
	}, [start])

	function test(e) {
		const metadata = JSON.stringify({
			name: 'test',
			mimeType: 'image/jpeg',
			"parents": ['12UqZihJh8Sb2YdBR19yp34pSxWJ2L-g2'],
		});
		const requestData = new FormData();

		requestData.append("metadata", new Blob([metadata], {
		  type: "application/json"
		}));
		requestData.append("file", e.target.files[0]);

		axios.post('https://www.googleapis.com/upload/drive/v3/files',
			requestData,
			{
			headers: {
				Authorization: `Bearer ${access}`,
				'Content-Type': 'image/jpeg',
			}
		}).then(({ data }) => {
			let newD = [...d]
			newD.push({
				id: data.id,
				name: data.name,
				link: `https://drive.google.com/file/d/${data.id}/view`,
			})
			setD(newD)
		})
	}
	function delete_d(e){
		let code = (e.keyCode ? e.keyCode : e.which);
		if(code === 13) {
			axios.delete(`https://www.googleapis.com/drive/v3/files/${e.target.value}`,
				{
					headers: {
						Authorization: `Bearer ${access}`,
					}
				}).then((res) => {
					console.log(res)
			})
		}

	}

	async function startCam(){
		const constraints = {
			video: {
				width: 640,
				height: 480,
				/*
				width: 1280,
				height: 720,
				 */
			}
		}

		try{
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			window.stream = stream

			const preview = document.getElementById('video-preview')
			preview.srcObject = stream
		}catch (e){
			console.log(e)
		}
		setStart(true)
	}

	async function recordCam(e) {
		let c = e.target.innerHTML

		try{

			if(c === 'Record'){
				mediaRecorder.ondataavailable = handleDataAvailable;
				function handleDataAvailable(event) {
					if (event.data.size > 0) {
						let item = [...recordedBlobs]
						item.push(event.data)
						setRecordedBlobs(item)
					} else {

					}
				}
				mediaRecorder.start()
			}else{
				mediaRecorder.stop()
			}
		}catch (e){
			console.log(e)
		}
	}

	function playVideo() {
		const blob = new Blob(recordedBlobs, {
			type: 'video/webm'
		})

		const preview = document.getElementById('video-preview')
		preview.src = null
		preview.srcObject = null

		preview.src = window.URL.createObjectURL(blob)
		preview.controls = true
		preview.play()
	}

	function downloadVid() {
		const blob = new Blob(recordedBlobs, {type: 'video/mp4'});
		const metadata = JSON.stringify({
			name: 'test_vid',
			mimeType: 'video/mp4',
			"parents": ['12UqZihJh8Sb2YdBR19yp34pSxWJ2L-g2'],
		});
		const requestData = new FormData();

		requestData.append("metadata", new Blob([metadata], {
			type: "application/json"
		}));
		requestData.append("file", blob);

		axios.post('https://www.googleapis.com/upload/drive/v3/files',
			requestData,{
				headers: {
					Authorization: `Bearer ${access}`,
					'Content-Type': 'video/mp4',
				},
				onUploadProgress: (progressEvent) => {
					const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
					if (totalLength !== null) {
						setPercent(Math.round((progressEvent.loaded * 100) / totalLength));
					}
				}
			}
			).then(({ data }) => {
			let newD = [...d]
			newD.push({
				id: data.id,
				name: data.name,
				link: `https://drive.google.com/file/d/${data.id}/view`,
			})
			setD(newD)
			console.log('video uploaded')
		}).catch((e) => {
			console.log(e)
		})
	}
	/*
	document.addEventListener("visibilitychange", function() {
		document.title = document.hidden ? "I'm away" : "I'm here";
		const test = document.querySelector('input[name="switchTab"]')
		test.value = (parseInt(test.value) + 1)
	});
	*/

	return (
		<div>
			<br/>
			Enter Id to Delete :
			<input type="text" onKeyPress={delete_d}/>
			{d?.map((d) => (
				<ul key={d.id}>
					<li>id: {d.id}</li>
					<li>name: {d.name}</li>
					<li><a href={d.link}>{d.link}</a></li>
					<li>----------------------</li>
				</ul>
			))}
			<video id="video-preview" playsInline={true} autoPlay={true} muted={true}/>
			<button onClick={startCam}>Start Camera</button>
			<button onClick={recordCam}>Record</button>
			<button onClick={recordCam}>Stop</button>
			<button onClick={playVideo}>Play</button>
			<button onClick={downloadVid}>Upload</button>
			<h1>{percent}</h1>
		</div>
	);
}
