## Really Little Alchemy

### Background

Little Alchemy is a game where a player begins with 4 fundamental elements (air, wind, earth and fire) which can be combined in logical ways to create increasingly complex elements. For example, earth and fire become lava, water and fire become steam, etc. The goal of the game is to unlock all the possible elements. In the original version there are 560 elements. I plan to include ~100 elements depending on time.

### Functionality & MVP  

This implementation of Little Alchemy will:

- [ ] Drag elements from the sidebar onto the board
- [ ] Drag elements on top of one another to produce new elements
- [ ] Keep track of discovered elements/total elements
- [ ] Tell the user if he/she has won

In addition, this project will include:

- [ ] A production Readme

### Wireframes

This app will include a game board into which users can drag elements, a sidebar containing all the elements a user has uncovered and an about modal.

<img align="center" src="wireframes/really_little-alchemy.png" height="300px" style="display: block; "/>

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.
- `Interact.js` for drag and drop

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`element.js`: this script will produce an element object(fire, water, etc). It will store a reference to its own position on the board.

`combine.js`: this script will store a reference to the elements that have been dragged onto the board and handle the logic for combining elements. When two compatible elements are put together, both will disappear and the new element will be rendered.

`sidebar.js`: this script will be responsible for keeping track of all the elements the user has discovered in alphabetical order. When a new element is discovered in the main board, it will be added to the sideboard. It will also keep a count of all the elements the user has uncovered.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` `Interact.js` APIs.

Build `element` object in `element.js` and connect it to `board.js`. Make sure the board.js renders the sidebar and at least one element in both the sidebar and the main area. Be able to drag and drop elements around the board.


- Complete the `element.js` module
- Render a main area and sidebar to the `Canvas` using `Easel.js`
- Render elements into the `Canvas`
- Drag and drop elements

**Day 3**: Handle combining elements

Store elements' positions in `element` object. Create `combine.js`. When two elements overlap, check if valid combination. Destroy combined elements and render new element to `Canvas`

- Add position to `element` objects.
- Write `combine.js` to check if two elements' positions overlap, remove compatible overlapping elements, and render new element on the board.


**Day 4**: Create `sidebar.js` to store all discovered elements. When a new element is discovered it should be added to the sidebar. Users can drag elements from the sidebar to the main board. Show user number of discovered elements/total elements. If the number of discovered elements = total elements, inform the user that he/she has won the game.

- Create `sidebar.js` with 4 initial elements
- When new element is discovered, pass it to the sidebar and render it on the `Canvas`.
- Store a count of how many elements have been discovered and render it to the `Canvas`.
- If number of discovered elements = total elements, inform user that he/she as won.


### Bonus features

If time permits, I'll add more elements to discover. I may also add sound effects and graphics when a user discovers a new element.
