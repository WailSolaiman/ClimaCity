import React from 'react'
import { createRoot } from 'react-dom/client'

import './options.css'

const App: React.FC = () => {
	return (
		<div>
			<p>Hello Options Page</p>
		</div>
	)
}

const div = document.createElement('div')
document.body.appendChild(div)

const root = createRoot(div)
root.render(<App />)
