# Cogs.Red (Red-Portal) v3 Backend
>Who needs a v2?

## Project structure

### Models
Models are all inside the `/models` folder. Each model should be inside the single file.
If the project will grow too big - additional files should be put inside the folders named after the model itself.

- /models
    - repo.js - Repo model, [docs currently here](https://github.com/orels1/Red-Portal/issues/45)
    - cog.js - Cog model, [docs currently here](https://github.com/orels1/Red-Portal/issues/47)

### API modules
API modules are stored in separate folders inside the root dir. Each folder represents only one module.

Each module should have an `index.js`, all the other files should be imported from there.
The main server should import only the `index.js` file.

- /repos
    - index.js - Repos backend index file
- /cogs
    - index.js Cogs backend index file

### Utilities
There are functions that you might want to call from multiple places in your code. That's what the `utils.js` is for.
It shouldn't be too big. But if it'll eventually grow giant - it should be moved into the `utils` folder and renamed to `index.js` to maintain proper routing. 

- /utils.js - Utils main file

### Paths
For v3 I decided to move the api paths into a separate file, so if the paths would need to be changed - they could be updated within a single file.

- /paths.js

### Tests
All the tests are stored inside the `test` folder and they should repeat the folder structure of the project itself