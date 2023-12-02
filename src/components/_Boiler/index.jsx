import ErrorBoundary from "src/components/ErrorBoundary";
import ScrollMovingAnimation from 'src/components/ui/ScrollMovingAnimation';
import { components } from "src/components";


export function Boiler(props) {

  const pageData = props.pageData.content
  return (
    <div className='boiler'>
		<ScrollMovingAnimation color1={props.color1} color2={props.color2} />
		{pageData.map((section, index) => {
			if (section.__typename) {
				let Component = components[section.__typename];
				return (
					<ErrorBoundary key={index}>
						<div className="section">
							{Component && <Component {...section} id={index} />}
						</div>
					</ErrorBoundary>
				)
			}
		})}
    </div>
  )
}
