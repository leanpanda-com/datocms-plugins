# Hidden Field DatoCMS plugin

This is the simplest field editor ever, it just hides the input from the DatoCMS UI!

Suppose you are storing some data to DatoCMS through the API, it makes no sense to let this data editable by editors, right? So, just hide it!

## Configuration

No needs for configuration, just add this plugin to any field type and none will be able to see it.

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

The plugin will be served from [https://datocms-plugin-hidden-field.localtunnel.me/](https://datocms-plugin-hidden-field.localtunnel.me/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).
