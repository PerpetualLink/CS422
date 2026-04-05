# CS422

## Build

To build the project after pullin the repository into a folder on your machine you will need to run a couple commands.

1. First ensure you have Nodejs insalled on your machine. I installed the most current version here: https://nodejs.org/en/download/current

2. Make sure you bring the repository onto your system. This can be done in visual studio by running the following within your terminal. Make sure you create a folder to put the project in and run the code from there.
```
git clone https://github.com/PerpetualLink/CS422.git
```

3. Next you will need to install the node modules and dependencies needed to run the project. In your terminal run this command:
```
npm ci
```
This will run a clean install to the node_modules folder ensuring that you have the same packages installed that we are all using.

4. To run the project after you installed all the packages you should now be able to type the following:
```
npm run dev
```
This will build the project and provide you the location of the site the project is running on and will look something like this within the terminal:
```
> project@1.0.0 dev
> vite

5:38:51 PM [vite] (client) Re-optimizing dependencies because lockfile has changed

  VITE v8.0.3  ready in 151 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Doucmentation

- React: http://react.dev/learn

- Material UI: https://mui.com/material-ui/getting-started/
