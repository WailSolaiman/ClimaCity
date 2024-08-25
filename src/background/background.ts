chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('Message: ', message)
	console.log('Sender: ', sender)
	sendResponse(
		'A response sending From Background to Content. Your Message has been received.'
	)
})
