# React CRUD App

A basic CRUD app made with ReactJS.

It utilizes the API from https://jsonplaceholder.typicode.com.

## How to run

You can run it for as a dev server with:

`npm start`

And build it for production with:

`npm run build`

## Usage

When you open the app, you will be automatically shown a table with 30 rows, all with data retrived from the API.

You can `Update` the `Post Title`, or `Delete` the whole row.

Whenever you do any of these two actions, an HTTP PUT or DELETE request (according to which button you pressed) will 
be sent to the API, along with updating/deleting the data locally as well.

After pressing one of these buttons, it is normal for the action to take a while to complete, as the API itself is processing the request.

Should an HTTP request fail, no data will be updated or deleted, and changes will be reverted back to the original values.
