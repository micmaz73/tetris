If the blocks stack to the top of the screen, it's game over. We need to make sure we can handle this state.

Let's take a closer look at state:

grid : An array describing the game board. This contains all of the squares that have been placed. It does not contain the current block that you are controlling.
shape : The index of the current shape that you are controlling. The index identifies the array of shapes for each rotation in the shape array.
rotation : The index of the rotation for the current block.
x : horizontal position of the shape you are controlling.
y : vertical position of the shape you are controlling.
nextShape : index of the next shape that will appear after the current shape is placed.
isRunning : when true, the game is running, false when the game is paused.
gameOver : true when the game is over.
speed : the number of milliseconds before a block is moved down.
score : your score
isRunning and gameOver are the two important properties for this discussion, let's go over the basic rules of these properties:

isRunning is is set by the Play/Resume button. When isRunning is false, the game is paused but not over.
On the other hand when gameOver is true the game is over.
The controls should not issue actions when isRunning is false or gameOver is true.
The move down action that forces the game along should also not happen when isRunning is false or gameOver is true.
gameOver is set to false by default. It gets set to true when the game is over.
A game is over when a block is added to the grid and part if that block ends up off the top edge of the grid.