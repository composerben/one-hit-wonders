# One-Hit-Wonders

*By  [Ben Ash](https://github.com/composerben)*

Welcome to One-Hit-Wonders! It's a "Splice" clone with the added functionality of a playable drum kit to test the sounds out for yourself!
- [Live Site](https://aa-one-hit-wonders.herokuapp.com/)

## Index
* [API Documentation](https://github.com/composerben/one-hit-wonders/wiki/API-Documentation)
* [Database Schema](https://github.com/composerben/one-hit-wonders/wiki/Database-Schema)
* [Frontend Routes](https://github.com/composerben/one-hit-wonders/wiki/Frontend-Routes)
* [MVP Feature List](https://github.com/composerben/one-hit-wonders/wiki/MVP-Feature-List)

## Technologies Used
* JavaScript
* React/Redux
* Python
* Flask-SQLAlchemy
* AWS S3 

As a musician who's purchased more sample libraries than he cares to admit, and who's grown frustrated at not getting to try the samples before I bought them, 
I decided to create a solution. Built with drum samples in mind, One-Hit-Wonders allows for the creation of a kit a drump samples, let's you listen to the samples 
created by other users, and also contains a playable drum kit, so you can try the samples out for yourself with having to buy them, download them, or even leave
the site!
<img width="649" alt="site-form" src="https://user-images.githubusercontent.com/56130322/129798987-d3bacb8a-5412-4d14-88ed-988a016caecf.png">
<img width="752" alt="drum-kit" src="https://user-images.githubusercontent.com/56130322/129799180-04daaa33-9390-478d-b453-7c389163b87d.png">

## Challenges
This was certainly not without its difficulties. Conceptualizing a way to render dropdowns with all the various drum samples and then dynamically reassign associated audio files to keyboard keys was challenging! I ended up creating a local state object that holds key codes for the playable keys, with their values being the reassignable audio file.
```javascript
const [drumKey, setDrumKey] = useState({
    65: {
      name: "Kick",
      selectedSample: null,
    },
    87: {
      name: "Click",
      selectedSample: null,
    },
    83: {
      name: "Snare",
      selectedSample: null,
    },
    69: {
      name: "Clap",
      selectedSample: null,
    },
    68: {
      name: "High Tom",
      selectedSample: null,
    },
    70: {
      name: "Low Tom",
      selectedSample: null,
    },
    84: {
      name: "Hi-hat",
      selectedSample: null,
    },
    71: {
      name: "Beep",
      selectedSample: null,
    },
    89: {
      name: "Ride",
      selectedSample: null,
    },
    72: {
      name: "Vocal",
      selectedSample: null,
    },
    85: {
      name: "Crash",
      selectedSample: null,
    },
    74: {
      name: "Sub",
      selectedSample: null,
    },
  });
  ```
I also created an array of just the key codes, which I would use while mapping over all the "Drum Types" and their associated samples retrieved from the store. Each time a user selects a sample from the dropdown, the state object is spread, with the "selectedSample" value being updated to the audio url associated with that particular sample, which is retrieved from an AWS S3 bucket.
```javascript
const drumKeyCodes = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74];
###some code ommitted###
{drumTypes?.map((drumType, idx) => (
            <div key={drumType.id} className="drum-selector">
              <label htmlFor={drumType.name}>{drumType.name}: </label>
              <select
                className="dropdown"
                name={drumType.name}
                onChange={(e) => {
                  setDrumKey({
                    ...drumKey,
                    [drumKeyCodes[idx]]: {
                      selectedSample: e.target.value,
                    },
                  });
                }}
              >
                <option selected value="0" disabled>
                  Pick a {drumType.name}
                </option>
                {drumType.samples?.map((sample) => (
                  <option key={sample.id} value={sample.audio_url}>
                    {sample.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
 ```
 
This eliminated the need to create 12 separate local state variables and controlled inputs in the React component.
## Future Features
* Downloadable kits/samples
* Favorites/Reviews
* Search feature, to search by name, genre, etc.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/composerben/one-hit-wonders.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***
