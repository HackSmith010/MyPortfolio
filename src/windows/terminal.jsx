import { techStack } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import React from "react";
import {Check} from "lucide-react"

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@anshu % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => {
            return (
              <li key={category} className="flex items-center">
                <Check className="check" size={20} />
                <h3>{category}</h3>
                <ul>
                  {items.map((item, i) => {
                    return (
                      <li key={i}>
                        {item} {i < items.length - 1 ? "," : ""}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
