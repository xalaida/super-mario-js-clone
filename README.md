Super Mario Bros. JS clone

NEXT STEPS (refactoring):
- feature full 1-1 lvl with all mapped blocks
- add background layer with should be rendered as first layer (render simple canvas sky color background rect)
- add second layer with clouds and bushes (add them to another tilemap)
- add third layer with all collisions tilemap and collider (dynamic layer which can be updated)
- add UI layer which should render level time and score (at least always Score: 0)
- add debug layer which can render all debug info such as tilemap grid, hitboxes, collisions, keyboard statuses, etc.
- refactor mario with more components
- move all level load declarations and sprite declarations into JSON

NEXT STEPS (features):
- enemies

TODO:
- add render buffer for static objects (tiles, backgrounds, etc)
- add caching camera view if camera does not change the position (debug on every tick rerender() method)
 