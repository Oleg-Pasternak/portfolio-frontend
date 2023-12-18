import { gql } from '@apollo/client';

export const GET_INITIAL_DATA = gql`
query($site: String, $slug: String) {
	project (slug: $slug) {
		title
		seoTitle
		searchDescription
		description
		iosUrl
		websiteUrl
		projectLogo {
			rendition(format:"webp") {
				url
			}
		}
		mainVideoPreview {
			rendition(format: "webp") {
				url
			}
		}
		content {
			__typename
			...WideImage
			...MobilePreview
			...DesktopPreview
			...StackBlock
			...Description
		}
	}
	settings (site: $site) {
		pageIcon {
			rendition(format:"webp") {
				url
			}
		}
		footerText
		contactEmail
		githubLink
		linkedinLink
	}
}

fragment StackBlock on StackBlock {
	leftSide {
		title
		content {
			...IconsList
			...DescriptionBlock
		}
	}
	rightSide {
		title
		content {
			...IconsList
			...DescriptionBlock
		}
	}
}

fragment IconsList on IconsList {
	icons {
		rendition(format: "webp") {
			url
		}
	}
}

fragment DescriptionBlock on DescriptionBlock {
	text
}

fragment WideImage on WideImage {
	image {
			rendition(format: "webp", jpegquality: 90, webpquality: 90) {
					url
			}
	}
}

fragment MobilePreview on MobilePreview {
	images {
			rendition(format: "webp", jpegquality: 90, webpquality: 90) {
					url
			}
	}
	color
}

fragment DesktopPreview on DesktopPreview {
	images {
			rendition(format: "webp", jpegquality: 90, webpquality: 90) {
					url
			}
	}
	color1
	color2
}

fragment Description on Description {
	title
	text
}

`;
