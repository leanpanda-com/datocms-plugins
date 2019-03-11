# Bulk Editor DatoCMS plugin

This plugin can be added to all kinds of field belonging to a non-singleton model. It allows you to apply a value to all records belonging to the same model. Something like a 'it's never too late' default value.

## Configuration

[Describe/screenshot any global/instance parameters this plugin requires]

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

The plugin will be served from [https://datocms-plugin-bulk-editor.localtunnel.me/](https://datocms-plugin-bulk-editor.localtunnel.me/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).

## Publishing

Before publishing this plugin, make sure:

* you've properly described any configuration parameters in this README file;
* you've properly compiled this project's `package.json` following the [official rules](https://www.datocms.com/docs/plugins/publishing/);
* you've added a cover image (`cover.png`) and a preview GIF (`preview.gif`) into the `docs` folder.

When everything's ready, just run:

```
yarn publish
```
