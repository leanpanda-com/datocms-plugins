# Alt&Title editor DatoCMS plugin

What is this for? Suppose you are writing an article and you want to add coherent alts and titles to the all article's images, the only way to do that now is by editing manually all the images metadata. The Alt&Title editor allows to bulk-update all of the article's images by filling a custom form. Apply and refresh the page, and all of the images will have neat alts and titles.

This plugin can be added to a JSON field and it will display a simple form with two inputs, one for Alt and one for Title. By clicking on "apply" it will update all images files in the record.

## Localised projects

Unfortunately DatoCMS at the moment does not allow localisation for files metadata, but you can still use this plugin to edit alts and titles if you have localised file fields (meaning you use different files for each locale in a record).
Just enable localisation for the JSON field on which you installed the plugin to edit images by locale.

## Configuration

You will need to specify a full-access DatoCMS API key on the plugin global settings so the plugin can edit content.
