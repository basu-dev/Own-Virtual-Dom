import { createElem } from "../VDom/createElement.js";
import mount from "../VDom/mount.js";
import render from "../VDom/render.js";
import diff from "../VDom/diff.js";
const createApp = count => {
  return createElem("div", {
    attrs: {
      id: "app",
      className: `class-${count}`
    },
    children: [
      createElem("h2", { children: [String("My First Virtual Dom")] }),
      createElem("img", {
        attrs: {
          src: "../static/img.jpg",
          style: `box-sizing:border-box;border:${count * 3}px solid green`,
          className: "basu",
          height: 300,
          width: "auto"
        }
      }),
      createElem("h4", {
        attrs: {
          countValue: count
        },
        children: [
          String(`Count is : ${count}`),
          createElem("br"),
          createElem("input", {
            attrs: {
              type: "text",
              oninput:'writeValue(this.value)',
              placeholder: `${Math.random()*10324325234}`
            }
          })
        ]
      })
    ]
  });
};
const view = count => {
  return createElem("ul", {
    attrs: {
      id: "app",
      className: `class-${count}`
    },
    children: [
      createElem("li", {
        children: [String("List-" + count)]
      }),
      createElem("li", {
        children: [String("List-" + (count + 1))]
      })
    ]
  });
};
let count = 0;
let app = view(0);
// let app=createApp(0)
let app$ = render(app);
let rootElem$ = document.getElementById("main");
let div$ = document.createElement("div");
rootElem$.appendChild(div$);
rootElem$ = div$;
rootElem$ = mount(app$, rootElem$);
const writeValue=(value)=>{
  console.log(value)
}
setInterval(() => {
  if (count == 4) {
    count = -1;
  }
  count++;
  let newDom = createApp(count);
  let patch = diff(app, newDom);
  // console.log(patch)
  rootElem$ = patch(rootElem$);
  app = newDom;
}, 1000);
