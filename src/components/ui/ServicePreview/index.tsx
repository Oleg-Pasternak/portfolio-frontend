import Link from "next/link";
import React, { ReactElement } from "react";
import { ServiceItem } from "src/constants/interfaces";

export function ServicePreview(props: ServiceItem): ReactElement {
  return (
    <div className="service-preview">
      <div className="service-preview-heading">
        <p>{props.page.title}</p>
        {/* <Link
          href={`/service/${props.page.slug}`}
          as={`/service/${props.page.slug}`}
          className="service-preview-link"
        >
          <span>Learn more</span>
        </Link> */}
      </div>
      <Link
        href={`/service/${props.page.slug}`}
        as={`/service/${props.page.slug}`}
      >
        {props.videoPreview ? (
          <video src={props.videoPreview.url} autoPlay muted loop playsInline />
        ) : (
          <img src={props.previewImage.rendition.url} alt="Service Image" />
        )}
      </Link>
    </div>
  );
}
