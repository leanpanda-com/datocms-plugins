# Sidebar Button DatoCMS plugin

Creates a sidebar button that allows a user to make a POST request to a custom url containing the record id as body.

## Configuration

To configure the sidebar button you need to specify the url, define the button's label and write a few lines to explain the content editor what the button does as a hint (optional).

## Development

Install all the project dependencies with:

```
yarn install
```

Add this plugin in development mode to one of your DatoCMS project with:

```
yarn addToProject
```

Start the local development server with:

```
yarn start
```

The plugin will be served from [https://datocms-plugin-send-record-id.localtunnel.me/](https://datocms-plugin-send-record-id.localtunnel.me/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).

```
yarn publish
```
