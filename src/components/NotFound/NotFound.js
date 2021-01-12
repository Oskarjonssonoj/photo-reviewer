import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<div className="page page__not-found">
				<h1>The page you requested could not be found</h1>				

				<Link to="/" className="link text-link">
					Go back
				</Link>				
			</div>
		</div>
	)
}

export default NotFound