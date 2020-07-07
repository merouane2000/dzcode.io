import React, { useEffect } from "react";
import { Document } from "t9/types/fullstack";
import Markdown from "react-markdown";
import "./style";

import programer from "../../landing/header/icons/programmer.png";
import contact from "../../landing/header/icons/contact.png";
import support from "../../landing/header/icons/support.png";
import github from "../../landing/header/icons/github.png";

const socialMedia = [
  {
    id: 1,
    name: "dzcode",
    href: "https://github.com/dzcode-io/dzcode.io",
    icon: github,
  },
  { id: 2, name: "Learn", href: "/learn", icon: programer },
  { id: 3, name: "Contact", href: "/contact", icon: contact },
  { id: 4, name: "Support", href: "/support", icon: support },
];

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentDocument();
    setTimeout(() => {
      window.FB && window.FB.XFBML.parse();
    }, 3000);
  }, []);
  const { currentDocument } = props;
  return (
    <div className="content">
      {currentDocument ? (
        <div>
          {/* Image */}
          {currentDocument.image && (
            <img
              className="hero-image"
              src={currentDocument.image}
              alt={currentDocument.title}
            />
          )}
          {/* Title */}
          <h2 className="title">{currentDocument.title}</h2>
          {/* Description */}
          <small className="description">{currentDocument.description}</small>
          <hr className="break" />
          {/* Content */}
          <Markdown className="content" source={currentDocument.content} />
          <hr className="break" />
          {/* Contact + Edit*/}
          <div className="actions">
            {socialMedia.map((item) => {
              return (
                <div key={item.id} className="item">
                  <img src={item.icon} alt={item.name} className="icon" />
                  <a href={item.href}>{item.name}</a>
                </div>
              );
            })}
          </div>
          {/* Comments */}
          <div
            className="fb-comments"
            data-href={location.origin + location.pathname}
            data-width="100%"
            data-numposts="5"
          />
        </div>
      ) : (
        "Loading Document..."
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentDocument: () => void;
  currentDocument: Document | null;
}
