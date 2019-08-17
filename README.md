Super Mario Bros. JS clone

NEXT STEPS (refactoring):
~~- add doc blocks to all classes to enable a type hinting ide support~~
- feature full 1-1 lvl with all mapped blocks
~~- add background layer with should be rendered as first layer (render simple canvas sky color background rect)~~
~~- add second layer with clouds and bushes (add them to another tilemap)~~
~~- add third layer with all collisions tilemap and collider (dynamic layer which can be updated)~~
~~- add debug layer which can render all debug info such as tilemap grid, hitboxes, collisions, keyboard statuses, etc.~~
~~- refactor all update process with the systems~~
- extract all if-statements outside of update() render() functions if they are static
- check all config variables and refactor the Config class with override() method and kind of deepMerging feature
- extract objects generation outside of update() render() functions if they are static (width, vectors, etc)
- add UI layer which should render level time and score (at least always Score: 0)
- refactor mario with more components
- add animations distance support and use distance step as arg for frameRate (instead of hardcoded fps)
- move all level load declarations and sprite declarations into JSON
- fix mario physics
- double check all config parameters usage & core parameters should be placed inside the engine
- think about replacing all promises with async / await calls
- use object/array destruction with json spec parsing
- swap console.log alerts on super classes with throwing an errors
- refactor all references from the component or entity to game scene methods with EventBus pattern 

TODO:
- add render buffer for static objects (tiles, backgrounds, etc)
- add caching camera view if camera does not change the position (debug on every tick rerender() method)
 