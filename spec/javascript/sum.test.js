import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Todo, {NewModal} from "app/javascript/components/Todo";
import { shallow, mount } from 'enzyme';



const todos = [
        { id: 1, titile: "text1", content: "content1" },
        { id: 2, titile: "text2", content: "content2" } 
      ]
const wrapper = () => shallow(<Todo todos={ todos } />)
it("renders", () => {

})